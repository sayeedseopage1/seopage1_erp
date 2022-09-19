<?php

namespace App\Http\Controllers\Payment;

use Log;
use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Traits\MakePaymentTrait;
use Mollie\Laravel\Facades\Mollie;
use App\Traits\PaymentGatewayTrait;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use Mollie\Api\Exceptions\ApiException;

class MollieController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.mollie');
        $this->setConfig();
    }

    public function paymentWithMolliePublic(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $customer = Mollie::api()->customers()->create([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($id);

            $description = __('app.invoice').' '.$invoice->id;
            $metadata = [
                'id' => $invoice->id,
                'type' => $request->type
            ];
            $amount = $invoice->amountDue();
            $currency = $invoice->currency ? $invoice->currency->currency_code : 'ZAR';
            $callback_url = route('mollie.callback', [$id, 'invoice']);
            break;

        case 'order':
            $order = Order::find($id);

            $description = __('app.order').' '.$order->id;
            $metadata = [
                'id' => $order->id,
                'type' => $request->type
            ];
            $amount = $order->total;
            $currency = $order->currency ? $order->currency->currency_code : 'USD';
            $callback_url = route('mollie.callback', [$id, 'order']);
            break;

        default:
            return Reply::error(__('messages.paymentTypeNotFound'));
        }

        try {
            $payment = Mollie::api()->payments->create([
                'amount' => [
                    'currency' => $currency,
                    'value' => number_format((float)$amount, 2, '.', '') // You must send the correct number of decimals, thus we enforce the use of strings
                ],
                'description' => $description,
                'customerId'   => $customer->id,
                'redirectUrl' => $callback_url,
                'webhookUrl' => route('mollie.webhook'),
                'metadata' => $metadata,
            ]);

            session()->put('mollie_payment_id', $payment->id);

        } catch (ApiException $e) {
            Log::info($e->getMessage());

            if ($e->getField() == 'webhookUrl' && $e->getCode() == '422') {
                return Reply::error('Mollie Webhook will work on live server or you can try ngrok. It will not work on localhost'. $e->getMessage());
            }

            return Reply::error($e->getMessage());
        } catch (\Throwable $th) {
            Log::info($th->getMessage());

            return Reply::error($th->getMessage());
        }

        return Reply::redirect($payment->getCheckoutUrl());

    }

    public function handleGatewayCallback(Request $request, $id, $type)
    {
        try {
            $payment = Mollie::api()->payments()->get(session()->get('mollie_payment_id'));

            switch ($type) {
            case 'invoice':
                $invoice = Invoice::findOrFail($id);
                $invoice->status = $payment->isPaid() ? 'paid' : 'unpaid';
                $invoice->save();

                $this->makePayment('Mollie', $payment->amount->value, $invoice, $payment->id, ($payment->isPaid() ? 'complete' : 'failed'));

                return redirect(route('front.invoice', $invoice->hash));

            case 'order':
                    $order = Order::findOrFail($id);
                    $invoice = $this->makeOrderInvoice($order, ($payment->isPaid() ? 'completed' : 'failed'));
                    $this->makePayment('Mollie', $payment->amount->value, $invoice, $payment->id, ($payment->isPaid() ? 'complete' : 'failed'));

                return redirect()->route('orders.show', $id);

            default:
                return redirect()->route('dashboard');
            }

        } catch (ApiException $e) {
            Log::info($e->getMessage());
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

        return redirect()->route('dashboard');
    }

    public function handleGatewayWebhook(Request $request)
    {
        try {
            $payment = Mollie::api()->payments()->get($request->id);

            switch ($payment->metadata->type) {
            case 'invoice':
                $invoice = Invoice::findOrFail($payment->metadata->id);
                $invoice->status = $payment->isPaid() ? 'paid' : 'unpaid';
                $invoice->save();
                $this->makePayment('Mollie', $payment->amount->value, $invoice, $payment->id, ($payment->isPaid() ? 'complete' : 'failed'));
                break;

            case 'order':

                $order = Order::findOrFail($payment->metadata->id);
                $invoice = $this->makeOrderInvoice($order, ($payment->isPaid() ? 'completed' : 'failed'));
                $this->makePayment('Mollie', $payment->amount->value, $invoice, $payment->id, ($payment->isPaid() ? 'complete' : 'failed'));

                break;

            default:
                break;
            }

        } catch (ApiException $e) {
            Log::info($e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }

        return response()->json(['status' => 'success'], 200);
    }

}
