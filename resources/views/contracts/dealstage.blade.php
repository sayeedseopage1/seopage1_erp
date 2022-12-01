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
        color: #41b4e1;
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
        color: #41b4e1;
    }
    .details-seopage1 p{
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #6a6a6a;
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


    .active{
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
    <!-- CONTENT WRAPPER START -->
{{--
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">



            @if (!in_array('client', user_roles()))
                <x-datatable.actions>
                    <div class="select-status mr-3 pl-3">
                        <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                            <option value="">@lang('app.selectAction')</option>
                            <option value="delete">@lang('app.delete')</option>
                        </select>
                    </div>
                </x-datatable.actions>
            @endif

        </div>
        @if(Session::has('status_updated'))
            <div class="alert alert-success show mb-2" role="alert">  {{Session::get('status_updated')}}</div>

            @endif
        <!-- Add Task Export Buttons End -->


        <!-- Task Box Start -->

        <?php
          $lead_id= App\Models\Lead::where('id',$lead->id)->first();
          //dd($lead_id);
           ?>
           <div class="d-flex justify-content-center">
             <h3 class="card-header bg-white border-0 text-center d-flex justify-content-between p-20 text-center">Deal Stage Status</h3>
           </div>


    <div class="card">
  <div class="card-body">





  <strong style="font-size:20px;">  <x-cards.data-row :label="__('Deal ID :')" :value="$deal->short_code ?? '--'" /></strong>

    <?php
    $currency=App\Models\Currency::where('id',$lead_id->original_currency_id)->first();
    $value= $lead_id->actual_value. $currency->currency_symbol;
    $bid_value= $lead_id->bid_value. $currency->currency_symbol;
     ?>

  <strong style="font-size:20px;">  <x-cards.data-row :label="__('Project Name :')" :value="!empty($lead_id->client_name) ? mb_ucwords($lead_id->client_name) : '--'" /></strong>
  <strong style="font-size:20px;"> <x-cards.data-row :label="__('Project Budget :')" :value="!empty($lead_id->value) ? mb_ucwords($value) : '--'" /></strong>
     @if($deal->deal_stage == 0)
     <?php
     $deal_stage = "Contract Made";
      ?>

         <strong style="font-size:20px;"><x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" /></strong>

         @elseif($deal->deal_stage == 1)
         <?php
         $deal_stage = "Requirements Defined";
          ?>
      <strong style="font-size:20px;">   <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" /></strong>
         @elseif($deal->deal_stage == 2)
         <?php
          $deal_stage = "Proposal Made";

          ?>
        <strong style="font-size:20px;">   <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" /></strong>
           @else

           <?php
            $deal_stage = "Negotiation Started";

            ?>

        <strong style="font-size:20px;">    <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" /></strong>
            @endif
           <hr>
           @if($deal->deal_status == 'pending')
           @if($deal->won_lost == 'Yes')

            <strong style="font-size:20px;">  <x-cards.data-row :label="__('Deal Status :')" :value="''" /><h3 style="color:green;">Won</h3></strong>
              @else

            <strong style="font-size:20px;">  <x-cards.data-row :label="__('Deal Status :')" :value=" ''" /></strong>
                <div class="row">
                   <div class="col-md-2">
                    <div class="form-check">
                      <label for="input-state-2" class="form-check-label">Qualified <span style="color:red;">*<span></label>
                 <input type="radio"  name="deal_stage" value="yes"/>
               </div>
              </div>
              <div class="col-md-2">
              <div class="form-check">
                  <label for="input-state-2" class="form-check-label">Lost<span style="color:red;">*<span></label>

              <input type="radio"  name="deal_stage" value="no" />
              </div>
              </div>


<br>

<!-- <input type='hidden' id='yes' name='yes' placeholder='If yes, explain:'/>


<input type='hidden' id='other3' name='other3' placeholder='other 3'> -->
@include('contracts.modals.dealqualifymodal')
@include('contracts.modals.deallostmodal')




</div>
 @endif
 @else

  <strong style="font-size:20px;">  <x-cards.data-row :label="__('Deal Status :')" :value="''" /><h3 style="color:red;">Lost</h3></strong>
 @endif
<br>



      <strong style="font-size:20px;">   <x-cards.data-row :label="__('Comments :')" :value="
         ''" /></strong>{!!$deal->comments!!}
      <strong style="font-size:20px;"><x-cards.data-row :label="__('Deal Converted On :')" :value="$deal->created_at->format('Y-m-d') ?? '--'" /></strong>

@include('contracts.modals.dealstagemodal')

    <!-- <x-cards.data-row :label="__('modules.stripeCustomerAddress.state')" :value="$lead->state ?? '--'" />

    <x-cards.data-row :label="__('modules.stripeCustomerAddress.city')" :value="$lead->city ?? '--'" />

    <x-cards.data-row :label="__('modules.stripeCustomerAddress.postalCode')" :value="$lead->postal_code ?? '--'" /> -->
    <!-- <x-cards.data-row :label="__('modules.lead.address')" :value="$lead->address ?? '--'" /> -->

<div>
  <div>


        <!-- Task Box End -->
    </div>
    --}}
    <!-- CONTENT WRAPPER END -->

    <?php
      $lead_id= App\Models\DealStage::where('lead_id',$lead->id)->first();
      $currency=App\Models\Currency::where('id',$lead->original_currency_id)->first();
      $value= $lead_id->actual_value. $currency->currency_symbol;
      $bid_value= $lead_id->bid_value. $currency->currency_symbol;
      //dd($lead_id);
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
                                    <h4><i class="fa-solid fa-handshake"></i> <span>{{$lead_id->short_code}}</span> </h4>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-6 col-md-4">
                            <div class="info_dets">
                                <h6>Lead Converted On <br><i class="fa-solid fa-calendar-days"></i>
                                <span> {{$lead_id->created_at->format('d-m-Y')}} {{$lead_id->created_at->format('h:i:s A')}}</span> </h6>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4">
                            <div class="info_dets">
                                <h6>Deal Won/Lost Date <br><i class="fa-solid fa-calendar-days"></i>
                                  @if($lead_id->won_lost != null)
                                <span> {{$lead_id->updated_at->format('d-m-Y')}} {{$lead_id->updated_at->format('h:i:s A')}}</span> </h6>
                                @else
                                <span> No Information</span> </h6>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="row pb-3">
                        <div class="col-sm-6 col-md-4 text-start">
                            <div class="info_dets">
                                <h5>Deal Value {{$currency->currency_symbol}}<span>{{$lead->actual_value}}</span> </h5>
                            </div>
                        </div>



                        <div class="col-sm-6 col-md-4 text-center">
                            <div class="info_dets">
                                @if($lead_id->won_lost != null)
                                @if($lead_id->won_lost == 'Yes')
                                <h5>Deal Closing Value {{$currency->currency_symbol}}<span>{{$lead->actual_value}}</span> </h5>
                                @else
                                <h5 style="color:red;"> </h5>

                                @endif
                                  @else

                                  @endif
                            </div>
                        </div>
                        @if($lead_id->won_lost == null)
                        @if($lead_id->deal_stage == 3)
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
                        @if($lead_id->won_lost == 'Yes')
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
                            <div class="deal active">
                                0 Days
                            </div>
                            <h3>Contact Made</h3>
                        </div>
                        @if($lead_id->deal_stage == 0)
                        <div class="col-md-3 nopadding">
                            <div class="deal"  data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">
                                10 Days
                            </div>
                            <h3>Requirments Defined</h3>
                        </div>
                        @if($lead_id->deal_stage == 0)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal active" >
                                10 Days
                            </div>
                            <h3>Requirments Defined</h3>
                        </div>


                        @endif
                        @if($lead_id->deal_stage == 1)

                        <div class="col-md-3 nopadding">
                            <div class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">
                                12 Days
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @if($lead_id->deal_stage == 1)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @elseif($lead_id->deal_stage == 2 || $lead_id->deal_stage == 3)
                        <div class="col-md-3 nopadding">
                            <div class="deal active">
                                12 Days
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal">
                                12 Days
                            </div>
                            <h3>Proposal Made</h3>
                        </div>
                        @endif




                        @if($lead_id->deal_stage == 2)

                        <div class="col-md-3 nopadding">
                            <div class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2" data-bs-whatever="@mdo">
                                15 Days
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>
                        @if($lead_id->deal_stage == 2 && $lead_id->deal_stage != 1 && $lead_id->deal_stage != 0 && $lead_id->deal_stage != 3)
                        @include('contracts.modals.dealqualifymodal2')

                        @endif
                        @elseif($lead_id->deal_stage == 3)
                        <div class="col-md-3 nopadding">
                            <div class="deal active">
                                15 Days
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>
                        @else
                        <div class="col-md-3 nopadding">
                            <div class="deal">
                                15 Days
                            </div>
                            <h3>Negotiation Started</h3>
                        </div>

                        @endif
                    </div>

                    <!-- details  -->



                      <div class="details-seopage1">
                        <h4>Project Name :</h4>
                        <p>{{$lead->client_name}}</p>
                      </div>

                      <?php
                          $deal_stages= App\Models\DealStageChange::where('lead_id',$lead->id)->get();
                        //  dd($deal_stages);

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
