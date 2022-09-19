<?php

namespace App\Http\Controllers\Payment;

use App\Helper\Reply;
use App\Models\Order;
use App\Models\Invoice;
use App\Traits\MakePaymentTrait;
use App\Traits\PaymentGatewayTrait;
use App\Http\Controllers\Controller;
use App\Traits\MakeOrderInvoiceTrait;
use net\authorize\api\contract\v1 as AuthorizeAPI;
use App\Http\Requests\PaymentGateway\AuthorizeDetails;
use net\authorize\api\controller\CreateTransactionController;

class AuthorizeController extends Controller
{
    use MakePaymentTrait, MakeOrderInvoiceTrait, PaymentGatewayTrait;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.authorize');
        $this->setConfig();
    }

    public function paymentWithAuthorizePublic(AuthorizeDetails $request, $id)
    {

        switch ($request->type) {
        case 'invoice':
            $invoice = Invoice::find($id);
            $amount = $invoice->amountDue();
            $currency = $invoice->currency ? $invoice->currency->currency_code : 'USD';
            break;

        case 'order':
            $order = Order::find($id);
            $amount = $order->total;
            $currency = $order->currency ? $order->currency->currency_code : 'USD';
            break;

        default:
            return Reply::error(__('messages.paymentTypeNotFound'));
        }


        /* Create a merchantAuthenticationType object with authentication details retrieved from the constants file */
        $merchantAuthentication = new AuthorizeAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName(config('services.authorize.login'));
        $merchantAuthentication->setTransactionKey(config('services.authorize.transaction'));

        // Set the transaction's refId and use this as transaction id because authorize.net give transaction id 0
        $refId = 'ref' . time();

        // Create the payment data for a credit card
        $creditCard = new AuthorizeAPI\CreditCardType();
        $creditCard->setCardNumber($request->card_number);
        $creditCard->setExpirationDate($request->expiration_year . '-' . $request->expiration_month);
        $creditCard->setCardCode($request->cvv);

        // Add the payment data to a paymentType object
        $paymentOne = new AuthorizeAPI\PaymentType();
        $paymentOne->setCreditCard($creditCard);

        // Create a TransactionRequestType object and add the previous objects to it
        $transactionRequestType = new AuthorizeAPI\TransactionRequestType();
        $transactionRequestType->setTransactionType('authCaptureTransaction');
        $transactionRequestType->setAmount($amount);
        $transactionRequestType->setCurrencyCode($currency);
        $transactionRequestType->setPayment($paymentOne);

        // Assemble the complete transaction request
        $requests = new AuthorizeAPI\CreateTransactionRequest();
        $requests->setMerchantAuthentication($merchantAuthentication);

        // Set the transaction's refId
        $requests->setRefId($refId);
        $requests->setTransactionRequest($transactionRequestType);

        // Create the controller and get the response
        $controller = new CreateTransactionController($requests);

        $response = $controller->executeWithApiResponse(config('services.authorize.sandbox') ? \net\authorize\api\constants\ANetEnvironment::SANDBOX : \net\authorize\api\constants\ANetEnvironment::PRODUCTION);

        if ($response != null) {
            // Check to see if the API request was successfully received and acted upon
            if ($response->getMessages()->getResultCode() == 'Ok') {
                // Since the API request was successful, look for a transaction response
                // and parse it to display the results of authorizing the card
                /** @phpstan-ignore-next-line */
                $tresponse = $response->getTransactionResponse();

                if ($tresponse != null && $tresponse->getMessages() != null) {

                    $message_text = $tresponse->getMessages()[0]->getDescription() . ', Transaction ID: ' . $tresponse->getTransId();
                    $msg_type = 'success';

                    switch ($request->type) {
                    case 'invoice':
                        $invoice = Invoice::findOrFail($id);
                        $invoice->status = 'paid';
                        $invoice->save();
                        $this->makePayment('Authorize', $amount, $invoice, ($tresponse->getTransId() ?: $refId), 'complete');

                        break;

                    case 'order':
                        $order = Order::findOrFail($id);
                        $invoice = $this->makeOrderInvoice($order);
                        $this->makePayment('Authorize', $amount, $invoice, ($tresponse->getTransId() ?: $refId), 'complete');
                        break;

                    default:
                        break;
                    }
                }
                else {
                    $message_text = __('modules.authorize.errorMessage');
                    $msg_type = 'error';

                    if ($tresponse->getErrors() != null) {
                        $message_text = $tresponse->getErrors()[0]->getErrorText();
                        $msg_type = 'error';
                    }
                }

                // Or, print errors if the API request wasn't successful
            }
            else {
                $message_text = __('modules.authorize.errorMessage');
                $msg_type = 'error';

                /** @phpstan-ignore-next-line */
                $tresponse = $response->getTransactionResponse();

                if ($tresponse != null && $tresponse->getErrors() != null) {
                    $message_text = $tresponse->getErrors()[0]->getErrorText();
                    $msg_type = 'error_msg';
                }
                else {
                    $message_text = $response->getMessages()->getMessage()[0]->getText();
                    $msg_type = 'error';
                }
            }

            if ($msg_type == 'error' && $request->type == 'invoice') {
                $invoice = Invoice::findOrFail($id);
                $this->makePayment('Authorize', $amount, $invoice, ($tresponse->getTransId() ?: $refId), 'failed');
            }

            if ($msg_type == 'error' && $request->type == 'order') {
                $order = Order::find($id);
                $order->status = 'failed';
                $order->save();

                $invoice = $this->makeOrderInvoice($order, 'failed');

                $this->makePayment('Authorize', $amount, $invoice, ($tresponse->getTransId() ?: $refId), 'failed');
            }
        }
        else {
            $message_text = __('modules.authorize.errorNoResponse');
            $msg_type = 'error';
        }

        return ($msg_type == 'success') ? Reply::success($message_text) : Reply::error($message_text);
    }

}
