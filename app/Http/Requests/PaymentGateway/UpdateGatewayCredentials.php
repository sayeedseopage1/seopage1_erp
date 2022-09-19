<?php

namespace App\Http\Requests\PaymentGateway;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGatewayCredentials extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $rules = [];

        if ($this->payment_method == 'paypal' && $this->paypal_status == 'active') {
            $rules = ['paypal_mode' => 'required|in:sandbox,live'];

            if($this->paypal_mode == 'sandbox') {
                $rules['sandbox_paypal_client_id'] = 'required';
                $rules['sandbox_paypal_secret'] = 'required';
            }
            else {
                $rules['live_paypal_client_id'] = 'required';
                $rules['live_paypal_secret'] = 'required';
            }
        }

        if ($this->payment_method == 'stripe' && $this->stripe_status == 'active') {
            $rules = ['stripe_mode' => 'required|in:test,live'];

            if($this->stripe_mode == 'test') {
                $rules['test_stripe_client_id'] = 'required';
                $rules['test_stripe_secret'] = 'required';
            }
            else {
                $rules['live_stripe_client_id'] = 'required';
                $rules['live_stripe_secret'] = 'required';
            }
        }

        if ($this->payment_method == 'razorpay' && $this->razorpay_status == 'active') {
            $rules = ['razorpay_mode' => 'required|in:test,live'];

            if($this->razorpay_mode == 'test') {
                $rules['test_razorpay_key'] = 'required';
                $rules['test_razorpay_secret'] = 'required';
            }
            else {
                $rules['live_razorpay_key'] = 'required';
                $rules['live_razorpay_secret'] = 'required';
            }
        }

        if ($this->payment_method == 'paystack' && $this->paystack_status == 'active') {
            $rules['paystack_mode'] = 'required|in:sandbox,live';

            if ($this->paystack_mode == 'sandbox') {
                $rules['test_paystack_key'] = 'required';
                $rules['test_paystack_secret'] = 'required';
                $rules['test_paystack_merchant_email'] = 'required';
            }
            else {
                $rules['paystack_key'] = 'required';
                $rules['paystack_secret'] = 'required';
                $rules['paystack_merchant_email'] = 'required';
            }

        }

        if ($this->payment_method == 'flutterwave' && $this->flutterwave_status == 'active') {
            $rules['flutterwave_mode'] = 'required|in:sandbox,live';
            $rules['flutterwave_webhook_secret_hash'] = 'nullable';

            if ($this->flutterwave_mode == 'sandbox') {
                $rules['test_flutterwave_key'] = 'required';
                $rules['test_flutterwave_secret'] = 'required';
                $rules['test_flutterwave_hash'] = 'required';
            }
            else {
                $rules['live_flutterwave_key'] = 'required';
                $rules['live_flutterwave_secret'] = 'required';
                $rules['live_flutterwave_hash'] = 'required';
            }

        }

        if ($this->payment_method == 'mollie' && $this->mollie_status == 'active') {
            $rules['mollie_api_key'] = 'required';
        }

        if ($this->payment_method == 'payfast' && $this->payfast_status == 'active') {
            $rules['payfast_merchant_id'] = 'required';
            $rules['payfast_merchant_key'] = 'required';
            $rules['payfast_passphrase'] = 'required';
            $rules['payfast_mode'] = 'required';
        }

        if ($this->payment_method == 'authorize' && $this->authorize_status == 'active') {
            $rules['authorize_api_login_id'] = 'required';
            $rules['authorize_transaction_key'] = 'required';
            $rules['authorize_environment'] = 'required';
        }

        if ($this->payment_method == 'square' && $this->square_status == 'active') {
            $rules['square_application_id'] = 'required';
            $rules['square_access_token'] = 'required';
            $rules['square_location_id'] = 'required';
            $rules['square_environment'] = 'required';
        }

        return $rules;
    }

}
