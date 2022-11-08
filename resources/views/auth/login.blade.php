<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seopage1</title>

        <!-- Bootstrap 5 CDN  -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />

        <!-- Animate css CDN  -->

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <!-- Fontawesome CDN -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />

        <!-- google font  -->

        <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
        </style>
        <link rel="stylesheet" href="{{asset('custom/css/style.css')}}" />
        <!-- <link rel="stylesheet" type="text/css" href="{{asset('custom/vendor/select2/select2.min.css')}}" /> -->
        <link rel="stylesheet" type="text/css" href="{{asset('custom/css/util.css')}}" />
        <link rel="stylesheet" type="text/css" href="{{asset('custom/css/main.css')}}" />
        <link rel="stylesheet" href="{{asset('custom/css/responsive.css')}}" />
    </head>
    <body>

        <div class="limiter">
            <div class="container-login100">


                <div class="wrap-login100">


                  <div class="login100-pic js-tilt" data-tilt>
                      <img class="animate__animated animate__zoomIn" src="{{asset('custom/img/login.png')}}" alt="IMG" />
                  </div>

                    <form id="login-form" action="{{ route('login') }}" class="ajax-form" method="POST">
                        {{ csrf_field() }}

                        <span class="login100-form-title wow animate__animated animate__fadeInUp" id="singin_logo">
                            <!-- Sign In -->
                            <img src="{{asset('custom/img/logo2.png')}}" alt="">
                        </span>

                        <div class="wrap-input100 validate-input wow animate__animated animate__fadeInUp" data-validate="Valid User Name* is required: ex@ john doe">
                            <input class="input100" type="email" name="email" id="email" placeholder="Email*" />

                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                              <input type="hidden" id="g_recaptcha" name="g_recaptcha">
                        </div>
                        @if ($socialAuthSettings->social_auth_enable)
                            <button type="submit" id="submit-next"
                                    class="btn-primary f-w-500 rounded w-100 height-50 f-18 ">@lang('auth.next') <i
                                    class="fa fa-arrow-right pl-1"></i></button>
                        @endif

                        <div id="password-section"
                             @if ($socialAuthSettings->social_auth_enable) class="d-none" @endif>
                        <div  class="wrap-input100 validate-input wow animate__animated animate__fadeInUp" data-validate="Password is required">
                            <input class="input100" type="password" name="password" id="password" placeholder="Password*" />
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                      </div>
                      @if ($setting->google_recaptcha_status == 'active' && $setting->google_recaptcha_v2_status == 'active')
                          <div class="form-group" id="captcha_container"></div>
                      @endif

                      @if ($errors->has('g-recaptcha-response'))
                          <div class="help-block with-errors">{{ $errors->first('g-recaptcha-response') }}
                          </div>
                      @endif

                        <div class="container-login100-form-btn wow animate__animated animate__fadeInUp">
                            <button class="login100-form-btn" id="submit-login" type="submit">
                                Sign in
                            </button>
                        </div>
                        @if ($errors->any())
                            <div class="alert alert-danger gfg border rounded-pill mt-4">

                                    @foreach ($errors->all() as $error)
                                        {{ $error }}
                                    @endforeach

                            </div>
                        @endif
                    </form>
                </div>
            </div>
        </div>
        {{-- Start Custom Js Files--}}
        <script src="{{asset('custom/js/jquery-3.6.1.min.js')}}"></script>
        <script src="{{asset('custom/js/wow.min.js')}}"></script>
        <script src="{{asset('custom/js/tilt.jquery.min.js')}}"></script>

        <script src="{{asset('custom/js/main.js')}}"></script>

        <script>
            new WOW().init();
        </script>

        <script>
            $(".js-tilt").tilt({
                scale: 1.2,
            });
        </script>
        {{-- End Custom Js Files--}}
        <x-slot name="scripts">


            @if ($setting->google_recaptcha_status == 'active' && $setting->google_recaptcha_v2_status == 'active')
                <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async
                        defer></script>
                <script>
                    var gcv3;
                    var onloadCallback = function () {
                        // Renders the HTML element with id 'captcha_container' as a reCAPTCHA widget.
                        // The id of the reCAPTCHA widget is assigned to 'gcv3'.
                        gcv3 = grecaptcha.render('captcha_container', {
                            'sitekey': '{{ $setting->google_recaptcha_v2_site_key }}',
                            'theme': 'light',
                            'callback': function (response) {
                                if (response) {
                                    $('#g_recaptcha').val(response);
                                }
                            },
                        });
                    };
                </script>
            @endif
            @if ($setting->google_recaptcha_status == 'active' && $setting->google_recaptcha_v3_status == 'active')
                <script
                    src="https://www.google.com/recaptcha/api.js?render={{ $setting->google_recaptcha_v3_site_key }}"></script>
                <script>
                    grecaptcha.ready(function () {
                        grecaptcha.execute('{{ $setting->google_recaptcha_v3_site_key }}').then(function (token) {
                            // Add your logic to submit to your backend server here.
                            $('#g_recaptcha').val(token);
                        });
                    });
                </script>
            @endif

            <script>
                $(document).ready(function () {
                    $('#submit-next').click(function (event) {
                        event.preventDefault();
                        const url = "{{ route('check_email') }}";
                        $.easyAjax({
                            url: url,
                            container: '#login-form',
                            disableButton: true,
                            buttonSelector: "#submit-next",
                            type: "POST",
                            data: $('#login-form').serialize(),
                            success: function (response) {
                                if (response.status === 'success') {
                                    $('#submit-next').remove();
                                    $('#password-section').removeClass('d-none');
                                    $("#password").focus();
                                }
                            }
                        })
                    });

                    $('#submit-login').click(function (event) {
                        event.preventDefault();

                        const url = "{{ route('login') }}";
                        $.easyAjax({
                            url: url,
                            container: '.login_box',
                            disableButton: true,
                            buttonSelector: "#submit-login",
                            type: "POST",
                            blockUI: true,
                            data: $('#login-form').serialize(),
                            success: function (response) {
                                if (response.two_factor == false) {
                                    window.location.href = "{{ session()->has('url.intended') ? session()->get('url.intended') : route('dashboard') }}";
                                } else if (response.two_factor == true) {
                                    window.location.href = "{{ url('two-factor-challenge') }}";
                                }
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




    </body>
</html>
