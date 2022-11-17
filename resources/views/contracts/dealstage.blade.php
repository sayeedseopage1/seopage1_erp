@extends('layouts.app')



@section('filter-section')






@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')

@push('styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
@endpush
    <!-- CONTENT WRAPPER START -->

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
    <!-- CONTENT WRAPPER END -->

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
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js" charset="utf-8"></script>



@push('scripts')
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
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
