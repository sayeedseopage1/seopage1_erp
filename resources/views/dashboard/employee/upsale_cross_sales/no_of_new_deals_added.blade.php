<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="noOfNewDealsAdded{{ count($no_of_new_deals_added) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title" id="exampleModalLabel">
            <h4>No of new deals added : {{count($no_of_new_deals_added)}}</h4>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="numberOfDeals" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Deal Name</th>
                    <th scope="col">Client</th>
                    <th scope="col">Project Link</th>
                    <th scope="col">Project Budget(USD)</th>
                    <th scope="col">Creation Date</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach ($no_of_new_deals_added as $item)
                        @php
                            $client = \App\Models\User::where('id',$item->client_id)->first();
                            $project = \App\Models\Project::where('project_name',$item->project_name)->first();
                            if (!$project) 
                              continue;
                        @endphp
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>
                            <a href="{{ route('projects.show',$project->id) }}">{{ $item->project_name }}</a>
                        </td>
                        <td>
                            <a href="{{ route('clients.show',$client->id) }}">{{ $client->name }}</a>
                        </td>
                        <td>{{ substr($item->profile_link,0,50).('...') }}</td>
                        <td>{{ number_format($item->upsell_amount, 2) }}$</td>
                        <td>{{ $item->created_at }}</td>
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
      new DataTable('#numberOfDeals',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
