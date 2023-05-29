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
                <h2 class="text-center">Form Type: Product Descriptions</h2>
                <hr />
                <!-- form   -->


                <form class="row g-3" action="" method="post" id="storeProductDescription">
                @csrf

                <!-- Website Link & Niche Starts Here -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Website Link & Niche:</h6>
                        </div>
                        <div class="col-md-6">
                            <input type="url" name="website_link" id="website_link" class="form-control placeholderText height-35 f-14" placeholder="https://asdasd.com or https://www.asdasd.com">
                        </div>
                        <div class="col-md-3">
                            <input type="text" name="website_niche" id="website_niche" class="form-control placeholderText height-35 f-14" placeholder="Write Your Niche (Pet Care, Digital Marketing)">
                        </div>
                    </div>
                    <!-- Website Link & Niche Ends Here -->
                    <!-- Website Name/Business Name -->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Website Name/Business Name:</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="website_name" id="website_name" class="form-control placeholderText height-35 f-14" placeholder="Type Your Business/Website Name">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Business profile/Leaflet/Brochure/Any important information:</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <textarea name="business_information" id="business_information" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here"></textarea>
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
                                    </div>
                                </div>
                                <div class="row mt-3" id="folderLinkForm" style="display: none;">
                                    <div class="col-md-10 dynamic-folder-link" id="dynamic-folder-link-list-1">
                                        <div class="row mb-3">
                                            <div class="col-md-12">
                                                <input type="text" name="folder_link[]" id="folder_link" class="form-control placeholderText height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here">
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
                            </div>
                        </div>
                    </div>

                    <!--Reference Blogs-->
                    <div class="row mt-3">
                        <div class="col-md-10 dynamic-blog-url" id="dynamic-blog-url-list-1">
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <h6>Reference product descriptions for the tone and style:</h6>
                                </div>
                                <div class="col-md-9">
                                    <div class="form-group" style="margin-left: 50px;">
                                        <input type="url" id="blog_url" class="form-control placeholderText height-35 f-14" placeholder="Enter reference blog url" name="blog_url[]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-blog-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-blog-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                    <!--Product Description-->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>How many product descriptions do you need written?</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="product_no" id="product_no" class="form-control placeholderText height-35 f-14" placeholder="Input the no. of products here!">
                        </div>
                    </div>
                    <!--Product list-->
                    <div class="row mt-3">
                        <div class="col-md-10 dynamic-productList" id="dynamic-productList-list-1">
                            <div class="row mb-3">
                                <div class="col-md-3">
                                    <h6>Add product list:</h6>
                                </div>
                                <div class="col-md-9">
                                    <div class="form-group" style="margin-left: 50px;">
                                        <input type="text" id="product_list" class="form-control placeholderText height-35 f-14" placeholder="Paste products page link, or google sheet link here" name="product_list[]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-productList-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-productList-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>

                    <!--Expected word cont-->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Expected word count per product</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="word_count" id="word_count" class="form-control placeholderText height-35 f-14" placeholder="Input word count here">
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary rounded-pill py-0 px-5" id="submitBtn2">Submit</button>
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
            $('#folderLinkForm').toggle();
        });
    });
    $('#submitBtn2').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#submitBtn2').attr("disabled", true);
        $('#submitBtn2').html("Processing...");
        var share_file_info = $('input[name="share_file_info"]:checked').val();
        var topic_info = $('input[name="topic_info"]:checked').val();
        var keyword_info = $('input[name="keyword_info"]:checked').val();
        var folder_link = document.getElementsByName("folder_link[]");
        var folder_link_values = [];
        for (var i = 0; i < folder_link.length; i++) {
            folder_link_values.push(folder_link[i].value);
        }
        var blog_url = document.getElementsByName("blog_url[]");
        var blog_url_values = [];
        for (var i = 0; i < blog_url.length; i++) {
            blog_url_values.push(blog_url[i].value);
        }
        var product_list = document.getElementsByName("product_list[]");
        var product_list_values = [];
        for (var i = 0; i < product_list.length; i++) {
            product_list_values.push(product_list[i].value);
        }
        var data= {
            '_token': "{{ csrf_token() }}",
            'website_link': document.getElementById("website_link").value,
            'website_niche': document.getElementById("website_niche").value,
            'website_name': document.getElementById("website_name").value,
            'business_information': document.getElementById("business_information").value,
            'product_no': document.getElementById("product_no").value,
            'word_count': document.getElementById("word_count").value,
            'share_file_info': share_file_info,
            'folder_link': folder_link_values,
            'blog_url': blog_url_values,
            'product_list': product_list_values,
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store_product_description')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status==200) {
                    $(location).prop('href', '{{url('/thankyou')}}');
                    toastr.success('Product Description Added Successfully');
                    $('#submitBtn2').attr("disabled", false);
                    $('#submitBtn2').html("Submit");
                }
            },
            error: function(error) {
                // console.log(response);
                $('#submitBtn2').attr("disabled", false);
                $('#submitBtn2').html("Submit");
            }
        });
    });


    $(document).ready(function () {
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
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
        var buttonAdd = $("#add-blog-button");
        var buttonRemove = $("#remove-blog-button");
        var className = ".dynamic-blog-url";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="blog_url[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-blog-url-list-1").clone();
            field.attr("id", "dynamic-blog-url-" + count);
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
        var buttonAdd = $("#add-productList-button");
        var buttonRemove = $("#remove-productList-button");
        var className = ".dynamic-productList";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="product_list[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-productList-list-1").clone();
            field.attr("id", "dynamic-productList-" + count);
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
