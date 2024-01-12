<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<div class="modal fade" id="country_wise_won_deal{{count($country_wise_won_deals_count)}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"></div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table id="country_wise_won_deal" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Country Name</th>
                    <th scope="col">Total Won Deal</th>
                    <th scope="col">Won Deal Value</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach($country_wise_won_deals_count as $row)
                    <tr>
                        <td>{{$loop->index+1}}</td>
                        <td>
                            {{$row->countries_name}}
                        </td>
                        <td>
                            {{$row->won_deals_count ?? '--'}}
                        </td>
                        <td>
                            {{$row->won_deals_value ?? '--'}}
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
      new DataTable('#country_wise_won_deal',{
        "dom": 't<"d-flex"l<"ml-auto"ip>><"clear">',
      });       
  </script>
