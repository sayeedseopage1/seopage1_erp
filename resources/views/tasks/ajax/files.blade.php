@php
$addTaskFilePermission = user()->permission('add_task_files');
$viewTaskFilePermission = user()->permission('view_task_files');
$deleteTaskFilePermission = user()->permission('delete_task_files');
$addTaskCommentPermission = user()->permission('add_task_comments');
$editTaskCommentPermission = user()->permission('edit_task_comments');
$deleteTaskCommentPermission = user()->permission('delete_task_comments');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style>
    .file-action {
        visibility: hidden;
    }

    .file-card:hover .file-action {
        visibility: visible;
    }

</style>

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

  @if ($addTaskCommentPermission == 'all'
  || ($addTaskCommentPermission == 'added' && $task->added_by == user()->id)
  || ($addTaskCommentPermission == 'owned' && in_array(user()->id, $taskUsers))
  || ($addTaskCommentPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
  )
    {{--  <div class="row p-20">
          <div class="col-md-12">
              <a class="f-15 f-w-500" href="javascript:;" id="add-comment"><i
                      class="icons icon-plus font-weight-bold mr-1"></i>@lang('app.add')
                  @lang('modules.tasks.comment')</a>
          </div>
      </div> --}}

      <x-form id="save-comment-data-form" >
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
                              CKEDITOR.replace('comment');
                          </script>
                      </div>
                  </div>
              </div>
              <div class="w-100 justify-content-end d-flex mt-2">
                {{--  <x-forms.button-cancel id="cancel-comment" class="border-0 mr-3">@lang('app.cancel')
                  </x-forms.button-cancel> --}}
                  <x-forms.button-primary id="submit-comment" icon="location-arrow">@lang('app.submit')
                      </x-button-primary>
              </div>

          </div>
      </x-form>
  @endif
    @if ($addTaskFilePermission == 'all'
    || ($addTaskFilePermission == 'added' && $task->added_by == user()->id)
    || ($addTaskFilePermission == 'owned' && in_array(user()->id, $taskUsers))
    || ($addTaskFilePermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
    )
        <div class="p-20">

          {{--<div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-task-file"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.projects.uploadFile')</a>
                </div>
            </div> --}}

            <x-form id="save-taskfile-data-form" >
                <input type="hidden" name="task_id" value="{{ $task->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.file-multiple fieldLabel="" fieldName="file[]" fieldId="task-file-upload-dropzone" />
                    </div>
                  {{-- <div class="col-md-12">
                        <div class="w-100 justify-content-end d-flex mt-2">
                            <x-forms.button-cancel id="cancel-taskfile" class="border-0">@lang('app.cancel')
                            </x-forms.button-cancel>
                        </div>
                    </div> --}}
                </div>
            </x-form>
        </div>
    @endif

    <div class="d-flex flex-wrap justify-content-between p-20" id="comment-list">
        @forelse ($task->comments as $comment)
            <div class="card w-100 rounded-0 border-0 comment">
                <div class="card-horizontal">
                    <div class="card-img my-1 ml-0">
                        <img src="{{ $comment->user->image_url }}" alt="{{ mb_ucwords($comment->user->name) }}">
                    </div>
                    <div class="card-body border-0 pl-0 py-1">
                        <div class="d-flex flex-grow-1">
                            <h4 class="card-title f-15 f-w-500 text-dark mr-3">{{ mb_ucwords($comment->user->name) }}</h4>
                            <p class="card-date f-11 text-lightest mb-0">
                                {{ $comment->created_at->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                            </p>
                            <div class="dropdown ml-auto comment-action">
                                <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    @if ($editTaskCommentPermission == 'all' || ($editTaskCommentPermission == 'added' && $comment->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 edit-comment"
                                            href="javascript:;" data-row-id="{{ $comment->id }}">@lang('app.edit')</a>
                                    @endif

                                    @if ($deleteTaskCommentPermission == 'all' || ($deleteTaskCommentPermission == 'added' && $comment->added_by == user()->id))
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-comment"
                                            data-row-id="{{ $comment->id }}" href="javascript:;">@lang('app.delete')</a>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="card-text f-14 text-dark-grey text-justify ql-editor">{!! ucfirst($comment->comment) !!}
                        </div>
                    </div>
                </div>
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
                                        <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                            href="{{ $file->file_url }}">@lang('app.view')</a>
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

</div>
<!-- TAB CONTENT END -->

<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
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

        $('#submit-comment').click(function() {
            var comment = CKEDITOR.instances.descriptionComment.getData();
            document.getElementById('descriptionComment').value = comment;

            var token = '{{ csrf_token() }}';

            const url = "{{ route('taskComment.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-comment-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#submit-comment",
                data: {
                    '_token': token,
                    comment: comment,
                    taskId: '{{ $task->id }}'
                },
                success: function(response) {
                    if (response.status == "success") {
                        $('#comment-list').html(response.view);
                        CKEDITOR.instances.descriptionComment.getData();
                        $('#descriptionComment').val('');
                    }

                }
            });
        });

    });
</script>
<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
