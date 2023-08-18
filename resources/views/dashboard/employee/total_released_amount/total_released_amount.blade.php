<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="totalReleasedAmount{{ count($total_released_amount_previous_cycle_get) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Total released amount</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <table id="total_released_amount" class="display" style="width:100%">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Milestone Title</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Project Budget</th>
                                <th scope="col">Milestone Cost</th>
                                <th scope="col">Milestone Start</th>
                                <th scope="col">Milestone Complete</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                @foreach ($total_released_amount_previous_cycle_get as $item)
                                    @php
                                        $client = \App\Models\User::where('id',$item->client_id)->first();
                                    @endphp
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $client->name }}</td>
                                    <td>{{ $item->milestone_title }}</td>
                                    <td>{{ $item->project_name }}</td>
                                    <td>{{ $item->project_budget }} $</td>
                                    <td>{{ $item->milestone_cost }}</td>
                                    <td>{{ $item->milestone_creation_date }}</td>
                                    <td>{{ $item->milestone_released_date }}</td>
                                    <td>
                                        @if ($item->status == 'in progress')
                                            <span class="badge badge-primary">{{ $item->status }}</span>
                                        @endif
                                        @if ($item->status == 'finished')
                                            <span class="badge badge-success">{{ $item->status }}</span>
                                        @endif
                                        @if ($item->status == 'partially finished')
                                            <span class="badge badge-info">{{ $item->status }}</span>
                                        @endif
                                        @if ($item->status == 'canceled')
                                            <span class="badge badge-danger">{{ $item->status }}</span>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script>
      new DataTable('#total_released_amount');
  </script>
