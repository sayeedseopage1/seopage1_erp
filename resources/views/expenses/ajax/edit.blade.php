@php
$addExpenseCategoryPermission = user()->permission('manage_expense_category');
$approveExpensePermission = user()->permission('approve_expenses');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-expense-data-form">
            @method('PUT')
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.expense') @lang('app.details')</h4>
                <div class="row p-20">
                    <div class="col-md-6 col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.expenses.itemName')"
                            fieldName="item_name" fieldRequired="true" fieldId="item_name"
                            :fieldPlaceholder="__('placeholders.expense.item')" :fieldValue="$expense->item_name" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.select :fieldLabel="__('modules.invoices.currency')" fieldName="currency_id"
                            fieldRequired="true" fieldId="currency_id">
                            @foreach ($currencies as $currency)
                                <option @if ($currency->id == $expense->currency_id) selected @endif value="{{ $currency->id }}">
                                    {{ $currency->currency_name }} - ({{ $currency->currency_symbol }})
                                </option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.price')" fieldName="price"
                            fieldRequired="true" fieldId="price" :fieldPlaceholder="__('placeholders.price')"
                            :fieldValue="$expense->price" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.datepicker fieldId="purchase_date" fieldRequired="true"
                            :fieldLabel="__('modules.expenses.purchaseDate')" fieldName="purchase_date"
                            :fieldPlaceholder="__('placeholders.date')"
                            :fieldValue="$expense->purchase_date->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-md-6 col-lg-4">
                        <x-forms.label class="mt-3" fieldId="project_id" :fieldLabel="__('app.project')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="project_id" id="project_id"
                                data-live-search="true" data-size="8">
                                <option value="">--</option>
                                @foreach ($projects as $project)
                                    <option @if ($project->id == $expense->project_id) selected @endif value="{{ $project->id }}">
                                        {{ mb_ucwords($project->project_name) }}
                                    </option>
                                @endforeach
                            </select>
                        </x-forms.input-group>
                    </div>

                    @if (user()->permission('add_expenses') == 'all')
                        <div class="col-md-6 col-lg-4">
                            <x-forms.label class="mt-3" fieldId="user_id" :fieldLabel="__('app.employee')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control select-picker" name="user_id" id="user_id"
                                    data-live-search="true" data-size="8">
                                    <option value="">--</option>
                                    @foreach ($employees as $item)
                                        <option @if ($item->id == $expense->user_id) selected @endif
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    @else
                        <input type="hidden" name="user_id" value="{{ user()->id }}">
                    @endif

                    <div class="col-lg-4 col-md-6">
                        <x-forms.label class="mt-3" fieldId="category_id"
                            :fieldLabel="__('modules.expenses.expenseCategory')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <select class="form-control select-picker" name="category_id" id="expense_category_id"
                                data-live-search="true">
                                <option value="">--</option>
                                @foreach ($categories as $category)
                                    <option @if ($category->id == $expense->category_id) selected @endif value="{{ $category->id }}">
                                        {{ mb_ucwords($category->category_name) }}
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

                    <div class="col-lg-4 col-md-6">
                        <x-forms.text :fieldLabel="__('modules.expenses.purchaseFrom')" fieldName="purchase_from"
                            fieldId="purchase_from" :fieldPlaceholder="__('placeholders.expense.vendor')"
                            :fieldValue="$expense->purchase_from" />
                    </div>

                    @if (
                        $approveExpensePermission != 'none'
                        && (
                            $approveExpensePermission == 'all'
                            || ($approveExpensePermission == 'added' && $expense->added_by == user()->id)
                            || ($approveExpensePermission == 'owned' && $expense->user_id == user()->id)
                            || ($approveExpensePermission == 'both' && ($expense->user_id == user()->id || $expense->added_by == user()->id))
                            )
                        )
                        <div class="col-lg-4 col-md-6">
                            <x-forms.select :fieldLabel="__('app.status')" fieldName="status" fieldId="status">
                                <option @if ($expense->status == 'approved') selected @endif>@lang('app.approved')
                                </option>
                                <option @if ($expense->status == 'pending') selected @endif>@lang('app.pending')</option>
                                <option @if ($expense->status == 'rejected') selected @endif>@lang('app.rejected')
                                </option>
                            </x-forms.select>
                        </div>
                    @endif

                    <div class="col-lg-12">
                        <x-forms.file :fieldLabel="__('app.bill')" fieldName="bill" fieldId="bill"
                            :fieldValue="$expense->bill_url" allowedFileExtensions="txt pdf doc xls xlsx docx rtf png jpg jpeg" :popover="__('messages.fileFormat.multipleImageFile')" />
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-12">
                        @if (!is_null($expense->bill))
                            <x-file-card :fileName="$expense->bill" :dateAdded="$expense->created_at->diffForHumans()">
                                <i class="fa fa-file text-lightest"></i>
                                <x-slot name="action">
                                    <div class="dropdown ml-auto file-action">
                                        <button
                                            class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                            type="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>

                                        <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                            aria-labelledby="dropdownMenuLink" tabindex="0">
                                            <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                target="_blank" href="{{ $expense->bill_url }}">@lang('app.view')</a>
                                        </div>
                                    </div>
                                </x-slot>
                            </x-file-card>
                        @endif

                    </div>


                </div>

                @if (isset($fields) && count($fields) > 0)
                    <div class="row p-20">
                        @foreach ($fields as $field)
                            <div class="col-md-4">
                                @if ($field->type == 'text')
                                    <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required == 'yes') ? 'true' : 'false'"
                                        :fieldValue="$expense->custom_fields_data['field_'.$field->id] ?? ''">
                                    </x-forms.text>
                                @elseif($field->type == 'password')
                                    <x-forms.password
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldValue="$expense->custom_fields_data['field_'.$field->id] ?? ''">
                                    </x-forms.password>
                                @elseif($field->type == 'number')
                                    <x-forms.number
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldValue="$expense->custom_fields_data['field_'.$field->id] ?? ''">
                                    </x-forms.number>
                                @elseif($field->type == 'textarea')
                                    <x-forms.textarea :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldPlaceholder="$field->label"
                                        :fieldValue="$expense->custom_fields_data['field_'.$field->id] ?? ''">
                                    </x-forms.textarea>
                                @elseif($field->type == 'radio')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        <div class="d-flex">
                                            @foreach ($field->values as $key => $value)
                                                <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                                    :fieldLabel="$value"
                                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                    :fieldValue="$value"
                                                    :checked="(isset($expense) && $expense->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
                                            @endforeach
                                        </div>
                                    </div>
                                @elseif($field->type == 'select')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($expense) ? $expense->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                    </div>
                                @elseif($field->type == 'date')
                                    <x-forms.datepicker custom="true"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldValue="($expense->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($expense->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                        :fieldPlaceholder="$field->label" />
                                @elseif($field->type == 'checkbox')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        <div class="d-flex checkbox-{{$field->id}}">
                                            <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$expense->custom_fields_data['field_'.$field->id]}}">

                                            @foreach ($field->values as $key => $value)
                                                <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                    :fieldLabel="$value"
                                                    fieldName="$field->name.'_'.$field->id.'[]'"
                                                    :fieldValue="$value"
                                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                                    onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                    :checked="$expense->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $expense->custom_fields_data['field_'.$field->id]))"
                                                    />
                                            @endforeach
                                        </div>
                                    </div>
                                @endif

                            </div>
                        @endforeach
                    </div>
                @endif


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

        const dp1 = datepicker('#purchase_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $expense->purchase_date) }}"),
            ...datepickerConfig
        });

        $('#save-expense-form').click(function() {
            const url = "{{ route('expenses.update', $expense->id) }}";
            var data = $('#save-expense-data-form').serialize();

            $.easyAjax({
                url: url,
                container: '#save-expense-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-expense-form",
                data: data,
                file: true
            });
        });

        $('#addExpenseCategory').click(function() {
            const url = "{{ route('expenseCategory.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id){
        var checkedData = '';
        $('.'+parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData+', '+$(this).val() : $(this).val();
        });
        $('#'+id).val(checkedData);
    }
</script>
