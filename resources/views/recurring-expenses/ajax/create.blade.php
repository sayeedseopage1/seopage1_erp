@php
$addExpenseCategoryPermission = user()->permission('manage_expense_category');

$projectName = '';
foreach ($projects as $project) {
    if ($projectId == $project->id) {
        $projectName = $project->project_name;
    }
}

@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-expense-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.expense') @lang('app.details')</h4>
                <div class="row p-20">
                    <div class="col-md-6 col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.expenses.itemName')"
                            fieldName="item_name" fieldRequired="true" fieldId="item_name"
                            :fieldPlaceholder="__('placeholders.expense.item')" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.select :fieldLabel="__('modules.invoices.currency')" fieldName="currency_id"
                            fieldRequired="true" fieldId="currency_id">
                            @foreach ($currencies as $currency)
                                <option @if ($currency->id == global_setting()->currency_id) selected @endif value="{{ $currency->id }}">
                                    {{ $currency->currency_name }} - ({{ $currency->currency_symbol }})
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.price')" fieldName="price"
                            fieldRequired="true" fieldId="price" :fieldPlaceholder="__('placeholders.price')" />

                    </div>

                    @if (user()->permission('add_expenses') == 'all')
                        <div class="col-md-6 col-lg-4">
                            <x-forms.label class="mt-3" fieldId="user_id" :fieldLabel="__('app.employee')"
                                fieldRequired="true">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control select-picker" name="user_id" id="user_id"
                                    data-live-search="true" data-size="8">
                                    <option value="">--</option>
                                    @foreach ($employees as $item)
                                        <option
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    @else
                        <input type="hidden" name="user_id" value="{{ user()->id }}">
                    @endif

                    <div class="col-md-6 col-lg-4">
                        @if (!empty($projectName))
                            <input type="hidden" name="project_id" id="project_id" value="{{ $projectId }}">
                            <x-forms.text :fieldLabel="__('app.project')" fieldName="projectName" fieldId="projectName"
                                :fieldValue="$projectName" fieldReadOnly="true" />
                        @else
                            <x-forms.select fieldId="project_id" fieldName="project_id" :fieldLabel="__('app.project')"
                                search="true">
                                <option value="">--</option>
                                @foreach ($projects as $project)
                                    <option @if ($projectId == $project->id) selected @endif value="{{ $project->id }}">
                                        {{ mb_ucwords($project->project_name) }}
                                    </option>
                                @endforeach
                            </x-forms.select>
                        @endif
                    </div>

                    <div class="col-md-6">
                        <x-forms.label class="mt-3" fieldId="category_id"
                            :fieldLabel="__('modules.expenses.expenseCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="expense_category_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ mb_ucwords($category->category_name) }}
                                    </option>
                                @endforeach
                            </select>

                            @if ($addExpenseCategoryPermission == 'all' || $addExpenseCategoryPermission == 'added')
                                <x-slot name="append">
                                    <button id="addExpenseCategory" type="button"
                                        class="btn btn-outline-secondary border-grey">@lang('app.add')</button>
                                </x-slot>
                            @endif
                        </x-forms.input-group>
                    </div>

                    <div class="col-md-6">
                        <x-forms.text :fieldLabel="__('modules.expenses.purchaseFrom')" fieldName="purchase_from"
                            fieldId="purchase_from" :fieldPlaceholder="__('placeholders.expense.vendor')" />
                    </div>

                    <div class="col-lg-12">
                        <x-forms.file :fieldLabel="__('app.bill')" fieldName="bill" fieldId="bill" allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg" :popover="__('messages.fileFormat.multipleImageFile')" />
                    </div>


                </div>

                <div class="row px-lg-4 px-md-4 px-3 pt-3">
                    <!-- BILLING FREQUENCY -->
                    <div class="col-md-6 ">
                        <div class="form-group c-inv-select mb-4 my-3">
                            <x-forms.label fieldId="rotation" :fieldLabel="__('modules.invoices.billingFrequency')"
                                fieldRequired="true">
                            </x-forms.label>
                            <select class="form-control select-picker" data-live-search="true" data-size="8"
                                name="rotation" id="rotation">
                                <option value="daily">@lang('app.daily')</option>
                                <option value="weekly">@lang('app.weekly')</option>
                                <option value="bi-weekly">@lang('app.bi-weekly')</option>
                                <option value="monthly">@lang('app.monthly')</option>
                                <option value="quarterly">@lang('app.quarterly')</option>
                                <option value="half-yearly">@lang('app.half-yearly')</option>
                                <option value="annually">@lang('app.annually')</option>
                            </select>
                        </div>
                    </div>
                    <!-- BILLING FREQUENCY -->
                    <!-- DAYOFWEEK -->
                    <div class="col-md-6 dayOfWeek">
                        <div class="form-group c-inv-select mb-4 my-3">
                            <x-forms.label fieldId="day_of_week" :fieldLabel="__('modules.expensesRecurring.dayOfWeek')"
                                fieldRequired="true">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" data-live-search="true" data-size="8"
                                    name="day_of_week" id="day_of_week">
                                    <option value="1">@lang('app.sunday')</option>
                                    <option value="2">@lang('app.monday')</option>
                                    <option value="3">@lang('app.tuesday')</option>
                                    <option value="4">@lang('app.wednesday')</option>
                                    <option value="5">@lang('app.thursday')</option>
                                    <option value="6">@lang('app.friday')</option>
                                    <option value="7">@lang('app.saturday')</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- DAYOFWEEK -->
                    <!-- DAYOFMONTH -->
                    <div class="col-md-6 dayOfMonth">
                        <div class="form-group c-inv-select mb-4 my-3">
                            <x-forms.label fieldId="day_of_month"
                                :fieldLabel="__('modules.expensesRecurring.dayOfMonth')" fieldRequired="true">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" data-live-search="true" data-size="8"
                                    name="day_of_month" id="day_of_month">
                                    @for ($m = 1; $m <= 31; ++$m)
                                        <option value="{{ $m }}">{{ $m }}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- DAYOFMONTH -->
                    <div class="col-lg-6 billingInterval mt-0">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2 mt-0"
                            :fieldLabel="__('modules.invoices.billingCycle')" fieldName="billing_cycle"
                            fieldId="billing_cycle" :fieldHelp="__('messages.setForInfinite')" />
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-expense-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('expenses.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>


<script>
    $(document).ready(function() {
        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        $('#rotation').trigger("change");

        $('#save-expense-form').click(function() {
            const url = "{{ route('recurring-expenses.store') }}";
            var data = $('#save-expense-data-form').serialize();

            $.easyAjax({
                url: url,
                container: '#save-expense-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-expense-form",
                data: data,
                file: true,
                success: function(response) {
                    window.location.href = response.redirectUrl;
                }
            });
        });

        $('#addExpenseCategory').click(function() {
            const url = "{{ route('expenseCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('change', '#user_id', function() {
            let userId = $(this).val();

            const url = "{{ route('expenses.get_employee_projects') }}";
            let data = $('#save-expense-data-form').serialize();

            $.easyAjax({
                url: url,
                type: "GET",
                data: {
                    'userId': userId
                },
                success: function(response) {
                    $('#project_id').html('<option value="">--</option>' + response.data);
                    $('#project_id').selectpicker('refresh')
                }
            });

        });

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id) {
        var checkedData = '';
        $('.' + parentClass).find("input[type= 'checkbox']:checked").each(function() {
            checkedData = (checkedData !== '') ? checkedData + ', ' + $(this).val() : $(this).val();
        });
        $('#' + id).val(checkedData);
    }


    $('#rotation').change(function() {
        var rotationValue = $(this).val();

        if (rotationValue == 'weekly' || rotationValue == 'bi-weekly') {
            $('.dayOfWeek').show().fadeIn(300);
            $('.dayOfMonth').hide().fadeOut(300);
        } else if (rotationValue == 'monthly' || rotationValue == 'quarterly' || rotationValue ==
            'half-yearly' || rotationValue == 'annually') {
            $('.dayOfWeek').hide().fadeOut(300);
            $('.dayOfMonth').show().fadeIn(300);
        } else {
            $('.dayOfWeek').hide().fadeOut(300);
            $('.dayOfMonth').hide().fadeOut(300);
        }
    });
</script>
