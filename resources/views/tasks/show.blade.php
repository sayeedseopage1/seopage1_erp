@extends('layouts.app')

@section('filter-section')
    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->
    <div class="d-flex filter-box project-header bg-white">

        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>
        <div class="project-menu d-lg-flex" id="mob-client-detail">

            <a class="d-none close-it" href="javascript:;" id="close-client-detail">
                <i class="fa fa-times"></i>
            </a>

            <x-tab :href="route('projects.show', $project->id)" :text="__('modules.projects.overview')" class="overview" />
            <x-tab :href="route('projects.show', $project->id).'?tab=members'" :text="__('modules.projects.members')"
                class="members" />

        </div>

        <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey"
            onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a>

    </div>
    <!-- FILTER END -->
    <!-- PROJECT HEADER END -->

@endsection

@push('styles')
    <script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
@endpush

@section('content')

    <div class="project-wrapper border-top-0 d-lg-flex">
        @include($view)
    </div>

@endsection

@push('scripts')

    <script>
        const activeTab = "{{ $activeTab }}";
        $('.project-menu .' + activeTab).addClass('active');

    </script>

@endpush
<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
