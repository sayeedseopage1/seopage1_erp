<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seopag1 Erp</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- font-awesome  -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet" />
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="{{asset('custom/client/css/intlTelInput.css')}}">
    <link rel="stylesheet" href="{{asset('mobile/css/style.css')}}">

    <style media="screen">
        input, button {
            margin: 0;
            padding: 0;

        }
        .intl-tel-input {
            position: relative;
            display: inline-block;
            width: 100% !important;
        }
    </style>
    <style>
        .iti {
            position: relative;
            display: inline-block;
            width: 100%;
        }

        .ourfields .input-group-text {
            width: 130px;
        }
        .input-group.ourfields input {
            height: 38px !important;
            margin-left: -2px !important;
        }
        .hidden {
            visibility: hidden;
        }
        .placeholderText::placeholder{
            font-size: 12px;
        }

    </style>
</head>
<body>
<section class="freelancerseopage  py-5">
    <div class="container">
        <div class="row ">
            <div class="col-md-12 myshadow">
                <h2 class="text-center">Form Type: Basic SEO</h2>
                <hr />
                <!-- form   -->


                <form class="row g-3" action="" method="post" id="storeBasicSEO">
                    @csrf
                    <input type="hidden" name="deal_id" id="deal_id" value="{{$id}}">
                    <!-- Site Owner's Name -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Site Owner's Name:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="owner_name" id="owner_name" class="form-control placeholderText height-35 f-14" placeholder="Write site owner's name here">
                        </div>
                    </div>

                    <!-- Exact Business Name -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Exact Business Name:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="business_name" id="business_name" class="form-control placeholderText height-35 f-14" placeholder="Type your exact business name">
                        </div>
                    </div>

                    <!-- Full Address of Your Business -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Full Address of Your Business:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="business_address" id="business_address" class="form-control placeholderText height-35 f-14" placeholder="Type full address of your business">
                        </div>
                    </div>

                    <!-- Phone Number -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Phone Number:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="phone_number" id="phone_number" class="form-control placeholderText height-35 f-14" placeholder="Type phone number">
                        </div>
                    </div>

                    <!-- Zip Code -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Zip Code:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="zip_code" id="zip_code" class="form-control placeholderText height-35 f-14" placeholder="Type zip code">
                        </div>
                    </div>

                    <!-- Google Search -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Do you have a google search console account created?</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="google_search_info" value="1" id="yesBtn1">
                                    <label class="form-check-label" for="yesBtn1">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check" style="margin-left: 10px;">
                                    <input class="form-check-input" type="radio" name="google_search_info" value="0" id="noBtn1">
                                    <label class="form-check-label" for="noBtn1">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="mt-3" id="googleSearchYes" style="display:none;">
                                <div class="d-flex">
                                    <label for="">add info@seopage1.net as an admin there</label>
                                    <div class="form-check" style="margin-left: 30px;">
                                        <input class="form-check-input" type="radio" name="done1" value="1" id="done1">
                                        <label class="form-check-label" for="done1">
                                            Done
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3" id="googleSearchNo" style="display:none;">
                                <div class="row">
                                    <label for="">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                    <div class="col-md-6">
                                        <input type="email" name="email1" id="email1" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="password" name="password1" id="password1" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Google Analytics -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Do you have a google analytics account created?</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="google_analytic_info" value="1" id="yesBtn2">
                                    <label class="form-check-label" for="yesBtn2">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check" style="margin-left: 10px;">
                                    <input class="form-check-input" type="radio" name="google_analytic_info" value="0" id="noBtn2">
                                    <label class="form-check-label" for="noBtn2">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="mt-3" id="googleAnalyticYes" style="display:none;">
                                <div class="d-flex">
                                    <label for="">add info@seopage1.net as an admin there</label>
                                    <div class="form-check" style="margin-left: 30px;">
                                        <input class="form-check-input" type="radio" name="done2" value="1" id="done2">
                                        <label class="form-check-label" for="done2">
                                            Done
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3" id="googleAnalyticNo" style="display:none;">
                                <div class="row">
                                    <label for="">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                    <div class="col-md-6">
                                        <input type="email" name="email2" id="email2" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="password" name="password2" id="password2" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Google Business Account -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Do you have a google my business account created?</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="google_business_account_info" value="1" id="yesBtn3">
                                    <label class="form-check-label" for="yesBtn3">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check" style="margin-left: 10px;">
                                    <input class="form-check-input" type="radio" name="google_business_account_info" value="0" id="noBtn3">
                                    <label class="form-check-label" for="noBtn3">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="mt-3" id="googleBusinessAccountYes" style="display:none;">
                                <div class="d-flex">
                                    <label for="">add info@seopage1.net as an admin there</label>
                                    <div class="form-check" style="margin-left: 30px;">
                                        <input class="form-check-input" type="radio" name="done3" value="1" id="done3">
                                        <label class="form-check-label" for="done3">
                                            Done
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3" id="googleBusinessAccountNo" style="display:none;">
                                <div class="row">
                                    <label for="">Please open and share a gmail login and password so we can use it to create an account for you</label>
                                    <div class="col-md-6">
                                        <input type="email" name="email3" id="email3" class="form-control placeholderText height-35 f-14" placeholder="Type email here">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="password" name="password3" id="password3" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Share CMS Access -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Share CMS Access</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="share_cms_access_info" value="1" id="yesBtn4">
                                    <label class="form-check-label" for="yesBtn4">
                                        Share Direct Access
                                    </label>
                                </div>
                                <div class="form-check" style="margin-left: 10px;">
                                    <input class="form-check-input" type="radio" name="share_cms_access_info" value="0" id="noBtn4">
                                    <label class="form-check-label" for="noBtn4">
                                        Share Admin Access With My Email
                                    </label>
                                </div>
                            </div>
                            <div class="mt-3" id="shareCMSYes" style="display:none;">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label for="">Login URl</label>
                                        <input type="url" name="url" id="url" class="form-control placeholderText height-35 f-14" placeholder="https://admin.com">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="">Email/Username</label>
                                        <input type="text" name="user_name" id="user_name" class="form-control placeholderText height-35 f-14" placeholder="Type email/username here">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="">Password</label>
                                        <input type="password" name="password4" id="password4" class="form-control placeholderText height-35 f-14" placeholder="Type password here">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3" id="shareCMSNo" style="display:none;">
                                <div class="d-flex">
                                    <label for="">Please add info@seopage1.net as an admin there</label>
                                    <div class="form-check" style="margin-left: 30px;">
                                        <input class="form-check-input" type="radio" name="confirmAdding" value="1" id="confirmAdding">
                                        <label class="form-check-label" for="confirmAdding">
                                            Confirm After Adding
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary rounded-pill py-0 px-5" id="submitBtn4">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<script src="{{asset('custom/client/js/jquery-3.5.1.min.js')}}"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script>
    $(document).ready(function() {
        $('#yesBtn1').click(function() {
            $('#googleSearchYes').show();
            $('#googleSearchNo').hide();
        });
        $('#noBtn1').click(function() {
            $('#googleSearchYes').hide();
            $('#googleSearchNo').show();
        });
        $('#yesBtn2').click(function() {
            $('#googleAnalyticYes').show();
            $('#googleAnalyticNo').hide();
        });
        $('#noBtn2').click(function() {
            $('#googleAnalyticYes').hide();
            $('#googleAnalyticNo').show();
        });
        $('#yesBtn3').click(function() {
            $('#googleBusinessAccountYes').show();
            $('#googleBusinessAccountNo').hide();
        });
        $('#noBtn3').click(function() {
            $('#googleBusinessAccountYes').hide();
            $('#googleBusinessAccountNo').show();
        });
        $('#yesBtn4').click(function() {
            $('#shareCMSYes').show();
            $('#shareCMSNo').hide();
        });
        $('#noBtn4').click(function() {
            $('#shareCMSYes').hide();
            $('#shareCMSNo').show();
        });
    });
    $('#submitBtn4').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#submitBtn4').attr("disabled", true);
        $('#submitBtn4').html("Processing...");
        var google_search_info = $('input[name="google_search_info"]:checked').val();
        var google_analytic_info = $('input[name="google_analytic_info"]:checked').val();
        var google_business_account_info = $('input[name="google_business_account_info"]:checked').val();
        var share_cms_access_info = $('input[name="share_cms_access_info"]:checked').val();
        var done1 = $('input[name="done1"]:checked').val();
        var done2 = $('input[name="done2"]:checked').val();
        var done3 = $('input[name="done3"]:checked').val();
        var confirmAdding = $('input[name="confirmAdding"]:checked').val();

        var data= {
            '_token': "{{ csrf_token() }}",
            'owner_name': document.getElementById("owner_name").value,
            'business_name': document.getElementById("business_name").value,
            'business_address': document.getElementById("business_address").value,
            'phone_number': document.getElementById("phone_number").value,
            'zip_code': document.getElementById("zip_code").value,
            'google_search_info': google_search_info,
            'done1': done1,
            'email1': document.getElementById("email1").value,
            'password1': document.getElementById("password1").value,
            'google_analytic_info': google_analytic_info,
            'done2': done2,
            'email2': document.getElementById("email2").value,
            'password2': document.getElementById("password2").value,
            'google_business_account_info': google_business_account_info,
            'done3': done3,
            'email3': document.getElementById("email3").value,
            'password3': document.getElementById("password3").value,
            'share_cms_access_info': share_cms_access_info,
            'url': document.getElementById("url").value,
            'user_name': document.getElementById("user_name").value,
            'password4': document.getElementById("password4").value,
            'confirmAdding': confirmAdding,
            'deal_id': {{$id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store_product_basic_seo')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status==200) {
                    $(location).prop('href', '{{url('/thankyou')}}');
                    toastr.success('Product Basic SEO Added Successfully');
                    $('#submitBtn4').attr("disabled", false);
                    $('#submitBtn4').html("Submit");
                }
            },
            error: function(error) {
                // console.log(response);
                $('#submitBtn4').attr("disabled", false);
                $('#submitBtn4').html("Submit");
            }
        });
    });
</script>
</body>
</html>
