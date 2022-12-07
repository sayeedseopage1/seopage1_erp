<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You</title>

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
        <link rel="stylesheet" type="text/css" href="{{asset('custom/vendor/select2/select2.min.css')}}" />
        <link rel="stylesheet" type="text/css" href="{{asset('custom/css/util.css')}}" />
        <link rel="stylesheet" type="text/css" href="{{asset('custom/css/main.css')}}" />
        <link rel="stylesheet" href="{{asset('custom/css/responsive.css')}}" />
    </head>
    <body>
        <section class="wrapper py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-xl-6">
                        <div class="content_image wow animate__animated animate__zoomIn">
                            <img src="{{asset('custom/img/ERP_Thank_You.gif')}}" alt="" />
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-6">
                        <div class="thankyou_content">
                            <!-- <h1>Thank you!</h1> -->
                            <img class="thanks wow animate__animated animate__bounceIn" src="{{asset('custom/img/Thank_you.png')}}" alt="" />
                            <h3>Submission Successful <img class="check-mark wow animate__animated animate__bounceIn" src="{{asset('custom/img/check-mark.png')}}" alt="" /></h3>
                            <p>We've Got Your Information</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="thank_info pb-5">
            <div class="container">
                <div class="row">
                    <div class="col md-2 col-xl-2"></div>
                    <div class="col-md-8 col-xl-8">
                        <div class="datainfo animate__animated animate__fadeInUp">
                            <h4 class="pb-4 wow">Hi there!</h4>
                            <p>Thank you for subscribing. We will use these information in case of emergencies and if we can't reach out to you using our regular channels.</p>

                            <span class="lines"><hr /></span>
                            <span>Sincerely,</span>
                            <br />
                        Rajat Chakraboty
                        <br>
                            <span>
                              CEO, Seopage1 <br />

                            </span>

                          {{--  <h5>Connect With Us</h5>
                            <div class="social_icon">
                                <ul>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-facebook-f"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-youtube"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-linkedin-in"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-skype"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fa-brands fa-quora"></i></a>
                                    </li>
                                </ul>
                            </div>
                            --}}
                        </div>
                    </div>
                    <div class="col md-2 col-xl-2"></div>
                </div>
            </div>
        </section>

        <script src="{{asset('custom/js/jquery-3.6.1.min.js')}}"></script>
        <script src="{{asset('custom/js/wow.min.js')}}"></script>
        <script src="{{asset('custom/js/tilt.jquery.min.js')}}"></script>
        <script src="{{asset('custom/js/wow.min.js')}}"></script>
        <script src="{{asset('custom/js/main.js')}}"></script>

        <script>
            new WOW().init();
        </script>

        <script>
            $(".js-tilt").tilt({
                scale: 1.1,
            });
        </script>
    </body>
</html>
