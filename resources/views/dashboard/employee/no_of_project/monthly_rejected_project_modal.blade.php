<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="monthlyRejectedProjectModal{{ count($no_of_rejected_projects) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Rejected Projects</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <table id="table4" class="display" style="width:100%">
                            <thead>
                              <tr>
                                <th scope="col">Sl No</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Project Type</th>
                                <th scope="col">Project Budget</th>
                                <th scope="col">Project Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                @foreach ($no_of_rejected_projects as $item)
                                    @php
                                        $user = \App\Models\User::where('id',$item->client_id)->first();
                                        $deal = \App\Models\Deal::where('id',$item->deal_id)->first();
                                    @endphp
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <a href="{{ route('clients.show',$user->id) }}">{{ $user->name }}</a>
                                    </td>
                                    <td>
                                        <a href="{{ route('projects.show',$item->id) }}">{{ $item->project_name }}</a>
                                    </td>
                                    <td>{{ $deal->project_type }}</td>
                                    <td>{{ $item->project_budget }} $</td>
                                    <td>{{ $item->project_status }}</td>
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
      new DataTable('#table4');
  </script>
