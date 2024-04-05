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


            <x-tab :href="route('contracts.show', $contract->id)" :text="__('modules.contracts.summery')" class="profile" />



            <x-tab :href="route('contracts.show', $contract->id).'?tab=files'" :text="__('Deal Files')"
                class="files" />

            <x-tab :href="route('contracts.show', $contract->id).'?tab=milestone'" :text="__('Milestone')"
                class="milestone" />

            <x-tab :href="route('contracts.show', $contract->id).'?tab=cross_departmental_work'" :text="__('Cross Departmental Work')"
                class="cross_departmental_work" />

            @if (auth()->user()->role_id == 1)
            <x-tab :href="route('contracts.show', $contract->id).'?tab=sales-analysis-report'" :text="__('Sales Analysis Report')" ajax="false"  />
            @endif


          {{-- <x-tab :href="route('contracts.show', $contract->id).'?tab=renew'"
                :text="__('Deal Renewal History')" class="renew" /> --}}

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

    <div class="content-wrapper border-top-0 client-detail-wrapper">
        @include($view)
    </div>

@endsection

@push('scripts')
    <script>
        $("body").on("click", ".ajax-tab", function(event) {
            event.preventDefault();

            $('.project-menu .p-sub-menu').removeClass('active');
            $(this).addClass('active');


            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: ".content-wrapper",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('.content-wrapper').html(response.html);
                        init('.content-wrapper');
                    }
                }
            });
        });

    </script>
    <script>
        const activeTab = "{{ $activeTab }}";
        $('.project-menu .' + activeTab).addClass('active');

    </script>
@endpush
