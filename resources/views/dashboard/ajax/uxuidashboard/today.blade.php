<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="col-10 d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today</h5>
                <div class="d-flex justify-content-between">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayDeadLineTasks->count()}}</p>
                    </a>
                </div>
            </div>
            <div class="col-2 d-block text-right">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Assigned To Me Today</h5>
                <div class="d-flex">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayStartTasks->count()}}</p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm-12 col-lg-6 mt-3">
        <div class="card bg-white border-0 b-shadow-4">
            <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                <h4 class="f-18 f-w-500 mb-0">Task Deadline Today (Assigned To Me) 
                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                </h4>
            </div>
            <div class="card-body p-0 h-200">
                <table class="table">
                    <thead>
                        <th>SL. No.</th>
                        <th>Task Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Estimated Time</th>
                        <th>Hours Logged</th>
                        <th>Project Manager</th>
                        <th>Project Deadline</th>
                    </thead>
                    <tbody>
                        @php $index = 0 @endphp
                        @forelse($todayDeadLineTasks as $value)
                        <tr>
                            <td>{{$index +1}}</td>
                            <td><a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
                            <td>{{$value->start_date->format('Y-m-d')}}</td>
                            <td>{{$value->due_date->format('Y-m-d')}}</td>
                            <td>{{$value->estimate_hours}} Hours</td>
                            <td>
                                @php
                                $timeLog = '--';

                                if($value->timeLogged) {
                                    $totalMinutes = $value->timeLogged->sum('total_minutes');

                                    $breakMinutes = $value->breakMinutes();
                                    $totalMinutes = $totalMinutes - $breakMinutes;

                                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                    if ($totalMinutes % 60 > 0) {
                                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                    }
                                }

                                $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                $time = 0;

                                foreach ($subtasks as $subtask) {
                                    $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                    $time += $task->timeLogged->sum('total_minutes');
                                }

                                if($subtasks == null) {
                                    echo $timeLog;
                                } else {
                                    $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                    if ($time % 60 > 0) {
                                        $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                    }
                                    echo $timeL;
                                }
                                @endphp
                            </td>
                            <td><a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a></td>
                            <td>{{$value->project->deadline->format('Y-m-d')}}</td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="8" class="shadow-none">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-lg-6 mt-3">
        <div class="card bg-white border-0 b-shadow-4">
            <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                <h4 class="f-18 f-w-500 mb-0">Task Deadline Today (Assigned To Me) 
                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                </h4>
            </div>
            <div class="card-body p-0 h-200">
                <table class="table">
                    <thead>
                        <th>SL. No.</th>
                        <th>Task Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Estimated Time</th>
                        <th>Hours Logged</th>
                        <th>Project Manager</th>
                        <th>Project Deadline</th>
                    </thead>
                    <tbody>
                        @php $index = 0 @endphp
                        @forelse($todayStartTasks as $value)
                        <tr>
                            <td>{{$index +1}}</td>
                            <td><a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
                            <td>{{$value->start_date->format('Y-m-d')}}</td>
                            <td>{{$value->due_date->format('Y-m-d')}}</td>
                            <td>{{$value->estimate_hours}} Hours</td>
                            <td>
                                @php
                                $timeLog = '--';

                                if($value->timeLogged) {
                                    $totalMinutes = $value->timeLogged->sum('total_minutes');

                                    $breakMinutes = $value->breakMinutes();
                                    $totalMinutes = $totalMinutes - $breakMinutes;

                                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                    if ($totalMinutes % 60 > 0) {
                                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                    }
                                }

                                $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                $time = 0;

                                foreach ($subtasks as $subtask) {
                                    $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                    $time += $task->timeLogged->sum('total_minutes');
                                }

                                if($subtasks == null) {
                                    echo $timeLog;
                                } else {
                                    $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                    if ($time % 60 > 0) {
                                        $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                    }
                                    echo $timeL;
                                }
                                @endphp
                            </td>
                            <td><a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a></td>
                            <td>{{$value->project->deadline->format('Y-m-d')}}</td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="8" class="shadow-none">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>