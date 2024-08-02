<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="no_of_lead_converted_to_deals{{ $number_of_leads_convert_deals }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Total Number of Converted Deals : {{ count($number_of_leads_convert_deals_get) }}</h4>
                    <h4>Total Number of Converted Deals (Fixed) : {{ $number_of_leads_convert_deals_fixed }}</h4>
                    <h4>Total Number of Converted Deals (Hourly) : {{ $number_of_leads_convert_deals_hourly }}</h4>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="noOfLeadThatGotConvertedDeals" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Project Budget</th>
                            <th scope="col">Created</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Deal Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($number_of_leads_convert_deals_get as $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
                                <td>
                                    {{ $row->client_name }}
                                </td>
                                <td>
                                    {{ $row->bid_value . $row->currency->currency_symbol }}
                                </td>
                                <td>
                                    {{ $row->created_at }}
                                </td>
                                <td>
                                    @if ($row->addedByUser)
                                        <a href="{{ route('employees.show', $row->addedByUser->id) }}">
                                            {{ $row->addedByUser->name }}</a>
                                    @else
                                        Unknown
                                    @endif
                                </td>
                                <td>
                                    @if ($row->deal_status)
                                        <span>Won</span>
                                    @else
                                        <span>Not Applicable</span>
                                    @endif
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
    new DataTable('#noOfLeadThatGotConvertedDeals', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
    });
</script>
