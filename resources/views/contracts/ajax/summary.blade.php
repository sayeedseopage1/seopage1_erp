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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<?php
$project_id= App\Models\PMProject::where('deal_id',$contract->deal->id)->first();
//dd($project_id->project_id);

 ?>


<div class="card border-0 invoice">

<!-- CARD BODY START -->

    <div class="card-body">

        <div class="invoice-table-wrapper">

            <table width="100%" class="">
                <tr class="inv-logo-heading">
                    <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                            class="logo" /></td>
                            <td>
                              <div class="dropdown float-right">
                                  <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle" type="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i class="fa fa-ellipsis-h"></i>
                                  </button>

                                  <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                      aria-labelledby="dropdownMenuLink" tabindex="0">
                                      <a class="dropdown-item"
                                          href="/deals/details/edit/{{$contract->deal->id}}">@lang('Edit')</a>
                                  </div>
                              </div>


                            </td>


                </tr>
                <tr>
                  <td>
                    <div class="d-flex justify-content-center">
                      @if(Auth::user()->role_id == 4)
                      @if($contract->deal->status == 'pending')
                      <button class="btn btn-danger mr-3"  type="button" data-toggle="modal" data-target="#dealdenymodal">Deny <i class="fa-solid fa-xmark"></i></button>
                        @include('contracts.modals.dealdenymodal')
                      <a href="/account/projects/{{$project_id->project_id}}/edit" class="btn btn-success">Accept <i class="fa-solid fa-check"></i></a>

                      @elseif($contract->deal->status == 'Accepted')
                        <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
                        @else
                      <h3 class="d-flex justify-content-center" style="color:red;">{{$contract->deal->status}}</h3>

                      @endif
                      @else
                          <h3 class="d-flex justify-content-center" style="color:green;">{{$contract->deal->status}}</h3>
                      @endif
                    </div>
                  </td>

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
                                    Deal Number</td>
                                <td class="border-left-0">#{{ $contract->deal->deal_id }}</td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.projects.startDate')</td>
                                <td class="border-left-0">{{ $contract->start_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">
                                  Pipeline Stage</td>
                                <td class="border-left-0">{{ $contract->deal->pipeline_stage }}
                                </td>
                            </tr>
                            @if ($contract->amount != 0)
                            <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Deal Value </td>
                                <td class="border-left-0">
                                    <h4>
                                        {{$contract->amount}}$</h4>
                                </td>


                            </tr>


                            @endif
                          {{-- @if ($contract->end_date != null)
                                <tr>
                                    <td class="bg-light-grey border-right-0 f-w-500">@lang('modules.contracts.endDate')
                                    </td>
                                    <td class="border-left-0">{{ $contract->end_date->format(global_setting()->date_format) }}
                                    </td>
                                </tr>
                            @endif --}}
                            <tr>
                                {{--}}<td class="bg-light-grey border-right-0 f-w-500">
                                    @lang('modules.contracts.contractType')</td>
                                <td class="border-left-0">{{ $contract->contractType->name }}
                                </td> --}}
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
                            {{ mb_ucwords($contract->deal->client_name) }}<br>
                           {{ mb_ucwords($contract->deal->organization) }}<br>
                          {{--  {!! nl2br($contract->client->clientDetails->address) !!}</p>--}}
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

            <h5>Project Name</h5>
            <p class="f-15">{{ $contract->deal->project_name }}</p>

            <br>


            <h4>Deal Details From Sales Team</h4>
            <hr>

            <div class="card bg-light mb-3" style="max-width: 100%">
          <div class="card-header"><h5>Project Summary</h5></div>
          <div class="card-body">

            <p class="card-text">{!! $contract->deal->description !!}</p>
          </div>
        </div>




            <br>


          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Freelancer Profile Link</h5></div>
        <div class="card-body">

          <p class="card-text">{{ $contract->deal->profile_link}}</p>
        </div>
      </div>


            <br>


          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Freelancer Message Link</h5></div>
        <div class="card-body">

          <p class="card-text">{{ $contract->deal->message_link}}</p>
        </div>
      </div>


            <br>


          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Write the what in 2-8 words here
          (Examples: Website redesign, Shopify website migration to Wix,
          Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h5></div>
        <div class="card-body">

          <p class="card-text">{!! $contract->deal->description2 !!}</p>
        </div>
      </div>


            <br>


          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress
          website for his new design agency. It should include home, about, his services in
          one page, blog, and contact. The look and feel should be better than the references.)</h5></div>
        <div class="card-body">

          <p class="card-text">{!! $contract->deal->description3 !!}</p>
        </div>
      </div>


            <br>

          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Reference websites and what the references are for (Ex: ABC.com
           is for the color scheme. XYZ.com is for section layouts DEF.com is
           for header & footer styling. However, none of these can be copied)</h5></div>
        <div class="card-body">

          <p class="card-text">{!! $contract->deal->description4 !!}</p>
        </div>
      </div>


            <br>


          <div class="card bg-light mb-3" style="max-width: 100%">
        <div class="card-header"><h5>Any particular focus/concern of the client (Ex: 1. The client is very
          concerned about the final look & feel so needs to be careful with the design 2.
          The client is very concerned if the booking functionality will work the way he wants.)</h5></div>
        <div class="card-body">

          <p class="card-text">{!! $contract->deal->description5 !!}</p>
        </div>
      </div>






          <br>


        <div class="card bg-light mb-3" style="max-width: 100%">
      <div class="card-header"><h5>Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h5></div>
      <div class="card-body">

        <p class="card-text">{!! $contract->deal->description6 !!}</p>
      </div>
    </div>




        <br>


      <div class="card bg-light mb-3" style="max-width: 100%">
    <div class="card-header"><h5>Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h5></div>
    <div class="card-body">

      <p class="card-text">{!! $contract->deal->description7 !!}</p>
    </div>
  </div>




      <br>


    <div class="card bg-light mb-3" style="max-width: 100%">
  <div class="card-header"><h5>If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development) </h5></div>
  <div class="card-body">

    <p class="card-text">{!! $contract->deal->description8 !!}</p>
  </div>
</div>




    <br>


  <div class="card bg-light mb-3" style="max-width: 100%">
<div class="card-header"><h5>Any other notes for the project manager/technical team </h5></div>
<div class="card-body">

  <p class="card-text">{!! $contract->deal->description9 !!}</p>
</div>
</div>





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
  {{--  <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="d-flex">
            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">@lang('app.action')
                    <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                </button>
                <!-- DROPDOWN - INFORMATION -->
                <ul class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" tabindex="0">
                    @if (!$contract->signature && user()->id == $contract->client->id)
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

        <x-forms.button-cancel :link="route('contracts.index')" class="border-0">@lang('app.cancel')
        </x-forms.button-cancel>

    </div> --}}
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
