<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="avg_task_approval_lead_developer{{count($avg_no_of_submission_needed_for_app_by_lead_dev)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"><h4>Submitted Tasks: {{$submit_number_of_tasks_in_this_month}}</h4>
           
           <h4>Tasks where there was Revisions given by lead developer: {{$no_of_tasks_revision_given_by_lead_dev}} </h4>  
         
             </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="table_avg_task_approvel_lead_developer" class="display" style="width:100%">
              <thead>
                <tr>
                  <th scope="col">Sl No</th>
                  <th scope="col">Assign Date</th>
                  <th scope="col">Task Name</th>
                  <th scope="col">Client Name</th>
                 
                  <th scope="col">Deadline</th>
                  <th scope="col">status</th>
                  <th scope="col">First Submission Date</th>
                  <th scope="col">Last Approval Date</th>
                  <th scope="col">Revision Count</th>
                
                </tr>
              </thead>
              <tbody>
                  @foreach($avg_no_of_submission_needed_for_app_by_lead_dev as $row)
               
                  <tr>
                      <td>{{$loop->index+1}}</td>
                      <td>
                          {{$row->task_creation_date}}
                        
                      </td>
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
                     
                      <td>{{$row->due_date}}</td>
                      <td>
                        <span style="color: {{$row->label_color}}"> {{$row->column_name}}</span>
                      </td>
                      <td>
                         
                        {{$row->task_submission_date}}
                  
                     </td>
                     <td>
                         
                      {{$row->task_approval_date}}
                
              </td>
              <td>
                         
                {{$row->revision_count}}
          
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
      new DataTable('#table_avg_task_approvel_lead_developer',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });
  </script>
