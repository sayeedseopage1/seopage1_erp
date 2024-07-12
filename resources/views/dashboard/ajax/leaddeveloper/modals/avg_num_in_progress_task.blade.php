<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div id="avg_num_in_progress_task{{ $average_in_progress_date_range_lead }}" class="modal fade" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4>Total Number of Tasks: {{ $total_number_in_task_lead_from_in_pro }}</h4>
                    <h4>Total Number of In-progress Tasks: {{ $average_in_progress_date_range_lead }}</h4>

                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="total_in_progress_date_range_table_lead_table" class="display" style="width:100%">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Number of in-progress task</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($total_in_progress_date_range_table_lead as $key => $row)
                            <tr>
                                <td>{{ $loop->index + 1 }}</td>
                                <td>
                                    {{ $key }}
                                </td>
                                <td>
                                    {{ count($row) ?? 0 }}
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
    new DataTable('#total_in_progress_date_range_table_lead_table', {
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
        "bDestroy": true
    });
</script>
