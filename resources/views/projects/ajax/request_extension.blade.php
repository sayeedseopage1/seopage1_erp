@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3" style="border: none">
                <div class="card-body">
                    <form action="" method="post" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" name="project_id" id="project_id" value="{{ $project_id }}">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="">No of days you want to extend
                                    <sup class="f-14 mr-1">*</sup>
                                </label>
                                <select name="day" id="day" class="form-control height-35 f-14">
                                    <option value="">Select One</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                                <span id="day_error" class="text-danger"></span>
                            </div>
                            <div class="col-md-6">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="">Files for proper reason
                                    <sup class="f-14 mr-1">*</sup>
                                </label>
                                <input type="file" name="file" id="file" class="form-control height-35 f-14" placeholder="Enter google doc or sheet file or drive folder link here" multiple>
                                <span id="file_error" class="text-danger"></span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="">Any other comment you want share/client comment
                                    <sup class="f-14 mr-1">*</sup>
                                </label>
                                <textarea name="comment" id="comment" class="form-control"></textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('comment');
                                </script>
                                <span id="comment_error" class="text-danger"></span>
                            </div>
                        </div>
                        <div class="mt-3">
                            <button type="button" class="btn btn-primary" id="submitBtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $('#submitBtn').click(function(e){
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var comment = CKEDITOR.instances.comment.getData();
        var data = new FormData();

        data.append('_token', $('meta[name="csrf-token"]').attr('content'));
        data.append('day', document.getElementById("day").value);
        data.append('project_id', document.getElementById("project_id").value);
        data.append('comment', comment);

        var files = $('#file')[0].files;
        for (var i = 0; i < files.length; i++) {
            data.append('file[]', files[i]);
        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
         $.ajax({
            type: "POST",
            url: "{{ route('store-request-extension') }}",
            data: data,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (response) {
                $(location).prop('href', '{{route('projects.index')}}');
                toastr.success('Request Extension Successfully');
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.day){
                    $('#day_error').text(error.responseJSON.errors.day);
                }else{
                    $('#day_error').text('');
                }
                if(error.responseJSON.errors.file){
                    $('#file_error').text(error.responseJSON.errors.file);
                }else{
                    $('#file_error').text('');
                }
                if(error.responseJSON.errors.comment){
                    $('#comment_error').text(error.responseJSON.errors.comment);
                }else{
                    $('#comment_error').text('');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });
    });
</script>
@endsection

