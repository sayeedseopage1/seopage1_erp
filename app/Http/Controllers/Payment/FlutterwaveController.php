<?php

namespace App\Http\Controllers\Payment;

use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Traits\MakePaymentTrait;
use App\Traits\PaymentGatewayTrait;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use KingFlamez\Rave\Facades\Rave as Flutterwave;
use App\Http\Requests\PaymentGateway\FlutterwaveRequest;

class FlutterwaveController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.flutterwave');
        $this->setConfig();
    }

    public function paymentWithFlutterwavePublic(FlutterwaveRequest $request, $id)
    {

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($id);
            $client = $invoice->client_id ? $invoice->client : $invoice->project->client;
            $description = __('app.invoice') . ' ' . $invoice->id;
            $amount = $invoice->amountDue();
            $currency = $invoice->currency ? $invoice->currency->currency_code : 'NGN';
            $callback_url = route('flutterwave.callback', [$id, 'invoice']);
            break;

        case 'order':
            $order = Order::find($id);
            $client = $order->client;
            $description = __('app.order') . ' ' . $order->id;
            $amount = $order->total;
            $currency = $order->currency ? $order->currency->currency_code : 'NGN';
            $callback_url = route('flutterwave.callback', [$id, 'order']);
            break;

        default:
            return Reply::error(__('messages.paymentTypeNotFound'));
        }

        try {
            // This generates a payment reference
            /** @phpstan-ignore-next-line */
            $reference = Flutterwave::generateReference();
            // Enter the details of the payment
            $data = [
                'payment_options' => 'card,banktransfer',
                'amount' => $amount,
                'email' => $request->email,
                'tx_ref' => $reference,
                'currency' => $currency,
                'redirect_url' => $callback_url,
                'customer' => [
                    'email' => $request->email,
                    'phone_number' => $request->phone,
                    'name' => $request->name
                ],
                'meta' => [
                    'reference' => $reference,
                    'description' => $description,
                    'client_id' => $client->id,
                    'type' => $request->type,
                    'id' => $id
                ],

                'customizations' => [
                    'title' => $client,
                    'description' => $description
                ]
            ];

            /** @phpstan-ignore-next-line */
            $payment = Flutterwave::initializePayment($data);

            if ($payment['status'] !== 'success') {
                return Reply::error(__('modules.flutterwave.somethingWentWrong'));
            }

            return Reply::redirect($payment['data']['link']);
        } catch (\Throwable $th) {

            return Reply::error($th->getMessage());
        }
    }

    public function handleGatewayCallback(Request $request, $id, $type)
    {
        $status = $request->status;

        /** @phpstan-ignore-next-line */
        $data = Flutterwave::verifyTransaction($request->transaction_id);
        $amount = $data ? $data['data']['amount'] : 0;
        $transactionId = array();

        if ($request->transaction_id) {
            $transactionId[] = $request->transaction_id;
        }

        if ($data) {
            $transactionId[] = $data['data']['tx_ref'];
        }

        switch ($type) {
        case 'invoice':
            $invoice = Invoice::findOrFail($id);
            $invoice->status = ($status == 'successful') ? 'paid' : 'unpaid';
            $invoice->save();

            $this->makePayment('Flutterwave', ($amount ?: $invoice->amountDue()), $invoice, $transactionId, (($status == 'successful') ? 'complete' : 'failed'));

            return redirect(route('front.invoice', $invoice->hash));

        case 'order':
            $order = Order::findOrFail($id);
            $invoice = $this->makeOrderInvoice($order, (($status == 'successful') ? 'completed' : 'failed'));

            $this->makePayment('Flutterwave', ($amount ?: $order->total), $invoice, $transactionId, (($status == 'successful') ? 'complete' : 'failed'));

            return redirect()->route('orders.show', $id);

        default:
            return redirect()->route('dashboard');
        }
    }

    public function handleGatewayWebhook(Request $request)
    {

        if (Flutterwave::verifyWebhook()) {
            /** @phpstan-ignore-next-line */
            $data = Flutterwave::verifyTransaction($request->id);

            if ($data) {
                $transactionId = [$request->id, $data['data']['tx_ref']];
                $amount = $data['data']['amount'];
                $status = $data['data']['status'];

                switch ($data['data']['meta']['type']) {
                case 'invoice':
                    $invoice = Invoice::findOrFail($data['data']['meta']['id']);
                    $invoice->status = ($status == 'successful') ? 'paid' : 'unpaid';
                    $invoice->save();

                    $this->makePayment('Flutterwave', ($amount ?: $invoice->amountDue()), $invoice, $transactionId, (($status == 'successful') ? 'complete' : 'failed'));

                    break;

                case 'order':

                    $order = Order::findOrFail($data['data']['meta']['id']);

                    $invoice = $this->makeOrderInvoice($order, (($status == 'successful') ? 'completed' : 'failed'));

                    $this->makePayment('Flutterwave', ($amount ?: $order->total), $invoice, $transactionId, (($status == 'successful') ? 'complete' : 'failed'));

                    break;
                }
            }
        }

        return response('', 200);

    }

}
