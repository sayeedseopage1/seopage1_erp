@php
$addSubTaskPermission = user()->permission('add_sub_tasks');
$editSubTaskPermission = user()->permission('edit_sub_tasks');
$deleteSubTaskPermission = user()->permission('delete_sub_tasks');
$viewSubTaskPermission = user()->permission('view_sub_tasks');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    @if ($addSubTaskPermission == 'all'
    || ($addSubTaskPermission == 'added' && $task->added_by == user()->id)
    || ($addSubTaskPermission == 'owned' && in_array(user()->id, $taskUsers))
    || ($addSubTaskPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
    )
        <div class="p-20">

            <div class="row">
                <div class="col-md-12">
                    <a class="f-15 f-w-500" href="javascript:;" id="add-sub-task"><i
                            class="icons icon-plus font-weight-bold mr-1"></i>@lang('app.add')
                        @lang('modules.tasks.subTask')</a>
                </div>
            </div>

            <x-form id="save-subtask-data-form" class="d-none">
                <input type="hidden" name="task_id" value="{{ $task->id }}">
                <div class="row">
                    <div class="col-md-12">
                        <x-forms.text :fieldLabel="__('app.title')" fieldName="title" fieldRequired="true"
                            fieldId="title" :fieldPlaceholder="__('placeholders.task')" />
                    </div>

                    <div class="col-md-4">
                        <x-forms.datepicker fieldId="sub_task_start_date" :fieldLabel="__('app.startDate')" fieldName="start_date"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-4">
                        <x-forms.datepicker fieldId="sub_task_due_date" :fieldLabel="__('app.dueDate')" fieldName="due_date"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-4">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="subTaskAssignee"
                                :fieldLabel="__('modules.tasks.assignTo')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control select-picker" name="user_id"
                                    id="subTaskAssignee" data-live-search="true">
                                    <option value="">--</option>
                                    @foreach ($task->users as $item)
                                        <option
                                            data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}{{ (user() && user()->id == $item->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}</span>"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.description')"
                            fieldName="description" fieldId="description" fieldPlaceholder="">
                        </x-forms.textarea>
                    </div>

                    <div class="col-md-12">
                        <a class="f-15 f-w-500" href="javascript:;" id="add-subtask-file"><i
                                class="fa fa-paperclip font-weight-bold mr-1"></i>@lang('modules.projects.uploadFile')</a>
                    </div>

                    @if ($addSubTaskPermission == 'all' || $addSubTaskPermission == 'added')
                        <div class="col-lg-12 add-file-box d-none">
                            <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('modules.projects.uploadFile')" fieldName="file"
                                fieldId="task-file-upload-dropzone" />
                            <input type="hidden" name="image_url" id="image_url">
                        </div>
                        <div class="col-md-12 add-file-delete-sub-task-filebox d-none mb-5">
                            <div class="w-100 justify-content-end d-flex mt-2">
                                <x-forms.button-cancel id="cancel-subtaskfile" class="border-0">@lang('app.cancel')
                                </x-forms.button-cancel>
                            </div>
                        </div>
                        <input type="hidden" name="subTaskID" id="subTaskID">
                        <input type="hidden" name="addedFiles" id="addedFiles">
                    @endif
                    <div class="col-md-12">
                        <div class="w-100 justify-content-end d-flex mt-2">
                            <x-forms.button-cancel id="cancel-subtask" class="border-0 mr-3">@lang('app.cancel')
                            </x-forms.button-cancel>
                            <x-forms.button-primary id="save-subtask" icon="location-arrow">@lang('app.submit')
                                </x-button-primary>
                        </div>
                    </div>
                </div>
            </x-form>
        </div>
    @endif


    @if ($viewSubTaskPermission == 'all' || $viewSubTaskPermission == 'added')
        <div class="d-flex flex-wrap justify-content-between p-20" id="sub-task-list">
            @forelse ($task->subtasks as $subtask)
                <div class="card w-100 rounded-0 border-0 subtask mb-3">

                    <div class="card-horizontal">
                        <div class="d-flex">
                            <x-forms.checkbox :fieldId="'checkbox'.$subtask->id" class="task-check"
                                data-sub-task-id="{{ $subtask->id }}"
                                :checked="($subtask->status == 'complete') ? true : false" fieldLabel=""
                                :fieldName="'checkbox'.$subtask->id" />

                        </div>
                        <div class="card-body pt-0">
                            <div class="d-flex">
                                @if ($subtask->assigned_to)
                                    <x-employee-image :user="$subtask->assignedTo" />
                                @endif

                                <p class="card-title f-14 mr-3 text-dark flex-grow-1" id="subTask">
                                    {!! $subtask->status == 'complete' ? '<s>' . $subtask->id . ucfirst($subtask->title) . '</s>' : '<a class="view-subtask" href="javascript:;" style="color:black;" data-row-id=' . $subtask->id . ' >' .  ucfirst($subtask->title) . '</a>' !!}
                                    {!! $subtask->due_date ? '<span class="f-11 text-lightest"><br>'.__('modules.invoices.due') . ': ' . $subtask->due_date->format(global_setting()->date_format) . '</span>' : '' !!}
                                </p>
                                <div class="dropdown ml-auto subtask-action">
                                    <button
                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if ($viewSubTaskPermission == 'all' || ($viewSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                                            <a class="dropdown-item view-subtask" href="javascript:;"
                                                data-row-id="{{ $subtask->id }}">@lang('app.view')</a>
                                        @endif
                                        @if ($editSubTaskPermission == 'all' || ($editSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                                            <a class="dropdown-item edit-subtask" href="javascript:;"
                                                data-row-id="{{ $subtask->id }}">@lang('app.edit')</a>
                                        @endif

                                        @if ($deleteSubTaskPermission == 'all' || ($deleteSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                                            <a class="dropdown-item delete-subtask" data-row-id="{{ $subtask->id }}"
                                                href="javascript:;">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            @if (count($subtask->files) > 0)
                                <div class="d-flex flex-wrap mt-4">
                                    @foreach ($subtask->files as $file)
                                        <x-file-card :fileName="$file->filename"
                                            :dateAdded="$file->created_at->diffForHumans()" class="subTask{{ $file->id }}">
                                            @if ($file->icon == 'images')
                                                <img src="{{ $file->file_url }}">
                                            @else
                                                <i class="fa {{ $file->icon }} text-lightest"></i>
                                            @endif

                                            <x-slot name="action">
                                                <div class="dropdown ml-auto file-action">
                                                    <button
                                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                                        type="button" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="fa fa-ellipsis-h"></i>
                                                    </button>

                                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                                        
                                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 "
                                                                target="_blank"
                                                                href="{{ $file->file_url }}">@lang('app.view')</a>

                                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                            href="{{ route('sub-task-files.download', md5($file->id)) }}">@lang('app.download')</a>

                                                        @if ($deleteSubTaskPermission == 'all' || ($deleteSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                                                            <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-sub-task-file"
                                                                data-row-id="{{ $file->id }}"
                                                                href="javascript:;">@lang('app.delete')</a>
                                                        @endif
                                                    </div>
                                                </div>
                                            </x-slot>
                                        </x-file-card>
                                    @endforeach
                                </div>
                            @endif

                        </div>
                    </div>
                </div>
            @empty
                <x-cards.no-record :message="__('messages.noSubTaskFound')" icon="tasks" />
            @endforelse

        </div>
    @endif

</div>
<!-- TAB CONTENT END -->
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>

<script>
    $(document).ready(function() {

        $('.select-picker').selectpicker();

        $('#add-subtask-file').click(function() {
            $('.add-file-box').removeClass('d-none');
            $('#add-subtask-file').addClass('d-none');
        });

        $('#cancel-subtaskfile').click(function() {
            $('.add-file-box').addClass('d-none');
            $('#add-subtask-file').removeClass('d-none');
            return false;
        });

        $('body').on('click', '.view-subtask', function() {
            var id = $(this).data('row-id');
            var url = "{{ route('sub-tasks.show', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        var add_sub_task = "{{ $addSubTaskPermission }}";

        if (add_sub_task == "all" || add_sub_task == "added") {

            Dropzone.autoDiscover = false;
            //Dropzone class
            taskDropzone = new Dropzone("div#task-file-upload-dropzone", {
                dictDefaultMessage: "{{ __('app.dragDrop') }}",
                url: "{{ route('sub-task-files.store') }}",
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                paramName: "file",
                maxFilesize: DROPZONE_MAX_FILESIZE,
                maxFiles: 10,
                autoProcessQueue: false,
                uploadMultiple: true,
                addRemoveLinks: true,
                parallelUploads: 10,
                acceptedFiles: DROPZONE_FILE_ALLOW,
                init: function() {
                    taskDropzone = this;
                }
            });
            taskDropzone.on('sending', function(file, xhr, formData) {
                var ids = $('#subTaskID').val();
                formData.append('sub_task_id', ids);
                $.easyBlockUI();
            });
            taskDropzone.on('uploadprogress', function() {
                $.easyBlockUI();
            });
            taskDropzone.on('completemultiple', function() {
                window.location.reload();
            });
        }

        datepicker('#sub_task_start_date', {
            position: 'bl',
            ...datepickerConfig
        });

        datepicker('#sub_task_due_date', {
            position: 'bl',
            ...datepickerConfig
        });

        $('#save-subtask').click(function() {

            const url = "{{ route('sub-tasks.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-subtask-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-subtask",
                data: $('#save-subtask-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if (taskDropzone.getQueuedFiles().length > 0) {
                            subTaskID = response.subTaskID;
                            $('#subTaskID').val(response.subTaskID);
                            taskDropzone.processQueue();
                        } else {
                            window.location.reload();
                        }
                    }
                }
            });
        });

        $('body').on('click', '#add-sub-task', function() {
            $(this).closest('.row').addClass('d-none');
            $('#save-subtask-data-form').removeClass('d-none');
        });

        $('#cancel-subtask').click(function() {
            $('#save-subtask-data-form').addClass('d-none');
            $('#add-sub-task').closest('.row').removeClass('d-none');
        });

        $('body').on('click', '.delete-sub-task-file', function() {
            var id = $(this).data('row-id');
            var name = $(this).data('row-name');
            var replyFile = $(this);
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
                    var url = "{{ route('sub-task-files.destroy', ':id') }}";
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
                                $('.subTask'+id).remove();
                            }
                        }
                    });
                }
            });
        });

    });
</script>
