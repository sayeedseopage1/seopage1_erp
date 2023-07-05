<!-- Modal -->
<div class="modal fade" id="client_review" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Client Review</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="post" id="clientReview">
                <input type="hidden" name="project_id" id="project_id" value="{{$project->id}}">
            <div class="modal-body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Client Rating
                        <sup class="f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Input only numeric number" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </label>
                    <div class="input-group">
                        <input type="number" class="form-control" name="client_rating" id="client_rating" placeholder="Input rating number" aria-label="Input rating number" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">Out of 5.00</span>
                        </div>
                    </div>
                    <span id="client_rating_error" class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="ClientComment">Client Comment
                        <sup class="f-14 mr-1">*</sup>
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Describe the comment" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                        </svg>
                    </label>
                    <textarea name="client_comment" id="client_comment" class="form-control"></textarea>
                    <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('client_comment');
                    </script>
                    <span id="client_comment_error" class="text-danger"></span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="submit-button">Submit</button>
            </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#submit-button').click(function(e){
        e.preventDefault();
        $('#submit-button').attr("disabled", true);
        $('#submit-button').html("Processing...");
        var client_comment = CKEDITOR.instances.client_comment.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'client_rating': document.getElementById("client_rating").value,
            'client_comment': client_comment,
            'project_id': {{$project->id}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('client-review.store')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#clientReview').trigger("reset");
                window.location.reload();
                toastr.success('Client Review Successfully');
                $('#submit-button').attr("disabled", false);
                $('#submit-button').html("Submit");
            },
            error: function(error) {
                // console.log(response);
                if(error.responseJSON.errors.client_rating){
                    $('#client_rating_error').text(error.responseJSON.errors.client_rating);
                }else{
                    $('#client_rating_error').text('');
                }
                if(error.responseJSON.errors.client_comment){
                    $('#client_comment_error').text(error.responseJSON.errors.client_comment);
                }else{
                    $('#client_comment_error').text('');
                }
                $('#submit-button').attr("disabled", false);
                $('#submit-button').html("Submit");
            }
        });
    });
</script>
