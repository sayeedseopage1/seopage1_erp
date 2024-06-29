<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="percentage_task_with_revision{{ $percentage_of_tasks_with_revision_other_count }}" class="modal fade"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Revisions Taks: {{ $percentage_of_tasks_with_revision_count }}</h4>
                    <h4>Primary Page: {{ $percentage_of_tasks_with_revision_primary_count }}</h4>
                    <h4>Secondary Page: {{ $percentage_of_tasks_with_revision_secondary_count }}</h4>
                    <h4>Others: {{ $percentage_of_tasks_with_revision_other_count }}</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="percentage_table_revision_task" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Assign date</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">First Submission date</th>
                            <th scope="col">Num of Att. needed</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($percentage_of_tasks_with_revision_data as $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
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
                                <td>{{ $row->firstTaskSubmission->created_at }}</td>
                                <td
                                    title="@foreach ($row->revisions as $revision)({{ ++$loop->index }}): By {{ $revision->revision_status }} On {{ $revision->created_at }}&#xA; @endforeach">
                                    ({{ $row->revisions->count() }})
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
    new DataTable('#percentage_table_revision_task', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
