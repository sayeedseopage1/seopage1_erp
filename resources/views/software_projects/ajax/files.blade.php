@php
$addFilePermission = user()->permission('add_project_files');
$viewFilePermission = user()->permission('view_project_files');
$deleteFilePermission = user()->permission('delete_project_files');
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
<div class="tab-pane fade show active mt-5" role="tabpanel" aria-labelledby="nav-email-tab">

    <x-cards.data :title="__('modules.projects.files')">

        @if (($addFilePermission == 'all' || $addFilePermission == 'added' || $project->project_admin == user()->id) && !$project->trashed())

            <div class="row" id="add-btn">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-task-file"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.projects.uploadFile')</a>
                </div>
            </div>

            <x-form id="save-taskfile-data-form" class="d-none">
                <input type="hidden" name="project_id" value="{{ $project->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.file-multiple :fieldLabel="__('modules.projects.uploadFile')" fieldName="file" fieldId="employee_file" />
                    </div>
                    <div class="col-md-12">
                        <div class="w-100 justify-content-end d-flex mt-2">
                            <x-forms.button-cancel id="cancel-taskfile" class="border-0">@lang('app.cancel')
                            </x-forms.button-cancel>
                        </div>
                    </div>
                </div>
            </x-form>
        @endif

        @if ($viewFilePermission == 'all' || ($viewFilePermission == 'added' && user()->id == $project->added_by) || ($viewFilePermission == 'owned' && user()->id == $project->client_id))
            <div class="d-flex flex-wrap mt-3" id="task-file-list">
                @forelse($project->files as $file)

                    <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
                        @if ($file->icon == 'images')
                            <img src="{{ $file->file_url }}">
                        @else
                            <i class="fa {{ $file->icon }} text-lightest"></i>
                        @endif

                        @if ($viewFilePermission == 'all' || ($viewFilePermission == 'added' && $file->added_by == user()->id))
                            <x-slot name="action">
                                <div class="dropdown ml-auto file-action">
                                    <button
                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if ($viewFilePermission == 'all' || ($viewFilePermission == 'added' && $file->added_by == user()->id))
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                    target="_blank"
                                                    href="{{ $file->file_url }}">@lang('app.view')</a>

                                           <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                href="{{ route('files.download', md5($file->id)) }}">@lang('app.download')</a>
                                        @endif

                                        @if ($deleteFilePermission == 'all' || ($deleteFilePermission == 'added' && $file->added_by == user()->id))
                                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                                data-row-id="{{ $file->id }}"
                                                href="javascript:;">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            </x-slot>
                        @endif

                    </x-file-card>
                @empty
                    <div class="align-items-center d-flex flex-column text-lightest p-20 w-100">
                        <i class="fa fa-file-excel f-21 w-100"></i>

                        <div class="f-15 mt-4">
                            - @lang('messages.noFileUploaded') -
                        </div>
                    </div>
                @endforelse

            </div>
        @endif

    </x-cards.data>
</div>
<!-- TAB CONTENT END -->

<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function () {
        var add_project_files = "{{ $addFilePermission }}";
        var trashed = "{{ $project->trashed() }}";
        var isProjectAdmin = {{ ($project->project_admin == user()->id) ? 1 : 0 }};

    if (!trashed && (add_project_files == "all" || isProjectAdmin)) {

        Dropzone.autoDiscover = false;
        taskDropzone = new Dropzone("#employee_file", {
            dictDefaultMessage: "{{ __('app.dragDrop') }}",
            url: "{{ route('files.store') }}",
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
            var ids = "{{ $project->id }}";
            formData.append('project_id', ids);
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
        taskDropzone.on('error', function(file) {
        });
    }

    $('#add-task-file').click(function() {
        $(this).closest('.row').addClass('d-none');
        $('#save-taskfile-data-form').removeClass('d-none');
    });

    $('#cancel-document').click(function() {
        $('#save-taskfile-data-form').addClass('d-none');
        $('#add-task-file').closest('.row').removeClass('d-none');
    });

    $('body').on('click', '#cancel-taskfile', function() {
        $('#save-taskfile-data-form').toggleClass('d-none');
        $('#add-btn').toggleClass('d-none');
    });

    $('body').on('click', '.delete-file', function() {
        var id = $(this).data('row-id');
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
                var url = "{{ route('files.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('#task-file-list').html(response.view);
                        }
                    }
                });
            }
        });
    });

    });

</script>
