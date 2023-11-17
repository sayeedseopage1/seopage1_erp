@php
$addProjectCategoryPermission = user()->permission('manage_project_category');
$addClientPermission = user()->permission('add_clients');
$editProjectMemberPermission = user()->permission('edit_project_members');
$addEmployeePermission = user()->permission('add_employees');
$addProjectMemberPermission = user()->permission('add_project_members');
$addProjectMemberPermission = user()->permission('add_project_members');
$createPublicProjectPermission = user()->permission('create_public_project');

@endphp
<style media="screen">
.table th, .table td {
  padding: 0.75rem;
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}
</style>

@if($project->deal->project_type == 'hourly')
<style media="screen">
    .selectpicker + .dropdown-toggle {
        pointer-events: none;
        touch-action: none;
    }

    .selectpicker + .dropdown-toggle > span {
        background-color: #f8f9fa;
        cursor: not-allowed;
    }
</style>
@endif

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">

    <div class="col-sm-12">
        <x-form id="save-project-data-form" method="PUT">
            @if($project->status == 'not started')
            <input type="hidden" name="status_validation" value="not started">
            @else
                <input type="hidden" name="status_validation" value="in progress">


                @endif
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.projects.projectInfo')</h4>
                <div class="row p-20">
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.taskShortCode')"
                            fieldName="project_code" fieldRequired="true" fieldId="project_code"
                            :fieldPlaceholder="__('placeholders.writeshortcode')" :fieldValue="$project->project_short_code" fieldReadOnly="true"/>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.projectName')"
                            fieldName="project_name" fieldRequired="true" fieldId="project_name"
                            :fieldValue="$project->project_name" :fieldPlaceholder="__('placeholders.project')" />
                    </div>

                    <input type="hidden" id="project_id" name="project_id" value="{{ $project->id }}">
                    <div class="col-md-6 col-lg-6">
                        <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                            :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                            :fieldValue="$project->start_date->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-6 col-lg-6" id="deadlineBox">
                        <x-forms.datepicker fieldId="deadline" fieldRequired="true"
                            :fieldLabel="__('modules.projects.deadline')" fieldName="deadline"
                            :fieldValue="($project->deadline ? $project->deadline->format(global_setting()->date_format) : '')"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                  {{--  <div class="col-md-6 col-lg-3">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox fieldId="without_deadline"
                                    :checked="($project->deadline == null) ? true : false"
                                    :fieldLabel="__('modules.projects.withoutDeadline')" fieldName="without_deadline" />
                            </div>
                        </div>
                    </div> --}}
                    <div class="col-md-4">
                        <x-forms.label class="my-3" fieldId="category_id"
                            :fieldLabel="__('modules.projects.projectCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="project_category_id" data-live-search="true">
                                <option value="">--</option>
                                @foreach ($categories as $category)
                                    @if($project->deal->project_type == 'hourly')
                                        <option @if (3 == $category->id) selected @endif value="{{ $category->id }}">
                                            {{ mb_ucwords($category->category_name) }}
                                        </option>
                                    @elseif($project->deal->project_type == 'fixed')
                                        <option @if (2 == $category->id) selected @endif value="{{ $category->id }}">
                                            {{ mb_ucwords($category->category_name) }}
                                        </option>
                                    @else
                                        <option @if ($project->category_id == $category->id) selected @endif value="{{ $category->id }}">
                                            {{ mb_ucwords($category->category_name) }}
                                        </option>
                                    @endif
                                @endforeach
                            </select>
                            @if(Auth::user()->role_id == 1)
                            @if ($addProjectCategoryPermission == 'all' || $addProjectCategoryPermission == 'added')
                                <x-slot name="append">
                                    <button id="addProjectCategory" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-4">
                        <x-forms.label class="my-3" fieldId="department" :fieldLabel="__('app.department')">
                        </x-forms.label>
                        <x-forms.input-group>
                            @if ($project->dept_status =='DM')
                                @foreach ($teams as $team)
                                    @if($team->team_name == 'Digital Marketing')
                                    <input type="text" name="" class="form-control height-35 f-14" id="" value="{{ $team->team_name }}" readonly>
                                    @endif
                                @endforeach
                            @else
                            <select class="form-control select-picker height-35 f-14" name="team_id" id="employee_department"
                                data-live-search="true">
                                <option value="">--</option>
                                    @foreach ($teams as $team)
                                        <option @if ($project->team_id === $team->id) selected @endif value="{{ $team->id }}">
                                            {{ mb_ucwords($team->team_name) }}
                                        </option>
                                    @endforeach
                            </select>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-4">
                        <x-forms.label class="my-3" fieldId="client_id" :fieldLabel="__('app.client')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select readonly class="form-control select-picker" name="client_id"
                                data-live-search="false" data-size="8">
                                <?php

                                $client_id= App\Models\User::where('id',$project->client_id)->first();
                                 ?>
                                <option selected value="{{$client_id->id}}">
                                  <div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client_id->image_url }}' ></div>

                                  {{$client_id->name}}</option>



                            </select>

                            @if ($addClientPermission == 'all' || $addClientPermission == 'added')
                                <x-slot name="append">
                                    <button id="add-client" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                        <!-- BUDGET VS SPENT START -->
                        <div class="col-md-12 mt-5">



                                        <h4>Project Milestones</h4>
                                        <br>
                                        <?php

                                        $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();
                                         ?>
                                         <table class="table table-responsive table-bordered table-striped">
                   <thead class="thead-dark">
                     <tr>
                       <th scope="col">#</th>
                       <th scope="col" class="col-3 col-sm-2">Milestone Name</th>
                       <th scope="col" class="col-3 col-sm-2">Milestone Type</th>
                       <th scope="col" class="col-3 col-sm-2">Milestone Cost</th>
                        <th scope="col" class="col-6 col-md-8">Milestone Summary</th>
                     </tr>
                   </thead>
                   <tbody>
                     @foreach($milestones as $milestone)
                     <tr>
                       <th class="pl-20">{{$loop->index+1}}</th>
                       <td>{{$milestone->milestone_title}}</td>
                       <td>{{$milestone->milestone_type}}</td>
                       <td>{{$milestone->actual_cost}}{{$milestone->original_currency->currency_symbol}}</td>
                       <td>@if($milestone->summary != null)
                         {!!$milestone->summary!!}
                       @else
                       --
                       @endif
                      </td>
                     </tr>
                     @endforeach

                   </tbody>
                 </table>






                        </div>
                        <!-- BUDGET VS SPENT END -->
                        @php
                            $task = App\Models\Task::where('project_id',$project->id)->first();
                        @endphp
                        @if ($task == null || Auth::user()->role_id !=4)
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group mt-3">
                                <label class="text-dark-grey" data-label="true" for="description">Project General Guidelines
                                    <sup class="mr-1">*</sup>
                                </label>
                                <textarea name="project_summary" id="description" class="form-control @error('project_summary') is-invalid @enderror">{!! $project->project_summary !!}</textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                                <script>
                                    CKEDITOR.replace('project_summary');
                                </script>
                                @error('project_summary')
                                <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        @endif


                    @if ($project->public == 0 && $editProjectMembersPermission == 'all' || $editPermission == 'all')
                        <div class="col-md-12" id="edit_members">
                           <div class="form-group my-3">
                                <x-forms.label fieldId="selectAssignee" :fieldLabel="__('Recommended Developers')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control multiple-users" multiple name="member_id[]"
                                        id="selectEmployee" data-live-search="true" data-size="8">
                                        <?php
                                        $users= App\Models\User::where('role_id',5)->get();
                                        $user= App\Models\User::where('role_id',6)->orderBy('id', 'DESC')->first();
                                         ?>
                                        @foreach ($users as $item)
                                            @php
                                                $selected = '';
                                            @endphp

                                            @foreach ($project->members as $member)
                                                @if ($member->user->id == $item->id)
                                                    @php
                                                        $selected = 'selected';
                                                    @endphp
                                                @endif
                                            @endforeach
                                            <?php
                                            $task_id= App\Models\TaskUser::where('user_id',$item->id)->first();
                                            if($task_id != null)
                                            {
                                                $task= App\Models\Task::where('id',$task_id->task_id)->first();
                                                if ($task != null && $task->status != 'completed') {
                                                  $d_data= "Busy Until ".$task->due_date->format('Y-m-d') . ' ('.$task->due_date->format('h:i:s A'). ')';
                                                }else {
                                                      $d_data=  "Open to Work";
                                                }
                                                  //$d_data= "Busy Until ".$task->due_date;
                                            }else {
                                              $d_data=  "Open to Work";
                                            }
                                          // dd($task_id->task_id);

                                             ?>
                                            <option {{ $selected }}
                                            data-content="<span class='badge badge-pill badge-light border'>
                                            <div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle'
                                            src='{{ $item->image_url }}'></div>
                                            {{ ucfirst($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}
                                            </span>"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
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
                        <div class="col-md-6">
                          <div class="form-group my-3">
                          <x-forms.text :fieldLabel="__('Lead Developer')" fieldName="" fieldId=""
                              :fieldValue="$user->name" fieldReadOnly="true" />
                            </div>
                        </div>
                    @endif

                    @if ($project->public == 1 && $editProjectMembersPermission || $editPermission == 'all')
                        <div class="col-md-12 d-none" id="add_members">
                            <div class="form-group my-3">
                                <x-forms.label class="my-3" fieldId="selectEmployee" fieldRequired="true"
                                    :fieldLabel="__('modules.projects.addMemberTitle')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control multiple-users" multiple name="user_id[]"
                                        id="selectEmployee" data-live-search="true" data-size="8">
                                        @if ($employees != '')
                                            @foreach ($employees as $item)
                                                <option @if (request()->has('default_assign') && request('default_assign') == $item->id) selected @endif @if (isset($projectTemplateMembers) && in_array($item->id, $projectTemplateMembers))
                                                    selected
                                            @endif
                                            data-content="<span class='badge badge-pill badge-light border'>
                                                <div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle'
                                                        src='{{ $item->image_url }}'></div>
                                                {{ ucfirst($item->name) }}{{ user() && user()->id == $item->id ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}
                                            </span>"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                            @endforeach
                                        @endif
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
                    @elseif(in_array('employee', user_roles()))
                        <input type="hidden" name="user_id[]" value="{{ user()->id }}">
                    @endif

                    <div class="col-md-6 col-lg-6">
                      <?php
                        $status= App\Models\ProjectStatusSetting::where('status_name','in progress')->first();
                        $status_name= ucfirst($status->status_name);

                       ?>
                      <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.project') . ' ' . __('app.status')"
                          fieldName="status" fieldRequired="true" fieldId="project_status"
                          :fieldPlaceholder="__('Status')" :fieldValue="$status_name" fieldReadOnly="true"/>

                    </div>

                </div>

                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-top-grey">
                    @lang('modules.client.clientOtherDetails')</h4>

                <div class="row p-20">
                  <div class="col-lg-4 col-md-6 mt-3">
                      <x-forms.label fieldId="" :fieldLabel="__('Currency Id')">
                      </x-forms.label>
                      <div class="input-group">

                          <input type="text"  value="{{ $project->deal->original_currency->currency_symbol }} ({{ $project->deal->original_currency->currency_code }})"
                              class="form-control height-35 f-15 readonly-background" readonly>
                      </div>
                  </div>
                    <div class="col-lg-4 col-md-6 mt-3">
                        <x-forms.label fieldId="project_budget" :fieldLabel="__('modules.projects.projectBudget')">
                        </x-forms.label>
                        <div class="input-group">

                            <input type="number" name="project_budget" value="{{ $project->deal->actual_amount }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 d-none" id="clientNotification">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox fieldId="client_task_notification" :checked="($project->allow_client_notification
                                == 'enable') ? 'true' : 'false'"
                                    :fieldLabel="__('modules.projects.clientTaskNotification')"
                                    fieldName="client_task_notification" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3">

                    </div>


                </div>
                <?php
                  $deliverables= App\Models\ProjectDeliverable::where('project_id',$project->id)->first();
                 ?>
                @if($project->status=='not started' && $project->pm_id==Auth::user()->id )
                <div class="col-md-6 col-lg-6 mb-3">


                      <label class="f-14 text-dark-grey mb-12 mt-3" data-label="" for="added_by">Project Challenge
                        <sup class="f-14 mr-0 mt-3">*</sup>
                      </label>
                      <div class="form-group mb-0">
                        <div class="dropdown bootstrap-select form-control select-picker show">
                          <select class="form-control select-picker" name="project_challenge" data-size="8" tabindex="null">
                            @if($project->project_challenge != null)
                            <option selected value="{{$project->project_challenge}}">{{$project->project_challenge}}</option>
                            @else
                            <option selected value="No Challenge">No Challenge</option>
                            <option  value="Has Challenge But We Can Do It">Has Challenge But We Can Do It</option>
                            <option  value="Has Challenge But We Cannot Do It">Has Challenge But We Cannot Do It</option>
                            <option  value="Has Challenge, But We May/May Not be Able to Do It">Has Challenge, But We May/May Not be Able to Do It</option>
                            @endif

                          </select>

                        </div>

                      </div>
                </div>
                <div class="col-md-12 col-lg-12 mb-5">
                    <div class="form-group">
                        <label class="" for="">Comments</label>
                        <div class="d-flex">
                          <textarea id="comments" name="comments" rows="6" cols="180"></textarea>

                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12">
                    <div class="form-group mt-3">
                        <label class="text-dark-grey" data-label="true" for="description">Were the requirements properly defined by Sales?<sup class="mr-1">*</sup></label>
                        <textarea name="requirement_defined" id="requirement_defined" cols="30" rows="10" class="form-control @error('requirement_defined') is-invalid @enderror">{!! $project->requirement_defined !!}</textarea>
                        @error('requirement_defined')
                        <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                <div class="col-md-12 col-lg-12">
                        <div class="form-group mt-3">
                            <label class="text-dark-grey" data-label="true" for="description">Is the deadline provided by Sales realistic?<sup class="mr-1">*</sup></label>
                            <textarea name="deadline_meet" id="deadline_meet" cols="30" rows="10" class="form-control @error('deadline_meet') is-invalid @enderror">{!! $project->deadline_meet !!}</textarea>
                            @error('deadline_meet')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                @endif
                  <br>




              {{-- @endif --}}


                  </div>

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
                                            :fieldValue="$project->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.text>
                                    @elseif($field->type == 'password')
                                        <x-forms.password
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$project->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.password>
                                    @elseif($field->type == 'number')
                                        <x-forms.number
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$project->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.number>
                                    @elseif($field->type == 'textarea')
                                        <x-forms.textarea :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldPlaceholder="$field->label"
                                            :fieldValue="$project->custom_fields_data['field_'.$field->id] ?? ''">
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
                                                        :checked="(isset($project) && $project->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
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
                                            {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($project) ? $project->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                        </div>
                                    @elseif($field->type == 'date')
                                        <x-forms.datepicker custom="true"
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldValue="($project->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($project->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                            :fieldPlaceholder="$field->label" />
                                    @elseif($field->type == 'checkbox')
                                        <div class="form-group my-3">
                                            <x-forms.label
                                                fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                :fieldLabel="$field->label"
                                                :fieldRequired="($field->required === 'yes') ? true : false">
                                            </x-forms.label>
                                            <div class="d-flex checkbox-{{$field->id}}">
                                                <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$project->custom_fields_data['field_'.$field->id]}}">

                                                @foreach ($field->values as $key => $value)
                                                    <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                        :fieldLabel="$value"
                                                        fieldName="$field->name.'_'.$field->id.'[]'"
                                                        :fieldValue="$value"
                                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                                        onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                        :checked="$project->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $project->custom_fields_data['field_'.$field->id]))"
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
                    @if($project->project_status == 'Accepted')
                    <x-forms.button-primary id="save-project-form" class="mr-3" icon="check">@lang('Update')
                    </x-forms.button-primary>
                    @else
                    <x-forms.button-primary id="save-project-form" class="mr-3" icon="check">@lang('Accept This Project')
                    </x-forms.button-primary>
                    @endif
                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        $("#selectEmployee").selectpicker({
            actionsBox: true,
            selectAllText: "{{ __('modules.permission.selectAll') }}",
            deselectAllText: "{{ __('modules.permission.deselectAll') }}",
            multipleSeparator: " ",
            selectedTextFormat: "count > 8",
            countSelectedText: function(selected, total) {
                return selected + " {{ __('app.membersSelected') }} ";
            }
        });

        // quillImageLoad('#project_summary');


        const dp1 = datepicker('#start_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $project->start_date) }}"),
            onSelect: (instance, date) => {
                dp2.setMin(date);
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#deadline', {
            position: 'bl',
            dateSelected: new Date("{{ $project->deadline ? str_replace('-', '/', $project->deadline) : str_replace('-', '/', now(global_setting()->timezone)) }}"),
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        @if ($project->deal->project_type == 'hourly')
            $('#project_category_id').prop('disabled', true);
            $('.select-picker').selectpicker('refresh');
        @endif

        @if ($project->deadline == null)
            $('#deadlineBox').hide();
        @endif

        $('#without_deadline').click(function() {
            var check = $('#without_deadline').is(":checked") ? true : false;
            if (check == true) {
                $('#deadlineBox').hide();
            } else {
                $('#deadlineBox').show();
            }
        });

        $('#save-project-form').click(function() {
            var note = CKEDITOR.instances.description.getData();
            document.getElementById('description').value = note;

            const url = "{{ route('projects.update', $project->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-project-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-project-form",
                data: $('#save-project-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.href = response.redirectUrl;
                    }
                }
            });
        });

        $('#addProjectCategory').click(function() {
            const url = "{{ route('projectCategory.create') }}";
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

        $('#is_private').change(function() {
            $('#add_members').toggleClass('d-none');
        });

        $('#is_public').change(function() {
            $('#edit_members').toggleClass('d-none');
        });

        $('#add-client').click(function() {
            $(MODAL_XL).modal('show');

            const url = "{{ route('clients.create') }}";

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

        $('#calculate-task-progress').change(function() {
            if ($(this).is(':checked')) {
                $('#completion_percent').attr('disabled', 'true');
            } else {
                $('#completion_percent').removeAttr('disabled');
            }
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
@if($deliverables == null)
<script >

$(document).ready(function() {

    if ($('.custom-date-picker').length > 0) {
        datepicker('.custom-date-picker', {
            position: 'bl',
            ...datepickerConfig
        });
    }
const dp3 = datepicker('#from', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp4.setMin(date);
    },
    ...datepickerConfig
});
const dp4 = datepicker('#to', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp3.setMax(date);
    },
    ...datepickerConfig
});
const dp5 = datepicker('#from_graphics', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp6.setMin(date);
    },
    ...datepickerConfig
});
const dp6 = datepicker('#to_graphics', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp5.setMax(date);
    },
    ...datepickerConfig
});
const dp7 = datepicker('#from_main_page_development', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp8.setMin(date);
    },
    ...datepickerConfig
});
const dp8 = datepicker('#to_main_page_development', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp7.setMax(date);
    },
    ...datepickerConfig
});
const dp9 = datepicker('#from_secondary_page_development', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp10.setMin(date);
    },
    ...datepickerConfig
});
const dp10 = datepicker('#to_secondary_page_development', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp9.setMax(date);
    },
    ...datepickerConfig
});
const dp11 = datepicker('#from_content_creation', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp12.setMin(date);
    },
    ...datepickerConfig
});
const dp12 = datepicker('#to_content_creation', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp11.setMax(date);
    },
    ...datepickerConfig
});
const dp13 = datepicker('#from_marketing', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp14.setMin(date);
    },
    ...datepickerConfig
});
const dp14 = datepicker('#to_marketing', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp13.setMax(date);
    },
    ...datepickerConfig
});
const dp15 = datepicker('#from_domain_hosting', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp16.setMin(date);
    },
    ...datepickerConfig
});
const dp16 = datepicker('#to_domain_hosting', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp15.setMax(date);
    },
    ...datepickerConfig
});
const dp17 = datepicker('#from_products', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp18.setMin(date);
    },
    ...datepickerConfig
});
const dp18 = datepicker('#to_products', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp17.setMax(date);
    },
    ...datepickerConfig
});
const dp19 = datepicker('#from_collection', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp20.setMin(date);
    },
    ...datepickerConfig
});
const dp20 = datepicker('#to_collection', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp19.setMax(date);
    },
    ...datepickerConfig
});
const dp21 = datepicker('#from_others', {
    position: 'bl',

    onSelect: (instance, date) => {
      dp22.setMin(date);
    },
    ...datepickerConfig
});
const dp22 = datepicker('#to_others', {
    position: 'bl',

    onSelect: (instance, date) => {
       dp21.setMax(date);
    },
    ...datepickerConfig
});
$('#UX_Box').hide();
$('#ux_design').click(function() {
    var check = $('#ux_design').is(":checked") ? true : false;
    if (check == true) {
        $('#UX_Box').show();
    } else {
        $('#UX_Box').hide();
    }
});
$('#graphics_design_box').hide();
$('#graphics_design').click(function() {
    var check = $('#graphics_design').is(":checked") ? true : false;
    if (check == true) {
        $('#graphics_design_box').show();
    } else {
        $('#graphics_design_box').hide();
    }
});
$('#main_page_development_box').hide();
$('#main_page_development').click(function() {
    var check = $('#main_page_development').is(":checked") ? true : false;
    if (check == true) {
        $('#main_page_development_box').show();
    } else {
        $('#main_page_development_box').hide();
    }
});

