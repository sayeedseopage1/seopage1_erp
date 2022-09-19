@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@php
$viewClientNote = user()->permission('view_lead_note');
@endphp


@section('filter-section')
    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->
    <div class="d-flex filter-box project-header bg-white">

        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>
        <div class="project-menu d-lg-flex" id="mob-client-detail">
            <a class="d-none close-it" href="javascript:;" id="close-client-detail" >
                <i class="fa fa-times"></i>
            </a>
            <x-tab :href="route('leads.show', $lead->id)" :text="__('modules.lead.profile')" class="profile" />

            <x-tab :href="route('leads.show', $lead->id).'?tab=files'" :text="__('modules.lead.file')" class="files" ajax="false"/>

            <x-tab :href="route('leads.show', $lead->id).'?tab=follow-up'" :text="__('modules.lead.followUp')" class="follow-up" />

            <x-tab :href="route('leads.show', $lead->id).'?tab=proposals'" :text="__('modules.lead.proposal')" class="proposals" ajax="false" />

        @if ($viewClientNote == 'all' || $viewClientNote == 'both' || $viewClientNote == 'added' || $viewClientNote == 'owned')
            <x-tab :href="route('leads.show', $lead->id).'?tab=notes'" ajax="false" text="Notes"
            class="notes" />
        @endif

            @if ($gdpr->enable_gdpr)
                <x-tab :href="route('leads.show', $lead->id).'?tab=gdpr'" :text="__('app.menu.gdpr')" class="gdpr" ajax="false" />
            @endif
        </div>
        <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey"
            onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a>
    </div>
    <!-- FILTER END -->
    <!-- PROJECT HEADER END -->

@endsection

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

        $('body').on('click', '#add-files', function() {
            const url = "{{ route('lead-files.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    </script>
@endpush
