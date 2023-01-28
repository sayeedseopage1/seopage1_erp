@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')
<style media="screen">
.pl-4, .px-4 {
 padding-left: 0rem !important; */
}
</style>
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
<?php
$total_suggestions = App\Models\Suggestion::count();
$not_taken_into_consideration= App\Models\Suggestion::where('status','Not Taken Into Consideration')->count();
$open_suggestions= App\Models\Suggestion::where('status','in progress')->count();
$pending_suggestions= App\Models\Suggestion::where('status','pending')->count();
$resolved_suggestions= App\Models\Suggestion::where('status','fixed')->count();
 ?>
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="row row-cols-lg-5 my-3">

            <div class="col mb-4">
                <a href="javascript:;" data-status="all" class="widget-filter-status">
                    <x-cards.widget :title="__('Total Issues')" value="{{$total_suggestions}}" icon="ticket-alt"
                        widgetId="totalTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="closed" class="widget-filter-status">
                    <x-cards.widget :title="__('Not Taken Into Consideration')" value="{{$not_taken_into_consideration}}" icon="ticket-alt"
                        widgetId="closedTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="open" class="widget-filter-status">
                    <x-cards.widget :title="__('Open Issues')" value="{{$open_suggestions}}" icon="ticket-alt"
                        widgetId="openTickets" />
                </a>
            </div>

            <div class="col mb-4">
                <a href="javascript:;" data-status="pending" class="widget-filter-status">
                    <x-cards.widget :title="__('Pending Issues')" value="{{$pending_suggestions}}" icon="ticket-alt"
                        widgetId="pendingTickets" />
                </a>
            </div>

            <div class="col">
                <a href="javascript:;" data-status="resolved" class="widget-filter-status">
                    <x-cards.widget :title="__('Resolved Issues')" value="{{$resolved_suggestions}}" icon="ticket-alt"
                        widgetId="resolvedTickets" />
                </a>
            </div>

        </div>

        <!-- Add Task Export Buttons Start -->
        <div class="d-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center mt-3">
                @if ($addTicketPermission == 'all' || $addTicketPermission == 'added')
                    <x-forms.link-primary :link="route('suggestions.create')" class="mr-3 openRightModal float-left"
                        icon="plus">
                        @lang('Create New Suggestion')
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


            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}

<!-- Small modal -->



        </div>
        <!-- Task Box End -->
    </div>




    </script>

    <!-- CONTENT WRAPPER END -->


@endsection


@push('scripts')
    @include('sections.datatable_js')

    <script>


        $('#suggestions-table').on('preXhr.dt', function(e, settings, data) {
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
            window.LaravelDataTables["suggestions-table"].draw();
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
