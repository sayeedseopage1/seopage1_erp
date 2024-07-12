<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="percentage_task_estimate_time_missed{{ $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision }}" class="modal fade"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Number of submitted tasks: __</h4>
                    <h4>Number of tasks where Estimed time was missed:{{ $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision }}
                    </h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="percentage_task_estimate_time_missed_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Estimated hours</th>
                            <th scope="col">Logged hours </th>
                            <th scope="col">Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data as $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
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
                                    {{ $row?->project?->pm?->name ?? 'Unknown' }}
                                </td>
                                <td>
                                    {{ $row?->estimate_hours }}
                                </td>
                                <td>
                                    {{ intval((($row?->timeLogged?->sum('total_minutes') ?? 0) + ($row?->subtaskAll->sum('total_log_time_in_min') ?? 0))/ 60 ) }}
                                </td>
                                <td>
                                    {{intval((($row?->timeLogged?->sum('total_minutes') ?? 0) + ($row?->subtaskAll->sum('total_log_time_in_min') ?? 0))/ 60 ) - ($row?->estimate_hours ?? 0)}}
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
    new DataTable('#percentage_task_estimate_time_missed_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
