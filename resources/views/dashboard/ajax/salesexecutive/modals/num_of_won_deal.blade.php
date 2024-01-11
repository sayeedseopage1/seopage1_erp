<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="num_of_won_deal{{count($no_of_won_deals_count)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
                <h4>Total Number of Leads: {{count($no_of_won_deals_count)}}</h4>  
                {{-- <h4>Total Number of Leads for fixed Project: {{$number_of_leads_received_fixed}}</h4>  
                <h4>Total Number of Leads for hourly Project: {{$number_of_leads_received_hourly}}</h4>   --}}
            </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="numOfWonDeals" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Created</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Deal Status</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach($no_of_won_deals_count as $row)
                    @php
                      $currency = App\Models\Currency::where('id',$row->currency_id)->first();
                      $user = App\Models\User::where('id',$row->added_by)->first();
                    @endphp
                 
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>
                            {{$row->client_name}}
                        </td>
                        <td>
                            {{$row->created_at}}
                        </td>
                        <td>
                            @if($user->id != null)
                            <a href="{{route('employees.show',$user->id)}}"> {{$user->name}}</a>
                            @else 
                            --
                           @endif
                        </td>
                        <td>
                          @if($row->deal_status == 0)
                            <span>Not Applicable</span>
                          @else 
                            <span>Won</span>
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
      new DataTable('#numOfWonDeals',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });       
  </script>
