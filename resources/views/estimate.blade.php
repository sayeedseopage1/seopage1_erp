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

    </style>
    <style>
        #logo {
            height: 33px;
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

            <div class="content-wrapper container">

                <!-- INVOICE CARD START -->
                <div class="card border-0 invoice">
                    <!-- CARD BODY START -->
                    <div class="card-body">
                        <div class="invoice-table-wrapper">
                            <table width="100%" class="">
                            <tr class=" inv-logo-heading">
                                <td><img src="{{ invoice_setting()->logo_url }}"
                                        alt="{{ mb_ucwords(global_setting()->company_name) }}" id="logo" /></td>
                                <td align="right"
                                    class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                                    @lang('app.estimate')</td>
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
                                                    @lang('modules.estimates.estimatesNumber')</td>
                                                <td class="border-left-0">{{ $estimate->estimate_number }}</td>
                                            </tr>
                                            <tr>
                                                <td class="bg-light-grey border-right-0 f-w-500">
                                                    @lang('modules.estimates.validTill')</td>
                                                <td class="border-left-0">
                                                    {{ $estimate->valid_till->format(global_setting()->date_format) }}
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
                                        @if (($estimate->client || $estimate->clientDetails) && ($estimate->client->name || $estimate->client->email || $estimate->client->mobile || $estimate->clientDetails->company_name || $estimate->clientDetails->address) && (invoice_setting()->show_client_name == 'yes' || invoice_setting()->show_client_email == 'yes' || invoice_setting()->show_client_phone == 'yes' || invoice_setting()->show_client_company_name == 'yes' || invoice_setting()->show_client_company_address == 'yes'))
                                        <p class="mb-0 text-left">
                                            <span class="text-dark-grey text-capitalize">
                                                @lang("modules.invoices.billedTo")
                                            </span><br>

                                            @if ($estimate->client && $estimate->client->name && invoice_setting()->show_client_name == 'yes')
                                                {{ mb_ucwords($estimate->client->name) }}<br>
                                            @endif
                                            @if ($estimate->client && $estimate->client->email && invoice_setting()->show_client_email == 'yes')
                                                {{ $estimate->client->email }}<br>
                                            @endif
                                            @if ($estimate->client && $estimate->client->mobile && invoice_setting()->show_client_phone == 'yes')
                                                {{ $estimate->client->mobile }}<br>
                                            @endif
                                            @if ($estimate->clientDetails && $estimate->clientDetails->company_name && invoice_setting()->show_client_company_name == 'yes')
                                                {{ mb_ucwords($estimate->clientDetails->company_name) }}<br>
                                            @endif
                                            @if ($estimate->clientDetails && $estimate->clientDetails->address && invoice_setting()->show_client_company_address == 'yes')
                                                {!! nl2br($estimate->clientDetails->address) !!}
                                            @endif
                                        </p>
                                        @endif
                                    </td>

                                    <td align="right" class="mt-4 mt-lg-0 mt-md-0">
                                        <span
                                            class="unpaid {{ $estimate->status == 'draft' ? 'text-primary border-primary' : '' }} {{ $estimate->status == 'accepted' ? 'text-success border-success' : '' }} rounded f-15 ">@lang('modules.estimates.'.$estimate->status)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30" colspan="2"></td>
                                </tr>
                            </table>
                            <div class="row">
                                <div class="col-sm-12 ql-editor">
                                    {!! $estimate->description !!}
                                </div>
                            </div>
                            <table width="100%" class="inv-desc d-none d-lg-table d-md-table">
                                <tr>
                                    <td colspan="2">
                                        <table class="inv-detail f-14 table-responsive-sm" width="100%">
                                            <tr class="i-d-heading bg-light-grey text-dark-grey font-weight-bold">
                                                <td class="border-right-0">@lang('app.description')</td>
                                                @if ($invoiceSetting->hsn_sac_code_show)
                                                    <td class="border-right-0 border-left-0" align="right">
                                                        @lang("app.hsnSac")</td>
                                                @endif
                                                <td class="border-right-0 border-left-0" align="right">
                                                    @lang("modules.invoices.qty")</td>
                                                <td class="border-right-0 border-left-0" align="right">
                                                    @lang("modules.invoices.unitPrice")
                                                    ({{ $estimate->currency->currency_code }})
                                                </td>
                                                <td class="border-left-0" align="right">@lang("modules.invoices.tax")</td>
                                                <td class="border-left-0" align="right">
                                                    @lang("modules.invoices.amount")
                                                    ({{ $estimate->currency->currency_code }})</td>
                                            </tr>
                                            @foreach ($estimate->items as $item)
                                                @if ($item->type == 'item')
                                                    <tr class="text-dark font-weight-semibold f-13">
                                                        <td>{{ ucfirst($item->item_name) }}</td>
                                                        @if ($invoiceSetting->hsn_sac_code_show)
                                                            <td align="right">{{ $item->hsn_sac_code }}</td>
                                                        @endif
                                                        <td align="right">{{ $item->quantity }}</td>
                                                        <td align="right">
                                                            {{ currency_formatter($item->unit_price, '') }}
                                                        </td>
                                                        <td align="right">{{ $item->tax_list }}</td>
                                                        <td align="right">
                                                            {{ currency_formatter($item->amount, '') }}
                                                        </td>
                                                    </tr>

                                                    @if ($item->item_summary || $item->estimateItemImage)
                                                        <tr class="text-dark f-12">
                                                            <td colspan="5" class="border-bottom-0">
                                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                                @if ($item->estimateItemImage)
                                                                    <p class="mt-2">
                                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->estimateItemImage->file_url }}">
                                                                            <img src="{{ $item->estimateItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
                                                                        </a>
                                                                    </p>
                                                                @endif
                                                            </td>
                                                        </tr>
                                                    @endif
                                                @endif
                                            @endforeach

                                            <tr>
                                                <td colspan="3"
                                                    class="blank-td border-bottom-0 border-left-0 border-right-0"></td>
                                                <td colspan="{{ $invoiceSetting->hsn_sac_code_show ? 4 : 3 }}"
                                                    class="p-0 ">
                                                    <table width="100%">
                                                        <tr class="text-dark-grey" align="right">
                                                            <td class="border-top-0 border-left-0">
                                                                @lang("modules.invoices.subTotal")</td>
                                                            <td class="border-top-0 border-right-0">
                                                                {{ currency_formatter($estimate->sub_total, '') }}
                                                            </td>
                                                        </tr>
                                                        @if ($discount != 0 && $discount != '')
                                                            <tr class="text-dark-grey" align="right">
                                                                <td class="border-top-0 border-left-0">
                                                                    @lang("modules.invoices.discount")</td>
                                                                <td class="border-top-0 border-right-0">
                                                                    {{ currency_formatter($discount, '') }}
                                                                </td>
                                                            </tr>
                                                        @endif
                                                        @foreach ($taxes as $key => $tax)
                                                            <tr class="text-dark-grey" align="right">
                                                                <td class="border-top-0 border-left-0">
                                                                    {{ mb_strtoupper($key) }}</td>
                                                                <td class="border-top-0 border-right-0">
                                                                    {{ currency_formatter($tax, '') }}
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                        <tr class=" text-dark-grey font-weight-bold" align="right">
                                                            <td class="border-bottom-0 border-left-0">
                                                                @lang("modules.invoices.total")</td>
                                                            <td class="border-bottom-0 border-right-0">
                                                                {{ currency_formatter($estimate->total, '') }}
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

                                @foreach ($estimate->items as $item)
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
                                                    @if ($item->item_summary != '' || $item->estimateItemImage)
                                                        <tr>
                                                            <td class="border-left-0 border-right-0 border-bottom-0 f-12">
                                                                {!! nl2br(strip_tags($item->item_summary)) !!}
                                                                @if ($item->estimateItemImage)
                                                                    <p class="mt-2">
                                                                        <a href="javascript:;" class="img-lightbox" data-image-url="{{ $item->estimateItemImage->file_url }}">
                                                                            <img src="{{ $item->estimateItemImage->file_url }}" width="80" height="80" class="img-thumbnail">
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
                                                ({{ $estimate->currency->currency_code }})</th>
                                            <td width="50%">
                                                {{ currency_formatter($item->unit_price, '') }}</td>
                                        </tr>
                                        <tr>
                                            <th width="50%" class="bg-light-grey text-dark-grey font-weight-bold">
                                                @lang("modules.invoices.amount")
                                                ({{ $estimate->currency->currency_code }})</th>
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
                                        {{ currency_formatter($estimate->sub_total, '') }}</td>
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
                                    <th width="50%" class="text-dark-grey font-weight-bold">
                                        @lang("modules.invoices.total")</th>
                                    <td width="50%" class="text-dark-grey font-weight-bold">
                                        {{ currency_formatter($estimate->total, '') }}</td>
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
                                                <p class="text-dark-grey">{!! $estimate->note ?? '--' !!}</p>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right">
                                        <table>
                                            <tr>@lang('modules.invoiceSettings.invoiceTerms')</tr>
                                            <tr>
                                                <p class="text-dark-grey">{!! nl2br($invoiceSetting->invoice_terms) !!}</p>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                @if (isset($taxes) && invoice_setting()->tax_calculation_msg == 1)
                                <tr>
                                    <td>
                                        <p class="text-dark-grey">
                                            @if ($estimate->calculate_tax == 'after_discount')
                                                @lang('messages.calculateTaxAfterDiscount')
                                            @else
                                                @lang('messages.calculateTaxBeforeDiscount')
                                            @endif
                                        </p>
                                    </td>
                                </tr>
                                @endif
                            </table>
                        </div>

                        @if ($estimate->sign)
                            <div class="row">
                                <div class="col-sm-12 mt-4">
                                    <h6>@lang('modules.estimates.signature')</h6>
                                    <img src="{{ $estimate->sign->signature }}" style="width: 200px;">
                                    <p>({{ $estimate->sign->full_name }})</p>
                                </div>
                            </div>
                        @endif

                    </div>
                    <!-- CARD BODY END -->
                    <!-- CARD FOOTER START -->
                    <div class="card-footer bg-white border-0 d-flex justify-content-end py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

                        <div class="d-flex">

                            <x-forms.button-cancel :link="route('estimates.index')" class="border-0 mr-3">
                                @lang('app.cancel')
                            </x-forms.button-cancel>

                            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                                <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">@lang('app.action')
                                    <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                                </button>
                                <!-- DROPDOWN - INFORMATION -->
                                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"
                                    tabindex="0">
                                    @if ($estimate->status == 'waiting')
                                        {{-- @if ($estimate->status == 'waiting' && $estimate->client_id == user()->id) --}}
                                        <li>
                                            <a class="dropdown-item f-14 text-dark" data-toggle="modal"
                                                data-target="#signature-modal" href="javascript:;">
                                                <i class="fa fa-check f-w-500 mr-2 f-11"></i> @lang('app.accept')
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item f-14 text-dark" id="decline-estimate"
                                                href="javascript:;">
                                                <i class="fa fa-times f-w-500 mr-2 f-11"></i> @lang('app.decline')
                                            </a>
                                        </li>
                                    @endif
                                    <li>
                                        <a class="dropdown-item f-14 text-dark"
                                            href="{{ route('front.estimate.download', [$estimate->id]) }}">
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

                <div id="signature-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
                        <div class="modal-content">
                            @include('estimates.ajax.accept-estimate')
                        </div>
                    </div>
                </div>

            </div>
        </section>
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
        const MODAL_LG = '#myModal';
        const MODAL_HEADING = '#modelHeading';
        const dropifyMessages = {
            default: '@lang("app.dragDrop")',
            replace: '@lang("app.dragDropReplace")',
            remove: '@lang("app.remove")',
            error: '@lang("app.largeFile")'
        };

        $(window).on('load', function() {
            // Animate loader off screen
            init();
            $(".preloader-container").fadeOut("slow", function() {
                $(this).removeClass("d-flex");
            });
        });

        $(body).on('click', '#download-invoice', function() {
            window.location.href = "{{ route('invoices.download', [$estimate->id]) }}";
        })
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

        $('#decline-estimate').click(function() {
            $.easyAjax({
                type: 'POST',
                url: "{{ route('front.estimate.decline', $estimate->id) }}",
                blockUI: true,
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        $('#toggle-pad-uploader').click(function() {
            var text = $('.signature').hasClass('d-none') ? '{{ __("modules.estimates.uploadSignature") }}' : '{{ __("app.sign") }}';

            $(this).html(text);

            $('.signature').toggleClass('d-none');
            $('.upload-image').toggleClass('d-none');
        });

        $('#save-signature').click(function() {
            var first_name = $('#first_name').val();
            var last_name = $('#last_name').val();
            var email = $('#email').val();
            var signature = signaturePad.toDataURL('image/png');

            var image = $('#image').val();

            // this parameter is used for type of signature used and will be used on validation and upload signature image
            var signature_type = !$('.signature').hasClass('d-none') ? 'signature' : 'upload';

            if (signaturePad.isEmpty() && !$('.signature').hasClass('d-none')) {
                Swal.fire({
                    icon: 'error',
                    text: '{{ __('messages.signatureRequired') }}',

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
                url: "{{ route('front.estimate.accept', $estimate->id) }}",
                container: '#acceptEstimate',
                type: "POST",
                blockUI: true,
                file: true,
                disableButton: true,
                buttonSelector : '#save-signature',
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    signature: signature,
                    image: image,
                    signature_type: signature_type,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
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

</body>

</html>
