<?php

namespace App\Http\Controllers\Payment;

use App\Helper\Reply;
use App\Models\Order;
use Razorpay\Api\Api;
use App\Models\Invoice;
use App\Traits\MakePaymentTrait;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\PaymentGatewayCredentials;

class RazorPayController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait;

    private $apiKey;
    private $secretKey;
    private $webhookSecret;

    public function __construct()
    {
        parent::__construct();

        $this->pageTitle = 'Razorpay';

        $credential = PaymentGatewayCredentials::first();

        $this->apiKey = $credential->razorpay_mode == 'test' ? $credential->test_razorpay_key : $credential->live_razorpay_key;

        $this->secretKey = $credential->razorpay_mode == 'test' ? $credential->test_razorpay_secret : $credential->live_razorpay_secret;
    }

    public function payWithRazorPay()
    {

        $paymentId = request('paymentId');

        $api = new Api($this->apiKey, $this->secretKey);
        $payment = $api->payment->fetch($paymentId); /* @phpstan-ignore-line */ // Returns a particular payment

        $purchaseId = $payment->notes->purchase_id;

        /* Razorpay payment for invoices */
        if(!isset(request()->type)){
            $invoice = Invoice::findOrFail($purchaseId);
        }

        /* Razorpay payment for orders */
        if(isset(request()->type) && request()->type == 'order'){
            $order = Order::findOrFail($purchaseId);
        }

        // If transaction successfully done
        if ($payment->status == 'authorized' && isset($payment->amount) && (isset($invoice) || isset($order))) {

            /** @phpstan-ignore-next-line */
            $currencyCode = isset(request()->type) && request()->type == 'order' ? $order->currency->currency_code : $invoice->currency->currency_code;

            /** @phpstan-ignore-next-line */
            $payment->capture(array('amount' => $payment->amount, 'currency' => $currencyCode));

            /* Mark invoice as paid */
            /** @phpstan-ignore-next-line */
            if(!isset(request()->type) && isset($invoice)){
                $invoice->status = 'paid';
                $invoice->save();
            }

            /* Mark order as paid and make invoice */
            /** @phpstan-ignore-next-line */
            if(isset(request()->type) && request()->type == 'order' && isset($order)){
                $order->status = 'completed';
                $order->save();

                /* Make invoice for particular invoice */
                $invoice = $this->makeOrderInvoice($order);
            }

            if(isset($invoice)) {
                $payment = $this->makePayment('Razorpay', ($payment->amount / 100), $invoice, $paymentId, 'complete');
            }

            Session::put('success', __('messages.paymentSuccessful'));

            if (!auth()->check() && isset($invoice)) {
                $redirectRoute = 'front.invoice';
                return Reply::redirect(route($redirectRoute, $invoice->hash), __('messages.paymentSuccessful'));
            }

            /** @phpstan-ignore-next-line */
            if(isset(request()->type) && request()->type == 'order' && isset($order)){
                return Reply::redirect(route('orders.show', $order->id), __('messages.paymentSuccessful'));
            }

            if(isset($invoice)){
                return Reply::redirect(route('invoices.show', $invoice->id), __('messages.paymentSuccessful'));
            }
        }
        elseif ($payment->status == 'captured') {
            Session::put('success', __('messages.paymentSuccessful'));

            if (!auth()->check() && isset($invoice)) {
                return Reply::redirect(route('front.invoice', $invoice->hash), __('messages.paymentSuccessful'));
            }

            if(isset($invoice)){
                return Reply::redirect(route('invoices.show', $invoice->id), __('messages.paymentSuccessful'));
            }

            /** @phpstan-ignore-next-line */
            if(isset(request()->type) && request()->type == 'order' && isset($order)){
                return Reply::redirect(route('orders.show', $order->id), __('messages.paymentSuccessful'));
            }

        }

        return Reply::error('Transaction Failed');
    }

    public function handleGatewayWebhook(Request $request)
    {

        if ($request->event == 'payment.authorized') {
            $api = new Api($this->apiKey, $this->secretKey);
            $payment = $api->payment->fetch($request->payload['payment']['entity']['id']); /* @phpstan-ignore-line */ // Returns a particular payment

            if($payment->status == 'authorized') {
                $payment->capture(array('amount' => $payment->amount, 'currency' => $payment->currency));

                switch ($payment->notes->type) {
                case 'invoice':
                    $invoice = Invoice::findOrFail($payment->notes->purchase_id);
                    $invoice->status = 'paid';
                    $invoice->save();

                    $payment = $this->makePayment('Razorpay', ($payment->amount / 100), $invoice, $payment->id, 'complete');

                    break;
                case 'order':
                    $order = Order::findOrFail($payment->notes->purchase_id);
                    $order->status = 'completed';
                    $order->save();

                    $invoice = $this->makeOrderInvoice($order);

                    $payment = $this->makePayment('Razorpay', ($payment->amount / 100), $invoice, $payment->id, 'complete');

                    break;
                }

            }
        }

        return 'Webhook Handled';

    }

}
