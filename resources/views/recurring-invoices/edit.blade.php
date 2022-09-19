@extends('layouts.app')

@push('styles')
    <style>
        .customSequence .btn {
            border: none;
        }

        .billingInterval .form-group {
            margin-top: 0px !important;
        }

    </style>
@endpush

@php
$addProductPermission = user()->permission('add_product');
@endphp

@section('content')

    @php
    $billingCycle = $invoice->unlimited_recurring == 1 ? -1 : $invoice->billing_cycle;
    @endphp


    <div class="content-wrapper">
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
                    <!-- INVOICE DATE START -->
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                    <div class="col-md-4">
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
                </div>
                <!-- INVOICE NUMBER, DATE, DUE DATE, FREQUENCY END -->

                <div class="row px-lg-4 px-md-4 px-3 pt-3">
                    <!-- CLIENT START -->
                    <div class="col-md-4">
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="client_id" :fieldLabel="__('app.client')" fieldRequired="true">
                            </x-forms.label>
                            <select class="form-control select-picker" data-live-search="true" data-size="8"
                                name="client_id" id="client_id">
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
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="project_id" :fieldLabel="__('app.project')">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" data-live-search="true" data-size="8"
                                    name="project_id" id="project_id">
                                    <option value="">--</option>
                                    @if ($invoice->client)
                                        @foreach ($invoice->client->projects as $item)
                                            <option @if ($invoice->project_id == $item->id) selected @endif value="{{ $item->id }}">
                                                {{ $item->project_name }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- PROJECT END -->

                    <!-- STATUS START -->
                    <div class="col-md-4">
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="status" :fieldLabel="__('app.status')">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" name="status" id="status">
                                    <option @if ($invoice->status == 'active') selected @endif value="active">@lang('app.active')
                                    </option>
                                    <option @if ($invoice->status == 'inactive') selected @endif value="inactive">@lang('app.inactive')
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- STATUS END -->

                </div>

                <hr class="m-0 border-top-grey">

                <div class="row px-lg-4 px-md-4 px-3 py-3">
                    <div class="col-lg-6">
                        <x-forms.toggle-switch class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.invoices.showShippingAddress')" fieldName="show_shipping_address"
                            :popover="__('modules.invoices.showShippingAddressInfo')" fieldId="show_shipping_address"
                            :checked="global_setting()->show_shipping_address == 'yes'" />
                    </div>
                    <!-- SHIPPING ADDRESS START -->
                    <div class="col-md-6 {{ global_setting()->show_shipping_address == 'yes' ? '' : 'd-none' }}  "
                        id="shipping_address_div">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                                for="usr">@lang('modules.invoices.shippingAddress')</label>
                            <textarea class="form-control f-14 pt-2" rows="3" placeholder="@lang('placeholders.address')"
                                name="shipping_address" id="shipping_address"></textarea>
                        </div>
                    </div>
                    <!-- SHIPPING ADDRESS END -->
                </div>


                <div class="row px-lg-4 px-md-4 px-3 pt-3">
                    <!-- BILLING FREQUENCY -->
                    <div class="col-md-6 ">
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="rotation" :fieldLabel="__('modules.invoices.billingFrequency')"
                                fieldRequired="true">
                            </x-forms.label>
                            <select class="form-control select-picker" data-live-search="true" data-size="8" name="rotation"
                                id="rotation">
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
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="day_of_week" :fieldLabel="__('modules.expensesRecurring.dayOfWeek')"
                                fieldRequired="true">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" data-live-search="true" data-size="8"
                                    name="day_of_week" id="dayOfWeek">
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
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="day_of_month" :fieldLabel="__('modules.expensesRecurring.dayOfMonth')"
                                fieldRequired="true">
                            </x-forms.label>
                            <div class="select-others height-35 rounded">
                                <select class="form-control select-picker" data-live-search="true" data-size="8"
                                    name="day_of_month" id="dayOfMonth">
                                    @for ($m = 1; $m <= 31; ++$m)
                                        <option value="{{ $m }}">{{ $m }}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- DAYOFMONTH -->
                    <div class="col-lg-6 billingInterval">
                        <x-forms.number class="mr-0  mr-lg-2 mr-md-2 mt-0" :fieldLabel="__('modules.invoices.billingCycle')"
                            fieldName="billing_cycle" fieldId="billing_cycle" :fieldValue="$billingCycle" />
                    </div>
                </div>

                <div class="row px-lg-4 px-md-4 px-3 pt-3 mb-4">
                    <div class="col-md-12">
                        <x-forms.checkbox class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.recurringInvoice.allowToClient')" fieldName="client_can_stop"
                            fieldId="client_can_stop" fieldValue="true" fieldRequired="true"
                            :checked="$invoice->client_can_stop == 1" />
                    </div>
                </div>



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
                                        <x-forms.password
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldPlaceholder="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false"
                                            :fieldValue="$invoice->custom_fields_data['field_'.$field->id] ?? ''">
                                        </x-forms.password>
                                    @elseif($field->type == 'number')
                                        <x-forms.number
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
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
                                                class="border-0 inv-desc-mbl btlr">
                                                @lang('app.description')
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
                                                <input type="text" class="f-14 border-0 w-100 item_name" name="item_name[]"
                                                    placeholder="@lang('modules.expenses.itemName')"
                                                    value="{{ $item->item_name }}">
                                            </td>
                                            <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                                <textarea class="f-14 border-0 w-100 mobile-description"
                                                    placeholder="@lang('placeholders.invoices.description')"
                                                    name="item_summary[]">{{ $item->item_summary }}</textarea>
                                            </td>
                                            @if ($invoiceSetting->hsn_sac_code_show)
                                                <td class="border-bottom-0">
                                                    <input type="text" class="f-14 border-0 w-100 text-right hsn_sac_code"
                                                        value="" name="hsn_sac_code[]">
                                                </td>
                                            @endif
                                            <td class="border-bottom-0">
                                                <input type="number" min="1" class="f-14 border-0 w-100 text-right quantity"
                                                    value="{{ $item->quantity }}" name="quantity[]">
                                            </td>
                                            <td class="border-bottom-0">
                                                <input type="number" min="1"
                                                    class="f-14 border-0 w-100 text-right cost_per_item" placeholder="0.00"
                                                    value="{{ $item->unit_price }}" name="cost_per_item[]">
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="select-others height-35 rounded border-0">
                                                    <select id="multiselect{{ $key }}"
                                                        name="taxes[{{ $key }}][]" multiple="multiple"
                                                        class="select-picker type customSequence border-0" data-size="3">
                                                        @foreach ($taxes as $tax)
                                                            <option data-rate="{{ $tax->rate_percent }}" @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false) selected @endif
                                                                value="{{ $tax->id }}">{{ $tax->tax_name }}:
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
                                                <textarea class="f-14 border-0 w-100 desktop-description"
                                                    name="item_summary[]"
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
                                                data-default-file="{{ $item->recurringInvoiceItemImage ? $item->recurringInvoiceItemImage->file_url : '' }}"
                                                @if ($item->recurringInvoiceItemImage && $item->recurringInvoiceItemImage->external_link)
                                                    readonly
                                                @endif
                                                />
                                                <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->recurringInvoiceItemImage ? $item->recurringInvoiceItemImage->external_link : '' }}">
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
                                                                        class="f-14 border-0 w-100 text-right discount_value"
                                                                        placeholder="0" value="{{ $invoice->discount }}">
                                                                </td>
                                                                <td width="30%" align="left" class="c-inv-sub-padding">
                                                                    <div
                                                                        class="select-others select-tax height-35 rounded border-0">
                                                                        <select class="form-control select-picker"
                                                                            id="discount_type" name="discount_type">
                                                                            <option @if ($invoice->discount_type == 'percent') selected @endif
                                                                                value="percent">%</option>
                                                                            <option @if ($invoice->discount_type == 'fixed') selected @endif
                                                                                value="fixed">
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
                </div>
                <!-- NOTE AND TERMS AND CONDITIONS END -->

                <!-- CANCEL SAVE SEND START -->
                <div class="px-lg-4 px-md-4 px-3 py-3 c-inv-btns">

                    <button type="button"
                        class="btn-cancel rounded mt-3 mt-lg-0 mt-md-0 mr-0 mr-lg-3 mr-md-3 f-15">@lang('app.cancel')</button>

                    <div class="d-flex">
                        <x-forms.button-primary class="save-form" icon="check">@lang('app.save')</x-forms.button-primary>
                    </div>
                </div>
                <!-- CANCEL SAVE SEND END -->

            </x-form>
            <!-- FORM END -->
        </div>
        <!-- CREATE INVOICE END -->
    </div>

