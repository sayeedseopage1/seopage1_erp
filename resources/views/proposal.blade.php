<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <!-- Simple Line Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/simple-line-icons.css') }}">

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">

    <title>@lang($pageTitle)</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ global_setting()->favicon_url }}">

    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                margin-left: 510px;
                width: calc(100% - 510px)
            }

        </style>
    @endisset

    @stack('styles')

    <style>
        :root {
            --fc-border-color: #E8EEF3;
            --fc-button-text-color: #99A5B5;
            --fc-button-border-color: #99A5B5;
            --fc-button-bg-color: #ffffff;
            --fc-button-active-bg-color: #171f29;
            --fc-today-bg-color: #f2f4f7;
        }

        .preloader-container {
            height: 100vh;
            width: 100%;
            margin-left: 0;
            margin-top: 0;
        }

        .fc a[data-navlink] {
            color: #99a5b5;
        }

        .signature_wrap {
            position: relative;
            height: 150px;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 400px;
        }

        .signature-pad {
            position: absolute;
            left: 0;
            top: 0;
            width: 400px;
            height: 150px;
        }

    </style>
    <style>
        #logo {
            height: 33px;
        }

    </style>


    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>

    <script>
        var checkMiniSidebar = localStorage.getItem("mini-sidebar");
    </script>

</head>

