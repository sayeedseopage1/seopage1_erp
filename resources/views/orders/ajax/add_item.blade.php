<div class="d-flex px-4 py-3 c-inv-desc item-row">

    <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
        <table width="100%">
            <tbody>
                <tr class="text-dark-grey font-weight-bold f-14">
                    <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                        class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td width="10%" class="border-0" align="right">@lang("app.hsnSac")
                        </td>
                    @endif
                    <td width="10%" class="border-0" align="right">
                        @lang("modules.invoices.qty")
                    </td>
                    <td width="10%" class="border-0" align="right">
                        @lang("modules.invoices.unitPrice")</td>
                    <td width="13%" class="border-0" align="right">
                        @lang('modules.invoices.tax')
                    </td>
                    <td width="17%" class="border-0 bblr-mbl" align="right">
                        @lang('modules.invoices.amount')</td>
                </tr>
                <tr>
                    <td class="border-bottom-0 btrr-mbl btlr">
                        <input hidden name="item_id[]" value="{{ $item->id }}">
                        <input type="text" class="f-14 border-0 w-100 item_name bg-additional-grey" readonly
                            name="item_name[]" placeholder="@lang('modules.expenses.itemName')"
                            value="{{ $item->name }}">
                    </td>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td class="border-bottom-0">
                            <span>{{ $item->hsn_sac_code }}</span>
                            <input type="hidden"
                                class="form-control f-14 border-0 w-100 text-right hsn_sac_code"
                                value="{{ $item->hsn_sac_code }}" name="hsn_sac_code[]">
                        </td>
                    @endif
                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                        <input type="text" readonly class="f-14 border-0 w-100 mobile-description bg-additional-grey"
                            placeholder="@lang('placeholders.invoices.description')"
                            name="item_summary[]" value="{{ strip_tags($item->description) }}">
                    </td>
                    <td class="border-bottom-0">
                        <input type="number" min="1" class="f-14 border-0 w-100 text-right quantity"
                            value="{{ 1 }}" name="quantity[]">
                    </td>
                    <td class="border-bottom-0">
                        <input type="number" min="1"
                            class="f-14 border-0 w-100 text-right cost_per_item bg-additional-grey" placeholder="0.00"
                            value="{{ $item->price }}" name="cost_per_item[]" readonly>
                    </td>
                    <td class="border-bottom-0">
                        <input class="form-control height-35 f-14 border-0 w-100 text-right bg-additional-grey"
                            value="{{ $item->tax_list ?: '--' }}" readonly>
                        <div class="select-others height-35 d-none rounded border-0">
                            <select id="multiselect" name="taxes[0][]"
                                multiple="multiple"
                                class="select-picker type customSequence border-0 bg-additional-grey" data-size="3">
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
                            class="amount-html">{{ number_format((float) (1 * $item->price), 2, '.', '') }}</span>
                        <input type="hidden" class="amount" name="amount[]"
                            value="{{ number_format((float) (1 * $item->price), 2, '.', '') }}">
                    </td>
                </tr>
                <tr class="d-none d-md-block d-lg-table-row">
                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}"
                        class="dash-border-top bblr">
                        <textarea type="text" readonly
                            class="f-14 border-0 w-100 desktop-description" name="item_summary[]"
                            placeholder="@lang('placeholders.invoices.description')">{{ strip_tags($item->description) }}</textarea>
                    </td>
                    <td class="border-left-0">
                        <input type="file" class="dropify" disabled name="invoice_item_image[]" data-allowed-file-extensions="png jpg jpeg" data-messages-default="test" data-height="70" data-default-file="{{ $item->image_url }}" data-show-remove="false" />
                        <input type="hidden" name="invoice_item_image_url[]" value="{{ $item->image_url }}">
                    </td>
                </tr>
            </tbody>
        </table>

        <a href="javascript:;"
            class="d-flex align-items-center justify-content-center ml-3 remove-item"
            data-item-id="{{ $item->id }}"><i
                class="fa fa-times-circle f-20 text-lightest"></i></a>
    </div>
    <script>
        $(function() {

            $(document).find('.dropify').dropify({
                messages: dropifyMessages
            });

            var quantity = $('#sortable').find('.quantity[data-item-id="{{ $item->id }}"]').val();
            var perItemCost = $('#sortable').find('.cost_per_item[data-item-id="{{ $item->id }}"]').val();
            var amount = (quantity * perItemCost);
            $('#sortable').find('.amount[data-item-id="{{ $item->id }}"]').val(amount);
            $('#sortable').find('.amount-html[data-item-id="{{ $item->id }}"]').html(amount);

            calculateTotal();
        });
    </script>
</div>
