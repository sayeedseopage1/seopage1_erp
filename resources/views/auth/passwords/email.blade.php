<x-auth>
    <form id="forgot-password-form" action="{{ route('password.email') }}" class="ajax-form" method="POST">
        {{ csrf_field() }}
        <section class="bg-grey py-5 login_section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="login_box mx-auto rounded bg-white text-center">

                            <h3 class="text-capitalize mb-4 f-w-500">@lang('app.recoverPassword')</h3>

                            <div class="alert alert-success m-t-10 d-none" id="success-msg"></div>

                            <div class="form-group text-left">
                                <label for="email" class="f-w-500">@lang('auth.email')</label>
                                <input type="email" name="email" class="form-control height-50 f-15 light_text"
                                    autofocus placeholder="e.g. admin@example.com" id="email">
                            </div>

                            <button
                                type="submit"
                                id="submit-login"
                                class="btn-primary f-w-500 rounded w-100 height-50 f-18">
                                @lang('app.sendPasswordLink') <i class="fa fa-arrow-right pl-1"></i>
                            </button>
                            <div class="forgot_pswd mt-3">
                                <a href="{{ route('login') }}" class="justify-content-center">@lang('app.login')</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>

    <x-slot name="scripts">
        <script>

            $('#submit-login').click(function() {

                var url = "{{ route('password.email') }}";
                $.easyAjax({
                    url: url,
                    container: '#forgot-password-form',
                    disableButton: true,
                    buttonSelector: "#submit-login",
                    type: "POST",
                    data: $('#forgot-password-form').serialize(),
                    success: function(response) {
                        $('#success-msg').removeClass('d-none');
                        $('#success-msg').html(response.message);
                    }
                })
            });

        </script>
    </x-slot>

</x-auth>
