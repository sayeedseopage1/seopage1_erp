<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="realTimevalueOfUpsale{{ count($no_of_new_milestones_added_on_old_projects) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title" id="exampleModalLabel">
            <h4>Value of upsell/crossell : {{round($no_of_new_milestones_added_on_old_projects_value,2)}}$</h4>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="real_time_valueOfUpsale" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Milestone Title</th>
                    <th scope="col">Project Budget</th>
                    <th scope="col">Milestone Cost</th>
                    <th scope="col">Milestone Start</th>
                    <th scope="col">Milestone Status</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach ($no_of_new_milestones_added_on_old_projects as $item)
                        @php
                            $client = \App\Models\User::where('id',$item->client_id)->first();
                        @endphp
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            <a href="{{ route('clients.show',$client->id) }}">{{ $client->name }}</a>
                        </td>
                        <td>
                            <a href="{{ route('projects.show',$item->project_id) }}">{{ $item->project_name }}</a>
                        </td>
                        <td>{{ $item->milestone_title }}</td>
                        <td>{{ $item->project_budget }} $</td>
                        <td>{{ $item->cost }}</td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            @if ($item->status == 'incomplete')
                                <span class="badge badge-warning">{{ $item->status }}</span>
                            @endif
                            @if ($item->status == 'complete')
                                <span class="badge badge-success">{{ $item->status }}</span>
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
      new DataTable('#real_time_valueOfUpsale',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
