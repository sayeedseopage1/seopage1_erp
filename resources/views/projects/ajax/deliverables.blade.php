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
<!-- SweetAlert -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">



<div class="card border-0 invoice mt-5">
   <div class="col-md-12" align="right">
     @php

     $client= App\Models\User::where('id',$project->client_id)->first();
      $deal= App\Models\Deal::where('id',$project->deal_id)->first();
       $currency= App\Models\Currency::where('id',$deal->original_currency_id)->first();
     if($project->pm_id != null)
     {
     $pm = App\Models\User::where('id',$project->pm_id)->first();
     }else
     {
     $pm = '--';
     }
     @endphp
                  <td >
                      <table  class="inv-num-date text-dark f-13 mt-3">
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                  Client Name</td>
                              <td class="border-left-0">{{$client->name}}</td>
                          </tr>

                          <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                                Budget</td>
                            <td class="border-left-0">{{$project->deal->actual_amount}}{{$currency->currency_symbol}}
                            </td>
                        </tr>
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Project Manager</td>
                              <td class="border-left-0">
                                {{$pm->name}}
                              </td>
                          </tr>

                      </table>

                  </td>
</div>
  <?php
  $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
  //dd($project->updated_at);
  $accept_date= $project->updated_at;
  $current_time= \Carbon\Carbon::now();
  $diff_in_minutes = $current_time->diffInMinutes($accept_date);
  //dd( $diff_in_minutes);
  $pm_project= App\Models\PMProject::where('project_id',$project->id)->first();

   ?>
   @if($signature == null)
   @if($project->pm_id == Auth::id())
   @if($diff_in_minutes >1440 && $pm_project->deliverable_status == 0)

   <div class="col-md-2 mt-3">
    <button type="button" class="btn btn-primary"  disabled><i class="fas fa-plus"></i> Add Deliverable</button>
    </div>

<div class="col-md-12 mt-3">
<h6 class="text-red">You cannot add deliverables as 24 hours have been past since you accepted the project. For authorization to enable the feature <a href="#"  data-toggle="modal" data-target="#deliverableauthorization">click here</a> to send approval request to top management.</h6>
</div>
@include('projects.modals.deliverableauthorizationmodal')
   @else


   <div class="col-md-2 mt-3">
    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#deliverablesaddModal"><i class="fas fa-plus"></i> Add Deliverable</button>
    @include('projects.modals.clientdeliverableaddmodal')

</div>

   @endif


   @elseif(Auth::user()->role_id == 1)
   <div class="row">
   <div class="col-lg-8 col-10 mt-3 ml-3">
    <button type="button" class="btn btn-primary rounded f-14 p-2 my-3"  data-toggle="modal" data-target="#deliverablesaddModal"><i class="fas fa-plus"></i> Add Deliverable</button>
    @include('projects.modals.clientdeliverableaddmodal')
    @if($pm_project->deliverable_status == 0 && $pm_project->reason != null)
    <button type="button" class="btn btn-success rounded f-14 p-2 my-3"  data-toggle="modal" data-target="#deliverableextensionacceptmodal"><i class="fas fa-check"></i> Extend Time</button>
    @include('projects.modals.deliverableextensionacceptmodal')
    @endif
   @if(Auth::user()->role_id == 1 && $project->authorization_status == 'submitted')
{{--      <button type="button" class="btn btn-success rounded f-14 p-2 my-3"  data-id="{{ $project->id }}" id="acceptBtn">Authorization</button>--}}
           <button class="btn btn-success rounded f-14 p-2 my-3" type="button"  data-toggle="modal" data-target="#deliverablesfinalauthorizationacceptModal" aria-haspopup="true" aria-expanded="false" id="acceptBtn">Authorization</button>
           @include('projects.modals.deliverablefinalauthorizationacceptmodal')
   @endif


</div>

