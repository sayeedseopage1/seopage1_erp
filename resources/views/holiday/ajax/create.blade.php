<div class="row">
    <div class="col-sm-12">
        <x-form id="save-holiday-data-form" method="post">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.add') @lang('app.menu.holiday')</h4>
                <div class="row pl-20 pr-20 pt-20">
                    <div class="col-lg-5">
                        <x-forms.text class="date-picker" :fieldLabel="__('app.date')" fieldName="date[]"
                            fieldId="dateField1" :fieldPlaceholder="__('app.date')" fieldValue=""
                            fieldRequired="true" />
                    </div>
                    <div class="col-lg-5">
                        <div class="form-group my-3">
                            <x-forms.text :fieldLabel="__('modules.holiday.occasion')" fieldName="occassion[]"
                                fieldId="occassion1" :fieldPlaceholder="__('modules.holiday.occasion')" fieldValue=""
                                fieldRequired="true" />
                        </div>
                    </div>
                </div>

                <div id="insertBefore"></div>

                <!--  ADD ITEM START-->
                <div class="row px-lg-4 px-md-4 px-3 pb-3 pt-0 mb-3  mt-2">
                    <div class="col-md-12">
                        <a class="f-15 f-w-500" href="javascript:;" id="add-item"><i
                                class="icons icon-plus font-weight-bold mr-1"></i> @lang('app.add')</a>
                    </div>
                </div>
                <!--  ADD ITEM END-->

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

        var $insertBefore = $('#insertBefore');
        var i = 1;

        // Add More Inputs
        $('#add-item').click(function() {
            i += 1;

            $(`<div id="addMoreBox${i}" class="row pl-20 pr-20 clearfix">
                <div class="col-lg-5 col-md-6 col-12"> <x-forms.text class="date-picker" :fieldLabel="__('app.date')" fieldName="date[]"
                fieldId="dateField${i}" :fieldPlaceholder="__('app.date')" fieldValue="" fieldRequired="true"  />
                </div>  <div class="col-lg-5 col-md-5 col-10"> <div class="form-group my-3">
                <x-forms.text :fieldLabel="__('modules.holiday.occasion')" fieldName="occassion[]" fieldId="occassion${i}" :fieldPlaceholder="__('modules.holiday.occasion')" fieldValue="" fieldRequired="true" />
                </div> </div> <div class="col-lg-2 col-md-1 col-2"><a href="javascript:;" class="d-flex align-items-center justify-content-center mt-5 remove-item" data-item-id="${i}"><i class="fa fa-times-circle f-20 text-lightest"></i></a></div> </div> `)
                .insertBefore($insertBefore);


            // Recently Added date picker assign
            datepicker('#dateField' + i, {
                position: 'bl',
                ...datepickerConfig
            });
        });

        // Remove fields
        $('body').on('click', '.remove-item', function() {
            var index = $(this).data('item-id');
            $('#addMoreBox' + index).remove();
        });

        const dp1 = datepicker('#dateField1', {
            position: 'bl',
            ...datepickerConfig
        });

        $('#save-holiday-form').click(function() {

            const url = "{{ route('holidays.store') }}";
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
