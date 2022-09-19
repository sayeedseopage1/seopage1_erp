@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush

@php
$viewClientDoc = user()->permission('view_client_document');
$viewTicket = user()->permission('view_tickets');
$viewClientNote = user()->permission('view_client_note');
$viewClientContact = user()->permission('view_client_contacts');
@endphp

@section('filter-section')
    <!-- FILTER START -->
    <!-- PROJECT HEADER STARTmplete -->
    <div class="d-flex filter-box project-header bg-white">

        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>
        <div class="project-menu d-lg-flex" id="mob-client-detail">

            <a class="d-none close-it" href="javascript:;" id="close-client-detail">
                <i class="fa fa-times"></i>
            </a>

            <x-tab :href="route('clients.show', $client->id)" :text="__('modules.employees.profile')" class="profile" />

            @if (in_array('projects', user_modules()))
                <x-tab :href="route('clients.show', $client->id).'?tab=projects'" ajax="false" :text="__('app.menu.projects')"
                    class="projects" />
            @endif

            @if (in_array('invoices', user_modules()))
                <x-tab :href="route('clients.show', $client->id).'?tab=invoices'" ajax="false" :text="__('app.menu.invoices')"
                    class="invoices" />
            @endif

            @if (in_array('estimates', user_modules()))
                <x-tab :href="route('clients.show', $client->id).'?tab=estimates'" ajax="false" :text="__('app.menu.estimates')"
                    class="estimates" />
            @endif

            <x-tab :href="route('clients.show', $client->id).'?tab=creditnotes'" ajax="false" :text="__('app.menu.credit-note')"
                class="creditnotes" />

            @if (in_array('payments', user_modules()))
                <x-tab :href="route('clients.show', $client->id).'?tab=payments'" ajax="false" :text="__('app.menu.payments')"
                    class="payments" />
            @endif

            @if ($viewClientContact == 'all' || $viewClientContact == 'added')
                <x-tab :href="route('clients.show', $client->id).'?tab=contacts'" ajax="false" :text="__('app.menu.contacts')"
                    class="contacts" />
            @endif

            @if ($viewClientDoc == 'all' || $viewClientDoc == 'added')
                <x-tab :href="route('clients.show', $client->id).'?tab=documents'" ajax="false" :text="__('app.menu.documents')"
                    class="documents" />
            @endif

            @if ($viewClientNote == 'all' || $viewClientNote == 'added')
                <x-tab :href="route('clients.show', $client->id).'?tab=notes'" ajax="false" text="Notes"
                    class="notes" />
            @endif

            @if ($viewTicket == 'all' || $viewTicket == 'added')
                <x-tab :href="route('clients.show', $client->id).'?tab=tickets'" ajax="false" :text="__('app.menu.tickets')"
                    class="tickets" />
            @endif

            @if ($gdpr->enable_gdpr)
                <x-tab :href="route('clients.show', $client->id).'?tab=gdpr'" ajax="false" :text="__('app.menu.gdpr')"
                class="gdpr" />
            @endif

        </div>

        <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey"
            onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a>

    </div>
    <!-- FILTER END -->
    <!-- PROJECT HEADER END -->

@endsection

@push('styles')
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
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
