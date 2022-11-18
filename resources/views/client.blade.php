<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8" />
        <title></title>
        <link
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-
     alpha/css/bootstrap.css"
            rel="stylesheet"
        />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
        <link rel="stylesheet" href=" https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/css/intlTelInput.css'><link rel="stylesheet" href="{{asset('custom/mobilec/style.css')}}">
    </head>
    <body>
        <div class="container">
            <div class="d-flex justify-content-center" style="margin-top: 80px; margin-bottom: auto;">
                <div class="card" style="width: 40rem;">
                    <div class="card-body">
                        <h6>
                            We understand that you may not be available on freelancer.com the whole day. So we would like to have your contact information so the communication is smooth and your project is not delayed just because you
                            didn't get notified about our messages on freelancer.com!
                        </h6>
                        <hr />

                        <form class="" action="{{route('client-submission')}}" method="post">
                            @csrf

                            <input type="hidden" name="decrypt" value="{{$decrypt}}" />

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mt-3">
                                        <label for="input-state-2" class="form-label"><strong>Please put your freelancer.com username here!</strong></label>
                                        <input id="input-state-2" name="user_name" type="text" class="form-control @error('user_name') is-invalid @enderror" placeholder="Enter User Name" />
                                    </div>
                                    @error('user_name')
                                    <div class="mt-3">
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                    @enderror
                                </div>
                                <div class="col-md-12">
                                    <div class="mt-3">
                                        <label for="input-state-3" class="form-label"><strong>Your email (For future communication)!</strong></label>
                                        <input id="input-state-3" name="email" type="text" class="form-control @error('email') is-invalid @enderror" placeholder="Enter Your Email" />
                                    </div>
                                    @error('email')
                                    <div class="mt-3">
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                    @enderror
                                </div>
                            </div>

                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Phone number!</strong></label>
                                <input  name="client_phone" type="text" id="mobile_code" class="form-control" placeholder="Enter Your Phone number" />
                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea"><strong>Your WhatsApp ID (For future communication)!</strong></label>
                                <textarea class="form-control" name="client_whatsapp" placeholder="Leave a comment here" id="whatsapp"></textarea>
                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea"><strong>Any other instant messengers where you are mostly available (Example, skype, telegram etc.)! (optional)</strong></label>
                                <textarea class="form-control" name="other_platform" id="platform" placeholder="Leave a comment here"></textarea>
                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea">
                                    <strong>
                                      What time of the day should we primarily reach out to you for any queries, updates, etc. & what is your current timezone? (optional)
                                    </strong>
                                </label>
                                <textarea class="form-control" name="timezone" id="timezone" placeholder="Enter Text Here"></textarea>
                            </div>
                            <div class="mt-3">
                                <label for="floatingTextarea">
                                    <strong>
                                        Our working hour is 8 am-5 pm Monday-Friday and 8 am-1 pm on Saturday. We are off on Sunday (We are in the Bangladeshi timezone GMAT+6). You can convert the Bangladeshi timezone to your timezone here:
                                        <a target="_blank" href="https://dateful.com/time-zone-converter">https://dateful.com/time-zone-converter</a>. We may not be able to reply outside of our working hours. Please confirm if you are okay
                                        with this?
                                    </strong>
                                </label>
                                <textarea class="form-control" name="message" id="message" placeholder="Leave a comment here"></textarea>
                            </div>
                            <div class="mt-3 d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" charset="utf-8"></script>
        <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js'></script><script  src="{{asset('custom/mobilec/script.js')}}"></script>
        <script>
        $(document).ready(function () {
            $("#timezone").summernote();
        });
            $(document).ready(function () {
                $("#whatsapp").summernote();
            });
            $(document).ready(function () {
                $("#message").summernote();
            });
            $(document).ready(function () {
                $("#platform").summernote();
            });
        </script>

        <script>
            @if(Session::has('message'))
            toastr.options =
            {
            	"closeButton" : true,
            	"progressBar" : true
            }
            		toastr.success("{{ session('message') }}");
            @endif

            @if(Session::has('error'))
            toastr.options =
            {
            	"closeButton" : true,
            	"progressBar" : true
            }
            		toastr.error("{{ session('error') }}");
            @endif

            @if(Session::has('info'))
            toastr.options =
            {
            	"closeButton" : true,
            	"progressBar" : true
            }
            		toastr.info("{{ session('info') }}");
            @endif

            @if(Session::has('warning'))
            toastr.options =
            {
            	"closeButton" : true,
            	"progressBar" : true
            }
            		toastr.warning("{{ session('warning') }}");
            @endif
        </script>
    </body>
</html>
