<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="monthlyReleasedAmountCycle{{ count($total_released_amount_this_cycle_get) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
                <h4>Released amount for cycle: {{round($total_released_amount_this_cycle,2)}}$</h4>
              </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="monthly_relesed_amount" class="display" style="width:100%">
                <thead>
                    <tr>
                      <th scope="col">Sl No</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Project Name</th>
                      <th scope="col">Milestone Title</th>
                      <th scope="col">Project Budget</th>
                      <th scope="col">Milestone Cost</th>
                      <th scope="col">Milestone Start Time</th>
                      <th scope="col">Milestone Released Time</th>
                      <th scope="col">Project Status</th>
                    </tr>
                  </thead>
                  <tbody>
                      @foreach ($total_released_amount_this_cycle_get as $item)
                          @php
                              $client = \App\Models\User::where('id',$item->client_id)->first();
                          @endphp
                      <tr>
                          <td>{{ $loop->iteration }}</td>
                          <td>
                              <a href="{{ route('clients.show',$client->id) }}">{{ $client->name }}</a>
                          </td>
                          <td>
                              <a href="{{ route('projects.show',$item->id) }}">{{ $item->project_name }}</a>
                          </td>
                          <td>{{ $item->milestone_title }}</td>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script>
      new DataTable('#monthly_relesed_amount',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
