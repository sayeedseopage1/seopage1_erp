{{-- this plugin is used only in leaves create form --}}
@php
$addLeadAgentPermission = user()->permission('manage_leave_setting');
$approveRejectPermission = user()->permission('approve_or_reject_leaves');
@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-datepicker3.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-lead-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.leaves.assignLeave')</h4>
                <div class="row p-20">

                    <div class="col-lg-4 col-md-6">
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
                                        data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                                        value="{{ $employee->id }}">{{ ucfirst($employee->name) }}</option>
                                @endforeach
                            </x-forms.select>
                        @endif
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <x-forms.label class="my-3" fieldId="" :fieldLabel="__('modules.leaves.leaveType')"
                            fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="leave_type_id" id="leave_type_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @if (isset($leaveTypes))
                                    @foreach ($leaveTypes as $leaveType)
                                        <option value="{{ $leaveType->id }}">{{ mb_ucwords($leaveType->type_name) }}
                                        </option>
                                    @endforeach
                                @endif
                                @if (isset($leaveQuotas))
                                    @foreach ($leaveQuotas as $leaveQuota)
                                        @if ($leaveQuota->no_of_leaves > 0)
                                            <option value="{{ $leaveQuota->leaveType->id }}">{{ mb_ucwords($leaveQuota->leaveType->type_name) }}
                                            </option>
                                        @endif
                                    @endforeach
                                @endif
                            </select>

                            @if ($addLeadAgentPermission == 'all' || $addLeadAgentPermission == 'added')
                                <x-slot name="append">
                                    <button type="button"
                                        class="btn btn-outline-secondary border-grey add-lead-type2">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    @if ($approveRejectPermission == 'all')
                        <div class="col-lg-4 col-md-6">
                            <x-forms.select fieldId="status" :fieldLabel="__('app.status')" fieldName="status"
                                search="true">
                                <option value="approved">@lang('app.approved')</option>
                                <option value="pending">@lang('app.pending')</option>
                            </x-forms.select>
                        </div>
                    @endif

                    <div class="col-md-6 col-lg-4">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100"
                                for="usr">@lang('modules.leaves.selectDuration')</label>
                            <div class="d-block d-lg-flex d-md-flex">
                                <x-forms.radio fieldId="duration_single" :fieldLabel="__('modules.leaves.single')"
                                    fieldName="duration" fieldValue="single" checked="true">
                                </x-forms.radio>
                                <x-forms.radio fieldId="duration_multiple" :fieldLabel="__('modules.leaves.multiple')"
                                    fieldValue="multiple" fieldName="duration"></x-forms.radio>

                                <x-forms.radio fieldId="half_day_first" :fieldLabel="__('modules.leaves.firstHalf')"
                                    fieldName="duration" fieldValue="first_half">
                                </x-forms.radio>
                                <x-forms.radio fieldId="half_day_second" :fieldLabel="__('modules.leaves.secondHalf')"
                                    fieldValue="second_half" fieldName="duration"></x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 single_date_div">
                        <x-forms.text :fieldLabel="__('app.date')" fieldName="leave_date" fieldId="single_date"
                            :fieldPlaceholder="__('app.date')"
                            :fieldValue="Carbon\Carbon::today()->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-lg-4 col-md-6 d-none multi_date_div">
                        <x-forms.text :fieldLabel="__('messages.selectMultipleDates')" fieldName="multi_date"
                            fieldId="multi_date" :fieldPlaceholder="__('messages.selectMultipleDates')"
                            :fieldValue="Carbon\Carbon::today()->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-lg-2 col-md-6 mt-5">
                        <p id="users"></p>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.leaves.reason')"
                                fieldName="reason" fieldId="reason" fieldRequired="true"
                                :fieldPlaceholder="__('placeholders.leave.reason')">
                            </x-forms.textarea>
                        </div>
                    </div>

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

{{-- this plugin is used only in leaves create form --}}
<script src="{{ asset('vendor/jquery/bootstrap-datepicker.min.js') }}"></script>

<script>
    $(document).ready(function() {
        const dp1 = datepicker('#single_date', {
            onSelect: function () {
                getDate();
            },
            position: 'bl',
            ...datepickerConfig
        });

        const dp2 = $('#multi_date').datepicker({
            linkedCalendars: false,
            multidate: true,
            todayHighlight: true,
            format: 'yyyy-mm-d'

        });

        $('input[type=radio][name=duration]').change(function() {
            if (this.value == 'multiple') {
                const dp2 = $('#multi_date').datepicker('clearDates').datepicker({
                    linkedCalendars: false,
                    multidate: true,
                    todayHighlight: true,
                    format: 'yyyy-mm-d'

                });
            }
        });

        setMinDate($('#user_id').val());

        $('#user_id').on('change', function(e) {
            setMinDate(e.target.value);
        });

        function setMinDate(employeeID) {
            var employees = @json($employees);
            var employee = employees.filter(function(item) {
                return item.id == employeeID;
            });

            if(employees.length > 0 && employee[0] !== undefined)
            {
                var minDate = new Date(employee[0].employee_detail.joining_date);
                dp1.setMin(minDate);
                $('#multi_date').datepicker('setStartDate', minDate);
            }
        }

        $('#save-leave-form').click(function() {

            const url = "{{ route('leaves.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-lead-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-leave-form",
                data: $('#save-lead-data-form').serialize(),
                success: function(response) {
                    if(response.status == 'success'){
                        window.location.href = response.redirectUrl;
                    }
                }
            });
        });

        $('body').on('click', '.add-lead-type2', function() {
            var url = "{{ route('leaveType.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $("input[name=duration]").click(function() {
            $(this).val() == 'multiple' ? $('.multi_date_div').removeClass('d-none') : $(
                '.multi_date_div').addClass('d-none');
            $(this).val() == 'multiple' ? $('.single_date_div').addClass('d-none') : $(
                '.single_date_div').removeClass('d-none');
        });

        $('#user_id').change(function() {
            var id = $(this).val();
            if (id == '') {
                id = 0;
            }
            var url = "{{ route('employee-leaves.employee_leave_types', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-lead-data-form',
                blockUI: true,
                success: function(data) {
                    $('#leave_type_id').html(data.data);
                    $('#leave_type_id').selectpicker('refresh');
                }
            })
        });

        function getDate() {
            let date = $('#single_date').val();
            let url = "{{ route('leaves.date') }}";

            $.easyAjax({
                type: 'GET',
                url: url,
                container: '#save-lead-data-form',
                data: {
                    'date': date
                },
                success: function(response) {
                    if(response.status == 'success'){
                        if(response.users > 0 && response.users < 2){
                            $('#users').text(response.users+' @lang('modules.leaves.employeeOnLeave')');
                        }else if(response.users > 0){
                            $('#users').text(response.users+' @lang('modules.leaves.employeesOnLeave')');
                        }else{
                            $('#users').text('');
                        }
                    }
                }
            });
        };

        init(RIGHT_MODAL);
    });
</script>
