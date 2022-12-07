@php
$addProjectCategoryPermission = user()->permission('manage_project_category');
$addClientPermission = user()->permission('add_clients');
$editProjectMemberPermission = user()->permission('edit_project_members');
$addEmployeePermission = user()->permission('add_employees');
$addProjectMemberPermission = user()->permission('add_project_members');
$addProjectMemberPermission = user()->permission('add_project_members');
$createPublicProjectPermission = user()->permission('create_public_project');

@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-project-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.projects.projectInfo')</h4>
                <div class="row p-20">
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.taskShortCode')"
                            fieldName="project_code" fieldRequired="true" fieldId="project_code"
                            :fieldPlaceholder="__('placeholders.writeshortcode')" :fieldValue="$project->project_short_code" />
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.projectName')"
                            fieldName="project_name" fieldRequired="true" fieldId="project_name"
                            :fieldValue="$project->project_name" :fieldPlaceholder="__('placeholders.project')" />
                    </div>

                    <input type="hidden" id="project_id" name="project_id" value="{{ $project->id }}">
                    <div class="col-md-6 col-lg-4">
                        <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                            :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                            :fieldValue="$project->start_date->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-6 col-lg-4" id="deadlineBox">
                        <x-forms.datepicker fieldId="deadline" fieldRequired="true"
                            :fieldLabel="__('modules.projects.deadline')" fieldName="deadline"
                            :fieldValue="($project->deadline ? $project->deadline->format(global_setting()->date_format) : '')"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-6 col-lg-3">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox fieldId="without_deadline"
                                    :checked="($project->deadline == null) ? true : false"
                                    :fieldLabel="__('modules.projects.withoutDeadline')" fieldName="without_deadline" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <x-forms.label class="my-3" fieldId="category_id"
                            :fieldLabel="__('modules.projects.projectCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="project_category_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($categories as $category)
                                    <option @if ($project->category_id == $category->id) selected @endif value="{{ $category->id }}">
                                        {{ mb_ucwords($category->category_name) }}</option>
                                @endforeach
                            </select>

                            @if ($addProjectCategoryPermission == 'all' || $addProjectCategoryPermission == 'added')
                                <x-slot name="append">
                                    <button id="addProjectCategory" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-4">
                        <x-forms.label class="my-3" fieldId="department" :fieldLabel="__('app.department')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="team_id" id="employee_department"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($teams as $team)
                                    <option @if ($project->team_id === $team->id) selected @endif value="{{ $team->id }}">
                                        {{ mb_ucwords($team->team_name) }}
                                    </option>
                                @endforeach
                            </select>
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

                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="project_summary"
                                :fieldLabel="__('modules.projects.projectSummary')">
                            </x-forms.label>
                            <div id="project_summary">{!! $project->project_summary !!}</div>
                            <textarea name="project_summary" id="project_summary-text"
                                class="d-none">{!! $project->project_summary !!}</textarea>
                        </div>
                    </div>

                    @if ($project->public == 1 && $createPublicProjectPermission == 'all')
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="d-flex mt-2">
                                    <x-forms.checkbox fieldId="is_private"
                                        :fieldLabel="__('modules.projects.createPrivateProject')" fieldName="private" />
                                </div>
                            </div>
                        </div>
                    @endif

                    @if ($project->public == 0 && $createPublicProjectPermission == 'all')
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="d-flex mt-2">
                                    <x-forms.checkbox fieldId="is_public"
                                        :fieldLabel="__('modules.projects.changeToPublicProject')" fieldName="public" />
                                </div>
                            </div>
                        </div>
                    @endif


                    @if ($project->public == 0 && $editProjectMembersPermission == 'all' || $editPermission == 'all')
                        <div class="col-md-12" id="edit_members">
                           <div class="form-group my-3">
                                <x-forms.label fieldId="selectAssignee" :fieldLabel="__('modules.tasks.assignTo')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control multiple-users" multiple name="member_id[]"
                                        id="selectEmployee" data-live-search="true" data-size="8">
                                        <?php
                                        $users= App\Models\User::where('role_id',5)->get();
                                        $user= App\Models\User::where('role_id',6)->first();
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
                                                  $d_data= "Busy Until ".$task->due_date;
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
                        <div class="col-md-12">
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

                    <div class="col-md-12 col-lg-4">
                        <x-forms.select fieldId="project_status"
                            :fieldLabel="__('app.project') . ' ' . __('app.status')" fieldName="status" search="true">
                            @foreach ($projectStatus as $status)
                                <option
                                data-content="<i class='fa fa-circle mr-1 f-15' style='color:{{$status->color}}'></i>{{ ucfirst($status->status_name) }}"
                                @if ($project->status == $status->status_name)
                                selected @endif
                                value="{{$status->status_name}}">$status->status_name
                                </option>

                            @endforeach


                        </x-forms.select>
                    </div>

                    <div class="col-md-12 col-lg-4">
                        <x-forms.range class="mr-0 mr-lg-2 mr-md-2"
                            :disabled="($project->calculate_task_progress == 'true' ? 'true' : 'false')"
                            :fieldLabel="__('modules.projects.projectCompletionStatus')" fieldName="completion_percent"
                            fieldId="completion_percent" :fieldValue="$project->completion_percent" />
                    </div>

                    <div class="col-md-12 col-lg-4">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox fieldId="calculate-task-progress"
                                    :checked="($project->calculate_task_progress == 'true') ? true : false"
                                    :fieldLabel="__('modules.projects.calculateTasksProgress')"
                                    fieldName="calculate_task_progress" />
                            </div>
                        </div>
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

                  {{-- <div class="col-lg-4 col-md-6">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.projectBudget')"
                            fieldName="project_budget" fieldId="project_budget" :fieldValue="$project->project_budget"
                            :fieldPlaceholder="__('placeholders.price')" readonly/>
                    </div> --}}
                    <div class="col-lg-4 col-md-6 mt-3">
                        <x-forms.label fieldId="project_budget" :fieldLabel="__('modules.projects.projectBudget')">
                        </x-forms.label>
                        <div class="input-group">

                            <input type="number" name="project_budget" value="{{ $project->deal->actual_amount }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.hours_allocated')"
                            fieldName="hours_allocated" fieldId="hours_allocated"
                            :fieldValue="$project->hours_allocated" :fieldPlaceholder="__('placeholders.hourEstimate')" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <div class="form-group">
                            <div class="d-flex mt-5">
                                <x-forms.checkbox fieldId="manual_timelog"
                                    :fieldLabel="__('modules.projects.manualTimelog')" :checked="($project->manual_timelog
                                    == 'enable')" fieldName="manual_timelog" />
                            </div>
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

                    @if ($editPermission == 'all')
                        <div class="col-lg-3 col-md-6">
                            <x-forms.select fieldId="added_by" :fieldLabel="__('app.added').' '.__('app.by')"
                                fieldName="added_by">
                                <option value="">--</option>
                                @foreach ($employees as $item)
                                    <option
                                        @if ($project->added_by == $item->id)  selected @endif

                                        data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}"
                                        value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                @endforeach
                            </x-forms.select>
                        </div>
                    @endif
                    <div class="col-lg-3 col-md-3">

                    </div>


                </div>

                  <hr>
                  <div class="col-md-6 col-lg-3 mt-5">
                    <h5>Add Deliverables</h5>

                  </div>

                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex mt-5">
                            <x-forms.checkbox fieldId="graphics_design"

                                :fieldLabel="__('Graphics Design')" fieldName="graphics_design" :fieldValue="'Graphics Design'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="graphics_design_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_graphics" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_graphics" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>

                  <div class="col-md-6 col-lg-3">
                      <div class="form-group">
                          <div class="d-flex">
                              <x-forms.checkbox fieldId="ux_design"
                                :checked="($project->deadline == null) ? true : false"

                                  :fieldLabel="__('UX Design')" fieldName="ux_design" :fieldValue="'Ux Design'" />
                          </div>
                      </div>
                  </div>
                    <div class="row" id="UX_Box">

                  <div class="col-md-4 col-lg-4">
                      <div class="form-group">
                          <label class="ml-3" for="">Quantity</label>
                          <div class="d-flex ml-3">

                            <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-lg-3">
                      <div class="form-group">
                          <label class="ml-3" for="">From</label>
                          <div class="d-flex ml-3">

                            <input id="from" type="text" class="form-control height-35 f-14" name="from" value="">
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-lg-3">
                      <div class="form-group">
                          <label class="ml-3" for="">To</label>
                          <div class="d-flex ml-3">

                            <input id="to" type="text" class="form-control height-35 f-14" name="to" value="">
                          </div>
                      </div>
                  </div>
                  <div class="col-md-12 col-lg-12">
                      <div class="form-group">
                          <label class="ml-3" for="">Description</label>
                          <div class="d-flex ml-3">
                            <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                          </div>
                      </div>
                  </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="main_page_development"

                                :fieldLabel="__('Main Page Development')" fieldName="main_page_development" :fieldValue="'Main Page Development'"/>
                        </div>
                    </div>
                </div>
                <div class="row" id="main_page_development_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_main_page_development" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_main_page_development" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>

                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="secondary_page_development"

                                :fieldLabel="__('Secondary Page Development')" fieldName="secondary_page_development" :fieldValue="'Secondary Page Development'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="secondary_page_development_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="secondary_page_development_quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_secondary_page_development" type="text" class="form-control height-35 f-14" name="secondary_page_development_from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_secondary_page_development" type="text" class="form-control height-35 f-14" name="secondary_page_development_to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="secondary_page_development_deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="content_creation"

                                :fieldLabel="__('Content Creation')" fieldName="content_creation" :fieldValue="'Content Creation'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="content_creation_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_content_creation" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_content_creation" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="marketing"

                                :fieldLabel="__('Marketing')" fieldName="marketing" :fieldValue="'Marketing'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="marketing_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_marketing" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_marketing" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="domain_hosting"

                                :fieldLabel="__('Domain/Hosting')" fieldName="domain_hosting" :fieldValue="'Domain/Hosting'"/>
                        </div>
                    </div>
                </div>
                <div class="row" id="domain_hosting_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_domain_hosting" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_domain_hosting" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="products"

                                :fieldLabel="__('Products')" fieldName="products" :fieldValue="'Products'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="products_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_products" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_products" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="collection"

                                :fieldLabel="__('Collection')" fieldName="collection" :fieldValue="'Collection'" />
                        </div>
                    </div>
                </div>
                <div class="row" id="collection_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_collection" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_collection" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <div class="form-group">
                        <div class="d-flex">
                            <x-forms.checkbox fieldId="others"

                                :fieldLabel="__('Others')" fieldName="others" :fieldValue="'Others'"/>
                        </div>
                    </div>
                </div>
                <div class="row" id="others_box">

              <div class="col-md-4 col-lg-4">
                  <div class="form-group">
                      <label class="ml-3" for="">Quantity</label>
                      <div class="d-flex ml-3">

                        <input type="text" class="form-control height-35 f-14" name="quantity" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">From</label>
                      <div class="d-flex ml-3">

                        <input id="from_others" type="text" class="form-control height-35 f-14" name="from" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-4 col-lg-3">
                  <div class="form-group">
                      <label class="ml-3" for="">To</label>
                      <div class="d-flex ml-3">

                        <input id="to_others" type="text" class="form-control height-35 f-14" name="to" value="">
                      </div>
                  </div>
              </div>
              <div class="col-md-12 col-lg-12">
                  <div class="form-group">
                      <label class="ml-3" for="">Description</label>
                      <div class="d-flex ml-3">
                        <textarea name="deliverable_description" rows="6" cols="180"></textarea>

                      </div>
                  </div>
              </div>
            </div>
                <div class="col-md-6 col-lg-3 mb-3">
                    <br>
                </div>


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
                    <x-forms.button-primary id="save-project-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
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

        quillImageLoad('#project_summary');

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

        $('#save-project-form').click(function() {
            var note = document.getElementById('project_summary').children[0].innerHTML;
            document.getElementById('project_summary-text').value = note;

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
