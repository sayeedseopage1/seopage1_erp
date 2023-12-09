@extends('layouts.app')
@push('datatable-styles')
    @include('sections.datatable_css')
@endpush
@section('filter-section')
<link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">

    <x-filters.filter-box>
        <div class="select-box {{ !in_array('user', user_roles()) ? 'd-flex' : 'd-none' }} py-2  pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('Select User')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="user_id" id="user_id" data-live-search="true"
                    data-size="8">
                    @if (!in_array('user', user_roles()))
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($users as $user)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $user->image_url }}' ></div> {{ ucfirst($user->name) }}"
                            value="{{ $user->id }}">{{ ucfirst($user->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        {{-- <!-- SEARCH BY TASK START -->
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
        <!-- SEARCH BY TASK END --> --}}

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->
    </x-filters.filter-box>

@endsection
@section('content')
    <div class="row mx-0">
        <div class="col-12">
            <div class="card mt-3" style="border: none">
                <div class="card-body">
                    {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
@include('sections.datatable_js')
<script>
    $('#monthlyincentive-table').on('preXhr.dt', function(e, settings, data) {

        var role_id = {{ Auth::user()->role_id }};
        var user_id = $('#user_id').val();
        var searchText = $('#search-text-field').val();
        data['role_id'] = role_id;
        data['user_id'] = user_id;
        data['searchText'] = searchText;

    });

    const showTable = () => {
        window.LaravelDataTables["monthlyincentive-table"].draw();
    }



    $('#user_id,#search-text-field').on('change keyup', function() {
         if ($('#user_id').val() != "all") {
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
        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

    $('#reset-filters-2').click(function() {
        $('#filter-form')[0].reset();
        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

</script>
@endpush