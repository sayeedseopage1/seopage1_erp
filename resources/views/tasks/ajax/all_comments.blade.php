@php
    $addTaskFilePermission = user()->permission('add_task_files');
    $viewTaskFilePermission = user()->permission('view_task_files');
    $deleteTaskFilePermission = user()->permission('delete_task_files');
    $addTaskCommentPermission = user()->permission('add_task_comments');
    $editTaskCommentPermission = user()->permission('edit_task_comments');
    $deleteTaskCommentPermission = user()->permission('delete_task_comments');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
<style>
    .file-action {
        visibility: hidden;
    }

    .file-card:hover .file-action {
        visibility: visible;
    }
</style>
<style>
    * {
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.85);
        background-color: #f9f9f9;

    }

    button {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        font-size: 14px;
        padding: 4px 8px;
        color: rgba(0, 0, 0, 0.85);
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    button:hover,
    button:focus,
    button:active {
        cursor: pointer;
        background-color: #ecf0f1;
    }

    .comment-thread {
        width: 700px;
        max-width: 100%;
/*        margin: auto;*/
        padding: 0 30px;
        background-color: #fff;
        border: 1px solid transparent;
        /* Removes margin collapse */
    }

    .m-0 {
        margin: 0;
    }

    .sr-only {
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    /* Comment */

    .comment {
        position: relative;
        margin: 20px auto;
    }

    .comment-heading {
        display: flex;
        align-items: center;
        height: 50px;
        font-size: 14px;
    }

    .comment-voting {
        width: 20px;
        height: 32px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    .comment-voting button {
        display: block;
        width: 100%;
        height: 50%;
        padding: 0;
        border: 0;
        font-size: 10px;
    }

    .comment-info {
        color: rgba(0, 0, 0, 0.5);
        margin-left: 10px;
    }

    .comment-author {
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        text-decoration: none;
    }

    .comment-author:hover {
        text-decoration: underline;
    }

    .replies {
        margin-left: 20px;
    }

    /* Adjustments for the comment border links */

    .comment-border-link {
        display: block;
        position: absolute;
        top: 50px;
        left: 0;
        width: 12px;
        height: calc(100% - 50px);
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        background-color: rgba(0, 0, 0, 0.1);
        background-clip: padding-box;
    }

    .comment-border-link:hover {
        background-color: rgba(0, 0, 0, 0.3);
    }

    .comment-body {
        padding: 0 20px;
        padding-left: 28px;
    }

    .replies {
        margin-left: 28px;
    }

    /* Adjustments for toggleable comments */

    details.comment summary {
        position: relative;
        list-style: none;
        cursor: pointer;
    }

    details.comment summary::-webkit-details-marker {
        display: none;
    }

    details.comment:not([open]) .comment-heading {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .comment-heading::after {
        display: inline-block;
        position: absolute;
        right: 5px;
        align-self: center;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.55);
    }

    details.comment[open] .comment-heading::after {
        content: "Click to hide";
    }

    details.comment:not([open]) .comment-heading::after {
        content: "Click to show";
    }

    /* Adjustment for Internet Explorer */

    @media screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) {

        /* Resets cursor, and removes prompt text on Internet Explorer */
        .comment-heading {
            cursor: default;
        }

        details.comment[open] .comment-heading::after,
        details.comment:not([open]) .comment-heading::after {
            content: " ";
        }
    }


    .reply-form textarea {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 16px;
        width: 100%;
        max-width: 100%;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .d-none {
        display: none;
    }
</style>

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">
	<h4 class="text-center">{{ count($task->comments) }} Comment</h4>
    <hr>
    <div class="flex-wrap justify-content-between p-20" id="comment-list">
        @forelse ($task->comments as $comment)
            <div class="comment-thread">
                <!-- Comment 1 start -->
                <details open class="comment" id="comment-1">
                    <a href="#comment-1" class="comment-border-link">
                        <span class="sr-only">Jump to comment-1</span>
                    </a>
                    <summary>
                        <div class="comment-heading">
                            <div class="comment-voting"
                                style="display: flex; justify-content: center; align-items: center;">
                                <span style="font-size: 27px;"><i class="bi bi-grip-vertical"></i></span>
                            </div>
                            <div class="comment-info">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="{{ $comment->user->image_url }}"
                                            alt="{{ mb_ucwords($comment->user->name) }}"
                                            class="img-thumbnail rounded-circle" height="50" width="50">
                                    </div>
                                    <div class="col-md-8">
                                        <a href="{{ route('employees.show', $comment->user_id) }}"
                                            class="comment-author">{{ mb_ucwords($comment->user->name) }}</a>
                                        <p style="width: 103%">
                                            {{ $comment->created_at->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </summary>

                    <div class="comment-body">
                        <p>
                            {!! ucfirst($comment->comment) !!}
                        </p>
                        <a href="javascript::void(0);" onclick="reply(this)" data-toggle="reply-form"
                            data-target="comment-1-reply-form" class="btn" style="color: #0a6fe2"
                            data-Replyid="{{ $comment->id }}">Reply</a>
                        {{--                        <a class="cursor-pointer edit-comment btn" href="javascript:;" data-row-id="{{ $comment->id }}" style="color: green;">Edit</a> --}}
                        <a class="cursor-pointer edit-comment btn" href="javascript:;" data-row-id="{{ $comment->id }}" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" style="color: green;">Edit</a>
                        <a class="cursor-pointer delete-comment btn" data-row-id="{{ $comment->id }}"
                            href="javascript:;" style="color: red;">Delete</a>
                        <!-- Reply form start -->
                        <div style="display: none;" id="replyDiv">
                            <form method="POST" class="reply-form d-none" id="comment-1-reply-form"
                                action="{{ route('taskReply.store') }}">
                                @csrf
                                <input type="hidden" name="replyId" id="replyId">
                                <textarea name="reply" id="replyComment" class="form-control"></textarea>
                                <script>
                                    CKEDITOR.replace('reply', {
                                        height: '100'
                                    });
                                </script>

                                <button type="submit" class="btn btn-primary mt-2 btn-sm" id="submitReply"><i
                                        class="fa fa-location-arrow mr-1"></i>Submit</button>
                                <button type="button" data-toggle="reply-form" data-target="comment-1-reply-form"
                                    class="btn btn-primary mt-2 btn-sm">Cancel</button>
                            </form>
                        </div>
                        <!-- Reply form end -->
                    </div>
                    @foreach ($replys as $reply)
                        <div class="replies">
                            <!-- Comment 2 start -->
                            <details open class="comment" id="comment-1">
                                <a href="#comment-1" class="comment-border-link">
                                    <span class="sr-only">Jump to comment-1</span>
                                </a>
                                <summary>
                                    @if ($reply->comment_id == $comment->id)
                                        <div class="comment-heading">
                                            <div class="comment-voting"
                                                style="display: flex; justify-content: center; align-items: center;">
                                                <span style="font-size: 27px; margin-right: -2px;"><i
                                                        class="bi bi-grip-vertical"></i></span>
                                            </div>
                                            <div class="comment-info">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <img src="{{ asset('/user-uploads/avatar/' . $reply->image) }}"
                                                            alt="{{ mb_ucwords($reply->name) }}"
                                                            class="img-thumbnail rounded-circle" height="50"
                                                            width="50">
                                                    </div>
                                                    <div class="col-md-8">
                                                        <a href="{{ route('employees.show', $reply->user_id) }}"
                                                            class="comment-author">{{ mb_ucwords($reply->name) }}</a>
                                                        <p style="width: 103%">
                                                            {{ date('d-m-Y h:i a', strtotime($reply->updated_at)) }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </summary>

                                <div class="comment-body">
                                    @if ($reply->comment_id == $comment->id)
                                        <p>
                                            {!! ucfirst($reply->reply) !!}
                                        </p>
                                        <a href="javascript::void(0);" onclick="reply(this)" data-toggle="reply-form"
                                            data-target="comment-1-reply-form" class="btn" style="color: #0a6fe2"
                                            data-Replyid="{{ $comment->id }}">Reply</a>
                                    @endif
                                    <!-- Reply form start -->
                                    <form method="POST" class="reply-form d-none" id="comment-2-reply-form">
                                        <textarea name="reply2" id="replyComment2" class="form-control"></textarea>
                                        <script>
                                            CKEDITOR.replace('reply2', {
                                                height: '100'
                                            });
                                        </script>
                                        <button type="button" class="btn btn-primary mt-2 btn-sm"><i
                                                class="fa fa-location-arrow mr-1"></i>Submit</button>
                                        <button type="button" data-toggle="reply-form"
                                            data-target="comment-2-reply-form"
                                            class="btn btn-primary mt-2 btn-sm">Cancel</button>
                                    </form>
                                    <!-- Reply form end -->
                                </div>
                            </details>
                            <!-- Comment 2 end -->
                        </div>
                    @endforeach
                </details>
                <!-- Comment 1 end -->
            </div>
        @empty
            <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                <i class="fa fa-comment-alt f-21 w-100"></i>

                <div class="f-15 mt-4">
                    - @lang('messages.noCommentFound') -
                </div>
            </div>
        @endforelse
    </div>
</div>
<!-- TAB CONTENT END -->
<!-- REPLY START -->
<script>
    document.addEventListener(
        "click",
        function(event) {
            var target = event.target;
            var replyForm;
            if (target.matches("[data-toggle='reply-form']")) {
                replyForm = document.getElementById(target.getAttribute("data-target"));

                replyForm.classList.toggle("d-none");
                console.log(replyForm.classList.toggle("d-none"));
            }
        },
        false
    );

    function reply(caller) {
        var reply_id = document.getElementById('replyId').value = $(caller).attr('data-Replyid');
        $('#replyDiv').insertAfter($(caller));
        $('#replyDiv').show();
    }
</script>
<script>
    $('.edit_comment').click(function(e) {
        $('#commentEdit').modal("show");
    });
</script>
<script>
    /*$('#submitReply').click(function(e) {
        // alert('ok');
        e.preventDefault();
        $('#submitReply').attr("disabled", true);
        $('#submitReply').html("Sending...");
        var reply = CKEDITOR.instances.replyComment.getData();
        var reply_id = document.getElementById('replyId').value;
        // console.log(reply_id);
        var data = {
            '_token': "{{ csrf_token() }}",
            'reply': reply,
            'user_id': '{{ Auth::user()->id }}',
            'added_by': '{{ $task->added_by }}',
            'last_updated_by': '{{ $task->added_by }}',
            taskId: '{{ $task->id }}',
            'reply_id': reply_id,
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{ route('taskReply.store') }}",
            data: data,
            dataType: "json",
            success: function(response) {
                // console.log(response.status);
                if (response.status == 400) {
                    $('#comment-1-reply-form').trigger("reset");
                    $('#replyComment').text('');
                    console.log('asdfsadjhflasdfhaisduf');
                    // window.location.reload();
                }

            },
            error: function(error) {
                // console.log(response);
            }
        });
    });*/
</script>
<!-- REPLY END -->
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
<script>
    $(document).ready(function() {
        var add_task_files = "{{ $addTaskFilePermission }}";
        if (add_task_files == "all" || add_task_files == "added") {

            Dropzone.autoDiscover = false;
            taskDropzone = new Dropzone("div#task-file-upload-dropzone", {
                dictDefaultMessage: "{{ __('app.dragDrop') }}",
                url: "{{ route('task-files.store') }}",
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                paramName: "file",
                maxFilesize: DROPZONE_MAX_FILESIZE,
                maxFiles: 10,
                uploadMultiple: true,
                addRemoveLinks: true,
                parallelUploads: 10,
                acceptedFiles: DROPZONE_FILE_ALLOW,
                init: function() {
                    taskDropzone = this;
                }
            });
            taskDropzone.on('sending', function(file, xhr, formData) {
                var ids = "{{ $task->id }}";
                formData.append('task_id', ids);
                $.easyBlockUI();
            });
            taskDropzone.on('uploadprogress', function() {
                $.easyBlockUI();
            });
            taskDropzone.on('completemultiple', function(file) {
                var taskView = JSON.parse(file[0].xhr.response).view;
                taskDropzone.removeAllFiles();
                $.easyUnblockUI();
                $('#task-file-list').html(taskView);
            });
        }
         $('body').on('click', '.edit-comment', function() {
            var id = $(this).data('row-id');
            var url = "/account/tasks/taskComment/"+id+"/edit";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
        $('#add-task-file').click(function() {
            var comment = CKEDITOR.instances.descriptionComment.getData();
            document.getElementById('descriptionComment').value = comment;
            $(this).closest('.row').addClass('d-none');
            $('#save-taskfile-data-form').removeClass('d-none');
        });

        $('#cancel-taskfile').click(function() {
            $('#save-taskfile-data-form').addClass('d-none');
            $('#add-task-file').closest('.row').removeClass('d-none');
            return false;
        });
    });
    var add_task_comments = "{{ $addTaskCommentPermission }}";

    $('#add-comment').click(function() {
        $(this).closest('.row').addClass('d-none');
        $('#save-comment-data-form').removeClass('d-none');
    });

    $('#cancel-comment').click(function() {
        $('#save-comment-data-form').addClass('d-none');
        $('#add-comment').closest('.row').removeClass('d-none');
    });

    // if (add_task_comments == "all" || add_task_comments == "added") {
    //         quillImageLoad('#descriptionComment');
    // }

    $(document).ready(function() {

        // $('#submit-comment').click(function() {
        //     var comment = CKEDITOR.instances.descriptionComment.getData();
        //     document.getElementById('descriptionComment').value = comment;

        //     var token = '{{ csrf_token() }}';

        //     const url = "{{ route('taskComment.store') }}";

        //     $.easyAjax({
        //         url: url,
        //         container: '#save-comment-data-form',
        //         type: "POST",
        //         disableButton: true,
        //         blockUI: true,
        //         buttonSelector: "#submit-comment",
        //         data: {
        //             '_token': token,
        //             comment: comment,
        //             taskId: '{{ $task->id }}'
        //         },
        //         success: function(response) {
        //             // console.log(response);
        //             if (response.status == "success") {
        //                 $('#comment-list').html(response.view);
        //                 CKEDITOR.instances.descriptionComment.getData();
        //                 $('#descriptionComment').val('');
        //                 window.location.reload();
        //             }

        //         }
        //     });
        // });

    });
</script>
