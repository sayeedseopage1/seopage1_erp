<?php

namespace App\Http\Controllers\Payment;

use Log;
use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Traits\MakePaymentTrait;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use Unicodeveloper\Paystack\Paystack;
use GuzzleHttp\Exception\ClientException;
use App\Traits\PaymentGatewayTrait;

class PaystackController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.paystack');
        $this->setConfig();
    }

    public function paymentWithPaystackPublic(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $paystack = new Paystack();

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($id);
            $request->orderID = $invoice->id;
            $request->metadata = [
                'id' => $invoice->id,
                'payment_type' => $request->type
            ];
            $request->amount = ($invoice->amountDue() * 100);
            $request->currency = $invoice->currency ? $invoice->currency->currency_code : 'ZAR';
            $request->callback_url = route('paystack.callback', [$id, 'invoice']);
            break;

        case 'order':
            $order = Order::find($id);
            $request->orderID = $order->id;
            $request->metadata = [
                'id' => $order->id,
                'payment_type' => $request->type
            ];
            $request->amount = ($order->total * 100);
            $request->currency = $order->currency ? $order->currency->currency_code : 'ZAR';
            $request->callback_url = route('paystack.callback', [$id, 'order']);
            break;

        default:
            return Reply::error(__('messages.paymentTypeNotFound'));
        }

        $request->first_name = $request->name;
        $request->email = $request->email;
        $request->quantity = 1;
        $request->reference = $paystack->genTranxRef();

        try {
            return Reply::redirect($paystack->getAuthorizationUrl()->url); /** @phpstan-ignore-line */
        } catch (ClientException $e) {
            Log::info($e->getMessage());
            return Reply::error(json_decode($e->getResponse()->getBody(), true)['message']);
        } catch (\Throwable $th) {
            Log::info($th->getMessage());
            return Reply::error($th->getMessage());
        }
    }

    public function handleGatewayCallback($id, $type = 'invoice')
    {
        $paystack  = new Paystack();
        $paymentDetails = $paystack->getPaymentData();

        switch ($type) {
        case 'invoice':
            $invoice = Invoice::findOrFail($id);
            $invoice->status = ($paymentDetails['data']['status'] == 'success') ? 'paid' : 'unpaid';
            $invoice->save();

            $this->makePayment('Paystack', ($paymentDetails['data']['amount'] / 100), $invoice, $paymentDetails['data']['reference'], (($paymentDetails['data']['status'] == 'success') ? 'complete' : 'failed'));

            return redirect(route('front.invoice', $invoice->hash));

        case 'order':
            $order = Order::findOrFail($id);
            $invoice = $this->makeOrderInvoice($order, (($paymentDetails['data']['status'] == 'success') ? 'completed' : 'failed'));
            $this->makePayment('Paystack', ($paymentDetails['data']['amount'] / 100), $invoice, $paymentDetails['data']['reference'], (($paymentDetails['data']['status'] == 'success') ? 'complete' : 'failed'));

            return redirect()->route('orders.show', $id);

        default:
            return redirect()->route('dashboard');
        }
    }

    public function handleGatewayWebhook(Request $request)
    {
        $paymentDetails = $request->toArray();

        switch ($paymentDetails['data']['metadata']['payment_type']) {
        case 'invoice':
            $invoice = Invoice::findOrFail($paymentDetails['data']['metadata']['id']);
            $invoice->status = ($paymentDetails['data']['status'] == 'success') ? 'paid' : 'unpaid';
            $invoice->save();

            $this->makePayment('Paystack', ($paymentDetails['data']['amount'] / 100), $invoice, $paymentDetails['data']['reference'], (($paymentDetails['data']['status'] == 'success') ? 'complete' : 'failed'));

            break;

        case 'order':
            $order = Order::findOrFail($paymentDetails['data']['metadata']['id']);
            $invoice = $this->makeOrderInvoice($order, (($paymentDetails['data']['status'] == 'success') ? 'completed' : 'failed'));
            $this->makePayment('Paystack', ($paymentDetails['data']['amount'] / 100), $invoice, $paymentDetails['data']['reference'], (($paymentDetails['data']['status'] == 'success') ? 'complete' : 'failed'));

            break;

        default:
            break;
        }

        return response()->json(['status' => 'success']);
    }

}
