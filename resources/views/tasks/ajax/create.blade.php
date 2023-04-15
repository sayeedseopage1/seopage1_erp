@php
    $addTaskCategoryPermission = user()->permission('add_task_category');
    $viewTaskCategoryPermission = user()->permission('view_task_category');
    $addEmployeePermission = user()->permission('add_employees');
    $addTaskFilePermission = user()->permission('add_task_files');
    $addTaskPermission = user()->permission('add_tasks');
    $viewMilestonePermission = user()->permission('view_project_milestones');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style>
.w-25 {
    width: 43% !important;
}

</style>
<div class="row">
    <div class="col-sm-12">
        <x-form id="save-task-data-form">
            @include('sections.password-autocomplete-hide')
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.tasks.taskInfo')</h4>

                @php
                    $project_creation_date= $project->created_at;
                    $current_date= \Carbon\Carbon::now();
                    $diff_in_minutes = $current_date->diffInMinutes($project_creation_date);

                    $minutes= 2880- $diff_in_minutes;
                   //dd($project_creation_date, $current_date, $diff_in_minutes);
                   $in_hours= round($minutes/60,0);
                   $in_minutes= $minutes%60;
                   $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
                @endphp
                @if($diff_in_minutes < 2880 && $signature == null)
                    <h6 style="color:red;" class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">You have {{$in_hours}} hours {{$in_minutes}} minutes left to take the sign of deliverable file. After that you can't assign any task.</h6>

                @endif
                <div class="row p-20">

                    <div class="col-lg-4 col-md-6">
                        <x-forms.text :fieldLabel="__('app.title')" fieldName="heading" fieldRequired="true"
                                      fieldId="heading" :fieldPlaceholder="__('placeholders.task')"
                                      :fieldValue="$task ? $task->heading : ''" />
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
                                        <option @if (!is_null($task) && $task->task_category_id == $category->id) selected @endif value="{{ $category->id }}">{{ mb_ucwords($category->category_name) }}
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
                        @if (isset($project) && !is_null($project))
                            <input type="hidden" name="project_id" id="project_id" value="{{ $project->id }}">
                            <input type="hidden" name="task_project_id" value="{{ $project->id }}">
                            <x-forms.text :fieldLabel="__('app.project')" fieldName="projectName" fieldId="projectName"
                                          :fieldValue="$project->project_name" fieldReadOnly="true" />
                        @else
                            <x-forms.select fieldId="project_id" fieldName="project_id" :fieldLabel="__('app.project')"
                                            search="true">
                                <option value="">--</option>
                                @foreach ($projects as $data)
                                    <option @if ((isset($project) && $project->id == $data->id) || ( !is_null($task) && $data->id == $task->project_id)) selected @endif value="{{ $data->id }}">
                                        {{ mb_ucwords($data->project_name) }}
                                    </option>
                                @endforeach
                            </x-forms.select>
                        @endif
                    </div>

                    <div class="col-md-5 col-lg-3">
                        <x-forms.datepicker fieldId="task_start_date" fieldRequired="true"
                                            :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                                            :fieldValue="(($task) ? $task->start_date->format(global_setting()->date_format) : \Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format))"
                                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-5 col-lg-3 dueDateBox"  @if($task && is_null($task->due_date)) style="" @endif>
                        <x-forms.datepicker fieldId="due_date" fieldRequired="true" :fieldLabel="__('app.dueDate')"
                                            fieldName="due_date" :fieldPlaceholder="__('placeholders.date')"
                                            :fieldValue="(($task && $task->due_date) ? $task->due_date->format(global_setting()->date_format) : \Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format))"/>
                    </div>
                    {{-- <div class="col-md-2 col-lg-2 pt-5">
                        <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :checked="$task ? is_null($task->due_date) : ''" :fieldLabel="__('app.withoutDueDate')"
                                          fieldName="without_duedate" fieldId="without_duedate" fieldValue="yes" />
                    </div> --}}


                    @if($project != null)
                        <div class="col-md-12 col-lg-4">
                            <x-forms.select fieldName="milestone_id" fieldRequired="true" fieldId="milestone-id" onChange="getDependentData()"
                                            :fieldLabel="__('modules.projects.milestones')">
                                <option value="">--</option>
                                <?php
                                $milestoness= App\Models\ProjectMilestone::where('project_id',$project->id)->where('status','incomplete')->get();

                                ?>
                                @if($project)
                                    @if(in_array($viewMilestonePermission,['all','owned','added']) )
                                        @foreach ($milestoness as $item)

                                            <option value="{{ $item->id }}"
                                                    @if (!is_null($task) && $item->id == $task->milestone_id) selected @endif>{{ $item->milestone_title }}</option>

                                        @endforeach
                                    @endif
                                @endif
                            </x-forms.select>
                        </div>
                        <div class="col-lg-6 col-md-6" id="deilverable-column">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="heading">Project Deliverable
                                    <sup class="f-14 mr-1">*</sup>

                                </label>

                                <input type="text" class="form-control height-35 f-14" placeholder="" value="" name="deliverable_id" id="deliverable" autocomplete="off" readonly>

                            </div>
                        </div>
                    @endif


                    <div class="col-md-12 col-lg-6">
                        <?php
                        if (Auth::user()->role_id == 4) {
                            $project_members= App\Models\User::where('id',Auth::id())->orWhere('role_id',6)->orWhere('role_id',9)->orWhere('role_id',10)->get();
                        } else {
                            $project_members= App\Models\User::where('id',Auth::id())->orWhere('role_id',6)->orWhere('role_id',5)->orWhere('role_id',9)->orWhere('role_id',10)->get();
                        }

                        //   $users= App\Models\User::where('role_id',5)->get();



                        ?>
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee" fieldRequired="true" :fieldLabel="__('modules.tasks.assignTo')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                        id="selectAssignee" fieldRequired="true" data-live-search="true" data-size="8">

                                    @foreach ($project_members as $item)
                                        <option @if ((isset($defaultAssignee) && $defaultAssignee == $item->id) || (!is_null($task) && isset($projectMember) && in_array($item->id, $projectMember))) selected @endif

                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$item->id)->first();

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
                                        data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' >
                                            </div> {{ ucfirst($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}</span>"
                                                value="{{ $item->id }}">{{ mb_ucwords($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }} </option>
                                    @endforeach
                                </select>

                                <x-slot name="preappend">
                                    <button id="assign-self" type="button"
                                            class="btn btn-outline-secondary border-grey" data-toggle="tooltip"
                                            data-original-title="@lang('modules.tasks.assignMe')">
                                        <img src="{{ user()->image_url }}" width="23"
                                             class="img-fluid rounded-circle">
                                    </button>
                                </x-slot>

                                @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                    <x-slot name="append">
                                        <button id="add-employee" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                    </x-slot>
                                @endif
                            </x-forms.input-group>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        <?php
                        $users= App\Models\User::where('role_id',5)->get();



                        ?>
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee2" :fieldLabel="__('Task Observer')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="observer_id[]"
                                        id="selectAssignee2" data-live-search="true" data-size="8">

                                    @foreach ($employees as $item)
                                        <option @if ((isset($defaultAssignee) && $defaultAssignee == $item->id) || (!is_null($task) && isset($projectMember) && in_array($item->id, $projectMember))) selected @endif

                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$item->id)->first();

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
                                        data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' >
                                            </div> {{ ucfirst($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}</span>"
                                                value="{{ $item->id }}">{{ mb_ucwords($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }} </option>
                                    @endforeach
                                </select>

                                <x-slot name="preappend">
                                    <button id="assign-self" type="button"
                                            class="btn btn-outline-secondary border-grey" data-toggle="tooltip"
                                            data-original-title="@lang('modules.tasks.assignMe')">
                                        <img src="{{ user()->image_url }}" width="23"
                                             class="img-fluid rounded-circle">
                                    </button>
                                </x-slot>

                                @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                    <x-slot name="append">
                                        <button id="add-employee" type="button"
                                                class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                    </x-slot>
                                @endif
                            </x-forms.input-group>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6" id="set-time-estimate-fields">
                        <div class="form-group my-3">
                            <label for="">Task Estimation Time <sup class="mr-1">*</sup></label>
                            <div class="form-group mt-1">
                                <input type="number" min="0" class="w-25 border rounded p-2 height-35 f-14 @error('estimate_hours') is-invalid @enderror" name="estimate_hours" id="estimate_hours">
                                @error('estimate_hours')
                                <div class="text-danger">{{ $message }}</div>
                                @enderror
                                @lang('app.hrs')
                                &nbsp;&nbsp;
                                <input type="number" min="0" name="estimate_minutes" value="{{ $task ? $task->estimate_minutes : '0'}}" class="w-25 height-35 f-14 border rounded p-2 @error('estimate_minutes') is-invalid @enderror" id="estimate_minutes">
                                @error('estimate_minutes')
                                <div class="text-danger">{{ $message }}</div>
                                @enderror
                                @lang('app.mins')
                            </div>
                        </div>
                        @php
                            $task_estimation_hours= App\Models\Task::where('project_id',$project->id)->where('subtask_id',null)->sum('estimate_hours');
                            $task_estimation_minutes= App\Models\Task::where('project_id',$project->id)->where('subtask_id',null)->sum('estimate_minutes');
                            $toal_task_estimation_minutes= $task_estimation_hours*60 + $task_estimation_minutes;
                            $left_minutes= $project->hours_allocated*60 - $toal_task_estimation_minutes;

                            $left_in_hours = round($left_minutes/60,0);
                            $left_in_minutes= $left_minutes%60;
                        @endphp
                        <h6 style="color:red;">You have {{$left_in_hours}} hours {{$left_in_minutes}} minutes remaining of estimation time</h6>
                    </div>
                    <div class="col-md-12 col-lg-2 mt-5">
                        {{-- <button class="btn btn-outline-secondary add_extenstion_request" type="button">Make Extension Request</button> --}}
                       
                    </div>
                    @if(is_null($task))
                        {{-- <div class="col-md-6">
                            <div class="form-group my-3">
                                <div class="d-flex">
                                    <x-forms.checkbox :fieldLabel="__('modules.tasks.dependent')" fieldName="dependent"
                                        fieldId="dependent-task" />
                                </div>
                            </div>

                            <div class="d-none" id="dependent-fields">
                                <x-forms.select fieldId="dependent_task_id" :fieldLabel="__('modules.tasks.dependentTask')"
                                    fieldName="dependent_task_id" search="true">
                                    <option value="">--</option>
                                    @foreach ($allTasks as $item)
                                        <option value="{{ $item->id }}">{{ $item->heading }} (@lang('app.dueDate'):
                                            @if(!is_null($item->due_date)) {{ $item->due_date->format(global_setting()->date_format) }} @else - @endif )
                                        </option>
                                    @endforeach
                                </x-forms.select>
                            </div>
                        </div> --}}
                    @endif

                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="descriptionText">Description
                                <sup class="mr-1">*</sup>
                            </label>
                            <textarea name="description" id="description" class="form-control @error('description') is-invalid @enderror"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            
                       
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            @error('description')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                </div>

            <!-- <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-top-grey other-details-button">
                    <a href="javascript:;" class="text-dark toggle-other-details"><i class="fa fa-chevron-down"></i>
                        @lang('modules.client.clientOtherDetails')</a>
                </h4> -->



                <div class="col-md-12">
                    <div class="row">

                        <div class="col-md-12 col-lg-4">
                            <div class="form-group my-3">
                                <x-forms.label fieldId="task_labels" :fieldLabel="__('app.label')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="select-picker form-control" multiple name="task_labels[]"
                                            id="task_labels" data-live-search="true" data-size="8">
                                        @foreach ($taskLabels as $label)
                                            <option
                                                data-content="<span class='badge badge-secondary' style='background-color: {{ $label->label_color }}'>{{ $label->label_name }}</span>"
                                                value="{{ $label->id }}" @if($task && isset($selectedLabel) && in_array($label->id, $selectedLabel)) selected @endif>{{ $label->label_name }}</option>
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
                        </div>

                        <?php

                        $board_column= App\Models\TaskboardColumn::where('id',2)->first();
                        //  dd($board_column);
                        ?>

                        @if (user()->permission('change_status') == 'all')
                            <div class="col-lg-3 col-md-6">
                                <x-forms.select fieldId="board_column_id" :fieldLabel="__('app.status')"
                                                fieldName="board_column_id" fieldReadOnly="true" >

                                    <option selected value="{{$board_column->id}}">{{$board_column->column_name}}
                                    </option>

                                </x-forms.select>
                            </div>


                        @endif

                        <div class="col-lg-3 col-md-6">
                            <x-forms.select fieldId="priority" :fieldLabel="__('modules.tasks.priority')"
                                            fieldName="priority">
                                <option @if (!is_null($task) && $task->priority == 'high') selected @endif value="high">@lang('modules.tasks.high')</option>
                                <option @if (!is_null($task) && $task->priority == 'medium') selected @endif value="medium" @if (is_null($task)) selected @endif>@lang('modules.tasks.medium')</option>
                                <option @if (!is_null($task) && $task->priority == 'low') selected @endif value="low">@lang('modules.tasks.low')</option>
                            </x-forms.select>
                        </div>
                    </div>
                </div>





                @if ($addTaskFilePermission == 'all' || $addTaskFilePermission == 'added')
                    <div class="col-lg-12">
                        <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                                               :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="file"
                                               fieldId="task-file-upload-dropzone" />
                        <input type="hidden" name="image_url" id="image_url">
                    </div>
                    <input type="hidden" name="taskID" id="taskID">
                    <input type="hidden" name="addedFiles" id="addedFiles">
                @endif

                @if (isset($fields) && count($fields) > 0)
                    @foreach ($fields as $field)
                        <div class="col-md-4">
                            @if ($field->type == 'text')
                                <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                              :fieldLabel="$field->label"
                                              fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                              :fieldPlaceholder="$field->label"
                                              :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.text>
                            @elseif($field->type == 'password')
                                <x-forms.password
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.password>
                            @elseif($field->type == 'number')
                                <x-forms.number
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false">
                                </x-forms.number>
                            @elseif($field->type == 'textarea')
                                <x-forms.textarea :fieldLabel="$field->label"
                                                  fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                  fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                  :fieldRequired="($field->required === 'yes') ? true : false"
                                                  :fieldPlaceholder="$field->label">
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
                                                           :fieldValue="$value" :checked="($key == 0) ? true : false" />
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
                                    {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                </div>
                            @elseif($field->type == 'date')
                                <x-forms.datepicker custom="true"
                                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                                    :fieldLabel="$field->label"
                                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                    :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                                    :fieldPlaceholder="$field->label" />
                            @elseif($field->type == 'checkbox')
                                <div class="form-group my-3">
                                    <x-forms.label
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.label>
                                    <div class="d-flex checkbox-{{$field->id}}">
                                        <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">

                                        @foreach ($field->values as $key => $value)
                                            <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                              :fieldLabel="$value"
                                                              fieldName="$field->name.'_'.$field->id.'[]'"
                                                              :fieldValue="$value"
                                                              onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                              :fieldRequired="($field->required === 'yes') ? true : false" />
                                        @endforeach
                                    </div>
                                </div>
                            @endif

                        </div>
                    @endforeach
                @endif


                <x-form-actions>
                    <x-forms.button-primary class="mr-3" id="save-task-form" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-secondary class="mr-3" id="save-more-task-form" icon="check-double">@lang('app.saveAddMore')
                    </x-forms.button-secondary>
                    <x-forms.button-cancel :link="route('tasks.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>

@include('tasks.modals.estimateextensionmodal')
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>

    $(document).ready(function() {
        var add_task_files = "{{ $addTaskFilePermission }}";

        @if (isset($project) && !is_null($project))
        $('#project_id').attr("readonly", true);
        @endif



        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        if (add_task_files == "all" || add_task_files == "added") {

            Dropzone.autoDiscover = false;
            //Dropzone class
            taskDropzone = new Dropzone("div#task-file-upload-dropzone", {
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
                init: function () {
                    taskDropzone = this;
                }
            });
            taskDropzone.on('sending', function (file, xhr, formData) {
                var ids = $('#taskID').val();
                formData.append('task_id', ids);
                $.easyBlockUI();
            });
            taskDropzone.on('uploadprogress', function () {
                $.easyBlockUI();
            });
            taskDropzone.on('completemultiple', function () {
                window.location.href = localStorage.getItem("redirect_task");
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



        const dp1 = datepicker('#task_start_date', {
            position: 'bl',
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
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        $('#save-task-data-form').on('change', '#project_id', function () {
            let id = $(this).val();
            if (id == '') {
                id = 0;
            }
            let url = "{{ route('milestones.by_project', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                container: '#save-task-data-form',
                type: "GET",
                blockUI: true,
                success: function (response) {
                    if (response.status == 'success') {
                        $('#milestone-id').html(response.data);
                        $('#milestone-id').selectpicker('refresh');
                    }
                }
            });
        });

        $('#save-task-data-form').on('change', '#project_id', function () {
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
                    //  console.log(data);
                    //  $('#selectAssignee').html(data.data);
                    $('.projectId').text(data.unique_id+'-');
                    $('#selectAssignee').selectpicker('refresh');
                }
            })
        });
        $('#save-task-data-form').on('change', '#project_id', function () {
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
                    //  $('#selectAssignee2').html(data.data);
                    $('.projectId').text(data.unique_id+'-');
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

        $('#save-more-task-form').click(function () {
            let note = CKEDITOR.instances.description.getData();
            document.getElementById('description').value = note;

            const url = "{{ route('tasks.store') }}?taskId={{$task ? $task->id : ''}}";
            var data = $('#save-task-data-form').serialize() + '&add_more=true';

            saveTask(data, url, "#save-more-task-form");

        });

        $('#save-task-form').click(function () {
            let note = CKEDITOR.instances.description.getData();
            document.getElementById('description').value = note;

            const url = "{{ route('tasks.store') }}?taskId={{$task ? $task->id : ''}}";
            var data = $('#save-task-data-form').serialize();

            saveTask(data, url, "#save-task-form");

        });

        function saveTask(data, url, buttonSelector) {
            $.easyAjax({
                url: url,
                container: '#save-task-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: buttonSelector,
                data: data,
                success: function (response) {
                    if (response.status === 'success') {
                        if (typeof taskDropzone !== 'undefined' && taskDropzone.getQueuedFiles().length > 0) {
                            taskID = response.taskID;
                            $('#taskID').val(response.taskID);
                            (response.add_more == true) ? localStorage.setItem("redirect_task", window.location.href) : localStorage.setItem("redirect_task", response.redirectUrl);
                            taskDropzone.processQueue();
                        } else if (response.add_more == true) {
                            $(RIGHT_MODAL_CONTENT).html(response.html.html);
                        } else {
                            window.location.href = response.redirectUrl;
                        }

                        if (typeof showTable !== 'undefined' && typeof showTable === 'function') {
                            showTable();
                        }
                    }
                }

            });
        }

        $('#assign-self').click(function () {
            $('#selectAssignee').val('{{ $user->id }}');
            $('#selectAssignee').selectpicker('refresh');
        });
        $('#assign-self').click(function () {
            $('#selectAssignee2').val('{{ $user->id }}');
            $('#selectAssignee2').selectpicker('refresh');
        });

        $('#without_duedate').click(function () {
            $('.dueDateBox').toggle();
        });

        $('#create_task_category').click(function () {
            const url = "{{ route('taskCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#department-setting').click(function () {
            const url = "{{ route('departments.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#client_view_task').change(function () {
            $('#clientNotification').toggleClass('d-none');
        });

        $('#set_time_estimate').change(function () {
            $('#set-time-estimate-fields').toggleClass('d-none');
        });

        @if (!is_null($task) && ($task->estimate_hours > 0 || $task->estimate_minutes > 0))
        $('#set-time-estimate-fields').toggleClass('d-none');
        @endif

        $('#repeat-task').change(function () {
            $('#repeat-fields').toggleClass('d-none');
        });

        $('#dependent-task').change(function () {
            $('#dependent-fields').toggleClass('d-none');
        });

        $('.toggle-other-details').click(function () {
            $(this).find('svg').toggleClass('fa-chevron-down fa-chevron-up');
            $('#other-details').toggleClass('d-none');
        });

        @if (!is_null($task))
        // $('.other-details-button').addClass('d-none');;
        $('#other-details').toggleClass('d-none');
        @endif

        $('#createTaskLabel').click(function () {
            const url = "{{ route('task-label.create') }}?task_id={{$task ? $task->id : ''}}";
            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });

        $('#add-project').click(function () {
            $(MODAL_XL).modal('show');

            const url = "{{ route('projects.create') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: MODAL_XL,
                success: function (response) {
                    if (response.status == "success") {
                        $(MODAL_XL + ' .modal-body').html(response.html);
                        $(MODAL_XL + ' .modal-title').html(response.title);
                        init(MODAL_XL);
                    }
                }
            });
        });

        $('#add-employee').click(function () {
            $(MODAL_XL).modal('show');

            const url = "{{ route('employees.create') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: MODAL_XL,
                success: function (response) {
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

    function checkboxChange(parentClass, id) {
        let checkedData = '';
        $('.' + parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData + ', ' + $(this).val() : $(this).val();
        });
        $('#' + id).val(checkedData);
    }
    function getDependentData() {
        var milestone_id = $('#milestone-id').val();

        $('#deilverable-column').show();
        $.ajax({
            url: '/get-deliverable/' + milestone_id,
            method: 'GET',
            success: function(response) {
                $('#deilverable-column').show();

                $('#deliverable').val(response.title);
                if(response.title == null)
                {
                    $('#deilverable-column').hide();
                }
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

        // if (field1Value) {
        //     $.ajax({
        //         url: '/getDependentData',
        //         type: 'GET',
        //         data: {field1Value: field1Value},
        //         success: function(data) {
        //             // set the value of the dependent field based on the received data
        //             $('#dependentField').val(data);
        //         }
        //     });
        // }
    }

    $('#save-task-form').click(function(e){
        var data= {
            '_token': "{{ csrf_token() }}",
            'estimate_hours': document.getElementById("estimate_hours").value,
            'estimate_minutes': document.getElementById("estimate_minutes").value,
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('tasks.store')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#estimate_hours').trigger("reset");
                $('#estimate_minutes').trigger("reset");
                {{--$(location).prop('href', '{{url('/account/leads/')}}');--}}
            },
            error: function(error) {
                console.log(response.error);
                // console.log(response);
                // if(error.responseJSON.errors.client_name){
                //     $('#clientNameError').text(error.responseJSON.errors.client_name);
                // }else{
                //     $('#clientNameError').text('');
                // }
                if (error.responseJSON.errors.estimate_hours) {
                    toastr.error('Estimate hours cannot exceed from project allocation hours');
                }
            }
        });
    });

    $(document).on('click','.add_extenstion_request',function(e){
       // alert("success");

        $("#estimationextensionrequest").modal('show');
});
</script>
@if(session('error'))
    <script>
        Toastr.error('{{ session('error') }}', 'Failed', {positionClass: 'toast-top-right'});
    </script>
@endif

