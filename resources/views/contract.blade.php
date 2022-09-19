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
    <link rel="icon" type="image/png" sizes="16x16" href="{{ global_setting()->favicon_url }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">

    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                margin-left: 510px;
                width: calc(100% - 510px)
            }

        </style>
    @endisset

    <style>
        .logo {
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

    </style>


    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>

    <script>
        var checkMiniSidebar = localStorage.getItem("mini-sidebar");

    </script>

</head>

<body id="body" class="h-100 bg-additional-grey">

    <div class="content-wrapper container">

        <div class="card border-0 invoice">
            <!-- CARD BODY START -->
            <div class="card-body">
                <div class="invoice-table-wrapper">
                    <table width="100%" class="">
                        <tr class="inv-logo-heading">
                            <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                                    class="logo" /></td>
                            <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                                @lang('app.menu.contract')</td>
                        </tr>
                        <tr class="inv-num">
                            <td class="f-14 text-dark">
                                <p class="mt-3 mb-0">
                                    {{ mb_ucwords(global_setting()->company_name) }}<br>
                                    {!! nl2br(default_address()->address) !!}<br>
                                    {{ global_setting()->company_phone }}
                                </p><br>
                            </td>
                            <td align="right">
                                <table class="inv-num-date text-dark f-13 mt-3">
                                    <tr>
                                        <td class="bg-light-grey border-right-0 f-w-500">
                                            @lang('modules.contracts.contractNumber')</td>
                                        <td class="border-left-0">#{{ $contract->id }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bg-light-grey border-right-0 f-w-500">
                                            @lang('modules.projects.startDate')</td>
                                        <td class="border-left-0">{{ $contract->start_date->format(global_setting()->date_format) }}
                                        </td>
                                    </tr>
                                    @if ($contract->end_date != null)
                                        <tr>
                                            <td class="bg-light-grey border-right-0 f-w-500">@lang('modules.contracts.endDate')
                                            </td>
                                            <td class="border-left-0">{{ $contract->end_date->format(global_setting()->date_format) }}
                                            </td>
                                        </tr>
                                    @endif
                                    <tr>
                                        <td class="bg-light-grey border-right-0 f-w-500">
                                            @lang('modules.contracts.contractType')</td>
                                        <td class="border-left-0">{{ $contract->contractType->name }}
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
                                <p class="mb-0 text-left"><span
                                        class="text-dark-grey text-capitalize">@lang("app.client")</span><br>
                                    {{ mb_ucwords($contract->client->name) }}<br>
                                    {{ mb_ucwords($contract->client->clientDetails->company_name) }}<br>
                                    {!! nl2br($contract->client->clientDetails->address) !!}</p>
                            </td>
                            <td align="right">
                                @if ($contract->company_logo)
                                    <img src="{{ $contract->image_url }}"
                                    alt="{{ mb_ucwords($contract->client->clientDetails->company_name) }}" class="logo" />
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                    </table>
                </div>

                <div class="d-flex flex-column">
                    <h5>@lang('app.subject')</h5>
                    <p class="f-15">{{ $contract->subject }}</p>

                    <h5>@lang('app.description')</h5>
                    <div class="ql-editor p-0">{!! $contract->contract_detail !!}</div>

                    @if ($contract->amount != 0)
                        <div class="text-right pt-3 border-top">
                            <h4>@lang('modules.contracts.contractValue'):
                                {{ currency_formatter($contract->amount, $contract->currency->currency_symbol) }}</h4>
                        </div>
                    @endif
                </div>

                @if ($contract->signature)
                    <div class="d-flex flex-column">
                        <h6>@lang('modules.estimates.signature')</h6>
                        <img src="{{ $contract->signature->signature }}" style="width: 200px;">
                        <p>({{ $contract->signature->full_name }})</p>
                    </div>
                @endif

                <div id="signature-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
                        <div class="modal-content">
                            @include('estimates.ajax.accept-estimate')
                        </div>
                    </div>
                </div>

            </div>
            <!-- CARD BODY END -->

            <!-- CARD FOOTER START -->
            <div class="card-footer bg-white border-0 d-flex justify-content-end py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

                <x-forms.button-cancel :link="route('contracts.index')" class="border-0 mr-3">@lang('app.cancel')
                </x-forms.button-cancel>

                <div class="d-flex">
                    <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                        <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">@lang('app.action')
                            <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                        </button>
                        <!-- DROPDOWN - INFORMATION -->
                        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton" tabindex="0">
                            @if (!$contract->signature)
                                <li>
                                    <a class="dropdown-item f-14 text-dark" href="javascript:;" data-toggle="modal"
                                        data-target="#signature-modal">
                                        <i class="fa fa-check f-w-500  mr-2 f-12"></i>
                                        @lang('app.sign')
                                    </a>
                                </li>
                            @endif
                            <li>
                                <a class="dropdown-item f-14 text-dark"
                                    href="{{ route('contracts.download', $contract->id) }}">
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

    <!-- also the modal itself -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modelHeading">Modal title</h5>
                    <button type="button"  class="close" data-dismiss="modal"
                        aria-label="Close"><span aria-hidden="true">×</span></button>
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

        $(window).on('load', function() {
            // Animate loader off screen
            init();
            $(".preloader-container").fadeOut("slow", function() {
                $(this).removeClass("d-flex");
            });
        });

        $(body).on('click', '#download-invoice', function() {
            window.location.href = "{{ route('front.contract.download', [$contract->id]) }}";
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
                url: "{{ route('front.contract.sign', $contract->id) }}",
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

    </script>

</body>

</html>
