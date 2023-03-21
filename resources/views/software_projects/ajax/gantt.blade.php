@php
$addTaskPermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('add_tasks');
$editTaskPermission = ($project->project_admin == user()->id) ? 'all' : user()->permission('edit_tasks');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/frappe/frappe-gantt.css') }}">

<!-- ROW START -->
<div class="row py-3 py-lg-5 py-lg-5">
    <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex" id="table-actions">
            @if (($addTaskPermission == 'all' || $addTaskPermission == 'added') && !$project->trashed())
                <x-forms.link-primary :link="route('tasks.create').'?project_id='.$project->id"
                    class="mr-3 openRightModal" icon="plus" data-redirect-url="{{ url()->full() }}">
                    @lang('app.add')
                    @lang('app.task')
                </x-forms.link-primary>
            @endif

        </div>
        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            <div class="d-flex">
                <!-- ASSIGN START -->
                <div class="select-box py-2 px-2 mr-3">
                    <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.tasks.assignTo')
                    </p>
                    <div class="select-status mr-3">
                        <select class="form-control select-picker" id="assignedTo" data-live-search="true"
                            data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($project->members as $employee)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->user->image_url }}' ></div> {{ ucfirst($employee->user->name) }}"
                                    value="{{ $employee->user->id }}">{{ mb_ucwords($employee->user->name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <!-- ASSIGN END -->

                <!-- ASSIGN START -->
                <div class="select-box py-2 px-lg-2 px-md-2 px-0">
                    <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.view')
                    </p>
                    <div class="select-status mr-3">
                        <select class="form-control select-picker" id="gantt-view" data-size="8">
                            <option value="Day">@lang('app.day')</option>
                            <option value="Week">@lang('app.week')</option>
                            <option value="Month">@lang('app.month')</option>
                        </select>
                    </div>
                </div>
                <!-- ASSIGN END -->

                 <!-- ASSIGN START -->
                 <div class="select-box py-2 px-2 mr-3">
                    <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.task')
                    </p>
                    <div class="select-status mr-3">
                        <select class="form-control select-picker" id="projectTask" data-live-search="true"
                            data-size="8" multiple name="projectTask[]">
                            @foreach ($project->tasks as $task)
                                <option value="{{ $task->id}}">{{ mb_ucwords($task->heading) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <!-- ASSIGN END -->

                 <!-- ASSIGN START -->
                 <div class="select-box py-2 px-2 mr-3">
                    <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.task') @lang('app.status')
                    </p>
                    <div class="select-status mr-3">
                        <select class="form-control select-picker" id="task_status" data-live-search="true"
                            data-size="8" multiple name="task_status[]">
                            @foreach ($taskBoardStatus as $status)
                                <option selected value="{{ $status->id }}">{{ $status->slug == 'completed' || $status->slug == 'incomplete' ? __('app.' . $status->slug) : mb_ucwords($status->column_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <!-- ASSIGN END -->

                 <!-- ASSIGN START -->
                 <div class="select-box py-2 px-2 mr-3">
                    <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.projects.milestones')
                    </p>
                    <div class="select-status mr-3">
                        <select class="form-control select-picker" id="milestones" data-live-search="true"
                            data-size="8" multiple name="milestones[]">
                            @foreach ($project->milestones as $milestone)
                                <option value="{{ $milestone->id }}">{{ $milestone->milestone_title }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <!-- ASSIGN END -->
            </div>


            <div id="gantt"></div>

        </div>
        <!-- Task Box End -->

    </div>

</div>
<!-- ROW END -->

<script>
    var allowDrag = "{{ ($editTaskPermission == 'all' ? 'true' : 'false') }}";
</script>

<script src="{{ asset('vendor/frappe/frappe-gantt.js') }}"></script>

<script>
    $(document).ready(function() {

        function loadData() {
            var projectID = "{{ $project->id }}";
            var assignedTo = $('#assignedTo').val();
            var projectTask = $('#projectTask').val();
            var taskStatus = $('#task_status').val();
            var milestones = $('#milestones').val();
            var viewMode = $('#gantt-view').val();
            var token = "{{ csrf_token() }}";

            var url = "{{ route('projects.gantt_data') }}?assignedTo=" +
                assignedTo + '&projectID=' + projectID  + '&projectTask=' + projectTask + '&_token=' + token + '&taskStatus=' + taskStatus + '&milestones=' + milestones;

            $.easyAjax({
                url: url,
                blockUI: true,
                container: '.content-wrapper',
                type: "POST",
                success: function(response) {
                    if (!response.length) {
                        $("#gantt").html(
                            "<div class='d-flex justify-content-center p-20'>{{ __('messages.noRecordFound') }}</div>"
                        );
                        return;
                    }

                    $("#gantt").html("");

                    var gantt = new Gantt("#gantt", response, {
                        popup_trigger: "mouseover",
                        view_mode: viewMode,
                        on_click: function(task) {
                            taskDetail(task.taskid);
                        },
                        on_date_change: function(task, start, end) {
                            var taskId = task.taskid;
                            var token = '{{ csrf_token() }}';
                            var url =
                                "{{ route('tasks.gantt_task_update', ':id') }}";
                            url = url.replace(':id', taskId);
                            var startDate = moment.utc(start.toDateString())
                                .format('DD/MM/Y');
                            var endDate = moment.utc(end.toDateString())
                                .subtract(1, "days").format('DD/MM/Y');

                            $.easyAjax({
                                url: url,
                                type: "POST",
                                container: '#gantt',
                                data: {
                                    '_token': token,
                                    'start_date': startDate,
                                    'end_date': endDate
                                }
                            });
                        },
                        on_progress_change: function(task, progress) {
                        },
                        on_view_change: function(mode) {
                        }
                    });

                }
            });
        }

        $('#assignedTo, #gantt-view, #projectTask, #task_status, #milestones').on('change keyup', function() {
            loadData();
        });

        // Task Detail show in sidebar
        var taskDetail = function(id) {
            openTaskDetail();
            var url = "{{ route('tasks.show', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                blockUI: true,
                container: RIGHT_MODAL,
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $(RIGHT_MODAL_CONTENT).html(response.html);
                        $(RIGHT_MODAL_TITLE).html(response.title);
                    }
                },
                error: function(request, status, error) {
                    if (request.status == 403) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">403 | Permission Denied</div>'
                        );
                    } else if (request.status == 404) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">404 | Not Found</div>'
                        );
                    } else if (request.status == 500) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">500 | Something Went Wrong</div>'
                        );
                    }
                }
            });
        }

        loadData();
    });

</script>
