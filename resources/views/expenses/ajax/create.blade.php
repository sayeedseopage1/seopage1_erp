@php
$addExpenseCategoryPermission = user()->permission('manage_expense_category');
@endphp

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-expense-data-form">
            @include('sections.password-autocomplete-hide')

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

                    <div class="col-md-6 col-lg-4">
                        <x-forms.datepicker fieldId="purchase_date" fieldRequired="true"
                            :fieldLabel="__('modules.expenses.purchaseDate')" fieldName="purchase_date"
                            :fieldPlaceholder="__('placeholders.date')"
                            :fieldValue="\Carbon\Carbon::today()->format(global_setting()->date_format)" />
                    </div>

                    @if (user()->permission('add_expenses') == 'all')
                        <div class="col-md-6 col-lg-4">
                            <x-forms.label class="mt-3" fieldId="user_id" :fieldLabel="__('app.employee')" fieldRequired="true">
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
                        @if(isset($projectName))
                            <input type="hidden" name="project_id" id="project_id" value="{{ $projectId }}">
                            <x-forms.text :fieldLabel="__('app.project')" fieldName="projectName" fieldId="projectName" :fieldValue="$projectName" fieldReadOnly="true" />
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

                @if (isset($fields) && count($fields) > 0)
                    <div class="row p-20">
                        @foreach ($fields as $field)
                            <div class="col-md-4">
                                @if ($field->type == 'text')
                                    <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.text>
                                @elseif($field->type == 'password')
                                    <x-forms.password
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.password>
                                @elseif($field->type == 'number')
                                    <x-forms.number
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.number>
                                @elseif($field->type == 'textarea')
                                    <x-forms.textarea :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldPlaceholder="$field->label">
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
                                                    :fieldValue="$value" :checked="($key == 0) ? true : false" />
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
                                        {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($editUser) ? $editUser->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                    </div>
                                @elseif($field->type == 'date')
                                    <x-forms.datepicker custom="true"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                        :fieldPlaceholder="$field->label" />
                                @elseif($field->type == 'checkbox')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        <div class="d-flex checkbox-{{$field->id}}">
                                            <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">

                                            @foreach ($field->values as $key => $value)
                                                <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                    :fieldLabel="$value"
                                                    fieldName="$field->name.'_'.$field->id.'[]'"
                                                    :fieldValue="$value"
                                                    onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                    :fieldRequired="($field->required === 'yes') ? true : false" />
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
            ...datepickerConfig
        });

        $('#save-expense-form').click(function() {
            const url = "{{ route('expenses.store') }}";
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

        $('body').on('change', '#user_id', function(){
            let userId = $(this).val();

            const url = "{{ route('expenses.get_employee_projects') }}";
            let data = $('#save-expense-data-form').serialize();

            $.easyAjax({
                url: url,
                type: "GET",
                data: {'userId' : userId},
                success: function(response) {
                    $('#project_id').html('<option value="">--</option>'+response.data);
                    $('#project_id').selectpicker('refresh')
                    $('#expense_category_id').html('<option value="">--</option>'+response.category);
                    $('#expense_category_id').selectpicker('refresh')
                }
            });

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
