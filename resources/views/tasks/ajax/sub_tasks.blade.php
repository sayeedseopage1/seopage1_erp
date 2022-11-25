

 @php
$addSubTaskPermission = user()->permission('add_sub_tasks');
$editSubTaskPermission = user()->permission('edit_sub_tasks');
$deleteSubTaskPermission = user()->permission('delete_sub_tasks');
$viewSubTaskPermission = user()->permission('view_sub_tasks');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">

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
                <input type="hidden" name="milestone_id" value="{{$task->milestone_id}}">
                <input type="hidden" name="task_id" value="{{ $task->id }}">
                <div class="row">
                    <div class="col-md-6">
                        <x-forms.text :fieldLabel="__('app.title')" fieldName="title" fieldRequired="true"
                            fieldId="title" :fieldPlaceholder="__('placeholders.task')" />
                            <x-forms.text :fieldLabel="__('Parent Task')" fieldName="" fieldId=""
                                :fieldValue="$task->heading" fieldReadOnly="true" />
                    </div>
                    <?php
                    $milestone= App\Models\ProjectMilestone::where('id',$task->milestone_id)->first();

                     ?>

                    <div class="col-md-6 col-lg-4">

                    
                          <x-forms.text :fieldLabel="__('Milestone')" fieldName="" fieldId=""
                              :fieldValue="$milestone->milestone_title" fieldReadOnly="true" />
                    </div>



                    <div class="col-md-6">
                        <x-forms.datepicker fieldId="sub_task_start_date" :fieldLabel="__('app.startDate')" fieldName="start_date"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>
                      <div class="col-md-6 dueDateBox" @if($task && is_null($task->due_date)) style="display: none" @endif>

                        <x-forms.datepicker fieldId="sub_task_due_date" :fieldLabel="__('app.dueDate')" fieldName="due_date"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>
                    <div class="col-md-2 col-lg-2 pt-5">
                        <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2" :checked="$task ? is_null($task->due_date) : ''" :fieldLabel="__('app.withoutDueDate')"
                                          fieldName="without_duedate" fieldId="without_duedate" fieldValue="yes" />
                    </div>

                      </div>
                      <div class="row">
                        <?php
                        $project_name= App\Models\Project::where('id',$task->project_id)->first();
                        $projects= App\Models\Project::where('status','!=','finished')->get();
                         ?>

                        <div class="col-md-6">
                            @if ($task->project_id != null)
                                <input type="hidden" name="project_id"  value="{{ $task->project_id }}">

                                <x-forms.text :fieldLabel="__('app.project')" fieldName="project_id" fieldId=""
                                    :fieldValue="$project_name->project_name" fieldReadOnly="true" />
                            @else
                                <x-forms.select fieldId="" fieldName="project_id" :fieldLabel="__('app.project')"
                                    search="true">
                                    <option value="">--</option>
                                    @foreach($projects as $project)
                                    <option value="{{$project->id}}">{{$project->project_name}}</option>
                                    @endforeach

                                </x-forms.select>
                            @endif
                        </div>
                        <?php
                        $task_categories= App\Models\TaskCategory::all();

                         ?>

                        <div class="col-md-6">
                            <x-forms.label class="my-3" fieldId="category_id"
                                :fieldLabel="__('modules.tasks.taskCategory')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control select-picker" name="task_category_id"
                                    data-live-search="true" data-size="8">
                                    <option value="">--</option>
                                    @foreach($task_categories as $category)

                                            <option value="{{$category->id}}">{{$category->category_name}}
                                            </option>

                                        @endforeach


                                </select>


                            </x-forms.input-group>
                        </div>

                      </div>

                      <div class="row">



                        <div class="col-md-6">
                            <div class="form-group my-3">
                                <x-forms.label fieldId="subTaskAssignee"
                                    :fieldLabel="__('modules.tasks.assignTo')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="user_id"
                                        id="subTaskAssignee" data-live-search="true">
                                        <?php
                                        $users= App\Models\User::where('role_id',5)->get();



                                         ?>

                                        @foreach ($users as $item)
                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$item->id)->first();

                                        if($task_id != null )
                                        {
                                            $task_s= App\Models\Task::where('id',$task_id->task_id)->first();
                                            if ($task_s != null && $task_s->status != 'completed') {
                                              $d_data= "Busy Until ".$task_s->due_date;
                                            }else {
                                                  $d_data=  "Open to Work";
                                            }

                                        }else {
                                          $d_data=  "Open to Work";
                                        }
                                      // dd($task_id->task_id);

                                         ?>
                                            <option
                                                data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}"
                                                value="{{ $item->id }}">{{ mb_ucwords($item->name) }} </option>
                                        @endforeach
                                    </select>
                                </x-forms.input-group>
                            </div>
                        </div>



                        <div class="col-md-6">
                            <div class="form-group my-3">
                                <x-forms.label fieldId="subTaskAssignee2"
                                    :fieldLabel="__('Task Observer')">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <select class="form-control select-picker" name="observer_id"
                                        id="subTaskAssignee2" data-live-search="true">
                                        <?php
                                        $users= App\Models\User::where('role_id',5)->get();



                                         ?>

                                        @foreach ($users as $item)
                                        <?php
                                        $task_id= App\Models\TaskUser::where('user_id',$item->id)->first();

                                        if($task_id != null )
                                        {
                                            $task_s= App\Models\Task::where('id',$task_id->task_id)->first();
                                            if ($task_s != null && $task_s->status != 'completed') {
                                              $d_data= "Busy Until ".$task_s->due_date;
                                            }else {
                                                  $d_data=  "Open to Work";
                                            }

                                        }else {
                                          $d_data=  "Open to Work";
                                        }
                                      // dd($task_id->task_id);

                                         ?>
                                            <option
                                                data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }} {{ '<span style="font-size:11px;" class="badge badge-info">'.' '. '('.$d_data .')'. '</span>'   }}"
                                                value="{{ $item->id }}">{{ mb_ucwords($item->name) }} </option>
                                        @endforeach
                                    </select>
                                </x-forms.input-group>
                            </div>
                        </div>


                      </div>



                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="exampleFormControlTextarea1">Description <span style="color:red;">*</span></label>
                          <textarea name="description" class="form-control" id="description" rows="3" required></textarea>
                        </div>
                      </div>
                    <div class="row">
                      <?php
                        $taskLabels= App\Models\TaskLabelList::all();
                       ?>
                      <div class="col-md-12 col-lg-4">
                          <div class="form-group my-3">
                              <x-forms.label fieldId="task_labels" :fieldLabel="__('app.label')">
                              </x-forms.label>
                              <x-forms.input-group>
                                  <select class="select-picker form-control" multiple name="task_labels[]"
                                      id="task_labels" data-live-search="true" data-size="8">
                                      @foreach ($taskLabels as $label)
                                          <option
                                              data-content="<span class='badge badge-secondary' style='background-color: {{ $label->color }}'>{{ $label->label_name }}</span>"
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


                          <div class="col-lg-3 col-md-6">
                              <x-forms.select fieldId="board_column_id" :fieldLabel="__('app.status')"
                                  fieldName="board_column_id" fieldReadOnly="true" >

                                      <option selected value="{{$board_column->id}}">{{$board_column->column_name}}
                                      </option>

                              </x-forms.select>
                          </div>




                      <div class="col-lg-3 col-md-6">
                          <x-forms.select fieldId="priority" :fieldLabel="__('modules.tasks.priority')"
                              fieldName="priority">
                              <option @if (!is_null($task) && $task->priority == 'high') selected @endif value="high">@lang('modules.tasks.high')</option>
                              <option @if (!is_null($task) && $task->priority == 'medium') selected @endif value="medium" @if (is_null($task)) selected @endif>@lang('modules.tasks.medium')</option>
                              <option @if (!is_null($task) && $task->priority == 'low') selected @endif value="low">@lang('modules.tasks.low')</option>
                          </x-forms.select>
                      </div>



                    </div>
                    <div class="row">

                                          <div class="col-md-6 col-lg-3">
                                              <div class="form-group">
                                                  <div class="d-flex mt-5">
                                                      <x-forms.checkbox :fieldLabel="__('modules.tasks.makePrivate')" fieldName="is_private"
                                                          fieldId="is_private" :popover="__('modules.tasks.privateInfo')"
                                                          :checked="$task ? $task->is_private : ''"/>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="col-md-6 col-lg-3">
                                              <div class="form-group">
                                                  <div class="d-flex mt-5">
                                                      <x-forms.checkbox :fieldLabel="__('modules.tasks.billable')" :checked="true"
                                                          fieldName="billable" fieldId="billable"
                                                          :popover="__('modules.tasks.billableInfo')"
                                                          :checked="''"/>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="col-md-6 col-lg-3">
                                              <div class="form-group">
                                                  <div class="d-flex mt-5">
                                                      <x-forms.checkbox :fieldLabel="__('modules.tasks.setTimeEstimate')"
                                                          fieldName="set_time_estimate" fieldId="set_time_estimate"
                                                          :checked="($task ? $task->estimate_hours > 0 || $task->estimate_minutes > 0 : '')" />
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="col-md-6 col-lg-3 d-none" id="set-time-estimate-fields">
                                              <div class="form-group mt-5">
                                                  <input type="number" min="0" class="w-25 border rounded p-2 height-35 f-14"
                                                      name="estimate_hours" value="{{ $task ? $task->estimate_hours : '0'}}">
                                                  @lang('app.hrs')
                                                  &nbsp;&nbsp;
                                                  <input type="number" min="0" name="estimate_minutes"
                                                  value="{{ $task ? $task->estimate_minutes : '0'}}" class="w-25 height-35 f-14 border rounded p-2">
                                                  @lang('app.mins')
                                              </div>
                                          </div>

                    </div>
                    <div class="row">
                      <div class="col-md-6">
                          <div class="form-group my-3">
                              <div class="d-flex">
                                  <x-forms.checkbox :fieldLabel="__('modules.events.repeat')" fieldName="repeat"
                                      fieldId="repeat-task" :checked="$task ? $task->repeat : ''"/>
                              </div>
                          </div>

                          <div class="form-group my-3 {{!is_null($task) && $task->repeat ? '' : 'd-none'}}" id="repeat-fields">
                              <div class="row">
                                  <div class="col-md-6 mt-3">
                                      <x-forms.label fieldId="repeatEvery" fieldRequired="true"
                                          :fieldLabel="__('modules.events.repeatEvery')">
                                      </x-forms.label>
                                      <x-forms.input-group>
                                          <input type="number" min="1" name="repeat_count"
                                              class="form-control f-14" value="{{$task ? $task->repeat_count : '1'}}">

                                          <x-slot name="append">
                                              <select name="repeat_type" class="select-picker form-control">
                                                  <option value="day" @if (!is_null($task) && $task->repeat_type == 'day') selected @endif>@lang('app.day')</option>
                                                  <option value="week" @if (!is_null($task) && $task->repeat_type == 'week') selected @endif>@lang('app.week')</option>
                                                  <option value="month" @if (!is_null($task) && $task->repeat_type == 'month') selected @endif>@lang('app.month')</option>
                                                  <option value="year" @if (!is_null($task) && $task->repeat_type == 'year') selected @endif>@lang('app.year')</option>
                                              </select>
                                          </x-slot>
                                      </x-forms.input-group>
                                  </div>
                                  <div class="col-md-6">
                                      <x-forms.number :fieldLabel="__('modules.events.cycles')" fieldName="repeat_cycles"
                                          fieldRequired="true" :fieldValue="$task ? $task->repeat_cycles : '1'" minValue="1" fieldId="repeat_cycles"
                                          :fieldPlaceholder="__('modules.tasks.cyclesToolTip')"
                                          :popover="__('modules.tasks.cyclesToolTip')" />
                                  </div>
                              </div>
                          </div>
                      </div>

                    </div>
                    <br>

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
                        <!-- <div class="d-flex">
                            <x-forms.checkbox :fieldId="'checkbox'.$subtask->id" class="task-check"
                                data-sub-task-id="{{ $subtask->id }}"
                                :checked="($subtask->status == 'complete') ? true : false" fieldLabel=""
                                :fieldName="'checkbox'.$subtask->id" />

                        </div> -->
                        <?php

                          $task_id= App\Models\Task::where('subtask_id',$subtask->id)->first();
                         ?>

                        <div class="card-body pt-0">
                            <div class="d-flex">
                                @if ($subtask->assigned_to)
                                    <x-employee-image :user="$subtask->assignedTo" />
                                @endif


                                <p class="card-title f-14 mr-3 text-dark flex-grow-1" id="subTask">
                                  @if($task_id != null)
                                  <a class="openRightModal" href="/account/tasks/{{$task_id->id}}" style="color:black;" >{{ucfirst($subtask->title)}}</a>
                                  @else

                                  @endif
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
                                            <a class="dropdown-item openRightModal" href="/account/tasks/{{$task_id->id}}"
                                                >@lang('app.view')</a>
                                        @endif
                                        @if ($editSubTaskPermission == 'all' || ($editSubTaskPermission == 'added' && $subtask->added_by == user()->id))
                                            <a class="dropdown-item openRightModal" href="/account/tasks/{{$task_id->id}}/edit"
                                              >@lang('app.edit')</a>
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
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

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
    $('#without_duedate').click(function () {
        $('.dueDateBox').toggle();
    });
    $('#createTaskLabel').click(function () {
        const url = "{{ route('task-label.create') }}?task_id={{$task ? $task->id : ''}}";
        $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_XL, url);
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
    $(document).ready(function() {
      $('#description').summernote();
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
                $('#selectAssignee2').html(data.data);
                $('.projectId').text(data.unique_id+'-');
                $('#selectAssignee2').selectpicker('refresh');
            }
        })
    });
    $('#assign-self').click(function () {
        $('#selectAssignee2').val('{{ $user->id }}');
        $('#selectAssignee2').selectpicker('refresh');
    });


</script>
