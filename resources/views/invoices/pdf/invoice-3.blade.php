<!DOCTYPE html>
<!--
  Invoice template by invoicebus.com
  To customize this template consider following this guide https://invoicebus.com/how-to-create-invoice-template/
  This template is under Invoicebus Template License, see https://invoicebus.com/templates/license/
-->
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>@lang('app.invoice')</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="Invoice">


    <style>
        /*! Invoice Templates @author: Invoicebus @email: info@invoicebus.com @web: https://invoicebus.com @version: 1.0.0 @updated: 2015-02-27 16:02:34 @license: Invoicebus */
        /* Reset styles */
        /*@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,latin,greek-ext,greek,latin-ext,vietnamese");*/
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-family: Verdana, Arial, Helvetica, sans-serif;
            vertical-align: baseline;
        }

        html {
            line-height: 1;
        }

        ol,
        ul {
            list-style: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        caption,
        th,
        td {
            text-align: left;
            font-weight: normal;
            vertical-align: middle;
        }

        q,
        blockquote {
            quotes: none;
        }

        q:before,
        q:after,
        blockquote:before,
        blockquote:after {
            content: "";
            content: none;
        }

        a img {
            border: none;
        }

        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        main,
        menu,
        nav,
        section,
        summary {
            display: block;
        }

        /* Invoice styles */
        /**
         * DON'T override any styles for the <html> and <body> tags, as this may break the layout.
         * Instead wrap everything in one main <div id="container"> element where you may change
         * something like the font or the background of the invoice
         */
        html,
        body {
            /* MOVE ALONG, NOTHING TO CHANGE HERE! */
        }

        /**
         * IMPORTANT NOTICE: DON'T USE '!important' otherwise this may lead to broken print layout.
         * Some browsers may require '!important' in oder to work properly but be careful with it.
         */
        .clearfix {
            display: block;
            clear: both;
        }

        .hidden {
            display: none;
        }

        b,
        strong,
        .bold {
            font-weight: bold;
        }

        #container {
            font: normal 13px/1.4em 'Open Sans', Sans-serif;
            margin: 0 auto;
            color: #5B6165;
            position: relative;
        }

        #memo {
            padding-top: 40px;
            margin: 0 30px;
            border-bottom: 1px solid #ddd;
            height: 85px;
        }

        #memo .logo {
            float: left;
            margin-right: 20px;
        }

        #memo .logo img {
            height: 33px;
        }

        #memo .company-info {
            /*float: right;*/
            text-align: right;
            line-height: 18px;
        }

        #memo .company-info>div:first-child {
            line-height: 1em;
            font-size: 20px;
            color: #B32C39;
        }

        #memo .company-info span {
            font-size: 11px;
            display: inline-block;
            min-width: 20px;
            width: 100%;
        }

        #memo:after {
            content: '';
            display: block;
            clear: both;
        }

        #invoice-title-number {
            font-weight: bold;
            margin: 30px 0;
        }

        #invoice-title-number span {
            line-height: 0.88em;
            display: inline-block;
            min-width: 20px;
        }

        #invoice-title-number #title {
            text-transform: uppercase;
            padding: 8px 5px 8px 30px;
            font-size: 30px;
            background: #F4846F;
            color: white;
        }

        #invoice-title-number #number {
            margin-left: 10px;
            padding: 8px 0;
            font-size: 30px;
        }

        #client-info {
            float: left;
            margin-left: 30px;
            min-width: 220px;
            line-height: 18px;
        }

        #client-info>div {
            margin-bottom: 3px;
            min-width: 20px;
        }

        #client-info span {
            display: block;
            min-width: 20px;
        }

        #client-info>span {
            text-transform: uppercase;
        }

        table {
            table-layout: fixed;
        }

        table th,
        table td {
            vertical-align: top;
            word-break: keep-all;
            word-wrap: break-word;
        }

        #items {
            margin: 25px 30px 0 30px;
        }

        #items .first-cell,
        #items table th:first-child,
        #items table td:first-child {
            width: 40px !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: right;
        }

        #items table {
            border-collapse: separate;
            width: 100%;
        }

        #items table th {
            font-weight: bold;
            padding: 5px 8px;
            text-align: right;
            background: #B32C39;
            color: white;
            text-transform: uppercase;
        }

        #items table th:nth-child(2) {
            width: 30%;
            text-align: left;
        }

        #items table th:last-child {
            text-align: right;
        }

        #items table td {
            padding: 9px 8px;
            text-align: right;
            border-bottom: 1px solid #ddd;
        }

        #items table td:nth-child(2) {
            text-align: left;
        }

        #sums table {
            width: 50%;
            float: right;
            margin-right: 30px;
        }

        #sums table tr th,
        #sums table tr td {
            min-width: 100px;
            padding: 9px 8px;
            text-align: right;
        }

        #sums table tr th {
            width: 70%;
            font-weight: bold;
            padding-right: 35px;
        }

        #sums table tr td.last {
            min-width: 0 !important;
            max-width: 0 !important;
            width: 0 !important;
            padding: 0 !important;
            border: none !important;
        }

        #sums table tr.amount-total th {
            text-transform: uppercase;
        }

        #sums table tr.amount-total th,
        #sums table tr.amount-total td {
            font-size: 15px;
            font-weight: bold;
        }

        #invoice-info {
            margin: 10px 30px;
            line-height: 18px;
        }

        #invoice-info>div>span {
            display: inline-block;
            min-width: 20px;
            min-height: 18px;
            margin-bottom: 3px;
        }

        #invoice-info>div>span:first-child {
            color: black;
        }

        #invoice-info>div>span:last-child {
            color: #aaa;
        }

        #invoice-info:after {
            content: '';
            display: block;
            clear: both;
        }

        #terms .notes {
            min-height: 30px;
            min-width: 50px;
            margin: 0 30px;
        }

        #calculate_tax .calculate_tax {
            min-height: 30px;
            min-width: 50px;
            margin: 10px 0 0 30px;
        }

        #terms .payment-info div {
            margin-bottom: 3px;
            min-width: 20px;
        }

        .thank-you {
            margin: 10px 0 30px 0;
            display: inline-block;
            min-width: 20px;
            text-transform: uppercase;
            font-weight: bold;
            line-height: 0.88em;
            float: right;
            padding: 5px 30px 0 2px;
            font-size: 20px;
            background: #F4846F;
            color: white;
        }

        .ib_bottom_row_commands {
            margin-left: 30px !important;
        }

        .item-summary {
            font-size: 12px
        }

        .mb-3 {
            margin-bottom: 1rem;
        }

        .text-white {
            color: white;
        }

        /**
         * If the printed invoice is not looking as expected you may tune up
         * the print styles (you can use !important to override styles)
         */
        @media print {
            /* Here goes your print styles */
        }

        .page_break {
            page-break-before: always;
        }

        .h3-border {
            border-bottom: 1px solid #AAAAAA;
        }

        table td.text-center {
            text-align: center;
        }

        #itemsPayment,
        .box-title {
            margin: 25px 30px 0 30px;
        }

        #itemsPayment .first-cell,
        #itemsPayment table th:first-child,
        #itemsPayment table td:first-child {
            width: 40px !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: right;
        }

        #itemsPayment table {
            border-collapse: separate;
            width: 100%;
        }

        #itemsPayment table th {
            font-weight: bold;
            padding: 5px 8px;
            text-align: right;
            background: #B32C39;
            color: white;
            text-transform: uppercase;
        }

        #itemsPayment table th:nth-child(2) {
            width: 30%;
            text-align: left;
        }

        #itemsPayment table th:last-child {
            text-align: right;
        }

        #itemsPayment table td {
            padding: 9px 8px;
            text-align: right;
            border-bottom: 1px solid #ddd;
        }

        #itemsPayment table td:nth-child(2) {
            text-align: left;
        }

        table th,
        table td {
            vertical-align: top;
            word-break: keep-all;
            word-wrap: break-word;
        }

        .word-break {
            word-wrap: break-word;
        }

    </style>
