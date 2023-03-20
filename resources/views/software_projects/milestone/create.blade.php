<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.createMilestone')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<x-form id="addProjectMilestoneForm">
    <div class="modal-body">
        <input type="hidden" name="project_id" value="{{ $project->id }}">
       @php
           $project_milestone= App\Models\ProjectMilestone::where('project_id',$project->id)->first();
           $currency= App\Models\Currency::where('id',$project_milestone->original_currency_id)->first();
           //dd($currency);
       @endphp
        <div class="row">
            <div class="col-md-6">
                <x-forms.text fieldId="milestone_title" :fieldLabel="__('modules.projects.milestoneTitle')"
                    fieldName="milestone_title" fieldRequired="true" :fieldPlaceholder="__('placeholders.milestone')">
                </x-forms.text>
            </div>
            <div class="col-md-6">
                <x-forms.number fieldId="cost" :fieldLabel="__('modules.projects.milestoneCost')" fieldName="actual_cost"
                    :fieldPlaceholder="__('placeholders.price')">
                    </x-forms.text>
            </div>
            <div class="col-md-6">
                <div class="form-group my-3">
    <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency
    
    </label>

    <input type="text" class="form-control height-35 f-14" placeholder="" readonly value="{{$currency->currency_code}}" name="original_currency_id" id="original_currency_id">

    </div>
            </div>

            {{-- <div class="col-md-6">
                <x-forms.text fieldId="original_currency_id" :fieldLabel="__('Currency')" fieldName="original_cueency_id" fieldValue="USD" fieldReadonly="true"
                    :fieldPlaceholder="__('')">
                    </x-forms.text>
            </div> --}}
            {{-- <div class="col-md-6">
                <x-forms.select fieldId="status" :fieldLabel="__('app.status')" fieldName="status">
                    <option value="incomplete">@lang('app.incomplete')</option>
                    <option value="complete">@lang('app.complete')</option>
                </x-forms.select>
            </div> --}}
            <div class="col-md-6">
                <x-forms.select fieldId="milestone_type" fieldRequired="true" :fieldLabel="__('Milestone Type')"
                    fieldName="milestone_type">
                    <option value="Proposed Milestone">Proposed Milestone</option>
                    <option value="Client Agreed to this Milestone">Client Agreed to this Milestone</option>
                      <option value="Client Created this Milestone">Client Created this Milestone</option>
                </x-forms.select>
            </div>
            <div class="col-md-12">
                <x-forms.textarea class="ckeditor mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.projects.milestoneSummary')"
                    fieldName="summary" fieldId="summary"
                    :fieldPlaceholder="__('placeholders.milestoneSummary')">
                </x-forms.textarea>
            </div>

          {{--  <div class="col-md-6">
                <x-forms.datepicker fieldId="start_date"
                    :fieldLabel="__('modules.timeLogs.startDate')" fieldName="start_date"
                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div>

            <div class="col-md-6">
                <x-forms.datepicker fieldId="end_date"
                    :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                    :fieldPlaceholder="__('placeholders.date')" />
            </div> --}}

        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <x-forms.button-primary id="save-project-milestone" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>

</x-form>
<script src="//cdn.ckeditor.com/4.14.1/standard/ckeditor.js"></script>
<script>

$(document).ready(function() {
    $("#addProjectMilestoneForm .select-picker").selectpicker();

        const dp1 = datepicker('#start_date', {
            position: 'bl',
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

        const dp2 = datepicker('#end_date', {
            position: 'bl',
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });
    });
    $('#save-project-milestone').click(function() {
        var url = "{{ route('milestones.store') }}";
        $.easyAjax({
            url: url,
            container: '#addProjectMilestoneForm',
            type: "POST",
            blockUI: true,
            disableButton: true,
            buttonSelector: '#save-project-milestone',
            data: $('#addProjectMilestoneForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