</div>




   @endif


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
                       <th scope="col" class="text-center">Milestone Cost</th>
                      <th scope="col" class="text-center">Estimation Hours</th>
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
                       @if($deliverable->milestone_id != null)
                    <td class="text-center">{{$deliverable->milestone->actual_cost}}{{$currency->currency_symbol}}</td>
                    @else
                    <td class="text-center">--</td>
                    @endif
                    @if($deliverable->estimation_time != null)
                    <td class="text-center">{{$deliverable->estimation_time}} hours</td>
                    @else
                    <td class="text-center">--</td>
                    @endif
                      <td class="text-center">{{$deliverable->quantity}}</td>
                        <td class="text-center">{!!$deliverable->description!!}</td>
                        @if($deliverable->to != null)
                    <td class="text-center">Between {{$deliverable->from}} & {{$deliverable->to}}</td>
                    @else
                    <td class="text-center">On {{$deliverable->from}}</td>

                    @endif
                    @if($signature == null)
                    <td class="text-center">
                      <button class="btn btn primary" data-toggle="modal" data-target="#deliverableseditModal{{$deliverable->id}}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn primary deleteDeliverable" data-id="{{ $deliverable->id }}"><i class="fas fa-trash"></i></button>
                        @if($deliverable->authorization == 0 && Auth::user()->role_id == 1)
                        <button class="btn btn-success" data-toggle="modal" data-target="#deliverablesapproveModal{{$deliverable->id}}">Approve</button>
                        @endif

                    </td>
                  @endif


                    </tr>
                    @if($signature == null)
                    @include('projects.modals.clientdeliverableeditmodal')
                      @include('projects.modals.clientdeliverabledeletemodal')
                      @include('projects.modals.clientdeliverableapprovemodal')
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
   @php
       $status_check= App\Models\PMProject::where('project_id',$project->id)->first();
   @endphp
   @if($status_check->deliverable_status == 1 && $project->deliverable_authorization == 1 && Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
    <div class="card-footer bg-white border-0 d-flex justify-content-start">

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
                          <a class="dropdown-item btn-copy" onclick="copyLink()" data-clipboard-text="{{$url}}/projects/agreement/{{$project->project_short_code}}"><i class="fa fa-copy mr-2"></i>Copy Link</a>
                    </li>
                </ul>
            </div>

        </div>
        <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
        </x-forms.button-cancel>

    </div>
    @else
    @if($project->authorization_status == 'pending')

    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="d-flex">
            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                <button class="dropdown-toggle btn-success text-white" type="button" data-id="{{$project->id}}" id="sendAuthorizationBtn">@lang('Send for Authorization')

                </button>

            </div>

        </div>



    </div>
    @else
    <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">

        <div class="d-flex">
            <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                <button disabled class="dropdown-toggle btn-warning" type="button"
                     aria-haspopup="true" aria-expanded="false">@lang('Awiating for approval')

                </button>

                <!-- DROPDOWN - INFORMATION -->

            </div>

        </div>



    </div>



    @endif
    @endif


    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->
<!-- SweetAlert -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>


<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>


<script type="text/javascript">

    function copyLink(){
        if ($('#window').dialog('isOpen')) {
            $('span.ui-button-icon.ui-icon.ui-icon-minusthick.minusthick').click()
        }
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

        const today = new Date(); // get current date
        const dp1 = datepicker('#from_add', {
            position: 'bl',
            minDate: today, // set minimum date to current date
            onSelect: (instance, date) => {
              dp2.setMin(date);
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#to_add', {
            position: 'bl',
            minDate: today, // set minimum date to current date
            onSelect: (instance, date) => {
               dp1.setMax(date);
            },
            ...datepickerConfig
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $('.deleteDeliverable').click(function(e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be delete this item!",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: '/projects/delete-deliverables/' + id,
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            'id':id,
                        },
                        success: function(response) {
                            if(response.status==400){
                                swal.fire({
                                    title: 'Deleted!',
                                    text: 'The item has been deleted successfully.',
                                    icon: 'success',
                                }).then(function() {
                                    window.location.reload();
                                });
                            }
                        },
                        error: function(response) {
                            swal.fire({
                                title: 'Error!',
                                text: 'An error occurred while deleting the item.',
                                icon: 'error',
                            });
                        }
                    });
                }
            });
        })
    })
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#sendAuthorizationBtn').click(function(e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            console.log(id);
            Swal.fire({
                title: 'Are You Sure You Want to send approval request?',
                showDenyButton: true,
                confirmButtonText: 'Send',
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    
                  //  $('#sendAuthorizationBtn').attr('disabled','disabld');
                    $("#sendAuthorizationBtn").attr("disabled", true);
                    $("#sendAuthorizationBtn").html("Processing...");


                    $.ajax({
                        url: '/projects/send-final-authorization-deliverables/' + id,
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            'id':id,
                        },
                        success: function(response) {
                            if(response.status==400){
                                Swal.fire('Authorization request send Successfully', '', 'success');
                                window.location.reload();
                            }
                        },
                    });
                }else if (result.isDenied) {
                    Swal.fire('Accept authorization are not saved', '', 'info')
                }
            });
        })
    })
</script>
