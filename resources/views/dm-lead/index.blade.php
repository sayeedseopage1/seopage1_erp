@extends('layouts.app')
@section('filter-section')
    <div id="dmLeadTableFilterContainer"></div>
@endsection
@section('content')
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                {{-- @if ($addLeadPermission == 'all' || $addLeadPermission == 'added')
                <x-forms.link-primary :link="url('/account/leads/create')" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0" icon="plus">
                    @lang('app.add')
                    @lang('app.lead')
                </x-forms.link-primary>
            @endif --}}

                <div id="dmLeadTableExportButton"></div>
            </div>
            <div id="dmLeadTableRefreshButton"></div>
        </div>

        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
            <div id="dmLeadTableContainer"></div>
        </div>

    </div>
@endsection
