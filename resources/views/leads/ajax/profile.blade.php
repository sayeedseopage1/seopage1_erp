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
    <h4 class="f-18 f-w-500 mb-0">Lead Details</h4>
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
                        $bid_value= $lead->bid_value. $currency->currency_symbol .' - '. $lead->bid_value2. $currency->currency_symbol;

                         ?>
                          <ul>
                              <li><i class="fa-solid fa-layer-group"></i> <span>Project Name:</span> {{ucwords($lead->client_name)}} </li>

                              <li><i class="fa-solid fa-link"></i> <span>Project Link:</span> <a href="{{$lead->project_link}}" target="_blank">{{$lead->project_link}}</a> </li>
                              @if($lead->deal_status == 1)
                              <?php
                              $deal= App\Models\DealStage::where('lead_id',$lead->id)->first();
                              $mystring = $deal->message_link;

                                  $output = str_replace('<br>',' ', $mystring);

                                  $output_final= (trim($output));
                                  $data= explode("  ", $output_final);
                               ?>
                              <li><i class="fa-solid fa-message"></i> <span>Message Thread:</span>
                                <br>
                                @foreach($data as $message)

                                 <span>{{$loop->index+1}}.</span><a href="{{$message}}" target="_blank">{{$message}} </a>
                                 <br>
                                 @endforeach
                               </li>
                              <li><i class="fa-solid fa-user"></i> <span>Client Username:</span> {{ucwords($deal->client_username)}} </li>
                              @if($deal->client_name != null)
                              <li><i class="fa-solid fa-user"></i> <span>Client Name:</span> {{ucwords($deal->client_name)}} </li>
                              @else
                              <li><i class="fa-solid fa-user"></i> <span>Client Name:</span>Not Available</li>


                              @endif

                              @endif
                              @if($lead->project_id != null)
                              <li><i class="fa-solid fa-file-lines"></i> <span>Project ID:</span> {{$lead->project_id}} </li>
                              @else
                              <li><i class="fa-solid fa-file-lines"></i> <span>Project ID:</span> Not Available </li>
                              @endif
                              @if($lead->project_type != null)
                              <li><i class="fa-solid fa-file-lines"></i> <span>Project Type:</span> {{$lead->project_type}} </li>
                              @else
                              <li><i class="fa-solid fa-file-lines"></i> <span>Project Type:</span> Not Available </li>
                              @endif

                              <li><i class="fa-solid fa-globe"></i> <span>Client Country:</span> {{ucwords($lead->country)}} </li>
                              @if($lead->deal_status == 0)
                              <li><i class="fa-solid fa-square-check"></i> <span>Status:</span> <b class="ssp1" style="background: #D30000;"></b> Not converted to deal </li>
                              @else
                                <li><i class="fa-solid fa-square-check"></i> <span>Status:</span> <b class="ssp1" style="background: #28a745;"></b> Converted to deal </li>
                              @endif
                              <li><i class="fa-regular fa-image"></i> <span>Bids Insight Page Screenshot (Full):</span> <a href="{{$lead->insight_screenshot}}" target="_blank">{{$lead->insight_screenshot}}</a> </li>
                              @if($lead->bidpage_screenshot != null)
                              <li><i class="fa-regular fa-image"></i> <span>Bid Page Screenshot (Full):</span> <a href="{{$lead->bidpage_screenshot}}"target="_blank">{{$lead->bidpage_screenshot}}</a> </li>
                              @else
                              <li><i class="fa-regular fa-image"></i> <span>Bid Page Screenshot (Full):</span> <a>Not Submitted</a> </li>

                              @endif

                              <li><i class="fa-regular fa-image"></i> <span>Project Page Screenshot (Full):</span> <a href="{{$lead->projectpage_screenshot}}"target="_blank">{{$lead->projectpage_screenshot}}</a> </li>

                              <li><i class="fa-solid fa-sack-dollar"></i> <span>Bid value:	</span> {{$value}} </li>

                              <li><i class="fa-solid fa-sack-dollar"></i> <span>Project Budget:</span> {{$bid_value}} </li>

                          </ul>
                            @include('contracts.modals.dealstmodal')
                      </div>


                      <div class="deals_item_lists">
                          <p>Actions</p>
                          <ul>
                            @if($lead->deal_status == 0)
                            <?php
                            $deal= App\Models\DealStage::where('lead_id',$lead->id)->first();

                             ?>
                              <li><i class="fa-solid fa-shuffle"></i> <a href="#" data-toggle="modal" data-target="#dealstmodal" onclick="dataTableRowCheck2(' {{$lead->id}} ')" style="color: #333;font-weight: 600;font-size: 13px;">Convert To Deal </a> </li>

                              @else
                                <li><i class="fa-solid fa-link"></i> <a href="/account/deals/{{$deal->id}}" style="color: #333;font-weight: 600;font-size: 13px;">View Deal Stage</a> </li>
                              @endif
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


                        @if($lead->explanation)
                            <h5><strong>Explanation:</strong></h5>
                            <p>{!!$lead->explanation!!}</p>
                        @else
                            <h5><strong>Explanation:</strong></h5>
                            <p class="text-danger text-center my-5">Explanation Not Submitted!</p>
                        @endif
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