$('#secondary_page_development_box').hide();
$('#secondary_page_development').click(function() {
    var check = $('#secondary_page_development').is(":checked") ? true : false;
    if (check == true) {
        $('#secondary_page_development_box').show();
    } else {
        $('#secondary_page_development_box').hide();
    }
});
$('#content_creation_box').hide();
$('#content_creation').click(function() {
    var check = $('#content_creation').is(":checked") ? true : false;
    if (check == true) {
        $('#content_creation_box').show();
    } else {
        $('#content_creation_box').hide();
    }
});
$('#marketing_box').hide();
$('#marketing').click(function() {
    var check = $('#marketing').is(":checked") ? true : false;
    if (check == true) {
        $('#marketing_box').show();
    } else {
        $('#marketing_box').hide();
    }
});
$('#domain_hosting_box').hide();
$('#domain_hosting').click(function() {
    var check = $('#domain_hosting').is(":checked") ? true : false;
    if (check == true) {
        $('#domain_hosting_box').show();
    } else {
        $('#domain_hosting_box').hide();
    }
});
$('#products_box').hide();
$('#products').click(function() {
    var check = $('#products').is(":checked") ? true : false;
    if (check == true) {
        $('#products_box').show();
    } else {
        $('#products_box').hide();
    }
});
$('#collection_box').hide();
$('#collection').click(function() {
    var check = $('#collection').is(":checked") ? true : false;
    if (check == true) {
        $('#collection_box').show();
    } else {
        $('#collection_box').hide();
    }
});
$('#others_box').hide();
$('#others').click(function() {
    var check = $('#others').is(":checked") ? true : false;
    if (check == true) {
        $('#others_box').show();
    } else {
        $('#others_box').hide();
    }
});


  });

</script>
@endif
