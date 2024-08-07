@extends('layouts.app')
@push('datatable-styles')
    @include('sections.datatable_css')
@endpush
@section('filter-section')
<link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}">

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

        <!-- DATE START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.month')</p>
            <div class="select-month">
                <select class="form-control select-picker" name="month" id="month" data-live-search="true" data-size="8">
                    <option></option>
                    @foreach ($months as $month)
                        <option  value="{{ $loop->iteration }}">{{ ucfirst($month) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- MONTH END -->

        <!-- YEAR START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.year')</p>
            <div class="select-year">
                <select class="form-control select-picker" name="year" id="year" data-live-search="true" data-size="8">
                    <option></option>
                    @foreach ($years as $year)
                        <option 
                            value="{{ $year }}">{{ $year }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- YEAR END -->

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

{{-- @push('scripts')
@include('sections.datatable_js')
<script>
    $('#monthlyincentive-table').on('preXhr.dt', function(e, settings, data) {

        var role_id = {{ Auth::user()->role_id }};
        var user_id = $('#user_id').val();
        var month = $('#month').val();
        var year = $('#year').val();
        var searchText = $('#search-text-field').val();
        data['role_id'] = role_id;
        data['user_id'] = user_id;
        data['month'] = month;
        data['year'] = year;
        data['searchText'] = searchText;

    });

    const showTable = () => {
        window.LaravelDataTables["monthlyincentive-table"].draw();
    }



    $('#user_id,#search-text-field,#month, #year').on('change', function() {
         if ($('#user_id').val() != "all") {
            $('#reset-filters').removeClass('d-none');
            showTable();
        }else if ($('#month').val() != "") {
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
        $('#month').val('{{ $currentMonth }}');
        $('#year').val('{{ $currentYear }}');
        $('.filter-box #status').val('not finished');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters').addClass('d-none');
        showTable();
    });

</script>
@endpush --}}

@push('scripts')

    @include('sections.datatable_js')

    <script>
        $('#monthlyincentive-table').on('preXhr.dt', function(e, settings, data) {
            var role_id = {{ Auth::user()->role_id }};
            var user_id = $('#user_id').val();
            var month = $('#month').val();
            var year = $('#year').val();

            data['role_id'] = role_id;
            data['user_id'] = user_id;
            data['month'] = month;
            data['year'] = year;
        });

        const showTable = () => {
            window.LaravelDataTables["monthlyincentive-table"].draw();
        }

        $('#month, #year, #user_id').on('change keyup',
            function() {
                if ($('#month').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#year').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#user_id').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else {
                    $('#reset-filters').addClass('d-none');
                    showTable();
                }
            });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();
            $('#month').val('{{ $currentMonth }}');
            $('#year').val('{{ $currentYear }}');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            showTable();
        });
    </script>
@endpush