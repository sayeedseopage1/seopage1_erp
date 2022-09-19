<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>@lang('app.invoice')</title>
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
            font-size: 1.2em;
            width: 10%;
            text-align: center;
            border-left: 1px solid #e7e9eb;
        }

        table .desc,
        table .item-summary {
            text-align: left;
        }

        table .unit {
            /* background: #DDDDDD; */
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
                    <h1>@lang('app.invoice')</h1>
                </td>
            </tr>
            <tr>
                <td id="invoiced_to">
                    <div>
                        @if ($invoice->project && $invoice->project->client && $invoice->project->client->clientDetails && ($invoice->project->client->name || $invoice->project->client->email || $invoice->project->client->mobile || $invoice->project->client->clientDetails->company_name || $invoice->project->client->clientDetails->address) && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))

                            <small>@lang('modules.invoices.billedTo'):</small><br>

                            @if ($invoice->project->client->name && $invoiceSetting->show_client_name == 'yes')
                                {{ mb_ucwords($invoice->project->client->name) }}<br>
                            @endif

                            @if ($invoice->project->client->email && $invoiceSetting->show_client_email == 'yes')
                                {{ $invoice->project->client->email }}<br>
                            @endif

                            @if ($invoice->project->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                                {{ $invoice->project->client->mobile }}<br>
                            @endif

                            @if ($invoice->project->client->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                                {{ mb_ucwords($invoice->project->client->clientDetails->company_name) }}<br>
                            @endif

                            @if ($invoice->project->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                                {!! nl2br($invoice->project->client->clientDetails->address) !!}
                            @endif

                            @if ($invoice->show_shipping_address === 'yes')
                                <div>
                                    <div>@lang('app.shippingAddress') :</div>
                                    <div>{!! nl2br($invoice->project->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif

                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->project->client->clientDetails->gst_number))
                                <div> @lang('app.gstIn'): {{ $invoice->project->client->clientDetails->gst_number }}
                                </div>
                            @endif
                        @elseif($invoice->client && $invoice->clientDetails && ($invoice->client->name || $invoice->client->email || $invoice->client->mobile || $invoice->clientDetails->company_name || $invoice->clientDetails->address) && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
                            <small>@lang('modules.invoices.billedTo'):</small><br>

                            @if ($invoice->client->name && $invoiceSetting->show_client_name == 'yes')
                                {{ mb_ucwords($invoice->client->name) }}<br>
                            @endif

                            @if ($invoice->client->email && $invoiceSetting->show_client_email == 'yes')
                                {{ $invoice->client->email }}<br>
                            @endif

                            @if ($invoice->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                                {{ $invoice->client->mobile }}<br>
                            @endif

                            @if ($invoice->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                                {{ mb_ucwords($invoice->clientDetails->company_name) }}<br>
                            @endif

                            @if ($invoice->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                                {!! nl2br($invoice->clientDetails->address) !!}
                            @endif

                            @if ($invoice->show_shipping_address === 'yes')
                                <div>
                                    <div>@lang('app.shippingAddress') :</div>
                                    <div>{!! nl2br($invoice->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif

                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->clientDetails->gst_number))
                                <div> @lang('app.gstIn'): {{ $invoice->clientDetails->gst_number }} </div>
                            @endif
                        @elseif(is_null($invoice->project) && $invoice->estimate && $invoice->estimate->client && $invoice->estimate->client->clientDetails && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
                            <small>@lang('modules.invoices.billedTo'):</small><br>

                            @if ($invoice->estimate->client->name && $invoiceSetting->show_client_name == 'yes')
                                {{ mb_ucwords($invoice->estimate->client->name) }}<br>
                            @endif

                            @if ($invoice->estimate->client->email && $invoiceSetting->show_client_email == 'yes')
                                {{ $invoice->estimate->client->email }}<br>
                            @endif

                            @if ($invoice->estimate->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                                {{ $invoice->estimate->client->mobile }}<br>
                            @endif

                            @if ($invoice->estimate->client->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                                {{ mb_ucwords($invoice->estimate->client->clientDetails->company_name) }}<br>
                            @endif

                            @if ($invoice->estimate->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                                {!! nl2br($invoice->estimate->client->clientDetails->address) !!}
                            @endif

                            @if ($invoice->show_shipping_address === 'yes')
                                <div>
                                    <div>@lang('app.shippingAddress') :</div>
                                    <div>{!! nl2br($invoice->estimate->client->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif
                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->estimate->client->clientDetails->gst_number))
                                <div> @lang('app.gstIn'): {{ $invoice->estimate->client->clientDetails->gst_number }}
                                </div>
                            @endif
                        @endif
                    </div>
                </td>
                <td>
                    <div id="company">
                        <div id="logo">
                            <img src="{{ $invoiceSetting->logo_url }}" alt="home" class="dark-logo" />
                        </div>
                        <small>@lang('modules.invoices.generatedBy'):</small>
                        <div>{{ mb_ucwords(global_setting()->company_name) }}</div>
                        @if (!is_null($settings) && $invoice->address)
                            <div>{!! nl2br($invoice->address->address) !!}</div>
                            <div>{{ global_setting()->company_phone }}</div>
                        @endif
                        @if ($invoiceSetting->show_gst == 'yes' && $invoice->address)
                            <div>{{ $invoice->address->tax_name }}: {{ $invoice->address->tax_number }}</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </header>
    <main>
        <div id="details">
            <div id="invoice">
                <h1>{{ $invoice->invoice_number }}</h1>
                @if ($creditNote)
                    <div class="">@lang('app.credit-note'): {{ $creditNote->cn_number }}</div>
                @endif
                <div class="date">@lang('modules.invoices.invoiceDate'):
                    {{ $invoice->issue_date->format(global_setting()->date_format) }}</div>
                @if (empty($invoice->order_id) && $invoice->status === 'unpaid' && $invoice->due_date->year > 1)
                    <div class="date">@lang('app.dueDate'):
                        {{ $invoice->due_date->format(global_setting()->date_format) }}</div>
                @endif
                <div class="">@lang('app.status'): {{ mb_ucwords($invoice->status) }}</div>
            </div>

            <p class="md-0">
                @if ($invoiceSetting->show_project == 1 && isset($invoice->project->project_name))
                <small>@lang('modules.invoices.projectName')</small><br>
                {{ $invoice->project->project_name }}
                @endif
            </p>

        </div>
        <table cellspacing="0" cellpadding="0" id="invoice-table">
            <thead>
                <tr>
                    <th class="no">#</th>
                    <th class="desc">@lang('modules.invoices.item')</th>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td class="qty">@lang('app.hsnSac')</td>
                    @endif
                    <th class="qty">@lang('modules.invoices.qty')</th>
                    <th class="qty">@lang('modules.invoices.unitPrice')</th>
                    <th class="qty">@lang('modules.invoices.tax')</th>
                    <th class="unit">@lang('modules.invoices.price') ({!! htmlentities($invoice->currency->currency_code) !!})</th>
                </tr>
            </thead>
            <tbody>
                <?php $count = 0; ?>
                @foreach ($invoice->items as $item)
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
                                @if ($item->invoiceItemImage)
                                    <p class="mt-2">
                                        <img src="{{ $item->invoiceItemImage->file_url }}" width="60" height="60"
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
                            <td>{{ $item->tax_list }}</td>
                            <td class="unit">{{ currency_formatter($item->amount, '') }}</td>
                        </tr>
                    @endif
                @endforeach
                <tr style="page-break-inside: avoid;" class="subtotal">
                    <td class="no">&nbsp;</td>
                    <td class="qty">&nbsp;</td>
                    <td class="qty">&nbsp;</td>
                    <td class="qty">&nbsp;</td>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td class="qty">&nbsp;</td>
                    @endif
                    <td class="desc">@lang('modules.invoices.subTotal')</td>
                    <td class="unit">{{ currency_formatter($invoice->sub_total, '') }}</td>
                </tr>
                @if ($discount != 0 && $discount != '')
                    <tr style="page-break-inside: avoid;" class="discount">
                        <td class="no">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td class="qty">&nbsp;</td>
                        @endif
                        <td class="qty">&nbsp;</td>
                        <td class="desc">@lang('modules.invoices.discount')</td>
                        <td class="unit">{{ currency_formatter($discount, '') }}</td>
                    </tr>
                @endif
                @foreach ($taxes as $key => $tax)
                    <tr style="page-break-inside: avoid;" class="tax">
                        <td class="no">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        <td class="qty">&nbsp;</td>
                        @if ($invoiceSetting->hsn_sac_code_show)
                            <td class="qty">&nbsp;</td>
                        @endif
                        <td class="qty">&nbsp;</td>
                        <td class="desc">{{ mb_strtoupper($key) }}</td>
                        <td class="unit">{{ currency_formatter($tax, '') }}</td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr dontbreak="true">
                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}">
                        @lang('modules.invoices.total')</td>
                    <td style="text-align: center">{{ currency_formatter($invoice->total, '') }}</td>
                </tr>
                @if ($invoice->appliedCredits() > 0)
                    <tr dontbreak="true">
                        <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}">
                            @lang('modules.invoices.appliedCredits')</td>
                        <td style="text-align: center">
                            {{ currency_formatter($invoice->appliedCredits(), '') }}</td>
                    </tr>
                @endif
                <tr dontbreak="true">
                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}">
                        @lang('modules.invoices.total') @lang('modules.invoices.paid')</td>
                    <td style="text-align: center">{{ currency_formatter($invoice->getPaidAmount(), '') }}
                    </td>
                </tr>
                <tr dontbreak="true">
                    <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? '6' : '5' }}">
                        @lang('modules.invoices.total') @lang('modules.invoices.due')</td>
                    <td style="text-align: center">{{ currency_formatter($invoice->amountDue(), '') }}
                        {{ $invoice->currency->currency_code }}</td>
                </tr>
            </tfoot>
        </table>

        <p id="notes" class="word-break">
            @if (!is_null($invoice->note))
                @lang('app.note') <br>{!! nl2br($invoice->note) !!}<br>
            @endif
            @lang('modules.invoiceSettings.invoiceTerms') <br>{!! nl2br($invoiceSetting->invoice_terms) !!}
        </p>


        @if (isset($taxes) && $invoiceSetting->tax_calculation_msg == 1)
            <p class="text-dark-grey">
                @if ($invoice->calculate_tax == 'after_discount')
                    @lang('messages.calculateTaxAfterDiscount')
                @else
                    @lang('messages.calculateTaxBeforeDiscount')
                @endif
            </p>
        @endif

        @if (count($payments) > 0)
            <div class="page_break"></div>
            <div class="b-all m-t-20 m-b-20 text-center">
                <h3 class="box-title m-t-20 text-center h3-border"> @lang('app.menu.payments')</h3>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="table-responsive m-t-40" style="clear: both;">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">@lang('modules.invoices.price')</th>
                                        <th class="text-center">@lang('modules.invoices.paymentMethod')</th>
                                        <th class="text-center">@lang('modules.invoices.paidOn')</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php $count = 0; ?>
                                    @forelse($payments as $key => $payment)
                                        <tr>
                                            <td class="text-center">{{ $key + 1 }}</td>
                                            <td class="text-center">
                                                {{ currency_formatter($payment->amount, '') }}
                                                {!! $invoice->currency->currency_code !!} </td>
                                            <td class="text-center">
                                                @php
                                                    $method = '--';

                                                    if (!is_null($payment->offline_method_id)) {
                                                        $method = $payment->offlineMethod->name;
                                                    } elseif (isset($payment->gateway)) {
                                                        $method = $payment->gateway;
                                                    }
                                                @endphp

                                                {{ $method }}

                                            </td>
                                            <td class="text-center">
                                                {{ $payment->paid_on->format(global_setting()->date_format) }} </td>
                                        </tr>
                                    @empty
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        @endif

    </main>
</body>

</html>
