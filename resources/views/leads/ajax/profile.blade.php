<!-- ROW START -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />


<style>

    .deals_itemsp2023{
        width: 95%;
        margin: 10px auto;
    }
    .deals_item_info {
        display: flex;
        flex-direction: column;
        float: left;
        justify-content: center;
        align-items: stretch;
    }

    .deals_item_info:nth-child(1){
        width:30% ;
        overflow: hidden;
    }
    .deals_item_info:nth-child(2){
        width:70% ;
        overflow: hidden;
    }

    .deals_item_lists ul{
        padding: 0;
        margin: 0;
    }
    .deals_item_lists ul li {
        list-style: none;
        padding: 15px;
        background: #F3F9FF;
        margin: 6px;
        border-radius: 5px;
        font-family: arial;
        font-size: 15px;
        font-weight: 400;
        color: #555;
        transition: all .5s ease-in-out;
    }
    .deals_item_lists ul li:hover{
        background: #f2f2ff;
    }

    .deals_item_lists ul li span {
        display: inline-flex;
        font-weight: 600;
        color: #333;
        padding-right: 5px;
        font-size: 13px;
    }
    .deals_item_lists ul i{
        color: #1D82F5;
        width: 30px;
        height: 20px;
    }
    .deals_item_lists  a{
        color: #1D82F5;
        text-decoration: none;
    }

    .main-info-sp1 {
        margin: 6px 20px;
        background: #F3F9FF;
        padding: 0 25px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        border-radius: 5px;
    }
    .main-info-sp1 h5 {
        font-family: arial;
        font-size: 14px;
        color: #333;
        letter-spacing: 1px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        margin: 0;
        padding-top: 15px;
    }

    .main-info-sp1 p {
        font-family: arial;
        font-size: 14px;
        color: #555;
        letter-spacing: .50px;
        line-height: 1.5em;
    }

    .ssp1 {
        /* background: #b71995; */
        padding: 0px 8px;
        border-radius: 50%;
        margin-right: 7px;
        outline: none;
        border: none;
    }
    .deals_item_lists p {
        font-family: arial;
        font-size: 14px;
        font-weight: 700;
        color: #333;
        padding-left: 9px;
    }




    @media (min-width: 320px) and (max-width: 991.98px) {
        .deals_item_info:nth-child(1){
            width:100% ;
            overflow: hidden;
        }
        .deals_item_info:nth-child(2){
            width:100% ;
            overflow: hidden;
        }
        .main-info-sp1 {
            margin: 6px 7px;
        }
        .deals_item_lists ul i {
            width: 20px;
        }
    }

</style>
<div class="card bg-white border-0 b-shadow-4">
  <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20 ml-5">
    <h4 class="f-18 f-w-500 mb-0">Deal Details</h4>
  </div>
  <div class="card-body">
    <div class="row">
        <!--  USER CARDS START -->
        <div class="col-xl-12 col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">

          <div class="deals_itemsp2023">



              <div class="deals_item2">

                  <div class="deals_item_info">
                      <div class="deals_item_lists">
                        <?php
                        $currency=App\Models\Currency::where('id',$lead->original_currency_id)->first();
                        $value= $lead->actual_value. $currency->currency_symbol;
                        $bid_value= $lead->bid_value. $currency->currency_symbol .' - '. $lead->bid_value2. $currency->currency_symbol  ;

                         ?>
                          <ul>
                              <li><i class="fa-solid fa-layer-group"></i> <span>Project Name:</span> {{ucwords($lead->client_name)}} </li>

                              <li><i class="fa-solid fa-link"></i> <span>Project Link:</span> <a href="{{$lead->project_link}}" target="_blank">{{$lead->project_link}}</a> </li>

                              <li><i class="fa-solid fa-globe"></i> <span>Client Country:</span> {{ucwords($lead->country)}} </li>
                              @if($lead->deal_status == 0)
                              <li><i class="fa-solid fa-square-check"></i> <span>Status:</span> <b class="ssp1" style="background: #D30000;"></b> Not converted to deal </li>
                              @else
                                <li><i class="fa-solid fa-square-check"></i> <span>Status:</span> <b class="ssp1" style="background: #28a745;"></b> Converted to deal </li>
                              @endif
                              <li><i class="fa-regular fa-image"></i> <span>Bids Insight Page Screenshot (Full):</span> <a href="{{$lead->insight_screenshot}}" target="_blank">{{$lead->insight_screenshot}}</a> </li>

                              <li><i class="fa-regular fa-image"></i> <span>Bid Page Screenshot (Full):</span> <a href="{{$lead->bidpage_screenshot}}"target="_blank">{{$lead->bidpage_screenshot}}</a> </li>

                              <li><i class="fa-regular fa-image"></i> <span>Project Page Screenshot (Full):</span> <a href="{{$lead->projectpage_screenshot}}"target="_blank">{{$lead->projectpage_screenshot}}</a> </li>

                              <li><i class="fa-solid fa-sack-dollar"></i> <span>Bid value:	</span> {{$value}} </li>

                              <li><i class="fa-solid fa-sack-dollar"></i> <span>Project Budget:</span> {{$bid_value}} </li>

                          </ul>
                            @include('contracts.modals.dealstmodal')
                      </div>


                      <div class="deals_item_lists">
                          <p>Actions</p>
                          <ul>
                              <li><i class="fa-solid fa-shuffle"></i> <a href="#" data-toggle="modal" data-target="#dealstmodal" onclick="dataTableRowCheck2(' {{$lead->id}} ')" style="color: #333;font-weight: 600;font-size: 13px;">Convert To Deal </a> </li>
                              <li><i class="fa-solid fa-pen-to-square"></i> <a class="openRightModal" href="{{ route('leads.edit', $lead->id) }}" style="color: #333;font-weight: 600;font-size: 13px;">Edit </a> </li>
                          {{--    <li><i class="fa-solid fa-trash-can"></i> <a class="delete-table-row" href="javascript:;" data-id="{{$lead->id}}" style="color: #333;font-weight: 600;font-size: 13px;">Delete </a> </li> --}}

                          </ul>
                      </div>

                      <div class="deals_item_lists">
                          <p>Information</p>
                          <ul>
                              <li><i class="fa-solid fa-file-lines"></i> <span>Lead ID:</span> {{$lead->id}} </li>
                              <li><i class="fa-solid fa-user"></i> <span>Added By:</span> {{$lead->user->name}}</li>
                              <li><i class="fa-solid fa-calendar-days"></i> <span>Date Created:</span> {{$lead->created_at->format('Y-m-d')}} </li>

                          </ul>
                      </div>

                  </div>

                  <div class="deals_item_info">
                    <div class="main-info-sp1">

                      <h5><strong>Project Description:</strong></h5>
                      <p>{!!$lead->note!!}</p>

                      <h5><strong>Cover Letter:</strong></h5>
                      <p>{!!$lead->cover_letter!!}</p>
                    </div>
                  </div>

              </div>

          </div>
        </div>
        <!--  USER CARDS END -->
    </div>
  </div>
</div>

<!-- ROW END -->
<script>
function dataTableRowCheck2(id)
{
  //console.log(id);
  var id =id;



document.getElementById('mydata').value= id;
}

</script>
