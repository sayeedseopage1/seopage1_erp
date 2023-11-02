<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.update') @lang('modules.contracts.renewContract')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">

    <x-form id="edit-renew-data-form" method="PUT">
        <div class="row">
            <div class="col-md-6 col-lg-4">
                <x-forms.datepicker fieldId="renew_start_date" fieldRequired="true"
                    :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                    :fieldValue="$renew->start_date->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div>

            <div class="col-md-6 col-lg-4">
                <x-forms.datepicker fieldId="renew_end_date"
                    :fieldValue="(($renew->end_date==null) ? $renew->end_date : $renew->end_date->timezone(global_setting()->timezone)->format(global_setting()->date_format))"
                    :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div>

            <div class="col-md-6 col-lg-4">
                <x-forms.label class="mt-3" fieldId="amount" :fieldLabel="__('modules.contracts.contractValue')"
                    :popover="__('modules.contracts.setZero')"></x-forms.label>
                <x-forms.input-group>
                    <x-slot name="append">
                        <span
                            class="input-group-text height-35 border bg-white">{{ global_setting()->currency->currency_code }}</span>
                    </x-slot>

                    <input type="number" min="0" name="amount" value="{{ $renew->amount ?? '' }}"
                        class="form-control height-35 f-14" />
                </x-forms.input-group>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-edit-renew" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $(document).ready(function() {

        const dp3 = datepicker('#renew_start_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $renew->start_date) }}"),
            onSelect: (instance, date) => {
                if (typeof dp4.dateSelected !== 'undefined' && dp4.dateSelected.getTime() < date
                    .getTime()) {
                        dp4.setDate(date, true)
                }
                if (typeof dp4.dateSelected === 'undefined') {
                    dp4.setDate(date, true)
                }
                dp4.setMin(date);
            },
            ...datepickerConfig
        });

        const dp4 = datepicker('#renew_end_date', {
            position: 'bl',
            dateSelected: new Date("{{ $renew->end_date ? str_replace('-', '/', $renew->end_date) : str_replace('-', '/', now()) }}"),
            onSelect: (instance, date) => {
                dp3.setMax(date);
            },
            ...datepickerConfig
        });

        $('#save-edit-renew').click(function() {

            const url = "{{ route('contract-renew.update', $renew->id) }}";

            $.easyAjax({
                url: url,
                container: '#edit-renew-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-edit-renew",
                data: $('#edit-renew-data-form').serialize(),
                success: function(response) {
                    if (response.status == "success") {
                        document.getElementById('comment-list').innerHTML = response.view;
                        $(MODAL_LG).modal('hide');
                    }

                }
            });
        });

        init(MODAL_LG)
    });

</script>
