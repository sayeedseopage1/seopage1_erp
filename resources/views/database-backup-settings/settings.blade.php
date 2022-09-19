<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.databaseBackup.autobackup')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">

    <x-form id="update-backup-settings">
        <div class="row">
            <div class="col-lg-12">
                <x-forms.checkbox :fieldLabel="__('modules.databaseBackup.enableCron')" fieldName="status"
                    fieldId="status" fieldValue="active" fieldRequired="true"
                    :checked="$backupSetting->status == 'active'" />
            </div>
            <div class="col-sm-12 mt-2 {{ $backupSetting->status != 'active' ? 'd-none' : '' }} " id="backup_details">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="bootstrap-timepicker">
                            <x-forms.text fieldId="hour_of_day" :fieldLabel="__('modules.databaseBackup.hourOfDayForbackup')"
                                fieldName="hour_of_day" fieldRequired="true" fieldPlaceholder="" :fieldValue="\Carbon\Carbon::createFromFormat('H:i:s', $backupSetting->hour_of_day)->format(global_setting()->time_format)">
                            </x-forms.text>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" fieldId="backup_after_days" :fieldLabel="__('modules.databaseBackup.createBackupAfterDay')"
                            fieldName="backup_after_days" fieldRequired="true" :fieldValue="$backupSetting->backup_after_days" />
                    </div>
                    <div class="col-sm-12">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" fieldId="delete_backup_after_days" :fieldLabel="__('modules.databaseBackup.deleteBackupAfter')"
                            fieldName="delete_backup_after_days" fieldRequired="true" :fieldValue="$backupSetting->delete_backup_after_days" />
                    </div>
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-settings" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $(document).ready(function() {

        $('#hour_of_day').timepicker({
            @if (global_setting()->time_format == 'H:i')
                showMeridian: false,
            @endif
            minuteStep: 60,
        });

        $('#save-settings').click(function() {
            var url = "{{ route('database-backup-settings.store') }}";
            $.easyAjax({
                url: url,
                container: '#update-backup-settings',
                type: "POST",
                data: $('#update-backup-settings').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        $(MODAL_DEFAULT).modal('hide');
                        window.location.reload();
                    }
                }
            })
        });

        $("#status").change(function(event) {
            $('#backup_details').toggleClass('d-none');
        });

    });


</script>
