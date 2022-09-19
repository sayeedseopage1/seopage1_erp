<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>@lang('app.credit-note')</title>
    <style>
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
        }

        a {
            text-decoration: none;
        }

        body {
            position: relative;
            width: 100%;
            height: auto;
            margin: 0 auto;
            color: #555555;
            background: #FFFFFF;
            font-size: 13px;
            font-family: Verdana, Arial, Helvetica, sans-serif;
        }

        h2 {
            font-weight: normal;
        }

        header {
            padding: 10px 0;
        }

        #logo img {
            height: 33px;
            margin-bottom: 15px;
        }

        #details {
            margin-bottom: 25px;
        }

        #client {
            padding-left: 6px;
            float: left;
        }

        #client .to {
            color: #777777;
        }

        h2.name {
            font-size: 1.2em;
            font-weight: normal;
            margin: 0;
        }

        #invoice h1 {
            color: #0087C3;
            line-height: 2em;
            font-weight: normal;
            margin: 0 0 10px 0;
            font-size: 20px;
        }

        #invoice .date {
            font-size: 1.1em;
            color: #777777;
        }

        table {
            width: 100%;
            border-spacing: 0;
            /* margin-bottom: 20px; */
        }

        table th,
        table td {
            padding: 5px 8px;
            text-align: center;
        }

        table th {
            background: #EEEEEE;
        }

        table th {
            white-space: nowrap;
            font-weight: normal;
        }

        table td {
            text-align: right;
        }

        table td.desc h3,
        table td.qty h3 {
            font-size: 0.9em;
            font-weight: normal;
            margin: 0 0 0 0;
        }

        table .no {
            font-size: 0.9em;
            width: 10%;
            text-align: center;
            border-left: 1px solid #e7e9eb;
        }

        table .desc,
        table .item-summary {
            text-align: left;
        }

        table .unit {
            border: 1px solid #e7e9eb;
        }


        table .total {
            background: #57B223;
            color: #FFFFFF;
        }

        table td.unit,
        table td.qty,
        table td.total {
            font-size: 1.2em;
            text-align: center;
        }

        table td.unit {
            width: 35%;
        }

        table td.desc {
            width: 45%;
        }

        table td.qty {
            width: 5%;
        }

        .status {
            margin-top: 15px;
            padding: 1px 8px 5px;
            font-size: 1.3em;
            width: 80px;
            float: right;
            text-align: center;
            display: inline-block;
        }

        .status.unpaid {
            background-color: #E7505A;
        }

        .status.paid {
            background-color: #26C281;
        }

        .status.cancelled {
            background-color: #95A5A6;
        }

        .status.error {
            background-color: #F4D03F;
        }

        table tr.tax .desc {
            text-align: right;
        }

        table tr.discount .desc {
            text-align: right;
            color: #E43A45;
        }

        table tr.subtotal .desc {
            text-align: right;
        }

        table tbody tr:last-child td {
            border: none;
        }

        table tfoot td {
            padding: 10px;
            font-size: 1.2em;
            white-space: nowrap;
            border-bottom: 1px solid #e7e9eb;
            font-weight: 700;
        }

        table tfoot tr:first-child td {
            border-top: none;
        }

        table tfoot tr td:first-child {
            /* border: none; */
        }

        #notices {
            padding-left: 6px;
            border-left: 6px solid #0087C3;
        }

        #notices .notice {
            font-size: 1.2em;
        }

        footer {
            color: #777777;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #e7e9eb;
            padding: 8px 0;
            text-align: center;
        }

        table.billing td {
            background-color: #fff;
        }

        table td#invoiced_to {
            text-align: left;
            padding-left: 0;
        }

        #notes {
            color: #767676;
            font-size: 11px;
        }

        .item-summary {
            font-size: 11px;
            padding-left: 0;
        }

        .page_break {
            page-break-before: always;
        }


        table td.text-center {
            text-align: center;
        }

        .word-break {
            word-wrap: break-word;
        }

        #invoice-table td {
            border: 1px solid #e7e9eb;
        }

        .border-left-0 {
            border-left: 0 !important;
        }

        .border-right-0 {
            border-right: 0 !important;
        }

        .border-top-0 {
            border-top: 0 !important;
        }

        .border-bottom-0 {
            border-bottom: 0 !important;
        }

    </style>
</head>

