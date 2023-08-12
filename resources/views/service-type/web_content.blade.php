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
                <h2 class="text-center">Form Type: Web Content</h2>
                <h5 class="text-center">(Home, About, Services, Contact And Other Pages Except For Blogs, Product Description And Product Reviews)</h5>
                <hr />
                <!-- form   -->


                <form class="row g-3" action="{{route('store_web_content')}}" method="post" id="storeServiceType">
                    @csrf
                    <!-- Website Link & Niche Starts Here -->
                    <input type="hidden" name="random_id" id="random_id" value="{{$random_id}}">
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Website Link & Niche:</h6>
                        </div>
                        <div class="col-md-6">
                            <input type="url" name="website_link" id="website_link" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                            <span id="website_link_error" class="text-danger"></span>
                        </div>
                        <div class="col-md-3">
                            <input type="text" name="website_niche" id="website_niche" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                            <span id="website_niche_error" class="text-danger"></span>
                        </div>
                    </div>
                        <!-- Website Link & Niche Ends Here -->

                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Website Name/Business Name:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="website_name" id="website_name" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                            <span id="website_name_error" class="text-danger"></span>
                        </div>
                    </div>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                            </div>
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-6">
                                        <textarea name="business_information" id="business_information" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!"></textarea>
                                        <span id="business_information_error" class="text-danger"></span>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="">Want to share file?</label>
                                            <div class="mt-2 d-flex">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="share_file_info" value="1" id="yesBtn">
                                                    <label class="form-check-label" for="yesBtn">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div class="form-check" style="margin-left: 10px;">
                                                    <input class="form-check-input" type="radio" name="share_file_info" value="0" id="noBtn">
                                                    <label class="form-check-label" for="noBtn">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                            <span id="share_file_info_error" class="text-danger"></span>
                                        </div>
                                    </div>
                                    <div class="row mt-3" id="folderLinkForm" style="display: none;">
                                        <div class="col-md-10 dynamic-folder-link" id="dynamic-folder-link-list-1">
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <input type="text" name="folder_link[]" id="folder_link" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
                                                    <span id="folder_link_error" class="text-danger"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 append-buttons">
                                            <div class="clearfix">
                                                <button type="button" id="add-folder-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                                <button type="button" id="remove-folder-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    <div class="row mt-3">
                        <div class="col-md-10 dynamic-product" id="dynamic-product-list-1">
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <h6>Competitors/Reference Website:</h6>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" style="margin-left: 50px;">
                                        <input type="text" id="reference_website" class="form-control placeholderText height-35 f-14" placeholder="Type your reference website" name="reference_website[]"/>
                                        <span id="reference_website_error" class="text-danger"></span>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="">Does your competitor's content match exactly to what you do?</label>
                                        <div class="mt-2 d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="competitor_content" value="1" id="yesBtn1">
                                                <label class="form-check-label" for="yesBtn1">
                                                    Yes
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="competitor_content" value="0" id="noBtn1">
                                                <label class="form-check-label" for="noBtn1">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                        <span id="competitor_content_error" class="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3 mb-4" id="noForm" style="display: none;">
                                <div class="col-3"></div>
                                <div class="col-9" style="padding-left: 62px;">
                                    <div class="row">
                                        <div class="col-4">
                                            <label class="form-label" for="">What are the major differences?</label>
                                        </div>

                                        <div class="col-4">
                                            <label class="form-label" for="">What are things that they do, and you don't?</label>
                                        </div>
                                        <div class="col-4">
                                            <label class="form-label" for="">What are things that they don't, and you do?</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4">
                                            <textarea name="description1[]" id="description1" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                            <span id="description1_error" class="text-danger"></span>
                                        </div>

                                        <div class="col-4">
                                            <textarea name="description2[]" id="description2"  rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                            <span id="description2_error" class="text-danger"></span>
                                        </div>
                                        <div class="col-4">
                                            <textarea name="description3[]" id="description3" rows="3" class="form-control placeholderText" placeholder="Type your input here"></textarea>
                                            <span id="description3_error" class="text-danger"></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-2 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                        <!--Service/product list-->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Service/Product list:</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" id="product_list" class="form-control placeholderText height-35 f-14" placeholder="Type your page or product name" name="product_list"/>
                                <span id="product_list_error" class="text-danger"></span>
                            </div>
                        </div>
                    </div>

                     <!--Pages List-->
                        <div class="row mt-4">
                            <div class="col-md-10 dynamic-page" id="dynamic-page-list-1">
                                <div class="row mb-3">
                                    <div class="col-md-3" style="margin-top: 22px;">
                                        <h6>Pages list:</h6>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group" style="margin-left: 50px;">
                                            <label for="">Type Page name</label>
                                            <input type="text" name="page_name[]" id="page_name" class="form-control placeholderText height-35 f-14" placeholder="Type page name">
                                            <span id="page_name_error" class="text-danger"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="">Quantity</label>
                                        <input type="number" name="quantity[]" id="quantity" class="form-control placeholderText height-35 f-14" placeholder="Type page quantity">
                                        <span id="quantity_error" class="text-danger"></span>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="">Approximate word count per page</label>
                                        <input type="text" name="approximate_word[]" id="approximate_word" class="form-control placeholderText height-35 f-14" placeholder="Approximate word count per page">
                                        <span id="approximate_word_error" class="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 append-buttons" style="margin-top: 22px;">
                                <div class="clearfix">
                                    <button type="button" id="add-page-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                    <button type="button" id="remove-page-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                </div>
                            </div>
                        </div>
                        <!--Demographic Information-->
                    <div class="row mt-3">
                        <h5 class="text-center py-3">Demographic Information</h5>
                        <div class="col-md-3" style="margin-top: 25px;">
                            <h6>Target Audience:</h6>
                        </div>
                        <div class="col-md-2">
                            <label for="">Gender</label>
                            <select name="gender" id="gender" class="form-control height-35 f-14 placeholderText">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="">Age (Put a Range)</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="number" name="age1" id="age1" class="form-control placeholderText height-35 f-14" placeholder="18">
                                    <span id="age1_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-6">
                                    <input type="number" name="age2" id="age2" class="form-control placeholderText height-35 f-14" placeholder="25 ">
                                    <span id="age2_error" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label for="">Monthly Income (in USD)</label>
                            <input type="text" name="monthly_income" id="monthly_income" class="form-control placeholderText height-35 f-14" placeholder="$">
                            <span id="monthly_income_error" class="text-danger"></span>
                        </div>
                        <div class="col-md-2">
                            <label for="">Education Level</label>
                            <input type="text" name="education_level" id="education_level" class="form-control placeholderText height-35 f-14" placeholder="Education Level">
                            <span id="education_level_error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <h5 class="text-center py-1">Geographic Location</h5>
                        <div class="col-md-3"></div>
                        <div class="col-md-4">
                            <label for="">Country</label>
                            <input type="text" name="country" id="country" class="form-control placeholderText height-35 f-14" placeholder="Type your country">
                            <span id="country_error" class="text-danger"></span>
                        </div>
                        <div class="col-md-5">
                            <label for="">City</label>
                            <input type="text" name="city" id="city" class="form-control placeholderText height-35 f-14" placeholder="Type your city">
                            <span id="city_error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <h5 class="text-center py-1">Interests</h5>
                        <div class="col-md-3"></div>
                        <div class="col-md-9">
                            <label for="">Write 1-2 lines about the interests and pain points of your target audience</label>
                            <textarea name="interest" id="interest" rows="5" class="form-control placeholderText"></textarea>
                            <span id="interest_error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <h5 class="text-center py-1">Buying Habits</h5>
                        <div class="col-md-3"></div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="">How does your client's target audience make purchasing decisions?</label>
                                    <textarea name="buying_habit1" id="buying_habit1" rows="5" class="form-control"></textarea>
                                    <span id="buying_habit1_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-4" style="margin-top: 20px;">
                                    <label for="">Do they shop online or in-store?</label>
                                    <textarea name="buying_habit2" id="buying_habit2" rows="5" class="form-control"></textarea>
                                    <span id="buying_habit2_error" class="text-danger"></span>
                                </div>
                                <div class="col-md-4" style="margin-top: 20px;">
                                    <label for="">What are their favorite brands?</label>
                                    <textarea name="buying_habit3" id="buying_habit3" rows="5" class="form-control"></textarea>
                                    <span id="buying_habit3_error" class="text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <h5 class="text-center py-1">Thor Native Language</h5>
                        <div class="col-md-3"></div>
                        <div class="col-md-9">
                            <label for="">What is their native language?</label>
                            <input type="text" name="language" id="language" class="form-control placeholderText height-35 f-14" placeholder="Type your language">
                            <span id="language_error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-12 text-center" style="margin-top: 50px;">
                        <button type="submit" data-name="submitted" class="btn btn-primary rounded-pill py-0 px-5" id="submitBtn1">Submit</button>
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
        $('#yesBtn').click(function() {
            $('#folderLinkForm').show();
        });

        $('#noBtn').click(function() {
            $('#folderLinkForm').hide();
        });
    });
    $(document).ready(function() {
        $('#noBtn1').click(function() {
            $('#noForm').show();
        });

        $('#yesBtn1').click(function() {
            $('#noForm').hide();
        });
    });
    $('#submitBtn1').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#submitBtn1').attr("disabled", true);
        $('#submitBtn1').html("Processing...");
        var dataName = this.getAttribute("data-name");
        var folder_link = document.getElementsByName("folder_link[]");
        var folder_link_values = [];
        for (var i = 0; i < folder_link.length; i++) {
            folder_link_values.push(folder_link[i].value);
        }
        var reference_website = document.getElementsByName("reference_website[]");
        var reference_website_values = [];
        for (var i = 0; i < reference_website.length; i++) {
            reference_website_values.push(reference_website[i].value);
        }
        var description1 = document.getElementsByName("description1[]");
        var description1_values = [];
        for (var i = 0; i < description1.length; i++) {
            description1_values.push(description1[i].value);
        }
        var description2 = document.getElementsByName("description2[]");
        var description2_values = [];
        for (var i = 0; i < description2.length; i++) {
            description2_values.push(description2[i].value);
        }
        var description3 = document.getElementsByName("description3[]");
        var description3_values = [];
        for (var i = 0; i < description3.length; i++) {
            description3_values.push(description3[i].value);
        }
        // var competitor_content = [];
        // var competitor_content_inputs = document.getElementsByName("competitor_content");
        // for (var i = 0; i < competitor_content_inputs.length; i++) {
        //     if (competitor_content_inputs[i].checked) {
        //         competitor_content.push(competitor_content_inputs[i].value);
        //     }
        // }
        var page_name = document.getElementsByName("page_name[]");
        var page_name_values = [];
        for (var i = 0; i < page_name.length; i++) {
            page_name_values.push(page_name[i].value);
        }
        var quantity = document.getElementsByName("quantity[]");
        var quantity_values = [];
        for (var i = 0; i < quantity.length; i++) {
            quantity_values.push(quantity[i].value);
        }
        var approximate_word = document.getElementsByName("approximate_word[]");
        var approximate_word_values = [];
        for (var i = 0; i < approximate_word.length; i++) {
            approximate_word_values.push(approximate_word[i].value);
        }

        var share_file_info = $('input[name="share_file_info"]:checked').val();
        var competitor_content = $('input[name="competitor_content"]:checked').val();

        var data= {
            '_token': "{{ csrf_token() }}",
            'website_link': document.getElementById("website_link").value,
            'website_niche': document.getElementById("website_niche").value,
            'website_name': document.getElementById("website_name").value,
            'business_information': document.getElementById("business_information").value,
            'share_file_info': share_file_info,
            'folder_link': folder_link_values,
            'reference_website': reference_website_values,
            'competitor_content': competitor_content,
            'description1': description1_values,
            'description2': description2_values,
            'description3': description3_values,
            'product_list': document.getElementById("product_list").value,
            'page_name': page_name_values,
            'quantity': quantity_values,
            'approximate_word': approximate_word_values,
            'gender': document.getElementById("gender").value,
            'age1': document.getElementById("age1").value,
            'age2': document.getElementById("age2").value,
            'monthly_income': document.getElementById("monthly_income").value,
            'education_level': document.getElementById("education_level").value,
            'country': document.getElementById("country").value,
            'city': document.getElementById("city").value,
            'interest': document.getElementById("interest").value,
            'buying_habit1': document.getElementById("buying_habit1").value,
            'buying_habit2': document.getElementById("buying_habit2").value,
            'buying_habit3': document.getElementById("buying_habit3").value,
            'language': document.getElementById("language").value,
            'random_id': document.getElementById("random_id").value,
            'status': dataName,
            'deal_id': {{$id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store_web_content')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status==200) {
                    $(location).prop('href', '{{url('/thankyou')}}');
                    toastr.success('Service Type Added Successfully');
                    $('#submitBtn1').attr("disabled", false);
                    $('#submitBtn1').html("Submit");
                }
            },
            error: function(error) {
                if(error.responseJSON.errors.website_link){
                    $('#website_link_error').text(error.responseJSON.errors.website_link);
                }else{
                    $('#website_link_error').text('');
                }
                if(error.responseJSON.errors.website_niche){
                    $('#website_niche_error').text(error.responseJSON.errors.website_niche);
                }else{
                    $('#website_niche_error').text('');
                }
                if(error.responseJSON.errors.website_name){
                    $('#website_name_error').text(error.responseJSON.errors.website_name);
                }else{
                    $('#website_name_error').text('');
                }
                if(error.responseJSON.errors.business_information){
                    $('#business_information_error').text(error.responseJSON.errors.business_information);
                }else{
                    $('#business_information_error').text('');
                }
                if(error.responseJSON.errors.share_file_info){
                    $('#share_file_info_error').text(error.responseJSON.errors.share_file_info);
                }else{
                    $('#share_file_info_error').text('');
                }
                if(error.responseJSON.errors.product_list){
                    $('#product_list_error').text(error.responseJSON.errors.product_list);
                }else{
                    $('#product_list_error').text('');
                }
                if(error.responseJSON.errors.age1){
                    $('#age1_error').text(error.responseJSON.errors.age1);
                }else{
                    $('#age1_error').text('');
                }
                if(error.responseJSON.errors.age2){
                    $('#age2_error').text(error.responseJSON.errors.age2);
                }else{
                    $('#age2_error').text('');
                }
                if(error.responseJSON.errors.monthly_income){
                    $('#monthly_income_error').text(error.responseJSON.errors.monthly_income);
                }else{
                    $('#monthly_income_error').text('');
                }
                if(error.responseJSON.errors.education_level){
                    $('#education_level_error').text(error.responseJSON.errors.education_level);
                }else{
                    $('#education_level_error').text('');
                }
                if(error.responseJSON.errors.country){
                    $('#country_error').text(error.responseJSON.errors.country);
                }else{
                    $('#country_error').text('');
                }
                if(error.responseJSON.errors.city){
                    $('#city_error').text(error.responseJSON.errors.city);
                }else{
                    $('#city_error').text('');
                }
                if(error.responseJSON.errors.interest){
                    $('#interest_error').text(error.responseJSON.errors.interest);
                }else{
                    $('#interest_error').text('');
                }
                if(error.responseJSON.errors.buying_habit1){
                    $('#buying_habit1_error').text(error.responseJSON.errors.buying_habit1);
                }else{
                    $('#buying_habit1_error').text('');
                }
                if(error.responseJSON.errors.buying_habit2){
                    $('#buying_habit2_error').text(error.responseJSON.errors.buying_habit2);
                }else{
                    $('#buying_habit2_error').text('');
                }
                if(error.responseJSON.errors.buying_habit3){
                    $('#buying_habit3_error').text(error.responseJSON.errors.buying_habit3);
                }else{
                    $('#buying_habit3_error').text('');
                }
                if(error.responseJSON.errors.language){
                    $('#language_error').text(error.responseJSON.errors.language);
                }else{
                    $('#language_error').text('');
                }
                $('#submitBtn1').attr("disabled", false);
                $('#submitBtn1').html("Submit");
            }
        });
    });

    $(document).ready(function () {
        var buttonAdd = $("#add-folder-button");
        var buttonRemove = $("#remove-folder-button");
        var className = ".dynamic-folder-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="folder_link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-folder-link-list-1").clone();
            field.attr("id", "dynamic-folder-link-" + count);
            field.find('input[name="folder_link[]"]').val("");
            field.find('input[name="folder_link[]"]').attr("id", "folder_link_" + count);
            $(className + ":last").after($(field));
        }


        function removeLastField() {
            if (totalFields() > 1) {
                $(className + ":last").remove();
            }
        }

        function enableButtonRemove() {
            if (totalFields() === 2) {
                buttonRemove.removeAttr("disabled");
                buttonRemove.addClass("shadow-sm");
            }
        }

        function disableButtonRemove() {
            if (totalFields() === 1) {
                buttonRemove.attr("disabled", "disabled");
                buttonRemove.removeClass("shadow-sm");
            }
        }

        function disableButtonAdd() {
            if (totalFields() === maxFields) {
                buttonAdd.attr("disabled", "disabled");
                buttonAdd.removeClass("shadow-sm");
            }
        }

        function enableButtonAdd() {
            if (totalFields() === maxFields - 1) {
                buttonAdd.removeAttr("disabled");
                buttonAdd.addClass("shadow-sm");
            }
        }

        buttonAdd.click(function () {
            addNewField();
            enableButtonRemove();
            disableButtonAdd();
        });

        buttonRemove.click(function () {
            removeLastField();
            disableButtonRemove();
            enableButtonAdd();
        });
    });
    $(document).ready(function () {
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
        var className = ".dynamic-product";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-product-list-1").clone();
            field.attr("id", "dynamic-product-" + count);
            field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
            field.find("input").attr("id", "linkError_" + 'total').val("");
            field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
            $(className + ":last").after($(field));
        }

        function removeLastField() {
            if (totalFields() > 1) {
                $(className + ":last").remove();
            }
        }

        function enableButtonRemove() {
            if (totalFields() === 2) {
                buttonRemove.removeAttr("disabled");
                buttonRemove.addClass("shadow-sm");
            }
        }

        function disableButtonRemove() {
            if (totalFields() === 1) {
                buttonRemove.attr("disabled", "disabled");
                buttonRemove.removeClass("shadow-sm");
            }
        }

        function disableButtonAdd() {
            if (totalFields() === maxFields) {
                buttonAdd.attr("disabled", "disabled");
                buttonAdd.removeClass("shadow-sm");
            }
        }

        function enableButtonAdd() {
            if (totalFields() === maxFields - 1) {
                buttonAdd.removeAttr("disabled");
                buttonAdd.addClass("shadow-sm");
            }
        }

        buttonAdd.click(function () {
            addNewField();
            enableButtonRemove();
            disableButtonAdd();
        });

        buttonRemove.click(function () {
            removeLastField();
            disableButtonRemove();
            enableButtonAdd();
        });
    });
    $(document).ready(function () {
        var buttonAdd = $("#add-page-button");
        var buttonRemove = $("#remove-page-button");
        var className = ".dynamic-page";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-page-list-1").clone();
            field.attr("id", "dynamic-page-" + count);
            field.children("label").attr("for", "linkError_" + 'total').text("Field " + count);
            field.find("input").attr("id", "linkError_" + 'total').val("");
            field.append('<span id="linkError_'+total+'" class="text-danger" for="link"></span>');
            $(className + ":last").after($(field));
        }

        function removeLastField() {
            if (totalFields() > 1) {
                $(className + ":last").remove();
            }
        }

        function enableButtonRemove() {
            if (totalFields() === 2) {
                buttonRemove.removeAttr("disabled");
                buttonRemove.addClass("shadow-sm");
            }
        }

        function disableButtonRemove() {
            if (totalFields() === 1) {
                buttonRemove.attr("disabled", "disabled");
                buttonRemove.removeClass("shadow-sm");
            }
        }

        function disableButtonAdd() {
            if (totalFields() === maxFields) {
                buttonAdd.attr("disabled", "disabled");
                buttonAdd.removeClass("shadow-sm");
            }
        }

        function enableButtonAdd() {
            if (totalFields() === maxFields - 1) {
                buttonAdd.removeAttr("disabled");
                buttonAdd.addClass("shadow-sm");
            }
        }

        buttonAdd.click(function () {
            addNewField();
            enableButtonRemove();
            disableButtonAdd();
        });

        buttonRemove.click(function () {
            removeLastField();
            disableButtonRemove();
            enableButtonAdd();
        });
    });
</script>
</body>
</html>
