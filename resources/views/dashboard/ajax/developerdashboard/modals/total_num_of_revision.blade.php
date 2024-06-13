<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="total_no_of_revision{{ count($revision_task_data) }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Number of submitted tasks: __</h4>
                    <h4>Number of tasks with revisions: __</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="table_total_num_of_revision" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Revision Requested by</th>
                            <th scope="col">Responsible Person</th>
                            <th>Reason for revision</th>
                            <th scope="col">disputed(Y/N)</th>
                            <th scope="col">Total comments</th>
                            <th scope="col">Verdict</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($revision_task_data as $row)
                            @foreach ($row?->revisions as $revision)
                                <tr>
                                    <td>{{ $loop->index + 1 }}</td>
                                    <td>
                                        <a href="{{ route('tasks.show', $row->id) }}">{{ $row->heading }}<a>
                                    </td>
                                    <td>
                                        {{ $row?->project?->project_name }}
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
                                        {{ $revision?->user?->name }}
                                    </td>
                                    <td>{{ $revision?->revision_acknowledgement }}</td>
                                    <td>
                                        @if ($revision?->dispute_created)
                                            YES
                                        @else
                                            NO
                                        @endif
                                    </td>
                                    <td>
                                        {{ $revision?->taskRevisionDispute?->taskDisputeQuestions->count() ?? 0 }}
                                    </td>
                                    <td>
                                        @if ($revision?->taskRevisionDispute?->status)
                                            @if ($revision?->taskRevisionDispute?->winner)
                                                Verdict given in favor of
                                                {{ $revision?->taskRevisionDispute?->winner?->name }}
                                            @else
                                                Both parties were hold partially responsible. Party
                                                {{ $revision?->taskRevisionDispute?->raisedBy->name }}
                                            @endif
                                        @else
                                            N/A
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
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
    new DataTable('#table_total_num_of_revision', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
