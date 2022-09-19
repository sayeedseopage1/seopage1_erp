<x-auth>
    <form id="login-form" action="{{ route('login') }}" class="ajax-form" method="POST">
        {{ csrf_field() }}
        <section class="bg-grey py-5 login_section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="login_box mx-auto rounded bg-white text-center">
                            <h3 class="text-capitalize mb-4 f-w-500">@lang('app.signUpAsClient')</h3>

                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif

                            <div class="form-group text-left">
                                <label for="name">@lang('app.name') <sup class="f-14 mr-1">*</sup></label>
                                <input type="text" tabindex="1" name="name"
                                    class="form-control height-50 f-15 light_text"
                                    placeholder="@lang('placeholders.name')" id="name" autofocus>
                            </div>

                            <div class="form-group text-left">
                                <label for="email">@lang('auth.email') <sup class="f-14 mr-1">*</sup></label>
                                <input tabindex="2" type="email" name="email"
                                    class="form-control height-50 f-15 light_text"
                                    placeholder="e.g. admin@example.com" id="email">
                                <input type="hidden" id="g_recaptcha" name="g_recaptcha">
                            </div>

                            <div class="form-group text-left">
                                <label for="password">@lang('app.password') <sup class="f-14 mr-1">*</sup></label>
                                <x-forms.input-group>
                                    <input type="password" name="password" id="password"
                                        placeholder="@lang('placeholders.password')" tabindex="3"
                                        class="form-control height-50 f-15 light_text">
                                    <x-slot name="append">
                                        <button type="button" tabindex="4" data-toggle="tooltip"
                                            data-original-title="@lang('app.viewPassword')"
                                            class="btn btn-outline-secondary border-grey height-50 toggle-password"><i
                                                class="fa fa-eye"></i></button>
                                    </x-slot>
                                </x-forms.input-group>
                            </div>

                            <div class="form-group text-left">
                                <label for="company_name">@lang('modules.client.companyName')</label>
                                <input type="text" tabindex="5" name="company_name"
                                    class="form-control height-50 f-15 light_text"
                                    placeholder="@lang('placeholders.company')" id="company_name">
                            </div>

                            @if ($setting->google_recaptcha_status == 'active' && $setting->google_recaptcha_v2_status == 'active')
                                <div class="form-group" id="captcha_container"></div>
                            @endif

                            @if ($errors->has('g-recaptcha-response'))
                                <div class="help-block with-errors">{{ $errors->first('g-recaptcha-response') }}
                                </div>
                            @endif

                            <button type="button" id="submit-register"
                                class="btn-primary f-w-500 rounded w-100 height-50 f-18">
                                @lang('app.signUp') <i class="fa fa-arrow-right pl-1"></i>
                            </button>

                            <a href="{{ route('login') }}"
                                class="btn-secondary f-w-500 rounded w-100 height-50 f-15 mt-3">
                                @lang('app.login')
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </form>

    <x-slot name="scripts">

        <script>
            $(document).ready(function() {

                $('#submit-register').click(function() {

                    const url = "{{ route('register') }}";

                    $.easyAjax({
                        url: url,
                        container: '.login_box',
                        disableButton: true,
                        buttonSelector: "#submit-register",
                        type: "POST",
                        blockUI: true,
                        data: $('#login-form').serialize(),
                        success: function(response) {
                            window.location.href = "{{ route('dashboard') }}";
                        }
                    })
                });

                @if (session('message'))
                    Swal.fire({
                    icon: 'error',
                    text: '{{ session('message') }}',
                    showConfirmButton: true,
                    customClass: {
                    confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                    },
                    })
                @endif

            });
        </script>
    </x-slot>

</x-auth>
