<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="avg_num_in_progress{{ count($average_in_progress_date_range_date) }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4></h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="avg_num_in_progress_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Number of in-progress task</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($average_in_progress_date_range_date as $kry => $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
                                <td>
                                    {{ $kry }}
                                </td>
                                <td>
                                    {{ $row->count() }}
                                </td>
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

@foreach ($total_in_progress_date_range_table as $key => $row)
    @if ($row->revision_count != '0')
        @php
            $task_revisions = App\Models\TaskRevision::where('task_id', $row->id)->get();
        @endphp
        <div id="revision_count_modal{{ $key }}" class="modal fade" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="exampleModalLabel" class="modal-title"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table my-3">
                            <thead class="">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Responsible Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($task_revisions as $task_revision)
                                    @php
                                        $rp_client = '';
                                        $rp_developer = '';
                                        $rp_pm = '';
                                        $rp_lead_dev = '';
                                        $rp_ud = '';
                                        $rp_gd = '';
                                        $rp_sales = '';
                                        if ($task_revision->final_responsible_person != null) {
                                            if ($task_revision->final_responsible_person == 'C') {
                                                $project = App\Models\Project::where(
                                                    'id',
                                                    $task_revision->project_id,
                                                )->first();
                                                $rp_client = App\Models\User::where('id', $project->client_id)->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'D') {
                                                $task = App\Models\Task::where('id', $task_revision->task_id)->first();
                                                $taskUser = App\Models\Task::where('task_id', $task->id)->first();
                                                $rp_developer = App\Models\User::where(
                                                    'id',
                                                    $taskUser->user_id,
                                                )->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'PM') {
                                                $project = App\Models\Project::where(
                                                    'id',
                                                    $task_revision->project_id,
                                                )->first();
                                                $rp_pm = App\Models\User::where('id', $project->pm_id)->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'LD') {
                                                $project = App\Models\Project::where(
                                                    'id',
                                                    $task_revision->project_id,
                                                )->first();
                                                $projectMember = App\Models\ProjectMember::where(
                                                    'project_id',
                                                    $project->id,
                                                )
                                                    ->groupBy('project_id')
                                                    ->first();
                                                $rp_lead_dev = App\Models\User::where(
                                                    'id',
                                                    $projectMember->lead_developer_id,
                                                )->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'UD') {
                                                $task = App\Models\Task::where('id', $task_revision->task_id)->first();
                                                $taskUser = App\Models\Task::where('task_id', $task->id)->first();
                                                $rp_ud = App\Models\User::where('id', $taskUser->user_id)->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'GD') {
                                                $task = App\Models\Task::where('id', $task_revision->task_id)->first();
                                                $taskUser = App\Models\Task::where('task_id', $task->id)->first();
                                                $rp_gd = App\Models\User::where('id', $taskUser->user_id)->first();
                                            }
                                            if ($task_revision->final_responsible_person == 'S') {
                                                $project = App\Models\Project::where(
                                                    'id',
                                                    $task_revision->project_id,
                                                )->first();
                                                $deal = App\Models\Deal::where('id', $project->deal_id)->first();
                                                $lead = App\Models\Lead::where('id', $deal->lead_id)->first();
                                                $rp_sales = App\Models\User::where('id', $lead->added_by)->first();
                                            }
                                        }
                                    @endphp
                                    <tr>
                                        <td>
                                            {{ $task_revision->created_at }}
                                        </td>
                                        <td>
                                            @if ($rp_client != null)
                                                <a
                                                    href="{{ route('clients.show', $rp_client->id) }}">{{ $rp_client->name }}</a>
                                            @endif
                                            @if ($rp_developer != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_developer->id) }}">{{ $rp_developer->name }}</a>
                                            @endif
                                            @if ($rp_pm != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_pm->id) }}">{{ $rp_pm->name }}</a>
                                            @endif
                                            @if ($rp_lead_dev != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_lead_dev->id) }}">{{ $rp_lead_dev->name }}</a>
                                            @endif
                                            @if ($rp_ud != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_ud->id) }}">{{ $rp_ud->name }}</a>
                                            @endif
                                            @if ($rp_gd != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_gd->id) }}">{{ $rp_gd->name }}</a>
                                            @endif
                                            @if ($rp_sales != null)
                                                <a
                                                    href="{{ route('employees.show', $rp_sales->id) }}">{{ $rp_sales->name }}</a>
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
    @endif
@endforeach

<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script>
    new DataTable('#avg_num_in_progress_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
