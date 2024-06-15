<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="avg_task_approval_client{{count($average_number_of_tasks_approved_client_data)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"><h4>Submitted Tasks: {{$submit_number_of_tasks_in_this_month}}</h4>
           
            <h4>Tasks where there was Revisions given by Client: {{$no_of_tasks_revision_given_by_lead_dev}} </h4>  
          
              </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="table_avg_task_approvel_client" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Assign Date</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Submission Date</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">status</th>
                    <th scope="col">Revision Count</th>
                  
                  </tr>
                </thead>
                <tbody>
                    @foreach($average_number_of_tasks_approved_client_data as $row)
                    {{-- {{dd($row)}} --}}
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>{{$row->assign_date}}</td>
                        <td>
                          <a href="{{route('tasks.show',$row->id)}}">{{$row->heading}}<a>
                        </td>
                        <td>
                            @if($row->cl_id != null)
                            {{$row->cl_name}}
                            @elseif($row->client_name != null)
                            {{$row->client_name}}
                            @else 
                           <a href="{{route('clients.show',$row->clientId)}}"> {{$row->clientName}}</a>
                           @endif
                        </td>
                        <td>
                            @if($row->board_column_id == 1 || $row->board_column_id == 2 || $row->board_column_id == 3)
                            N\A 
                            @else 
                            {{$row->submission_date}}
                        @endif
                    </td>
                        <td>{{$row->due_date}}</td>
                        <td>
                          <span style="color: {{$row->label_color}}"> {{$row->column_name}}</span>
                        </td>
                        <td>
                          {{-- <span> {{$row->revision_count}}</span> --}}
                          <span>--</span>
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
      new DataTable('#table_avg_task_approvel_client',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