@endsection

@push('scripts')
    <script>
        $(document).ready(function() {

            var invoice = @json($invoice);
            const hsn_status = {{ $invoiceSetting->hsn_sac_code_show }};
            const defaultClient = "{{ request('default_client') }}";

            $('#rotation').val(invoice.rotation);
            $('#rotation').trigger("change");

            $('#dayOfWeek').val(invoice.day_of_week);
            $('#dayOfWeek').trigger("change");

            $('#dayOfMonth').val(invoice.day_of_month);
            $('#dayOfMonth').trigger("change");

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

        $('#show_shipping_address').change(function() {
            $(this).is(':checked') ? $('#shipping_address_div').removeClass('d-none') : $('#shipping_address_div')
                .addClass('d-none');
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

        });

        $('body').on('click', '#show-shipping-field', function() {
            $('#add-shipping-field, #client_shipping_address').toggleClass('d-none');
        });


        $('#add-products').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
            e.stopImmediatePropagation()
            var id = $(this).val();
            if (previousValue != id && id != '') {
                addProduct(id);
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
                '<textarea class="f-14 border-0 w-100 mobile-description" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
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
                '<input type="number" min="1" class="f-14 border-0 w-100 text-right cost_per_item" placeholder="0.00" value="0" name="cost_per_item[]">' +
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
                '<td colspan="{{ $invoiceSetting->hsn_sac_code_show ? 4 : 4 }}" class="dash-border-top bblr">' +
                '<textarea class="f-14 border-0 w-100 desktop-description" name="item_summary[]" placeholder="@lang("placeholders.invoices.description")"></textarea>' +
                '</td>' +
                '<td class="border-left-0">' +
                '<input type="file" class="dropify" id="dropify'+i+'" name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" /><input type="hidden" name="invoice_item_image_url[]">' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '<a href="javascript:;" class="d-flex align-items-center justify-content-center ml-3 remove-item"><i class="fa fa-times-circle f-20 text-lightest"></i></a>' +
                '</div>';

            $(item).hide().appendTo("#sortable").fadeIn(500);

            $('#multiselect' + i).selectpicker();

            $('#dropify' + i).dropify({
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
                url: "{{ route('recurring-invoices.update', $invoice->id) }}",
                container: '#saveInvoiceForm',
                type: "POST",
                blockUI: true,
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

        $('#saveInvoiceForm').on('change', '.type, #discount_type', function() {
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
@endpush
