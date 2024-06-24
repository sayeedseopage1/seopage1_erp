<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="percentage_of_tasks_deadline_missed{{ count($estimate_missed_task_data_lead) }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Number of submitted tasks: __</h4>
                    <h4>Number of tasks where deadline was missed: {{ $submit_number_of_tasks_in_this_month_lead }}</h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="percentage_of_tasks_deadline_missed_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">1st Submission date & time</th>
                            <th scope="col">Deadline missed by </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($estimate_missed_task_data_lead as $row)
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
                                    {{ $row->due_date }}
                                </td>
                                <td>
                                    {{ $row->firstTaskSubmission->created_at }}
                                </td>
                                <td>
                                    {{\Carbon\Carbon::parse($row->firstTaskSubmission->created_at)->diffForHumans($row->due_date) }}
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
    new DataTable('#percentage_of_tasks_deadline_missed_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
