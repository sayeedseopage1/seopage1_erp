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
                        @if (Auth::user()->role_id==1 || Auth::user()->role_id==8)
                            @foreach ($project_managers as $project_manager)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $project_manager->image_url }}' ></div> {{ ucfirst($project_manager->name) }}"
                                    value="{{ $project_manager->id }}" {{ $project_manager->id == 209 ? 'selected' : '' }}>{{ mb_ucwords($project_manager->name) }}</option>
                            @endforeach
                        @else
                            <option data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ Auth::user()->image_url }}' ></div> {{ ucfirst(Auth::user()->name) }}"
                                value="{{ Auth::user()->id }}" selected>{{ mb_ucwords(Auth::user()->name) }}</option>
                        @endif
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
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Pending Amount (Upto last month)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unfinished milestones he has by 12 a.m. on the 1st of the month. This is the starting balance for this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$pm_pending_milestone_value_upto_last_month}} ($)</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (This month)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones released during this calendar month that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$pm_released_amount_month}} ($)</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Assigned Amount (For this month)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones created during this calendar month. If any new milestones were created for older projects during this calendar month, that will count here as well. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$total_assigned_amount_for_this_cycle}} ($)</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (For this months projects)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones created during this calendar month. If any new milestones were created for older projects during this calendar month, that will count here as well. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$pm_released_amount_this_month_create}} ($)</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (For this months projects)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were also created during this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$pm_unreleased_amount_month}} ($)</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (Overall)
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$pm_pending_milestone_value}} ($)</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <div class="card p-3" style="border: none">
                                <p style="font-size: 16px; color:#777; font-weight: bold;">Cancelled Amount
                                    <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the canceled milestones during this calendar month. Also, the unreleased milestones in the incomplete projects will add up here. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </a>
                                </p>
                                <h5>{{$total_canceled_amount_for_this_cycle}} ($)</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div id="table-actions" class="flex-grow-1 align-items-center mt-4">
                </div>
            </div>
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
    <script type="text/javascript">
        $(function() {

            var start = moment().clone().startOf('month');
            var end = moment();

            function cb(start, end) {
                $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                    ' @lang("app.to") ' + end.format(
                        '{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange2').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig
            }, cb);


            $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                showTable();
            });

        });

    </script>

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
    <script>
        $(document).ready(function(){
            $('[data-toggle="popover"]').popover();
            $('[data-toggle="popover"]').on('click', function(event) {
                event.preventDefault();
            });
        });
    </script>
@endpush
