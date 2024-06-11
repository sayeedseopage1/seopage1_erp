<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="submit_number_of_tasks_in_this_month_other_page{{ $submit_number_of_tasks_others_page_in_this_month }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Submitted Tasks Others Pages: {{ $submit_number_of_tasks_others_page_in_this_month }}</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="number_of_task_submitted_other" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($submit_number_of_tasks_others_page_in_this_month_data as $row)
                            <tr>
                                <td>{{ ++$loop->index }}</td>
                                <td>
                                    {{ $row->created_at }}
                                </td>
                                <td>
                                    <a href="{{ route('tasks.show', $row->id) }}">{{ $row->heading }}<a>
                                </td>
                                <td>
                                    {{ $row?->taskType?->task_type }}
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
                                <td>{{ $row->due_date }}</td>
                                <td>
                                    <span style="color: {{ $row->stat->label_color }}">
                                        {{ $row->stat->column_name }}</span>
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
    new DataTable('#number_of_task_submitted_other', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
