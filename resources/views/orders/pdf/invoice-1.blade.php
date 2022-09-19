<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>@lang('app.order')</title>
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

        table .desc, table .item-summary  {
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
            word-wrap:break-word;
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
                <td colspan="2"><h1>@lang('app.order')</h1></td>
            </tr>
            <tr>
                <td id="invoiced_to">
                    <div>
                        @if($order->client && $order->clientDetails)
                            @if(($order->client->name || $order->client->email || $order->client->mobile || $order->clientDetails->company_name || $order->clientDetails->address )
                            && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
                                <small>@lang("modules.invoices.billedTo"):</small>
                                @if ($order->client->name && $invoiceSetting->show_client_name == 'yes')
                                    <div>{{ mb_ucwords($order->client->name) }}</div>
                                @endif

                                @if ($order->client->email && $invoiceSetting->show_client_email == 'yes')
                                    <div>{{ $order->client->email }}</div>
                                @endif

                                @if ($order->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                                    <div>{{ $order->client->mobile }}</div>
                                @endif

                                @if ($order->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                                    <div>{{ mb_ucwords($order->clientDetails->company_name) }}</div>
                                @endif

                                @if ($order->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                                    <div class="mb-3">
                                        <div>@lang('app.address') :</div>
                                        <div>{!! nl2br($order->clientDetails->address) !!}</div>
                                    </div>
                                @endif
                            @endif

                            @if ($order->show_shipping_address === 'yes' && $client->clientDetails->shipping_address && $invoiceSetting->show_client_company_address == 'yes')
                                <div>
                                    <div>@lang('app.shippingAddress') :</div>
                                    <div>{!! nl2br($order->clientDetails->shipping_address) !!}</div>
                                </div>
                            @endif
                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($order->clientDetails->gst_number))
                                <div> @lang('app.gstIn'): {{ $order->clientDetails->gst_number }} </div>
                            @endif
                        @endif


                    </div>
                </td>
                <td>
                    <div id="company">
                        <div id="logo">
                            <img src="{{ invoice_setting()->logo_url }}" alt="home" class="dark-logo" />
                        </div>
                            <small>@lang("modules.invoices.generatedBy"):</small>
                        <div>{{ mb_ucwords(global_setting()->company_name) }}</div>
                        @if (!is_null($settings) && $order->address)
                            <div>{!! nl2br($order->address->address) !!}</div>
                        @endif
                        <div>{{ global_setting()->company_phone }}</div>

                        @if ($invoiceSetting->show_gst == 'yes' && $order->address)
                            <div>{{ $order->address->tax_name }}: {{ $order->address->tax_number }}</div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>
    </header>
    <main>
        <div id="details">

            <div id="invoice">
                <h1>{{ $order->order_number }}</h1>

                <div class="date">@lang('modules.orders.orderDate'):
                    {{ \Carbon\Carbon::parse($order->order_date)->format(global_setting()->date_format) }}</div>

                <div class="">@lang('app.status'): @lang('modules.invoices.'.$order->status)</div>
            </div>

        </div>
        <table cellspacing="0" cellpadding="0" id="invoice-table">
            <thead>
                <tr>
                    <th class="no">#</th>
                    <th class="desc">@lang("modules.invoices.item")</th>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <td class="qty">@lang("app.hsnSac")</td>
                    @endif
                    <th class="qty">@lang("modules.invoices.qty")</th>
                    <th class="qty">@lang("modules.invoices.unitPrice")</th>
                    <th class="qty">@lang("modules.invoices.tax")</th>
                    <th class="unit">@lang("modules.invoices.price") ({!! htmlentities($order->currency->currency_code) !!})</th>
                </tr>
            </thead>
            <tbody>
                <?php $count = 0; ?>
                @foreach ($order->items as $item)
                    @if ($item->type == 'item')
                        <tr style="page-break-inside: avoid;">
                            <td class="no">{{ ++$count }}</td>
                            <td class="desc">
                                <h3>{{ ucfirst($item->item_name) }}</h3>
                                @if (!is_null($item->item_summary))
                                <table>
                                    <tr>
                                        <td class="item-summary word-break border-top-0 border-right-0 border-left-0 border-bottom-0">{!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}</td>
                                    </tr>
                                </table>
                                @endif
                                @if ($item->orderItemImage)
                                    <p class="mt-2">
                                        <img src="{{ $item->orderItemImage->file_url }}" width="60" height="60" class="img-thumbnail">
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
                                <h3>{{ currency_formatter($item->unit_price,'') }}</h3>
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
                    <td class="desc">@lang("modules.invoices.subTotal")</td>
                    <td class="unit">{{ currency_formatter($order->sub_total, '') }}</td>
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
                        <td class="desc">@lang("modules.invoices.discount")</td>
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
                        @lang("modules.invoices.total")</td>
                    <td style="text-align: center">{{ currency_formatter($order->total, '') }}</td>
                </tr>
            </tfoot>
        </table>

        <p id="notes" class="word-break">
            @if (!is_null($order->note))
                {!! nl2br($order->note) !!}<br>
            @endif
        </p>



    </main>
</body>

</html>
