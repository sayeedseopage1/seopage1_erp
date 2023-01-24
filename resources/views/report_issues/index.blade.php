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

        <!-- STATUS START -->

        <!-- STATUS END -->

        <!-- SEARCH BY TASK START -->

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
            <!-- AGENT START -->

            <!-- AGENT END -->



          



        </x-filters.more-filter-box>
        <!-- MORE FILTERS END -->
    </x-filters.filter-box>

@endsection

@php
$addTicketPermission = user()->permission('add_tickets');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="row row-cols-lg-5 my-3">

            <div class="col mb-4">
                <a href="javascript:;" data-status="all" class="widget-filter-status">
                    <x-cards.widget :title="__('Total Issues')" value="0" icon="ticket-alt"
                        widgetId="totalTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="closed" class="widget-filter-status">
                    <x-cards.widget :title="__('Closed Issues')" value="0" icon="ticket-alt"
                        widgetId="closedTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="open" class="widget-filter-status">
                    <x-cards.widget :title="__('Open Issues')" value="0" icon="ticket-alt"
                        widgetId="openTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="pending" class="widget-filter-status">
                    <x-cards.widget :title="__('Pending Issues')" value="0" icon="ticket-alt"
                        widgetId="pendingTickets" />
                </a>
            </div>

            <div class="col">
                <a href="javascript:;" data-status="resolved" class="widget-filter-status">
                    <x-cards.widget :title="__('Resolved Issues')" value="0" icon="ticket-alt"
                        widgetId="resolvedTickets" />
                </a>
            </div>

        </div>

        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center mt-3">
                @if ($addTicketPermission == 'all' || $addTicketPermission == 'added')
                    <x-forms.link-primary :link="route('report_issues.create')" class="mr-3 openRightModal float-left"
                        icon="plus">
                        @lang('Report an Issue')
                    </x-forms.link-primary>
                @endif


            </div>

            @if (!in_array('client', user_roles()))
                <x-datatable.actions>
                    <div class="select-status mr-3 pl-3">
                        <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                            <option value="">@lang('app.selectAction')</option>
                            <option value="change-status">@lang('modules.tasks.changeStatus')</option>
                            <option value="delete">@lang('app.delete')</option>
                        </select>
                    </div>
                    <div class="select-status mr-3 d-none quick-action-field" id="change-status-action">
                        <select name="status" class="form-control select-picker">
                            <option value="open">@lang('app.open')</option>
                            <option value="pending">@lang('app.pending')</option>
                            <option value="resolved">@lang('app.resolved')</option>
                            <option value="closed">@lang('app.closed')</option>
                        </select>
                    </div>
                </x-datatable.actions>
            @endif

        </div>



        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {{--<div id="ticket-table_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
              <div class="row"><div class="col-sm-12">
                <table class="table table-hover border-0 w-100 dataTable no-footer" id="ticket-table" role="grid" aria-describedby="ticket-table_info" style="width: 1617px;">
                  <thead>
                    <tr role="row">
                      <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 78px;" aria-label="">
                        <input type="checkbox" name="select_all_table" id="select-all-table" onclick="selectAllTable(this)" autocomplete="off"></th>
                        <th title="Ticket #" class="sorting" tabindex="0" aria-controls="ticket-table" rowspan="1" colspan="1" style="width: 183px;" aria-label="Ticket #: activate to sort column ascending">Ticket #</th>
                        <th title="Ticket Subject" class="sorting" tabindex="0" aria-controls="ticket-table" rowspan="1" colspan="1" style="width: 278px;" aria-label="Ticket Subject: activate to sort column ascending">Ticket Subject</th>
                        <th title="Requester Name" class="sorting" tabindex="0" aria-controls="ticket-table" rowspan="1" colspan="1" style="width: 320px;" aria-label="Requester Name: activate to sort column ascending">Requester Name</th>
                        <th title="Requested On" class="sorting_asc" tabindex="0" aria-controls="ticket-table" rowspan="1" colspan="1" style="width: 280px;" aria-sort="ascending" aria-label="Requested On: activate to sort column descending">Requested On</th>
                        <th title="Others" class="sorting_disabled" rowspan="1" colspan="1" style="width: 125px;" aria-label="Others">Others</th>
                        <th title="Action" class="text-right pr-20 sorting_disabled" rowspan="1" colspan="1" style="width: 145px;" aria-label="Action">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="odd">
                        <td valign="top" colspan="7" class="dataTables_empty">No data available in table</td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="ticket-table_processing" class="dataTables_processing card" style="display: none;">Processing...</div>
                </div>
              </div>
              <div class="d-flex">
                <div class="flex-grow-1">
                  <div class="dataTables_length" id="ticket-table_length">
                    <label>Show <select name="ticket-table_length" aria-controls="ticket-table" class="custom-select custom-select-sm form-control form-control-sm">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    entries</label>
                  </div>
                </div>
                <div>
                  <div class="dataTables_info" id="ticket-table_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
                </div>
                <div>
                  <div class="dataTables_paginate paging_simple_numbers" id="ticket-table_paginate">
                    <ul class="pagination"><li class="paginate_button page-item previous disabled" id="ticket-table_previous"><a href="#" aria-controls="ticket-table" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                    </li>
                    <li class="paginate_button page-item next disabled" id="ticket-table_next">
                      <a href="#" aria-controls="ticket-table" data-dt-idx="1" tabindex="0" class="page-link">Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> --}}
            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

<!-- Small modal -->



        </div>
        <!-- Task Box End -->
    </div>

    <div class="modal fade" id="showreportmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Project Deny</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>


        </div>
      </div>
    </div>


    </script>

    <!-- CONTENT WRAPPER END -->


@endsection


@push('scripts')
    @include('sections.datatable_js')

    <script>


        $('#report_issues-table').on('preXhr.dt', function(e, settings, data) {
            var dateRangePicker = $('#datatableRange').data('daterangepicker');
            var startDate = $('#datatableRange').val();

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

            data['searchText'] = searchText;
        });
        const showTable = () => {
            window.LaravelDataTables["report_issues-table"].draw();
        }



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
            var id = $(this).data('issue-id');
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
            var rowdIds = $("#reports_issue-table input:checkbox:checked").map(function() {
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
    $(document).ready(function(){

    $('body').on('click', '.show-table-row', function() {
      // /var id = getElementByid('show-id').val();
        var id = $(this).data('show-id');

        //alert(id);

    });
  });
    </script>
@endpush
