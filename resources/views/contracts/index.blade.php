@extends('layouts.app')

@push('datatable-styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
@endpush

@section('filter-section')
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
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

        @if (!in_array('client', user_roles()))
        <!-- CLIENT START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.client')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="client" id="client" data-live-search="true" data-size="8">
                    @if (!in_array('client', user_roles()))
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($clients as $client)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                            value="{{ $client->id }}">{{ $client->name }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        @endif

        <!-- CLIENT END -->
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


              <button type="submit" class="btn btn-primary mr-3">Create Deal</button>
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
<?php
$deals= App\Models\Deal::all();

 ?>

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
          @foreach($deals as $deal)
          <?php

          $project= App\Models\Project::where('deal_id',$deal->id)->first();
          $pm= App\Models\PMProject::where('deal_id',$deal->id)->first();


        $pm_name= App\Models\User::where('id',$pm->pm_id)->first();
        $client_name= App\Models\User::where('id',$pm->client_id)->first();


          //dd($project);
           ?>
            <tr>

                <td>{{$loop->index+1}}</td>
                <td><a href="/account/contracts/{{$deal->id}}">{{$deal->deal_id}}</a></td>
                <td>
                    @if($project->project_status == 'pending')
                      {{$deal->project_name}}
                      @else

                  <a href="/account/projects/{{$project->id}}">{{$deal->project_name}}</a>
                  @endif

                </td>
                <td>{{$deal->amount}}</td>

                <td> <a href="/account/clients/{{$client_name->id}}">{{$deal->client_name}}</a></td>

                  <td>
                    @if($pm->deal_id != null)

                          <a href="/account/employees/{{$pm_name->id}}">{{$pm_name->name}}</a>
                    @endif


                    </td>



                <td>{{$deal->deal_creation_date}}</td>
                <td>
                  @if($deal->submission_status == 'Submitted')
                  <span class="badge bg-success" style="color:white !important;">Submitted</span>
                  @elseif($deal->submission_status == 'Awaiting for client Response')
                    <span class="badge bg-warning">Awaiting for client Response</span>
                  @else


                                      {{--  <a class="btn btn-danger" href="/deals/{{$key}}"><i class="fa-solid fa-trash"></i></a>--}}
                                      {{-- <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#clientformModal{{$deal->id}}"><i class="fa-solid fa-eye"></i></button>--}}
                                      <a class="btn btn-success" href="/deals/details/{{$deal->id}}"><i class="fa-solid fa-eye"></i></a>
                                        @endif
                                  </td>
                <td>
                  <div class="dropdown">
                      <button class="btn f-14 px-0 py-0 text-dark-grey" type="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-options-vertical icons"></i>
                          <!-- <i class="fa-thin fa-square-ellipsis-vertical"></i> -->
                      </button>

                      <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                          aria-labelledby="dropdownMenuLink" tabindex="0">

                              <a class="dropdown-item"
                                  href="deal-url/{{$deal->id}}"><i class="fa-solid fa-file"></i> @lang('Client Form')</a>
                          <a class="dropdown-item"
                              href="/deals/details/edit/{{$deal->id}}"><i class="fa-solid fa-pen-to-square"></i> @lang('Edit')</a>
                              <a class="dropdown-item"
                                  href="/deals/details/edit/{{$deal->id}}"><i class="fa-solid fa-eye"></i> @lang('View')</a>
                                  <a class="dropdown-item"
                                      href="contracts/deal-delete/{{$deal->id}}"><i class="fa-solid fa-trash"></i> @lang('Delete')</a>

                      </div>
                  </div>


                  @if($deal->submission_status == "Awaiting for client Response")
                    {{--  <a class="btn btn-success" href="/deals/details/{{$deal->id}}"><i class="fa-solid fa-eye"></i></a>--}}
                      @endif

                  {{--<a class="btn btn-info mr-3 openRightModal{{$deal->id}}" href="#"><i class="fa-solid fa-pen-to-square"></i></a>--}}

                  {{--<a class="btn btn-danger" href="contracts/deal-delete/{{$deal->id}}"><i class="fa-solid fa-trash"></i></a> --}}
                    @include('contracts.modals.editmodal')

                </td>
            </tr>
              @include('contracts.modals.clientformmodal')
            @endforeach

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



@push('scripts')
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js" charset="utf-8"></script>
<script type="text/javascript">
$(document).ready(function () {
    $('#dealtable').DataTable();
});
</script>


    <script>

        $('#contracts-table').on('preXhr.dt', function(e, settings, data) {
            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var contract_type = $('#contract_type').val();
            var client = $('#client').val();
            var searchText = $('#search-text-field').val();
            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['contract_type'] = contract_type;
            data['client'] = client;
            data['searchText'] = searchText;
        });
        const showTable = () => {
            window.LaravelDataTables["contracts-table"].draw();
        }

        $('#client, #contract_type, #search-text-field').on('change keyup', function() {
            if ($('#contract_type').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#client').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#search-text-field').val() != "") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else {
                $('#reset-filters').addClass('d-none');
                showTable();
            }
        });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });

        $('#quick-action-type').change(function() {
            const actionValue = $(this).val();
            if (actionValue != '') {
                $('#quick-action-apply').removeAttr('disabled');

                if (actionValue == 'change-status') {
                    $('.quick-action-field').addClass('d-none');
                    $('#change-status-action').removeClass('d-none');
                } else {
                    $('.quick-action-field').addClass('d-none');
                }
            } else {
                $('#quick-action-apply').attr('disabled', true);
                $('.quick-action-field').addClass('d-none');
            }
        });

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
            var id = $(this).data('contract-id');
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
                    var url = "{{ route('contracts.destroy', ':id') }}";
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
            var rowdIds = $("#contracts-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('contracts.apply_quick_action') }}?row_ids=" + rowdIds;

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

@endpush
