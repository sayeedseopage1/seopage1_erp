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

<div class="card border-0 invoice">
    <!-- CARD BODY START -->
    <div class="card-body">
        <div class="invoice-table-wrapper">
            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            class="logo" /></td>
                    <td align="right" class="font-weight-bold f-21 text-dark text-uppercase mt-4 mt-lg-0 mt-md-0">
                        @lang('Project Agreement')</td>
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
                                    @lang('Project ID')</td>
                                <td class="border-left-0">#{{ $project->project_short_code }}</td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.projects.startDate')</td>
                                <td class="border-left-0">{{ $project->start_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                            @if ($project->due_date != null)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">@lang('Project End Date')
                                    </td>
                                    <td class="border-left-0">{{ $project-deadline->format(global_setting()->date_format) }}
                                    </td>
                                </tr>
                            @endif
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('Project Type')</td>
                                <td class="border-left-0">{{ $project->project_type->category_name}}
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
                            {{ mb_ucwords($project->client->name) }}<br>
                              {{ mb_ucwords($project->client->email) }}<br>
                            {{ mb_ucwords($project->client->clientDetails->company_name) }}<br>
                            {!! nl2br($project->client->clientDetails->address) !!}</p>
                    </td>

                </tr>
                <tr>
                    <td height="30"></td>
                </tr>
            </table>
        </div>

        <div class="d-flex flex-column">
            <h5>@lang('app.subject')</h5>
            <p class="f-15">{{ $project->project_name }}</p>

            <h5>@lang('app.description')</h5>
            <div class="ql-editor p-0">{!! $project->project_summary !!}</div>

            @if ($project->project_budget != 0)
                <div class="text-right pt-3 border-top">
                    <h4>@lang('Project Budget'):
                          {{$project->deal->actual_amount}}({{$project->deal->original_currency->currency_code}})</h4>
                </div>
            @endif

        </div>


          @if ($project->signature)
                 <div class="d-flex flex-column">
                     <h6>@lang('modules.estimates.signature')</h6>
                     <img src="{{ $project->signature->signature }}" style="width: 200px;">
                     <p>({{ $project->signature->full_name }})</p>
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
    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="d-flex">
            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">@lang('app.action')
                    <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                </button>
                <!-- DROPDOWN - INFORMATION -->
                <ul class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" tabindex="0">

                    @if (!$project->signature)
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
                            href="{{ route('projects.download', $project->id) }}">
                            <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                        </a>
                        <!-- <a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="route('front.agreement', $project->project_short_code)"><i class="fa fa-copy mr-2"></i>Copy Link</a> -->
                          <a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="http://127.0.0.1:8000/projects/agreement/{{$project->project_short_code}}"><i class="fa fa-copy mr-2"></i>Copy Link</a>
                    </li>
                </ul>
            </div>

        </div>

        <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
        </x-forms.button-cancel>

    </div>
    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->
@push('scripts')
<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script>
    $(function() {
    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function(e) {
        Swal.fire({
            icon: 'success',
            text: '@lang("app.copied")',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
        })
    });
    });

</script>
@endpush
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
            url: "{{ route('projects.sign', $project->id) }}",
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