@push('scripts')
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>



    <script>
        $('#leads-table').on('preXhr.dt', function(e, settings, data) {

            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var searchText = $('#search-text-field').val();
            var type = $('#type').val();
            var followUp = $('#followUp').val();
            var agent = $('#filter_agent_id').val();
            var category_id = $('#filter_category_id').val();
            var source_id = $('#filter_source_id').val();
            var source_id = $('#filter_source_id').val();
            var date_filter_on = $('#date_filter_on').val();

            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['searchText'] = searchText;
            data['type'] = type;
            data['followUp'] = followUp;
            data['agent'] = agent;
            data['category_id'] = category_id;
            data['source_id'] = source_id;
            data['date_filter_on'] = date_filter_on;
        });

        const showTable = () => {
            window.LaravelDataTables["leads-table"].draw();
        }



        $('#quick-action-apply').click(function() {
            const actionValue = $('#quick-action-type').val();
            if (actionValue == 'delete') {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    text: "@lang('messages.recoverRecord')",
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmDelete')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: 'btn btn-primary mr-3',
                        cancelButton: 'btn btn-secondary'
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        applyQuickAction();
                    }
                });

            } else {
                applyQuickAction();
            }
        });

        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('id');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
              //console.log('id');
                if (result.isConfirmed) {
                    var url = "{{ route('leads.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                showTable();
                            }
                        }
                    });
                }
            });
        });

        const applyQuickAction = () => {
            var rowdIds = $("#leads-table input:checkbox:checked").map(function() {
                return $(this).val();
                //console.log= ('rowIds');
            }).get();


            var url = "{{ route('leads.apply_quick_action') }}?row_ids=" + rowdIds;

            $.easyAjax({
                url: url,
                container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#quick-action-apply",
                data: $('#quick-action-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            })
        };

        $('#leads-table').on('change', '.change-status', function() {
            var url = "{{ route('leads.change_status') }}";
            var token = "{{ csrf_token() }}";
            var id = $(this).data('task-id');
            var status = $(this).val();

            if (id != "" && status != "") {
                $.easyAjax({
                    url: url,
                    type: "POST",
                    data: {
                        '_token': token,
                        taskId: id,
                        status: status,
                        sortBy: 'id'
                    },
                    success: function(data) {
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                });

            }
        });

        function changeStatus(leadID, statusID) {

            var url = "{{ route('leads.change_status') }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                type: 'POST',
                url: url,
                data: {
                    '_token': token,
                    'leadID': leadID,
                    'statusID': statusID
                },
                success: function(response) {
                    if (response.status == "success") {
                        $.easyBlockUI('#leads-table');
                        $.easyUnblockUI('#leads-table');
                        showTable();
                        resetActionButtons();
                        deSelectAll();
                    }
                }
            });
        }

        function followUp(leadID) {
            var url = '{{ route('leads.follow_up', ':id') }}';
            url = url.replace(':id', leadID);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        }

        $('body').on('click', '#add-lead', function() {
            window.location.href = "{{ route('lead-form.index') }}";
        });

        $( document ).ready(function() {
            @if (!is_null(request('start')) && !is_null(request('end')))
            $('#datatableRange').val('{{ request('start') }}' +
            ' @lang("app.to") ' + '{{ request('end') }}');
            $('#datatableRange').data('daterangepicker').setStartDate("{{ request('start') }}");
            $('#datatableRange').data('daterangepicker').setEndDate("{{ request('end') }}");
                showTable();
            @endif
        });

    </script>

    <script>
  function dataTableRowCheck2(id)
  {
     var id = id;

  document.getElementById('mydata').value= id;
  }
  </script>

  <script>




          $(document).ready(function() {
            quillImageLoad('#comments');



              $("#lead-convert").validate({


                  rules: {
                      client_username: {
                          required: true,

                      },

                      profile_link: {
                        url:true,
                        required: true,

                      },
                      message_link: {
                        url:true,
                        required: true,

                      },

                      comments: {
                          required: true,
                          minlength: 10
                      },


                  },
                  messages: {
                      client_username: {
                          required: "Client username is required"

                      },

                      profile_link: {
                          required: "Profile link is required",
                          url: "Link must be a valid url"

                      },
                      message_link: {
                          required: "Message thread link is required",
                          url: "Link must be a valid url"

                      },
                    comments: {
                          required: "Comment field is required",
                         minlength: "Comments must be minimum 10 characters"
                      },


                  }
              });

          });


          $('#lead-convert-button').click(function() {
  var commentsElement = document.getElementById('comments');
  if (commentsElement && commentsElement.children.length > 0) {
    var note3 = commentsElement.children[0].innerHTML;
    document.getElementById('comments-text').value = note3;
  }
});





      </script>

@endpush
