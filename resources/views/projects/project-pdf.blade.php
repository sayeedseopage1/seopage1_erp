<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Template CSS -->
    <!-- <link type="text/css" rel="stylesheet" media="all" href="css/main.css"> -->

    <title>@lang('Agreement NO') - #{{ $project->project_short_code }}</title>
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

        .intro-table {
          display: flex;
          justify-content: space-between;
          margin: 3rem 0 3rem 0;
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
        }

        .intro-form {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #000000;
          width: 50%;
        }

        .intro-form:last-child {
          border-right: none;
        }

        .intro-table-title {
          font-size: 0.625rem;
          margin: 0;
        }

        .intro-form-item {
          padding: 1.25rem 1.5rem 1.25rem 1.5rem;
        }

        .intro-form-item:first-child {
          padding-left: 0;
        }

        .intro-form-item:last-child {
          padding-right: 0;
        }

        .intro-form-item-border {
          padding: 1.25rem 0 0.75rem 1.5rem;
          border-bottom: 1px solid #000000;
        }

        .intro-form-item-border:last-child {
          border-bottom: none;
        }

        .form {
          display: flex;
          flex-direction: column;
          margin-top: 6rem;
        }

        .no-border {
          border: none;
        }

        .border {
          border: 1px solid #000000;
        }

        .border-bottom {
          border: 1px solid #000000;
          border-top: none;
          border-left: none;
          border-right: none;
        }

        .signer {
          display: flex;
          justify-content: space-between;
          gap: 2.5rem;
          margin: 2rem 0 2rem 0;
        }

        .signer-item {
          flex-grow: 1;
        }

        input {
          color: #4537de;
          font-family: "Space Mono", monospace;
          text-align: center;
          margin-top: 1.5rem;
          height: 4rem;
          width: 100%;
          box-sizing: border-box;
        }

        input#date,
        input#notes {
          text-align: left;
        }

        input#signature {
          height: 8rem;
        }

        .intro-text {
          width: 60%;
        }

        .table-box table,
        .summary-box table {
          width: 100%;
          font-size: 0.625rem;
        }

        .table-box table {
          padding-top: 2rem;
        }

        .table-box td:first-child,
        .summary-box td:first-child {
          width: 50%;
        }

        .table-box td:last-child,
        .summary-box td:last-child {
          text-align: right;
        }

        .table-box table tr.heading td {
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
          height: 1.5rem;
        }

        .table-box table tr.item td,
        .summary-box table tr.item td {
          border-bottom: 1px solid #d7dce4;
          height: 1.5rem;
        }

        .summary-box table tr.no-border-item td {
          border-bottom: none;
          height: 1.5rem;
        }

        .summary-box table tr.total td {
          border-top: 1px solid #000000;
          border-bottom: 1px solid #000000;
          height: 1.5rem;
        }

        .summary-box table tr.item td:first-child,
        .summary-box table tr.total td:first-child {
          border: none;
          height: 1.5rem;
        }

        #pspdfkit-footer {
          font-size: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          color: #717885;
          margin-top: 2.5rem;
          bottom: 2.5rem;
          position: absolute;
          width: 100%;
        }

        .footer-columns {
          display: flex;
          justify-content: space-between;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }


    </style>
</head>

<body class="content-wrapper">
    <table class="bg-white" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
        <tbody>
            <!-- Table Row Start -->
            <tr>
                <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                        class="logo" /></td>
                <td align="right" class="f-21 text-black font-weight-700 text-uppercase">@lang('Project Agreement')</td>
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
                <td>
                    <table class="text-black mt-1 f-13 b-collapse rightaligned">
                        <tr>
                            <td class="heading-table-left">@lang('Project ID')</td>
                            <td class="heading-table-right">#{{ $project->project_short_code }}</td>
                        </tr>
                        <tr>
                            <td class="heading-table-left">@lang('Project Name')</td>
                            <td class="heading-table-right text-capitalize">{{ $project->project_name }}
                            </td>
                        </tr>

                        <tr>
                            <td class="heading-table-left">@lang('Project Type')</td>
                            <td class="heading-table-right">{{ $project->project_type->category_name }}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td colspan="2">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td class="f-14 text-black">

                                <p class="line-height mb-0">
                                    <span class="text-grey text-capitalize">@lang("app.client")</span><br>
                                    {{ mb_ucwords($project->client->name) }}<br>
                                      {{ mb_ucwords($project->client->email) }}<br>
                                    {{ mb_ucwords($project->client->clientDetails->company_name) }}
                                    {!! nl2br($project->client->clientDetails->address) !!}
                                </p>

                            </td>


                        </tr>
                    </table>
                </td>


            </tr>
            <!-- Table Row End -->
            <!-- Table Row Start -->


        </tbody>
    </table>

    <div>

        <p class="f-15 text-black">Scope of Work: Rajat Chakraborty (Seopage1.net) agrees to perform (Website Design Development) and
          related services specified on this Agreement ("Project Deliverables").</p>
        <h5 class="text-grey text-capitalize">@lang('app.subject')</h5>
        <p class="f-15 text-black text-capitalize">Agreement for Project: {{ $project->project_name }}</p>

        <h5>@lang('Project Deliverables')</h5>

        <div class="table-box">
         <table cellpadding="0" cellspacing="0">
           <tbody>
             <tr class="heading">

               <td>Deliverable</td>
               <td>Description</td>
               <td>From</td>
               <td>To</td>
             </tr>

             <tr class="item">
            
               <td>Header And Footer Design</td>
               <td>Need Also the Content</td>
               <td>12-11-22</td>
               <td>12-11-22</td>
             </tr>

             <tr class="item">
            
               <td>Header And Footer Design</td>
               <td>Need Also the Content</td>
               <td>12-11-22</td>
               <td>12-11-22</td>
             </tr>

             <tr class="item">
            
               <td>Header And Footer Design</td>
               <td>Need Also the Content</td>
               <td>12-11-22</td>
               <td>12-11-22</td>
             </tr>

             <tr class="item">
            
               <td>Header And Footer Design</td>
               <td>Need Also the Content</td>
               <td>12-11-22</td>
               <td>12-11-22</td>
             </tr>


           </tbody>
         </table>
       </div>




        @if ($project->project_budget != 0)
            <div class="text-right pt-3 border-top">
                <h4>@lang('Project Budget'):
                    {{$project->deal->actual_amount}}({{$project->deal->original_currency->currency_code}})</h4>
            </div>
        @endif

       @if ($project->signature)
            <div style="text-align: left; margin-top: 10px;">
                <h2 class="name" style="margin-bottom: 20px;">@lang('app.signature')</h2>
                {!! Html::image($project->signature->signature, '', ['class' => '', 'height' => '75px']) !!}
                <p>({{ $project->signature->full_name }})</p>
                <p>Date: {{ ($project->signature->created_at)->format('d-m-Y') }}</p>
            </div>
        @endif
    </div>

</body>

</html>
