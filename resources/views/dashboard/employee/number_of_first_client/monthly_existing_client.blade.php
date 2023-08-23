<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="monthlyExistingClient{{ count($no_of_existing_clients_this_cycle) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Existing Client For This Cycle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="monthlyExistingClient" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Client User Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Client Badge</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach ($no_of_existing_clients_this_cycle as $item)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            <a href="{{ route('clients.show',$item->id) }}">{{ $item->name }}</a>
                        </td>
                        <td>{{ $item->user_name }}</td>
                        <td>
                            @if ($item->image)
                                <img src="{{ asset('user-uploads/avatar/'.$item->image) }}" alt="" class="rounded-circle" width="36" height="36">
                            @else
                                <img src="{{ asset('img/avatar.png') }}" alt="" class="rounded-circle" width="36" height="36">
                            @endif
                        </td>
                        <td>{{ $item->client_badge }}</td>
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
      new DataTable('#monthlyExistingClient',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
