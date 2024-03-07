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
        .collapsing {
            position: relative;
            height: 0;
            overflow: hidden;
            transition: height 0.50s cubic-bezier(.95,-0.1,.47,1.18);
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
<?php
$deliverables= App\Models\ProjectDeliverable::where('project_id',$project->id)->get();
$countries = App\Models\Country::all();

 ?>

<body id="body" class="h-100 bg-additional-grey">
    @if($project->hasClientDisagree())
    <div class="row vh-100">
        <div class="col-12 text-center my-auto">
            <h2>Project Manager Working with this Delivarables, Please Stay Connected </h2><br>
            <span class="text-danger f-20 f-w-500">Thankyou</span>
        </div>
    </div>
    @else
    <div class="content-wrapper container">

        <div class="card border-0 invoice">
            <!-- CARD BODY START -->
            <div class="card-body">
                <div class="invoice-table-wrapper">
                    <table width="100%" class="">
                        <tr class="inv-logo-heading">
                            <td><img src="{{ invoice_setting()->logo_url }}" alt="{{ mb_ucwords(global_setting()->company_name) }}"
                                    class="logo" style="height:70px;"/></td>
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
                                          @lang('Project Name')</td>
                                      <td class="border-left-0 text-capitalize">{{ $project->project_name }}
                                      </td>
                                  </tr>
                                    @if($project->project_type != null)
                                  <tr>
                                      <td class="bg-light-grey border-right-0 f-w-500">
                                          @lang('Project Type')</td>
                                      <td class="border-left-0">{{ $project->project_type->category_name}}
                                      </td>
                                  </tr>
                                  @endif
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
                                        @if($project->clientdetails->company_name)
                                        {{ mb_ucwords($project->clientdetails->company_name) }}<br>
                                        @endif
                                        {{ mb_ucwords($project->client->name) }}<br>
                                        {{ mb_ucwords($project->client->email) }}<br>


                            </td>

                        </tr>
                        <tr>
                            <td height="30"></td>
                        </tr>
                    </table>
                </div>

                <div class="d-flex flex-column">

                    <p class="f-15 text-black">Scope of Work: Seopage1.net agrees to perform (Website Design Development) and
                      related services specified on this Agreement ("Project Deliverables").</p>
                  <h5>@lang('app.subject')</h5>
                    <p class="f-15 text-black text-capitalize">Agreement for Project: {{ $project->project_name }}</p>

                  <h5>@lang('Project Deliverables')</h5>

                  <td width="100%">
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
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($deliverables as $deliverable)
                            <tr>
                                <td>{{$loop->index+1}}</td>
                                <td>{{$deliverable->deliverable_type}}</td>
                                <td>{{$deliverable->title}}</td>
                                @if($deliverable->milestone_id != null)
                                    <td>{{$deliverable->milestone->milestone_title}}</td>
                                @else
                                    <td>--</td>
                                @endif
                                <td>{{$deliverable->quantity}}</td>
                                <td>{!!$deliverable->description!!}</td>
                                @if($deliverable->to != null)
                                    <td class="text-center">Between {{$deliverable->from}} & {{$deliverable->to}}</td>
                                @else
                                    <td class="text-center">On {{$deliverable->from}}</td>
                                @endif
                            </tr>

                            @empty
                            <tr>
                                No Data
                            </tr>
                            @endforelse
                        </tbody>

                      </table>

                  </td>
                  @if ($project->project_budget != 0)
                      <div class="text-right pt-3 border-top">
                          <h4>@lang('Project Budget'):
                                {{$project->deal->actual_amount+ $project->deal->upsell_actual_amount}}({{$project->deal->original_currency->currency_code}})</h4>
                      </div>
                  @endif

                </div>

                @if ($project->signature)
                       <div class="d-flex flex-column">
                           <h6>@lang('modules.estimates.signature')</h6>
                           <img src="{{ $project->signature->signature }}" style="width: 200px;">
                            <p>{{ $project->signature->full_name }}</p>
                           <p>Date: {{ ($project->signature->created_at)->format('d-m-Y') }}</p>
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

                <!-- <x-forms.button-cancel :link="route('projects.index')" class="border-0 mr-3">@lang('app.cancel')
                </x-forms.button-cancel> -->

                <div class="d-flex">
                    <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">

                        <!-- DROPDOWN - INFORMATION -->
                          <div class="row">
                            @if (!$project->signature)
                                <li>
                                    <a class="f-14 btn btn-primary" href="javascript:;" data-toggle="modal"
                                        data-target="#signature-modal">
                                        <i class="fa fa-check f-w-500  mr-2 f-12"></i>
                                        @lang('Click to Sign')
                                    </a>
                                </li>
                                <li>
                                    <a class="f-14 btn btn-warning p-2 mx-3" href="javascript:;" data-toggle="modal" data-target="#disagreeModal">
                                        <i class="fa fa-times-circle f-w-500  mr-2 f-12"></i>
                                        @lang('Need Changes')
                                    </a>
                                </li>
                            @endif
                            <li>
                                <a class="f-14 btn btn-secondary ml-2"
                                    href="{{ route('front.project.download', $project->id) }}">
                                    <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                                </a>
                            </li>
                        </div>
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
    <div class="modal fade" id="disagreeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <form method="post" action="{{route('front.agreement.disagree', $project->project_short_code)}}">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disagree Modal</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <table class="inv-num-date text-dark f-13 mt-3 table">
                                    <thead>
                                        <tr class="bg-light-grey border-right-0 f-w-500">
                                            <th scope="col" class="text-center">#</th>
                                            <th scope="col" class="text-center">Type</th>
                                            <th scope="col" class="text-center">Title</th>
                                            <th scope="col" class="text-center">Milestone</th>
                                            <th scope="col" class="text-center">Quantity</th>
                                            <th scope="col" class="text-center">Description</th>
                                            <th scope="col" class="text-center">Estimated completion date</th>
                                            <th scope="col" class="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse($deliverables as $deliverable)
                                        <tr>
                                            <td>{{$loop->index+1}}</td>
                                            <td>{{$deliverable->deliverable_type}}</td>
                                            <td>{{$deliverable->title}}</td>
                                            @if($deliverable->milestone_id != null)
                                                <td>{{$deliverable->milestone->milestone_title}}</td>
                                            @else
                                                <td>--</td>
                                            @endif
                                            <td>{{$deliverable->quantity}}</td>
                                            <td>{!!$deliverable->description!!}</td>
                                            @if($deliverable->to != null)
                                                <td class="text-center">Between {{$deliverable->from}} & {{$deliverable->to}}</td>
                                            @else
                                                <td class="text-center">On {{$deliverable->from}}</td>
                                            @endif
                                            <td>
                                                <a class="btn btn-warning float-right" data-toggle="collapse" data-target="#row{{$deliverable->id}}">Add comment</a>
                                            </td>
                                        </tr>
                                        <tr id="row{{$deliverable->id}}" class="collapse">
                                            <td colspan="8" class="px-0">
                                                <div class="from-group">
                                                    <label class="f-16 font-weight-bold pt-2 px-1">Write your comment below</label>
                                                    <textarea class="form-control" id="comment{{$deliverable->id}}" rows="4" name="comment[{{$deliverable->id}}]"></textarea>
                                                </div>
                                            </td>
                                        </tr>
                                        @empty
                                        <tr>
                                            No Data
                                        </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
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
            window.location.href = "{{ route('front.project.download', [$project->id]) }}";
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
            var phone_no = $('#phone_no').val();
            var country_code = $('#country_code').val();
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
                url: "{{ route('front.project.sign', $project->id) }}",
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
                    phone_no: phone_no,
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
    <script>
        $(document).ready(function() {
            var limit = {{$deliverables->count()}};
            console.log(limit, $('.parent-row .row').length);
            $('.add-row').unbind().click(function() {
                if ($('.parent-row .row').length <= limit -1) {
                    var length = $('.parent-row .row').length + 1;
                    var html = '<div class="row"><div class="col-sm-4"><div class="form-group"><select class="form-control height-50 w-100" name="deliverable['+length+']"><option value="">Select column</option><option value="type">Type</option><option value="title">Title</option><option value="milestone_cost">Milestone Cost</option><option value="estimation_time">Estimation Hours</option><option value="quantity">Quantity</option><option value="description">Description</option><option value="estimation_completed_date">Estimated completion date</option></select></div></div><div class="col-sm-7"><div class="form-group"><textarea class="form-control" name="comment['+length+']"></textarea></div></div><div class="col-sm-1"> <button type="button" class="btn btn-danger height-50 remove-row">-</button></div></div>';
                    $('.parent-row').append(html);
                }
            });
            // remove row
            $('.parent-row').on('click', '.remove-row', function() {
                $(this).closest('.row').remove();
            });
        })
    </script>
    @endif
</body>

</html>
