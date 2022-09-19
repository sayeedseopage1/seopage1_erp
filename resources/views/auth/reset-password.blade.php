<x-auth>
    <form id="reset-password-form" action="{{ route('password.update') }}" class="ajax-form" method="POST">
        {{ csrf_field() }}
        <section class="bg-grey py-5 login_section">
            <div class="container">
                <div class="row">

                    <div class="col-md-12 text-center">
                        <div class="login_box mx-auto rounded bg-white text-center">

                            <h3 class="text-capitalize mb-4 f-w-500">@lang('app.resetPassword')</h3>

                            <div class="alert alert-success m-t-10 d-none" id="success-msg"></div>

                            <input type="hidden" name="token" value="{{ $request->route('token') }}">
                            <input type="hidden" name="email" value="{{ $request->email }}">

                            <div class="form-group text-left">
                                <label for="password">@lang('app.password')</label>

                                <input type="password" name="password"
                                    class="form-control height-50 f-15 light_text" placeholder="Password"
                                    id="password">
                            </div>

                            <div class="form-group text-left">
                                <label for="password">@lang('app.confirmPassword')</label>
                                <input type="password" name="password_confirmation"
                                    class="form-control height-50 f-15 light_text" placeholder="Confirm Password"
                                    id="password_confirmation">
                            </div>

                            <button
                                type="submit"
                                id="submit-login"
                                class="btn-primary f-w-500 rounded w-100 height-50 f-18">
                                @lang('app.resetPassword') <i class="fa fa-arrow-right pl-1"></i>
                            </button>

                        </div>
                        <div class="forgot_pswd mt-3">
                            <a href="{{ route('login') }}">@lang('app.login')</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>

    <x-slot name="scripts">
        <script>

            $('#submit-login').click(function() {

                var url = "{{ route('password.update') }}";
                $.easyAjax({
                    url: url,
                    container: '#reset-password-form',
                    disableButton: true,
                    buttonSelector: "#submit-login",
                    type: "POST",
                    data: $('#reset-password-form').serialize(),
                    success: function(response) {
                        $('#success-msg').removeClass('d-none');
                        $('#success-msg').html(response.message);
                        setTimeout(() => {
                            window.location.href = "{{ route('login') }}"
                        }, 2000);
                    }
                })
            });

        </script>
    </x-slot>

</x-auth>
