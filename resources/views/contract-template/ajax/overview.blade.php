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

    .ml{
        margin-left : -20px;
        padding: 8px!important;
        border-radius: 4px;
        margin-top: -1px!important
    }

</style>

<div class="card border-0 invoice">
    <!-- CARD BODY START -->
    <div class="card-body">
        <div class="invoice-table-wrapper">
            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            class="logo" /></td>
                    <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                        @lang('app.menu.contractTemplate')</td>
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

    </div>
    <!-- CARD BODY END -->
    <!-- CARD FOOTER START -->
    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3">
            <a class="f-14 text-light mt-2 ml btn-primary"
                href="{{ route('contract-template.download', [$contract->id]) }}">
                <i class="fa fa-download f-w-500 mr-1 f-11"></i> @lang('app.download')
            </a>

            <x-forms.button-cancel :link="route('contract-template.index')" class="border-0 ml-2 mt">
                @lang('app.cancel')
            </x-forms.button-cancel>
        </div>

    </div>
    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->

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
                text: "{{ __('messages.signatureRequired') }}",

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
            url: "{{ route('contracts.sign', $contract->id) }}",
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
        })
    });

</script>
