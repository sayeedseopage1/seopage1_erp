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


<div class="card border-0 invoice mt-5">
  <?php
  $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
   ?>
   @if($signature == null)
  <div class="col-md-2 mt-3">
      <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#deliverablesaddModal"><i class="fas fa-plus"></i> Add Deliverable</button>
  </div>
  @include('projects.modals.clientdeliverableaddmodal')
  @endif
    <!-- CARD BODY START -->
    <div class="card-body">


        <div class="d-flex flex-column">




          <h5>@lang('Project Deliverables')</h5>

          <td width="80%">
              <table class="inv-num-date text-dark f-13 mt-3">
                <thead>
                    <tr class="bg-light-grey border-right-0 f-w-500">
                      <th scope="col" class="text-center">#</th>
                      <th scope="col" class="text-center">Type</th>
                      <th scope="col" class="text-center">Title</th>
                      <th scope="col" class="text-center">Milestone</th>
                      <th scope="col" class="text-center">Quantity</th>
                      <th scope="col" class="text-center">Description</th>
                      <th scope="col" class="text-center">Estimated completion date</th>
                      @if($signature == null)
                      <th scope="col" class="text-center">Action</th>
                      @endif


                    </tr>
                  </thead>
                  <tbody >
                    @forelse($deliverables as $deliverable)
                    <tr>
                      <td>{{$loop->index+1}}</td>
                    <td class="text-center">{{$deliverable->deliverable_type}}</td>
                    <td class="text-center">{{$deliverable->title}}</td>
                    @if($deliverable->milestone_id != null)
                    <td class="text-center">{{$deliverable->milestone->milestone_title}}</td>
                    @else 
                    <td class="text-center">--</td>
                    @endif
                      <td class="text-center">{{$deliverable->quantity}}</td>
                        <td class="text-center">{{$deliverable->description}}</td>
                        @if($deliverable->to != null)
                    <td class="text-center">Between {{$deliverable->from}} & {{$deliverable->to}}</td>
                    @else 
                    <td class="text-center">On {{$deliverable->from}}</td>

                    @endif
                    @if($signature == null)
                    <td class="text-center">
                      <button class="btn btn primary" data-toggle="modal" data-target="#deliverableseditModal{{$deliverable->id}}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn primary" data-toggle="modal" data-target="#deliverablesdeleteModal{{$deliverable->id}}"><i class="fas fa-trash"></i></button>

                    </td>
                  @endif


                    </tr>
                    @if($signature == null)
                    @include('projects.modals.clientdeliverableeditmodal')
                      @include('projects.modals.clientdeliverabledeletemodal')
                      @endif
                    @empty
                    <tr>
                        No Data
                    </tr>



                    @endforelse






                  </tbody>

              </table>
          </td>



        </div>
        <div class="mt-3">

                    @if ($project->signature)
                           <div class="d-flex flex-column">
                               <h6>@lang('Client Signature')</h6>
                               <img src="{{ $project->signature->signature }}" style="width: 200px;">
                                 <p>{{ $project->signature->full_name }}</p>
                              <p>Date: {{ ($project->signature->created_at)->format('d-m-Y') }}</p>
                           </div>
                       @endif
        </div>






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


                  <?php
                  $url= url('/');
                   ?>
                    <li>
                        <a class="dropdown-item f-14 text-dark"
                            href="{{ route('projects.download', $project->id) }}">
                            <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                        </a>
                        <!-- <a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="route('front.agreement', $project->project_short_code)"><i class="fa fa-copy mr-2"></i>Copy Link</a> -->
                          <a class="dropdown-item btn-copy"  onclick="copyLink()"  data-clipboard-text="{{$url}}/projects/agreement/{{$project->project_short_code}}"><i class="fa fa-copy mr-2"></i>Copy Link</a>
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
<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script type="text/javascript">
function copyLink(){
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
}
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
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }
        const dp3 = datepicker('#from', {
            position: 'bl',

            onSelect: (instance, date) => {
              dp4.setMin(date);
            },
            ...datepickerConfig
        });
        const dp4 = datepicker('#to', {
            position: 'bl',

            onSelect: (instance, date) => {
               dp3.setMax(date);
            },
            ...datepickerConfig
        });
      });
</script>

