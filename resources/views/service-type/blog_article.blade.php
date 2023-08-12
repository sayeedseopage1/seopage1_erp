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
                <h2 class="text-center">Form Type: Blogs/Articles</h2>
                <hr />
                <!-- form   -->


                <form class="row g-3" action="" method="post" id="storeBlogArticle">
                @csrf
                    <input type="hidden" name="deal_id" id="deal_id" value="{{$id}}">
                    <input type="hidden" name="random_id" id="random_id" value="{{$random_id}}">
                <!-- Website Link & Niche Starts Here -->
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
                    <!-- Website Name/Business Name -->
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
                                    <div class="form-group">
                                        <textarea name="business_information" id="business_information" cols="3" rows="3" class="form-control placeholderText" placeholder="Put some details about your company here!"></textarea>
                                    </div>
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
                                    </div>
                                    <span id="share_file_info_error" class="text-danger"></span>
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
                                    <h6>Reference Blogs:</h6>
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
                            <h6>How many blogs/articles do you need written?</h6>
                        </div>
                        <div class="col-md-9">
                            <input type="text" name="product_no" id="product_no" class="form-control placeholderText height-35 f-14" placeholder="Input the no. of products here!">
                            <span id="product_no_error" class="text-danger"></span>
                        </div>
                    </div>
                    <!--Topics-->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Topics:</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="mt-2 d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="topic_info" value="1" id="topicBtn1">
                                                <label class="form-check-label" for="topicBtn1">
                                                    Research and collect topics for me
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="topic_info" value="0" id="topicBtn2">
                                                <label class="form-check-label" for="topicBtn2">
                                                    I have the topics
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <span id="topic_info_error" class="text-danger"></span>
                                </div>
                                <div class="row mt-3" id="topicForm" style="display: none;">
                                    <div class="col-md-10 dynamic-topic-link" id="dynamic-topic-link-list-1">
                                        <div class="row mb-3">
                                            <div class="col-md-12">
                                                <input type="text" name="topic_link[]" id="topic_link" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where topics are available">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 append-buttons">
                                        <div class="clearfix">
                                            <button type="button" id="add-topic-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                            <button type="button" id="remove-topic-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--Keywords-->
                    <div class="row mt-3">
                        <div class="col-md-3">
                            <h6>Keywords:</h6>
                        </div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="mt-2 d-flex">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="keyword_info" value="1" id="keywordBtn1">
                                                <label class="form-check-label" for="keywordBtn1">
                                                    Research and collect keywords for me
                                                </label>
                                            </div>
                                            <div class="form-check" style="margin-left: 10px;">
                                                <input class="form-check-input" type="radio" name="keyword_info" value="0" id="keywordBtn2">
                                                <label class="form-check-label" for="keywordBtn2">
                                                    I have the keywords
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <span id="keyword_info_error" class="text-danger"></span>
                                </div>
                                <div class="row mt-3" id="keywordForm" style="display: none;">
                                    <div class="col-md-10 dynamic-keyword-link" id="dynamic-keyword-link-list-1">
                                        <div class="row mb-3">
                                            <div class="col-md-12">
                                                <input type="text" name="keyword_link[]" id="keyword_link" class="form-control placeholderText height-35 f-14" placeholder="Share google doc or sheet or drive link where keywords are available">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 append-buttons">
                                        <div class="clearfix">
                                            <button type="button" id="add-keyword-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                            <button type="button" id="remove-keyword-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button type="submit" data-name="submitted" class="btn btn-primary rounded-pill py-0 px-5" id="submitBtn2">Submit</button>
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
        $('#topicBtn2').click(function() {
            $('#topicForm').show();
        });

        $('#topicBtn1').click(function() {
            $('#topicForm').hide();
        });
    });
    $(document).ready(function() {
        $('#keywordBtn2').click(function() {
            $('#keywordForm').show();
        });

        $('#keywordBtn1').click(function() {
            $('#keywordForm').hide();
        });
    });
    $('#submitBtn2').click(function(e){
        e.preventDefault();
        // console.log(formData);
        $('#submitBtn2').attr("disabled", true);
        $('#submitBtn2').html("Processing...");
        var dataName = this.getAttribute("data-name");
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
        var topic_link = document.getElementsByName("topic_link[]");
        var topic_link_values = [];
        for (var i = 0; i < topic_link.length; i++) {
            topic_link_values.push(topic_link[i].value);
        }
        var keyword_link = document.getElementsByName("keyword_link[]");
        var keyword_link_values = [];
        for (var i = 0; i < keyword_link.length; i++) {
            keyword_link_values.push(keyword_link[i].value);
        }
        var data= {
            '_token': "{{ csrf_token() }}",
            'website_link': document.getElementById("website_link").value,
            'website_niche': document.getElementById("website_niche").value,
            'website_name': document.getElementById("website_name").value,
            'business_information': document.getElementById("business_information").value,
            'product_no': document.getElementById("product_no").value,
            'random_id': document.getElementById("random_id").value,
            'share_file_info': share_file_info,
            'folder_link': folder_link_values,
            'blog_url': blog_url_values,
            'topic_info': topic_info,
            'topic_link': topic_link_values,
            'keyword_info': keyword_info,
            'keyword_link': keyword_link_values,
            'status': dataName,
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
            url: "{{route('store_blog_articles')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status==200) {
                    $('#storeBlogArticle').trigger("reset");
                    $(location).prop('href', '{{url('/thankyou')}}');
                    toastr.success('Blogs Articles Added Successfully');
                    $('#submitBtn2').attr("disabled", false);
                    $('#submitBtn2').html("Submit");
                }
            },
            error: function(error) {
                // console.log(response);
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
                if(error.responseJSON.errors.product_no){
                    $('#product_no_error').text(error.responseJSON.errors.product_no);
                }else{
                    $('#product_no_error').text('');
                }
                if(error.responseJSON.errors.topic_info){
                    $('#topic_info_error').text(error.responseJSON.errors.topic_info);
                }else{
                    $('#topic_info_error').text('');
                }
                if(error.responseJSON.errors.keyword_info){
                    $('#keyword_info_error').text(error.responseJSON.errors.keyword_info);
                }else{
                    $('#keyword_info_error').text('');
                }
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
        var buttonAdd = $("#add-topic-button");
        var buttonRemove = $("#remove-topic-button");
        var className = ".dynamic-topic-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="topic-link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-topic-link-list-1").clone();
            field.attr("id", "dynamic-topic-link-" + count);
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
        var buttonAdd = $("#add-keyword-button");
        var buttonRemove = $("#remove-keyword-button");
        var className = ".dynamic-keyword-link";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="keyword-link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-keyword-link-list-1").clone();
            field.attr("id", "dynamic-keyword-link-" + count);
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
