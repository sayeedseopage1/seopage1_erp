@php
$addTaskFilePermission = user()->permission('add_task_files');
$viewTaskFilePermission = user()->permission('view_task_files');
$deleteTaskFilePermission = user()->permission('delete_task_files');
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
    @if ($addTaskFilePermission == 'all'
    || ($addTaskFilePermission == 'added' && $task->added_by == user()->id)
    || ($addTaskFilePermission == 'owned' && in_array(user()->id, $taskUsers))
    || ($addTaskFilePermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
    )
        <div class="p-20">

            <div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-task-file"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.projects.uploadFile')</a>
                </div>
            </div>

            <x-form id="save-taskfile-data-form" class="d-none">
                <input type="hidden" name="task_id" value="{{ $task->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.file-multiple fieldLabel="" fieldName="file[]" fieldId="task-file-upload-dropzone" />
                    </div>
                    <div class="col-md-12">
                        <div class="w-100 justify-content-end d-flex mt-2">
                            <x-forms.button-cancel id="cancel-taskfile" class="border-0">@lang('app.cancel')
                            </x-forms.button-cancel>
                        </div>
                    </div>
                </div>
            </x-form>
        </div>
    @endif

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
            $(this).closest('.row').addClass('d-none');
            $('#save-taskfile-data-form').removeClass('d-none');
        });

        $('#cancel-taskfile').click(function() {
            $('#save-taskfile-data-form').addClass('d-none');
            $('#add-task-file').closest('.row').removeClass('d-none');
            return false;
        });
    });
</script>
