@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <x-forms.link-primary link="javascript:;" class="mr-3 float-left d-none actionBtn emergency-contacts-btn" icon="plus">
                            @lang('app.create') @lang('app.new')
                        </x-forms.link-primary>
                    </div>
                </div>
            </x-slot>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs px-4 border-bottom-grey">
                        <div class="nav" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link f-15 active profile"
                                href="{{ route('profile-settings.index') }}" role="tab" aria-controls="nav-profiles"
                                aria-selected="true">@lang('app.profile')
                            </a>

                            @if (!in_array('client', user_roles()))
                                <a class="nav-item nav-link f-15 emergency-contacts"
                                href="{{ route('profile-settings.index') }}?tab=emergency-contacts" role="tab"
                                aria-controls="nav-profile" aria-selected="true" ajax="false">@lang('modules.emergencyContact.emergencyContact')
                                </a>
                            @endif
                        </div>
                    </nav>
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

                        $('#nav-tabContent .flex-wrap').html(response.html);

                        init('#nav-tabContent');
                    }
                }
            });

        });

        // Add new emergency contact modal
        $('body').on('click', '.emergency-contacts-btn', function() {
            var url = "{{ route('emergency-contacts.create') }}";

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        // Edit emergency contact modal
        $('body').on('click', '.edit-contact', function() {
            var id = $(this).data('contact-id');

            var url = "{{ route('emergency-contacts.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        // Show emergency contact modal
        $('body').on('click', '.show-contact', function() {
            var id = $(this).data('contact-id');

            var url = "{{ route('emergency-contacts.show', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        // Delete emergency contact
        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('row-id');
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
                    var url = "{{ route('emergency-contacts.destroy', ':id') }}";
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
                                $('.tableRow'+id).hide();
                            }
                        }
                    });
                }
            });
        });

    </script>
@endpush
