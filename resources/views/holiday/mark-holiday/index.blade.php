<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.holiday.markHoliday')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="save-mark-holiday-form">
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize w-100" for="usr">@lang('modules.holiday.officeHolidayMarkDays')</label>
                    <div class="d-flex mt-2">
                        @forelse ($holidaysArray as $key => $holidayData)
                            <x-forms.checkbox class="mr-2 mr-lg-2 mr-md-2" :fieldLabel="$holidayData" fieldName="office_holiday_days[]" :fieldId="$key" :fieldValue="$key" fieldRequired="true" checked="" />
                        @empty
                            <p>@lang('messages.holidayDataNotFound')</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-mark-holiday" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $('body').on('click', '#save-mark-holiday', function() {
            Swal.fire({
                title: "@lang('messages.markHolidayTitle')",
                text: "@lang('messages.noteHolidayText')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmSave')",
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
                    var url = "{{ route('holidays.mark_holiday_store') }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: $('#save-mark-holiday-form').serialize(),
                        success: function(response) {
                            if (response.status == "success") {
                                window.LaravelDataTables["holiday-table"].draw();
                                $(MODAL_LG).modal('hide');
                            }
                        }
                    });
                }
            });
        });

</script>
