@forelse ($timelogs as $key => $item)
    <!-- DESKTOP DESCRIPTION TABLE START -->
    <div class="d-flex px-4 py-3 c-inv-desc item-row">
        <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
            <table width="100%">
                <tbody>
                    <tr class="text-dark-grey font-weight-bold f-14">
                    <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}" class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                        @if($invoiceSetting->hsn_sac_code_show)
                            <td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>
                        @endif
                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")</td>
                    <td width="10%" class="border-0" align="right">@lang("modules.invoices.unitPrice")</td>
                    <td width="13%" class="border-0" align="right">@lang('modules.invoices.tax')</td>
                    <td width="17%" class="border-0 bblr-mbl" align="right">@lang('modules.invoices.amount')</td>
                    </tr>
                    <tr>
                    <td class="border-bottom-0 btrr-mbl btlr">
                        <input type="text" class="f-14 border-0 w-100 item_name" name="item_name[]"
                            placeholder="@lang('modules.expenses.itemName')" value="{{ $item->task->heading }}">
                    </td>
                    <td class="border-bottom-0 d-block d-lg-none d-md-none">
                        <input type="text" class="f-14 border-0 w-100 mobile-description" placeholder="@lang('placeholders.invoices.description')" name="item_summary[]" value="{{ $item->item_summary }}">
                    </td>
                        @if($invoiceSetting->hsn_sac_code_show)
                            <td class="border-bottom-0">
                            <input type="text" class="f-14 border-0 w-100 text-right hsn_sac_code" value="{{ $item->hsn_sac_code }}"
                                name="hsn_sac_code[]">
                            </td>
                        @endif
                    <td class="border-bottom-0">
                        <input type="number" min="1" class="f-14 border-0 w-100 text-right quantity" value="1"
                            name="quantity[]">
                    </td>
                    <td class="border-bottom-0">
                        <input type="number" min="1" class="f-14 border-0 w-100 text-right cost_per_item"
                            placeholder="0.00" value="{{ $item->sum }}" name="cost_per_item[]">
                    </td>
                    <td class="border-bottom-0">
                        <div class="select-others height-35 rounded border-0">
                            <select id="multiselect" name="taxes[{{ $key }}][]" multiple="multiple"
                                class="select-picker type customSequence border-0" data-size="3">
                                @foreach($taxes as $tax)
                                    <option data-rate="{{ $tax->rate_percent }}" value="{{ $tax->id }}">{{ $tax->tax_name }}: {{ $tax->rate_percent }}%</option>
                                @endforeach
                            </select>
                        </div>
                    </td>
                    <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                        <span class="amount-html">{{ $item->sum }}</span>
                        <input type="hidden" class="amount" name="amount[]" value="{{ $item->sum }}">
                    </td>
                    </tr>
                    <tr class="d-none d-md-block d-lg-table-row">
                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '5' : '4' }}" class="dash-border-top bblr">
                        <input type="text" class="f-14 border-0 w-100 desktop-description" name="item_summary[]"
                            placeholder="@lang('placeholders.invoices.description')" value="{{ $item->item_summary }}">
                    </td>
                    </tr>
                </tbody>
            </table>
            <a href="javascript:;" class="d-flex align-items-center justify-content-center ml-3 remove-item"><i
                class="fa fa-times-circle f-20 text-lightest"></i></a>
        </div>
    </div>
    <!-- DESKTOP DESCRIPTION TABLE END -->
@empty
<!-- DESKTOP DESCRIPTION TABLE START -->
    <div class="d-flex px-4 py-3 c-inv-desc item-row">

        <div class="c-inv-desc-table w-100 d-lg-flex d-md-flex d-block">
            <table width="100%">
                <tbody>
                    <tr class="text-dark-grey font-weight-bold f-14">
                        <td width="{{ $invoiceSetting->hsn_sac_code_show ? '40%' : '50%' }}"
                            class="border-0 inv-desc-mbl btlr">@lang('app.description')</td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td width="10%" class="border-0" align="right">@lang("app.hsnSac")</td>
                        @endif
                        <td width="10%" class="border-0" align="right">@lang("modules.invoices.qty")</td>
                        <td width="10%" class="border-0" align="right">@lang("modules.invoices.unitPrice")
                        </td>
                        <td width="13%" class="border-0" align="right">@lang('modules.invoices.tax')</td>
                        <td width="17%" class="border-0 bblr-mbl" align="right">
                            @lang('modules.invoices.amount')</td>
                    </tr>
                    <tr>
                        <td class="border-bottom-0 btrr-mbl btlr">
                            <input type="text" class="f-14 border-0 w-100 item_name" name="item_name[]"
                                placeholder="@lang('modules.expenses.itemName')">
                        </td>
                        <td class="border-bottom-0 d-block d-lg-none d-md-none">
                            <textarea class="form-control f-14 border-0 w-100 mobile-description"
                                name="item_summary[]"
                                placeholder="@lang('placeholders.invoices.description')"></textarea>
                        </td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td class="border-bottom-0">
                                <input type="text" min="1"
                                    class="f-14 border-0 w-100 text-right hsn_sac_code" value=""
                                    name="hsn_sac_code[]">
                            </td>
                        @endif
                        <td class="border-bottom-0">
                            <input type="number" min="1"
                                class="form-control f-14 border-0 w-100 text-right quantity" value="1"
                                name="quantity[]">
                        </td>
                        <td class="border-bottom-0">
                            <input type="number" min="1" class="f-14 border-0 w-100 text-right cost_per_item"
                                placeholder="0.00" value="0" name="cost_per_item[]">
                        </td>
                        <td class="border-bottom-0">
                            <div class="select-others height-35 rounded border-0">
                                <select id="multiselect" name="taxes[0][]" multiple="multiple"
                                    class="select-picker type customSequence border-0" data-size="3">
                                    @foreach ($taxes as $tax)
                                        <option data-rate="{{ $tax->rate_percent }}"
                                            value="{{ $tax->id }}">{{ $tax->tax_name }}:
                                            {{ $tax->rate_percent }}%</option>
                                    @endforeach
                                </select>
                            </div>
                        </td>
                        <td rowspan="2" align="right" valign="top" class="bg-amt-grey btrr-bbrr">
                            <span class="amount-html">0.00</span>
                            <input type="hidden" class="amount" name="amount[]" value="0">
                        </td>
                    </tr>
                    <tr class="d-none d-md-table-row d-lg-table-row">
                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '5' : '4' }}"
                            class="dash-border-top bblr">
                            <textarea class="f-14 border-0 w-100 desktop-description" name="item_summary[]"
                                placeholder="@lang('placeholders.invoices.description')"></textarea>
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
@endforelse
