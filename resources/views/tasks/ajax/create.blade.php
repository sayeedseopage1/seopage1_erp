@php
$addTaskCategoryPermission = user()->permission('add_task_category');
$viewTaskCategoryPermission = user()->permission('view_task_category');
$addEmployeePermission = user()->permission('add_employees');
$addTaskFilePermission = user()->permission('add_task_files');
$addTaskPermission = user()->permission('add_tasks');
$viewMilestonePermission = user()->permission('view_project_milestones');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form method="post" action="#" id="save-task-data-form">
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
                   $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
                 @endphp
                  @if($diff_in_minutes < 2880 && $signature == null)
                  <h6 style="color:red;" class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">You have {{$minutes}} minutes left to take the sign of deliverable file. After that you can't assign any task.</h6>

                  @endif
                <div class="row p-20">

                    <div class="col-lg-4 col-md-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="heading">Title
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Title" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14" placeholder="Enter a task title" value="" name="heading" id="heading" autocomplete="off">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <label class="f-14 text-dark-grey mb-12 my-3" data-label="" for="category_id">Task category
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Task category" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="input-group">
                            <div class="dropdown bootstrap-select form-control select-picker dropup">
                                <select class="form-control select-picker" name="category_id" id="task_category_id" data-live-search="true" data-size="8" tabindex="null">
                                    <option value="">--</option>
                                    @if ($viewTaskCategoryPermission == 'all' || $viewTaskCategoryPermission == 'added')
                                        @foreach ($categories as $category)
                                            <option @if (!is_null($task) && $task->task_category_id == $category->id) selected @endif value="{{ $category->id }}">{{ mb_ucwords($category->category_name) }}
                                            </option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                            @if ($addTaskCategoryPermission == 'all' || $addTaskCategoryPermission == 'added')
                            <div class="input-group-append">
                                <button id="create_task_category" type="button" class="btn btn-outline-secondary border-grey">Add</button>
                            </div>
                            @endif
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <input type="hidden" name="project_id" id="project_id" value="{{ $project->id }}">
                        <input type="hidden" name="task_project_id" value="{{ $project->id }}">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="projectName">Project
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Project" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14" placeholder="" value="Build a wordpress website with paid subscription for certain pages" name="projectName" id="projectName" readonly="" autocomplete="off">
                        </div>
                    </div>
                    <div class="col-md-5 col-lg-3">
                        <div class="form-group my-3" style="position: relative;">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="task_start_date">Start Date
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Start Date" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control  date-picker height-35 f-14" placeholder="Select Date" value="{{(($task) ? $task->start_date->format(global_setting()->date_format) : \Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format))}}" name="start_date" id="task_start_date" autocomplete="off">
                        </div>
                    </div>
                    <div class="col-md-5 col-lg-3 dueDateBox" @if($task && is_null($task->due_date)) style="" @endif>
                        <div class="form-group my-3" style="position: relative;">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="due_date">Due Date
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="End Date" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control  date-picker height-35 f-14" placeholder="Select Date" value="{{(($task && $task->due_date) ? $task->due_date->format(global_setting()->date_format) : \Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format))}}" name="due_date" id="due_date" autocomplete="off">
                        </div>
                    </div>
                      @if($project != null)
                        <div class="col-md-12 col-lg-4">
                            <label class="f-14 text-dark-grey mb-12 mt-3" data-label="true" for="milestone-id">Milestones
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Milestones" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <div class="form-group mb-0" onchange="getDependentData()">
                                <div class="dropdown bootstrap-select form-control select-picker">
                                    <select name="milestone_id" id="milestone-id" class="form-control select-picker" data-size="8">
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
                                    </select>
                                </div>
                            </div>
                        </div>
                      <div class="col-lg-6 col-md-6" id="deilverable-column">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="heading">Project Deliverable
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Project Deliverable" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
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
                              <label class="f-14 text-dark-grey mb-12" data-label="true" for="selectAssignee">Assigned To
                                  <sup class="f-14 mr-1">*</sup>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Assigned To" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              </label>
                              <div class="input-group">
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
                                  <div class="input-group-append">
                                      <button id="assign-self" type="button" class="btn btn-outline-secondary border-grey" data-toggle="tooltip" data-original-title="Assign to me">
                                          <img src="{{ user()->image_url }}" class="img-fluid rounded-circle" width="23">
                                      </button>
                                  </div>
                                  @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                      <div class="input-group-append">
                                          <button id="add-employee" type="button" class="btn btn-outline-secondary border-grey">Add</button>
                                      </div>
                                  @endif
                              </div>
                          </div>
                    </div>
                    <div class="col-md-12 col-lg-6">
                      <?php
                      $users= App\Models\User::where('role_id',5)->get();
                       ?>
                          <div class="form-group my-3">
                              <label class="f-14 text-dark-grey mb-12" data-label="" for="selectAssignee2">Task Observer
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Task Observer" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              </label>
                              <div class="input-group">
                                  <div class="dropdown bootstrap-select show-tick form-control multiple-users">
                                      <select class="form-control multiple-users" multiple="" name="observer_id[]" id="selectAssignee2" data-live-search="true" data-size="8" tabindex="null">
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
                                  </div>
                                  <div class="input-group-append">
                                      <button id="assign-self" type="button" class="btn btn-outline-secondary border-grey" data-toggle="tooltip" data-original-title="Assign to me">
                                          <img src="{{ user()->image_url }}" class="img-fluid rounded-circle" width="23">
                                      </button>
                                  </div>
                                      @if ($addEmployeePermission == 'all' || $addEmployeePermission == 'added')
                                  <div class="input-group-append">
                                      <button id="add-employee" type="button" class="btn btn-outline-secondary border-grey">Add</button>
                                  </div>
                                      @endif
                              </div>
                          </div>
                    </div>

                    <div class="col-md-12 col-lg-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="selectAssignee2">Task Estimation Time
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Task Estimation Time" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <div class="form-group">
                                <input type="number" min="0" class="w-25 border rounded p-2 height-35 f-14" id="estimate_hours" name="estimate_hours" value="{{ $task ? $task->estimate_hours : '0'}}"> @lang('app.hrs') &nbsp;&nbsp;
                                <input type="number" min="0" name="estimate_minutes" id="estimate_minutes" value="{{ $task ? $task->estimate_minutes : '0'}}" class="w-25 height-35 f-14 border rounded p-2"> @lang('app.mins')
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="descriptionText">Description
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Description" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description" id="descriptionText" class="form-control">{!! $task ? $task->description : '' !!}</textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            <label id="descriptionError" class="text-danger" for=""></label>
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
                                    <label class="f-14 text-dark-grey mb-12" data-label="" for="task_labels">Label
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Label" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                    <div class="input-group">
                                        <div class="dropdown bootstrap-select show-tick select-picker form-control">
                                            <select class="select-picker form-control" multiple name="task_labels[]"
                                                    id="task_labels" data-live-search="true" data-size="8">
                                                @foreach ($taskLabels as $label)
                                                    <option
                                                        data-content="<span class='badge badge-secondary' style='background-color: {{ $label->label_color }}'>{{ $label->label_name }}</span>"
                                                        value="{{ $label->id }}" @if($task && isset($selectedLabel) && in_array($label->id, $selectedLabel)) selected @endif>{{ $label->label_name }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        @if (user()->permission('task_labels') == 'all')
                                        <div class="input-group-append">
                                            <button id="createTaskLabel" type="button" class="btn btn-outline-secondary border-grey">Add</button>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <?php

                              $board_column= App\Models\TaskboardColumn::where('id',2)->first();
                            //  dd($board_column);
                             ?>

                            @if (user()->permission('change_status') == 'all')
                                <div class="col-lg-3 col-md-6">
                                    <label class="f-14 text-dark-grey mb-12 mt-3" data-label="" for="board_column_id">Status
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Status" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                    <div class="form-group mb-0" fieldreadonly="true">
                                        <div class="dropdown bootstrap-select form-control select-picker">
                                            <select name="board_column_id" id="board_column_id" class="form-control select-picker" data-size="8">
                                                <option selected value="{{$board_column->id}}">{{$board_column->column_name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            @endif
                            <div class="col-lg-3 col-md-6">
                                <label class="f-14 text-dark-grey mb-12 mt-3" data-label="" for="priority">Priority
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Priority" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="form-group mb-0">
                                    <div class="dropdown bootstrap-select form-control select-picker">
                                        <select name="priority" id="priority" class="form-control select-picker" data-size="8" tabindex="null">
                                            <option @if (!is_null($task) && $task->priority == 'high') selected @endif value="high">@lang('modules.tasks.high')</option>
                                            <option @if (!is_null($task) && $task->priority == 'medium') selected @endif value="medium" @if (is_null($task)) selected @endif>@lang('modules.tasks.medium')</option>
                                            <option @if (!is_null($task) && $task->priority == 'low') selected @endif value="low">@lang('modules.tasks.low')</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    @if ($addTaskFilePermission == 'all' || $addTaskFilePermission == 'added')
                        <div class="col-lg-12">
                            <div class="form-group my-3 mr-0 mr-lg-2 mr-md-2">
                                <label class="f-14 text-dark-grey mb-12" data-label="" for="task-file-upload-dropzone">Add Files
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Add Files" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div id="file-upload-box">
                                    <div class="row" id="file-dropzone">
                                        <div class="col-md-12">
                                            <div class="dropzone rounded border dz-clickable" id="task-file-upload-dropzone">
                                                <input type="hidden" name="image_url" id="image_url">
                                                <div class="dz-default dz-message">
                                                    <button class="dz-button" type="button">Choose a file</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <input type="hidden" name="image_url" id="image_url" autocomplete="off">
                        </div>
                        <input type="hidden" name="taskID" id="taskID">
                        <input type="hidden" name="addedFiles" id="addedFiles">
                    @endif

{{--                    @if (isset($fields) && count($fields) > 0)--}}
{{--                        @foreach ($fields as $field)--}}
{{--                            <div class="col-md-4">--}}
{{--                                @if ($field->type == 'text')--}}
{{--                                    <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldLabel="$field->label"--}}
{{--                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldPlaceholder="$field->label"--}}
{{--                                        :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                    </x-forms.text>--}}
{{--                                @elseif($field->type == 'password')--}}
{{--                                    <x-forms.password--}}
{{--                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldLabel="$field->label"--}}
{{--                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldPlaceholder="$field->label"--}}
{{--                                        :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                    </x-forms.password>--}}
{{--                                @elseif($field->type == 'number')--}}
{{--                                    <x-forms.number--}}
{{--                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldLabel="$field->label"--}}
{{--                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldPlaceholder="$field->label"--}}
{{--                                        :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                    </x-forms.number>--}}
{{--                                @elseif($field->type == 'textarea')--}}
{{--                                    <x-forms.textarea :fieldLabel="$field->label"--}}
{{--                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldRequired="($field->required === 'yes') ? true : false"--}}
{{--                                        :fieldPlaceholder="$field->label">--}}
{{--                                    </x-forms.textarea>--}}
{{--                                @elseif($field->type == 'radio')--}}
{{--                                    <div class="form-group my-3">--}}
{{--                                        <x-forms.label--}}
{{--                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                            :fieldLabel="$field->label"--}}
{{--                                            :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                        </x-forms.label>--}}
{{--                                        <div class="d-flex">--}}
{{--                                            @foreach ($field->values as $key => $value)--}}
{{--                                                <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"--}}
{{--                                                    :fieldLabel="$value"--}}
{{--                                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                                    :fieldValue="$value" :checked="($key == 0) ? true : false" />--}}
{{--                                            @endforeach--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                @elseif($field->type == 'select')--}}
{{--                                    <div class="form-group my-3">--}}
{{--                                        <x-forms.label--}}
{{--                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                            :fieldLabel="$field->label"--}}
{{--                                            :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                        </x-forms.label>--}}
{{--                                        {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}--}}
{{--                                    </div>--}}
{{--                                @elseif($field->type == 'date')--}}
{{--                                    <x-forms.datepicker custom="true"--}}
{{--                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldRequired="($field->required === 'yes') ? true : false"--}}
{{--                                        :fieldLabel="$field->label"--}}
{{--                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                        :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"--}}
{{--                                        :fieldPlaceholder="$field->label" />--}}
{{--                                @elseif($field->type == 'checkbox')--}}
{{--                                    <div class="form-group my-3">--}}
{{--                                        <x-forms.label--}}
{{--                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"--}}
{{--                                            :fieldLabel="$field->label"--}}
{{--                                            :fieldRequired="($field->required === 'yes') ? true : false">--}}
{{--                                        </x-forms.label>--}}
{{--                                        <div class="d-flex checkbox-{{$field->id}}">--}}
{{--                                            <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">--}}

{{--                                            @foreach ($field->values as $key => $value)--}}
{{--                                                <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"--}}
{{--                                                    :fieldLabel="$value"--}}
{{--                                                    fieldName="$field->name.'_'.$field->id.'[]'"--}}
{{--                                                    :fieldValue="$value"--}}
{{--                                                    onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"--}}
{{--                                                    :fieldRequired="($field->required === 'yes') ? true : false" />--}}
{{--                                            @endforeach--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                @endif--}}

{{--                            </div>--}}
{{--                        @endforeach--}}
{{--                    @endif--}}
                    <div class="w-100 border-top-grey d-block d-lg-flex d-md-flex justify-content-start px-4 py-3">
                    <button type="button" class="btn-primary rounded f-14 p-2 mr-3" id="save-task-form"><i class="fa fa-check mr-1"></i>Save</button>
                    <button type="button" class="btn-secondary rounded f-14 p-2 mr-3" id="save-more-task-form"><i class="fa fa-check-double mr-1"></i>Save &amp; Add More</button>
                    <a href="{{route('tasks.index')}}" class="btn-cancel rounded f-14 p-2 border-0">Cancel</a>
                    </div>
            </div>
        </form>
    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<!--MY SCRIPT START-->
{{--<script>--}}
{{--    $('#save-task-form').on('click',function () {--}}
{{--        // alert('okk');--}}
{{--        e.preventDefault();--}}
{{--        var description = CKEDITOR.instances.descriptionText.getData();--}}
{{--        // console.log(description);--}}
{{--        var data= {--}}
{{--            '_token': "{{ csrf_token() }}",--}}
{{--            'heading': document.getElementById("heading").value,--}}
{{--            'category_id': document.getElementById("task_category_id").value,--}}
{{--            'projectName': document.getElementById("projectName").value,--}}
{{--            'start_date': document.getElementById("task_start_date").value,--}}
{{--            'due_date': document.getElementById("due_date").value,--}}
{{--            'milestone-id': document.getElementById("milestone-id").value,--}}
{{--            'deliverable_id': document.getElementById("deliverable").value,--}}
{{--            'user_id[]': document.getElementById("selectAssignee").value,--}}
{{--            'observer_id[]': document.getElementById("selectAssignee2").value,--}}
{{--            'estimate_hours': document.getElementById("estimate_hours").value,--}}
{{--            'estimate_minutes': document.getElementById("estimate_minutes").value,--}}
{{--            'description': description,--}}
{{--            'task_labels[]': document.getElementById("task_labels").value,--}}
{{--            'board_column_id': document.getElementById("board_column_id").value,--}}
{{--            'priority': document.getElementById("priority").value,--}}
{{--            'image_url': document.getElementById("image_url").value,--}}
{{--        }--}}
{{--        console.log(data);--}}
{{--        $.ajaxSetup({--}}
{{--            headers: {--}}
{{--                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')--}}
{{--            }--}}
{{--        });--}}
{{--        $.ajax({--}}
{{--            type: "POST",--}}
{{--            url: "{{route('store-lead')}}",--}}
{{--            data: data,--}}
{{--            dataType: "json",--}}
{{--            disableButton: true,--}}

{{--            buttonSelector: "#submit-button",--}}

{{--            success: function (response) {--}}
{{--                $('#store-lead').trigger("reset");--}}
{{--                $('.error').html("");--}}
{{--                if (response.status == 'success') {--}}
{{--                    window.location.href = response.redirectUrl;--}}
{{--                }--}}
{{--            },--}}
{{--            error: function(error) {--}}
{{--                if (error) {--}}
{{--                    $('#clientNameError').html(error.responseJSON.errors.client_name);--}}
{{--                    $('#countryError').html(error.responseJSON.errors.country);--}}
{{--                    $('#projectLinkError').html(error.responseJSON.errors.project_link);--}}
{{--                    $('#deadLineError').html(error.responseJSON.errors.deadline);--}}
{{--                    $('#currencyError').html(error.responseJSON.errors.original_currency_id);--}}
{{--                    $('#bidValueError').html(error.responseJSON.errors.bid_value);--}}
{{--                    $('#bidValue2Error').html(error.responseJSON.errors.bid_value2);--}}
{{--                    $('#valueError').html(error.responseJSON.errors.value);--}}
{{--                    $('#biddingMinutesError').html(error.responseJSON.errors.bidding_minutes);--}}
{{--                    $('#biddingSecondsError').html(error.responseJSON.errors.bidding_seconds);--}}
{{--                    $('#descriptionError').html(error.responseJSON.errors.description);--}}
{{--                    $('#coverLetterError').html(error.responseJSON.errors.cover_letter);--}}
{{--                    $('#insightScreenshotError').html(error.responseJSON.errors.insight_screenshot);--}}
{{--                    $('#projectpageScreenshotError').html(error.responseJSON.errors.projectpage_screenshot);--}}
{{--                }--}}
{{--            }--}}
{{--        });--}}
{{--    })--}}
{{--</script>--}}
<!--MY SCRIPT END-->
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

        quillImageLoad('#description');


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
            let note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('tasks.store') }}?taskId={{$task ? $task->id : ''}}";
            var data = $('#save-task-data-form').serialize() + '&add_more=true';

            saveTask(data, url, "#save-more-task-form");

        });

        $('#save-task-form').click(function () {
            let note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

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
</script>
