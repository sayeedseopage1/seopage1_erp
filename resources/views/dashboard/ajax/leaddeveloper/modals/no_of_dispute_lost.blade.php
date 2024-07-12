<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="no_of_dispute_lost{{ $number_of_dispute_lose_own_lead }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    {{-- <h4>Submitted Tasks: {{ $submit_number_of_tasks_in_this_month_lead }}</h4> --}}

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="no_of_dispute_lost_table" class="display" style="width:100%">
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
                        @foreach ($number_of_dispute_lose_own_lead_data as $row)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>
                                    <a href="{{ route('tasks.show', $row?->task?->id) }}">{{ $row?->task?->heading }}<a>
                                </td>
                                <td>
                                    @if ($row?->task?->project?->client)
                                        <a href="{{ route('clients.show', $row?->task?->project?->client?->id) }}">
                                            {{ $row?->task?->project?->client?->name }}</a>
                                    @endif
                                </td>
                                <td>
                                    {{ $row?->task?->project?->pm?->name }}
                                </td>
                                <td>
                                    {{ $row?->created_at }}
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
    new DataTable('#no_of_dispute_lost_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
