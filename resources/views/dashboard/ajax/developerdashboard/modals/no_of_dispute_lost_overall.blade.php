<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="no_of_dispute_lost_overall{{ $number_of_dispute_lost_overall }}" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    {{-- <h4>No. of disputes lost(Overall): {{ $number_of_dispute_lost_all }}</h4> --}}
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="table_no_of_dispute_lost_overall" class="display" style="width:100%">
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
                                <tr>
                                    <td>{{ $loop->iteration  }}</td>
                                    <td>
                                        <a href="{{ route('tasks.show', $row?->task->id) }}">{{ $row?->task->heading }}<a>
                                    </td>
                                    <td>
                                        @if ($row?->task->project?->client)
                                            <a href="{{ route('clients.show', $row?->task->project->client->id) }}">
                                                {{ $row?->task->project->client->name }}</a>
                                        @endif
                                    </td>
                                    <td>
                                        {{ $row?->task->project?->pm?->name }}
                                    </td>
                                    <td>
                                        {{ $row?->created_at->format('d-m-Y g:i A') }}
                                    </td>
                                    <td>{{ $row?->raisedBy?->name }}</td>
                                    <td>{{ $row?->raisedAgainst?->name }}</td>
                                    <td>{{ $row?->disputeWinner?->name }}</td>
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
    new DataTable('#table_no_of_dispute_lost_overall', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
