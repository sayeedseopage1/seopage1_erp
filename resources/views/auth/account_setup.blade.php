<x-auth>
    <form id="login-form" action="{{ route('setup_account') }}" class="ajax-form" method="POST">
        @include('sections.password-autocomplete-hide')

        {{ csrf_field() }}
        <input type="hidden" name="sendMail" value="no">

        <section class="bg-grey py-5 login_section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="login_box mx-auto rounded bg-white text-center">
                            <h3 class="text-capitalize mb-3 f-w-500">@lang('app.accountSetup')</h3>
                            <h6 class="mb-4 heading-h6 text-lightest">@lang('modules.accountSettings.accountSetupInfo')
                            </h6>

                            <div class="form-group text-left">
                                <label for="company_name"
                                    class="f-w-500">@lang('modules.accountSettings.companyName')</label>
                                <input type="text" name="company_name" class="form-control height-50 f-15 light_text"
                                    autofocus placeholder="@lang('placeholders.company')" id="company_name">
                            </div>

                            <div class="form-group text-left">
                                <label for="full_name" class="f-w-500">@lang('modules.employees.fullName')</label>
                                <input type="text" name="full_name" class="form-control height-50 f-15 light_text"
                                    autofocus placeholder="@lang('placeholders.name')" id="full_name">
                            </div>

                            <div class="form-group text-left">
                                <label for="email" class="f-w-500">@lang('app.email')</label>
                                <input type="text" name="email" class="form-control height-50 f-15 light_text" autofocus
                                    placeholder="@lang('placeholders.email')" id="email">
                            </div>

                            <div class="form-group text-left">
                                <label for="password" class="f-w-500">@lang('app.password')</label>
                                <div class='input-group'>
                                    <input type="password" name="password"
                                        class="form-control height-50 f-15 light_text" placeholder="Password"
                                        id="password">

                                    <div class="input-group-append">
                                        <button type="button" data-toggle="tooltip"
                                            data-original-title="@lang('app.viewPassword')"
                                            class="btn btn-outline-secondary border-grey toggle-password"><i
                                                class="fa fa-eye"></i></button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" id="submit-login"
                                class="btn-primary f-w-500 rounded w-100 height-50 f-18">
                                @lang('app.saveLogin') <i class="fa fa-arrow-right pl-1"></i>
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </form>

    <x-slot name="scripts">

        <script>

            $('#submit-login').click(function() {

                var url = "{{ route('setup_account') }}";
                $.easyAjax({
                    url: url,
                    container: '#login-form',
                    disableButton: true,
                    buttonSelector: "#submit-login",
                    type: "POST",
                    data: $('#login-form').serialize(),
                    success: function(response) {
                        if (response.status == 'success') {
                            var redirectUrl = "{{ route('checklist') }}";
                            window.location.href = redirectUrl;
                        }
                    }
                })
            });
        </script>
    </x-slot>

</x-auth>
