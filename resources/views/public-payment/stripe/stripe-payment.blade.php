<div class="col-lg-12 col-md-12">
    <label for="card-element" class="font-bold"> @lang('modules.invoices.cardInfo') </label>
</div>
<div class="col-lg-12 col-md-12">
    <div id="card-element" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></div>
    <div id="card-error" class="text-red-400 text-bold mt-2 text-sm font-medium"></div>
</div>
<div class="col-lg-12 col-md-12 text-center mt-2 mb-2">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <button type="submit" class="btn-primary rounded f-15" id="card-button" data-secret="{{$intent->client_secret}}">
            <i class="fa fa-check mr-1"></i> {{ __('Pay') }}
    </button>
</div>

<script>
    @if($credentials->stripe_status == 'active')
    // A reference to Stripe.js initialized with your real test publishable API key.
    var stripe = Stripe('{{ $credentials->stripe_mode == "test" ? $credentials->test_stripe_client_id : $credentials->live_stripe_client_id }}');
    var clientDetails  = {!! json_encode($customerDetail) !!};

    // Disable the button until we have Stripe set up on the page
    var cardButton = document.getElementById('card-button');
    cardButton.disabled = true;
    var elements = stripe.elements();

    var style = {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    var card = elements.create("card", { style: style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        cardButton.disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });

    var form = document.getElementById("stripeAddress");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Block model UI until payment happens
        $.easyBlockUI('#stripeAddress');

        // Complete payment when the submit button is clicked
        payWithCard(stripe, card, '{{ $intent->client_secret }}');
    });

    // Calls stripe.confirmCardPayment
    // If the card requires authentication Stripe shows a pop-up modal to
    // prompt the user to enter authentication details without leaving your page.
    var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: clientDetails.name,
                        email: clientDetails.email,
                        address: {
                            line1: clientDetails.line1,
                            city: clientDetails.city,
                            state: clientDetails.state,
                            country: clientDetails.country
                        }
                    }
                }
            })
            .then(function(result) {
                if (result.error) {
                    // Make failed payment entry
                    paymentFailed(result);

                    // Show error to your customer
                    showError(result.error.message);
                } else {
                    // The payment succeeded!
                    orderComplete(result.paymentIntent.id);
                }
            });
    };

    /* ------- UI helpers ------- */

    // Shows a success message when the payment is complete
    var orderComplete = function(paymentIntentId) {
        loading(false);
        cardButton.disabled = true;
        $.easyAjax({
            url: "{{ route('stripe_public', $invoice->hash) }}",
            container: '#invoice_container',
            buttonSelector: "#card-button",
            disableButton: true,
            blockUI: true,
            type: "POST",
            redirect: true,
            data: {paymentIntentId: paymentIntentId, "_token" : "{{ csrf_token() }}" },
        })
    };

    var paymentFailed = function (result) {
        $.easyAjax({
            url: "{{ route('front.invoice_payment_failed', [$invoice->id]) }}",
            container: '#invoice_container',
            type: "POST",
            redirect: true,
            data: {errorMessage: result.error, gateway: 'Stripe',  "_token" : "{{ csrf_token() }}"},
            success: function(response) {
                // Unblock Modal UI when got error response
                $.easyUnblockUI('#stripeAddress');
            }
        })
    }

    // Show the customer the error from Stripe if their card fails to charge
    var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
            errorMsg.textContent = "";
        }, 4000);
    };

    // Show a spinner on payment submission
    var loading = function(isLoading) {
       cardButton.disabled = isLoading ? true : false;
    };

    @endif

</script>
