<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="hours_spent_in_revision_modal{{ $hours_spent_revision_developer_count }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Total logged hours for all submitted task in this period: {{ $hours_spent_task_developer }}</h4>
                    <h4>Total logged hours in tasks with revisions: {{ $hours_spent_task_withrev_developer }}</h4>
                    <h4>Logged hours in revisions: {{ $hours_spent_revision_developer }}</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="table_hours_spent_in_revision" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Responsible person for revision</th>
                            <th scope="col">Hours spent in 1st submission</th>
                            <th scope="col">Hours spent in revisions/th>
                            {{-- <th scope="col">status</th> --}}
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($hours_spent_revision_developer_data as $row)
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
                                    {{ $row?->project?->pm?->name }}
                                </td>
                                <td>
                                    {{ $row?->taskUser?->name }}
                                </td>
                                <td>{{ intdiv($row?->firstTaskSubmission?->timeLogs->sum('total_minutes'), 60).'h '. ($row?->firstTaskSubmission?->timeLogs->sum('total_minutes') % 60)  }}m </td>
                                <td>{{ intdiv($row?->revisions->sum('total_log_time'), 60).'h '. ($row?->revisions->sum('total_log_time') % 60)  }}m</td>
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
    new DataTable('#table_hours_spent_in_revision', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
