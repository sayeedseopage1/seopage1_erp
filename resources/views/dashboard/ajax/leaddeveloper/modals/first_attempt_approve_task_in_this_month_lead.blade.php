<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="first_attempt_approve_task_in_this_month_lead{{ count($first_attempt_approve_task_in_this_month_lead_data) }}"
    class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    {{-- <h4>Submitted Tasks: {{ $first_attempt_approve_task_in_this_month_lead }}</h4> --}}

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="first_attempt_of_task_submitted_lead" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Assign date</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Submission On</th>
                            <th scope="col">Approved on</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($first_attempt_approve_task_in_this_month_lead_data as $row)
                            <tr>
                                <td>{{ ++$loop->index }}</td>
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
                                    {{ $row->created_at->format('d-m-Y g:i A') }}
                                </td>
                                <td>
                                    {{ $row->due_date->format('d-m-Y g:i A') }}
                                </td>
                                <td>
                                    {{ $row?->latestTaskSubmission?->created_at->format('d-m-Y g:i A') }}
                                </td>
                                <td>
                                    {{ $row?->latestTaskApprove?->created_at->format('d-m-Y g:i A') }}
                                </td>
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
    new DataTable('#first_attempt_of_task_submitted_lead', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