</head>

<body>
    <div id="container">
        <section id="memo">
            <div class="logo">
                <img src="{{ invoice_setting()->logo_url }}" />
            </div>

            <div class="company-info">
                <div>
                    {{ mb_ucwords(global_setting()->company_name) }}
                </div>

                <br />

                @if ($invoice->address)
                    <span>{!! nl2br($invoice->address->address) !!}</span>
                    <br />
                @endif

                <span>{{ global_setting()->company_phone }}</span>

                <br />

                @if ($invoiceSetting->show_gst == 'yes' && $invoice->address)
                    <div>{{ $invoice->address->tax_name }}: {{ $invoice->address->tax_number }}</div>
                @endif
            </div>

        </section>

        <section id="invoice-title-number">

            <span id="title">{{ $invoiceSetting->invoice_prefix }}#</span>
            <span id="number">{{ $invoice->original_invoice_number }}</span>

        </section>


        <div class="clearfix"></div>
        @if ($invoice->project && $invoice->project->client && $invoice->project->client->clientDetails && ($invoice->project->client->name || $invoice->project->client->email || $invoice->project->client->mobile || $invoice->project->client->clientDetails->company_name || $invoice->project->client->clientDetails->address) && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
            <section id="client-info">

                <span>@lang('modules.invoices.billedTo'):</span>

                @if ($invoice->project->client->name && $invoiceSetting->show_client_name == 'yes')
                    <div>
                        <span class="bold">{{ mb_ucwords($invoice->project->client->name) }}</span>
                    </div>
                @endif

                @if ($invoice->project->client->email && $invoiceSetting->show_client_email == 'yes')
                    <div>
                        <span class="">{{ $invoice->project->client->email }}</span>
                    </div>
                @endif

                @if ($invoice->project->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                    <div>
                        <span class="">{{ $invoice->project->client->mobile }}</span>
                    </div>
                @endif
                @if ($invoice->project->client->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                    <div>
                        <span>{{ mb_ucwords($invoice->project->client->clientDetails->company_name) }}</span>
                    </div>
                @endif

                @if ($invoice->project->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                    <div class="mb-3">
                        <b>@lang('app.address') :</b>
                        <div>{!! nl2br($invoice->project->clientDetails->address) !!}</div>
                    </div>
                @endif

                @if ($invoice->show_shipping_address === 'yes')
                    <div>
                        <b>@lang('app.shippingAddress') :</b>
                        <div>{!! nl2br($invoice->project->clientDetails->shipping_address) !!}</div>
                    </div>
                @endif

                @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->project->client->clientDetails) && !is_null($invoice->project->client->clientDetails->gst_number))
                    <div>
                        <span> @lang('app.gstIn'): {{ $invoice->project->client->clientDetails->gst_number }} </span>
                    </div>
                @endif

            </section>
        @elseif($invoice->client && $invoice->clientDetails && ($invoice->client->name || $invoice->client->email || $invoice->client->mobile || $invoice->clientDetails->company_name || $invoice->clientDetails->address) && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
            <section id="client-info">
                <span>@lang('modules.invoices.billedTo'):</span>

                @if ($invoice->client->name && $invoiceSetting->show_client_name == 'yes')
                    <div>
                        <span class="bold">{{ mb_ucwords($invoice->client->name) }}</span>
                    </div>
                @endif

                @if ($invoice->client->email && $invoiceSetting->show_client_email == 'yes')
                    <div>
                        <span class="">{{ $invoice->client->email }}</span>
                    </div>
                @endif

                @if ($invoice->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                    <div>
                        <span class="">{{ $invoice->client->mobile }}</span>
                    </div>
                @endif

                @if ($invoice->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                    <div>
                        <span>{{ mb_ucwords($invoice->clientDetails->company_name) }}</span>
                    </div>
                @endif

                @if ($invoice->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                    <div class="mb-3">
                        <b>@lang('app.address') :</b>
                        <div>{!! nl2br($invoice->clientDetails->address) !!}</div>
                    </div>
                @endif

                @if ($invoice->show_shipping_address === 'yes')
                    <div>
                        <b>@lang('app.shippingAddress') :</b>
                        <div>{!! nl2br($invoice->clientDetails->shipping_address) !!}</div>
                    </div>
                @endif

                @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->clientDetails) && !is_null($invoice->clientDetails->gst_number))
                    <div>
                        <span> @lang('app.gstIn'): {{ $invoice->clientDetails->gst_number }} </span>
                    </div>
                @endif
            </section>
        @endif



        @if (is_null($invoice->project) && $invoice->estimate && $invoice->estimate->client && $invoice->estimate->client->clientDetails && ($invoiceSetting->show_client_name == 'yes' || $invoiceSetting->show_client_email == 'yes' || $invoiceSetting->show_client_phone == 'yes' || $invoiceSetting->show_client_company_name == 'yes' || $invoiceSetting->show_client_company_address == 'yes'))
            <section id="client-info">
                <span>@lang('modules.invoices.billedTo'):</span>
                @if ($invoice->estimate->client->name && $invoiceSetting->show_client_name == 'yes')
                    <div>
                        <span class="bold">{{ mb_ucwords($invoice->estimate->client->name) }}</span>
                    </div>
                @endif

                @if ($invoice->estimate->client->email && $invoiceSetting->show_client_email == 'yes')
                    <div>
                        <span class="">{{ $invoice->estimate->client->email }}</span>
                    </div>
                @endif

                @if ($invoice->estimate->client->mobile && $invoiceSetting->show_client_phone == 'yes')
                    <div>
                        <span class="">{{ $invoice->estimate->client->mobile }}</span>
                    </div>
                @endif

                @if ($invoice->estimate->client->clientDetails->company_name && $invoiceSetting->show_client_company_name == 'yes')
                    <div>
                        <span
                            class="">{{ mb_ucwords($invoice->estimate->client->clientDetails->company_name) }}</span>
                    </div>
                @endif

                @if ($invoice->estimate->client->clientDetails->address && $invoiceSetting->show_client_company_address == 'yes')
                    <div class="mb-3">
                        <b>@lang('app.address') :</b>
                        <div>{!! nl2br($invoice->estimate->client->clientDetails->address) !!}</div>
                    </div>
                @endif

                @if ($invoice->show_shipping_address === 'yes')
                    <div>
                        <b>@lang('app.shippingAddress') :</b>
                        <div>{!! nl2br($invoice->estimate->client->clientDetails->shipping_address) !!}</div>
                    </div>
                @endif

                @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoice->estimate->client->clientDetails->gst_number))
                    <div>
                        <span> @lang('app.gstIn'): {{ $invoice->estimate->client->clientDetails->gst_number }}
                        </span>
                    </div>
                @endif

            </section>
        @endif
        <div class="clearfix"></div>

        <br>
        <section id="client-info">
            @if ($invoiceSetting->show_project == 1 && isset($invoice->project->project_name))
                <span>@lang('modules.invoices.projectName')</span>
                {{ $invoice->project->project_name }}
            @endif
        </section>
        <br><br><br>

        <section id="items">

            <table cellpadding="0" cellspacing="0">

                <tr>
                    <th>#</th> <!-- Dummy cell for the row number and row commands -->
                    <th>@lang('modules.invoices.item')</th>
                    @if ($invoiceSetting->hsn_sac_code_show)
                        <th>@lang('app.hsnSac')</th>
                    @endif
                    <th>@lang('modules.invoices.qty')</th>
                    <th>@lang('modules.invoices.unitPrice')</th>
                    <th>@lang('modules.invoices.tax')</th>
                    <th>@lang('modules.invoices.price') ({!! htmlentities($invoice->currency->currency_code) !!})</th>
                </tr>

                <?php $count = 0; ?>
                @foreach ($invoice->items as $item)
                    @if ($item->type == 'item')
                        <tr data-iterate="item">
                            <td>{{ ++$count }}</td>
                            <!-- Don't remove this column as it's needed for the row commands -->
                            <td>
                                {{ ucfirst($item->item_name) }}
                                @if (!is_null($item->item_summary))
                                    <p class="item-summary  mb-3">{!! nl2br(strip_tags($item->item_summary, ['p', 'b', 'strong', 'a'])) !!}</p>
                                @endif
                                @if ($item->invoiceItemImage)
                                    <p class="mt-2">
                                        <img src="{{ $item->invoiceItemImage->file_url }}" width="60" height="60"
                                            class="img-thumbnail">
                                    </p>
                                @endif
                            </td>
                            @if ($invoiceSetting->hsn_sac_code_show)
                                <td>{{ $item->hsn_sac_code ? $item->hsn_sac_code : '--' }}</td>
                            @endif
                            <td>{{ $item->quantity }}</td>
                            <td>{{ currency_formatter($item->unit_price, '') }}</td>
                            <td>{{ $item->tax_list }}</td>
                            <td>{{ currency_formatter($item->amount, '') }}</td>
                        </tr>
                    @endif
                @endforeach

            </table>

        </section>

        <section id="sums">

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th>@lang('modules.invoices.subTotal'):</th>
                    <td>{{ currency_formatter($invoice->sub_total, '') }}</td>
                </tr>
                @if ($discount != 0 && $discount != '')
                    <tr data-iterate="tax">
                        <th>@lang('modules.invoices.discount'):</th>
                        <td>-{{ currency_formatter($discount, '') }}</td>
                    </tr>
                @endif
                @foreach ($taxes as $key => $tax)
                    <tr data-iterate="tax">
                        <th>{{ mb_strtoupper($key) }}:</th>
                        <td>{{ currency_formatter($tax, '') }}</td>
                    </tr>
                @endforeach
                <tr class="amount-total">
                    <th>@lang('modules.invoices.total'):</th>
                    <td>{{ currency_formatter($invoice->total, '') }}</td>
                </tr>
                @if ($invoice->creditNotes()->count() > 0)
                    <tr>
                        <th>
                            @lang('modules.invoices.appliedCredits'):</th>
                        <td>
                            {{ currency_formatter($invoice->appliedCredits(), '') }}
                        </td>
                    </tr>
                @endif
                <tr>
                    <th>@lang('modules.invoices.total') @lang('modules.invoices.paid'):</th>
                    <td> {{ currency_formatter($invoice->getPaidAmount(), '') }}</td>
                </tr>
                <tr>
                    <th class="text-white">@lang('modules.invoices.total') @lang('modules.invoices.due'):</th>
                    <td class="text-white"> {{ currency_formatter($invoice->amountDue(), '') }}</td>
                </tr>
            </table>

            <div class="clearfix"></div>

        </section>

        <section id="invoice-info">
            <div>
                <span>@lang('modules.invoices.invoiceDate'):</span>
                <span>{{ $invoice->issue_date->format(global_setting()->date_format) }}</span>
            </div>
            @if (empty($invoice->order_id) && $invoice->status === 'unpaid' && $invoice->due_date->year > 1)
                <div>
                    <span>@lang('app.dueDate'):</span>
                    <span>{{ $invoice->due_date->format(global_setting()->date_format) }}</span>
                </div>
            @endif
            <div>
                <span>@lang('app.status'):</span> <span>{{ mb_ucwords($invoice->status) }}</span>
            </div>
            @if ($creditNote)
                <div>
                    <span>@lang('app.credit-note'):</span> <span>{{ $creditNote->cn_number }}</span>
                </div>
            @endif

        </section>

        <section id="terms">

            <div class="notes word-break">
                @if (!is_null($invoice->note))
                    <br>@lang('app.note') <br>{!! nl2br($invoice->note) !!}
                @endif
                @if ($invoice->status == 'unpaid')
                    <br><br>@lang('modules.invoiceSettings.invoiceTerms') <br>{!! nl2br($invoiceSetting->invoice_terms) !!}
                @endif
            </div>

        </section>

        @if (isset($taxes) && invoice_setting()->tax_calculation_msg == 1)
            <section id="calculate_tax">
                <p class="text-dark-grey calculate_tax">
                    @if ($invoice->calculate_tax == 'after_discount')
                        @lang('messages.calculateTaxAfterDiscount')
                    @else
                        @lang('messages.calculateTaxBeforeDiscount')
                    @endif
                </p>
            </section>
        @endif

        @if (count($payments) > 0)
            <div class="page_break"></div>
            <div class="clearfix"></div>
            <div class="invoice-body b-all m-t-20 m-b-20">

                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="box-title m-t-20 text-center h3-border">@lang('app.menu.payments')</h3>
                        <div class="table-responsive m-t-40" id="itemsPayment" style="clear: both;">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">@lang('modules.payments.amount')</th>
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
                                                {{ number_format((float) $payment->amount, 2, '.', '') }}
                                                {!! $invoice->currency->currency_code !!}</td>
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

    </div>
</body>

</html>
