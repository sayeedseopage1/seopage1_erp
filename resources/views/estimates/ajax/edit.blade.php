@php
$addProductPermission = user()->permission('add_product');
@endphp


<!-- CREATE INVOICE START -->
<div class="bg-white rounded b-shadow-4 create-inv">
    <!-- HEADING START -->
    <div class="px-lg-4 px-md-4 px-3 py-3">
        <h4 class="mb-0 f-21 font-weight-normal text-capitalize">@lang('app.estimate') @lang('app.details')</h4>
    </div>
    <!-- HEADING END -->
    <hr class="m-0 border-top-grey">
    <!-- FORM START -->
    <x-form class="c-inv-form" id="saveInvoiceForm">
        @method('PUT')
        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY START -->
        <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- INVOICE NUMBER START -->
            <div class="col-md-6 col-lg-4">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize"
                        for="usr">@lang('modules.estimates.estimatesNumber')</label>
                    <x-forms.input-group>
                        <x-slot name="prepend">
                            <span class="input-group-text">{{ invoice_setting()->estimate_prefix }}#</span>
                        </x-slot>
                        <input type="text" name="estimate_number" id="estimate_number"
                            class="form-control height-35 f-15"
                            value="{{ $estimate->original_estimate_number }}">
                    </x-forms.input-group>
                </div>
            </div>
            <!-- INVOICE NUMBER END -->
            <!-- INVOICE DATE START -->
            <div class="col-md-6 col-lg-4">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('modules.estimates.validTill')"
                        fieldRequired="true">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="valid_till" name="valid_till"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ $estimate->valid_till->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- INVOICE DATE END -->

            <!-- FREQUENCY START -->
            <div class="col-md-6 col-lg-4">
                <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                    </x-forms.label>

                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" name="currency_id" id="currency_id">
                            @foreach ($currencies as $currency)
                                <option @if ($estimate->currency_id == $currency->id) selected @endif value="{{ $currency->id }}">
                                    {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <!-- FREQUENCY END -->
        </div>
        <hr class="m-0 border-top-grey">

        <div class="row px-lg-4 px-md-4 px-3 pt-3">

            <!-- CLIENT START -->
            <div class="col-md-4">
                <x-forms.label fieldId="client_id" :fieldLabel="__('app.client')" fieldRequired="true">
                </x-forms.label>
                <div class="form-group c-inv-select mb-4">
                    <select class="form-control select-picker" data-live-search="true" data-size="8" name="client_id"
                        id="client_id">
                        <option value="">--</option>
                        @foreach ($clients as $client)
                            <option @if ($client->id == $estimate->client_id) selected @endif
                                data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                                value="{{ $client->id }}">{{ mb_ucwords($client->name) }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <!-- CLIENT END -->

            <div class="col-md-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="calculate_tax" :fieldLabel="__('modules.invoices.calculateTax')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="calculate_tax" id="calculate_tax">
                            <option value="after_discount">@lang('modules.invoices.afterDiscount')</option>
                            <option value="before_discount" @if ($estimate->calculate_tax == 'before_discount') selected @endif>
                                @lang('modules.invoices.beforeDiscount')</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-md-12 my-3">
                <div class="form-group">
                    <x-forms.label fieldId="description" :fieldLabel="__('app.description')">
                    </x-forms.label>
                    <div id="description">{!! $estimate->description !!}</div>
                    <textarea name="description" id="description-text" class="d-none"></textarea>
                </div>
            </div>

            <!-- CLIENT START -->
            <div class="col-md-4">
                <x-forms.label fieldId="client_id" :fieldLabel="__('app.status')">
                </x-forms.label>
                <div class="form-group c-inv-select mb-4">
                    <select class="form-control select-picker" name="status" id="status">
                        <option @if ($estimate->status == 'accepted') selected @endif value="accepted">@lang('modules.estimates.accepted')
                        </option>
                        <option @if ($estimate->status == 'waiting') selected @endif value="waiting">@lang('modules.estimates.waiting')
                        </option>
                        <option @if ($estimate->status == 'declined') selected @endif value="declined">@lang('modules.estimates.declined')
                        </option>
                        @if ($estimate->status == 'draft')
                            <option @if ($estimate->status == 'draft') selected @endif value="draft">@lang('modules.invoices.draft')
                            </option>
                        @endif
                    </select>
                </div>
            </div>
            <!-- CLIENT END -->

        </div>
        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY END -->

        @if (isset($fields) && count($fields) > 0)
            <div class="row px-lg-4 px-md-4 px-3 pt-3">
                @foreach ($fields as $field)
                    <div class="col-md-4">
                        <div class="form-group">
                            @if ($field->type == 'text')
                                <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required == 'yes') ? 'true' : 'false'"
                                    :fieldValue="$estimate->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.text>
                            @elseif($field->type == 'password')
                                <x-forms.password fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldValue="$estimate->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.password>
                            @elseif($field->type == 'number')
                                <x-forms.number fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldValue="$estimate->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.number>
                            @elseif($field->type == 'textarea')
                                <x-forms.textarea :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldPlaceholder="$field->label"
                                    :fieldValue="$estimate->custom_fields_data['field_'.$field->id] ?? ''">
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
                                                :checked="(isset($estimate) && $estimate->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
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
                                    {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($estimate) ? $estimate->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                </div>
                            @elseif($field->type == 'date')
                                <x-forms.datepicker custom="true"
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldValue="($estimate->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($estimate->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                    :fieldPlaceholder="$field->label" />
                            @elseif($field->type == 'checkbox')
                                <div class="form-group my-3">
                                    <x-forms.label
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.label>
                                    <div class="d-flex checkbox-{{$field->id}}">
                                        <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$estimate->custom_fields_data['field_'.$field->id]}}">

                                        @foreach ($field->values as $key => $value)
                                            <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                :fieldLabel="$value"
                                                fieldName="$field->name.'_'.$field->id.'[]'"
                                                :fieldValue="$value"
                                                :fieldRequired="($field->required === 'yes') ? true : false"
                                                onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                :checked="$estimate->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $estimate->custom_fields_data['field_'.$field->id]))"
                                                />
                                        @endforeach
                                    </div>
                                </div>
                            @endif
                            <div class="form-control-focus"> </div>
                            <span class="help-block"></span>

                        </div>
                    </div>
                @endforeach
            </div>
        @endif

        <hr class="m-0 border-top-grey">


        <div class="d-flex px-4 py-3">
            <div class="form-group">
                <x-forms.input-group>
                    <select class="form-control select-picker" data-live-search="true" data-size="8" id="add-products">
                        <option value="">{{ __('app.select') . ' ' . __('app.product') }}</option>
                        @foreach ($products as $item)
                            <option data-content="{{ $item->name }}" value="{{ $item->id }}">
                                {{ $item->name }}</option>
                        @endforeach
                    </select>
                    @if ($addProductPermission == 'all' || $addProductPermission == 'added')
                        <x-slot name="append">
                            <a href="{{ route('products.create') }}" data-redirect-url="{{ url()->full() }}"
                                class="btn btn-outline-secondary border-grey openRightModal">@lang('app.add')</a>
                        </x-slot>
                    @endif
                </x-forms.input-group>
            </div>
        </div>

        <div id="sortable">
            @foreach ($estimate->items as $key => $item)
                <!-- DESKTOP DESCRIPTION TABLE START -->
                <div class="d-flex px-4 py-3 c-inv-desc item-row">

                    <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                        <table width="100%">
                            <tbody>
                                <tr class="text-dark-grey font-weight-bold f-14">
                                    <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                                        class="border-0 inv-desc-mbl btlr">@lang('app.description')
                                        <input type="hidden" name="item_ids[]" value="{{ $item->id }}">
                                    </td>
                                    @if ($invoiceSetting->hsn_sac_code_show)
                                        <td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>
                                    @endif
                                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")
                                    </td>
                                    <td width="10%" class="border-0" align="right">
                                        @lang("modules.invoices.unitPrice")</td>
                                    <td width="13%" class="border-0" align="right">@lang('modules.invoices.tax')
                                    </td>
                                    <td width="17%" class="border-0 bblr-mbl" align="right">
                                        @lang('modules.invoices.amount')</td>
                                </tr>
                                <tr>
                                    <td class="border-bottom-0 btrr-mbl btlr">
                                        <input type="text" class="f-14 border-0 w-100 item_name form-control" name="item_name[]"
                                            placeholder="@lang('modules.expenses.itemName')"
                                            value="{{ $item->item_name }}">
                                    </td>
                                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                        <textarea class="f-14 border-0 w-100 mobile-description form-control"
                                            placeholder="@lang('placeholders.invoices.description')"
                                            name="item_summary[]">{{ $item->item_summary }}</textarea>
                                    </td>
                                    @if ($invoiceSetting->hsn_sac_code_show)
                                        <td class="border-bottom-0">
                                            <input type="text" min="1"
                                                class="f-14 border-0 w-100 text-right hsn_sac_code form-control"
                                                value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                                        </td>
                                    @endif
                                    <td class="border-bottom-0">
                                        <input type="number" min="1" class="f-14 border-0 w-100 text-right quantity form-control"
                                            value="{{ $item->quantity }}" name="quantity[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <input type="number" min="1"
                                            class="f-14 border-0 w-100 text-right cost_per_item form-control" placeholder="0.00"
                                            value="{{ $item->unit_price }}" name="cost_per_item[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <div class="select-others height-35 rounded border-0">
                                            <select id="multiselect" name="taxes[{{ $key }}][]"
                                                multiple="multiple" class="select-picker type customSequence border-0"
                                                data-size="3">
                                                @foreach ($taxes as $tax)
                                                    <option data-rate="{{ $tax->rate_percent }}"
                                                        @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false) selected @endif value="{{ $tax->id }}">
                                                        {{ $tax->tax_name }}:
                                                        {{ $tax->rate_percent }}%</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </td>
                                    <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                                        <span
                                            class="amount-html">{{ number_format((float) $item->amount, 2, '.', '') }}</span>
                                        <input type="hidden" class="amount" name="amount[]"
                                            value="{{ $item->amount }}">
                                    </td>
                                </tr>
                                <tr class="d-none d-md-block d-lg-table-row">
                                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? 4 : 3 }}"
                                        class="dash-border-top bblr">
                                        <textarea class="f-14 border-0 w-100 desktop-description form-control" name="item_summary[]"
                                            placeholder="@lang('placeholders.invoices.description')">{{ $item->item_summary }}</textarea>
                                    </td>
                                    <td class="border-left-0">
                                        <input type="file"
                                        class="dropify"
                                        name="invoice_item_image[]"
                                        data-allowed-file-extensions="png jpg jpeg"
                                        data-messages-default="test"
                                        data-height="70"
                                        data-id="{{ $item->id }}"
                                        id="{{ $item->id }}"
                                        data-default-file="{{ $item->estimateItemImage ? $item->estimateItemImage->file_url : '' }}"
                                        @if ($item->estimateItemImage && $item->estimateItemImage->external_link)
                                            data-show-remove="false"
                                        @endif
                                        />
                                        <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->estimateItemImage ? $item->estimateItemImage->external_link : '' }}">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <a href="javascript:;"
                            class="d-flex align-items-center justify-content-center ml-3 remove-item"><i
                                class="fa fa-times-circle f-20 text-lightest"></i></a>
                    </div>
                </div>
                <!-- DESKTOP DESCRIPTION TABLE END -->
            @endforeach
        </div>
        <!--  ADD ITEM START-->
        <div class="row px-lg-4 px-md-4 px-3 pb-3 pt-0 mb-3  mt-2">
            <div class="col-md-12">
                <a class="f-15 f-w-500" href="javascript:;" id="add-item"><i
                        class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.invoices.addItem')</a>
            </div>
        </div>
        <!--  ADD ITEM END-->

        <hr class="m-0 border-top-grey">

        <!-- TOTAL, DISCOUNT START -->
        <div class="d-flex px-lg-4 px-md-4 px-3 pb-3 c-inv-total">
            <table width="100%" class="text-right f-14 text-capitalize">
                <tbody>
                    <tr>
                        <td width="50%" class="border-0 d-lg-table d-md-table d-none"></td>
                        <td width="50%" class="p-0 border-0">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td colspan="2" class="border-top-0 text-dark-grey">
                                            @lang('modules.invoices.subTotal')</td>
                                        <td width="30%" class="border-top-0 sub-total">
                                            {{ number_format((float) $estimate->sub_total, 2, '.', '') }}</td>
                                        <input type="hidden" class="sub-total-field" name="sub_total"
                                            value="{{ $estimate->sub_total }}">
                                    </tr>
                                    <tr>
                                        <td width="20%" class="text-dark-grey">@lang('modules.invoices.discount')
                                        </td>
                                        <td width="40%" style="padding: 5px;">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="70%" class="c-inv-sub-padding">
                                                            <input type="number" min="0" name="discount_value"
                                                                class="f-14 border-0 w-100 text-right discount_value form-control"
                                                                placeholder="0" value="{{ $estimate->discount }}">
                                                        </td>
                                                        <td width="30%" align="left" class="c-inv-sub-padding">
                                                            <div
                                                                class="select-others select-tax height-35 rounded border-0">
                                                                <select class="form-control select-picker"
                                                                    id="discount_type" name="discount_type">
                                                                    <option @if ($estimate->discount_type == 'percent') selected @endif value="percent">%
                                                                    </option>
                                                                    <option @if ($estimate->discount_type == 'fixed') selected @endif value="fixed">
                                                                        @lang('modules.invoices.amount')</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td><span
                                                id="discount_amount">{{ number_format((float) $estimate->discount, 2, '.', '') }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>@lang('modules.invoices.tax')</td>
                                        <td colspan="2" class="p-0">
                                            <table width="100%" id="invoice-taxes">
                                                <tr>
                                                    <td colspan="2"><span class="tax-percent">0.00</span></td>
                                                </tr>
                                            </table>
                                        </td>

                                    </tr>
                                    <tr class="bg-amt-grey f-16 f-w-500">
                                        <td colspan="2">@lang('modules.invoices.total')</td>
                                        <td><span
                                                class="total">{{ number_format((float) $estimate->total, 2, '.', '') }}</span>
                                        </td>
                                        <input type="hidden" class="total-field" name="total"
                                            value="{{ round($estimate->total, 2) }}">
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- TOTAL, DISCOUNT END -->

        <!-- NOTE AND TERMS AND CONDITIONS START -->
        <div class="d-flex flex-wrap px-lg-4 px-md-4 px-3 py-3">
            <div class="col-md-6 col-sm-12 c-inv-note-terms p-0 mb-lg-0 mb-md-0 mb-3">
                <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                    for="usr">@lang('modules.invoices.note')</label>
                <textarea class="form-control" name="note" id="note" rows="4"
                    placeholder="@lang('placeholders.invoices.note')">{{ $estimate->note }}</textarea>
            </div>
            <div class="col-md-6 col-sm-12 p-0 c-inv-note-terms">
                <x-forms.label fieldId="" :fieldLabel="__('modules.invoiceSettings.invoiceTerms')">
                </x-forms.label>
                <p>
                    {!! nl2br($invoiceSetting->invoice_terms) !!}
                </p>
            </div>
        </div>
        <!-- NOTE AND TERMS AND CONDITIONS END -->

        <!-- CANCEL SAVE SEND START -->
        <x-form-actions class="c-inv-btns">
            <div class="d-flex">
                <x-forms.button-primary class="save-form mr-3" icon="check">@lang('app.save')
                </x-forms.button-primary>
            </div>
            <x-forms.button-cancel :link="route('estimates.index')" class="border-0">@lang('app.cancel')
            </x-forms.button-cancel>

        </x-form-actions>
        <!-- CANCEL SAVE SEND END -->

    </x-form>
    <!-- FORM END -->
</div>
<!-- CREATE INVOICE END -->

<script>
    $(document).ready(function() {
        const hsn_status = {{ $invoiceSetting->hsn_sac_code_show }};

        quillImageLoad('#description');

        var file = $('.dropify').dropify({
            messages: dropifyMessages
        });

        file.on('dropify.beforeClear', function(event, element) {

            let invoice_item_id = $(this).data('id');
            let file_path = $(this).data('default-file');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {

                    var url = "{{ route('estimates.delete_image') }}";
                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'get',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            'invoice_item_id': invoice_item_id,
                            'file_path': file_path
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                element.resetPreview();
                            }
                        }
                    });
                }
            });

            return false;
        });

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        const dp1 = datepicker('#valid_till', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $estimate->valid_till) }}"),
            ...datepickerConfig
        });

        const resetAddProductButton = () => {
            $("#add-products").val('').selectpicker("refresh");
        };

        $('#add-products').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
            e.stopImmediatePropagation()
            var id = $(this).val();
            if (previousValue != id && id != '') {
                addProduct(id);
                resetAddProductButton();
            }
        });

        function addProduct(id) {
            var currencyId = $('#currency_id').val();

            $.easyAjax({
                url: "{{ route('invoices.add_item') }}",
                type: "GET",
                data: {
                    id: id,
                    currencyId: currencyId
                },
                blockUI: true,
                success: function(response) {
                    $(response.view).hide().appendTo("#sortable").fadeIn(500);
                    calculateTotal();

                    var noOfRows = $(document).find('#sortable .item-row').length;
                    var i = $(document).find('.item_name').length - 1;
                    var itemRow = $(document).find('#sortable .item-row:nth-child(' + noOfRows +
                        ') select.type');
                    itemRow.attr('id', 'multiselect' + i);
                    itemRow.attr('name', 'taxes[' + i + '][]');
                    $(document).find('#multiselect' + i).selectpicker();
                }
            });
        }

        $(document).on('click', '#add-item', function() {

            var i = $(document).find('.item_name').length;
            var item = ' <div class="d-flex px-4 py-3 c-inv-desc item-row">' +
                '<div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">' +
                '<table width="100%">' +
                '<tbody>' +
                '<tr class="text-dark-grey font-weight-bold f-14">' +
                '<td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}" class="border-0 inv-desc-mbl btlr">@lang("app.description")</td>';

            if (hsn_status) {
                item += '<td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>';
            }

            item +=
                '<td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")</td>' +
                '<td width="10%" class="border-0" align="right">@lang("modules.invoices.unitPrice")</td>' +
                '<td width="13%" class="border-0" align="right">@lang("modules.invoices.tax")</td>' +
                '<td width="17%" class="border-0 bblr-mbl" align="right">@lang("modules.invoices.amount")</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="border-bottom-0 btrr-mbl btlr">' +
                '<input type="text" class="form-control f-14 border-0 w-100 item_name" name="item_name[]" placeholder="@lang("modules.expenses.itemName")">' +
                '</td>' +
                '<td class="border-bottom-0 d-block d-lg-none d-md-none">' +
                '<textarea class="f-14 border-0 w-100 mobile-description form-control" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
                '</td>';

            if (hsn_status) {
                item += '<td class="border-bottom-0">' +
                    '<input type="text" min="1" class="form-control f-14 border-0 w-100 text-right hsn_sac_code" name="hsn_sac_code[]" >' +
                    '</td>';
            }
            item += '<td class="border-bottom-0">' +
                '<input type="number" min="1" class="form-control f-14 border-0 w-100 text-right quantity" value="1" name="quantity[]">' +
                '</td>' +
                '<td class="border-bottom-0">' +
                '<input type="number" min="1" class="f-14 border-0 w-100 text-right cost_per_item form-control" placeholder="0.00" value="0" name="cost_per_item[]">' +
                '</td>' +
                '<td class="border-bottom-0">' +
                '<div class="select-others height-35 rounded border-0">' +
                '<select id="multiselect' + i + '" name="taxes[' + i +
                '][]" multiple="multiple" class="select-picker type customSequence" data-size="3">'
            @foreach ($taxes as $tax)
                +'<option data-rate="{{ $tax->rate_percent }}" value="{{ $tax->id }}">'
                    +'{{ $tax->tax_name }}:{{ $tax->rate_percent }}%</option>'
            @endforeach
                +
                '</select>' +
                '</div>' +
                '</td>' +
                '<td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">' +
                '<span class="amount-html">0.00</span>' +
                '<input type="hidden" class="amount" name="amount[]" value="0">' +
                '</td>' +
                '</tr>' +
                '<tr class="d-none d-md-table-row d-lg-table-row">' +
                '<td colspan="{{ $invoiceSetting->hsn_sac_code_show ? 4 : 3 }}" class="dash-border-top bblr">' +
                '<textarea class="f-14 border-0 w-100 desktop-description form-control" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
                '</td>' +
                '<td td class="border-left-0">' +
                '<input type="file" class="dropify" id="dropify'+i+'" name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70""/><input type="hidden" name="invoice_item_image_url[]">' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '<a href="javascript:;" class="d-flex align-items-center justify-content-center ml-3 remove-item"><i class="fa fa-times-circle f-20 text-lightest"></i></a>' +
                '</div>';
            $(item).hide().appendTo("#sortable").fadeIn(500);
            $('#multiselect' + i).selectpicker();

            $(document).find('#dropify' + i).dropify({
                messages: dropifyMessages
            });
        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('.save-form').click(function() {

            if (KTUtil.isMobileDevice()) {
                $('.desktop-description').remove();
            } else {
                $('.mobile-description').remove();
            }

            let note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            calculateTotal();

            var discount = $('#discount_amount').html();
            var total = $('.sub-total-field').val();

            if (parseFloat(discount) > parseFloat(total)) {
                Swal.fire({
                    icon: 'error',
                    text: "{{ __('messages.discountExceed') }}",

                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                });
                return false;
            }

            $.easyAjax({
                url: "{{ route('estimates.update', $estimate->id) }}",
                container: '#saveInvoiceForm',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: ".save-form",
                redirect: true,
                file: true,
                data: $('#saveInvoiceForm').serialize()
            })
        });

        $('#saveInvoiceForm').on('click', '.remove-item', function() {
            $(this).closest('.item-row').fadeOut(300, function() {
                $(this).remove();
                $('select.customSequence').each(function(index) {
                    $(this).attr('name', 'taxes[' + index + '][]');
                    $(this).attr('id', 'multiselect' + index + '');
                });
                calculateTotal();
            });
        });

        $('#saveInvoiceForm').on('keyup', '.quantity,.cost_per_item,.item_name, .discount_value', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('change', '.type, #discount_type, #calculate_tax', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        $('#saveInvoiceForm').on('input', '.quantity', function() {
            var quantity = $(this).closest('.item-row').find('.quantity').val();
            var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();
            var amount = (quantity * perItemCost);

            $(this).closest('.item-row').find('.amount').val(decimalupto2(amount));
            $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

            calculateTotal();
        });

        calculateTotal();

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
