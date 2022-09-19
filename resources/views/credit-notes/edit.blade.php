@extends('layouts.app')

@push('styles')
    <style>
        .customSequence .btn {
            border: none;
        }
    </style>
@endpush

@php
$addProductPermission = user()->permission('add_product');
@endphp

@section('content')

    <div class="content-wrapper">
        <!-- CREATE INVOICE START -->
        <div class="bg-white rounded b-shadow-4 create-inv">
            <!-- HEADING START -->
            <div class="px-lg-4 px-md-4 px-3 py-3">
                <h4 class="mb-0 f-21 font-weight-normal text-capitalize">@lang('app.menu.credit-note') @lang('app.details')
                </h4>
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
                            <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.credit-note')
                                #</label>
                            <div class="input-group">
                                <input type="text" name="cn_number" id="cn_number"
                                    class="form-control height-35 f-15 readonly-background" readonly
                                    value="{{ $creditNote->cn_number }}" placeholder="0019" aria-label="0019"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                    <!-- INVOICE NUMBER END -->
                    <!-- CREDIT NOTE DUE DATE START -->
                    <div class="col-md-3">
                        <div class="form-group mb-lg-0 mb-md-0 mb-4">
                            <x-forms.label fieldId="due_date" :fieldLabel="__('modules.invoices.invoiceDate')">
                            </x-forms.label>
                            <div class="input-group">
                                <input type="text" id="invoice_date" name="issue_date"
                                    class="px-6 position-relative text-dark font-weight-normal form-control height-35 rounded p-0 text-left f-15"
                                    placeholder="@lang('placeholders.date')"
                                    value="{{ now(global_setting()->timezone)->format(global_setting()->date_format) }}">
                            </div>
                        </div>
                    </div>
                    <!-- CREDIT NOTE DUE DATE END -->

                    <!-- FREQUENCY START -->
                    <div class="col-md-3">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <x-forms.label fieldId="currency_id" :fieldLabel="__('modules.invoices.currency')">
                            </x-forms.label>

                            <div class="select-others height-35 rounded">
                                <input type="hidden" name="currency_id" value="{{ $creditNote->currency_id }}">
                                <select class="form-control select-picker" disabled name="currency_id" id="currency_id">
                                    @foreach ($currencies as $currency)
                                        <option @if ($creditNote->currency_id == $currency->id) selected @endif value="{{ $currency->id }}">
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
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="client_id" :fieldLabel="__('app.client')">
                            </x-forms.label>
                            <p>
                                {{ $creditNote->client->name }}
                            </p>
                        </div>
                    </div>
                    <!-- CLIENT END -->
                    <!-- PROJECT START -->
                    <div class="col-md-4">
                        <div class="form-group c-inv-select mb-4">
                            <x-forms.label fieldId="project_id" :fieldLabel="__('app.project')">
                            </x-forms.label>
                            <p>
                                {{ $creditNote->project ? $creditNote->project->project_name : '--' }}
                            </p>
                        </div>
                    </div>
                    <!-- PROJECT END -->

                </div>


                <!-- CLIENT, PROJECT, GST, BILLING, SHIPPING ADDRESS END -->

                <hr class="m-0 border-top-grey">

                <div id="sortable">
                    @foreach ($creditNote->items as $key => $item)
                        <!-- DESKTOP DESCRIPTION TABLE START -->
                        <div class="d-flex px-4 py-3 c-inv-desc item-row">

                            <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
                                <table width="100%">
                                    <tbody>
                                        <tr class="text-dark-grey font-weight-bold f-14">
                                            <td width="40%" class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                                            @if ($creditNoteSetting->hsn_sac_code_show)
                                                <td width="10%" class="border-0" align="right">@lang("app.hsnSac")
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
                                                <input type="hidden" class="form-control f-14 border-0 w-100 item_name"
                                                    name="item_name[]" value="{{ $item->item_name }}">
                                                    <span>{{ $item->item_name }}</span>
                                            </td>
                                            <td class="border-bottom-0 d-block d-lg-none d-md-none">
                                                <textarea class="form-control f-14 border-0 w-100 mobile-description"
                                                    placeholder="@lang('placeholders.invoices.description')"
                                                    name="item_summary[]">{{ $item->item_summary }}</textarea>
                                            </td>
                                            @if ($creditNoteSetting->hsn_sac_code_show)
                                                <td class="border-bottom-0">
                                                    <input type="hidden" class="f-14 border-0 w-100 text-right hsn_sac_code"
                                                        value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                                                    <span>{{ $item->hsn_sac_code }}</span>
                                                </td>
                                            @endif
                                            <td class="border-bottom-0">
                                                <input type="hidden" class="f-14 border-0 w-100 text-right quantity" value="{{ $item->quantity }}" name="quantity[]">
                                                {{ $item->quantity }}
                                            </td>
                                            <td class="border-bottom-0">
                                                <input type="hidden" class="f-14 border-0 w-100 text-right cost_per_item"
                                                    value="{{ $item->unit_price }}" name="cost_per_item[]">
                                                <span>{{ $item->unit_price }}</span>
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="select-others height-35 rounded border-0">
                                                    <select id="multiselect{{ $key }}"
                                                        multiple="multiple"
                                                        class="select-picker type customSequence border-0" data-size="3"
                                                        disabled>
                                                        @foreach ($taxes as $tax)
                                                            <option data-rate="{{ $tax->rate_percent }}"
                                                                @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false) selected @endif value="{{ $tax->id }}">
                                                                {{ $tax->tax_name }}:
                                                                {{ $tax->rate_percent }}%</option>
                                                        @endforeach
                                                    </select>
                                                    @foreach ($taxes as $tax)
                                                        @if (isset($item->taxes) && array_search($tax->id, json_decode($item->taxes)) !== false)
                                                            <input type="hidden" name="taxes[{{ $key }}][]" value="{{ $tax->id }}">
                                                        @endif
                                                    @endforeach
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
                                            <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}" class="dash-border-top bblr">
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
                                                data-default-file="{{ $item->creditNoteItemImage ? $item->creditNoteItemImage->file_url : '' }}"
                                                />
                                                <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->creditNoteItemImage ? $item->creditNoteItemImage->external_link : '' }}">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- DESKTOP DESCRIPTION TABLE END -->
                    @endforeach
                </div>

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
                                                <td width="30%" class="border-top-0 sub-total">0.00</td>
                                                <input type="hidden" class="sub-total-field" name="sub_total" value="0">
                                            </tr>
                                            <tr>
                                                <td width="30%" class="text-dark-grey">@lang('modules.invoices.discount')
                                                </td>
                                                <td width="30%" style="padding: 5px;">
                                                    <table width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td width="50%" class="c-inv-sub-padding">
                                                                    <input type="number" min="0" name="discount_value"
                                                                        class="f-14 border-0 w-100 text-right discount_value"
                                                                        placeholder="0"
                                                                        value="{{ $creditNote->discount }}">
                                                                </td>
                                                                <td width="50%" align="left" class="c-inv-sub-padding">
                                                                    <div
                                                                        class="select-others select-tax height-35 rounded border-0">
                                                                        <select class="form-control select-picker"
                                                                            id="discount_type" name="discount_type">
                                                                            <option @if ($creditNote->discount_type == 'percent') selected @endif
                                                                                value="percent">%</option>
                                                                            <option @if ($creditNote->discount_type == 'fixed') selected @endif value="fixed">
                                                                                @lang('modules.invoices.amount')</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <span id="discount_amount">
                                                        {{ number_format((float) $creditNote->discount, 2, '.', '') }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>@lang('modules.invoices.tax')</td>
                                                <td colspan="2" class="p-0 border-0">
                                                    <table width="100%" id="invoice-taxes">
                                                        <tr>
                                                            <td colspan="2"><span class="tax-percent">0.00</span></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>@lang('app.adjustment') @lang('app.amount')</td>
                                                <td colspan="2" class="p-0 border-0">
                                                    <table width="100%" id="invoice-taxes">
                                                        <tr>
                                                            <td colspan="2">
                                                                <input type="number"
                                                                    min="-{{ $creditNote->creditAmountRemaining() }}"
                                                                    name="adjustment_amount"
                                                                    class="form-control f-14 border-0 w-100 text-right" id="adjustment_amount"
                                                                    placeholder="0"
                                                                    data-min-adjustment-amount="{{ $creditNote->creditAmountRemaining() }}"
                                                                    value="{{ $creditNote->adjustment_amount }}">
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr class="bg-amt-grey f-16 f-w-500">
                                                <td colspan="2">@lang('modules.invoices.total')</td>
                                                <td><span class="total">0.00</span></td>
                                                <input type="hidden" class="total-field" name="total" value="0">
                                                    <input type="hidden" id="total-field" value="{{ $creditNote->creditAmountUsed() }}">
                                                    <input type="hidden" name="min_adjustment_amount" value="{{ $creditNote->creditAmountRemaining() }}">
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
                            placeholder="@lang('placeholders.invoices.note')"></textarea>
                    </div>
                    <div class="col-md-6 col-sm-12 p-0 c-inv-note-terms">
                        <label class="f-14 text-dark-grey mb-12 text-capitalize w-100"
                            for="usr">@lang('modules.invoiceSettings.invoiceTerms')</label>
                        {!! nl2br($creditNoteSetting->invoice_terms) !!}
                    </div>
                </div>
                <!-- NOTE AND TERMS AND CONDITIONS END -->

                <!-- CANCEL SAVE SEND START -->
                <x-form-actions class="c-inv-btns">

                    <div class="d-flex">
                        <x-forms.button-primary class="save-form mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>
                    </div>

                    <x-forms.button-cancel :link="route('creditnotes.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>

                </x-form-actions>
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
            const dp1 = datepicker('#invoice_date', {
                position: 'bl',
                dateSelected: new Date("{{ str_replace('-', '/', $creditNote->issue_date) }}"),
                ...datepickerConfig
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

            $('body').on('change keyup', '#adjustment_amount', function() {
                let adjustmentAmount = $(this).val();
                let total = $("#total-field").val();
                let grandTotal = parseFloat(total) + parseFloat(adjustmentAmount);
                let minAdjustmentAmount = $('#adjustment_amount').data('min-adjustment-amount');

                if(adjustmentAmount < -minAdjustmentAmount){
                    $(this).val(-parseFloat(minAdjustmentAmount));

                    total = parseFloat(total) - parseFloat(minAdjustmentAmount);

                    $(".total").html(total.toFixed(2));
                    $(".total-field").val(total.toFixed(2));

                    return false;
                }

                if(adjustmentAmount == '') {
                    $(".total").html(total);
                    $(".total-field").val(total);
                    return false;
                }
                else if(adjustmentAmount < 0) {
                    grandTotal = (grandTotal < 0) ? 0 : grandTotal;
                }

                $(".total").html(grandTotal.toFixed(2));
                $(".total-field").val(grandTotal.toFixed(2));
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
                    url: "{{ route('creditnotes.update', $creditNote->id) }}",
                    container: '#saveInvoiceForm',
                    type: "POST",
                    blockUI: true,
                    redirect: true,
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

            /* This is used for calculation purpose */
            $('#total-field').val($('.total-field').val());

            init(RIGHT_MODAL);
        });
    </script>
@endpush
