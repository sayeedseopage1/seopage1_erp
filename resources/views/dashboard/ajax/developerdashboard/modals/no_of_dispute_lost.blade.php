<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="no_of_dispute_lost{{count($number_of_dispute_filed_own_data) }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <h4>o. of disputes lost(Raised By Developer): {{$number_of_dispute_lost_own}}</h4>
             </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="table_no_of_dispute_lost" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Assign Date</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Submission Date</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">status</th>

                  </tr>
                </thead>
                <tbody>
                    @foreach($number_of_dispute_lost_own_data as $row)
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
      new DataTable('#table_no_of_dispute_lost',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });


  </script>
