<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-task-data-form" method="PUT">
            <input type="hidden" name="template_id" value="{{ $template->id }}" />
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.tasks.taskInfo')</h4>
                <div class="row p-20">
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('app.title')" fieldName="heading" fieldRequired="true"
                                      fieldId="heading" :fieldPlaceholder="__('placeholders.task')"
                                      :fieldValue="$task->heading" />
                    </div>

                    <div class="col-lg-6 col-md-6">
                        <x-forms.label class="my-3" fieldId="category_id"
                                       :fieldLabel="__('modules.tasks.taskCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="task_category_id"
                                    data-live-search="true" data-size="8">
                                <option value="">--</option>
                                @foreach ($categories as $category)
                                    <option @if ($task->project_template_task_category_id == $category->id) selected @endif value="{{ $category->id }}">
                                        {{ mb_ucwords($category->category_name) }}
                                    </option>
                                @endforeach
                            </select>

                            <x-slot name="append">
                                <button id="create_task_category" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-6 col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee"
                                           :fieldLabel="__('modules.tasks.assignTo')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                        id="selectAssignee" data-live-search="true" data-size="8">
                                    @foreach ($employees as $employee)
                                        @php
                                            $selected = '';
                                        @endphp

                                        @foreach ($task->usersMany as $item)
                                            @if ($item->id == $employee->id)
                                                @php
                                                    $selected = 'selected';
                                                @endphp
                                            @endif
                                        @endforeach
                                        <option {{ $selected }} data-content="<span class='badge badge-pill badge-light border'>
                                                    <div class='d-inline-block mr-1'><img
                                                            class='taskEmployeeImg rounded-circle'
                                                            src='{{ $employee->image_url }}'></div>
                                                    {{ ucfirst($employee->name) }}
                                            </span>" value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }}
                                        </option>
                                    @endforeach
                                </select>

                                <x-slot name="append">
                                    <button id="add-employee" type="button"
                                            class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.select fieldId="priority" :fieldLabel="__('modules.tasks.priority')"
                                        fieldName="priority">
                            <option @if ($task->priority == 'high') selected @endif value="high">@lang('modules.tasks.high')</option>
                            <option @if ($task->priority == 'medium') selected @endif value="medium">
                                @lang('modules.tasks.medium')</option>
                            <option @if ($task->priority == 'low') selected @endif value="low">@lang('modules.tasks.low')</option>
                        </x-forms.select>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('app.description')">
                            </x-forms.label>
                            <div id="description">{!! $task->description !!}</div>
                            <textarea name="description" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>
                    <x-form-actions>
                        <x-forms.button-primary id="save-task-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>
                        <x-forms.button-cancel :link="route('project-template.show', $template->id.'?tab=tasks')" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </x-form-actions>
                </div>
            </div>
        </x-form>

    </div>
</div>

<script>

    $(document).ready(function() {
        $("#selectAssignee").selectpicker({
            actionsBox: true,
            selectAllText: "{{ __('modules.permission.selectAll') }}",
            deselectAllText: "{{ __('modules.permission.deselectAll') }}",
            multipleSeparator: " ",
            selectedTextFormat: "count > 8",
            countSelectedText: function(selected, total) {
                return selected + " {{ __('app.membersSelected') }} ";
            }
        });

        quillImageLoad('#description');

        $('#save-task-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('project-template-task.update', $task->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-task-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-task-form",
                data: $('#save-task-data-form').serialize(),
                success: function(response) {
                    if ($(RIGHT_MODAL).hasClass('in')) {
                        document.getElementById('close-task-detail').click();
                        if ($('#allTasks-table').length) {
                            window.LaravelDataTables["allTasks-table"].draw();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    } else {
                        window.location.href = response.redirectUrl;
                    }

                }
            });
        });

        $('#create_task_category').click(function() {
            const url = "{{ route('taskCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#department-setting').click(function() {
            const url = "{{ route('departments.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#add-employee').click(function() {
            $(MODAL_XL).modal('show');

            const url = "{{ route('employees.create') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: MODAL_XL,
                success: function(response) {
                    if (response.status == "success") {
                        $(MODAL_XL + ' .modal-body').html(response.html);
                        $(MODAL_XL + ' .modal-title').html(response.title);
                        init(MODAL_XL);
                    }
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
