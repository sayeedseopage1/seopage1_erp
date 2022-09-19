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
                    <select class="form-control select-picker" id="clientID" data-live-search="true" data-size="8">
                        <option value="all">@lang('app.all')</option>
                        @foreach ($clients as $client)
                            <option
                                data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                                value="{{ $client->id }}">{{ mb_ucwords($client->name) }}</option>
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

        <!-- MORE FILTERS START -->
        <x-filters.more-filter-box>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.status')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="status" id="status" data-live-search="true"
                            data-size="8">
                            <option value="all" data-content="@lang('app.all')">@lang('app.all')</option>

                            <option value="pending" {{ request('status') == 'pending' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-yellow'></i> @lang('app.pending') ">@lang('app.pending')</option>

                            <option value="on-hold" {{ request('status') == 'on-hold' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-info'></i> @lang('app.on-hold') ">@lang('app.on-hold')</option>

                            <option value="failed" {{ request('status') == 'failed' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-muted'></i> @lang('app.failed') ">@lang('app.failed')</option>

                            <option value="processing" {{ request('status') == 'processing' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-blue'></i> @lang('app.processing') ">@lang('app.processing')</option>

                            <option value="completed" {{ request('status') == 'completed' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-dark-green'></i> @lang('app.completed') ">@lang('app.completed')</option>

                            <option value="canceled" {{ request('status') == 'canceled' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2 text-red'></i> @lang('app.canceled') ">@lang('app.canceled')</option>

                            <option value="refunded" {{ request('status') == 'refunded' ? 'selected' : ''}} data-content="<i class='fa fa-circle mr-2'></i> @lang('app.refunded') ">@lang('app.refunded')</option>
                        </select>
                    </div>
                </div>
            </div>

        </x-filters.more-filter-box>
        <!-- MORE FILTERS END -->

    </x-filters.filter-box>

@endsection

@php
$addInvoicesPermission = user()->permission('add_invoices');
$addOrderPermission = user()->permission('add_order');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if (in_array('client', user_roles()) && in_array('orders', $user->modules) && ($addOrderPermission == 'all' ))
                    <x-forms.link-primary :link="route('products.index')" class="mr-3 float-left"
                        icon="plus">
                        @lang('app.add')
                        @lang('app.new')
                        @lang('app.order')
                    </x-forms.link-primary>
                @endif

                @if (!in_array('client', user_roles()) && ($addOrderPermission == 'all' || $addOrderPermission == 'added'))
                    <x-forms.link-primary :link="route('orders.create')" class="mr-3 float-left"
                        icon="plus">
                        @lang('app.add')
                        @lang('app.new')
                        @lang('app.order')
                    </x-forms.link-primary>
                @endif
            </div>
        </div>

        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.datatable_js')

    <script>
        $('#orders-table').on('preXhr.dt', function(e, settings, data) {

            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            var clientID = $('#clientID').val();
            var status = $('#status').val();

            var searchText = $('#search-text-field').val();

            data['clientID'] = clientID;
            data['status'] = status;
            data['startDate'] = startDate;
            data['endDate'] = endDate;
            data['searchText'] = searchText;
        });

        const showTable = () => {
            window.LaravelDataTables["orders-table"].draw();
        }

        function changeOrderStatus(orderID, status) {
            var url = "{{ route('orders.change_status') }}";
            var token = "{{ csrf_token() }}";
            var id = orderID;
            var statusMessage = '';

            if (id != "" && status != "") {

                switch (status) {
                    case 'pending':
                        statusMessage = "@lang('messages.orderStatus.pending')";
                        break;
                    case 'on-hold':
                        statusMessage = "@lang('messages.orderStatus.onHold')";
                        break;
                    case 'failed':
                        statusMessage = "@lang('messages.orderStatus.failed')";
                        break;
                    case 'processing':
                        statusMessage = "@lang('messages.orderStatus.processing')";
                        break;
                    case 'completed':
                        statusMessage = "@lang('messages.orderStatus.completed')";
                        break;
                    case 'canceled':
                        statusMessage = "@lang('messages.orderStatus.canceled')";
                        break;
                    case 'refunded':
                        statusMessage = "@lang('messages.orderStatus.refunded')";
                        break;

                    default:
                        statusMessage = "@lang('messages.orderStatus.pending')";
                        break;
                }

                Swal.fire({
                    title: "@lang('messages.confirmation.orderStatusChange')",
                    text: statusMessage,
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('app.yes')",
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
                        $.easyAjax({
                            url: url,
                            type: "POST",
                            container: '.content-wrapper',
                            blockUI: true,
                            data: {
                                '_token': token,
                                orderId: id,
                                status: status,
                            },
                            success: function(data) {
                                showTable();
                            }
                        });
                    }
                    else {
                        showTable();
                    }
                });

            }
        }


        $('#orders-table').on('change', '.order-status', function() {
            var id = $(this).data('order-id');
            var status = $(this).val();

            changeOrderStatus(id, status);
        });

        $('#orders-table').on('click', '.orderStatusChange', function() {
            var id = $(this).data('order-id');
            var status = $(this).data('status');

            changeOrderStatus(id, status);
        });

        $('#search-text-field, #clientID, #status')
            .on('change keyup',
                function() {
                    if ($('#status').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        showTable();
                    } else if ($('#clientID').val() != "all") {
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

        $('#reset-filters-2').click(function() {
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
            var id = $(this).data('order-id');
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
                    var url = "{{ route('orders.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
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

        $('body').on('click', '.unpaidAndPartialPaidCreditNote', function() {
            var id = $(this).data('invoice-id');

            Swal.fire({
                title: "@lang('messages.confirmation.createCreditNotes')",
                text: "@lang('messages.creditText')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('app.yes')",
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
                    var url = "{{ route('creditnotes.create') }}?invoice=:id";
                    url = url.replace(':id', id);

                    location.href = url;
                }
            });
        });

        const applyQuickAction = () => {
            var rowdIds = $("#invoices-table input:checkbox:checked").map(function() {
                return $(this).val();
            }).get();

            var url = "{{ route('invoices.apply_quick_action') }}?row_ids=" + rowdIds;

            $.easyAjax({
                url: url,
                container: '#quick-action-form',
                type: "POST",
                disableButton: true,
                buttonSelector: "#quick-action-apply",
                data: $('#quick-action-form').serialize(),
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        showTable();
                        resetActionButtons();
                    }
                }
            })
        };

    </script>
@endpush
