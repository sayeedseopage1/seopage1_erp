<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.edit') @lang('modules.lead.followUp')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="portlet-body">

        <x-form id="followUpForm" method="POST" class="ajax-form">
            <input type="hidden" name="lead_id" value="{{ $follow->lead_id }}">
            <input type="hidden" name="id" value="{{ $follow->id }}">
            <div class="form-body">
                <div class="row">

                    <div class="col-md-6">
                        <x-forms.datepicker fieldId="next_follow_up_date" fieldRequired="true"
                            :fieldLabel="__('modules.lead.leadFollowUp')" fieldName="next_follow_up_date"
                            :fieldValue="$follow->next_follow_up_date->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>
                    <div class="col-md-6">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text fieldLabel="Start Time" :fieldPlaceholder="__('placeholders.hours')" fieldName="start_time" fieldId="start_time" fieldRequired="true" :fieldValue="$follow->next_follow_up_date->format(global_setting()->time_format)"/>
                        </div>
                    </div>

                     <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.reminder')" fieldName="send_reminder"
                            fieldId="send_reminder" fieldValue="yes" fieldRequired="true"
                            :checked="$follow->send_reminder == 'yes'" />
                    </div>

                    <div class="col-lg-12 send_reminder_div @if ($follow->send_reminder == null) d-none @endif">
                        <div class="row">
                            <div class="col-lg-6 mt-1">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.events.remindBefore')" fieldName="remind_time"
                                    fieldId="remind_time" :fieldValue="$follow->remind_time" fieldRequired="true" />
                            </div>
                            <div class="col-md-6 mt-3">
                                <x-forms.select fieldId="remind_type" fieldLabel="" fieldName="remind_type"
                                    search="true">
                                    <option @if ($follow->remind_type == 'day') selected @endif value="day">@lang('app.day')</option>
                                    <option @if ($follow->remind_type == 'hour') selected @endif value="hour">@lang('app.hour')</option>
                                    <option @if ($follow->remind_type == 'minute') selected @endif value="minute">@lang('app.minute')
                                    </option>
                                </x-forms.select>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.lead.remark')"
                                fieldName="remark" fieldId="remark"
                                fieldPlaceholder="" :fieldValue="$follow->remark">
                            </x-forms.textarea>
                        </div>
                    </div>
                </div>
            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-followup" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $(".select-picker").selectpicker();

    $('#start_time').timepicker({
            @if (global_setting()->time_format == 'H:i')
                showMeridian: false,
            @endif
        });

    var dp1 = datepicker('#next_follow_up_date', {
        position: 'bl',
        dateSelected: new Date("{{ str_replace('-', '/', $follow->next_follow_up_date) }}"),
        onSelect: (instance, date) => {
            if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                .getTime()) {
                dp2.setDate(date, true)
            }
            if (typeof dp2.dateSelected === 'undefined') {
                dp2.setDate(date, true)
            }
            dp2.setMin(date);
        },
        ...datepickerConfig
    });

    $('#send_reminder').change(function() {
            $('.send_reminder_div').toggleClass('d-none');
        })

    // save followup
    $('#save-followup').click(function() {
        $.easyAjax({
            url: "{{ route('leads.follow_up_update') }}",
            container: '#followUpForm',
            type: "POST",
            blockUI: true,
            data: $('#followUpForm').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    });

</script>
