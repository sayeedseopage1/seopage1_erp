<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
 <style>
    .dot_badge {
        display: block;
        width: 15px;
        height: 15px;
        min-width: 8px;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-top: 3px;
        margin-right: 5px;
    }
 </style>
<div class="modal fade" id="monthlyTaskComplectionRateInCycle{{ count($total_tasks_completed_previous_cycle_get) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Task Complection Rate For This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="monthlyTaskComplectionRateInThisCycle" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Task</th>
                    <th scope="col">Project</th>
                    <th scope="col">Client</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Estimated Time</th>
                    <th scope="col">Hours Log</th>
                    <th scope="col">Assign to</th>
                    <th scope="col">Creation Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach ($total_tasks_completed_previous_cycle_get as $item)
                        @php
                            $project = \App\Models\Project::where('id',$item->project_id)->first();
                            $user = \App\Models\User::where('id',$project->client_id)->first();
                            $taskboard_column = \App\Models\TaskboardColumn::where('id',$item->board_column_id)->first();
                        @endphp
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $item->heading }}</td>
                        <td>
                            <a href="{{ route('projects.show',$project->id) }}">{{ $project->project_name }}</a>
                        </td>
                        <td>
                            <a href="{{ route('clients.show',$user->id) }}">{{ $user->name }}</a>
                        </td>
                        <td>{{ $item->due_date }}</td>
                        <td>
                            <span>{{ $item->estimate_hours }} hours {{ $item->estimate_minutes }} min</span>
                        </td>
                        <td>
                            @php
                                if ($item->total_minutes !=null) {
                                    $hours = $item->total_minutes/60;
                                    $minutes = $item->total_minutes%60;
                                }else {
                                    $hours = 0;
                                    $minutes = 0;
                                }
                            @endphp
                            <span>{{ floor($hours) }} hours {{ floor($minutes) }} min</span>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="" style="width: 28px;">
                                    <div style="width: 32px; height: 28px;">
                                        @if ($item->assined_to_avatar)
                                            <img src="{{ asset('user-uploads/avatar/'.$item->assined_to_avatar) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                        @else
                                            <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                        @endif
                                    </div>
                                </div>
                                <a href="{{ route('employees.show',$item->assined_to_id) }}" class="pl-2 ">{{ $item->assined_to_name }}</a>
                            </div>
                        </td>
                        <td>{{ $item->task_creation_date }}</td>
                        <td>
                            @if ($taskboard_column->id ==1)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==2)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==3)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==4)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==5)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==6)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==7)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==8)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                            @if ($taskboard_column->id ==9)
                            <div class="d-flex">
                                <span class="dot_badge" style="background: {{ $taskboard_column->label_color }}"></span>
                                <span>{{ $taskboard_column->column_name }}</span>
                            </div>
                            @endif
                        </td>
                    </tr>
                    @endforeach
                </tbody>
              </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script>
      new DataTable('#monthlyTaskComplectionRateInThisCycle');
  </script>
