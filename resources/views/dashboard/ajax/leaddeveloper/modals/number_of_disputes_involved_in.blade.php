<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="number_of_disputes_involved_in{{ count($disputes_lead_developer_involved_data) }}"
    class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    {{-- <h4>Percentage of Tasks Where Given Estimated Time was Missed Without Revisions:
                        {{ round($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, 2) }}%
                    </h4> --}}

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="number_of_disputes_involved_in_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Dispute filed on</th>
                            <th scope="col">Dispute filed by</th>
                            <th scope="col">Dispute raised against</th>
                            <th scope="col">Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($disputes_lead_developer_involved_data as $row)
                            @foreach ($row->taskRevisionDispute as $row2)
                                <tr>
                                    <td>{{ $loop->parent->iteration .'.'.  $loop->iteration }}</td>
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
                                        {{ $row2?->created_at }}
                                    </td>
                                    <td>{{ $row2?->raisedBy?->name }}</td>
                                    <td>{{ $row2?->raisedAgainst?->name }}</td>
                                    <td>{{ $row2?->disputeWinner?->name }}</td>
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
    new DataTable('#number_of_disputes_involved_in_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