<body>
    <header class="clearfix">

        <table cellpadding="0" cellspacing="0" class="billing">
            <tr>
                <td colspan="2">
                    <h1>@lang('app.credit-note')</h1>
                </td>
            </tr>
            <tr>
                <td id="invoiced_to">
                    <div>
                        @if (!is_null($creditNote->project) && !is_null($creditNote->project->client) && !is_null($creditNote->project->client->clientDetails))
                            <small>@lang('modules.invoices.billedTo'):</small>
                            <h3 class="name">
                                {{ mb_ucwords($creditNote->project->client->clientDetails->company_name) }}
                            </h3>
                            <div class="mb-3">
                                <b>@lang('app.address') :</b>
                                <div>{!! nl2br($creditNote->project->clientDetails->address) !!}</div>
                            </div>
                            @if ($creditNote->show_shipping_address === 'yes')
                                <div>
                                    <b>@lang('app.shippingAddress') :</b>
                                    <div>{!! nl2br($creditNote->project->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif

                            @if ($invoiceSetting->show_project == 1 && isset($creditNote->project))
                                <br><br>
                                <span class="text-dark-grey text-capitalize">@lang('modules.invoices.projectName'):</span><br>
                                {{ $creditNote->project->project_name }}
                            @endif

                            @if ($creditNoteSetting->show_gst == 'yes' && !is_null($creditNote->project->client->clientDetails->gst_number))
                                <div> @lang('app.gstIn'):
                                    {{ $creditNote->project->client->clientDetails->gst_number }} </div>
                            @endif
                        @elseif(!is_null($creditNote->client_id) && !is_null($creditNote->clientDetails))
                            <small>@lang('modules.invoices.billedTo'):</small>
                            <h3 class="name">{{ mb_ucwords($creditNote->clientDetails->company_name) }}</h3>
                            <div class="mb-3">
                                <b>@lang('app.address') :</b>
                                <div>{!! nl2br($creditNote->clientDetails->address) !!}</div>
                            </div>
                            @if ($creditNote->show_shipping_address === 'yes')
                                <div>
                                    <b>@lang('app.shippingAddress') :</b>
                                    <div>{!! nl2br($creditNote->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif
                            @if ($creditNoteSetting->show_gst == 'yes' && !is_null($creditNote->clientDetails->gst_number))
                                <div> @lang('app.gstIn'): {{ $creditNote->clientDetails->gst_number }} </div>
                            @endif
                        @endif

                        @if (is_null($creditNote->project) && !is_null($creditNote->estimate) && !is_null($creditNote->estimate->client->clientDetails))
                            <small>@lang('modules.invoices.billedTo'):</small>
                            <h3 class="name">
                                {{ mb_ucwords($creditNote->estimate->client->clientDetails->company_name) }}</h3>
                            <div class="mb-3">
                                <b>@lang('app.address') :</b>
                                <div>{!! nl2br($creditNote->estimate->client->clientDetails->address) !!}</div>
                            </div>
                            @if ($creditNote->show_shipping_address === 'yes')
                                <div>
                                    <b>@lang('app.shippingAddress') :</b>
                                    <div>{!! nl2br($creditNote->estimate->client->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif
                            @if ($creditNoteSetting->show_gst == 'yes' && !is_null($creditNote->estimate->client->clientDetails->gst_number))
                                <div> @lang('app.gstIn'):
                                    {{ $creditNote->estimate->client->clientDetails->gst_number }} </div>
                            @endif
                        @endif
                    </div>
                </td>
                <td>
                    <div id="company">
                        <div id="logo">
                            <img src="{{ invoice_setting()->logo_url }}" alt="home" class="dark-logo" />
                        </div>
                        <small>@lang('modules.invoices.generatedBy'):</small>
                        <h3 class="name">{{ mb_ucwords(global_setting()->company_name) }}</h3>
                        @if (!is_null($settings))
                            <div>{!! nl2br(default_address()->address) !!}</div>
                            <div>{{ global_setting()->company_phone }}</div>
                        @endif
                        @if ($creditNoteSetting->show_gst == 'yes' && !is_null($creditNoteSetting->gst_number))
                            <div>@lang('app.gstIn'): {{ $creditNoteSetting->gst_number }}</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </header>
    <main>
        <div id="details">

            <div id="invoice">

                <div>@lang('modules.invoices.invoiceNumber'):
                    {{ $creditNote->invoice->invoice_number }}</div>

                @if ($creditNote)
                    <div class="">@lang('app.credit-note'): {{ $creditNote->cn_number }}</div>
                @endif
                <div>@lang('modules.invoices.invoiceDate'):
                    {{ $creditNote->issue_date->format(global_setting()->date_format) }}</div>
                <div class="">@lang('app.status'): {{ mb_ucwords($creditNote->status) }}</div>
            </div>

        </div>
        <table cellspacing="0" cellpadding="0" id="invoice-table">
            <thead>
                <tr>
                    <th class="no">#</th>
                    <th class="desc">@lang('modules.invoices.item')</th>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <th class="qty">@lang('app.hsnSac')</th>
                    @endif
                    <th class="qty">@lang('modules.invoices.qty')</th>
                    <th class="qty">@lang('modules.invoices.unitPrice')</th>
                    <th class="qty">@lang('modules.invoices.tax')</th>
                    <th class="unit">@lang('modules.invoices.price') ({!! htmlentities($creditNote->currency->currency_code) !!})</th>
                </tr>
            </thead>
            <tbody>
                <?php $count = 0; ?>
                @foreach ($creditNote->items as $item)
                    @if ($item->type == 'item')
                        <tr style="page-break-inside: avoid;">
                            <td class="no">{{ ++$count }}</td>
                            <td class="desc">
                                <h3>{{ ucfirst($item->item_name) }}</h3>
                                @if (!is_null($item->item_summary))
                                    <table>
                                        <tr>
                                            <td
                                                class="item-summary word-break border-top-0 border-right-0 border-left-0 border-bottom-0">
                                                {!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}</td>
                                        </tr>
                                    </table>
                                @endif
                                @if ($item->creditNoteItemImage)
                                    <p class="mt-2">
                                        <img src="{{ $item->creditNoteItemImage->file_url }}" width="60" height="60"
                                            class="img-thumbnail">
                                    </p>
                                @endif
                            </td>
                            @if ($invoiceSetting->hsn_sac_code_show)
                                <td class="qty">
                                    <h3>{{ $item->hsn_sac_code ? $item->hsn_sac_code : '--' }}</h3>
                                </td>
                            @endif
                            <td class="qty">
                                <h3>{{ $item->quantity }}</h3>
                            </td>
                            <td class="qty">
                                <h3>{{ currency_formatter($item->unit_price, '') }}</h3>
                            </td>
                            <td class="qty">{{ $item->tax_list }}</td>
                            <td class="unit">{{ currency_formatter($item->amount, '') }}</td>
                        </tr>
                    @endif
                @endforeach
                <tr style="page-break-inside: avoid;" class="subtotal">
                    <td class="no">&nbsp;</td>
                    <td class="qty">&nbsp;</td>
                    <td class="qty">&nbsp;</td>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td class="qty">&nbsp;</td>
                    @endif
                    <td class="qty">&nbsp;</td>
                    <td class="desc">@lang('modules.invoices.subTotal')</td>
                    <td class="unit">{{ currency_formatter($creditNote->sub_total, '') }}</td>
                </tr>
                @if ($discount != 0 && $discount != '')
                    <tr style="page-break-inside: avoid;" class="discount">
                        <td class="no">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td class="qty">&nbsp;</td>
                        @endif
                        <td class="desc">@lang('modules.invoices.discount')</td>
                        <td class="unit">{{ currency_formatter($discount, '') }}</td>
                    </tr>
                @endif
                @foreach ($taxes as $key => $tax)
                    <tr style="page-break-inside: avoid;" class="tax">
                        <td class="no">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td class="qty">&nbsp;</td>
                        @endif
                        <td class="desc">{{ mb_strtoupper($key) }}</td>
                        <td class="unit">{{ currency_formatter($tax, '') }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr dontbreak="true">
                    <td colspan="5">@lang('modules.credit-notes.total')</td>
                    <td style="text-align: center">{{ currency_formatter($creditNote->total, '') }}</td>
                </tr>
                <tr dontbreak="true">
                    <td colspan="5">@lang('modules.credit-notes.creditAmountUsed')</td>
                    <td style="text-align: center">
                        {{ currency_formatter($creditNote->creditAmountUsed(), '') }}</td>
                </tr>
                <tr dontbreak="true">
                    <td colspan="5">@lang('app.adjustment') @lang('app.amount')</td>
                    <td style="text-align: center">
                        {{ currency_formatter($creditNote->adjustment_amount, '') }}</td>
                </tr>
                <tr dontbreak="true">
                    <td colspan="5">@lang('modules.credit-notes.creditAmountRemaining')</td>
                    <td style="text-align: center">
                        {{ currency_formatter($creditNote->creditAmountRemaining(), '') }}</td>
                </tr>
            </tfoot>
        </table>

        <p id="notes" class="word-break">
            @if (!is_null($creditNote->note))
                {!! nl2br($creditNote->note) !!}<br>
            @endif
            {!! nl2br($creditNoteSetting->invoice_terms) !!}
        </p>

    </main>
</body>

</html>
