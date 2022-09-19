@extends('layouts.app')

@push('styles')
    <style>
        .form_custom_label {
            justify-content: left;
        }

    </style>
@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <div class="row">

                    <div class="col-sm-12 mt-3">
                        <h4>@lang('modules.tasks.reminder')</h4>
                    </div>

                    <div class="col-lg-6">
                        <x-forms.number :fieldLabel="__('modules.tasks.preDeadlineReminder') . ' (' . __('app.days').')'"
                            fieldName="before_days" fieldId="before_days" :fieldValue="global_setting()->before_days" />
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100"
                                for="usr">@lang('modules.tasks.onDeadlineReminder')</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="deadline-yes" :fieldLabel="__('app.yes')" fieldValue="yes"
                                    fieldName="on_deadline" :checked="global_setting()->on_deadline == 'yes'">
                                </x-forms.radio>
                                <x-forms.radio fieldId="deadline-no" :fieldLabel="__('app.no')" fieldValue="no"
                                    fieldName="on_deadline" :checked="global_setting()->on_deadline == 'no'">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.number :fieldLabel="__('modules.tasks.postDeadlineReminder') . ' (' . __('app.days').')'"
                            fieldName="after_days" fieldId="after_days" :fieldValue="global_setting()->after_days" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.select fieldId="default_task_status" :fieldLabel="__('app.status')"
                            fieldName="default_task_status">
                            @foreach ($taskboardColumns as $item)
                                <option @if ($item->id == global_setting()->default_task_status) selected @endif value="{{ $item->id }}">
                                    {{ $item->slug == 'completed' || $item->slug == 'incomplete' ? __('app.' . $item->slug) : $item->column_name }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.number :fieldLabel="__('modules.tasks.taskboardDefaultLength')" fieldName="taskboard_length"
                            fieldId="taskboard_length" :fieldValue="global_setting()->taskboard_length" />
                    </div>

                </div>
            </div>

            <div class="col-lg-12 col-md-12 border-top-grey p-20">
                <div class="row">
                    <div class="col-sm-12 mt-3 p-20">
                        <h4>@lang('modules.tasks.sectionVisibleClient')</h4>
                    </div>
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.taskCategory')" fieldName="task_category" fieldValue="yes"  fieldId="task_category"
                        fieldRequired="true" :checked="($taskSetting->task_category == 'yes') ? $taskSetting->task_category : ''" />
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.project')" fieldName="project" fieldId="project" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->project == 'yes') ? $taskSetting->project : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.projects.startDate')" fieldName="start_date" fieldValue="yes" fieldId="start_date"
                        fieldRequired="true" :checked="($taskSetting->start_date == 'yes') ? $taskSetting->start_date : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.dueDate')" fieldName="due_date" fieldId="due_date" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->due_date == 'yes') ? $taskSetting->due_date : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.assignTo')" fieldName="assigned_to" fieldValue="yes" fieldId="assigned_to"
                        fieldRequired="true" :checked="($taskSetting->assigned_to == 'yes') ? $taskSetting->assigned_to : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.description')" fieldName="description" fieldValue="yes" fieldId="description"
                        fieldRequired="true" :checked="($taskSetting->description == 'yes') ? $taskSetting->description : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.label')" fieldName="label" fieldId="label" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->label == 'yes') ? $taskSetting->label : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.assignBy')" fieldName="assigned_by" fieldId="assigned_by" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->assigned_by == 'yes') ? $taskSetting->assigned_by : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="status" fieldId="status" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->status == 'yes') ? $taskSetting->status : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.priority')" fieldName="priority" fieldId="priority" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->priority == 'yes') ? $taskSetting->priority : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.makePrivate')" fieldName="make_private" fieldId="make_private" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->make_private == 'yes') ? $taskSetting->priority : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.setTimeEstimate')" fieldName="time_estimate" fieldId="time_estimate" fieldValue="yes"
                         fieldRequired="true" :checked="($taskSetting->time_estimate == 'yes') ? $taskSetting->time_estimate : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.comment')" fieldName="comments" fieldId="comments" fieldValue="yes"
                         fieldRequired="true" :checked="($taskSetting->comments == 'yes') ? $taskSetting->comments : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="files_tab" fieldId="files_tab" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->files == 'yes') ? $taskSetting->files : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.subTask')" fieldName="sub_task" fieldId="sub_task" fieldValue="yes" fieldRequired="true" :checked="($taskSetting->sub_task == 'yes') ?$taskSetting->sub_task : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.menu.timeLogs')" fieldName="time_logs" fieldId="time_logs" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->time_logs == 'yes') ? $taskSetting->time_logs : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.projects.note')" fieldName="notes" fieldId="notes" fieldRequired="true" fieldValue="yes" :checked="($taskSetting->notes == 'yes') ? $taskSetting->notes : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.history')" fieldName="history" fieldId="history" fieldRequired="true" fieldValue="yes" :checked="($taskSetting->history == 'yes') ? $taskSetting->history : ''"/>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.employees.hoursLogged')" fieldName="hours_logged" fieldId="hours_logged" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->hours_logged == 'yes') ? $taskSetting->hours_logged : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('app.menu.customFields')" fieldName="custom_fields" fieldId="custom_fields" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->custom_fields == 'yes') ? $taskSetting->custom_fields : ''"/>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.copyTaskLink')" fieldName="copy_task_link" fieldId="copy_task_link" fieldValue="yes"
                        fieldRequired="true" :checked="($taskSetting->copy_task_link == 'yes') ? $taskSetting->copy_task_link : ''"/>
                    </div>
                </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </x-setting-form-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>
        $('#save-form').click(function() {
            var data = ($('#editSettings').serialize()).replace("_method=PUT", "_method=POST");

            $.easyAjax({
                url: "{{ route('task-settings.store') }}",
                container: '#editSettings',
                blockUI: true,
                type: "POST",
                data: data
            })
        });
    </script>
@endpush
