<?php

namespace App\Http\Controllers\Payment;

use Carbon\Carbon;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\Order;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\OrderItems;
use App\Models\InvoiceItems;
use Illuminate\Http\Request;
use App\Models\InvoiceItemImage;
use Illuminate\Routing\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use App\Models\PaymentGatewayCredentials;
use Stripe\Exception\SignatureVerificationException;

class StripeWebhookController extends Controller
{
    use MakeOrderInvoiceTrait;

    public function verifyStripeWebhook(Request $request)
    {
        $stripeCredentials = PaymentGatewayCredentials::first();

        Stripe::setApiKey($stripeCredentials->stripe_mode == 'test' ? $stripeCredentials->test_stripe_secret : $stripeCredentials->live_stripe_secret);

        // You can find your endpoint's secret in your webhook settings
        $endpoint_secret = $stripeCredentials->stripe_webhook_secret;

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];

        try {
            Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response(__('messages.invalidPayload'), 400);
        } catch (SignatureVerificationException $e) {
            // Invalid signature
            return response(__('messages.invalidSignature'), 400);
        }

        $payload = json_decode($request->getContent(), true);

        $eventId = $payload['id'];
        $intentId = $payload['data']['object']['id'];

        if($payload['data']['object']['status'] != 'succeeded'){
            $this->paymentFailed($payload);
            return response(__('messages.paymentFailed'), 400);
        }

        // Do something with $event
        if ($payload['type'] == 'payment_intent.succeeded') {

            $previousClientPayment = Payment::where('payload_id', $intentId)
                ->whereNull('event_id')
                ->first();

            if ($previousClientPayment) {
                /* Found payment with same trasaction id */
                $previousClientPayment->event_id = $eventId;
                $previousClientPayment->save();
            }
            else {
                /* Found nothing on payment table with same trasaction id */

                /* If it is an invoice payment */
                if(isset($payload['data']['object']['metadata']['invoice_id'])) {
                    $invoiceId = $payload['data']['object']['metadata']['invoice_id'];

                    $invoice = Invoice::find($invoiceId);
                    $currencyId = $invoice->currency_id;
                };

                /* If it is an order payment */
                if(isset($payload['data']['object']['metadata']['order_id'])) {
                    $orderId = $payload['data']['object']['metadata']['order_id'];

                    $order = Order::find($orderId);

                    $invoice = $this->makeOrderInvoice($order);

                    $invoiceId = $invoice->id;
                    $currencyId = $order->currency_id;
                }

                /* Make payment */
                if (isset($invoice) && isset($currencyId) && isset($invoiceId)) {
                    $this->makePayment($payload, $invoice, $currencyId, $invoiceId);
                }

                /* Change invoice status */
                if(isset($payload['data']['object']['metadata']['invoice_id']) && isset($invoice)) {
                    $invoice->status = 'paid';
                    $invoice->save();
                }

                /* Change order status */
                if(isset($payload['data']['object']['metadata']['order_id']) && isset($order)) {
                    $order->status = 'completed';
                    $order->save();
                }
            }
        }

        return response(__('messages.webhookHandled'), 200);
    }

    public function makePayment($payload, $invoice, $currencyId, $invoiceId)
    {
        $eventId = $payload['id'];
        $amount = $payload['data']['object']['amount'];
        $projectId = isset($payload['data']['object']['metadata']['invoice_id']) ? $invoice->project_id : null;
        $orderId = isset($payload['data']['object']['metadata']['order_id']) ? $payload['data']['object']['metadata']['order_id'] : null;

        $payment = new Payment();
        $payment->project_id = $projectId;
        $payment->invoice_id = $invoiceId;
        $payment->order_id = $orderId;
        $payment->currency_id = $currencyId;
        $payment->amount = $amount / 100;
        $payment->event_id = $eventId;
        $payment->gateway = 'Stripe';
        $payment->paid_on = now();
        $payment->status = 'complete';
        $payment->save();
    }

    public function paymentFailed($payload)
    {
        $intentId = $payload['data']['object']['id'];
        $invoiceId = isset($payload['data']['object']['metadata']['invoice_id']) ? $payload['data']['object']['metadata']['invoice_id'] : null;
        $orderId = isset($payload['data']['object']['metadata']['order_id']) ? $payload['data']['object']['metadata']['order_id'] : null;

        $code = $payload['data']['object']['charges']['data'][0]['failure_code'];
        $message = $payload['data']['object']['charges']['data'][0]['failure_message'];
        $errorMessage = ['code' => $code, 'message' => $message];

        /* Set status=unpaid in invoice table */
        /* public and dashboard invoices */
        if(isset($invoiceId) && $invoiceId != null){
            $invoice = Invoice::where('invoice_id', $invoiceId)->latest()->first();
        }

        /* Set status=unpaid in invoice table */
        if(isset($orderId) && $orderId != null){
            $invoice = Invoice::where('order_id', $orderId)->latest()->first();
        }

        if(isset($invoice)){
            $invoice->status = 'unpaid';
            $invoice->due_amount = $invoice->amount;
            $invoice->save();
        }

        $payment = Payment::where('payload_id', $intentId)->first();
        $payment->status = 'failed';
        $payment->payment_gateway_response = $errorMessage;
        $payment->save();
    }

}
