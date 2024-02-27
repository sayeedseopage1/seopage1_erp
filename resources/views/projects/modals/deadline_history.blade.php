<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="d_History{{$project->id}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Deadline Change History</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        @php
            $project_deadline_extension = App\Models\ProjectDeadlineExtension::where('project_id',$project->id)->orderBy('id','desc')->get();
        @endphp
        <div class="modal-body">
            <table id="deadline_history_table" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Previous Deadline</th>
                    <th scope="col">Requested On</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Request Status</th>
                    <th scope="col">Approved On</th>
                    <th scope="col">Extended Deadline</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach($project_deadline_extension as $row)
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>{{$row->old_deadline}}</td>
                        <td>{{\Carbon\Carbon::parse($row->created_at)->format('Y-m-d h:i:s A')}}</td>
                        <td>{{$row->extension}}</td>
                        <td>
                            @if ($row->status == 1)
                                <p>Approved</p>
                            @else
                            <p>Awaiting Approval</p>
                            @endif
                        </td>
                        <td>
                            @if ($row->approved_on)
                                {{\Carbon\Carbon::parse($row->approved_on)->format('Y-m-d h:i:s A')}}
                            @else
                            <p>Not Approved Yet</p>
                            @endif
                        </td>
                        <td>
                            @if ($row->deadline_extended_for)
                                {{($row->deadline_extended_for) .' Days'}} 
                            @else
                                <p>Not Extended Yet</p>
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
      new DataTable('#deadline_history_table',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>