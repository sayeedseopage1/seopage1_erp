<?php

namespace App\Http\Controllers\Payment;

use Config;
use Billow\Payfast;
use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Traits\MakePaymentTrait;
use App\Traits\PaymentGatewayTrait;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;

class PayfastController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.payfast');
        $this->setConfig();
    }

    public function paymentWithPayfastPublic(Request $request)
    {

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($request->id);
            $client = $invoice->client_id ? $invoice->client : $invoice->project->client;
            $description = __('app.invoice').' '.$invoice->id;
            $amount = $invoice->amountDue();
            break;

        case 'order':
            $order = Order::find($request->id);
            $client = $order->client;
            $description = __('app.order').' '.$order->id;
            $amount = $order->total;
            break;

        default:
            return Reply::error(__('messages.paymentTypeNotFound'));
        }

        try {
            Config::set('payfast.merchant.return_url', route('payfast.callback', [$request->id, $request->type, 'success']));
            Config::set('payfast.merchant.cancel_url', route('payfast.callback', [$request->id, $request->type, 'cancel']));
            Config::set('payfast.merchant.notify_url', route('payfast.webhook'));


            $payfast = new Payfast();
            $payfast->setBuyer($client->name, '', $client->email);
            $payfast->setAmount($amount);
            $payfast->setItem($request->type, $description);
            $payfast->setMerchantReference($request->type.'_'.$request->id);
            $payfast->setCustomStr1($request->type);
            $payfast->setCustomInt1($request->id);

            // Return the payment form.
            return Reply::successWithData(__('modules.payfast.redirectMessage'), ['form' => $payfast->paymentForm(false)]);

        } catch (\Throwable $th) {
            Log::info($th->getMessage());

            return Reply::error($th->getMessage());
        }

    }

    public function handleGatewayCallback($id, $type, $status)
    {

        switch ($type) {
        case 'invoice':
            $invoice = Invoice::findOrFail($id);

            if ($invoice->status != 'paid') {

                $invoice->status = $status == 'success' ? 'paid' : 'unpaid';
                $invoice->save();
                $this->makePayment('Payfast', $invoice->amountDue(), $invoice, 'payfast_'.$invoice->id, ($status == 'success' ? 'complete' : 'failed'));
            }

            return redirect(route('front.invoice', $invoice->hash));

        case 'order':
            $order = Order::findOrFail($id);
            $invoice = $this->makeOrderInvoice($order, ($status == 'success' ? 'completed' : 'failed'));
            $this->makePayment('Payfast', $invoice->amountDue(), $invoice, 'payfast_'.$invoice->id, (($status == 'success') ? 'complete' : 'failed'));

            return redirect()->route('orders.show', $id);
        }


        return redirect()->route('dashboard');
    }

    public function handleGatewayWebhook(Request $request)
    {
        info('Payfast webhook');
        info($request->all());

        switch ($request->custom_str1) {
        case 'invoice':
            $invoice = Invoice::findOrFail($request->custom_int1);
            $invoice->status = ($request->payment_status == 'COMPLETE') ? 'paid' : 'unpaid';
            $invoice->save();
            $this->makePayment('Payfast', $request->amount_gross, $invoice, $request->m_payment_id, (($request->payment_status == 'COMPLETE') ? 'complete' : 'failed'));
            break;

        case 'order':
            $order = Order::findOrFail($request->custom_int1);
            $invoice = $this->makeOrderInvoice($order, ($request->payment_status == 'COMPLETE' ? 'completed' : 'failed'));
            $this->makePayment('Payfast', $request->amount_gross, $invoice, $request->m_payment_id, (($request->payment_status == 'COMPLETE') ? 'complete' : 'failed'));

            break;
        }

        return response()->json(['status' => 'success'], 200);
    }

}

