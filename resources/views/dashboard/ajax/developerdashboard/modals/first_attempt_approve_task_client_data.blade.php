<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="first_attempt_approve_task_client{{ $approved_task_by_client_in_first_attempt }}" class="modal fade"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Number of approved tasks on 1st attempt by Client:
                        {{ $approved_task_by_client_in_first_attempt }}</h4>
                    <h4>Number of approved tasks on 1st attempt by Client Primary Pages:
                        {{ $approved_task_by_client_in_first_attempt_primary_page }}</h4>
                    <h4>Number of approved tasks on 1st attempt by Secondary Pages:
                        {{ $approved_task_by_client_in_first_attempt_secondary_page }} </h4>
                    <h4>Number of approved tasks on 1st attempt by Client Others Pages:
                        {{ $approved_task_by_client_in_first_attempt_other }}
                    </h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="first_attempt_approve_task_client" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Task type</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Lead Developer</th>
                            <th scope="col">created on</th>
                            <th scope="col">Submitted on</th>
                            <th scope="col">Approved on</th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($approved_task_by_client_in_first_attempt_data as $row)
                            <tr>
                                <td>{{ ++$loop->index }}</td>
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
                                <td>{{ $row->createBy->name }}</td>
                                <td>
                                    {{ $row->created_at }}
                                </td>
                                <td>
                                    {{ $row->latestTaskSubmission?->created_at }}
                                </td>
                                <td>
                                    {{ $row->latestTaskApprove?->created_at }}
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
    new DataTable('#first_attempt_approve_task_client', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
