@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')

    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500 getMonth"
                    id="datatableRange2" placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <!-- DATE END -->

        @if (!in_array('project_manager', user_roles()))
            <!-- CLIENT START -->
            <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
                <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('Project Manager')</p>
                <div class="select-status">
                    <select class="form-control select-picker" id="PmId" data-live-search="true" data-size="8">
                        <option value="all">@lang('app.all')</option>
                        @foreach ($project_managers as $project_manager)
                            <option
                                data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $project_manager->image_url }}' ></div> {{ ucfirst($project_manager->name) }}"
                                value="{{ $project_manager->id }}" {{ $project_manager->id == 209 ? 'selected' : '' }}>{{ mb_ucwords($project_manager->name) }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <!-- CLIENT END -->
        @endif

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
    $addPaymentPermission = user()->permission('add_payments');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div id="monthwrapper">
            <div class="row">
                <div class="col-md-12" id="pm-card-data">
                    <div class="row mt-3" >
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Pending Amount (Upto last month)</p>
                                <h5>{{$pm_pending_milestone_value_upto_last_month}}</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (This month)</p>
                                <h5>{{$pm_released_amount_month}}</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Assigned Amount (For this month)</p>
                                <h5>{{$total_assigned_amount_for_this_cycle}}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (For this months projects)</p>
                                <h5>{{$pm_released_amount_this_month_create}}</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (For this months projects)</p>
                                <h5>{{$pm_unreleased_amount_month}}</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (Overall)</p>
                                <h5>{{$pm_pending_milestone_value}}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
       
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
                    {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
                </div>
            </div>
        </div>
    </div>
    <!-- CONTENT WRAPPER END -->



@endsection

@push('scripts')

    @include('sections.datatable_js')

    <script>
           $('#pm-payments-table').on('preXhr.dt', function(e, settings, data) {
    var dateRangePicker = $('#datatableRange2').data('daterangepicker');
    var startDate = $('#datatableRange2').val();
    var searchText = $('#search-text-field').val();
    var PmId = $('#PmId').val();

    if (startDate == '') {
        // Calculate the first day of the current month
        var firstDay = moment().startOf('month');
        
        // Calculate the last day of the current month
        var lastDay = moment().endOf('month');
        
        data['startDate'] = firstDay.format('{{ global_setting()->moment_date_format }}');
        data['endDate'] = lastDay.format('{{ global_setting()->moment_date_format }}');
    } else {
        data['startDate'] = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
        data['endDate'] = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
    }

    data['PmId'] = PmId;
    data['searchText'] = searchText;

    @if (!is_null(request('start')) && !is_null(request('end')))
        data['startDate'] = '{{ request('start') }}';
        data['endDate'] = '{{ request('end') }}';
    @endif
});

const showTable = () => {
    window.LaravelDataTables["pm-payments-table"].draw();
    cardContent();
}

$('#PmId,#search-text-field').on('change keyup', function() {
    if ($('#PmId').val() != "all") {
        $('#reset-filters').removeClass('d-none');
        showTable();
    } else if ($('#search-text-field').val() != "") {
        $('#reset-filters').removeClass('d-none');
        showTable();
    }
});


        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });



        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('payment-id');
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
                    var url = "{{ route('payments.destroy', ':id') }}";
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
            var rowdIds = $("#pm-payments-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('payments.apply_quick_action') }}?row_ids=" + rowdIds;

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
            $('#datatableRange2').val('{{ request('start') }}' +
            ' @lang("app.to") ' + '{{ request('end') }}');
            $('#datatableRange2').data('daterangepicker').setStartDate("{{ request('start') }}");
            $('#datatableRange2').data('daterangepicker').setEndDate("{{ request('end') }}");
                showTable();
            @endif
        });

        function cardContent() {
            var dateRangePicker = $('#datatableRange2').data('daterangepicker');
            var startDate = $('#datatableRange2').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var data = new Array();
            var pmID = $('#PmId').val();
            // var searchText = $('#search-text-field').val();

            var url = "{{ route('getMonthDate') }}";

            $.easyAjax({
                url: url,
                container: '#pm-card-data',
                blockUI: true,
                type: "POST",
                data: {
                    startDate: startDate,
                    endDate: endDate,
                    pmID: pmID,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                   // console.log(response.html);
                    $('#monthwrapper').html(response.html);
                    // $('#totalEarnings').html(response.totalEarnings);
                }
            });
        }
        cardContent();
    </script>
@endpush
