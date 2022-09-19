<style>
    #logo {
        height: 33px;
    }

</style>

<!-- INVOICE CARD START -->
@if (!is_null($creditNote->project_id) && isset($creditNote->project->clientDetails))
    @php
        $client = $creditNote->project->client;
    @endphp
@elseif(!is_null($creditNote->client_id))
    @php
        $client = $creditNote->client;
    @endphp
@endif
<div class="card border-0 invoice">
    <!-- CARD BODY START -->
    <div class="card-body">
        <div class="invoice-table-wrapper">
            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            id="logo" /></td>
                    <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                        @lang('app.credit-note')</td>
                </tr>
                <tr class="inv-num">
                    <td class="f-14 text-dark">
                        <p class="mt-3 mb-0">
                            {{ mb_ucwords(global_setting()->company_name) }}<br>
                            @if (!is_null($settings))
                                {!! nl2br(default_address()->address) !!}<br>
                                {{ global_setting()->company_phone }}
                            @endif
                            @if ($creditNoteSetting->show_gst == 'yes' && !is_null($creditNoteSetting->gst_number))
                                <br>@lang('app.gstIn'): {{ $creditNoteSetting->gst_number }}
                            @endif



                        </p><br>
                    </td>
                    <td align="right">
                        <table class="inv-num-date text-dark f-13 mt-3">
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">@lang('app.credit-note')</td>
                                <td class="border-left-0">{{ $creditNote->cn_number }}</td>
                            </tr>
                            @if ($invoiceExist && $creditNote->invoice_id)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">
                                        @lang('modules.invoices.invoiceNumber')</td>
                                    <td class="border-left-0">{{ $creditNote->invoice->invoice_number }}</td>
                                </tr>
                            @endif
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('app.credit-note') @lang('app.date')</td>
                                <td class="border-left-0">{{ $creditNote->issue_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="20"></td>
                </tr>
            </table>
            <table width="100%">
                <tr class="inv-unpaid">
                    <td class="f-14 text-dark">
                        <p class="mb-0 text-left"><span
                                class="text-dark-grey text-capitalize">@lang("modules.invoices.billedTo")</span><br>
                            {{ mb_ucwords($client->name) }}<br>
                            {{ mb_ucwords($client->clientDetails->company_name) }}<br>
                            {!! nl2br($client->clientDetails->address) !!}

                            @if (($invoiceSetting->show_project == 1) && (isset($creditNote->project)))
                            <br><br>
                            <span class="text-dark-grey text-capitalize">@lang("modules.invoices.projectName")</span><br>
                            {{ $creditNote->project->project_name }}
                            @endif
                        </p>
                    </td>

                    <td align="right" class="mt-4 mt-lg-0 mt-md-0">
                        <span
                            class="unpaid {{ $creditNote->status == 'open' ? 'text-success border-success' : '' }} rounded f-15 ">@lang('modules.credit-notes.'.$creditNote->status)</span>
                    </td>
                </tr>
                <tr>
                    <td height="30" colspan="2"></td>
                </tr>
            </table>
            <table width="100%" class="inv-desc d-none d-lg-table d-md-table">
                <tr>
                    <td colspan="2">
                        <table class="inv-detail f-14 table-responsive-sm" width="100%">
                            <tr class="i-d-heading bg-light-grey text-dark-grey font-weight-bold">
                                <td class="border-right-0" width="35%">@lang('app.description')</td>
                                @if ($creditNoteSetting->hsn_sac_code_show)
                                    <td class="border-right-0 border-left-0" align="right">@lang("app.hsnSac")
                                @endif
                                <td class="border-right-0 border-left-0" align="right">@lang("modules.invoices.qty")
                                </td>
                                <td class="border-right-0 border-left-0" align="right">
                                    @lang("modules.invoices.unitPrice")
                                </td>
                                <td class="border-left-0" align="right">@lang("modules.invoices.tax")</td>
                                <td class="border-left-0" align="right" width="20%">
                                    @lang("modules.invoices.amount")
                                    ({{ $creditNote->currency->currency_code }})</td>
                            </tr>
                            @foreach ($creditNote->items as $item)
                                @if ($item->type == 'item')
                                    <tr class="text-dark font-weight-semibold f-13">
                                        <td>{{ ucfirst($item->item_name) }}</td>
                                        @if ($creditNoteSetting->hsn_sac_code_show)
                                            <td align="right">{{ $item->hsn_sac_code ? $item->hsn_sac_code : '--' }}</td>
                                        @endif
                                        <td align="right">{{ $item->quantity }}</td>
                                        <td align="right">
                                            {{ currency_formatter($item->unit_price, '') }}</td>
                                        <td align="right">{{ $item->tax_list }}</td>
                                        <td align="right">{{ currency_formatter($item->amount, '') }}
                                        </td>
                                    </tr>
                                    @if ($item->item_summary || $item->creditNoteItemImage)
                                        <tr class="text-dark f-12">
                                            <td colspan="{{ $creditNoteSetting->hsn_sac_code_show ? '6' : '5' }}" class="border-bottom-0">
                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                @if ($item->creditNoteItemImage)
                                                    <p class="mt-2">
                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->creditNoteItemImage->file_url }}">
                                                            <img src="{{ $item->creditNoteItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                        </a>
                                                    </p>
                                                @endif
                                            </td>
                                        </tr>
                                    @endif
                                @endif
                            @endforeach


                            <tr>
                                <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '4' : '3' }}" class="blank-td border-bottom-0 border-left-0 border-right-0"></td>
                                <td class="p-0 border-right-0" align="right">
                                    <table width="100%">
                                        <tr class="text-dark-grey" align="right">
                                            <td class="w-50 border-top-0 border-left-0">
                                                @lang("modules.invoices.subTotal")</td>
                                        </tr>
                                        @if ($discount != 0 && $discount != '')
                                            <tr class="text-dark-grey" align="right">
                                                <td class="w-50 border-top-0 border-left-0">
                                                    @lang("modules.invoices.discount")</td>
                                            </tr>
                                        @endif
                                        @foreach ($taxes as $key => $tax)
                                            <tr class="text-dark-grey" align="right">
                                                <td class="w-50 border-top-0 border-left-0">
                                                    {{ mb_strtoupper($key) }}</td>
                                            </tr>
                                        @endforeach
                                        <tr class=" text-dark-grey font-weight-bold" align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang("modules.invoices.total")</td>
                                        </tr>
                                        <tr class=" text-dark-grey " align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang("modules.credit-notes.creditAmountUsed")</td>
                                        </tr>
                                        <tr class=" text-dark-grey " align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang('app.adjustment') @lang('app.amount')</td>
                                        </tr>
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="w-50 border-bottom-0 border-left-0">
                                                @lang('modules.credit-notes.creditAmountRemaining')</td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="p-0 border-right-0" align="right">
                                    <table width="100%">
                                        <tr class="text-dark-grey" align="right">
                                            <td class="border-top-0 border-left-0">
                                                {{ currency_formatter($creditNote->sub_total, '') }}</td>
                                        </tr>
                                        @if ($discount != 0 && $discount != '')
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-left-0">
                                                    {{ currency_formatter($discount, '') }}</td>
                                            </tr>
                                        @endif
                                        @foreach ($taxes as $key => $tax)
                                            <tr class="text-dark-grey" align="right">
                                                <td class="border-top-0 border-left-0">
                                                    {{ currency_formatter($tax, '') }}</td>
                                            </tr>
                                        @endforeach
                                        <tr class=" text-dark-grey font-weight-bold" align="right">
                                            <td class="border-bottom-0 border-left-0">
                                                {{ currency_formatter($creditNote->total, '') }}</td>
                                        </tr>
                                        <tr class=" text-dark-grey " align="right">
                                            <td class="border-bottom-0 border-left-0">
                                                {{ currency_formatter($creditNote->creditAmountUsed(), '') }}
                                            </td>
                                        </tr>
                                        <tr class=" text-dark-grey " align="right">
                                            <td class="border-bottom-0 border-left-0">
                                                {{ currency_formatter($creditNote->adjustment_amount, '') }}
                                            </td>
                                        </tr>
                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                            <td class="border-bottom-0 border-left-0">
                                                {{ currency_formatter($creditNote->creditAmountRemaining(), '') }}
                                                {{ $creditNote->currency->currency_code }}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>

                </tr>
            </table>
            <table width="100%" class="inv-desc-mob d-block d-lg-none d-md-none">

                @foreach ($creditNote->items as $item)
                    @if ($item->type == 'item')

                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang('app.description')</th>
                            <td class="p-0 ">
                                <table>
                                    <tr width="100%" class="font-weight-semibold f-13">
                                        <td class="border-left-0 border-right-0 border-top-0">
                                            {{ ucfirst($item->item_name) }}</td>
                                    </tr>
                                    @if ($item->item_summary != '' || $item->creditNoteItemImage)
                                        <tr>
                                            <td class="border-left-0 border-right-0 border-bottom-0 f-12">
                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                @if ($item->creditNoteItemImage)
                                                    <p class="mt-2">
                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->creditNoteItemImage->file_url }}">
                                                            <img src="{{ $item->creditNoteItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                        </a>
                                                    </p>
                                                @endif
                                            </td>
                                        </tr>
                                    @endif
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.qty")</th>
                            <td width="50%">{{ $item->quantity }}</td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.unitPrice")
                                ({{ $creditNote->currency->currency_code }})</th>
                            <td width="50%">{{ currency_formatter($item->unit_price, '') }}</td>
                        </tr>
                        <tr>
                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                @lang("modules.invoices.amount")
                                ({{ $creditNote->currency->currency_code }})</th>
                            <td width="50%">{{ currency_formatter($item->amount, '') }}</td>
                        </tr>
                        <tr>
                            <td height="3" class="p-0 " colspan="2"></td>
                        </tr>
                    @endif
                @endforeach

                <tr>
                    <th width="50%" class="text-dark-grey font-weight-normal">@lang("modules.invoices.subTotal")
                    </th>
                    <td width="50%" class="text-dark-grey font-weight-normal">
                        {{ currency_formatter($creditNote->sub_total, '') }}</td>
                </tr>
                @if ($discount != 0 && $discount != '')
                    <tr>
                        <th width="50%" class="text-dark-grey font-weight-normal">@lang("modules.invoices.discount")
                        </th>
                        <td width="50%" class="text-dark-grey font-weight-normal">
                            {{ currency_formatter($discount, '') }}</td>
                    </tr>
                @endif

                @foreach ($taxes as $key => $tax)
                    <tr>
                        <th width="50%" class="text-dark-grey font-weight-normal">{{ mb_strtoupper($key) }}</th>
                        <td width="50%" class="text-dark-grey font-weight-normal">
                            {{ currency_formatter($tax, '') }}</td>
                    </tr>
                @endforeach
                <tr>
                    <th width="50%" class="text-dark-grey font-weight-bold">@lang("modules.invoices.total")</th>
                    <td width="50%" class="text-dark-grey font-weight-bold">
                        {{ currency_formatter($creditNote->total, '') }}</td>
                </tr>
                <tr>
                    <th width="50%" class="text-dark-grey font-weight-bold">
                        @lang('modules.credit-notes.creditAmountUsed')</th>
                    <td width="50%" class="text-dark-grey font-weight-bold">
                        {{ currency_formatter($creditNote->creditAmountUsed(), '') }}</td>
                </tr>
                <tr>
                    <th width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                        @lang("modules.invoices.total")
                        @lang("modules.invoices.due")</th>
                    <td width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                        {{ currency_formatter($creditNote->creditAmountRemaining(), '') }}
                        {{ $creditNote->currency->currency_code }}</td>
                </tr>
            </table>
            <table class="inv-note">
                <tr>
                    <td height="30" colspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>@lang('app.note')</tr>
                            <tr>
                                <p class="text-dark-grey">{!! $creditNote->note ? nl2br($creditNote->note) : '--' !!}</p>
                            </tr>
                        </table>
                    </td>
                    <td align="right">
                        <table>
                            <tr>@lang('modules.invoiceSettings.invoiceTerms')</tr>
                            <tr>
                                <p class="text-dark-grey">{!! nl2br($creditNoteSetting->invoice_terms) !!}</p>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- CARD BODY END -->
    <!-- CARD FOOTER START -->
    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">


        <div class="d-flex mb-4">
            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                <button class="dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">@lang('app.action')
                    <span><i class="fa fa-chevron-down f-15"></i></span>
                </button>
                <!-- DROPDOWN - INFORMATION -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" tabindex="0">
                    <li>
                        <a class="dropdown-item f-14 text-dark"
                            href="{{ route('creditnotes.download', [$creditNote->id]) }}">
                            <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                        </a>
                    </li>
                    @if ($creditNote->status == 'open' && !in_array('client', user_roles()))
                        <li>
                            <a class="dropdown-item f-14 text-dark openRightModal"
                                href="{{ route('creditnotes.apply_to_invoice', [$creditNote->id]) }}">
                                <i class="fa fa-receipt f-w-500 mr-2 f-11"></i> @lang('app.applyToInvoice')
                            </a>
                        </li>
                    @endif

                </ul>
            </div>
        </div>

        @if ($invoiceExist && $creditNote->invoice_id)
            <x-forms.link-secondary icon="receipt" class="mr-3 mb-4"
                :link="route('invoices.show', [$creditNote->invoice_id])">
                @lang('app.viewInvoice')
            </x-forms.link-secondary>
        @endif

        @if ($creditNote->payment->count() > 0)
            <x-forms.link-secondary icon="eye" class="mr-3 openRightModal mb-4"
                :link="route('creditnotes.credited_invoices', $creditNote->id)">
                @lang('app.creditedInvoices')
            </x-forms.link-secondary>
        @endif

        <x-forms.button-cancel :link="route('creditnotes.index')" class="border-0 mr-3 mb-4">@lang('app.cancel')
        </x-forms.button-cancel>

    </div>
    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->
