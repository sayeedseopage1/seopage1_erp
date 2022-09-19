<?php

namespace App\Http\Controllers\Payment;

use Exception;
use Carbon\Carbon;
use PayPal\Api\Item;
use App\Models\Order;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use App\Models\Invoice;
use PayPal\Api\Payment;
use PayPal\Api\ItemList;
use PayPal\Api\Agreement;
use PayPal\Api\Transaction;
use PayPal\Rest\ApiContext;
use Illuminate\Http\Request;
use PayPal\Api\RedirectUrls;
use App\Traits\MakePaymentTrait;
use PayPal\Api\PaymentExecution;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use PayPal\Auth\OAuthTokenCredential;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use App\Models\Payment as ModelsPayment;
use Illuminate\Support\Facades\Redirect;
use App\Models\PaymentGatewayCredentials;

class PaypalController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait;

    private $api_context;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->credential = PaymentGatewayCredentials::first();

        $this->paypalMode = $this->credential->paypal_mode;

        $this->paypalClientId = $this->paypalMode == 'sandbox' ? $this->credential->sandbox_paypal_client_id : $this->credential->paypal_client_id;

        $this->paypalClientSecret = $this->paypalMode == 'sandbox' ? $this->credential->sandbox_paypal_secret : $this->credential->paypal_secret;

        /** setup PayPal api context **/
        config(['paypal.settings.mode' => $this->credential->paypal_mode]);
        $paypal_conf = Config::get('paypal');
        $this->api_context = new ApiContext(new OAuthTokenCredential($this->paypalClientId, $this->paypalClientSecret));
        $this->api_context->setConfig($paypal_conf['settings']);

        $this->pageTitle = 'Paypal';
    }

    /**
     * Show the application paywith paypalpage.
     *
     * @return \Illuminate\Http\Response
     */
    public function payWithPaypal()
    {
        return view('paywithpaypal', $this->data);
    }

    /**
     * Store a details of payment with paypal.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    /* Id could be order id OR invoice id, differentiate according to type  */
    public function paymentWithpaypal(Request $request, $id)
    {
        $redirectRoute = $request->type == 'order' ? 'orders.show' : 'invoices.show';
        $redirectRoute = route($redirectRoute, $id);

        return $this->makePaypalPayment($id, $redirectRoute, $request->type);
    }

    public function paymentWithpaypalPublic(Request $request, $invoiceId)
    {
        $invoice = Invoice::find($invoiceId);
        $redirectRoute = 'front.invoice';
        $redirectRoute = route($redirectRoute, $invoice->hash);

        return $this->makePaypalPayment($invoiceId, $redirectRoute);
    }

    private function makePaypalPayment($id, $redirectRoute, $type=null)
    {

        if($type == 'order'){
            $order = Order::findOrFail($id);

            /** @phpstan-ignore-next-line */
            $currencyCode = $order->currency->currency_code;
            $payAmount = $order->total;
            $paymentTitle = 'Payment for order #' . $order->id;

        } else {
            $invoice = Invoice::findOrFail($id);

            $currencyCode = $invoice->currency->currency_code;
            $payAmount = $invoice->due_amount;
            $paymentTitle = 'Payment for invoice #' . $invoice->invoice_number;
        }

        $companyName = $this->global->companyName;
        $paymentType = !is_null($type) ? 'order' : 'invoice';

        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item_1 = new Item();

        $item_1->setName($paymentTitle)
            /** item name **/
            ->setCurrency($currencyCode)
            ->setQuantity(1)
            ->setPrice($payAmount);
        /** unit price **/

        $item_list = new ItemList();
        $item_list->setItems(array($item_1));

        $amount = new Amount();
        $amount->setCurrency($currencyCode)
            ->setTotal($payAmount);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription($companyName .' '. $paymentTitle);

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(route('get_paypal_status'))
            /** Specify return URL **/
            ->setCancelUrl(route('get_paypal_status'));

        /* Make invoice of this order */
        if($paymentType == 'order' && isset($order)){
            $invoice = $this->makeOrderInvoice($order);
        }

        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));

        config(['paypal.secret' => $this->paypalClientSecret]);
        config(['paypal.settings.mode' => $this->paypalMode]);

        try {
            $payment->create($this->api_context);

        } catch (\PayPal\Exception\PayPalConnectionException $ex) {

            if($type == 'order' && isset($order)){
                $this->paymentFailed($ex, $payAmount, null, $order);
            }
            elseif($type == 'invoice' && isset($invoice)) {
                $this->paymentFailed($ex, $payAmount, $invoice, null);
            }

            if (\Config::get('app.debug')) {
                Session::put('error', 'Connection timeout');
                return Redirect::to($redirectRoute);
                /** echo "Exception: " . $ex->getMessage() . PHP_EOL; **/
                /** $err_data = json_decode($ex->getData(), true); **/
                /** exit; **/
            } else {
                Session::put('error', __('messages.errorOccured'));
                return Redirect::to($redirectRoute);
                /** die(__('messages.errorOccured')); **/
            }
        }

        foreach ($payment->getLinks() as $link) {
            if ($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        /** add payment ID to session **/
        Session::put('paypal_payment_id', $payment->getId());
        Session::put('enc_invoice_id', $id);
        Session::put('type', $paymentType);
        /** @phpstan-ignore-next-line */
        Session::put('invoice_id', $invoice->id);

        /* make invoice payment here */
        /** @phpstan-ignore-next-line */
        $this->makePayment('PayPal', $payAmount, $invoice, $payment->getId());

        if (isset($redirect_url)) {
            /** redirect to paypal **/
            return Redirect::away($redirect_url);
        }

        Session::put('error', 'Unknown error occurred');

        return Redirect::to($redirectRoute);
    }

    public function paymentFailed($exception, $payAmount, $invoice, $order)
    {
        /* Set status=unpaid in invoice table */
        if(isset($invoice) && $invoice != null){
            $invoice = Invoice::where('invoice_id', $invoice->id)->first();
            $invoice->status = 'unpaid';
            $invoice->due_amount += $payAmount;
            $invoice->save();
        }

        $payment_gateway_response = ['code' => $exception->getCode(), 'message' => $exception->getMessage()];

        $payment = new ModelsPayment();
        $payment->status = 'failed';
        $payment->payment_gateway_response = $payment_gateway_response;

        if(isset($order) && $order != null){
            $payment->order_id = $order->id;
            $order->status = 'failed';
            $order->save();
        }

        if(isset($invoice) && $invoice != null){
            $payment->invoice_id = $invoice->id;
        }

        $payment->save();
    }

    public function getPaymentStatus(Request $request)
    {
        /** Get the payment ID before session clear **/
        $type = Session::get('type');
        $invoiceId = Session::get('invoice_id');
        $payment_id = $request->paymentId;
        $enc_invoice_id = Session::get('enc_invoice_id');
        $redirectRoute = 'invoices.show';
        $id = $invoiceId;

        if (empty($enc_invoice_id)) {
            return redirect(route('dashboard'));
        }

        $invoice = Invoice::find($invoiceId);

        if($type == 'invoice') {
            $redirectRoute = ($enc_invoice_id == $invoiceId) ? 'invoices.show' : 'front.invoice';
            $id = $redirectRoute == 'invoices.show' ? $invoiceId : $invoice->hash;
        }
        elseif($type == 'order') {
            $redirectRoute = 'orders.show';
            $id = $enc_invoice_id;
        }

        $clientPayment = ModelsPayment::where('transaction_id', $payment_id)->first();
        /** Clear the session payment ID **/
        Session::forget('paypal_payment_id');

        if (empty($request->PayerID) || empty($request->token)) {
            Session::put('error', __('messages.paymentFailed'));
            return redirect(route($redirectRoute, $id));
        }

        $payment = Payment::get($payment_id, $this->api_context);

        /** PaymentExecution object includes information necessary **/
        /** to execute a PayPal account payment. **/
        /** The payer_id is added to the request query parameters **/
        /** when the user is redirected from paypal back to your site **/
        $execution = new PaymentExecution();
        $execution->setPayerId($request->get('PayerID'));
        /**Execute the payment **/
        $result = $payment->execute($execution, $this->api_context);
        /** dd($result);exit; /** DEBUG RESULT, remove it later **/

        if ($result->getState() == 'approved') {
            /** it's all right **/
            /** Here Write your database logic like that insert record or value in database if you want **/
            $clientPayment->status = 'complete';
            $clientPayment->remarks = 'success';
            $clientPayment->paid_on = now();
            $clientPayment->save();

            $invoice = Invoice::findOrFail($invoiceId);
            $invoice->status = 'paid';
            $invoice->save();

            if($type == 'order'){
                $order = Order::findOrFail($enc_invoice_id);
                $order->status = 'completed';
                $order->save();
            }

            Session::put('success', __('messages.paymentSuccessful'));

            return Redirect::route($redirectRoute, $enc_invoice_id);
        }

        Session::put('error', __('messages.paymentFailed'));

        return Redirect::route($redirectRoute, $enc_invoice_id);
    }

    public function payWithPaypalRecurring(Request $requestObject)
    {
        /** Get the payment ID before session clear **/
        $payment_id = Session::get('paypal_payment_id');
        $invoice_id = Session::get('invoice_id');
        $enc_invoice_id = Session::get('enc_invoice_id');
        $redirectRoute = 'invoices.show';

        if ($enc_invoice_id == $invoice_id) {
            $redirectRoute = 'invoices.show';
        }
        else {
            $redirectRoute = 'front.invoice';
        }

        $clientPayment = ModelsPayment::where('plan_id', $payment_id)->first();
        /** clear the session payment ID **/
        Session::forget('paypal_payment_id');

        if ($requestObject->get('success') == true && $requestObject->has('token')) {
            $token = $requestObject->get('token');
            $agreement = new Agreement();
            try {
                // Execute Agreement
                // Execute the agreement by passing in the token
                $agreement->execute($token, $this->api_context);

                if ($agreement->getState() == 'Active') {
                    $clientPayment->transaction_id = $agreement->getId();
                    $clientPayment->status = 'complete';
                    $clientPayment->paid_on = now();
                    $clientPayment->save();

                    $invoice = Invoice::findOrFail($clientPayment->invoice_id);
                    $invoice->status = 'paid';
                    $invoice->save();

                    Session::put('success', __('messages.paymentSuccessful'));
                    return Redirect::route($redirectRoute, $enc_invoice_id);
                }

                Session::put('error', __('messages.paymentFailed'));

                return Redirect::route($redirectRoute, $enc_invoice_id);
            } catch (Exception $ex) {
                if (Config::get('app.debug')) {
                    Session::put('error', 'Connection timeout');
                    return Redirect::route($redirectRoute, $enc_invoice_id);
                }
                else {
                    Session::put('error', __('messages.errorOccured'));
                    return Redirect::route($redirectRoute, $enc_invoice_id);
                }
            }
        } else if ($requestObject->get('fail') == true) {
            Session::put('error', __('messages.paymentFailed'));
            return Redirect::route($redirectRoute, $enc_invoice_id);
        }

        abort_403(true);
    }

    public function webhook(Request $request)
    {
        if (isset($request->event_type) && $request->event_type == 'PAYMENT.SALE.COMPLETED') {
            $payment = ModelsPayment::where('transaction_id', $request->resource['parent_payment'])->first();

            if ($payment) {
                $payment->status = 'complete';
                $payment->paid_on = now();
                $payment->save();

                $invoice = Invoice::findOrFail($payment->invoice_id);
                $invoice->status = 'paid';
                $invoice->save();

                if ($payment->order_id) {
                    $order = Order::findOrFail($payment->order_id);
                    $order->status = 'completed';
                    $order->save();
                }
            }

        }
    }

}
