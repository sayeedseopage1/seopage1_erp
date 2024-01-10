@extends('layouts.app')
@push('datatable-styles')
    @include('sections.datatable_css')
@endpush
{{-- @section('filter-section')
    <x-filters.filter-box>
        <div class="select-box {{ !in_array('client', user_roles()) ? 'd-flex' : 'd-none' }} py-2  pr-2 border-right-grey border-right-grey-sm-0">
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

        <div class="select-box d-flex py-2 {{ !in_array('client', user_roles()) ? 'px-lg-2 px-md-2 px-0' : '' }}  border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.status')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="status" id="status" data-live-search="true" data-size="8">
                    <option selected value="in progress">@lang('In Progress')</option>
                     <option {{ request('status') == 'all' ? 'selected' : '' }} value="all">@lang('app.all')</option>
                    <option {{ request('status') == 'overdue' ? 'selected' : '' }} value="overdue">@lang('app.overdue')
                    </option>
                    <?php $p_status= App\Models\ProjectStatusSetting::where('status_name','!=','not started')->get() ?>
                    @foreach ($p_status as $status)

                        <option value="{{$status->status_name}}">{{ ucfirst($status->status_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

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
@endsection --}}

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
            {{-- <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores exercitationem tenetur harum soluta nulla facere perspiciatis minima, temporibus fugit modi quisquam! Dignissimos quidem suscipit sunt tempora possimus consectetur, accusantium officia?</h2> --}}
                {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
        </div>
    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')
    @include('sections.datatable_js')
    <script>
        $( document ).ready(function() {
            $('#project-status-table').on('preXhr.dt', function(e, settings, data) {
            var searchText = $('#search-text-field').val();
            data['searchText'] = searchText;
        });

        const showTable = () => {
            window.LaravelDataTables["project-deadline-extension-table"].draw();
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
    });
    </script>

    <script>
        $('body').on('click', '.project-deadline-auth', function() {
            let id = $(this).data('project-id');
            let searchQuery = "?id=" + id;
            let url = "{{ route('pde-authorization') }}" + searchQuery;

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
    <script>
        $('body').on('click', '.project-deadline-view', function() {
            let id = $(this).data('project-id');
            let searchQuery = "?id=" + id;
            let url = "{{ route('project-deadline-ext-view') }}" + searchQuery;

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
@endpush