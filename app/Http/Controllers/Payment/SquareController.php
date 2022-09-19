<?php

namespace App\Http\Controllers\Payment;

use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use Square\Models\Money;
use Square\SquareClient;
use Illuminate\Http\Request;
use Square\Models\OrderLineItem;
use Illuminate\Support\Facades\Log;
use Square\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use App\Traits\MakePaymentTrait;
use Square\Models\CreateOrderRequest;
use Square\Models\Order as SquareOrder;
use Square\Models\CreateCheckoutRequest;
use App\Traits\PaymentGatewayTrait;

class SquareController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.square');
        $this->setConfig();
    }

    public function paymentWithSquarePublic(Request $request)
    {

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($request->id);

            $description = __('app.invoice') . ' #' . $invoice->id;
            $metadata = [
                'id' => strval($invoice->id),
                'type' => $request->type
            ];
            $amount = $invoice->amountDue();
            $callback_url = route('square.callback', [$request->id, $request->type]);
                break;

        case 'order':
            $order = Order::find($request->id);
            $invoice = $this->makeOrderInvoice($order, 'pending');
            $description = __('app.order') . ' #' . $order->id;
            $metadata = [
                'id' => strval($order->id),
                'type' => $request->type
            ];
            $amount = $order->total;
            $callback_url = route('square.callback', [$request->id, $request->type]);
                break;

        default:
                return Reply::error(__('messages.paymentTypeNotFound'));
        }

        $client = new SquareClient([
            'accessToken' => config('services.square.access_token'),
            'environment' => config('services.square.environment'),
        ]);
        $location_id = config('services.square.location_id');
        try {
            $checkout_api = $client->getCheckoutApi();

            // Set currency to the currency for the location
            $currency = $client->getLocationsApi()->retrieveLocation($location_id)->getResult()->getLocation()->getCurrency();

            $money = new Money();
            $money->setCurrency($currency);
            $money->setAmount($amount * 100);

            $item = new OrderLineItem(1);
            $item->setName($description);
            $item->setBasePriceMoney($money);


            // Create a new order and add the line items as necessary.
            $order = new SquareOrder($location_id);
            $order->setLineItems([$item]);
            // set metadata
            $order->setMetaData($metadata);

            $create_order_request = new CreateOrderRequest();
            $create_order_request->setOrder($order);

            // Similar to payments you must have a unique idempotency key.
            $checkout_request = new CreateCheckoutRequest(uniqid(), $create_order_request);
            // Set a custom redirect URL, otherwise a default Square confirmation page will be used
            $checkout_request->setRedirectUrl($callback_url);


            $response = $checkout_api->createCheckout($location_id, $checkout_request);

            if ($response->isError()) {
                return Reply::error($response->getErrors()[0]->getDetail());
            }

            $this->makePayment('Square', $amount, $invoice, $response->getResult()->getCheckout()->getOrder()->getId());

            return Reply::redirect($response->getResult()->getCheckout()->getCheckoutPageUrl(), __('modules.square.redirectMessage'));
        } catch (ApiException $e) {
            return Reply::error($e->getMessage());
        } catch (\Throwable $e) {
            return Reply::error($e->getMessage());
        }
    }

    public function handleGatewayCallback(Request $request, $id, $type)
    {

        $client = new SquareClient([
            'accessToken' => config('services.square.access_token'),
            'environment' => config('services.square.environment'),
        ]);

        try {

            $order_api = $client->getOrdersApi();
            $order = $order_api->retrieveOrder($request->transactionId)->getResult()->getOrder();

            $amount = ($order->getTotalMoney()->getAmount() / 100);

            switch ($type) {
            case 'invoice':
                $invoice = Invoice::findOrFail($id);
                $invoice->status = ($order->getState() == 'COMPLETED') ? 'paid' : 'unpaid';
                $invoice->save();
                $this->makePayment('Square', $amount, $invoice, $request->transactionId, (($order->getState() == 'COMPLETED') ? 'complete' : 'failed'));

                return redirect(route('front.invoice', $invoice->hash));

            case 'order':

                $clientOrder = Order::findOrFail($id);
                $invoice = $this->makeOrderInvoice($clientOrder, ($order->getState() == 'COMPLETED' ? 'completed' : 'failed'));
                $this->makePayment('Square', $amount, $invoice, $request->transactionId, ($order->getState() == 'COMPLETED' ? 'complete' : 'failed'));

                return redirect()->route('orders.show', $id);

            default:
                return redirect()->route('dashboard');
            }

        } catch (ApiException $e) {
            Log::info($e->getMessage());
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }

        return redirect()->route('dashboard');
    }

    public function handleGatewayWebhook(Request $request)
    {
        if ($request->type == 'order.updated') {

            $client = new SquareClient([
                'accessToken' => config('services.square.access_token'),
                'environment' => config('services.square.environment'),
            ]);

            try {

                $order_api = $client->getOrdersApi();
                $order = $order_api->retrieveOrder($request->data['id'])->getResult()->getOrder();

                $amount = ($order->getTotalMoney()->getAmount() / 100);

                switch ($order->getMetaData()['type']) {
                case 'invoice':
                    $invoice = Invoice::findOrFail($order->getMetaData()['id']);
                    $invoice->status = ($order->getState() == 'COMPLETED') ? 'paid' : 'unpaid';
                    $invoice->save();
                    $this->makePayment('Square', $amount, $invoice, $request->data['id'], (($order->getState() == 'COMPLETED') ? 'complete' : 'failed'));

                    break;

                case 'order':

                    $clientOrder = Order::findOrFail($order->getMetaData()['id']);
                    $invoice = $this->makeOrderInvoice($clientOrder, ($order->getState() == 'COMPLETED' ? 'completed' : 'failed'));
                    $this->makePayment('Square', $amount, $invoice, $request->data['id'], ($order->getState() == 'COMPLETED' ? 'complete' : 'failed'));

                    break;
                }

            } catch (ApiException $e) {
                Log::info($e->getMessage());
            } catch (\Throwable $e) {
                Log::error($e->getMessage());
            }

            return response()->json(['status' => 'success']);

        }
    }

}
