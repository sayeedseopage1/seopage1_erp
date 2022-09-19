@php
$addProductPermission = user()->permission('add_product');
@endphp


<!-- CREATE INVOICE START -->
<div class="bg-white rounded b-shadow-4 create-inv">
    <!-- HEADING START -->
    <div class="px-lg-4 px-md-4 px-3 py-3">
        <h4 class="mb-0 f-21 font-weight-normal text-capitalize">@lang('app.invoice') @lang('app.details')</h4>
    </div>
    <!-- HEADING END -->
    <hr class="m-0 border-top-grey">
    <!-- FORM START -->
    <x-form class="c-inv-form" id="saveInvoiceForm">
        @method('PUT')
        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY START -->
        <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- INVOICE NUMBER START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label class="mb-12" fieldId="invoice_number"
                        :fieldLabel="__('modules.invoices.invoiceNumber')" fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <x-slot name="prepend">
                            <span class="input-group-text">{{ invoice_setting()->invoice_prefix }}#</span>
                        </x-slot>
                        <input type="text" name="invoice_number" id="invoice_number" class="form-control height-35 f-15"
                            value="{{ $invoice->original_invoice_number }}">
                    </x-forms.input-group>
                </div>
            </div>
            <!-- INVOICE NUMBER END -->
            <!-- INVOICE DATE START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('modules.invoices.invoiceDate')">
                    </x-forms.label>
                    <div class="input-group">
                        <input type="text" id="invoice_date" name="issue_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ $invoice->issue_date->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- INVOICE DATE END -->
            <!-- DUE DATE START -->
            <div class="col-md-3">
                <div class="form-group mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="due_date" :fieldLabel="__('app.dueDate')"></x-forms.label>
                    <div class="input-group ">
                        <input type="text" id="due_date" name="due_date"
                            class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                            placeholder="@lang('placeholders.date')"
                            value="{{ $invoice->due_date->format(global_setting()->date_format) }}">
                    </div>
                </div>
            </div>
            <!-- DUE DATE END -->
            <!-- FREQUENCY START -->
            <div class="col-md-3">
                <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                    <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                    </x-forms.label>

                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" name="currency_id" id="currency_id">
                            @foreach ($currencies as $currency)
                                <option @if ($invoice->currency_id == $currency->id) selected @endif value="{{ $currency->id }}">
                                    {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <!-- FREQUENCY END -->
        </div>
        <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY END -->

        <hr class="m-0 border-top-grey">

        <!-- CLIENT, PROJECT, GST, BILLING, SHIPPING ADDRESS START -->
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
                            <option @if ($client->id == $invoice->client_id) selected @endif
                                data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                                value="{{ $client->id }}">{{ mb_ucwords($client->name) }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <!-- CLIENT END -->
            <!-- PROJECT START -->
            <div class="col-md-4">
                <x-forms.label fieldId="project_id" :fieldLabel="__('app.project')">
                </x-forms.label>
                <div class="form-group c-inv-select mb-4">
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="project_id" id="project_id">
                            <option value="">--</option>
                            @foreach ($invoice->client->projects as $item)
                                <option @if ($invoice->project_id == $item->id) selected @endif value="{{ $item->id }}">
                                    {{ $item->project_name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <!-- PROJECT END -->

            <div class="col-md-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="calculate_tax" :fieldLabel="__('modules.invoices.calculateTax')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="calculate_tax" id="calculate_tax">
                            <option value="after_discount">@lang('modules.invoices.afterDiscount')</option>
                            <option value="before_discount" @if ($invoice->calculate_tax == 'before_discount') selected @endif>@lang('modules.invoices.beforeDiscount')</option>
                        </select>
                    </div>
                </div>
            </div>

            @if ($invoice->amountPaid() == 0 && $invoice->status == 'paid')
                <!-- STATUS START -->
                <div class="col-md-4">
                    <x-forms.label fieldId="status" :fieldLabel="__('app.status')">
                    </x-forms.label>
                    <div class="form-group c-inv-select mb-4">
                        <div class="select-others height-35 rounded">
                            <select class="form-control select-picker" name="status" id="status">
                                <option @if ($invoice->status == 'unpaid') selected @endif value="unpaid">@lang('modules.invoices.unpaid')
                                </option>
                                <option @if ($invoice->status == 'paid') selected @endif value="paid">@lang('modules.invoices.paid')
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- STATUS END -->
            @endif


        </div>
        <div class="row px-lg-4 px-md-4 px-3 py-3">
            <!-- BILLING ADDRESS START -->
            <div class="col-md-4">
                <div class="form-group c-inv-select mb-0">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                        for="usr">@lang('modules.invoices.billingAddress')</label>
                    <p class="f-15" id="client_billing_address">{!! nl2br($invoice->client->clientDetails->address) !!}</p>
                </div>
            </div>
            <!-- BILLING ADDRESS END -->
            <!-- SHIPPING ADDRESS START -->
            <div class="col-md-4">
                <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                    <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                        for="usr">@lang('modules.invoices.shippingAddress')</label>
                    <p class="f-15" id="client_shipping_address">
                        @if ($invoice->client->clientDetails->shipping_address)
                            {!! nl2br($invoice->client->clientDetails->shipping_address) !!}
                        @else
                            <a href="javascript:;" class="text-capitalize" id="show-shipping-field"><i
                                    class="f-12 mr-2 fa fa-plus"></i>@lang('app.addShippingAddress')</a>
                        @endif
                    </p>
                    <p class="d-none" id="add-shipping-field">
                        <textarea class="form-control f-14 pt-2" rows="3" placeholder="@lang('placeholders.address')"
                            name="shipping_address" id="shipping_address"></textarea>
                    </p>
                </div>
            </div>
            <!-- SHIPPING ADDRESS END -->

            <div class="col-md-4">
                <div class="form-group c-inv-select mb-4">
                    <x-forms.label fieldId="company_address_id" :fieldLabel="__('modules.invoices.generatedBy')">
                    </x-forms.label>
                    <div class="select-others height-35 rounded">
                        <select class="form-control select-picker" data-live-search="true" data-size="8"
                            name="company_address_id" id="company_address_id">
                            @foreach ($companyAddresses as $item)
                                <option {{ ($item->id == $invoice->company_address_id) ? 'selected' : '' }} value="{{ $item->id }}">
                                    {{ $item->location }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

        </div>
        <!-- CLIENT, PROJECT, GST, BILLING, SHIPPING ADDRESS END -->

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
                                    :fieldValue="$invoice->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.text>
                            @elseif($field->type == 'password')
                                <x-forms.password fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldValue="$invoice->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.password>
                            @elseif($field->type == 'number')
                                <x-forms.number fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldPlaceholder="$field->label"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldValue="$invoice->custom_fields_data['field_'.$field->id] ?? ''">
                                </x-forms.number>
                            @elseif($field->type == 'textarea')
                                <x-forms.textarea :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldPlaceholder="$field->label"
                                    :fieldValue="$invoice->custom_fields_data['field_'.$field->id] ?? ''">
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
                                                :checked="(isset($invoice) && $invoice->custom_fields_data['field_'.$field->id] == $value) ? true : false" />
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
                                    {!! Form::select('custom_fields_data[' . $field->name . '_' . $field->id . ']', $field->values, isset($invoice) ? $invoice->custom_fields_data['field_' . $field->id] : '', ['class' => 'form-control select-picker']) !!}
                                </div>
                            @elseif($field->type == 'date')
                                <x-forms.datepicker custom="true"
                                    fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldRequired="($field->required === 'yes') ? true : false"
                                    :fieldLabel="$field->label"
                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                    :fieldValue="($invoice->custom_fields_data['field_'.$field->id] != '') ? \Carbon\Carbon::parse($invoice->custom_fields_data['field_'.$field->id])->format(global_setting()->date_format) : \Carbon\Carbon::now()->format(global_setting()->date_format)"
                                    :fieldPlaceholder="$field->label" />
                            @elseif($field->type == 'checkbox')
                                <div class="form-group my-3">
                                    <x-forms.label
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.label>
                                    <div class="d-flex checkbox-{{$field->id}}">
                                        <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}" value="{{$invoice->custom_fields_data['field_'.$field->id]}}">

                                        @foreach ($field->values as $key => $value)
                                            <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                :fieldLabel="$value"
                                                fieldName="$field->name.'_'.$field->id.'[]'"
                                                :fieldValue="$value"
                                                :fieldRequired="($field->required === 'yes') ? true : false"
                                                onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                :checked="$invoice->custom_fields_data['field_'.$field->id] != '' && in_array($value ,explode(', ', $invoice->custom_fields_data['field_'.$field->id]))"
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
                    <select class="form-control select-picker" data-live-search="true" data-size="8"
                        id="add-products">
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
            @foreach ($invoice->items as $key => $item)
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
                                        <input type="text" class="form-control f-14 border-0 w-100 item_name"
                                            name="item_name[]" placeholder="@lang('modules.expenses.itemName')"
                                            value="{{ $item->item_name }}">
                                    </td>
                                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                        <textarea class="f-14 border-0 w-100 mobile-description form-control"
                                            placeholder="@lang('placeholders.invoices.description')"
                                            name="item_summary[]">{{ $item->item_summary }}</textarea>
                                    </td>
                                    @if ($invoiceSetting->hsn_sac_code_show)
                                        <td class="border-bottom-0">
                                            <input type="text" class="f-14 border-0 w-100 text-right hsn_sac_code form-control"
                                                value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                                        </td>
                                    @endif
                                    <td class="border-bottom-0">
                                        <input type="number" min="1"
                                            class="form-control f-14 border-0 w-100 text-right quantity"
                                            value="{{ $item->quantity }}" name="quantity[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <input type="number" min="1"
                                            class="f-14 border-0 w-100 text-right cost_per_item form-control" placeholder="0.00"
                                            value="{{ $item->unit_price }}" name="cost_per_item[]">
                                    </td>
                                    <td class="border-bottom-0">
                                        <div class="select-others height-35 rounded border-0">
                                            <select id="multiselect{{ $key }}"
                                                name="taxes[{{ $key }}][]" multiple="multiple"
                                                class="select-picker type customSequence border-0" data-size="3">
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
                                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}"
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
                                        data-default-file="{{ $item->invoiceItemImage ? $item->invoiceItemImage->file_url : '' }}"
                                        @if ($item->invoiceItemImage && $item->invoiceItemImage->external_link)
                                            data-show-remove="false"
                                        @endif
                                        />
                                        <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->invoiceItemImage ? $item->invoiceItemImage->external_link : '' }}">
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
                        <td width="50%" class="p-0 border-0 c-inv-total-right">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td colspan="2" class="border-top-0 text-dark-grey">
                                            @lang('modules.invoices.subTotal')</td>
                                        <td width="30%" class="border-top-0 sub-total">
                                            {{ number_format((float) $invoice->sub_total, 2, '.', '') }}</td>
                                        <input type="hidden" class="sub-total-field" name="sub_total"
                                            value="{{ $invoice->sub_total }}">
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
                                                                class="form-control f-14 border-0 w-100 text-right discount_value"
                                                                placeholder="0" value="{{ $invoice->discount }}">
                                                        </td>
                                                        <td width="30%" align="left" class="c-inv-sub-padding">
                                                            <div
                                                                class="select-others select-tax height-35 rounded border-0">
                                                                <select class="form-control select-picker"
                                                                    id="discount_type" name="discount_type">
                                                                    <option @if ($invoice->discount_type == 'percent') selected @endif value="percent">%
                                                                    </option>
                                                                    <option @if ($invoice->discount_type == 'fixed') selected @endif value="fixed">
                                                                        @lang('modules.invoices.amount')</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td><span
                                                id="discount_amount">{{ number_format((float) $invoice->discount, 2, '.', '') }}</span>
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
                                                class="total">{{ number_format((float) $invoice->total, 2, '.', '') }}</span>
                                        </td>
                                        <input type="hidden" class="total-field" name="total"
                                            value="{{ round($invoice->total, 2) }}">
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
                    placeholder="@lang('placeholders.invoices.note')">{{ $invoice->note }}</textarea>
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

                <div class="inv-action dropup mr-3">
                    <button class="btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        @lang('app.save')
                        <span><i class="fa fa-chevron-up f-15 text-white"></i></span>
                    </button>
                    <!-- DROPDOWN - INFORMATION -->
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuBtn" tabindex="0">
                        <li>
                            <a class="dropdown-item f-14 text-dark save-form" href="javascript:;" data-type="save">
                                <i class="fa fa-save f-w-500 mr-2 f-11"></i>
                                @if ($invoice->status == 'draft')
                                    @lang('app.saveDraft')
                                @else
                                    @lang('app.save')
                                @endif
                            </a>
                        </li>
                        @if($invoice->status == 'draft' || $invoice->send_status == 0)
                            <li>
                                <a class="dropdown-item f-14 text-dark save-form" href="javascript:void(0);"
                                    data-type="send">
                                    <i class="fa fa-paper-plane f-w-500  mr-2 f-12"></i> @lang('app.saveSend')
                                </a>
                            </li>
                        @endif
                    </ul>
                </div>

                <x-forms.button-cancel :link="route('invoices.index')" class="border-0">@lang('app.cancel')
                </x-forms.button-cancel>
            </div>


        </x-form-actions>
        <!-- CANCEL SAVE SEND END -->

    </x-form>
    <!-- FORM END -->
</div>
<!-- CREATE INVOICE END -->

<script>
    $(document).ready(function() {

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

                    var url = "{{ route('invoices.delete_image') }}";
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

        const dp1 = datepicker('#invoice_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $invoice->issue_date) }}"),
            ...datepickerConfig
        });
        const dp2 = datepicker('#due_date', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $invoice->due_date) }}"),
            ...datepickerConfig
        });

        $('#client_id').change(function() {
            var id = $(this).val();
            var url = "{{ route('clients.project_list', ':id') }}";
            url = url.replace(':id', id);
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                data: {
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        $('#project_id').html(response.data);
                        $('#project_id').selectpicker('refresh');
                    }
                }
            });

            var url = "{{ route('clients.ajax_details', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                data: {
                    _token: token
                },
                success: function(response) {
                    if (response.status == 'success') {
                        $('#client_billing_address').html(nl2br(response.data.clientDetails
                            .address));
                        $('#add-shipping-field').addClass('d-none');
                        $('#client_shipping_address').removeClass('d-none');

                        if (response.data.clientDetails.shipping_address === null) {
                            var addShippingLink =
                                `<a href="javascript:;" class="text-capitalize" id="show-shipping-field"><i class="f-12 mr-2 fa fa-plus"></i>@lang("
                            app.addShippingAddress ")</a>`;
                            $('#client_shipping_address').html(addShippingLink);
                        } else {
                            $('#client_shipping_address').html(nl2br(response.data
                                .clientDetails
                                .shipping_address));
                        }
                    }
                }
            });

        });

        $('body').on('click', '#show-shipping-field', function() {
            $('#add-shipping-field, #client_shipping_address').toggleClass('d-none');
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

            @if ($invoiceSetting->hsn_sac_code_show)
                item += '<td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>';
            @endif

            item +=
                '<td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")</td>' +
                '<td width="10%" class="border-0" align="right">@lang("modules.invoices.unitPrice")</td>' +
                '<td width="13%" class="border-0" align="right">@lang("modules.invoices.tax")</td>' +
                '<td width="17%" class="border-0 bblr-mbl" align="right">@lang("modules.invoices.amount")</td>' +
                '</tr>' +
                '<tr>' +
                '<td class="border-bottom-0 btrr-mbl btlr">' +
                '<input type="text" class="f-14 border-0 w-100 item_name form-control" name="item_name[]" placeholder="@lang("modules.expenses.itemName")">' +
                '</td>' +
                '<td class="border-bottom-0 d-block d-lg-none d-md-none">' +
                '<textarea class="f-14 border-0 w-100 mobile-description form-control" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
                '</td>';

            @if ($invoiceSetting->hsn_sac_code_show)
                item += '<td class="border-bottom-0">' +
                    '<input type="text" min="1" class="f-14 border-0 w-100 text-right hsn_sac_code form-control" value="" name="hsn_sac_code[]">'
                    +
                    '</td>';
            @endif

            item += '<td class="border-bottom-0">' +
                '<input type="number" min="1" class="f-14 border-0 w-100 text-right quantity form-control" value="1" name="quantity[]">' +
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
                '<textarea class="f-14 border-0 w-100 desktop-description" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
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
            var type = $(this).data('type');

            if (KTUtil.isMobileDevice()) {
                $('.desktop-description').remove();
            } else {
                $('.mobile-description').remove();
            }

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
                url: "{{ route('invoices.update', $invoice->id) }}" + "?type=" + type,
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
                redirect: true,
                file: true,
                data: $('#saveInvoiceForm').serialize(),
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
