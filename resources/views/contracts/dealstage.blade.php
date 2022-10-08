@extends('layouts.app')

@push('datatable-styles')

@endpush

@section('filter-section')
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
<br>
    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    id="datatableRange" placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <!-- DATE END -->


        <!-- STATUS START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.contracts.contractType')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="contract_type" id="contract_type" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($contractTypes as $item)
                        <option value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- STATUS END -->

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box>

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
                @if ($addContractPermission == 'all' || $addContractPermission == 'added')
                    <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#dealaddmodal"><i class="fa-solid fa-plus"></i></button>
                    @include('contracts.modals.dealaddmodal')
                @endif

            {{--  <form class="hidden" action="{{route('create-deal')}}" method="post">
                @csrf



                </form>--}}
              {{--  @if ($manageContractTemplatePermission == 'all' || $manageContractTemplatePermission == 'added')
                    <x-forms.link-secondary :link="route('contract-template.index')"
                        class="mr-3 mb-2 mb-lg-0 mb-md-0 float-left" icon="layer-group">
                        @lang('app.menu.contractTemplate')
                    </x-forms.link-secondary>
                @endif
                --}}
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
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
          <table id="dealtable"  class="table table-striped" style="width:100%">
        <thead>
            <tr>

                <th class="whitespace-nowrap">#</th>
                <th class="whitespace-nowrap">Short Code</th>
                <th class="whitespace-nowrap">Project Name</th>
                <th class="whitespace-nowrap">Amount</th>
                <th class="whitespace-nowrap">Client Name</th>
                  <th class="whitespace-nowrap">Project Manager</th>

                <th class="whitespace-nowrap">Deal Creation Date</th>
                  <th class="whitespace-nowrap">Client Form</th>
                <th class="whitespace-nowrap">Action</th>

            </tr>
        </thead>
        <tbody>


        </tbody>
    </table>



        </div>
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
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script>
$(document).ready(function() {
  $('#whatsapp').summernote();
});
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" charset="utf-8"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
<script type="text/javascript">
$(document).ready(function () {
    $('#dealtable').DataTable();
});
</script>


@push('scripts')


@endpush
