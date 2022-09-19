@extends('layouts.app')

@section('content')

@php
$addLeadAgentPermission = user()->permission('add_lead_agent');
$addLeadSourcesPermission = user()->permission('add_lead_sources');
$addLeadCategoryPermission = user()->permission('add_lead_category');
@endphp

    <!-- SETTINGS START -->
    <div class="w-100 d-flex">
        <x-setting-sidebar :activeMenu="$activeSettingMenu" />
        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs px-4 border-bottom-grey">
                        <div class="nav" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link f-15 active source" href="{{ route('lead-settings.index') }}"
                                role="tab" aria-controls="nav-leadSource" aria-selected="true">@lang('app.menu.leadSource')
                            </a>
                            <a class="nav-item nav-link f-15 status" href="{{ route('lead-settings.index') }}?tab=status"
                                role="tab" aria-controls="nav-leadStatus" aria-selected="true">@lang('app.menu.leadStatus')
                            </a>
                            <a class="nav-item nav-link f-15 agent" href="{{ route('lead-settings.index') }}?tab=agent"
                                role="tab" aria-controls="nav-leadAgent"
                                aria-selected="true">@lang('modules.lead.leadAgent')
                            </a>
                            <a class="nav-item nav-link f-15 category"
                                href="{{ route('lead-settings.index') }}?tab=category" role="tab"
                                aria-controls="nav-leadAgent" aria-selected="true">@lang('modules.lead.leadCategory')
                            </a>
                        </div>
                    </nav>
                </div>
            </x-slot>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        @if ($addLeadAgentPermission != 'none')                            
                            <x-forms.button-primary icon="plus" id="addAgent" class="agent-btn mb-2 d-none actionBtn">
                                @lang('app.addNew') @lang('modules.lead.leadAgent')
                            </x-forms.button-primary>
                        @endif

                        @if ($addLeadSourcesPermission != 'none')                            
                            <x-forms.button-primary icon="plus" id="addSource" class="source-btn mb-2 d-none actionBtn">
                                @lang('app.addNew') @lang('app.menu.leadSource')
                            </x-forms.button-primary>
                        @endif

                        <x-forms.button-primary icon="plus" id="addStatus" class="status-btn mb-2 d-none actionBtn">
                            @lang('app.addNew') @lang('app.menu.leadStatus')
                        </x-forms.button-primary>

                        @if ($addLeadCategoryPermission != 'none')                            
                            <x-forms.button-primary icon="plus" id="addCategory" class="category-btn mb-2 d-none actionBtn">
                                @lang('app.addNew') @lang('modules.lead.leadCategory')
                            </x-forms.button-primary>
                        @endif
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
        /* MENU SCRIPTS */
        /* manage menu active class */
        $('.nav-item').removeClass('active');
        const activeTab = "{{ $activeTab }}";
        $('.' + activeTab).addClass('active');

       $("body").on("click", "#editSettings .nav a", function(event) {
            event.preventDefault();

            $('.nav-item').removeClass('active');
            $(this).addClass('active');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#nav-tabContent",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        showBtn(response.activeTab);
                        $('#nav-tabContent').html(response.html);
                        init('#nav-tabContent');
                    }
                }
            });
        });

        function showBtn(activeTab) {
            $('.actionBtn').addClass('d-none');
            $('.' + activeTab + '-btn').removeClass('d-none');
        }

        showBtn(activeTab);
        /* MENU SCRIPTS */

        /* LEAD AGENT SCRIPTS */
        /* open add agent modal */
        $('body').on('click', '#addAgent', function() {
            var url = '{{ route('lead-agent-settings.create') }}';
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* delete agent */
        $('body').on('click', '.delete-agent', function() {
            var id = $(this).data('agent-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('lead-agent-settings.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('.row'+id).fadeOut();
                            }
                        }
                    });
                }
            });
        });
        /* LEAD AGENT SCRIPTS */

        /* LEAD SOURCE SCRIPTS */
        /* open add source modal */
        $('body').on('click', '#addSource', function() {
            var url = "{{ route('lead-source-settings.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* open edit source modal */
        $('body').on('click', '.edit-source', function() {
            var sourceId = $(this).data('source-id');
            var url = "{{ route('lead-source-settings.edit', ':id ') }}";
            url = url.replace(':id', sourceId);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* delete source */
        $('body').on('click', '.delete-source', function() {
            var id = $(this).data('source-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {

                    var url = "{{ route('lead-source-settings.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('.row'+id).fadeOut();
                            }
                        }
                    });
                }
            });
        });
        /* LEAD SOURCE SCRIPTS */

        /* LEAD STATUS SCRIPTS */

        $('body').on('click', '.set_default_status', function() {
            var id = $(this).data('status-id');

            var url = "{{ route('leadSetting.statusUpdate', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                type: "GET",
                blockUI: true,
                container: '#editSettings',
                success: function(response) {
                    if (response.status == "success") {
                        window.location.reload();
                    }
                }
            })

        });

        /* open add status modal */
        $('body').on('click', '#addStatus', function() {
            var url = "{{ route('lead-status-settings.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* open edit status modal */
        $('body').on('click', '.edit-status', function() {
            var statusId = $(this).data('status-id');
            var url = "{{ route('lead-status-settings.edit', ':id ') }}";
            url = url.replace(':id', statusId);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.delete-status', function() {
            var id = $(this).data('status-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {

                    var url = "{{ route('lead-status-settings.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('.row'+id).fadeOut();
                            }
                        }
                    });
                }
            });
        });

        /* LEAD STATUS SCRIPTS */

        /* LEAD CATEGORY */

        /* open add category modal */
        $('body').on('click', '#addCategory', function() {
            var url = "{{ route('leadCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* open edit source modal */
        $('body').on('click', '.edit-category', function() {
            var categoryId = $(this).data('category-id');
            var url = "{{ route('leadCategory.edit', ':id ') }}";
            url = url.replace(':id', categoryId);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /* delete source */
        $('body').on('click', '.delete-category', function() {
            var id = $(this).data('category-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {

                    var url = "{{ route('leadCategory.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('.row'+id).fadeOut();
                            }
                        }
                    });
                }
            });
        });
        /* LEAD CATEGORY */

    </script>
@endpush
