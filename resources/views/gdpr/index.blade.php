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

                @if($gdpr->terms || $gdpr->policy || $gdpr->customer_footer)
                <x-tab :href="route('gdpr.index').'?tab=right-to-informed'"
                    :text="__('app.menu.rightToBeInformed')" class="right-to-informed" />
                @endif

                @if($gdpr->public_lead_edit)
                <x-tab :href="route('gdpr.index').'?tab=right-to-access'"
                    :text="__('app.menu.rightOfRectification')" class="right-to-access" />
                @endif

                @if($gdpr->enable_export)
                <x-tab :href="route('gdpr.index').'?tab=right-to-data-portability'"
                    :text="__('app.menu.rightToDataPortability')" class="right-to-data-portability" />
                @endif

                @if($gdpr->consent_customer)
                <x-tab :href="route('gdpr.index').'?tab=consent'"
                    :text="__('app.menu.consent')" class="consent" />
                @endif

            </div>
        </div>
    <!-- FILTER END -->
    <!-- PROJECT HEADER END -->

@endsection

@section('content')
    <div class="content-wrapper pt-0 border-top-0 client-detail-wrapper">
        @include($view)
    </div>
@endsection

@push('scripts')
<script>
        $("body").on("click", ".project-menu .ajax-tab", function(event) {
            event.preventDefault();

            $('.project-menu .p-sub-menu').removeClass('active');
            $(this).addClass('active');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: ".content-wrapper",
                historyPush: true,
                blockUI: true,
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