<body id="body" class="h-100 bg-additional-grey">

    <!-- BODY WRAPPER START -->
    <div class="body-wrapper clearfix">


        <!-- MAIN CONTAINER START -->
        <section class="bg-additional-grey" id="fullscreen">

            <div class="preloader-container d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status" aria-hidden="true"></div>
            </div>

            <x-app-title class="d-block d-lg-none" :pageTitle="__($pageTitle)"></x-app-title>


            <!-- CONTENT WRAPPER START -->
            <div class="content-wrapper container">
                <!-- INVOICE CARD START -->

                <div class="card border-0 invoice">
                    <!-- CARD BODY START -->
                    <div class="card-body">
                        <div class="invoice-table-wrapper">
                            <table width="100%" class="">
                                <tr class="inv-logo-heading">
                                    <td><img src="{{ invoice_setting()->logo_url }}"
                                            alt="{{ mb_ucwords(global_setting()->company_name) }}" id="logo" /></td>
                                    <td align="right"
                                        class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                                        @lang('app.menu.proposal')</td>
                                </tr>
                                <tr class="inv-num">
                                    <td class="f-14 text-dark">
                                        <p class="mt-3 mb-0">
                                            {{ mb_ucwords(global_setting()->company_name) }}<br>
                                            @if (!is_null($settings))
                                                {!! nl2br(default_address()->address) !!}<br>
                                                {{ global_setting()->company_phone }}
                                            @endif
                                            @if ($invoiceSetting->show_gst == 'yes' && !is_null($invoiceSetting->gst_number))
                                                <br>@lang('app.gstIn'): {{ $invoiceSetting->gst_number }}
                                            @endif
                                        </p><br>
                                    </td>
                                    <td align="right">
                                        <table class="inv-num-date text-dark f-13 mt-3">
                                            <tr>
                                                <td class="bg-light-grey border-right-0 f-w-500">
                                                    @lang('app.menu.proposal')</td>
                                                <td class="border-left-0">#{{ $proposal->id }}</td>
                                            </tr>
                                            <tr>
                                                <td class="bg-light-grey border-right-0 f-w-500">
                                                    @lang('modules.proposal.validTill')</td>
                                                <td class="border-left-0">
                                                    {{ $proposal->valid_till->format($settings->date_format) }}
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
                                        @if ($proposal->lead && ($proposal->lead->client_name || $proposal->lead->client_email || $proposal->lead->mobile || $proposal->lead->company_name || $proposal->lead->address) && (invoice_setting()->show_client_name == 'yes' || invoice_setting()->show_client_email == 'yes' || invoice_setting()->show_client_phone == 'yes' || invoice_setting()->show_client_company_name == 'yes' || invoice_setting()->show_client_company_address == 'yes'))
                                        <p class="mb-0 text-left">
                                            <span class="text-dark-grey text-capitalize">
                                                @lang("modules.invoices.billedTo")
                                            </span><br>

                                            @if ($proposal->lead && $proposal->lead->client_name && invoice_setting()->show_client_name == 'yes')
                                                {{ mb_ucwords($proposal->lead->client_name) }}<br>
                                            @endif
                                            @if ($proposal->lead && $proposal->lead->client_email && invoice_setting()->show_client_email == 'yes')
                                                {{ mb_ucwords($proposal->lead->client_email) }}<br>
                                            @endif
                                            @if ($proposal->lead && $proposal->lead->mobile && invoice_setting()->show_client_phone == 'yes')
                                                {{ $proposal->lead->mobile }}<br>
                                            @endif
                                            @if ($proposal->lead && $proposal->lead->company_name && invoice_setting()->show_client_company_name == 'yes')
                                                {{ mb_ucwords($proposal->lead->company_name) }}<br>

                                            @endif
                                            @if ($proposal->lead && $proposal->lead->address && invoice_setting()->show_client_company_address == 'yes')
                                                {!! nl2br($proposal->lead->address) !!}
                                            @endif
                                        </p>
                                        @endif
                                    </td>

                                    <td align="right" class="mt-4 mt-lg-0 mt-md-0">
                                        <span
                                            class="unpaid {{ $proposal->status == 'waiting' ? 'text-warning border-warning' : '' }} {{ $proposal->status == 'accepted' ? 'text-success border-success' : '' }} rounded f-15 ">@lang('modules.estimates.'.$proposal->status)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30" colspan="2"></td>
                                </tr>
                            </table>
                            <div class="row">
                                <div class="col-sm-12 ql-editor">
                                    {!! $proposal->description !!}
                                </div>
                            </div>
                            <table width="100%" class="inv-desc d-none d-lg-table d-md-table">
                                <tr>
                                    <td colspan="2">
                                        <table class="inv-detail f-14 table-responsive-sm" width="100%">
                                            <tr class="i-d-heading bg-light-grey text-dark-grey font-weight-bold">
                                                <td class="border-right-0">@lang('app.description')</td>
                                                @if ($invoiceSetting->hsn_sac_code_show == 1)
                                                    <td class="border-right-0 border-left-0" align="right">
                                                        @lang("app.hsnSac")</td>
                                                @endif
                                                <td class="border-right-0 border-left-0" align="right">
                                                    @lang("modules.invoices.qty")
                                                </td>
                                                <td class="border-right-0 border-left-0" align="right">
                                                    @lang("modules.invoices.unitPrice")
                                                    ({{ $proposal->currency->currency_code }})
                                                </td>
                                                <td class="border-right-0 border-left-0" align="right">
                                                    @lang("modules.invoices.tax")
                                                </td>
                                                <td class="border-left-0" align="right">
                                                    @lang("modules.invoices.amount")
                                                    ({{ $proposal->currency->currency_code }})</td>
                                            </tr>
                                            @foreach ($proposal->items as $item)
                                                @if ($item->type == 'item')
                                                    <tr class="text-dark font-weight-semibold f-13">
                                                        <td>{{ ucfirst($item->item_name) }}</td>
                                                        @if ($invoiceSetting->hsn_sac_code_show == 1)
                                                            <td align="right">{{ $item->hsn_sac_code }}</td>
                                                        @endif
                                                        <td align="right">{{ $item->quantity }}</td>
                                                        <td align="right">
                                                            {{ currency_formatter($item->unit_price, '') }}
                                                        </td>
                                                        <td align="right">
                                                            {{ $item->tax_list }}
                                                        </td>
                                                        <td align="right">
                                                            {{ currency_formatter($item->amount, '') }}
                                                        </td>
                                                    </tr>
                                                    @if ($item->item_summary || $item->proposalItemImage)
                                                        <tr class="text-dark f-12">
                                                            <td colspan="5" class="border-bottom-0">
                                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                                @if ($item->proposalItemImage)
                                                                    <p class="mt-2">
                                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->proposalItemImage->file_url }}">
                                                                            <img src="{{ $item->proposalItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                                        </a>
                                                                    </p>
                                                                @endif
                                                            </td>
                                                        </tr>
                                                    @endif
                                                @endif
                                            @endforeach

                                            <tr>
                                                <td colspan="{{ $invoiceSetting->hsn_sac_code_show == 1 ? '4' : '3' }} "
                                                    class="blank-td border-bottom-0 border-left-0 border-right-0"></td>
                                                <td colspan="2" class="p-0 ">
                                                    <table width="100%">
                                                        <tr class="text-dark-grey" align="right">
                                                            <td class="w-50 border-top-0 border-left-0">
                                                                @lang("modules.invoices.subTotal")</td>
                                                            <td class="border-top-0 border-right-0">
                                                                {{ currency_formatter($proposal->sub_total, '') }}
                                                            </td>
                                                        </tr>
                                                        @if ($discount != 0 && $discount != '')
                                                            <tr class="text-dark-grey" align="right">
                                                                <td class="w-50 border-top-0 border-left-0">
                                                                    @lang("modules.invoices.discount")</td>
                                                                <td class="border-top-0 border-right-0">
                                                                    {{ currency_formatter($discount, '') }}
                                                                </td>
                                                            </tr>
                                                        @endif
                                                        @foreach ($taxes as $key => $tax)
                                                            <tr class="text-dark-grey" align="right">
                                                                <td class="w-50 border-top-0 border-left-0">
                                                                    {{ mb_strtoupper($key) }}</td>
                                                                <td class="border-top-0 border-right-0">
                                                                    {{ currency_formatter($tax, '') }}
                                                                </td>
                                                            </tr>
                                                        @endforeach

                                                        <tr class="bg-light-grey text-dark f-w-500 f-16" align="right">
                                                            <td class="w-50 border-bottom-0 border-left-0">
                                                                @lang("modules.invoices.total")
                                                            </td>
                                                            <td class="border-bottom-0 border-right-0">
                                                                {{ currency_formatter($proposal->total, '') }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                            <table width="100%" class="inv-desc-mob d-block d-lg-none d-md-none">

                                @foreach ($proposal->items as $item)
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
                                                    @if ($item->item_summary != '' || $item->proposalItemImage)
                                                        <tr>
                                                            <td class="border-left-0 border-right-0 border-bottom-0 f-12">
                                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                                @if ($item->proposalItemImage)
                                                                    <p class="mt-2">
                                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->proposalItemImage->file_url }}">
                                                                            <img src="{{ $item->proposalItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
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
                                                ({{ $proposal->currency->currency_code }})</th>
                                            <td width="50%">
                                                {{ currency_formatter($item->unit_price, '') }}</td>
                                        </tr>
                                        <tr>
                                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                                @lang("modules.invoices.amount")
                                                ({{ $proposal->currency->currency_code }})</th>
                                            <td width="50%">{{ currency_formatter($item->amount, '') }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="3" class="p-0 " colspan="2"></td>
                                        </tr>
                                    @endif
                                @endforeach

                                <tr>
                                    <th width="50%" class="text-dark-grey font-weight-normal">
                                        @lang("modules.invoices.subTotal")
                                    </th>
                                    <td width="50%" class="text-dark-grey font-weight-normal">
                                        {{ currency_formatter($proposal->sub_total, '') }}</td>
                                </tr>
                                @if ($discount != 0 && $discount != '')
                                    <tr>
                                        <th width="50%" class="text-dark-grey font-weight-normal">
                                            @lang("modules.invoices.discount")
                                        </th>
                                        <td width="50%" class="text-dark-grey font-weight-normal">
                                            {{ currency_formatter($discount, '') }}</td>
                                    </tr>
                                @endif

                                @foreach ($taxes as $key => $tax)
                                    <tr>
                                        <th width="50%" class="text-dark-grey font-weight-normal">
                                            {{ mb_strtoupper($key) }}</th>
                                        <td width="50%" class="text-dark-grey font-weight-normal">
                                            {{ currency_formatter($tax, '') }}</td>
                                    </tr>
                                @endforeach

                                <tr>
                                    <th width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                                        @lang("modules.invoices.total")
                                        @lang("modules.invoices.due")</th>
                                    <td width="50%" class="f-16 bg-light-grey text-dark font-weight-bold">
                                        {{ currency_formatter($proposal->total, '') }}</td>
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
                                                <p class="text-dark-grey">{!! !empty($proposal->note) ? $proposal->note : '--' !!}</p>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right">
                                        <table>
                                            <tr>@lang('modules.invoiceSettings.invoiceTerms')</tr>
                                            <tr>
                                                <p class="text-dark-grey">{!! nl2br($invoiceSetting->invoice_terms) !!}
                                                </p>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        @if (isset($taxes) && invoice_setting()->tax_calculation_msg == 1)
                                            <p class="text-dark-grey">
                                                @if ($proposal->calculate_tax == 'after_discount')
                                                    @lang('messages.calculateTaxAfterDiscount')
                                                @else
                                                    @lang('messages.calculateTaxBeforeDiscount')
                                                @endif
                                            </p>
                                        @endif
                                    </td>
                                </tr>
                        </table>
                        </div>

                        @if ($proposal->signature)
                            <div class="col-sm-12 mt-4">
                                @if (!is_null($proposal->signature->signature))
                                    <h6>@lang('modules.estimates.signature')</h6>
                                    <img src="{{ $proposal->signature->signature }}" style="width: 200px;">
                                @else
                                    <h6>@lang('modules.estimates.signedBy')</h6>
                                @endif
                                <p>({{ $proposal->signature->full_name }})</p>
                            </div>
                        @endif

                        @if ($proposal->client_comment)
                            <hr>
                            <div class="col-md-12">
                                <h4 class="name" style="margin-bottom: 20px;">@lang('app.rejectReason')</h4>
                                <p> {{ $proposal->client_comment }} </p>
                            </div>
                        @endif
                    </div>


                    <!-- CARD BODY END -->
                    <!-- CARD FOOTER START -->
                    <div
                        class="card-footer bg-white border-0 d-flex justify-content-end py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

                        <div class="d-flex">
                            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                                <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">@lang('app.action')
                                    <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                                </button>
                                <!-- DROPDOWN - INFORMATION -->
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"
                                    tabindex="0">
                                    @if (!$proposal->signature && $proposal->status == 'waiting')
                                        <li>
                                            <a class="dropdown-item f-14 text-dark" data-toggle="modal"
                                                data-target="#signature-modal" href="javascript:;">
                                                <i class="fa fa-check f-w-500 mr-2 f-11"></i> @lang('app.accept')
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item f-14 text-dark" data-toggle="modal"
                                                data-target="#decline-modal" href="javascript:;">
                                                <i class="fa fa-times f-w-500 mr-2 f-11"></i> @lang('app.decline')
                                            </a>
                                        </li>
                                    @endif
                                    <li>
                                        <a class="dropdown-item f-14 text-dark"
                                            href="{{ route('front.download_proposal', md5($proposal->id)) }}">
                                            <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- CARD FOOTER END -->
                </div>
                <!-- INVOICE CARD END -->

            </div>
            <!-- CONTENT WRAPPER END -->


        </section>
        <!-- MAIN CONTAINER END -->
    </div>
    <!-- BODY WRAPPER END -->

    <div id="signature-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
            <div class="modal-content">
                @include('proposals.ajax.accept-proposal')
            </div>
        </div>
    </div>

    <div id="decline-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">@lang('modules.proposal.rejectConfirm')</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">

                    <x-form id="acceptEstimate">
                        <div class="row">
                            <div class="col-sm-12">
                                <x-forms.textarea fieldId="comment" :fieldLabel="__('app.reason')" fieldName="comment">
                                </x-forms.textarea>
                            </div>
                        </div>
                    </x-form>
                </div>
                <div class="modal-footer">
                    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')
                    </x-forms.button-cancel>
                    <x-forms.button-primary id="decline-proposal" icon="times">@lang('app.decline')
                    </x-forms.button-primary>
                </div>

            </div>
        </div>
    </div>
   <!-- also the modal itself -->
   <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    Loading...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel rounded mr-3" data-dismiss="modal">Close</button>
                    <button type="button" class="btn-primary rounded">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Global Required Javascript -->
    <script src="{{ asset('js/main.js') }}"></script>
    <script>
        const MODAL_DEFAULT = '#myModalDefault';
        const MODAL_LG = '#myModal';
        const MODAL_XL = '#myModalXl';
        const MODAL_HEADING = '#modelHeading';
        const RIGHT_MODAL = '#task-detail-1';
        const RIGHT_MODAL_CONTENT = '#right-modal-content';
        const RIGHT_MODAL_TITLE = '#right-modal-title';
    </script>
    <script>
        const datepickerConfig = {
            formatter: (input, date, instance) => {
                const value = moment(date).format('{{ global_setting()->moment_date_format }}')
                input.value = value
            },
            showAllDates: true,
            customDays: ['@lang("app.weeks.Sun")', '@lang("app.weeks.Mon")', '@lang("app.weeks.Tue")',
                '@lang("app.weeks.Wed")', '@lang("app.weeks.Thu")', '@lang("app.weeks.Fri")',
                '@lang("app.weeks.Sat")'
            ],
            customMonths: ['@lang("app.months.January")', '@lang("app.months.February")',
                '@lang("app.months.March")', '@lang("app.months.April")', '@lang("app.months.May")',
                '@lang("app.months.June")', '@lang("app.months.July")', '@lang("app.months.August")',
                '@lang("app.months.September")', '@lang("app.months.October")',
                '@lang("app.months.November")', '@lang("app.months.December")'
            ],
            customOverlayMonths: ['@lang("app.monthsShort.Jan")', '@lang("app.monthsShort.Feb")',
                '@lang("app.monthsShort.Mar")', '@lang("app.monthsShort.Apr")',
                '@lang("app.monthsShort.May")', '@lang("app.monthsShort.Jun")',
                '@lang("app.monthsShort.Jul")', '@lang("app.monthsShort.Aug")',
                '@lang("app.monthsShort.Sep")', '@lang("app.monthsShort.Oct") ',
                '@lang("app.monthsShort.Nov")', '@lang("app.monthsShort.Dec")'
            ],
            overlayButton: "@lang('app.submit')",
            overlayPlaceholder: "@lang('app.enterYear')"
        };

        const dropifyMessages = {
            default: '@lang("app.dragDrop")',
            replace: '@lang("app.dragDropReplace")',
            remove: '@lang("app.remove")',
            error: '@lang("app.largeFile")'
        };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
    <script>
        var canvas = document.getElementById('signature-pad');

        var signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
        });

        document.getElementById('clear-signature').addEventListener('click', function(e) {
            e.preventDefault();
            signaturePad.clear();
        });

        document.getElementById('undo-signature').addEventListener('click', function(e) {
            e.preventDefault();
            var data = signaturePad.toData();
            if (data) {
                data.pop(); // remove the last dot or line
                signaturePad.fromData(data);
            }
        });
    </script>

    <script>

        $('#toggle-pad-uploader').click(function() {
            var text = $('.signature').hasClass('d-none') ? '{{ __("modules.estimates.uploadSignature") }}' : '{{ __("app.sign") }}';

            $(this).html(text);

            $('.signature').toggleClass('d-none');
            $('.upload-image').toggleClass('d-none');
        });

        $('#save-signature').click(function() {
            var name = $('#full_name').val();
            var email = $('#email').val();
            var action_type = $('#action_type').val();
            var id = '{{ $proposal->id }}';
            var isSignatureNull = signaturePad.isEmpty();
            var image = $('#image').val();
            var signature = signaturePad.toDataURL('image/png');
            var signatureApproval = {{ $proposal->signature_approval }};

            // this parameter is used for type of signature used and will be used on validation and upload signature image
            var signature_type = !$('.signature').hasClass('d-none') ? 'signature' : 'upload';

            if (signaturePad.isEmpty() && signatureApproval && !$('.signature').hasClass('d-none')) {
                Swal.fire({
                    icon: 'error',
                    text: '{{ __("messages.signatureRequired") }}',

                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                });
                return false;
            }

            $.easyAjax({
                url: "{{ route('front.proposal_action', $proposal->id) }}",
                container: '#acceptEstimate',
                type: "POST",
                blockUI: true,
                file: true,
                disableButton: true,
                buttonSelector : '#save-signature',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    full_name: name,
                    email: email,
                    type: action_type,
                    signature_type: signature_type,
                    isSignatureNull: isSignatureNull,
                    signature: signature,
                    image: image,
                },
                success: function(data) {
                    if (data.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        $('#decline-proposal').click(function() {
            var comment = $('#comment').val();

            $.easyAjax({
                url: "{{ route('front.proposal_action', $proposal->id) }}",
                type: "POST",
                blockUI: true,
                data: {
                    type: 'decline',
                    comment: comment,
                    _token: '{{ csrf_token() }}'
                },
                success: function(data) {
                    if (data.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        $('body').on('click', '.img-lightbox', function () {
            var imageUrl = $(this).data('image-url');
            const url = "{{ route('invoices.public.show_image').'?image_url=' }}"+imageUrl;
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    </script>

    <script>
        $(window).on('load', function() {
            // Animate loader off screen
            init();
            $(".preloader-container").fadeOut("slow", function() {
                $(this).removeClass("d-flex");
            });
        });
    </script>

</body>

</html>
