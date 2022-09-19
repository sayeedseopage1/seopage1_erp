@php
$addLeadAgentPermission = user()->permission('manage_leave_setting');
$approveRejectPermission = user()->permission('approve_or_reject_leaves');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-lead-data-form" method="put">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.edit') @lang('app.menu.leaves')</h4>
                <div class="row p-20">

                    <div class="col-lg-3 col-md-6">
                        @if (isset($defaultAssign))
                            <x-forms.label class="my-3" fieldId="" :fieldLabel="__('app.name')"
                                fieldRequired="true">
                            </x-forms.label>
                            <input type="hidden" name="user_id" id="user_id" value="{{ $defaultAssign->id }}">
                            <input type="text" value="{{ $defaultAssign->name }}"
                                class="form-control height-35 f-15 readonly-background" readonly>
                        @else
                            <x-forms.select fieldId="user_id" :fieldLabel="__('modules.messages.chooseMember')"
                                fieldName="user_id" search="true" fieldRequired="true">
                                <option value="">--</option>
                                @foreach ($employees as $employee)
                                    <option @if (request()->has('default_assign') && request('default_assign') == $employee->id) selected @endif
                                        @if ($leave->user_id == $employee->id) selected @endif
                                        data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                                        value="{{ $employee->id }}">{{ ucfirst($employee->name) }}</option>
                                @endforeach
                            </x-forms.select>
                        @endif
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.label class="my-3" fieldId="" :fieldLabel="__('modules.leaves.leaveType')"
                            fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="leave_type_id" id="leave_type_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($leaveTypes as $leaveType)
                                    <option @if ($leave->leave_type_id == $leaveType->id) selected @endif value="{{ $leaveType->id }}">
                                        {{ mb_ucwords($leaveType->type_name) }}</option>
                                @endforeach
                            </select>

                            @if ($addLeadAgentPermission == 'all' || $addLeadAgentPermission == 'added')
                                <x-slot name="append">
                                    <button type="button"
                                        class="btn btn-outline-secondary border-grey add-lead-type">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    @if ($approveRejectPermission == 'all')
                        <div class="col-lg-3 col-md-6">
                            <x-forms.select fieldId="status" :fieldLabel="__('app.status')" fieldName="status"
                                search="true">
                                <option @if ($leave->status == 'approved') selected @endif value="approved">@lang('app.approved')</option>
                                <option @if ($leave->status == 'pending') selected @endif value="pending">@lang('app.pending')</option>
                                <option @if ($leave->status == 'rejected') selected @endif value="rejected">@lang('app.rejected')</option>
                            </x-forms.select>
                        </div>
                    @endif

                    <div class="col-lg-3 col-md-6">
                        <x-forms.text :fieldLabel="__('app.date')" fieldName="leave_date" fieldId="single_date"
                            :fieldPlaceholder="__('app.date')"
                            :fieldValue="$leave->leave_date->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.leaves.reason')"
                                fieldName="reason" fieldId="reason" :fieldPlaceholder="__('placeholders.leave.reason')"
                                :fieldValue="$leave->reason" :fieldRequired="true">
                            </x-forms.textarea>
                        </div>
                    </div>

                    @if ($leave->status == 'rejected')
                        <div class="col-md-12">
                            <div class="form-group my-3">
                                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.leaves.rejectReason')" fieldName="reject_reason"
                                    fieldId="reject_reason" fieldPlaceholder="" :fieldValue="$leave->reject_reason">
                                </x-forms.textarea>
                            </div>
                        </div>
                    @endif

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-leave-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('leaves.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {

        const dp1 = datepicker('#single_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $leave->leave_date) }}"),
            ...datepickerConfig
        });

        $('#save-leave-form').click(function() {

            const url = "{{ route('leaves.update', $leave->id) }}";

            $.easyAjax({
                url: url,
                container: '#save-lead-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-leave-form",
                data: $('#save-lead-data-form').serialize(),
                success: function(response) {
                    window.location.href = response.redirectUrl;
                }
            });
        });

        $('body').on('click', '.add-lead-type', function() {
            var url = "{{ route('leaveType.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        init(RIGHT_MODAL);
    });
</script>
