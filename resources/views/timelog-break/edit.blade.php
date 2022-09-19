<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.edit') @lang('modules.timeLogs.break')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="editTimelogBreak" method="PUT">
        <div class="row">
            <div class="col-sm-6">
                <div class="bootstrap-timepicker timepicker">
                    <x-forms.text :fieldLabel="__('modules.timeLogs.startTime')"
                        :fieldPlaceholder="__('placeholders.hours')" fieldName="start_time"
                        fieldId="start_time" fieldRequired="true"
                        :fieldValue="$timelogBreak->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format)" />
                </div>
            </div>
            <div class="col-sm-6">
                <div class="bootstrap-timepicker timepicker">
                    <x-forms.text :fieldLabel="__('modules.timeLogs.endTime')"
                        :fieldPlaceholder="__('placeholders.hours')" fieldName="end_time"
                        fieldId="end_time" fieldRequired="true"
                        :fieldValue="$timelogBreak->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format)" />
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-secondary class="mr-3" id="delete-break" icon="trash">@lang('app.delete')</x-forms.button-secondary>
    <x-forms.button-primary id="save-category" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('#start_time, #end_time').timepicker({
        @if (global_setting()->time_format == 'H:i')
            showMeridian: false,
        @endif
    });

    $('#save-category').click(function() {
        var url = "{{ route('timelog-break.update', $timelogBreak->id) }}";
        $.easyAjax({
            url: url,
            container: '#editTimelogBreak',
            type: "POST",
            data: $('#editTimelogBreak').serialize(),
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-category",
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

    $('body').on('click', '#delete-break', function() {
        var id = $(this).data('time-id');
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
                var url = "{{ route('timelog-break.destroy', $timelogBreak->id) }}";

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
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });

</script>
