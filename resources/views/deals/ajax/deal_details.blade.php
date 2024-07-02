@extends('layouts.app')



@section('filter-section')
@endsection

@php
    $addContractPermission = user()->permission('add_contract');
    $manageContractTemplatePermission = user()->permission('manage_contract_template');

@endphp

@section('content')
    @push('styles')
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">



        <style>
            /**
                                                                                        * FilePond Custom Styles
                                                                                        */
            .uploadFile {
                width: 30%;
                border: none;
                color: #4D9AF8;
                font-size: 18px;
                line-height: 23px;
                overflow: hidden;
                padding: 2px 10px 4px 10px;
                position: relative;
                resize: none;
                background: transparent;
            }

            .uploadFile input[type="file"] {
                cursor: pointer !important;
                display: block;
                font-size: 999px;
                filter: alpha(opacity=0);
                min-height: 100%;
                min-width: 100%;
                opacity: 0;
                position: absolute;
                right: 0px;
                text-align: right;
                top: 0px;
                z-index: 1;
            }



            /* Custom input file   */

            .sp1custom_files {
                width: 62%;
                display: flex;
                float: left;
                justify-content: flex-end;
                align-items: center;
            }

            .sp1custom_files i {
                color: #1D82F5;
                font-size: 18px;
                cursor: pointer;
            }

            #files-area {
                width: 100%;
                margin: 0 auto;
            }

            .file-block {
                border-radius: 10px;
                background-color: rgba(144, 163, 203, 0.2);
                margin: 5px;
                color: initial;
                display: inline-flex;

            }

            .file-block span.name {
                padding-right: 10px;
                width: fit-content;
                display: flex;
                font-size: 13px;
                align-items: center;
            }

            .file-delete {
                display: flex;
                width: 25px;
                background-color: transparent;
                font-size: 20px;
                justify-content: center;
                margin-right: 3px;
                cursor: pointer;
                font-weight: 600;
                color: #1D89F6;
            }

            .file-delete:hover {
                background-color: rgba(144, 163, 203, 0.2);
                border-radius: 10px;
            }

            .file-delete span {
                transform: rotate(45deg);
            }

            .custom_container {}

            .seopage_card {
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
                padding: 5%;
                margin: 5% auto;
                display: block;
                border-radius: 30px;
            }

            .details-seopage1 {
                width: 100%;
                height: auto;
                padding: 5px;
                background: #F3F9FE;
                border-radius: 5px;
            }

            .info_dets h5 {
                font-family: Poppins;
                font-size: 22px;
                font-weight: normal;
                line-height: 1.48;
                text-align: left;
                color: #41b4e1;
            }

            .info_dets h6 {
                font-family: Poppins;
                font-size: 13px;
                font-weight: 600;
                line-height: 1.48;
                color: #333;
            }

            .info_dets a {
                padding: 3px 14px;
                font-size: 12px;
                font-weight: 500;
            }

            .details-seopage1 h4 {
                font-family: Poppins;
                font-size: 22px;
                font-weight: normal;
                line-height: 1.48;
                text-align: left;
                color: #41b4e1;
            }

            .details-seopage1 p {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #6a6a6a;
                margin: 5px 0;
            }

            #textcopyseopage1 a {
                font-size: 16px;
                font-weight: normal;
                line-height: 1.5;
                text-align: left;
                color: #41b4e1;
                text-decoration: none;
            }

            .details-seopage1 p span {
                font-weight: 500;
                color: #333;
            }

            .deal {
                background: #eee;
                padding: 4%;
                color: #888;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                clip-path: polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%);
                justify-content: center;
                align-content: center;
                flex-direction: row;
            }

            .deal i {
                padding-right: 6px;
                font-size: 15px;
            }

            .custom-active {
                background: #119143;
                color: #fff;
            }

            .col-12 .col-sm-2 nopadding {
                padding: 10px 0;
                text-align: center;
                font-family: Poppins;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.56;
                letter-spacing: normal;
                color: #1d82f5;
            }

            h3 {
                padding: 10px 0;
                text-align: center;
                font-family: Poppins;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.56;
                letter-spacing: normal;
                color: #1d82f5;

            }

            .col-12 .col-sm-2 nopadding {
                padding: 3px !important;
                margin: 0 !important;
                /* width: 16%; */
            }

            /* deal_item  */

            .seodeals_item {
                padding: 0 14px;
            }

            .deal_item {
                width: 100%;
                border-radius: 10px;
                background-color: #F3F9FF;
                padding: 26px 0;
                display: flex;
                justify-content: space-around;
                flex-wrap: nowrap;
                flex-direction: column;
                align-content: center;
                padding-left: 20px;
                box-shadow: 0 20px 40px 0 rgba(235, 235, 235, 0.16);
                height: 100%;
            }

            .deal_item i {
                width: 22px;
                height: auto;
            }

            .deal_item h3,
            .deal_item2 h3 {
                margin: 8px 0 0 5px;
                font-family: Poppins;
                font-size: 16px;
                font-weight: normal;
                line-height: 1.48;
                color: #1d82f5;
            }

            .deal_item span {
                margin: 12px 0 0;
                font-family: Poppins;
                font-size: 12px;
                font-weight: normal;
                line-height: 1.5;
                color: #6a6a6a;
            }

            .deal_item2 {
                width: 100%;
                min-height: 150px;
                padding: 0px 0;
                border-radius: 10px;
                background-color: #F3F9FF;
                height: 100%;
            }



            .deal_item2 a {
                font-family: Poppins;
                font-size: 14px;
                font-weight: normal;
                line-height: 1.5;
                color: #fff;
            }

            .wons {
                margin: 0 13px 0 0;
                padding: 8px 27px 7px;
                border-radius: 5px;
                background-color: #119143;
            }

            .loss {
                margin: 0 13px 0 0;
                padding: 8px 27px 7px;
                border-radius: 5px;
                background-color: #d30000;
            }

            .sbinfo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                align-content: space-between;
            }

            .sbinfo ul {
                margin: 0;
                padding: 0;
                display: flex;
                align-content: flex-start;
                justify-content: space-between;
                width: 100%;
            }


            .sbinfo ul li {
                list-style: none;
                font-family: Poppins;
                font-size: 11px;
                font-weight: 300;
                font-style: normal;
                line-height: 1.6;
                color: #1d82f5;
                display: flex;
                justify-content: space-between;
                align-items: stretch;
                padding-right: 5px;
            }


            /* .sbinfo ul li:nth-child(2) {
                                                                                                padding-right: 0px;
                                                                                                padding-left: 5px;
                                                                                                width: 60px;
                                                                                            }
                                                                                            .sbinfo ul li:nth-child(3) {
                                                                                                padding-right: 0px;
                                                                                                padding-left: 5px;
                                                                                                width: 60px;
                                                                                            } */

            .custom_scroling_seo {
                width: 100%;
                max-height: 270px;
                overflow: auto;
            }

            /* ===== Scrollbar CSS ===== */
            /* Firefox */
            .custom_scroling_seo {
                scrollbar-width: auto;
                scrollbar-color: #1D82F5 #ffffff;
            }

            /* Chrome, Edge, and Safari */
            .custom_scroling_seo::-webkit-scrollbar {
                width: 12px;
            }

            .custom_scroling_seo::-webkit-scrollbar-track {
                background: #ffffff;
            }

            .custom_scroling_seo::-webkit-scrollbar-thumb {
                background-color: #1D82F5;
                border-radius: 10px;
                border: 3px solid #ffffff;
            }

            /* add comments  */

            .form-floating>label {
                font-size: 12px;
            }

            .form-floating textarea {
                border-radius: 10px;
            }

            .comment-add {
                border: 1px solid #eee;
                padding: 11px;
                border-radius: 7px;
                background: #F3F9FE;
                width: 90%;
                margin: 0 auto;
            }

            .comments-section .comment_btn {
                padding: 4px 4px;
                color: #fff;
                letter-spacing: 1px;
                font-family: 'Poppins';
                font-weight: 400;
                float: right;
            }

            /* .comments-section .btn-default:hover {
                                                                                                background-color: #111;
                                                                                                color: #fff;
                                                                                            } */

            .comment_btn {
                display: inline-block;
                font-weight: 400;
                line-height: 1.5;
                color: #fff;
                text-align: center;
                text-decoration: none;
                vertical-align: middle;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
                background-color: #1D82F5;
                padding: .375rem .75rem;
                font-size: 10px;
                border-radius: .25rem;
                transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }


            /* input file  */


            .wrapper {
                padding: 0px;
                text-align: right;
            }

            .wrapper #file-input {
                display: none;
            }

            .wrapper label[for='file-input'] * {
                vertical-align: middle;
                cursor: pointer;
                font-size: 19px;
                color: #1D82F5;
            }

            .wrapper label[for='file-input'] span {
                margin-left: 10px
            }

            .wrapper i.remove {
                vertical-align: middle;
                margin-left: 5px;
                cursor: pointer;
                display: none;
            }

            .seopage1_attach {
                padding-bottom: 5px;
            }

            .seopage1_attach a {
                font-size: 9px;
                font-family: 'Poppins';
                margin-right: 5px;
            }

            svg.svg-inline--fa.fa-times-circle.fa-w-16.remove {
                display: none !important;
            }


            .sp1custom_files i {
                color: #1D82F5;
                font-size: 18px;
                cursor: pointer;
            }

            /* custom container */

            .custom_container {
                max-width: 1600px;
                /* max-width: 615px; */
                margin: 0 auto;
                display: block;
            }

            @media (min-width: 768px) and (max-width: 1024px) {
                .col-12 col-sm-2 nopadding {
                    padding: 0 !important;
                    margin: 0 !important;
                    width: 33%;
                }

                .comment-add {
                    width: 83%;
                }

                .sbinfo ul li {
                    font-size: 10px;
                    width: 100%;
                }

                .sbinfo ul li:nth-child(2) {
                    padding-right: 0px;
                    padding-left: 10px;
                    width: 100%;
                }

                .sbinfo ul li:nth-child(3) {
                    padding-right: 0px;
                    padding-left: 10px;
                    width: 100%;
                }

                .comments-section {
                    margin-bottom: 30px;
                }

                .deal_item2 {
                    width: 100%;
                    min-height: 150px;
                    padding: 26px 0;
                    border-radius: 10px;
                    background-color: #F3F9FF;
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
            }

            @media (min-width: 320px) and (max-width: 767.98px) {
                .deal_item {
                    margin: 5px 0;
                }

                .deal_item2 {
                    margin: 5px 0;
                }

                .col-12 col-sm-2 nopadding {
                    padding: 3px !important;
                    margin: 0 !important;
                    width: 20%;
                }

                .comments-section {
                    margin-bottom: 30px;
                }

                .comment-add {
                    width: 91%;
                }

                .sbinfo ul li {
                    width: 50%;
                }

                .sbinfo ul li:nth-child(2) {
                    width: 95px;
                }

                .sbinfo ul li:nth-child(3) {
                    width: auto;
                }

                .sbinfo ul {
                    display: flex;
                    align-content: space-around;
                    height: 100%;
                    width: 100%;
                    justify-content: space-around;
                    align-items: center;
                }
            }


            .sp1custom_files i {
                color: #1D82F5;
                font-size: 18px;
                cursor: pointer;
            }



            /**
                                                                                        * File  Custom Styles
                                                                                        */

            .btn-file {
                position: relative;
                overflow: hidden;
            }

            .btn-file input[type=file] {
                position: absolute;
                top: 0;
                right: 0;
                min-width: 100%;
                min-height: 100%;
                font-size: 100px;
                text-align: right;
                filter: alpha(opacity=0);
                opacity: 0;
                outline: none;
                background: transparent;
                cursor: pointer;
                display: block;
            }

            .btn-file {
                position: relative;
                overflow: hidden;
                margin: -6px 0;
            }

            .fileList li {
                font-size: 12px;
                color: #6a6a6a;
                list-style-type: decimal;
                font-weight: normal;
                background: #eee;
                margin: 3px 0;
                border-radius: 5px;
                padding: 3px 7px;
                list-style-position: inside;
                text-align: left;
            }

            .removeFile {
                text-decoration: none;
                font-weight: 700;
                color: #ed5f5f !important;
                float: right;
            }

            ul.fileList {
                margin: 0;
                padding: 0;
                width: 100%;
            }

            .btn-file i:hover {
                background: #F3F9FE !important;
            }

            .sp1_deal-stage-wrapper {
                height: fit-content;
                position: relative;
            }

            .sp1_deal-stage-wrapper>h3:hover {
                cursor: default
            }

            .sp1_deal-stage-content {
                width: 450px;
                display: none;
                background: #fff;
                box-shadow: 0 10px 20px rgb(0 0 0 / 25%);
                padding: 10px;
                border-radius: 6px;
                z-index: 1;
                max-height: 350px;
                overflow-y: auto
            }

            .sp1_deal-stage-content>p {
                margin-bottom: 4px;
            }

            @media screen and (max-width:720px) {
                ..sp1_deal-stage-content {
                    width: 100%;
                    max-width: 100%;
                }
            }

            .sp1_deal-stage-wrapper:hover>.sp1_deal-stage-content {
                display: block;
            }
        </style>
    @endpush


    <?php

    $currency = App\Models\Currency::where('id', $deal->original_currency_id)->first();
    $lead_converted_date = $deal->created_at->diffForHumans();
    $dealStage = App\Models\DealStage::where('id', $deal->id)->first();
    // dd($dealStage);
    //$value= $deal->actual_amount. $currency->currency_symbol;
    //  $bid_value= $deal->bid_value. $currency->currency_symbol;
    if ($deal->lead_id) 
        $salesDeal = App\Models\Deal::where('lead_id', $deal->lead_id)->first();
    ?>
    <section class="seodeals py-5">
        <div class="custom_container">
            <div class="row">
                <div class="col-md-4">
                    <div class="deal_item">
                        @if ($deal->client_name == null)
                            <h3><i class="fa-solid fa-user-large"></i> Client Username:
                                <span>{{ $deal->client_username }}</span>
                            </h3>
                        @else
                            <h3><i class="fa-solid fa-user-large"></i> Client Name: <span>{{ $deal->client_name }}</span>
                            </h3>
                        @endif
                        <h3><i class="fa-solid fa-money-bill-transfer"></i> Converted On:
                            <span>{{ $deal->created_at->format('d M, Y') }}</span>
                            <span>({{ $deal->created_at->format('h : i A') }})</span>
                        </h3>
                        @if ($deal->won_lost == null)
                            <h3><i class="fa-solid fa-hands-bubbles"></i> Deal Won/Lost: <span>N\A</span> </h3>
                        @else
                            <h3><i class="fa-solid fa-hands-bubbles"></i> Deal Won/Lost:
                                <span>{{ $deal->updated_at->format('d M, Y') }}</span>
                                <span>({{ $deal->updated_at->format('h : i A') }})</span>
                            </h3>
                        @endif
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="deal_item">
                        <h3><i class="fa-solid fa-list-check"></i> Project Name: <span>{{ $deal->project_name }}</span>
                        </h3>
                        <h3><i class="fa-solid fa-sack-dollar"></i> Project Budget:
                            <span>{{ $currency->currency_symbol }}{{ $deal->actual_amount }}</span>
                        </h3>
                        {{-- <h3><i class="fa-solid fa-medal"></i> Skills: <span>PHP, Laravel, MySQL, Git, React.js</span></h3> --}}
                    </div>
                </div>

                <div class="col-md-4 text-center">
                    <div class="deal_item ">
                        <h3>Deal Status</h3><br>
                        @if (isset($salesDeal))
                            <input type="hidden" value="{{ $salesDeal->id }}">
                            @if ($salesDeal->sale_analysis_status == 'analysis')
                                @if (auth()->user()->role_id == 1)
                                    <div class="text-center">
                                        <h2 style="color:rgb(62, 146, 214);">In Analysis</h2>
                                    </div>
                                    <div class="sp1_deal-stage-wrapper">
                                        <h2 style="color:rgb(62, 146, 214);"><a class="btn btn-info"
                                                href="{{ route('contracts.show', [$salesDeal->id, 'tab' => 'sales-analysis-report']) }}">Analysis
                                                Page</a></h2>
                                    </div>
                                @else
                                    <div class="text-center">
                                        <h2 style="color:rgb(62, 146, 214);">In Analysis</h2>
                                    </div>
                                    <div class="sp1_deal-stage-wrapper">
                                        <h2 style="color:rgb(62, 146, 214);">
                                            <a class="btn btn-info" href="{{ route('edit-deal-details', $salesDeal->id) }}">
                                                Update Deal Details
                                            </a>
                                        </h2>
                                    </div>
                                @endif
                            @elseif (in_array($salesDeal->sale_analysis_status, ['authorized', 'auto-authorized']))

                                @if($salesDeal->released_at)
                                    <div class="text-center">
                                        <h2 style="color:green;">Won</h2>
                                    </div>
                                @else
                                    <div class="sp1_deal-stage-wrapper">
                                        <h2 style="color:rgb(62, 146, 214);">
                                            <a class="btn btn-info" href="{{ route('edit-deal-details', $salesDeal->id) }}">
                                                Update Deal Details
                                            </a>
                                        </h2>
                                    </div>
                                @endif

                            @elseif($salesDeal->sale_analysis_status == 'previous-won')
                                <div class="text-center">
                                    <h2 style="color:green;">Previous Won</h2>
                                </div>
                            @elseif($salesDeal->sale_analysis_status == 'previous-denied')
                                <div class="text-center">
                                    <h2 style="color:red;">Previous Lost</h2>
                                </div>
                            @elseif ($salesDeal->sale_analysis_status == 'denied')
                                <div class="text-center">
                                    <h2 style="color:red;">Denied</h2>
                                </div>
                            @elseif ($salesDeal->client_name)
                                <div class="text-center text-warning">
                                    <h2>Pending</h2>
                                </div>
                                <div class="sp1_deal-stage-wrapper">
                                    <h2 style="color:rgb(62, 146, 214);">
                                        <a class="btn btn-info"
                                            href="{{ route('account.sale-risk-policies.risk-analysis', $salesDeal->id) }}">
                                            Complete Sales Risk Form
                                        </a>
                                    </h2>
                                </div>
                            @endif
                        @elseif ($deal->won_lost == null)
                            @if ($deal->deal_stage == 5)
                                <div class="row mx-auto">
                                    {{-- @if ($deal->authorization_status == 0)
                            <button class="btn btn-success wons w-40 send_authorization">Request for Authorization</button> --}}
                                    {{-- @elseif($deal->authorization_status == 2)
                            <button  disabled  data-bs-whatever="@mdo" class="btn btn-warning wons w-40 disabled">Awaiting for approval</button>

                            @else --}}

                                    @if (Auth::user()->role_id == 4)
                                        <div class="sp1_deal-stage-wrapper">
                                            <a href="#" data-bs-toggle="modal"
                                                data-bs-target="#clientDealaddStageModal" data-bs-whatever="@mdo"
                                                class="btn btn-success wons w-40" onclick="event.preventDefault()">Won
                                                The
                                                Deal</a>
                                            <div class="sp1_deal-stage-content text-left">
                                                <p>If the deal was won during your shift (When you were on duty), then
                                                    click
                                                    on it and complete the next processes.</p>
                                            </div>
                                        </div>
                                    @else
                                        {{-- WHEN DEGITAL MERKITING IS TRUE  --}}
                                        @if ($dealStage->convert_ld_status == 'DM')
                                            <div class="sp1_deal-stage-wrapper">
                                                <a href="#" data-toggle="dealModal"
                                                    data-target="#dm-dealaddstagemodal"
                                                    class="btn btn-success wons deal-modal-toggle w-40"
                                                    onclick="event.preventDefault()">Won The Deal</a>
                                                <div class="sp1_deal-stage-content text-left">
                                                    <p>If the deal was won during your shift (When you were on duty),
                                                        then
                                                        click on it and complete the next processes.</p>
                                                </div>
                                            </div>
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#dm-lostmodal"
                                                data-bs-whatever="@mdo" class="btn btn-danger loss w-40">Lost The
                                                Deal</a>
                                        @else
                                            <div class="sp1_deal-stage-wrapper">
                                                <a href="#" data-toggle="dealModal" data-target="#dealaddstagemodal"
                                                    class="btn btn-success wons deal-modal-toggle w-40"
                                                    onclick="event.preventDefault()">Won The Deal</a>
                                                <div class="sp1_deal-stage-content text-left">
                                                    <p>If the deal was won during your shift (When you were on duty),
                                                        then
                                                        click on it and complete the next processes.</p>
                                                </div>
                                            </div>
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#lostmodal"
                                                data-bs-whatever="@mdo" class="btn btn-danger loss w-40">Lost The
                                                Deal</a>
                                        @endif
                                        {{-- WHEN DEGITAL MERKITING IS TRUE  --}}
                                    @endif
                                    {{-- @endif --}}

                                </div>

                                @include('contracts.modals.client_dealaddstagemodal')
                                @include('contracts.modals.dealaddstagemodal')
                                @include('contracts.modals.deallostmodal')
                                @include('contracts.modals.dm-dealaddstagemodal')
                                @include('contracts.modals.dm-deallostmodal')
                            @else
                                N\A
                            @endif
                        @else
                            @if ($deal->won_lost == 'Yes')
                                <div class="text-center">
                                    <h2 style="color:green;">Won</h2>
                                </div>
                            @else
                                <div class="text-center">
                                    <h2 style="color:red;">Lost</h2>
                                </div>
                            @endif
                        @endif
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section class="sp_steps">
        <div class="custom_container">
            <div class="rows">
                <!-- info  -->

                <div class="row seodeals_item pb-4">
                    <div class="col-12 col-sm-2 nopadding">
                        <div class="deal custom-active" data-bs-whatever="@mdo">
                            <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_date }}</span>
                        </div>
                        <div class="sp1_deal-stage-wrapper">
                            <h3>Contact Made</h3>
                            <div class="sp1_deal-stage-content">
                                <p>Write a bit about your bidding amount and deadline, so it’s easier for the closer to
                                    understand the background. Many clients start with this message “If your price final?”
                                    “Or, I am going to award now. Are you ready to start?”
                                </p>
                                <p>At that point, the closer has to analyze if the price was actually real or a placeholder
                                    by comparing the requirements and everything which consumes time. Here are some good
                                    examples of how you should enter details here,</p>
                                <p>“Here everything what the client wanted was specific, and I put a real price (500 USD)
                                    and deadline (10 days) for the work. Closer may still rethink these depending on various
                                    things.”
                                </p>
                                <p>Or “Here the project brief was generic, and I put a placeholder bid and timeframe to
                                    complete the bidding process.”
                                </p>
                            </div>
                        </div>

                        <div class="custom_scroling_seo">
                            <?php
                            $contact_mades = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 0)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>

                            @foreach ($contact_mades as $contact)
                                <div class="details-seopage1 mb-2">
                                    <p>{!! $contact->comments !!} </p>
                                    <?php
                                    $contactstr = $contact->attach;

                                    // Create Array Out of the String, The comma ',' is the delimiter
                                    // This would output
                                    //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                    $contactexplodedStr = explode(',', $contactstr);

                                    // Filter Array And Remove The empty element which in this case
                                    //    3 => ''
                                    $contactfilteredArray = $contactexplodedStr;
                                    //dd($filteredArray);
                                    ?>

                                    <div class="seopage1_attach">
                                        @foreach ($contactfilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }}</a>
                                            @endif
                                        @endforeach
                                    </div>

                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $contact->user->name }}</li>
                                            <li>{{ $contact->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $contact->created_at->format('h : i A') }}</li>

                                        </ul>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        @if ($deal->deal_stage == 0)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="0">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>
                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>

                                                    <!-- <div class="wrapper">
                                                                                                       <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                       <label for="file-input">

                                                                                                         <i class="fa fa-paperclip fa-2x"></i>
                                                                                                         <span></span>
                                                                                                       </label>

                                                                                                       <i class="fa fa-times-circle remove"></i>
                                                                                                       <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                     </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif

                    </div>

                    <!-- col-12 col-sm-2 nopadding  -->


                    <div class="col-12 col-sm-2 nopadding">
                        @if ($deal->deal_stage == 0)
                            <a class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2"
                                data-bs-whatever="@mdo">
                                <span> Click me to Change Stage</span>
                            </a>

                            @if ($deal->deal_stage == 0)
                                @include('contracts.modals.dealqualifymodal2')
                            @endif
                        @elseif($deal->deal_stage >= 1)
                            <?php

                            $lead_converted_to_qualified = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 1)
                                ->first();
                            $lead_converted_to_qual = $lead_converted_to_qualified->created_at->diffForHumans();

                            ?>
                            <div class="deal custom-active" data-bs-whatever="@mdo">
                                <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_to_qual }}</span>
                            </div>
                        @else
                            <div class="deal" data-bs-whatever="@mdo">
                                <span>Click me to Change Stage</span>
                            </div>
                        @endif

                        <div class="sp1_deal-stage-wrapper">
                            <h3>Qualified</h3>
                            <div class="sp1_deal-stage-content">
                                <article>
                                    <p>There are a few basic things based on which we qualify or disqualify a client. Write
                                        them down here briefly. For example: </p>
                                    <p>“The client requires the work in 2 hours hence he doesn't qualify.” </p>
                                    <p>Or, “the client is looking for a Laravel ecommerce site, and he is rigid about not
                                        switching to other platforms/CMS, and we don’t provide this service right now”</p>
                                    <p>Or, “The client is asking us to contact outside and his account was just opened
                                        today. Most probably this is fake hence not qualifying him”</p>
                                    <p>Or “The client is from the USA, and he really looks like to be requiring a WordPress
                                        website hence qualifying him” </p>
                                    <p>Or “The client is from an African country (Ghana) and the pricing seems to be very
                                        low hence not qualifying”.</p>
                                    <p>Be specific about why you qualified or disqualified him. This step is easy to
                                        complete like the examples I shared above just by exchanging 2–3 messages with the
                                        client after he contacts. If a client is disqualified, other steps shouldn’t be
                                        completed.</p>
                                </article>
                            </div>
                        </div>


                        <div class="custom_scroling_seo">
                            <?php
                            $qualified = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 1)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>
                            @foreach ($qualified as $qual)
                                <?php
                                $qualstr = $qual->attach;

                                // Create Array Out of the String, The comma ',' is the delimiter
                                // This would output
                                //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                $qualexplodedStr = explode(',', $qualstr);

                                // Filter Array And Remove The empty element which in this case
                                //    3 => ''
                                $qualfilteredArray = $qualexplodedStr;
                                //dd($filteredArray);
                                ?>


                                <div class="details-seopage1 mb-2">
                                    <p>{!! $qual->comments !!}</p>
                                    <div class="seopage1_attach">
                                        @foreach ($qualfilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }}</a>
                                            @endif
                                        @endforeach
                                    </div>
                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $qual->user->name }}</li>
                                            <li>{{ $qual->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $qual->created_at->format('h : i A') }}</li>

                                        </ul>
                                    </div>
                                </div>
                            @endforeach

                        </div>
                        @if ($deal->deal_stage == 1)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="1">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>
                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>

                                                    <!-- <div class="wrapper">
                                                                                                       <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                       <label for="file-input">

                                                                                                         <i class="fa fa-paperclip fa-2x"></i>
                                                                                                         <span></span>
                                                                                                       </label>

                                                                                                       <i class="fa fa-times-circle remove"></i>
                                                                                                       <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                     </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>

                    <!-- col-12 col-sm-2 nopadding  -->

                    <div class="col-12 col-sm-2 nopadding">
                        @if ($deal->deal_stage == 1)
                            <a class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2"
                                data-bs-whatever="@mdo">
                                Click me to Change Stage
                            </a>
                            @include('contracts.modals.dealqualifymodal2')
                        @elseif($deal->deal_stage >= 2)
                            <?php

                            $lead_converted_to_req_def = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 2)
                                ->first();
                            $lead_converted_to_req = $lead_converted_to_req_def->created_at->diffForHumans();

                            ?>
                            <div class="deal custom-active" data-bs-whatever="@mdo">
                                <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_to_req }}</span>
                            </div>
                        @else
                            <div class="deal" data-bs-whatever="@mdo">
                                <span>Click me to Change Stage</span>
                            </div>
                        @endif

                        <div class="sp1_deal-stage-wrapper">
                            <h3>Requirements Defined</h3>
                            <div class="sp1_deal-stage-content">
                                <p>Write down the requirements you discussed with the client and he agreed.</p>
                                <p>For Example, “As discussed, the client needs followings:</p>
                                <p>ABC <br /> ZYX”</p>
                            </div>
                        </div>

                        <div class="custom_scroling_seo">
                            <?php
                            $req_defined = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 2)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>
                            @foreach ($req_defined as $req_def)
                                <?php
                                $reqstr = $req_def->attach;

                                // Create Array Out of the String, The comma ',' is the delimiter
                                // This would output
                                //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                $reqexplodedStr = explode(',', $reqstr);

                                // Filter Array And Remove The empty element which in this case
                                //    3 => ''
                                $reqfilteredArray = $reqexplodedStr;
                                //dd($filteredArray);
                                ?>
                                <div class="details-seopage1 mb-2">
                                    <p>{!! $req_def->comments !!} </p>

                                    <div class="seopage1_attach">
                                        @foreach ($reqfilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }}</a>
                                            @endif
                                        @endforeach
                                    </div>

                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $req_def->user->name }}</li>
                                            <li>{{ $req_def->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $req_def->created_at->format('h : i A') }}</li>
                                        </ul>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        @if ($deal->deal_stage == 2)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="2">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>
                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="wrapper">
                                                                                                       <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                       <label for="file-input">

                                                                                                         <i class="fa fa-paperclip fa-2x"></i>
                                                                                                         <span></span>
                                                                                                       </label>

                                                                                                       <i class="fa fa-times-circle remove"></i>
                                                                                                       <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                     </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>

                    <!-- col-12 col-sm-2 nopadding  -->

                    <div class="col-12 col-sm-2 nopadding">
                        @if ($deal->deal_stage == 2)
                            <a class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2"
                                data-bs-whatever="@mdo">
                                Click me to Change Stage
                            </a>
                            @include('contracts.modals.dealqualifymodal2')
                        @elseif($deal->deal_stage >= 2)
                            <?php

                            $lead_converted_to_prop_def = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 3)
                                ->first();
                            $lead_converted_to_prop = $lead_converted_to_prop_def->created_at->diffForHumans();

                            ?>


                            <div class="deal custom-active" data-bs-whatever="@mdo">
                                <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_to_prop }}</span>
                            </div>
                        @else
                            <div class="deal" data-bs-whatever="@mdo">
                                <span>Click me to Change Stage</span>
                            </div>
                        @endif
                        <div class="sp1_deal-stage-wrapper">
                            <h3>Proposal Made</h3>
                            <div class="sp1_deal-stage-content">
                                <p>Put the defined requirements, the proposed price from us against it and the proposed
                                    timeframe from us.</p>
                                <p>For example ““As discussed, the client needs followings:</p>
                                <p>ABC <br> ZYX”</p>
                                <p>Proposed Price: 800 USD <br>
                                    Timeframe: 12 days”</p>
                            </div>
                        </div>

                        <div class="custom_scroling_seo">
                            <?php
                            $proposal_made = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 3)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>

                            @foreach ($proposal_made as $prop)
                                <div class="details-seopage1 mb-2">
                                    <p>{!! $prop->comments !!} </p>
                                    <?php
                                    $propstr = $prop->attach;

                                    // Create Array Out of the String, The comma ',' is the delimiter
                                    // This would output
                                    //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                    $propexplodedStr = explode(',', $propstr);

                                    // Filter Array And Remove The empty element which in this case
                                    //    3 => ''
                                    $propfilteredArray = $propexplodedStr;
                                    //dd($filteredArray);
                                    ?>

                                    <div class="seopage1_attach">
                                        @foreach ($propfilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }}</a>
                                            @endif
                                        @endforeach
                                    </div>

                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $prop->user->name }}</li>
                                            <li>{{ $prop->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $prop->created_at->format('h : i A') }}</li>
                                        </ul>
                                    </div>
                                </div>
                            @endforeach

                        </div>

                        @if ($deal->deal_stage == 3)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="3">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>
                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="wrapper">
                                                                                                       <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                       <label for="file-input">

                                                                                                         <i class="fa fa-paperclip fa-2x"></i>
                                                                                                         <span></span>
                                                                                                       </label>

                                                                                                       <i class="fa fa-times-circle remove"></i>
                                                                                                       <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                     </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif


                    </div>


                    <!-- col-12 col-sm-2 nopadding  -->


                    <div class="col-12 col-sm-2 nopadding">
                        @if ($deal->deal_stage == 3)
                            <a class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2"
                                data-bs-whatever="@mdo">
                                Click me to Change Stage
                            </a>
                            @include('contracts.modals.dealqualifymodal2')
                        @elseif($deal->deal_stage >= 3)
                            <?php

                            $lead_converted_to_neg_def = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 4)
                                ->first();
                            $lead_converted_to_neg = $lead_converted_to_neg_def->created_at->diffForHumans();

                            ?>


                            <div class="deal custom-active" data-bs-whatever="@mdo">
                                <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_to_neg }}</span>
                            </div>
                        @else
                            <div class="deal" data-bs-whatever="@mdo">
                                <span>Click me to Change Stage</span>
                            </div>
                        @endif
                        <div class="sp1_deal-stage-wrapper">
                            <h3>Negotiation Started</h3>
                            <div class="sp1_deal-stage-content">
                                <p>Here put the client's thoughts on the budget and timeframe.</p>
                                <p>For example, “Clients offered budget: 600 USD</p>
                                <p>Clients offered timeframe: 8 days”</p>
                                <p>If the client proposes price and timeframe 3 times, put them as 3 separate entries. Also,
                                    if you have to propose the price and timeframe 4 times as he is negotiating really hard,
                                    put them as separate entries. It will be easier for us to check how hard the negotiation
                                    step was for any deal</p>
                            </div>
                        </div>
                        <div class="custom_scroling_seo">
                            <?php
                            $negotiation_started = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 4)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>
                            @foreach ($negotiation_started as $neg)
                                <div class="details-seopage1 mb-2">
                                    <p>{!! $neg->comments !!}</p>
                                    <?php
                                    $negstr = $neg->attach;

                                    // Create Array Out of the String, The comma ',' is the delimiter
                                    // This would output
                                    //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                    $negexplodedStr = explode(',', $negstr);

                                    // Filter Array And Remove The empty element which in this case
                                    //    3 => ''
                                    $negfilteredArray = $negexplodedStr;
                                    //dd($filteredArray);
                                    ?>

                                    <div class="seopage1_attach">
                                        @foreach ($negfilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }} </a>
                                            @endif
                                        @endforeach
                                    </div>

                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $neg->user->name }}</li>
                                            <li>{{ $neg->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $neg->created_at->format('h : i A') }}</li>
                                        </ul>
                                    </div>
                                </div>
                            @endforeach

                        </div>
                        @if ($deal->deal_stage == 4)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="4">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>

                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>

                                                    <!-- <div class="wrapper">
                                                                                                       <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                       <label for="file-input">

                                                                                                         <i class="fa fa-paperclip fa-2x"></i>
                                                                                                         <span></span>
                                                                                                       </label>

                                                                                                       <i class="fa fa-times-circle remove"></i>
                                                                                                       <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                     </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif

                    </div>
                    <div class="col-12 col-sm-2 nopadding">
                        @if ($deal->deal_stage == 4)
                            <a class="deal" data-bs-toggle="modal" data-bs-target="#qualifymodal2"
                                data-bs-whatever="@mdo">
                                Click me to Change Stage
                            </a>
                            @include('contracts.modals.dealqualifymodal2')
                        @elseif($deal->deal_stage >= 4)
                            <?php

                            $lead_converted_to_mile_def = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 5)
                                ->first();
                            $lead_converted_to_mile = $lead_converted_to_mile_def->created_at->diffForHumans();

                            ?>


                            <div class="deal custom-active" data-bs-whatever="@mdo">
                                <i class="fa-solid fa-clock"></i> <span> {{ $lead_converted_to_mile }}</span>
                            </div>
                        @else
                            <div class="deal" data-bs-whatever="@mdo">
                                <span>Click me to Change Stage</span>
                            </div>
                        @endif
                        <div class="sp1_deal-stage-wrapper">
                            <h3>Milestone Breakdown</h3>
                            <div class="sp1_deal-stage-content">
                                <p>Share your proposed milestone breakdown here,</p>
                                <p>For example: “Milestone1: $200 (When the Home page mockup is done) <br>
                                    Milestone2: $180 (When Products with all categories page development is done) <br>
                                    Milestone3: $120 (When Blog page is done) <br>
                                    Milestone4: 100 (When FAQ, contact us page is done) <br>
                                    Milestone5: $50 (When everything is working perfectly and live)” </p>
                            </div>
                        </div>
                        <div class="custom_scroling_seo">
                            <?php
                            $milestone_breakdown = App\Models\DealStageChange::where('deal_id', $deal->short_code)
                                ->where('deal_stage_id', 5)
                                ->orderBy('id', 'desc')
                                ->get();
                            ?>
                            @foreach ($milestone_breakdown as $mile)
                                <div class="details-seopage1 mb-2">
                                    <p>{!! $mile->comments !!}</p>
                                    <?php
                                    $milestr = $mile->attach;

                                    // Create Array Out of the String, The comma ',' is the delimiter
                                    // This would output
                                    //       [ 1 => 1, 2 => 2, 3 => '', 4 => 4, 5 => 5, 6 => 6 ]
                                    $mileexplodedStr = explode(',', $milestr);

                                    // Filter Array And Remove The empty element which in this case
                                    //    3 => ''
                                    $milefilteredArray = $mileexplodedStr;
                                    //dd($filteredArray);
                                    ?>

                                    <div class="seopage1_attach">
                                        @foreach ($milefilteredArray as $data)
                                            @if ($data != null)
                                                <a href="/storage/deal-files/{{ $data }}"
                                                    title="{{ $data }}" target="_blank"><i
                                                        class="fa fa-paperclip"></i> {{ Str::limit($data, 20) }} </a>
                                            @endif
                                        @endforeach
                                    </div>

                                    <div class="sbinfo">
                                        <ul>
                                            <li>{{ $mile->user->name }}</li>
                                            <li>{{ $mile->created_at->toFormattedDateString() }}</li>
                                            <li>{{ $mile->created_at->format('h : i A') }}</li>
                                        </ul>
                                    </div>
                                </div>
                            @endforeach

                        </div>
                        @if ($deal->deal_stage == 5)
                            <div class="dealstage_comments_box mt-2">

                                <div class="comments-section">
                                    <div class="row">

                                        <div class="comment-add">
                                            <div class="col-md-12">
                                                <form action="{{ route('post-comment') }}" method="POST"
                                                    enctype="multipart/form-data">
                                                    @csrf
                                                    <input type="hidden" name="deal_stage_id" value="5">
                                                    <input type="hidden" name="deal_id"
                                                        value="{{ $deal->short_code }}">
                                                    <div class="form-floating mb-3">
                                                        <textarea class="form-control" rows="3" cols="20" name="comment" placeholder="Leave a comment here"
                                                            id="floatingTextarea2" style="height: auto"></textarea>

                                                    </div>

                                                    <div class="wrapper">
                                                        <div class="files">
                                                            <span class="btn btn-default btn-file">
                                                                <i class="fa fa-paperclip"></i>
                                                                <input type="file" name="attach[]" multiple
                                                                    id="fileInput" />
                                                            </span>
                                                            <input type="submit"
                                                                class="btn btn-default pull-right comment_btn text-end"
                                                                value="Comment">
                                                            <br />
                                                            <ul class="fileList" id="fileList"></ul>
                                                        </div>
                                                    </div>

                                                    <!-- <div class="wrapper">
                                                                                                      <input type="file" id="file-input" name="attach[]" multiple>
                                                                                                      <label for="file-input">

                                                                                                        <i class="fa fa-paperclip fa-2x"></i>
                                                                                                        <span></span>
                                                                                                      </label>

                                                                                                      <i class="fa fa-times-circle remove"></i>
                                                                                                      <input type="submit" class="btn btn-default pull-right comment_btn text-end" value="Comment">
                                                                                                    </div> -->



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif

                    </div>
                </div>

                <!-- details  -->





            </div>

            <!-- modal popup -->



        </div>
    </section>
