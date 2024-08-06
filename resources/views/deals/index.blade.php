@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')

@endpush

@section('filter-section')
    {{-- <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}"> --}}

    {{-- <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    id="datatableRange" placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <!-- DATE END -->


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

        <!-- CLIENT START -->
        <div
            class="select-box d-flex py-2 {{ !in_array('client', user_roles()) ? 'px-lg-2 px-md-2 px-0' : '' }}  border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.clientName')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="client_id" id="client_id" data-live-search="true"
                    data-size="8">
                    @if (!in_array('client', user_roles()))
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($clients as $client)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                            value="{{ $client->id }}">{{ ucfirst($client->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <!-- CLIENT END -->

        <!-- CLOSED BY START -->

        <div
            class="select-box d-flex py-2 {{ !in_array('client', user_roles()) ? 'px-lg-2 px-md-2 px-0' : '' }}  border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('Closed By')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="closed_by" id="closed_by" data-live-search="true"
                    data-size="8">
                    <option selected value="all">@lang('All')</option>
                    @php
                        $project_manager = App\Models\User::whereIn('role_id', ['1', '7', '8'])->get();
                    @endphp
                    @foreach ($project_manager as $value)
                        <option value="{{ $value->id }}">{{ ucfirst($value->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <!-- CLOSED BY END -->

        <!-- STATUS START -->

        <div class="select-box d-flex py-2 {{ !in_array('client', user_roles()) ? 'px-lg-2 px-md-2 px-0' : '' }} border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('Status')</p>
            <div class="select-status">
                <select class="form-control select-picker status" name="status" id="status" data-live-search="true" data-size="8">
                    <option selected value="all">@lang('All')</option>
                    <option value="0">@lang('Contact Made')</option>
                    <option value="1">@lang('Qualified')</option>
                    <option value="2">@lang('Requirements Defined')</option>
                    <option value="3">@lang('Proposal Made')</option>
                    <option value="4">@lang('Negotiation Started')</option>
                    <option value="5">@lang('Milestone Breakdown')</option>
                    <option value="won">@lang('Won')</option>
                    <option value="lost">@lang('Lost')</option>
                </select>
            </div>
        </div>

        <!-- STATUS END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box> --}}


    <!-- Deals Table filter  -->
    <div id="dealTableFilterBarContainer"></div>
@endsection

@php
$addContractPermission = user()->permission('add_contract');
$manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">


    <!-- Table container -->
    <div id="dealPageContainer">`
        <!-- Code here... -->
    </div>

        
        {{-- <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">

            <div id="table-actions" class="d-flex align-items-center">
                @if ($addContractPermission == 'all' || $addContractPermission == 'added')
                @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 7)
                    <x-forms.link-primary :link="route('deals.create')" class="mr-3" icon="plus">
                        @lang('Create Deal')
                    </x-forms.link-primary>
                    {{-- <x-forms.link-secondary :link="route('deals.create')" class="mr-3" icon="user">
                        @lang('Authorization Request')
                    </x-forms.link-secondary> --}}
                    {{-- @endif --}}
                {{-- @endif --}}

              {{--  @if ($manageContractTemplatePermission == 'all' || $manageContractTemplatePermission == 'added')
                    <x-forms.link-secondary :link="route('contract-template.index')"
                        class="mr-3 mb-2 mb-lg-0 mb-md-0 float-left" icon="layer-group">
                        @lang('app.menu.contractTemplate')
                    </x-forms.link-secondary>
                @endif --}}
            {{-- </div> --}} 

            {{-- @if (!in_array('client', user_roles()))
                <x-datatable.actions>
                    <div class="select-status mr-3 pl-3">
                        <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                            <option value="">@lang('app.selectAction')</option>
                            <option value="delete">@lang('app.delete')</option>
                        </select>
                    </div>
                </x-datatable.actions>
            @endif --}}

{{-- 
        </div>
        <div class="d-flex justify-content-end">
          <div class="btn-group  ml-0 ml-lg-3 ml-md-3" role="group">
              <a href="{{ route('deals.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                  data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

              <a href="{{ route('dealboards.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip" data-original-title="@lang('modules.lead.kanbanboard')"><i class="side-icon bi bi-kanban"></i></a>
          </div>

        </div> --}}


        <!-- Add Task Export Buttons End -->

        <!-- Task Box Start -->
        {{-- <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

        </div> --}}
        <!-- Task Box End -->
    {{-- </div> --}}
    <!-- CONTENT WRAPPER END -->

@endsection


{{-- @push('scripts')
    @include('sections.datatable_js')
    <script>

        $('#deals-table').on('preXhr.dt', function(e, settings, data) {
            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();
            var clientID = $('#client_id').val();
            var closed_by = $('#closed_by').val();
            var status = $('#status').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var searchText = $('#search-text-field').val();
            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['client_id'] = clientID;
            data['closed_by'] = closed_by;
            data['status'] = status;

            data['searchText'] = searchText;
            //console.log(searchText);
        });
        const showTable = () => {
            window.LaravelDataTables["deals-table"].draw();
        }

        $('#project_name, #short_code, #search-text-field, #client_id, #closed_by, #status').on('change keyup', function() {
            if ($('#short_code').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#project_name').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            }else if ($('#project_link').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            }else if ($('#client_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#closed_by').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#status').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            }
             else if ($('#search-text-field').val() != "") {
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
            var id = $(this).data('deal-id');
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
                    var url = "{{ route('deals.destroy', ':id') }}";
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
            var rowdIds = $("#deals-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('deals.apply_quick_action') }}?row_ids=" + rowdIds;

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
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
      $('#description2').summernote();
        $('#description3').summernote();

    });
    </script>

@endpush --}}
