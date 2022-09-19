<?php

namespace App\Models;

/**
 * App\Models\PaymentGatewayCredentials
 *
 * @property int $id
 * @property string|null $paypal_client_id
 * @property string|null $paypal_secret
 * @property string $paypal_status
 * @property string|null $stripe_client_id
 * @property string|null $stripe_secret
 * @property string|null $stripe_webhook_secret
 * @property string $stripe_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $razorpay_key
 * @property string|null $razorpay_secret
 * @property string $razorpay_status
 * @property string $paypal_mode
 * @property string|null $sandbox_paypal_client_id
 * @property string|null $sandbox_paypal_secret
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaypalStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpayKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpaySecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpayStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSandboxPaypalClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSandboxPaypalSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeWebhookSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $live_stripe_client_id
 * @property string|null $live_stripe_secret
 * @property string|null $live_stripe_webhook_secret
 * @property string|null $live_razorpay_key
 * @property string|null $live_razorpay_secret
 * @property string|null $test_stripe_client_id
 * @property string|null $test_stripe_secret
 * @property string|null $test_razorpay_key
 * @property string|null $test_razorpay_secret
 * @property string|null $test_stripe_webhook_secret
 * @property string $stripe_mode
 * @property string $razorpay_mode
 * @property string|null $paystack_key
 * @property string|null $paystack_secret
 * @property string|null $paystack_status
 * @property string|null $paystack_merchant_email
 * @property string|null $paystack_payment_url
 * @property string|null $mollie_api_key
 * @property string|null $mollie_status
 * @property string|null $payfast_merchant_id
 * @property string|null $payfast_merchant_key
 * @property string|null $payfast_passphrase
 * @property string $payfast_mode
 * @property string|null $payfast_status
 * @property string|null $authorize_api_login_id
 * @property string|null $authorize_transaction_key
 * @property string $authorize_environment
 * @property string $authorize_status
 * @property string|null $square_application_id
 * @property string|null $square_access_token
 * @property string|null $square_location_id
 * @property string $square_environment
 * @property string $square_status
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereAuthorizeApiLoginId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereAuthorizeEnvironment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereAuthorizeStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereAuthorizeTransactionKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveRazorpayKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveRazorpaySecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveStripeClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveStripeSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveStripeWebhookSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereMollieApiKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereMollieStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePayfastMerchantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePayfastMerchantKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePayfastMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePayfastPassphrase($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePayfastStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackMerchantEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackPaymentUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereRazorpayMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSquareAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSquareApplicationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSquareEnvironment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSquareLocationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereSquareStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereStripeMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestRazorpayKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestRazorpaySecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestStripeClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestStripeSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestStripeWebhookSecret($value)
 * @property string $paystack_mode
 * @property string|null $test_paystack_key
 * @property string|null $test_paystack_secret
 * @property string|null $test_paystack_merchant_email
 * @property string $flutterwave_status
 * @property string $flutterwave_mode
 * @property string|null $test_flutterwave_key
 * @property string|null $test_flutterwave_secret
 * @property string|null $test_flutterwave_hash
 * @property string|null $live_flutterwave_key
 * @property string|null $live_flutterwave_secret
 * @property string|null $live_flutterwave_hash
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereFlutterwaveMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereFlutterwaveStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveFlutterwaveHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveFlutterwaveKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereLiveFlutterwaveSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials wherePaystackMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestFlutterwaveHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestFlutterwaveKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestFlutterwaveSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestPaystackKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestPaystackMerchantEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentGatewayCredentials whereTestPaystackSecret($value)
 */
class PaymentGatewayCredentials extends BaseModel
{
    //
}
