@extends('layouts.app')

@push('datatable-styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
@endpush

@section('filter-section')






@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">

            <div id="table-actions" class="d-flex align-items-center">
                <!-- @if ($addContractPermission == 'all' || $addContractPermission == 'added')
                    <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#dealaddmodal"><i class="fa-solid fa-plus"></i></button>
                    @include('contracts.modals.dealaddmodal')
                @endif -->


            </div>

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
        <!-- Add Task Export Buttons End -->


        <!-- Task Box Start -->

          <table id="dealstagetable"  class="table table-striped" style="width:100%">
        <thead>
            <!-- <tr>

                <th class="whitespace-nowrap">#</th>
                <th class="whitespace-nowrap">Short Code</th>
                <th class="whitespace-nowrap">Project Name</th>
                <th class="whitespace-nowrap">Budget</th>
                <th class="whitespace-nowrap">Deal Stage</th>
                <th class="whitespace-nowrap">Deal Status</th>

                <th class="whitespace-nowrap">Deal Creation Date</th>


            </tr> -->
        </thead>
        <tbody>
          <?php
          $lead_id= App\Models\Lead::where('id',$lead->id)->first();
          //dd($lead_id);
           ?>

          <!-- <tr>
            <td>#</td>
            <td>{{$deal->short_code}}</td>
            <td>{{$lead_id->project_name}}</td>
              <td>{{$lead_id->value}}</td>
              <td>{{$deal->deal_stage}}</td>
              <td>{{$deal->deal_status}}</td>
                <td>{{$deal->created_at}}</td>
          </tr> -->


        </tbody>
    </table>

    <h5>Deal Stage Status</h5>
    <hr>
    <x-cards.data-row :label="__('Deal ID :')" :value="$deal->short_code ?? '--'" />



    <x-cards.data-row :label="__('Project Name :')" :value="!empty($lead_id->project_name) ? mb_ucwords($lead_id->project_name) : '--'" />
   <x-cards.data-row :label="__('Project Budget :')" :value="!empty($lead_id->value) ? mb_ucwords($lead_id->value) : '--'" />
     @if($deal->deal_stage == 0)
     <?php
     $deal_stage = "Contract Made";
      ?>

         <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" />  <button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#dealstagemodal" type="button">Change</button>

         @elseif($deal->deal_stage == 1)
         <?php
         $deal_stage = "Requirements Define";
          ?>
         <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" />  <button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#dealstagemodal" type="button">Change</button>
         @elseif($deal->deal_stage == 2)
         <?php
          $deal_stage = "Requirements Define";

          ?>
           <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" />  <button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#dealstagemodal" type="button">Change</button>
           @else
          
           <?php
            $deal_stage = "Negotiation Started";

            ?>

            <x-cards.data-row :label="__('Deal Stage :')" :value="!empty($deal_stage) ? mb_ucwords($deal_stage) : '--'" />  <button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#dealstagemodal" type="button">Change</button>
            @endif
           <hr>
     <x-cards.data-row :label="__('Deal Status :')" :value="$deal->deal_status ?? '--'" />

    <x-cards.data-row :label="__('Won/Lost :')" :value="$deal->won_lost ?? '--'" />
       <x-cards.data-row :label="__('Comments :')" :value="$deal->comments ?? '--'" />
    <x-cards.data-row :label="__('Deal Creation Date :')" :value="$deal->created_at->format('Y-m-d') ?? '--'" />

@include('contracts.modals.dealstagemodal')
    <!-- <x-cards.data-row :label="__('modules.stripeCustomerAddress.state')" :value="$lead->state ?? '--'" />

    <x-cards.data-row :label="__('modules.stripeCustomerAddress.city')" :value="$lead->city ?? '--'" />

    <x-cards.data-row :label="__('modules.stripeCustomerAddress.postalCode')" :value="$lead->postal_code ?? '--'" /> -->
    <!-- <x-cards.data-row :label="__('modules.lead.address')" :value="$lead->address ?? '--'" /> -->




        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection
<script src="sweetalert2.all.min.js"></script>
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

@endpush
