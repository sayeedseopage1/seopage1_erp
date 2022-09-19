<div class="row">
    <div class="col-sm-12">
        <x-form id="save-holiday-data-form" method="put">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.edit') @lang('app.menu.holiday')</h4>
                <div class="row p-20">

                    <div class="col-lg-6">
                        <x-forms.text :fieldLabel="__('app.date')" fieldName="date" fieldId="date"
                            :fieldPlaceholder="__('app.date')"
                            :fieldValue="$holiday->date->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.text :fieldLabel="__('modules.holiday.occasion')" fieldName="occassion"
                                fieldId="occassion" :fieldPlaceholder="__('modules.holiday.occasion')"
                                :fieldValue="$holiday->occassion" />
                        </div>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-holiday-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('holidays.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {

        const dp1 = datepicker('#date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $holiday->date) }}"),
            ...datepickerConfig
        });

        $('#save-holiday-form').click(function() {

            const url = "{{ route('holidays.update', $holiday->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-holiday-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-holiday-form",
                data: $('#save-holiday-data-form').serialize(),
                success: function(response) {
                    window.location.href = response.redirectUrl;
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