@endsection




<script src="https://code.jquery.com/jquery-3.5.1.js" charset="utf-8"></script>



@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" charset="utf-8"></script>






    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>



    <script>
        var textarea = document.querySelector('textarea');

        textarea.addEventListener('keydown', autosize);

        function autosize() {
            var el = this;
            setTimeout(function() {
                el.style.cssText = 'height:auto; padding:40';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    </script>





    <!--  multiple attachfile upload   -->

    <script>
        $.fn.fileUploader = function(filesToUpload, sectionIdentifier) {
            var fileIdCounter = 0;

            this.closest(".files").change(function(evt) {
                var output = [];

                for (var i = 0; i < evt.target.files.length; i++) {
                    fileIdCounter++;
                    var file = evt.target.files[i];
                    var fileId = sectionIdentifier + fileIdCounter;

                    filesToUpload.push({
                        id: fileId,
                        file: file
                    });

                    var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + fileId +
                        "\"> X </a>";
                    // file size file.size, " bytes. &nbsp; &nbsp; ",
                    output.push("<li><strong>", escape(file.name), "</strong> ", removeLink, "</li> ");
                };

                $(this).children(".fileList")
                    .append(output.join(""));

                //reset the input to null
                evt.target.value = null;
            });

            $(this).on("click", ".removeFile", function(e) {
                e.preventDefault();

                var fileId = $(this).parent().children("a").data("fileid");

                // loop through the files array
                for (var i = 0; i < filesToUpload.length; ++i) {
                    if (filesToUpload[i].id === fileId)
                        filesToUpload.splice(i, 1);
                }

                $(this).parent().remove();
            });

            this.clear = function() {
                for (var i = 0; i < filesToUpload.length; ++i) {
                    if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
                        filesToUpload.splice(i, 1);
                }

                $(this).children(".fileList").empty();
            }

            return this;
        };

        // file list

        (function() {
            var filesToUpload = [];

            var files1Uploader = $("#files1").fileUploader(filesToUpload, "files1");
            var files2Uploader = $("#files2").fileUploader(filesToUpload, "files2");
            var files3Uploader = $("#files3").fileUploader(filesToUpload, "files3");
            var files4Uploader = $("#files4").fileUploader(filesToUpload, "files4");
            var files4Uploader = $("#files5").fileUploader(filesToUpload, "files5");

            // $("#uploadBtn").click(function (e) {
            //     e.preventDefault();
            //
            //     var formData = new FormData();
            //
            //     for (var i = 0, len = filesToUpload.length; i < len; i++) {
            //         formData.append("files", filesToUpload[i].file);
            //     }
            //
            //     $.ajax({
            //         url: "",
            //         data: formData,
            //         processData: false,
            //         contentType: false,
            //         type: "POST",
            //         success: function (data) {
            //             alert("DONE");
            //
            //             files1Uploader.clear();
            //             files2Uploader.clear();
            //             files3Uploader.clear();
            //             files4Uploader.clear();
            //             files5Uploader.clear();
            //         },
            //         error: function (data) {
            //             alert("ERROR - " + data.responseText);
            //         }
            //     });
            // });
        })()
    </script>

    <script>
        // fileInput attchment
        document.addEventListener('DOMContentLoaded', function() {
            var fileInput = document.getElementById('fileInput');
            var fileList = document.getElementById('fileList');

            fileInput.addEventListener('change', function() {
                fileList.innerHTML = '';

                var files = fileInput.files;
                for (var i = 0; i < files.length; i++) {
                    var li = document.createElement('li');
                    li.textContent = files[i].name;
                    fileList.appendChild(li);
                }
            });
        });
    </script>

    {{-- modal control --}}

    <script>
        var modalToggle = document.querySelectorAll(".deal-modal-toggle");
        var dismissModal = document.querySelectorAll(".dismiss-modal");

        modalToggle.forEach(element => {
            // add event listener
            element.addEventListener('click', function() {
                const targetModal = document.querySelector(this.dataset.target);
                targetModal.classList.toggle('show')
            })
        });

        dismissModal.forEach(element => {
            // add event listener
            element.addEventListener('click', function() {
                const targetModal = document.querySelector(this.dataset.dismissModal);
                targetModal.classList.remove('show');
            })
        })
    </script>
@endpush
