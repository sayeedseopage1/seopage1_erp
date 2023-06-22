<div class="modal fade" id="markcomplete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-m">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Submit Task</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{route('task-status-change')}}" method="post" enctype="multipart/form-data" id="taskChange">
                @csrf
                <input type="hidden" name="id" value="{{$task->id}}">
                <input type="hidden" name="user_id" value="{{Auth::user()->id}}">

                <div class="modal-body">
                    <div class="mb-3">
                        Submit Links What You've Done<sup class="f-14 mr-1 text-danger">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit Links What You've Done" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </div>
                    <div class="row">
                        <div class="col-md-9 dynamic-field" id="dynamic-field-1">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mb-0">
                                        <input type="text" id="field" class="form-control height-35 f-14 mb-1 task_link" placeholder="Add Link Here" name="link[]"/>
                                        <span id="linkError_0" class="text-danger" ></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 append-buttons">
                            <div class="clearfix">
                                <button type="button" id="add-button" class="btn btn-primary float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                <button type="button" id="remove-button" class="btn btn-secondary float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <div class="">
                                <label for="file" class="form-label">Attachment
                                    <sup class="f-14 mr-1 text-danger">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Upload a file" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <input type="file" name="file[]" id="file" class="form-control height-35 f-14" multiple>
                                <label id="attachError" class="text-danger" for="text"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row ml-1 mr-1">
                        <div class="mb-3 mt-3">
                            Describe What You've Done<sup class="f-14 mr-1 text-danger">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Describe What You've Done" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </div>
                        <div class="">
                            <textarea name="text" id="text" class="form-control"></textarea>
                           <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('text',{
                                    height :100,
                                });
                            </script>
                            <label id="textError" class="text-danger" for="text"></label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="submitBtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#submitBtn').click(function(e){
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var text = CKEDITOR.instances.text.getData();

        var links = document.getElementsByName("link[]");
        var links_values = [];
        for (var i = 0; i < links.length; i++) {
            links_values.push(links[i].value);
        }

        var formData = new FormData();

        var files = $('#file')[0].files;
        for (var i = 0; i < files.length; i++) {
            formData.append('file[]', files[i]);
        }

        formData.append('_token', "{{ csrf_token() }}");
        formData.append('link', links_values);
        formData.append('text', text);
        formData.append('id', {{$task->id}});
        formData.append('user_id', {{Auth::user()->id}});

        $.ajaxSetup({    
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: "POST",
            url: "{{route('task-status-change')}}",
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (response) {
                $('#taskChange').trigger("reset");
                $('#markcomplete').modal("hide");
                window.location.reload();
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.text){
                    $('#textError').text(error.responseJSON.errors.text);
                }else{
                    $('#textError').text('');
                }
                if(error.responseJSON.errors.file){
                    $('#fileError').text(error.responseJSON.errors.file);
                }else{
                    $('#fileError').text('');
                }

                $.each(error.responseJSON.errors.link, function(key, value) {
                    $('#linkError_'+key).text(value);
                });

                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });

    });
    {{--$('#submitBtn').click(function(e){--}}
    {{--    e.preventDefault();--}}
    {{--    $('#submitBtn').attr("disabled", true);--}}
    {{--    $('#submitBtn').html("Processing...");--}}
    {{--    var text = CKEDITOR.instances.text.getData();--}}

    {{--    var links = document.getElementsByName("link[]");--}}
    {{--    var links_values = [];--}}
    {{--    for (var i = 0; i < links.length; i++) {--}}
    {{--        links_values.push(links[i].value);--}}
    {{--    }--}}
    {{--    var attach = $('#attach')[0].attach;--}}
    {{--    for (var i = 0; i < attach.length; i++) {--}}
    {{--        formData.append('attach[]', attach[i]);--}}
    {{--    }--}}

    {{--    var formData = new FormData();--}}
    {{--    formData.append('_token', "{{ csrf_token() }}");--}}
    {{--    formData.append('links_values', links_values);--}}
    {{--    formData.append('text', text);--}}
    {{--    formData.append('id', {{$task->id}});--}}
    {{--    formData.append('user_id', {{Auth::user()->id}});--}}

    {{--    --}}{{--var data= {--}}
    {{--    --}}{{--    '_token': "{{ csrf_token() }}",--}}
    {{--    --}}{{--    'link': links_values,--}}
    {{--    --}}{{--    'text': text,--}}
    {{--    --}}{{--    'id': {{$task->id}},--}}
    {{--    --}}{{--    'user_id': {{Auth::user()->id}},--}}
    {{--    --}}{{--}--}}

    {{--    $.ajaxSetup({--}}
    {{--        headers: {--}}
    {{--            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')--}}
    {{--        }--}}
    {{--    });--}}

    {{--    $.ajax({--}}
    {{--        type: "POST",--}}
    {{--        url: "{{route('task-status-change')}}",--}}
    {{--        data: formData,--}}
    {{--        dataType: "json",--}}
    {{--        success: function (response) {--}}
    {{--            $('#taskChange').trigger("reset");--}}
    {{--            $('#markcomplete').modal("hide");--}}
    {{--            window.location.reload();--}}
    {{--            $('#submitBtn').attr("disabled", false);--}}
    {{--            $('#submitBtn').html("Submit");--}}
    {{--        },--}}
    {{--        error: function(error) {--}}
    {{--            if(error.responseJSON.errors.text){--}}
    {{--                $('#textError').text(error.responseJSON.errors.text);--}}
    {{--            }else{--}}
    {{--                $('#textError').text('');--}}
    {{--            }--}}

    {{--            $.each(error.responseJSON.errors.link, function(key, value) {--}}
    {{--                $('#linkError_'+key).text(value);--}}
    {{--            });--}}

    {{--            $('#submitBtn').attr("disabled", false);--}}
    {{--            $('#submitBtn').html("Submit");--}}
    {{--        }--}}
    {{--    });--}}

    {{--});--}}
    $(document).ready(function () {
        var buttonAdd = $("#add-button");
        var buttonRemove = $("#remove-button");
        var className = ".dynamic-field";
        var count = 0;
        var field = "";
        var maxFields = 50;

        function totalFields() {
            return $(className).length;
        }

        function addNewField() {
            var total = $('input[name="link[]"]').length;
            count = totalFields() + 1;
            field = $("#dynamic-field-1").clone();
            field.attr("id", "dynamic-field-" + count);
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
<script type="text/javascript">

</script>
