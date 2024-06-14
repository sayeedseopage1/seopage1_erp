<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="no_of_dispute_lost{{ count($number_of_dispute_lost_data) }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>No. of disputes lost(Raised By Developer): {{ $number_of_dispute_lost_all }}</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="table_no_of_dispute_lost" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Project Manager</th>
                            <th scope="col">Dispute filed on</th>
                            <th scope="col">Dispute raised against</th>
                            <th scope="col">Winner</th>
                            {{-- <th scope="col">status</th> --}}
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($number_of_dispute_lost_data as $row)
                            @foreach ($row->taskRevisionDispute as $row2)
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
                                        {{ $row?->project?->pm?->name }}
                                    </td>
                                    <td>
                                        {{ $row2?->created_at }}
                                    </td>
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
    new DataTable('#table_no_of_dispute_lost', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
