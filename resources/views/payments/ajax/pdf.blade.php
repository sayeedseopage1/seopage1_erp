<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@lang('app.menu.payments')</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">

    <style>
        body {
            margin: 0;
            font-family: Verdana, Arial, Helvetica, sans-serif;
        }

        .bg-grey {
            background-color: #F2F4F7;
        }

        .bg-white {
            background-color: #fff;
        }

        .border-radius-25 {
            border-radius: 0.25rem;
        }

        .p-25 {
            padding: 1.25rem;
        }

        .f-13 {
            font-size: 13px;
        }

        .f-14 {
            font-size: 14px;
        }

        .f-15 {
            font-size: 15px;
        }

        .f-21 {
            font-size: 21px;
        }

        .text-black {
            color: #28313c;
        }

        .text-grey {
            color: #616e80;
        }

        .font-weight-700 {
            font-weight: 700;
        }

        .text-uppercase {
            text-transform: uppercase;
        }

        .text-capitalize {
            text-transform: capitalize;
        }

        .line-height {
            line-height: 24px;
        }

        .mt-1 {
            margin-top: 1rem;
        }

        .mb-0 {
            margin-bottom: 0px;
        }

        .b-collapse {
            border-collapse: collapse;
        }

        .heading-table-left {
            padding: 6px;
            border: 1px solid #DBDBDB;
            font-weight: bold;
            background-color: #f1f1f3;
            border-right: 0;
        }

        .heading-table-right {
            padding: 6px;
            border: 1px solid #DBDBDB;
            border-left: 0;
        }

        .unpaid {
            color: #000000;
            border: 1px solid #000000;
            position: relative;
            padding: 11px 22px;
            font-size: 15px;
            border-radius: 0.25rem;
            width: 120px;
            text-align: center;
            margin-top: 50px;
        }

        .main-table-heading {
            border: 1px solid #DBDBDB;
            background-color: #f1f1f3;
            font-weight: 700;
        }

        .main-table-heading td {
            padding: 11px 10px;
            border: 1px solid #DBDBDB;
        }

        .main-table-items td {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
        }

        .total-box {
            border: 1px solid #e7e9eb;
            padding: 0px;
            border-bottom: 0px;
        }

        .subtotal {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            border-left: 0;
        }

        .subtotal-amt {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            border-right: 0;
        }

        .total {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            font-weight: 700;
            border-left: 0;
        }

        .total-amt {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            border-right: 0;
            font-weight: 700;
        }

        .balance {
            font-size: 16px;
            font-weight: bold;
            background-color: #f1f1f3;
        }

        .balance-left {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            border-left: 0;
        }

        .balance-right {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
            border-top: 0;
            border-right: 0;
        }

        .centered {
            margin: 0 auto;
        }

        .rightaligned {
            margin-right: 0;
            margin-left: auto;
        }

        .leftaligned {
            margin-left: 0;
            margin-right: auto;
        }

        .page_break {
            page-break-before: always;
        }

        #logo {
            height: 33px;
        }

        .word-break {
            max-width:175px;
            word-wrap:break-word;
        }

        .summary {
            padding: 11px 10px;
            border: 1px solid #e7e9eb;
        }

        .text-center {
            text-align: center;
        }


    </style>
</head>

<body class="content-wrapper">
    <h3 class="text-center">@lang('app.payment') @lang('app.receipt')</h3>
    <table class="bg-white" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tbody>
            <!-- Table Row Start -->
            <tr>
                <td>
                    <p class="line-height mt-1 mb-0 f-14 text-black">
                        {{ mb_ucwords(global_setting()->company_name) }}<br>
                        @if (!is_null($settings) && $payment->invoice && $payment->invoice->address)
                            {!! nl2br($payment->invoice->address->address) !!}<br>
                        @else
                            {!! nl2br(default_address()->address) !!}
                        @endif
                    </p>
                </td>
            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->
            <tr>
                <td height="10"></td>
            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->
            <tr>
                <td colspan="2">
                    @if (!is_null($payment->project))
                        @php
                            $client = $payment->project->client;
                        @endphp
                    @elseif(!is_null($payment->invoice_id) && !is_null($payment->invoice->clientDetails))
                        @php
                            $client = $payment->invoice->client;
                        @endphp
                    @endif
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            @if (isset($client))
                            <td class="f-14 text-black">

                                <p class="line-height mb-0">
                                    <span
                                        class="text-grey text-capitalize">@lang("modules.invoices.billedTo")</span><br>
                                    {{ ucfirst($client->name) }}<br>
                                    {{ mb_ucwords($client->clientDetails->company_name) }}<br>
                                    {!! nl2br($client->clientDetails->address) !!}
                                </p>
                            </td>
                            @endif
                            <td align="right">
                                <br />
                                <div class="text-uppercase bg-white unpaid rightaligned">
                                    @lang('app.'.$payment->status)
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>

    <table class="f-14 b-collapse" width="100%">
        <tr>
            <td height="20"></td>
        </tr>
        <tr class="main-table-items">
            <td class="text-grey">@lang("app.amount")</td>
            <td >{{ currency_formatter($payment->amount, '') }} {{ ($payment->currency ? $payment->currency->currency_code : global_setting()->currency->currency_code) }}</td>
        </tr>
        <tr class="main-table-items">
            <td class="text-grey">@lang("modules.invoices.paymentMethod")</td>
            <td >
                @php
                    $method = '--';

                    if(!is_null($payment->offline_method_id)) {
                        $method = $payment->offlineMethod->name;
                    }
                    elseif(isset($payment->gateway)){
                        $method = $payment->gateway;
                    }
                @endphp

                {{ $method }}
            </td>
        </tr>
        <tr class="main-table-items">
            <td class="text-grey">@lang("app.transactionId")</td>
            <td >
                {{ $payment->transaction_id ?? '--' }}
            </td>
        </tr>
        <tr class="main-table-items">
            <td class="text-grey">@lang("modules.invoices.paidOn")</td>
            <td > {{ $payment->paid_on ? $payment->paid_on->format(global_setting()->date_format) : '--' }} </td>
        </tr>
        @if (!is_null($payment->order_id))
            <tr class="main-table-items">
                <td class="text-grey">@lang("app.order")</td>
                <td > {{ $payment->order->order_number }} </td>
            </tr>
        @endif
        @if (!is_null($payment->invoice_id))
            <tr class="main-table-items">
                <td class="text-grey">@lang("app.invoice")</td>
                <td > {{ $payment->invoice->invoice_number }} </td>
            </tr>
        @endif
    </table>

</body>

</html>
