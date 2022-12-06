@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush



@section('filter-section')
    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->
    <div class="d-flex filter-box project-header bg-white">

        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>
        <div class="project-menu d-lg-flex" id="mob-client-detail">
            <a class="d-none close-it" href="javascript:;" id="close-client-detail" >
                <i class="fa fa-times"></i>
            </a>
            @if($deal->won_lost == 'Yes')
            <x-tab :href="route('deals.show', $deal->id).'?tab=summary'" :text="__('Summary')" class="summary" ajax="false"/>
            @endif

            <x-tab :href="route('deals.show', $deal->id)" :text="__('Deal Stage')" class="deal_details" ajax="false"/>

            <x-tab :href="route('deals.show', $deal->id).'?tab=files'" :text="__('Files')" class="files" ajax="false"/>

            <x-tab :href="route('deals.show', $deal->id).'?tab=follow-up'" :text="__('Follow Up')" class="follow-up"  ajax="false" />

            <x-tab :href="route('deals.show', $deal->id).'?tab=proposals'" :text="__('Proposals')" class="proposal" ajax="false" />



            <!-- @if ($gdpr->enable_gdpr)
                <x-tab :href="route('leads.show', $lead->id).'?tab=gdpr'" :text="__('app.menu.gdpr')" class="gdpr" ajax="false" />
            @endif -->
        </div>
        <!-- <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey"
            onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a> -->
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
