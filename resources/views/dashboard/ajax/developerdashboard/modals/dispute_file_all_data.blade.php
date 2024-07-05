<link href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" rel="stylesheet">
<div class="modal fade" id="disput_file_all_data{{ $number_of_dispute_filed_overall }}" aria-labelledby="exampleModalLabel"
    aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                </div>
                <button class="close" data-dismiss="modal" type="button" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="display" id="table_dispute_file_all_data" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Dispute Filed On</th>
                            <th scope="col">Dispute Filed by</th>
                            <th scope="col">Dispute Raised Against</th>
                            <th scope="col">Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($number_of_dispute_filed_overall_data as $row)
                        @foreach ($row->taskRevisionDisputes as $row2)
                        <tr>
                            <td>{{ $loop->parent->iteration . '.' . $loop->iteration  }}</td>
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
                <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script>
    new DataTable('#table_dispute_file_all_data', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
