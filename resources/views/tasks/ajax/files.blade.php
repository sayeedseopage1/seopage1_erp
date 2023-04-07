@php
    $addTaskFilePermission = user()->permission('add_task_files');
    $viewTaskFilePermission = user()->permission('view_task_files');
    $deleteTaskFilePermission = user()->permission('delete_task_files');
    $addTaskCommentPermission = user()->permission('add_task_comments');
    $editTaskCommentPermission = user()->permission('edit_task_comments');
    $deleteTaskCommentPermission = user()->permission('delete_task_comments');
@endphp
<link rel="stylesheet" type="text/css" href="/comment/style.css">
<style type="text/css">
	.comment-thread {
		width: 100% !important;
	}
</style>
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">
	@if (
        $addTaskCommentPermission == 'all' || ($addTaskCommentPermission == 'added' && $task->added_by == user()->id) 
        || ($addTaskCommentPermission == 'owned' && in_array(user()->id, $taskUsers)) 
        || ($addTaskCommentPermission == 'both' && (in_array(user()->id, $taskUsers) 
        || $task->added_by == user()->id)))
        <x-form id="save-comment-data-form">
            <div class="col-md-12 p-20 ">
                <div class="media">
                    <img src="{{ user()->image_url }}" class="align-self-start mr-3 taskEmployeeImg rounded"
                        alt="{{ mb_ucwords(user()->name) }}">
                    <div class="media-body bg-white">
                        <div class="form-group">
                            <div id="descriptionComment"></div>
                            <textarea name="comment" id="descriptionComment" class="form-control"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('comment', {
                                    height: '100'
                                });
                            </script>
                        </div>
                    </div>
                </div>
                <div class="w-100 justify-content-end d-flex mt-2">
                    <x-forms.button-primary id="submit-comment" icon="location-arrow">@lang('app.submit')
                        </x-button-primary>
                </div>

            </div>
        </x-form>
    @endif

    @if (
        $addTaskFilePermission == 'all' ||
            ($addTaskFilePermission == 'added' && $task->added_by == user()->id) ||
            ($addTaskFilePermission == 'owned' && in_array(user()->id, $taskUsers)) ||
            ($addTaskFilePermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id)))
        <div class="p-20">
            <x-form id="save-taskfile-data-form">
                <input type="hidden" name="task_id" value="{{ $task->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.file-multiple fieldLabel="" fieldName="file[]" fieldId="task-file-upload-dropzone" />
                    </div>
                </div>
            </x-form>
        </div>
    @endif
    <div class="flex-wrap justify-content-between p-20" id="comment-list">
        <div class="row">
            <h4 class="w-100 text-center">{{ count($task->comments) }} Comment</h4>
            
        </div>
        <hr>
        @forelse ($comments as $comment)
            <div class="comment-thread">
                <!-- Comment 1 start -->
                <details open class="comment" id="comment-1">
                    <a href="#comment-1" class="comment-border-link">
                        <span class="sr-only">Jump to comment-1</span>
                    </a>

                    <summary>
			            <div class="comment-heading">
			                <div class="comment-voting">
			                    <button type="button">
			                        <span aria-hidden="true">&#9650;</span>
			                        <span class="sr-only">Vote up</span>
			                    </button>
			                    <button type="button">
			                        <span aria-hidden="true">&#9660;</span>
			                        <span class="sr-only">Vote down</span>
			                    </button>
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

					    <p>{!! ucfirst($comment->comment) !!}</p>
					    <button type="button" data-toggle="reply-form" data-target="comment-{{$comment->id}}-reply-form">Reply</button>
					    @if($comment->added_by == Auth::id())
					    	<button type="button" class="text-primary edit-comment" comment_type="comment" data-content="{{$comment->comment}}" data-id="{{$comment->id}}">Edit</button>
					    @endif
					    <button type="button" class="text-danger delete-comment" comment_type="comment" data-id="{{$comment->id}}">Delete</button>


					    <!-- Reply form start -->
					    <form method="POST" class="reply-form d-none" action="{{route('taskReply.store')}}" id="comment-{{$comment->id}}-reply-form">
					    	@csrf
					    	<input type="hidden" name="taskId" value="{{$task->id}}">
					    	<input type="hidden" name="reply_id" value="{{$comment->id}}">
					    	<input type="hidden" name="type" value="comment">
					        <textarea name="reply" placeholder="Reply to comment" rows="4"></textarea>
					        <button type="submit">Submit</button>
					        <button type="button" data-toggle="reply-form" data-target="comment-{{$comment->id}}-reply-form">Cancel</button>
					    </form>
					    <!-- Reply form end -->
					</div>
					
					@php
						$replys = App\Models\TaskReply::select(['task_replies.*', 'users.name', 'users.image'])->where('comment_id', $comment->id)->join('users', 'task_replies.user_id', 'users.id')->get();
					@endphp
                    @foreach ($replys as $reply)
                        <div class="replies">
                            <!-- Comment 2 start -->
                            <details open class="comment" id="comment-{{$reply->id}}">
                                <a href="#comment-{{$reply->id}}" class="comment-border-link">
                                    <span class="sr-only">Jump to comment-{{$reply->id}}</span>
                                </a>
                                <summary>
                                    @if ($reply->comment_id == $comment->id)
                                        <div class="comment-heading">
                                            <div class="comment-voting"
                                                style="display: flex; justify-content: center; align-items: center;">
                                                <span style="font-size: 27px; margin-right: -2px;"><i class="bi bi-grip-vertical"></i></span>
                                            </div>
                                            <div class="comment-info">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <img src="{{ asset('/user-uploads/avatar/' . $reply->image) }}" alt="{{ mb_ucwords($reply->name) }}" class="img-thumbnail rounded-circle" height="50" width="50">
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
				                    <p>
				                        {!! ucfirst($reply->reply) !!}
				                    </p>
				                    <button type="button" data-toggle="reply-form" data-target="comment-{{$reply->id}}-reply-form">Reply</button>
				                    @if($reply->added_by == Auth::id())
								    	<button type="button" class="text-primary edit-comment" comment_type="reply" data-content="{{$reply->reply}}" data-id="{{$reply->id}}">Edit</button>
								    @endif
				                    <button type="button" class="text-danger delete-comment" comment_type="reply" data-id="{{$reply->id}}">Delete</button>

				                    <!-- Reply form start -->
				                    <form method="POST" class="reply-form d-none" action="{{route('taskReply.store')}}" id="comment-{{$reply->id}}-reply-form">
				                    	@csrf
				                    	<input type="hidden" name="taskId" value="{{$task->id}}">
				                    	<input type="hidden" name="reply_id" value="{{$comment->id}}">
				                    	<input type="hidden" name="type" value="reply">
				                        <textarea name="reply" placeholder="Reply to comment" rows="4"></textarea>
				                        <button type="submit">Submit</button>
				                        <button type="button" data-toggle="reply-form" data-target="comment-{{$reply->id}}-reply-form">Cancel</button>
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
    <div class="d-flex flex-wrap p-20" id="task-file-list">
        @forelse($task->files as $file)
            <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
                @if ($file->icon == 'images')
                    <img src="{{ $file->file_url }}">
                @else
                    <i class="fa {{ $file->icon }} text-lightest"></i>
                @endif

                @if ($viewTaskFilePermission == 'all' || ($viewTaskFilePermission == 'added' && $file->added_by == user()->id))
                    <x-slot name="action">
                        <div class="dropdown ml-auto file-action">
                            <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-ellipsis-h"></i>
                            </button>

                            <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                aria-labelledby="dropdownMenuLink" tabindex="0">
                                @if ($viewTaskFilePermission == 'all' || ($viewTaskFilePermission == 'added' && $file->added_by == user()->id))
                                    @if ($file->icon = 'images')
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                            target="_blank" href="{{ $file->file_url }}">@lang('app.view')</a>
                                    @endif
                                    <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                        href="{{ route('task_files.download', md5($file->id)) }}">@lang('app.download')</a>
                                @endif

                                @if ($deleteTaskFilePermission == 'all' || ($deleteTaskFilePermission == 'added' && $file->added_by == user()->id))
                                    <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                        data-row-id="{{ $file->id }}" href="javascript:;">@lang('app.delete')</a>
                                @endif
                            </div>
                        </div>
                    </x-slot>
                @endif
            </x-file-card>
        @empty
            <x-cards.no-record :message="__('messages.noFileUploaded')" icon="file" />
        @endforelse

    </div>
    <div class="modal" id="editCommentModal" tabindex="-1">
    	<div class="modal-dialog">
    		<div class="modal-content">
    			<div class="modal-header">
    				<h5 class="modal-title">Edit Comment</h5>
    				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
    				</button>
    			</div>
    			<div class="modal-body">
    				<form method="POST" action="" id="editForm">
                        @csrf
                        <input type="hidden" name="editID" id="editID" value="">
                        <input type="hidden" name="editMode" id="editMode" value="">
    					<textarea class="w-100" id="edit_comment" name="comment" placeholder="Reply to comment" rows="4"></textarea>
    				</form>
    			</div>
    			<div class="modal-footer">
    				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    				<button type="button" class="btn btn-primary" id="commentSave">Save changes</button>
    			</div>
    		</div>
    	</div>
    </div>
