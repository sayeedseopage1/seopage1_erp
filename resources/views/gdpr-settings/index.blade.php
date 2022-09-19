@extends('layouts.app')

@push('datatable-styles')
    @include('sections.datatable_css')
@endpush


@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="gdpr-tabs tabs border-bottom-grey ">
                        <ul class="nav -primary" id="nav-tab" role="tablist">
                            <li>
                                <a class="nav-item nav-link f-15 gdpr-ajax-tab active general"
                                    href="{{ route('gdpr-settings.index') }}" role="tab" aria-controls="nav-general"
                                    aria-selected="true">@lang('app.menu.general')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 gdpr-ajax-tab right-to-data-portability"
                                    href="{{ route('gdpr-settings.index') }}?tab=right-to-data-portability" role="tab"
                                    aria-controls="nav-rightToDataPortability"
                                    aria-selected="true">@lang('app.menu.rightToDataPortability')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 gdpr-ajax-tab right-to-informed"
                                    href="{{ route('gdpr-settings.index') }}?tab=right-to-informed" role="tab"
                                    aria-controls="nav-rightToBeInformed"
                                    aria-selected="true">@lang('app.menu.rightToBeInformed')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 gdpr-ajax-tab right-to-erasure"
                                    href="{{ route('gdpr-settings.index') }}?tab=right-to-erasure" role="tab"
                                    aria-controls="nav-rightToErasure" aria-selected="true">@lang('app.menu.rightToErasure')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 gdpr-ajax-tab right-to-access"
                                    href="{{ route('gdpr-settings.index') }}?tab=right-to-access" role="tab"
                                    aria-controls="nav-rightOfRectification"
                                    aria-selected="true">@lang('app.menu.rightOfRectification')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 removal-requests "
                                    href="{{ route('gdpr-settings.index') }}?tab=removal-requests" role="tab"
                                    aria-controls="nav-removalRequests"
                                    aria-selected="true">@lang('app.menu.removalRequest')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 removal-requests-lead"
                                    href="{{ route('gdpr-settings.index') }}?tab=removal-requests-lead" role="tab"
                                    aria-controls="nav-removalRequests"
                                    aria-selected="true">@lang('app.menu.removalRequestLead')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 consent-settings"
                                    href="{{ route('gdpr-settings.index') }}?tab=consent-settings" role="tab"
                                    aria-controls="nav-consent" aria-selected="true">@lang('app.menu.consent')
                                    @lang('app.settings')
                                </a>
                            </li>

                            <li>
                                <a class="nav-item nav-link f-15 consent-lists"
                                    href="{{ route('gdpr-settings.index') }}?tab=consent-lists" role="tab"
                                    aria-controls="nav-consent" aria-selected="true">@lang('app.menu.consent')
                                    @lang('app.lists')
                                </a>
                            </li>

                        </ul>
                    </nav>
                    <div class="d-block d-lg-none d-md-none">
                        {{-- put select box here --}}
                    </div>
                </div>
            </x-slot>

            {{-- include tabs here --}}
            @include($view)

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')
    <script>
        /* manage menu active class */
        $('.nav-item').removeClass('active');
        const activeTab = "{{ $activeTab }}";
        $('.' + activeTab).addClass('active');

        showBtn(activeTab);

        function showBtn(activeTab) {
            $('.actionBtn').addClass('d-none');
            $('.' + activeTab + '-btn').removeClass('d-none');
        }

        $("body").on("click", ".gdpr-ajax-tab", function(event) {
            event.preventDefault();

            $('.nav-item').removeClass('active');
            $(this).addClass('active');


            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: ".content-wrapper",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#nav-tabContent').html(response.html);
                        init('#nav-tabContent');
                    }
                }
            });
        });
    </script>

    <script>
        /*******************************************************
                         More btn in projects menu Start
                *******************************************************/

        const container = document.querySelector('.tabs');
        const primary = container.querySelector('.-primary');
        const primaryItems = container.querySelectorAll('.-primary > li:not(.-more)');
        container.classList.add('--jsfied'); // insert "more" button and duplicate the list

        primary.insertAdjacentHTML('beforeend', `
        <li class="-more bg-grey">
            <button type="button" class="px-4 h-100 w-100 d-lg-flex d-md-flex align-items-center justify-content-center" aria-haspopup="true" aria-expanded="false">
            More <span>&darr;</span>
            </button>
            <ul class="-secondary" id="hide-project-menues">
            ${primary.innerHTML}
            </ul>
        </li>
        `);
        const secondary = container.querySelector('.-secondary');
        const secondaryItems = secondary.querySelectorAll('li');
        const allItems = container.querySelectorAll('li');
        const moreLi = primary.querySelector('.-more');
        const moreBtn = moreLi.querySelector('button');
        moreBtn.addEventListener('click', e => {
            e.preventDefault();
            container.classList.toggle('--show-secondary');
            moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'));
        }); // adapt tabs

        const doAdapt = () => {
            // reveal all items for the calculation
            allItems.forEach(item => {
                item.classList.remove('--hidden');
            }); // hide items that won't fit in the Primary

            let stopWidth = moreBtn.offsetWidth;
            let hiddenItems = [];
            const primaryWidth = primary.offsetWidth;
            primaryItems.forEach((item, i) => {
                if (primaryWidth >= stopWidth + item.offsetWidth) {
                    stopWidth += item.offsetWidth;
                } else {
                    item.classList.add('--hidden');
                    hiddenItems.push(i);
                }
            }); // toggle the visibility of More button and items in Secondary

            if (!hiddenItems.length) {
                moreLi.classList.add('--hidden');
                container.classList.remove('--show-secondary');
                moreBtn.setAttribute('aria-expanded', false);
            } else {
                secondaryItems.forEach((item, i) => {
                    if (!hiddenItems.includes(i)) {
                        item.classList.add('--hidden');
                    }
                });
            }
        };

        doAdapt(); // adapt immediately on load

        window.addEventListener('resize', doAdapt); // adapt on window resize
        // hide Secondary on the outside click

        document.addEventListener('click', e => {
            let el = e.target;

            while (el) {
                if (el === secondary || el === moreBtn) {
                    return;
                }

                el = el.parentNode;
            }

            container.classList.remove('--show-secondary');
            moreBtn.setAttribute('aria-expanded', false);
        });
        /*******************************************************
                 More btn in projects menu End
        *******************************************************/
    </script>

    <script>
        $(body).on('click', '#save-general-data', function() {
            $.easyAjax({
                url: "{{ route('gdpr_settings.update_general') }}",
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-general-data",
                data: $('#editSettings').serialize(),
            })
        })
    </script>


    <script>
        $(body).on('click', '#save-right-to-data-portability', function() {
            $.easyAjax({
                url: "{{ route('gdpr_settings.update_general') }}",
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-right-to-data-portability",
                data: $('#editSettings').serialize(),
            })
        })
    </script>



    <script>
        $(body).on('click', '#save-right-to-informed-data', function() {
            $.easyAjax({
                url: "{{ route('gdpr_settings.update_general') }}",
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-right-to-informed-data",
                data: $('#editSettings').serialize(),
            })
        })
    </script>


    <script>
        $(body).on('click', '#save-right-to-erasure-data', function() {
            $.easyAjax({
                url: "{{ route('gdpr_settings.update_general') }}",
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-right-to-erasure-data",
                data: $('#editSettings').serialize(),
            })
        })
    </script>


    <script>
        $(body).on('click', '#save-right-to-access-data', function() {
            $.easyAjax({
                url: "{{ route('gdpr_settings.update_general') }}",
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                buttonSelector: "#save-right-to-access-data",
                data: $('#editSettings').serialize(),
            })
        })
    </script>


<script>
    $(body).on('click', '#save-consent-data', function() {
        $.easyAjax({
            url: "{{route('gdpr_settings.update_general')}}",
            container: '#editSettings',
            type: "POST",
            disableButton: true,
            buttonSelector: "#save-consent-data",
            data: $('#editSettings').serialize(),
        })
    })
</script>

@endpush
