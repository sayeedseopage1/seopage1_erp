@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
    <style>
        .filter-box {
            z-index: 2;
        }

    </style>
@endpush

@section('filter-section')
    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.month')</p>
            <div class="select-month">
                <select class="form-control select-picker" name="month" id="month" data-live-search="true" data-size="8">
                    {{-- @foreach ($months as $month)
                        <option @if ($currentMonth == $loop->iteration) selected @endif value="{{ $loop->iteration }}">{{ ucfirst($month) }}</option>
                    @endforeach --}}
                </select>
            </div>
        </div>
        <!-- MONTH END -->

        <!-- YEAR START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.year')</p>
            <div class="select-year">
                <select class="form-control select-picker" name="year" id="year" data-live-search="true" data-size="8">
                    {{-- @foreach ($years as $year)
                        <option @if ($year == $currentYear) selected @endif
                            value="{{ $year }}">{{ $year }}</option>
                    @endforeach --}}
                </select>
            </div>
        </div>
        <!-- YEAR END -->

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
$addPermission = user()->permission('add_holiday');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex action-bar justify-content-between ">
            <x-datatable.actions>
                <div class="select-status mr-3 pl-3">
                    <select name="action_type" class="form-control select-picker" id="quick-action-type" disabled>
                        <option value="">@lang('app.selectAction')</option>
                        <option value="delete">@lang('app.delete')</option>
                    </select>
                </div>
            </x-datatable.actions>

            <div class="btn-group ml-auto" role="group" aria-label="Basic example">
                <a href="{{ route('project-status.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('project-status-calendar') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>
            </div>
        </div>

        <!-- holiday table Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">

            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
        </div>
        <!-- leave table End -->

    </div>
    <!-- CONTENT WRAPPER END -->

    <!-- Modal -->
    <div class="modal fade" id="extendRequest-$row->projectId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            ...
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>

    

@endsection

@push('scripts')

    @include('sections.datatable_js')

    <script>
        
        $( document ).ready(function() {
            $('#project-status-table').on('preXhr.dt', function(e, settings, data) {
            // var month = $('#month').val();
            // var year = $('#year').val();
            var searchText = $('#search-text-field').val();

            // data['month'] = month;
            // data['year'] = year;
            data['searchText'] = searchText;
        });

        const showTable = () => {
            window.LaravelDataTables["project-status-table"].draw();
        }

        $('#search-text-field, #month, #year').on('change keyup',
            function() {
                if ($('#month').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#year').val() != "") {
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
       
        $('body').on('click', '.project-status-inner-view', function(e) {
            e.preventDefault();
            var id = $(this).data('id');

            var url = "{{ route('project-status.show', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);

        });

        $('body').on('click', '.extendRequest', function(e) {
            e.preventDefault();
            var id = $(this).data('id');

            var url = "{{ route('project-status.extendRequest', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);

        });

        $('body').on('click', '.reviewExtendRequest', function(e) {
            e.preventDefault();
            var id = $(this).data('id');

            var url = "{{ route('project-status.reviewExtendRequest', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);

        });
        });
    </script>
@endpush
