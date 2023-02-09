@php
$addTaskCategoryPermission = user()->permission('add_task_category');
$addEmployeePermission = user()->permission('add_employees');
$addTaskFilePermission = user()->permission('add_task_files');
$editTaskPermission = user()->permission('edit_tasks');
$viewTaskCategoryPermission = user()->permission('view_task_category');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-task-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.tasks.taskInfo')</h4>
                <div class="row p-20">

                    <div class="col-lg-4 col-md-6">
                        <x-forms.text :fieldLabel="__('app.title')" fieldName="heading" fieldRequired="true"
                            fieldId="heading" :fieldPlaceholder="__('placeholders.task')"
                            :fieldValue="$task->heading" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.label class="my-3" fieldId="category_id"
                            :fieldLabel="__('modules.tasks.taskCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="task_category_id"
                                data-live-search="true" data-size="8">
                                <option value="">--</option>
                                @if ($viewTaskCategoryPermission == 'all' || $viewTaskCategoryPermission == 'added')
                                    @foreach ($categories as $category)
                                        <option @if ($task->task_category_id == $category->id) selected @endif value="{{ $category->id }}">
                                            {{ mb_ucwords($category->category_name) }}
                                        </option>
                                    @endforeach
                                @endif
                            </select>

                            @if ($addTaskCategoryPermission == 'all' || $addTaskCategoryPermission == 'added')
                                <x-slot name="append">
                                    <button id="create_task_category" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.label class="my-3" fieldId="project-id" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="project_id" id="project-id"
                                data-live-search="true" data-size="8">
                                <option value="">--</option>
                                @foreach ($projects as $project)
                                    <option @if ($project->id == $task->project_id) selected @endif value="{{ $project->id }}">
                                        {{ mb_ucwords($project->project_name) }}
                                    </option>
                                @endforeach
                            </select>
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-5 col-lg-4">
                        <x-forms.datepicker fieldId="task_start_date" fieldRequired="true"
                            :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                            :fieldValue="(($task->start_date) ? $task->start_date->format(global_setting()->date_format) : '')"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-5 col-lg-4 dueDateBox" @if(is_null($task->due_date)) style="display: none" @endif>
                        <x-forms.datepicker fieldId="due_date" fieldRequired="true" :fieldLabel="__('app.dueDate')"
                                            fieldName="due_date" :fieldPlaceholder="__('placeholders.date')"
                                            :fieldValue="(($task->due_date) ? $task->due_date->format(global_setting()->date_format) : '')"  />
                    </div>

                    <div class="col-md-2 col-lg-2 pt-5">
                        <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :checked="is_null($task->due_date)" :fieldLabel="__('app.withoutDueDate')"
                                          fieldName="without_duedate" fieldId="without_duedate" fieldValue="yes" />
                    </div>


                      <div class="col-md-12 col-lg-4">
                          <x-forms.select fieldName="milestone_id" fieldId="milestone-id"
                              :fieldLabel="__('modules.projects.milestones')">
                              <option value="">--</option>
                              @if ($task->project && count($task->project->milestones) > 0)
                                  @foreach ($task->project->milestones as $milestone)
                                      <option @if ($milestone->id == $task->milestone_id) selected @endif value="{{ $milestone->id }}">
                                          {{ $milestone->milestone_title }}</option>
                                  @endforeach
                              @endif
                          </x-forms.select>
                      </div>


                    <div class="col-md-12 col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee" :fieldLabel="__('modules.tasks.assignTo')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                    id="selectAssignee" data-live-search="true" data-size="8">
                                    @foreach ($employees as $employee)
                                        @php
                                            $selected = '';
                                        @endphp

                                        @foreach ($task->users as $item)

                                            @if ($item->id == $employee->id)
                                                @php
                                                    $selected = 'selected';
                                                @endphp
                                            @endif
                                        @endforeach
                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$employee->id)->first();

                                        if($task_id != null)
                                        {
                                            $task_s= App\Models\Task::where('id',$task_id->task_id)->first();
                                            if ($task_s != null && $task_s->status != 'completed') {
                                              // $date1 = new DateTime($task_s['due_date']);
                                              // $date2 = new DateTime(Carbon\Carbon::now()->addDay(1));
                                              // $days  = $date2->diff($date1)->format('%a');

                                                  $d_data= "Busy Until ".$task_s->due_date->format('Y-m-d') . ' ('.$task_s->due_date->format('h:i:s A'). ')';


                                            }else {
                                                  $d_data=  "Open to Work";
                                            }

                                        }else {
                                          $d_data=  "Open to Work";
                                        }
                                      // dd($task_id->task_id);

                                         ?>
                                        <option {{ $selected }} data-content="<span class='badge badge-pill badge-light border'>
                                                <div class='d-inline-block mr-1'><img
                                                        class='taskEmployeeImg rounded-circle'
                                                        src='{{ $employee->image_url }}'></div>
                                                {{ ucfirst($employee->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}
                                            </span>" value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}
                                        </option>
                                    @endforeach
                                </select>

                                @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                    <x-slot name="append">
                                        <button id="add-employee" type="button"
                                            class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                    </x-slot>
                                @endif
                            </x-forms.input-group>
                        </div>
                    </div>
                    {{--<div class="col-md-12 col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee2" :fieldLabel="__('Task Observer')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="observer_id[]"
                                    id="selectAssignee2" data-live-search="true" data-size="8">
                                    @foreach ($employees as $employee)
                                        @php
                                            $selected = '';
                                        @endphp

                                        @foreach ($task->users as $item)
                                            @if ($item->id == $employee->id)
                                                @php
                                                    $selected = 'selected';
                                                @endphp
                                            @endif
                                        @endforeach
                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$employee->id)->first();

                                        if($task_id != null)
                                        {
                                            $task_s= App\Models\Task::where('id',$task_id->task_id)->first();
                                            if ($task_s != null && $task_s->status != 'completed') {
                                              // $date1 = new DateTime($task_s['due_date']);
                                              // $date2 = new DateTime(Carbon\Carbon::now()->addDay(1));
                                              // $days  = $date2->diff($date1)->format('%a');

                                                  $d_data= "Busy Until ".$task_s->due_date;


                                            }else {
                                                  $d_data=  "Open to Work";
                                            }

                                        }else {
                                          $d_data=  "Open to Work";
                                        }
                                      // dd($task_id->task_id);

                                         ?>
                                        <option {{ $selected }} data-content="<span class='badge badge-pill badge-light border'>
                                                <div class='d-inline-block mr-1'><img
                                                        class='taskEmployeeImg rounded-circle'
                                                        src='{{ $employee->image_url }}'></div>
                                                {{ ucfirst($employee->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}
                                            </span>" value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}
                                        </option>
                                    @endforeach
                                </select>

                                @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                    <x-slot name="append">
                                        <button id="add-employee" type="button"
                                            class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                    </x-slot>
                                @endif
                            </x-forms.input-group>
                        </div>
                    </div> --}}

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('app.description')" fieldRequired="true">
                            </x-forms.label>
                            <div id="description">{!! $task->description !!}</div>
                            <textarea name="description" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>

                </div>

                <!-- <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-top-grey">
                    @lang('modules.client.clientOtherDetails')
                </h4> -->


                    <div class="col-md-12">
                        <div class="row">
                          {{-- <div class="col-md-12 col-lg-4">
                                <div class="form-group my-3">
                                    <x-forms.label fieldId="task_labels" :fieldLabel="__('app.label')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <select class="select-picker form-control" multiple name="task_labels[]"
                                            id="task_labels" data-live-search="true" data-size="8">
                                            @foreach ($taskLabels as $label)
                                                @php
                                                    $selected = '';
                                                @endphp

                                                @foreach ($task->label as $item)
                                                    @if ($item->label_id == $label->id)
                                                        @php
                                                            $selected = 'selected';
                                                        @endphp
                                                    @endif
                                                @endforeach
                                                <option {{ $selected }}
                                                    data-content="<span class='badge badge-secondary' style='background-color: {{ $label->label_color }}'>{{ $label->label_name }}</span>"
                                                    value="{{ $label->id }}">{{ $label->label_name }}</option>
                                            @endforeach
                                        </select>


                                        @if (user()->permission('task_labels') == 'all')
                                            <x-slot name="append">
                                                <button id="createTaskLabel" type="button"
                                                    class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                            </x-slot>
                                        @endif
                                    </x-forms.input-group>
                                </div>
                            </div> --}} 




                            @if ($changeStatusPermission == 'all'
                            || ($changeStatusPermission == 'added' && $task->added_by == user()->id)
                            || ($changeStatusPermission == 'owned' && in_array(user()->id, $taskUsers))
                            || ($changeStatusPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
                            )
                                <div class="col-lg-3 col-md-6">
                                    <x-forms.select fieldId="board_column_id" :fieldLabel="__('app.status')"
                                        fieldName="board_column_id" search="true">
                                        @foreach ($taskboardColumns as $item)
                                            <option @if ($task->board_column_id == $item->id) selected @endif value="{{ $item->id }}">
                                                {{ $item->slug == 'completed' || $item->slug == 'incomplete' ? __('app.' . $item->slug) : $item->column_name }}
                                            </option>
                                        @endforeach
                                    </x-forms.select>
                                </div>
                            @endif

                            <div class="col-lg-3 col-md-6">
                                <x-forms.select fieldId="priority" :fieldLabel="__('modules.tasks.priority')"
                                    fieldName="priority">
                                    <option @if ($task->priority == 'high') selected @endif value="high">@lang('modules.tasks.high')</option>
                                    <option @if ($task->priority == 'medium') selected @endif value="medium">
                                        @lang('modules.tasks.medium')</option>
                                    <option @if ($task->priority == 'low') selected @endif value="low">@lang('modules.tasks.low')</option>
                                </x-forms.select>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6 col-lg-3">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox :fieldLabel="__('modules.tasks.makePrivate')" fieldName="is_private"
                                    fieldId="is_private" :popover="__('modules.tasks.privateInfo')"
                                    :checked="$task->is_private" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox :fieldLabel="__('modules.tasks.billable')" fieldName="billable"
                                    fieldId="billable" :popover="__('modules.tasks.billableInfo')"
                                    :checked="$task->billable" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox :fieldLabel="__('modules.tasks.setTimeEstimate')"
                                    fieldName="set_time_estimate" fieldId="set_time_estimate"
                                    :checked="($task->estimate_hours > 0 || $task->estimate_minutes > 0)" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-3 {{ $task->estimate_hours == 0 && $task->estimate_minutes == 0 ? 'd-none' : '' }}"
                        id="set-time-estimate-fields">
                        <div class="form-group mt-5">
                            <input type="number" min="0" class="w-25 border rounded p-2 height-35 f-14"
                                name="estimate_hours" value="{{ $task->estimate_hours }}">
                            @lang('app.hrs')
                            &nbsp;&nbsp;
                            <input type="number" min="0" name="estimate_minutes"
                                value="{{ $task->estimate_minutes }}" class="w-25 height-35 f-14 border rounded p-2">
                            @lang('app.mins')
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <div class="d-flex">
                                <x-forms.checkbox :fieldLabel="__('modules.events.repeat')" fieldName="repeat" :checked="$task->repeat"
                                    fieldId="repeat-task" />
                            </div>
                        </div>

                        <div class="form-group my-3 {{$task->repeat ? '' : 'd-none'}}" id="repeat-fields">
                            <div class="row">
                                <div class="col-md-6 mt-3">
                                    <x-forms.label fieldId="repeatEvery" fieldRequired="true"
                                        :fieldLabel="__('modules.events.repeatEvery')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <input type="number" min="1" value="{{$task->repeat_count}}" name="repeat_count"
                                            class="form-control f-14">

                                        <x-slot name="append">
                                            <select name="repeat_type" class="select-picker form-control">
                                                <option @if ($task->repeat_type == 'day') selected @endif value="day">
                                                    @lang('app.day')</option>
                                                <option @if ($task->repeat_type == 'week') selected @endif value="week">
                                                    @lang('app.week')</option>
                                                <option @if ($task->repeat_type == 'month') selected @endif value="month">
                                                    @lang('app.month')</option>
                                                <option @if ($task->repeat_type == 'year') selected @endif value="year">
                                                    @lang('app.year')</option>
                                            </select>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                                <div class="col-md-6">
                                    <x-forms.number :fieldLabel="__('modules.events.cycles')" fieldName="repeat_cycles"
                                        fieldRequired="true" :fieldValue="$task->repeat_cycles" minValue="1" fieldId="repeat_cycles"
                                        :fieldPlaceholder="__('modules.tasks.cyclesToolTip')"
                                        :popover="__('modules.tasks.cyclesToolTip')" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <div class="d-flex">
                                <x-forms.checkbox :fieldLabel="__('modules.tasks.dependent')" fieldName="dependent"
                                    fieldId="dependent-task" :checked="$task->dependent_task_id" />
                            </div>
                        </div>

                        <div class="{{ !$task->dependent_task_id ? 'd-none' : '' }}" id="dependent-fields">
                            <x-forms.select fieldId="dependent_task_id" :fieldLabel="__('modules.tasks.dependentTask')"
                                fieldName="dependent_task_id" search="true">
                                <option value="">--</option>
                                @foreach ($allTasks as $item)
                                    <option @if ($item->id == $task->dependent_task_id) selected @endif value="{{ $item->id }}">
                                        {{ $item->heading }}
                                        (@lang('app.dueDate'):
                                        @if(!is_null($item->due_date))
                                            {{ $item->due_date->format(global_setting()->date_format) }})
                                        @endif
                                    </option>
                                @endforeach
                            </x-forms.select>
                        </div>
                    </div>

                    @if ($addTaskFilePermission == 'all' || $addTaskFilePermission == 'added')
                        <div class="col-lg-12">
                            <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="file"
                                fieldId="task-files-upload-dropzone" />
                            <input type="hidden" name="image_url" id="image_url">
                        </div>
                        <input type="hidden" name="addedFiles" id="addedFiles">
                    @endif



                @if (isset($fields) && count($fields) > 0)
                    <div class="row p-20">
                        @foreach ($fields as $field)
                            <div class="col-md-4">
                                <div class="form-group">
                                    @if ($field->type == 'text')
                                        <x-forms.text
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required == 'yes') ? 'true' : 'false'"
                                            :fieldValue="$task->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.text>
                                    @elseif($field->type == 'password')
                                        <x-forms.password
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$task->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.password>
                                    @elseif($field->type == 'number')
                                        <x-forms.number
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$task->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.number>
                                    @elseif($field->type == 'textarea')
                                        <x-forms.textarea :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldPlaceholder="$field->label"
                                            :fieldValue="$task->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.textarea>
                                    @elseif($field->type == 'radio')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex">
                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                        :fieldValue="$value"
                                                        :checked="(isset($task) && $task->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
                                                @endforeach
                                            </div>
                                        </div>
                                    @elseif($field->type == 'select')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($task) ? $task->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                        </div>
                                    @elseif($field->type == 'date')
                                        <x-forms.datepicker custom="true"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldValue="($task->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($task->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                            :fieldPlaceholder="$field->label" />
                                    @elseif($field->type == 'checkbox')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex checkbox-{{$field->id}}">
                                                <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$task->custom_fields_data['field_'.$field->id]}}">

                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="$field->name.'_'.$field->id.'[]'"
                                                        :fieldValue="$value"
                                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                                        onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                        :checked="$task->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $task->custom_fields_data['field_'.$field->id]))"
                                                        />
                                                @endforeach
                                            </div>
                                        </div>
                                    @endif
                                    <div class="form-control-focus"> </div>
                                    <span class="help-block"></span>

                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif

                <x-form-actions>
                    <x-forms.button-primary id="save-task-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('tasks.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    var add_task_files = "{{ $addTaskFilePermission }}";

    $(document).ready(function() {

        $(".select-picker").selectpicker();

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        if (add_task_files == "all" || add_task_files == "added") {

            Dropzone.autoDiscover = false;
            //Dropzone class
            taskDropzone = new Dropzone("div#task-files-upload-dropzone", {
                dictDefaultMessage: "{{ __('app.dragDrop') }}",
                url: "{{ route('task-files.store') }}",
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
                var ids = "{{ $task->id }}";
                formData.append('task_id', ids);
                $.easyBlockUI();
            });
            taskDropzone.on('uploadprogress', function() {
                $.easyBlockUI();
            });
            taskDropzone.on('completemultiple', function() {
                var msgs = "@lang('messages.taskCreatedSuccessfully')";
                window.location.href = "{{ route('tasks.index') }}"
            });
        }


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
        $("#selectAssignee2").selectpicker({
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

        const dp1 = datepicker('#task_start_date', {
            position: 'bl',
            dateSelected: new Date("{{ $task->start_date ? str_replace('-', '/', $task->start_date) : str_replace('-', '/', now()) }}"),
            onSelect: (instance, date) => {
                if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                    .getTime()) {
                    dp2.setDate(date, true)
                }
                if (typeof dp2.dateSelected === 'undefined') {
                    dp2.setDate(date, true)
                }
                dp2.setMin(date);
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#due_date', {
            position: 'bl',
            dateSelected: new Date("{{ $task->due_date ? str_replace('-', '/', $task->due_date) : str_replace('-', '/', now()) }}"),
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        $('#save-task-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('tasks.update', $task->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-task-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-task-form",
                data: $('#save-task-data-form').serialize(),
                success: function(response) {
                    if ((add_task_files == "all" || add_task_files == "added") &&
                        taskDropzone.getQueuedFiles().length > 0) {
                        taskDropzone.processQueue();
                    } else if ($(RIGHT_MODAL).hasClass('in')) {
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

        $('#client_view_task').change(function() {
            $('#clientNotification').toggleClass('d-none');
        });

        $('#without_duedate').click(function() {
            $('.dueDateBox').toggle();
        });

        $('#set_time_estimate').change(function() {
            $('#set-time-estimate-fields').toggleClass('d-none');
        });

        $('#repeat-task').change(function() {
            $('#repeat-fields').toggleClass('d-none');
        });

        $('#dependent-task').change(function() {
            $('#dependent-fields').toggleClass('d-none');
        });


        $('#project-id').change(function() {
            var id = $(this).val();
            if (id == '') {
                id = 0;
            }
            var url = "{{ route('milestones.by_project', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                container: '#save-task-data-form',
                type: "GET",
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        $('#milestone-id').html(response.data);
                        $('#milestone-id').selectpicker('refresh');
                    }
                }
            });
        });

        $('#project-id').change(function() {
            let id = $(this).val();
            if (id === '') {
                id = 0;
            }
            let url = "{{ route('projects.members', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-task-data-form',
                blockUI: true,
                redirect: true,
                success: function (data) {
                    $('#selectAssignee').html(data.data);
                    $('.projectId').text(data.unique_id);
                    $('#selectAssignee').selectpicker('refresh');
                }
            })
        });
        $('#project-id').change(function() {
            let id = $(this).val();
            if (id === '') {
                id = 0;
            }
            let url = "{{ route('projects.members', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-task-data-form',
                blockUI: true,
                redirect: true,
                success: function (data) {
                    $('#selectAssignee2').html(data.data);
                    $('.projectId').text(data.unique_id);
                    $('#selectAssignee2').selectpicker('refresh');
                }
            })
        });


        $('#save-task-data-form').on('change', '#project_id', function () {
            let id = $(this).val();
            if (id === '') {
                id = 0;
            }
            let url = "{{ route('projects.labels', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-task-data-form',
                blockUI: true,
                redirect: true,
                success: function (data) {
                    $('#task_labels').html(data.data);
                    $('#task_labels').selectpicker('refresh');
                }
            })
        });


        $('#createTaskLabel').click(function() {
            const url = "{{ route('task-label.create') }}?task_id={{$task->id}}";
            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });

        $('#add-project').click(function() {
            $(MODAL_XL).modal('show');

            const url = "{{ route('projects.create') }}";

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

    function checkboxChange(parentClass, id){
        var checkedData = '';
        $('.'+parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData+', '+$(this).val() : $(this).val();
        });
        $('#'+id).val(checkedData);
    }
</script>
