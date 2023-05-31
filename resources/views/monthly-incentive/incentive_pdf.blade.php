<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Template CSS -->
    <!-- <link type="text/css" rel="stylesheet" media="all" href="css/main.css"> -->

    <title>@lang('Agreement NO') - #FFFFFFFFFFFFFFFF</title>
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
            font-size: 12px;
        }

        .f-14 {
            font-size: 11px;
        }

        .f-15 {
            font-size: 12px;
        }

        .f-21 {
            font-size: 14px;
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
            position: relative;
            padding: 11px 22px;
            font-size: 15px;
            border-radius: 0.25rem;
            width: 100px;
            text-align: center;
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

        .logo {
            height: 33px;
        }

        .styled-table {
            border-collapse: collapse;
            margin: 20px 0;
			/*font-size: 0.4em;*/
            font-family: Verdana, Arial, Helvetica, sans-serif;
            width: 100%;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
        }
    </style>
</head>
<?php
//$deliverables = App\Models\ProjectDeliverable::where('project_id', $project->id)->get();

?>

<body class="content-wrapper">
    <table class="bg-white" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tbody>
            <!-- Table Row Start -->
            <tr>
                <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                        class="logo" style="height:70px;" /></td>
            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->
            <tr>
                <td>
                    <p class="line-height mt-1 mb-0 f-14 text-black">
                        {{ mb_ucwords(global_setting()->company_name) }}<br>

                        {!! nl2br(default_address()->address) !!}<br>
                        {{ global_setting()->company_phone }}


                    </p>
                </td>
                
            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->

            <!-- Table Row End -->
            <!-- Table Row Start -->
            <tr>
                <td colspan="2">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td class="f-14 text-black">

                                <p class="line-height mb-0">
                                    <span class="text-grey text-capitalize">@lang('app.employee')</span><br>
                                    {{$data->user->name}}<br>
                                    {{$data->user->email}}<br>
                                    {{$data->user->getRole->name}}
                                </p>

                            </td>


                        </tr>
                    </table>
                </td>


            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->

            <!-- Table Row End -->

        </tbody>
    </table>

    <div>
        <h5 class="text-grey text-capitalize">@lang('app.subject')</h5>
        <p class="f-15 text-black text-capitalize">Project Disbursment</p>

        <h5>@lang('Project Deliverables')</h5>


        <table class="styled-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Earned Point</th>
                    <th>Deduction Point</th>
                    <th>Earned Incentive</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                	<td>#</td>
                    <td>Monthly Incentive</td>
                    <td>{{ $data['point_earned'] }}</td>
                    <td>{{ $data['deduction_amount'] }}</td>
                    <td>{{ $data['incentive_earned'] }} BDT</td>
                </tr>
                <!-- and so on... -->
            </tbody>
        </table>


        <div class="row justify-content-between" style="display: flex; justify-content: space-between;">
            <div style="text-align: left;">
                <h3 class="name">@lang('Top Managment')</h3>

                <br><br><br><br>
                <p>Rajat Chakraboty</p>
                <p>Date: {{\Carbon\Carbon::today()->format('Y-m-d')}}</p>
            </div>
            <div style="float: right;">
                <h3 class="name">@lang('HR Department')</h3>
                <br><br><br><br>

                <p>Hasan Hafizul Islam</p>
                <p>Date: {{\Carbon\Carbon::today()->format('Y-m-d')}}</p>
            </div>
        </div>
    </div>
</body>
</html>
