@extends('layouts.app')



@section('filter-section')






@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')

@push('styles')

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
crossorigin="anonymous" referrerpolicy="no-referrer"/>
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet" />
<link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}">
<style>
    .seopage_card {
        box-shadow: rgba(0, 0, 0, .5) 0px 10px 50px;
        padding: 5%;
        /* margin: 5% auto; */
        display: block;
        background:white;
        /* border-radius: 30px; */
        /* margin-left: 1%; */
        /* margin-right: 1%; */
    }
    .details-seopage1 {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
    }
    .info_dets h5{
        font-family: Poppins;
        font-size: 22px;
        font-weight: normal;
        line-height: 1.48;
        text-align: left;
        color: #333;
    }
    .info_dets h6 {
        font-family: Poppins;
        font-size: 17px;
        font-weight: 600;
        line-height: 1.48;
        color: #333;
    }
    .info_dets a {
        padding: 3px 14px;
        font-size: 12px;
        font-weight: 500;
    }
    .details-seopage1 h4{
        font-family: Poppins;
        font-size: 20px;
        font-weight: normal;
        line-height: 1.48;
        text-align: left;
        color: #333;
    }
    .details-seopage1 p{
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #333;
    }
    #textcopyseopage1 a{
        font-size: 16px;
        font-weight: normal;
        line-height: 1.5;
        text-align: left;
        color: #41b4e1;
        text-decoration: none;
    }
    .details-seopage1 p span {
        font-weight: 500;
        color: #333;
    }


    .deal {
        background: #eee;
        padding: 4%;
        color: #888;
        display: flex;
         align-content: center;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
    }


    .active2{
        background: #119143;
        color: #fff;
    }
    .nopadding h3 {
        font-size: 16px;
        color: #444;
        margin: 0;
        padding: 3px;
        text-align: center;
    }

    .nopadding {
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
@endpush


    <?php

      $currency=App\Models\Currency::where('id',$deal->original_currency_id)->first();
      //$value= $deal->actual_amount. $currency->currency_symbol;
    //  $bid_value= $deal->bid_value. $currency->currency_symbol;
      //dd($deal);
       ?>
    <section>
        <div class="container-fluid">
            <div class="row">


                <div class="col-md-12 seopage_card">
                    <!-- info  -->
                    <div class="row pb-3">
                        <div class="col-sm-6 col-md-4">
                            <div class="info_dets">
                                <div class="info_dets">
                                    <!-- <h6><i class="fa-solid fa-user"></i> <span>Sadik Istaik</span><i class="fa-solid fa-tags"></i> </h6>  -->
                                    <h4><i class="fa-solid fa-handshake"></i> <span>{{$deal->short_code}}</span> </h4>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-6 col-md-4">
                            <div class="info_dets">
                                <h6>Lead Converted On/Deal Created On <br><i class="fa-solid fa-calendar-days"></i>
                                <span> {{$deal->created_at->format('d-m-Y')}} ({{$deal->created_at->format('h:i:s A')}}</span> </h6>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="info_dets">
                                <h6>Deal Won/Lost Date <br><i class="fa-solid fa-calendar-days"></i>
                                  @if($deal->won_lost != null)
                                <span> {{$deal->updated_at->format('d-m-Y')}} ({{$deal->updated_at->format('h:i:s A')}})</span> </h6>
                                @else
                                <span> No Information</span> </h6>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="row pb-3">
                        <div class="col-sm-6 col-md-4 text-start">
                            <div class="info_dets">

                                <h5>Deal Value {{$currency->currency_symbol}}<span>{{$deal->actual_amount}}</span> </h5>

                            </div>
                        </div>



                        <div class="col-sm-6 col-md-4 text-center">
                            <div class="info_dets">
                                @if($deal->won_lost != null)
                                @if($deal->won_lost == 'Yes')

                                <h5>Deal Closing Value {{$currency->currency_symbol}}<span>{{$deal->actual_amount}}</span> </h5>

                                @else
                                <h5 style="color:red;"> </h5>

                                @endif
                                  @else

                                  @endif
                            </div>
                        </div>
                        @if($deal->won_lost == null)
                        @if($deal->deal_stage == 3)
                        <div class="col-sm-6 col-md-4 text-end">
                            <div class="info_dets" style="margin-top: -5px;">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#dealaddstagemodal" data-bs-whatever="@mdo" class="btn btn-success">Won</a>

                                <a href="#" data-bs-toggle="modal" data-bs-target="#lostmodal" data-bs-whatever="@mdo" class="btn btn-danger">Lost</a>
                            </div>
                        </div>
                          @include('contracts.modals.dealaddstagemodal')
                        @include('contracts.modals.deallostmodal')
                        @endif
                        @else
                        @if($deal->won_lost == 'Yes')
                          <div class="col-sm-6 col-md-4 text-end">
                            <h3 style="color:green;">Won</h3>
                          </div>

                      @else
                      <div class="col-sm-6 col-md-4 text-end">
                        <h3 style="color:red;">Lost</h3>
                      </div>
                      @endif
                      @endif

                    </div>

                    <div class="row pb-4">
                        <div class="col-md-3 nopadding">
                            <div class="deal active2">
                              <?php


                               $lead_converted_date= $deal->created_at->diffForHumans();

                                ?>
                                {{$lead_converted_date}}
                            </div>
                            <h3>Contact Made</h3>
                        </div>
                        @if($deal->deal_stage == 0)
                        <div class="col-md-3 nopadding">
                            <div class="deal"  data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">

                                0 Days
                            </div>
                            <h3>Requirments Defined</h3>
                        </div>
                        @if($deal->deal_stage == 0)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal active2" >
                              <?php


                                 $lead_converted_to_req_def= App\Models\DealStageChange::where('deal_id',$deal->short_code)->where('deal_stage_id',1)->first();
                                 $lead_converted_to_req= $lead_converted_to_req_def->created_at->diffForHumans();



                               ?>
                              {{$lead_converted_to_req}}
                            </div>
                            <h3>Requirments Defined</h3>
                        </div>


                        @endif
                        @if($deal->deal_stage == 1)

                        <div class="col-md-3 nopadding">
                            <div class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">
                                0 Days
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @if($deal->deal_stage == 1)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @elseif($deal->deal_stage == 2 || $deal->deal_stage == 3)
                        <div class="col-md-3 nopadding">
                            <div class="deal active2">
                              <?php



                                 $lead_converted_to_prop_def= App\Models\DealStageChange::where('deal_id',$deal->short_code)->where('deal_stage_id',2)->first();
                                 $lead_converted_to_prop= $lead_converted_to_prop_def->created_at->diffForHumans();



                               ?>
                                {{$lead_converted_to_prop}}
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal">
                                0 Days
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @endif




                        @if($deal->deal_stage == 2)

                        <div class="col-md-3 nopadding">
                            <div class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">
                                0 Days
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>
                        @if($deal->deal_stage == 2 && $deal->deal_stage != 1 && $deal->deal_stage != 0 && $deal->deal_stage != 3)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @elseif($deal->deal_stage == 3)
                        <div class="col-md-3 nopadding">
                            <div class="deal active2">
                              <?php



                                 $lead_converted_to_neg_def= App\Models\DealStageChange::where('deal_id',$deal->short_code)->where('deal_stage_id',3)->first();
                                 $lead_converted_to_neg= $lead_converted_to_neg_def->created_at->diffForHumans();


                               ?>
                                {{$lead_converted_to_neg}}
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal">
                                0 Days
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>

                        @endif
                    </div>

                    <!-- details  -->



                      <div class="details-seopage1">
                        <h4>Project Name :</h4>
                        <p>{{$deal->project_name}}</p>
                      </div>

                      <?php
                          $deal_stages= App\Models\DealStageChange::where('deal_id',$deal->short_code)->get();


                       ?>
                       @foreach($deal_stages as $stage)
                       @php
                       if($stage->deal_stage_id == 0)
                       {
                         $status= "Contact Made";

                       }
                       elseif($stage->deal_stage_id == 1)
                       {
                          $status= "Requirements Defined";
                       }
                       elseif($stage->deal_stage_id == 2)
                       {
                           $status= "Proposal Made";
                       }
                       else
                       {
                         $status= "Negotiation Started";
                       }
                       @endphp
                      <div class="details-seopage1">
                        <h4>Comments ({{$status}}) :</h4>
                        <p>{!!$stage->comments!!}</p>
                      </div>
                      @endforeach

                      <!-- <div class="details-seopage1">
                        <div class="row">
                            <div class="col-md-5">
                                <p><span>Deal Convert On : <i class="fa-regular fa-calendar-days"></i> </span> 23 January, 2023</p>
                            </div>
                            <div class="col-md-5">
                                <p><span>Time : <i class="fa-regular fa-clock"></i></span> 10:30 PM</p>
                            </div>
                        </div>
                      </div> -->

                </div>


                <!-- modal popup -->



            </div>
        </div>
    </section>




@endsection
<script src="sweetalert2.all.min.js"></script>
@if(session('status_updated'))
        <script>
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: '{{session('Lead Successfully Added')}}'
            })
        </script>
    @endif
<script type="text/javascript">
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})

</script>

<script src="https://code.jquery.com/jquery-3.5.1.js" charset="utf-8"></script>



@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function () {
      $("#comments1").summernote();
  });

  </script>
<script type="text/javascript">
$(document).ready(function () {
    $('#dealstagetable').DataTable();
});
</script>
<script type="text/javascript">
function yesnoCheck() {
    yes1 = document.getElementById('yes')
    //yes2 = document.getElementById('acc')

    no1 = document.getElementById('other3')
  //  no2 = document.getElementById('other4')

    if (document.getElementById('yesCheck').checked) {
        yes1.type  = 'text';
        no1.type =  'hidden';
    } else {
        no1.type =  'text';
        yes1.type =  'hidden';
    }

}

</script>
<script type="text/javascript">
$('input[name="deal_stage"]').change(function() {
   if($(this).is(':checked') && $(this).val() == 'yes') {
        $('#qualifymodal').modal('show');
   }
});
$('input[name="deal_stage"]').change(function() {
   if($(this).is(':checked') && $(this).val() == 'no') {
        $('#lostmodal').modal('show');
   }
});

</script>



@endpush
