<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="newClient{{ count($no_of_new_clients_this_cycle) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel"><h4>New clients for this cycle: {{count($no_of_new_clients_this_cycle)}}</h4>
                
               
            </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="newClient" class="display" style="width:100%">
                <thead>
                  <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Client User Name</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Project Budget</th>
                        <th scope="col">Project Status</th>
                        <th scope="col">Client Creation Date</th>
                      </tr>
                </thead>
                <tbody>
                    @foreach ($no_of_new_clients_this_cycle as $item)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="" style="width: 28px;">
                                    <div style="width: 32px; height: 28px;">
                                        @if ($item->image)
                                            <img src="{{ asset('user-uploads/avatar/'.$item->image) }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                        @else
                                            <img src="{{ asset('img/avatar.png') }}" alt="" width="24" height="24" style="width: 28px; height: 28px;" class="rounded-circle">
                                        @endif
                                    </div>
                                </div>
                                <a href="{{ route('clients.show',$item->id) }}" class="ml-3">{{ $item->name }}</a>
                            </div>
                        </td>
                        <td>{{ $item->user_name }}</td>
                        <td>
                            <a href="{{ route('projects.show',$item->id) }}">{{ $item->project_name }}</a>
                        </td>
                        <td>{{ $item->project_budget }}$</td>
                        <td>
                            @if ($item->project_status == 'in progress')
                                <span class="badge badge-primary">{{ $item->project_status }}</span>
                            @endif
                            @if ($item->project_status == 'finished')
                                <span class="badge badge-success">{{ $item->project_status }}</span>
                            @endif
                            @if ($item->project_status == 'partially finished')
                                <span class="badge badge-info">{{ $item->project_status }}</span>
                            @endif
                            @if ($item->project_status == 'canceled')
                                <span class="badge badge-danger">{{ $item->project_status }}</span>
                            @endif
                        </td>
                        <td>{{ $item->client_creation_date }}</td>
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
      new DataTable('#newClient',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
