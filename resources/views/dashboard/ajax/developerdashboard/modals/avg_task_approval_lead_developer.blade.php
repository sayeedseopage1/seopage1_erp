<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="avg_task_approval_lead_developer{{ count($avg_no_of_submission_needed_for_app_by_lead_dev) }}" class="modal fade"
    tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Submitted Tasks: {{ $submit_number_of_tasks_in_this_month }}</h4>

                    {{-- <h4>Tasks where there was Revisions given by lead developer:
                        {{ $no_of_tasks_revision_given_by_lead_dev }} </h4> --}}

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="table_avg_task_approvel_lead_developer" class="display" style="width:100%">
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
                        @foreach ($avg_no_of_submission_needed_for_app_by_lead_dev as $row)
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
                                <td title="@foreach ($row->revisions as $revision) ({{++$loop->index}}): {{ $revision->created_at }}&#xA; @endforeach">
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
    new DataTable('#table_avg_task_approvel_lead_developer', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
