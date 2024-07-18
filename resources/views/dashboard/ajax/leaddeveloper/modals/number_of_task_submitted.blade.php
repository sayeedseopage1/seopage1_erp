<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="submit_number_of_tasks_in_this_month_lead{{ $submit_number_of_tasks_in_this_month_lead }}" class="modal fade"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Submitted Tasks: {{ $submit_number_of_tasks_in_this_month_lead }}</h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="number_of_task_submitted_lead" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Assigned On</th>
                            <th scope="col">Started On</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($submit_number_of_tasks_in_this_month_lead_data as $row)
                            <tr>
                                <td>{{ ++$loop->index }}</td>
                                <td>
                                    <a href="{{ route('tasks.show', $row?->task?->id) }}">{{ $row?->task?->heading }}<a>
                                </td>
                                <td>
                                    @if ($row?->task?->project?->client)
                                        <a href="{{ route('clients.show', $row?->task?->project->client->id) }}">
                                            {{ $row?->task?->project->client->name }}</a>
                                    @endif
                                </td>
                                <td>
                                    {{ $row?->task?->project?->pm?->name }}
                                </td>
                                <td>
                                    {{ $row?->task?->created_at->format('d-m-Y g:i A') }}
                                </td>
                                <td>
                                    {{ $row?->task?->oldestSubTask?->created_at->format('d-m-Y g:i A') }}
                                </td>
                                <td>
                                    {{ $row?->task?->start_date }}
                                </td>
                                <td>
                                    <span style="color: {{ $row?->task?->stat->label_color }}">
                                        {{ $row?->task?->stat->column_name }}</span>
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
    new DataTable('#number_of_task_submitted_lead', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
