<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="no_of_lead_that_got_converted_to_deals" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"> 
                <h4>Total Number of Converted Deals : **</h4>  
                <h4>Total Number of Converted Deals (Fixed) : **</h4>  
                <h4>Total Number of Converted Deals (Hourly) : **</h4>  
            </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="noOfLeadThatGotConvertedDeals" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">No. of Deals Converted</th>
                    <th scope="col">No. of Deals Lost</th>
                    <th scope="col">No. of deals moved to the price negotiation stage</th>
                    <th scope="col">Total Won Deals Value</th>
                    <th scope="col">Deal to Won Deals Conv. Rate</th>
                    <th scope="col">No of Wrong Deals</th>
                  
                  </tr>
                </thead>
                {{-- <tbody>
                    @foreach($first_attempt_approve_task_in_this_month_client_data as $row)
                 
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>
                            {{$row->assign_date}}
                          
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
                      
                    </tr>
                    @endforeach
                   
                </tbody> --}}
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
      new DataTable('#noOfLeadThatGotConvertedDeals',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });       
  </script>
