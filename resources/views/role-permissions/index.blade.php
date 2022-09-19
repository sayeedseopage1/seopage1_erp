@extends('layouts.app')

@push('styles')
    <style>
        .role-permission-select .btn {
            border: none;
            width: auto;
        }

    </style>
@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <x-forms.button-primary icon="users-cog" id="add-role" class="mb-2">
                            @lang('modules.roles.addRole')
                        </x-forms.button-primary>
                    </div>
                </div>
            </x-slot>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100">
                @forelse($roles as $role)
                    <div class="d-flex justify-content-between border rounded my-3 px-4 py-2 align-items-center">
                        <div>
                            <div class="heading-h4">{{ mb_ucwords($role->display_name) }}</div>
                            <div class="simple-text text-lightest mt-1">{{ $role->users_count }} @lang('app.member')
                            </div>
                        </div>
                        <div>
                            <x-forms.button-secondary class="view-permission" data-role-id="{{ $role->id }}" icon="key">
                                @lang('modules.permission.permissions')
                            </x-forms.button-secondary>
                        </div>
                    </div>
                    <div class="table-sm-responsive role-permissions" id="role-permission-{{ $role->id }}"></div>
                @empty
                @endforelse
            </div>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>
        $('body').on('click', '.view-permission', function() {
            var roleId = $(this).data('role-id');
            var url = "{{ route('role-permissions.permissions') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: '.settings-box',
                type: "POST",
                data: {
                    'roleId': roleId,
                    '_token': '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {

                        if ($('#role-permission-' + roleId).html() != '') {
                            $('.role-permissions').html('');                            
                        } else {
                            $('.role-permissions').html('');                            
                            $('#role-permission-' + roleId).html(response.html);
                        }
                    }
                }
            });
        });

        $('body').on('click', '.reset-permission', function() {
            var roleId = $(this).data('role-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.confirmResetPermission')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('app.yes')",
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

                    var url = "{{ route('role-permissions.reset_permissions') }}";

                    $.easyAjax({
                        url: url,
                        blockUI: true,
                        container: '.settings-box',
                        type: "POST",
                        data: {
                            'roleId': roleId,
                            '_token': '{{ csrf_token() }}'
                        },
                        success: function(response) {
                            if (response.status == 'success') {
                                window.location.reload();
                            }
                        }
                    });
                }
            });
        });

        $('body').on('change', '.role-permission-select', function() {
            var permissionId = $(this).data('permission-id');
            var roleId = $(this).data('role-id');
            var permissionType = $(this).val();
            var url = "{{ route('role-permissions.store') }}";

            $.easyAjax({
                url: url,
                blockUI: true,
                container: '.main-container',
                type: "POST",
                data: {
                    'roleId': roleId,
                    'permissionId': permissionId,
                    'permissionType': permissionType,
                    '_token': '{{ csrf_token() }}'
                }
            });
        });

        $('body').on('click', '.show-custom-permission', function() {
            var moduleRow = $(this).closest('tr');
            var moduleId = $(this).data('module-id');
            var roleId = $(this).data('role-id');
            var url = "{{ route('role-permissions.custom_permissions') }}";
            var showCustomPermissionButton = $(this);

            $.easyAjax({
                url: url,
                blockUI: true,
                container: '#role-permission-' + roleId,
                type: "POST",
                data: {
                    'roleId': roleId,
                    'moduleId': moduleId,
                    '_token': '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        if ($('#role-permission-' + roleId).find(
                                'table.permisison-table tbody #module-custom-permission-' + moduleId)
                            .length > 0) {
                            $('#role-permission-' + roleId).find(
                                'table.permisison-table tbody #module-custom-permission-' + moduleId
                            ).remove();
                        } else {
                            moduleRow.after(response.html);
                        }
                        showCustomPermissionButton
                            .find(".svg-inline--fa")
                            .toggleClass("fa-chevron-down fa-chevron-up");
                    }
                }
            });
        });


        $('body').on('click', '#add-role', function() {
            var url = "{{ route('role-permissions.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });
    </script>
@endpush
