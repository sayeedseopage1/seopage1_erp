{{-- @extends('layouts.app')
@section('filter-section')
    <div id="dmLeadTableFilterContainer"></div>
@endsection
@section('content')
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                <button type="button" class="btn btn-primary mr-3 float-left mb-2 mb-lg-0 mb-md-0" data-toggle="modal" data-target="#lead_source_add_modal">
                    <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add Lead
                </button> --}}
                {{-- @if ($addLeadPermission == 'all' || $addLeadPermission == 'added')
                <x-forms.link-primary :link="url('/account/leads/create')" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0" icon="plus">
                    @lang('app.add')
                    @lang('app.lead')
                </x-forms.link-primary>
            @endif --}}

                {{-- <div id="dmLeadTableExportButton"></div>
            </div>
            <div id="dmLeadTableRefreshButton"></div>
        </div>

        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
            <div id="dmLeadTableContainer"></div>
        </div>

    </div>
@endsection --}}
{{-- @extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="com-md-12">
            <div class="card mt-3 p-3" style="border: none">
                <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae eius iusto aliquam eveniet vel quaerat porro excepturi! Voluptatibus nisi sit veritatis iusto numquam quam deleniti ipsum doloribus! Ducimus, eaque ratione.</h2>
            </div>
        </div>
    </div>
</div>
@endsection --}}
@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@section('filter-section')
<div id="dmLeadTableFilterContainer"></div>
    {{-- @include('leads.filters') --}}

@endsection

@php
$addLeadPermission = user()->permission('add_lead');
$addLeadCustomFormPermission = user()->permission('manage_lead_custom_forms');
@endphp

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-block d-lg-flex d-md-flex justify-content-between action-bar">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addLeadPermission == 'all' || $addLeadPermission == 'added')
                <button type="button" class="btn btn-primary mr-3 float-left mb-2 mb-lg-0 mb-md-0" data-toggle="modal" data-target="#lead_source_add_modal">
                    <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add Lead
                </button>
                @include('dm-lead.modal.add_lead_source')
                    {{-- <x-forms.link-primary :link="url('/account/digital-marketing-lead/create')" class="mr-3 float-left mb-2 mb-lg-0 mb-md-0" icon="plus">
                        @lang('app.add')
                        @lang('app.lead')
                    </x-forms.link-primary> --}}
                @endif
                <div id="dmLeadTableExportButton"></div>
            </div>

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
                        @foreach ($status as $st)
                            <option value="{{ $st->id }}">{{ $st->type }}</option>
                        @endforeach
                    </select>
                </div>
            </x-datatable.actions>


            <div id="dmLeadTableRefreshButton"></div>
        </div>

        <!-- Add Task Export Buttons End -->
        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
          @if(Session::has('status_updated'))
              <div class="alert alert-success show mb-2" role="alert">{{Session::get('status_updated')}}</div>
              <div>

              </div>
              @endif

              <div id="dmLeadTableContainer"></div>
            @include('contracts.modals.dm-dealstmodal')
        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection