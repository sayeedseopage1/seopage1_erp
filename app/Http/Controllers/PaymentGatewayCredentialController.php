<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\PaymentGateway\UpdateGatewayCredentials;
use App\Models\Currency;
use App\Models\OfflinePaymentMethod;
use App\Models\PaymentGatewayCredentials;

class PaymentGatewayCredentialController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.paymentGatewayCredential';
        $this->activeSettingMenu = 'payment_gateway_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_payment_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->credentials = PaymentGatewayCredentials::first();
        $this->offlineMethods = OfflinePaymentMethod::all();
        $this->currencies = Currency::all();

        $this->view = 'payment-gateway-settings.ajax.paypal';

        $tab = request('tab');

        switch ($tab) {
        case 'stripe':
            $this->view = 'payment-gateway-settings.ajax.stripe';
                break;
        case 'razorpay':
            $this->view = 'payment-gateway-settings.ajax.razorpay';
                break;
        case 'paystack':
            $this->view = 'payment-gateway-settings.ajax.paystack';
                break;
        case 'flutterwave':
            $this->view = 'payment-gateway-settings.ajax.flutterwave';
                break;
        case 'mollie':
            $this->view = 'payment-gateway-settings.ajax.mollie';
                break;
        case 'payfast':
            $this->view = 'payment-gateway-settings.ajax.payfast';
                break;
        case 'authorize':
            $this->view = 'payment-gateway-settings.ajax.authorize';
                break;
        case 'square':
            $this->view = 'payment-gateway-settings.ajax.square';
                break;
        case 'offline':
            $this->view = 'payment-gateway-settings.ajax.offline';
                break;
        default:
            $this->view = 'payment-gateway-settings.ajax.paypal';
                break;
        }

        ($tab == '') ? $this->activeTab = 'paypal' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        return view('payment-gateway-settings.index', $this->data);
    }

    /**
     * @param UpdateGatewayCredentials $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateGatewayCredentials $request, $id)
    {
        $credential = PaymentGatewayCredentials::findOrFail($id);

        if ($request->payment_method == 'paypal') {
            $credential->paypal_mode = $request->paypal_mode;

            if($request->paypal_mode == 'sandbox') {
                $credential->sandbox_paypal_client_id = $request->sandbox_paypal_client_id;
                $credential->sandbox_paypal_secret = $request->sandbox_paypal_secret;
            }
            else {
                $credential->paypal_client_id = $request->live_paypal_client_id;
                $credential->paypal_secret = $request->live_paypal_secret;
            }

            ($request->paypal_status) ? $credential->paypal_status = 'active' : $credential->paypal_status = 'deactive';
        }

        if ($request->payment_method == 'stripe') {

            if($request->stripe_mode == 'test') {
                $credential->test_stripe_client_id = $request->test_stripe_client_id;
                $credential->test_stripe_secret = $request->test_stripe_secret;
                $credential->test_stripe_webhook_secret = $request->test_stripe_webhook_secret;
            }
            else {
                $credential->live_stripe_client_id = $request->live_stripe_client_id;
                $credential->live_stripe_secret = $request->live_stripe_secret;
                $credential->live_stripe_webhook_secret = $request->live_stripe_webhook_secret;
            }

            $credential->stripe_mode = $request->stripe_mode;
            ($request->stripe_status) ? $credential->stripe_status = 'active' : $credential->stripe_status = 'deactive';
        }

        if ($request->payment_method == 'razorpay') {

            if($request->razorpay_mode == 'test') {
                $credential->test_razorpay_key = $request->test_razorpay_key;
                $credential->test_razorpay_secret = $request->test_razorpay_secret;
            }
            else {
                $credential->live_razorpay_key = $request->live_razorpay_key;
                $credential->live_razorpay_secret = $request->live_razorpay_secret;
            }

            $credential->razorpay_mode = $request->razorpay_mode;
            ($request->razorpay_status) ? $credential->razorpay_status = 'active' : $credential->razorpay_status = 'inactive';
        }

        if ($request->payment_method == 'paystack') {

            $credential->paystack_mode = $request->paystack_mode;
            $credential->paystack_key = $request->paystack_key;
            $credential->paystack_secret = $request->paystack_secret;
            $credential->paystack_merchant_email = $request->paystack_merchant_email;
            $credential->test_paystack_key = $request->test_paystack_key;
            $credential->test_paystack_secret = $request->test_paystack_secret;
            $credential->test_paystack_merchant_email = $request->test_paystack_merchant_email;

            ($request->paystack_status) ? $credential->paystack_status = 'active' : $credential->paystack_status = 'deactive';
        }

        if ($request->payment_method == 'mollie') {

            $credential->mollie_api_key = $request->mollie_api_key;

            ($request->mollie_status) ? $credential->mollie_status = 'active' : $credential->mollie_status = 'deactive';
        }

        if ($request->payment_method == 'payfast') {

            $credential->payfast_merchant_id = $request->payfast_merchant_id;
            $credential->payfast_merchant_key = $request->payfast_merchant_key;
            $credential->payfast_passphrase = $request->payfast_passphrase;
            $credential->payfast_mode = $request->payfast_mode;

            ($request->payfast_status) ? $credential->payfast_status = 'active' : $credential->payfast_status = 'deactive';
        }

        if ($request->payment_method == 'authorize') {

            $credential->authorize_api_login_id = $request->authorize_api_login_id;
            $credential->authorize_transaction_key = $request->authorize_transaction_key;
            $credential->authorize_environment = $request->authorize_environment;

            $credential->authorize_status = $request->authorize_status ? 'active' : 'deactive';
        }

        if ($request->payment_method == 'square') {

            $credential->square_application_id = $request->square_application_id;
            $credential->square_access_token = $request->square_access_token;
            $credential->square_location_id = $request->square_location_id;
            $credential->square_environment = $request->square_environment;

            $credential->square_status = $request->square_status ? 'active' : 'deactive';
        }

        if ($request->payment_method == 'flutterwave') {

            $credential->test_flutterwave_key = $request->test_flutterwave_key;
            $credential->test_flutterwave_secret = $request->test_flutterwave_secret;
            $credential->test_flutterwave_hash = $request->test_flutterwave_hash;
            $credential->live_flutterwave_key = $request->live_flutterwave_key;
            $credential->live_flutterwave_secret = $request->live_flutterwave_secret;
            $credential->live_flutterwave_hash = $request->live_flutterwave_hash;
            $credential->flutterwave_mode = $request->flutterwave_mode;
            $credential->flutterwave_webhook_secret_hash = $request->flutterwave_webhook_secret_hash;
            $credential->flutterwave_status = $request->flutterwave_status ? 'active' : 'deactive';
        }

        $credential->save();

        return Reply::success(__('messages.settingsUpdated'));
    }

}
