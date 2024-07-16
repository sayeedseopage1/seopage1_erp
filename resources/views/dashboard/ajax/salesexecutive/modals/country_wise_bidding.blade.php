<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="country_wise_bidding{{ count($country_wise_lead_counts) }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title"></div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="country_wise_bidding" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Country Name</th>
                            <th scope="col">Total Lead</th>
                            <th scope="col">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($country_wise_lead_counts as $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
                                <td>
                                    {{ $row->country }}
                                </td>
                                <td>
                                    {{ $row->lead_count }}
                                </td>
                                <td>
                                    {{ ($row->lead_count / $number_of_leads_received) * 100 }}%
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
    new DataTable('#country_wise_bidding', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
