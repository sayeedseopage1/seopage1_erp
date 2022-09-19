@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card method="POST">

            <x-slot name="buttons">
                <div class="row">
                    <div class="col-md-12 mb-3">

                        <x-forms.button-primary icon="plus" id="create-database-backup" class="type-btn mb-2 actionBtn">
                                @lang('modules.databaseBackup.createDatabaseBackup')
                            </x-forms.button-primary>

                        <x-forms.button-secondary icon="cog" id="auto-backup" class="mb-2 mb-lg-0 mb-md-0 ml-3">
                            @lang('modules.databaseBackup.autobackup')
                        </x-forms.button-secondary>
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


                <div class="row">
                    <div class="col-sm-12 mt-4">
                        <x-alert type="info" icon="info-circle">
                            @lang('messages.databasebackup.note')
                        </x-alert>
                    </div>
                </div>
                @if( $backupSetting->status == "active")
                <div class="row">
                    <div class="col-sm-12 mt-4">
                        <x-alert type="primary" icon="info-circle">
                            @lang('messages.databasebackup.info', ['time' => \Carbon\Carbon::createFromFormat('H:i:s', $backupSetting->hour_of_day)->format(global_setting()->time_format), 'everyDayCount' => $backupSetting->backup_after_days, 'olderDayCount' => $backupSetting->delete_backup_after_days])
                        </x-alert>
                    </div>
                </div>
                @endif

                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-responsive">
                            <x-table class="table-bordered">
                                <x-slot name="thead">
                                    <th>@lang('modules.databaseBackup.backup')</th>
                                    <th>@lang('modules.databaseBackup.backupSize')</th>
                                    <th>@lang('app.date') & @lang('app.time')</th>
                                    <th class="text-right">@lang('app.action')</th>
                                </x-slot>

                                @forelse ($backups as $count => $backup)
                                    <tr class="tableRow{{$count}}">
                                        <td>{{ $backup['file_name'] }}</td>
                                        <td>{{ \App\Http\Controllers\DatabaseBackupSettingController::humanFilesize($backup['file_size']) }}</td>
                                        <td>
                                            {{ \Carbon\Carbon::parse($backup['last_modified'])->timezone(global_setting()->timezone)->format(global_setting()->date_format . ', ' . global_setting()->time_format) }}
                                        </td>
                                        <td class="text-right">
                                            <div class="task_view">
                                                <a class="task_view_more d-flex align-items-center justify-content-center edit-channel" href="{{ route('database-backup-settings.download', $backup['file_name']) }}">
                                                    <i class="fa fa-download icons mr-2"></i>  @lang('app.download')
                                                </a>
                                            </div>
                                            <div class="task_view mt-1 mt-lg-0 mt-md-0">
                                                <a class="task_view_more d-flex align-items-center justify-content-center delete-table-row"  href="javascript:;" data-file-name="{{ $backup['file_name'] }}" data-count="{{ $count }}">
                                                    <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                                                </a>
                                            </div>
                                        </td>

                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="4">
                                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                        </td>
                                    </tr>
                                @endforelse
                            </x-table>

                        </div>
                    </div>
                </div>
            </div>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>

        // Open auto backup setting modal
        $('#auto-backup').click(function() {
            const url = "{{ route('database-backup-settings.create') }}";
            $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_DEFAULT, url);
        });

        // Create backup
        $('#create-database-backup').click(function() {
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.databasebackup.createDatabaseBackupAlert')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.databasebackup.confirmCreateDatabaseBackup')",
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
                    var url = "{{ route('database-backup-settings.create_backup') }}";

                    $.easyAjax({
                        url: url,
                        type: "GET",
                        disableButton: true,
                        buttonSelector: "#create-database-backup",
                        success: function(response) {
                            if (response.status == 'success') {
                                window.location.reload();
                            }
                        }
                    })
                }
            });
        });

        // Delete file
        $('body').on('click', '.delete-table-row', function() {
            var filename = $(this).data('file-name');
            var count = $(this).data('count');

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
                    var url = "{{ route('database-backup-settings.delete', ':filename') }}";
                    url = url.replace(':filename', filename);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'GET',
                        url: url,
                        data: {
                            '_token': token,
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('.tableRow'+count).fadeOut();

                                if(response.fileCount == 0){
                                    $('#example').append(`
                                    <tr>
                                        <td colspan="4">
                                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                        </td>
                                    </tr>`);
                                }

                            }
                        }
                    });
                }
            });
        });

    </script>
@endpush