</div>
<script src=""></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('form.reply-form').submit(function(e) {
			e.preventDefault();
			
			// $('form').not(this).hide(); // hide all other p elements
    		// $(this).show(); // show the clicked p element
			
			var formData = $(this).serialize();
			
			$.easyAjax({
                url: $(this).attr('action'),
                container: '#save-comment-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: $(this),
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.status == 400) {
                        $('#comment-list').html(response.html);
                    }
                }
            });
		});

		$('button[data-toggle="reply-form"]').click(function() {
			var target = $(this).attr('data-target');
			var $form = $('#' + target);
			$form.toggleClass('d-none');
		});

		$('.delete-comment').click(function(e) {
			e.preventDefault();
			if ($(this).attr('comment_type') == 'comment') {
				url = '{{route("taskComment.destroy", ":id")}}';
				url = url.replace(':id', $(this).data('id'));
			} else {
				url = '{{route("taskReply.delete", ":id")}}';
				url = url.replace(':id', $(this).data('id'));
			}

			Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    text: "@lang('messages.recoverRecord')",
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmDelete')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: 'btn btn-primary mr-3',
                        cancelButton: 'btn btn-secondary'
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.easyAjax({
                            type: 'POST',
                            url: url,
                            data: {
                                '_token': '{{csrf_token()}}',
                                '_method': 'DELETE'
                            },
                            success: function(response) {
                                if (response.status == "success") {
                                    $('#comment-list').html(response.view);
                                }
                            }
                        });
                    }
                });
		});

		$('.edit-comment').click(function(e) {
			$('#edit_comment').html($(this).data('content'));
            $('#editID').val($(this).attr('data-id'));
            $('#editMode').val($(this).attr('comment_type'));
			$('#editCommentModal').modal('show');
		});

        $('#commentSave').click(function(e) {
            e.preventDefault();
            $('#editCommentModal').modal('hide');
            var formData = $('#editForm').serialize();

            var url = '{{route("taskComment.update", ":id")}}';
            url = url.replace(':id', $('#editID').val());
            $.ajax({
                type: 'PUT',
                url: url,
                data: formData,
                success: function(response) {
                    if (response.status == "success") {
                        $('#comment-list').html(response.view);
                    }
                }
            });
        });
	})
</script>