<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="hours_spent_in_revision{{ $spent_revision_developer_lead_count }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Total logged hours for all submitted task in this period:
                        {{ $logged_hours_for_all_submitted }}</h4>
                    <h4>Total logged hours in tasks with revisions:
                        {{ $logged_hours_in_tasks_with_revisions }}</h4>
                    <h4>Logged hours in revisions: {{ $spent_revision_developer_lead }}</h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="hours_spent_in_revision_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Responsible Person For Revision</th>
                            <th scope="col">Hours spent in 1st submission</th>
                            <th scope="col">Hours spent in revisions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($spent_revision_developer_lead_data as $row)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>
                                    <a href="{{ route('tasks.show', $row->id) }}">{{ $row->heading }}<a>
                                </td>
                                <td>
                                    @if ($row?->project?->client)
                                        <a href="{{ route('clients.show', $row->project->client->id) }}">
                                            {{ $row->project->client->name }}</a>
                                    @endif
                                </td>
                                <td>
                                    {{ $row?->project?->pm?->name }}
                                </td>
                                <td>
                                    {{ $row?->taskUser?->name }}
                                </td>
                                @php
                                    $time_logs_sum_total_minutes = 0;
                                    $total_minutes = 0;
                                @endphp
                                @foreach ($row?->taskSubTasks as $taskSubTask)
                                    @php
                                        $time_logs_sum_total_minutes += $taskSubTask?->firstTaskSubmission?->time_logs_sum_total_minutes;
                                        $total_minutes += $taskSubTask?->revisions?->sum('time_logs_sum_total_minutes');
                                    @endphp
                                @endforeach
                                <td>
                                    {{ (intdiv($time_logs_sum_total_minutes, 60) . 'h ' . $time_logs_sum_total_minutes % 60 .'m') ?? 0 }}
                                </td>
                                <td>
                                    {{ (intdiv($total_minutes , 60) . 'h ' . $total_minutes % 60 .'m' ) ?? 0 }}
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
    new DataTable('#hours_spent_in_revision_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
