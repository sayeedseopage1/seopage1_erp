@extends('layouts.app')
@section('content')
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style type="text/css">
    .existingClientSuccess {
        background: #fff !IMPORTANT;
        color: green !important;
        border-radius: 50%;
    }
</style>
@php
    $client= \App\Models\User::where('id',$client_id)->first();
    $deal = \App\Models\Deal::where('client_id',$client_id)->first();
    $lead = \App\Models\Lead::where('id',$deal->lead_id)->first();
@endphp
<div class="container-fluid">
<div class="row">
    <div class="col-sm-12 mt-3">
        <form action="#" method="post" id="createDeal">
            @csrf
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Create Deal')</h4>
                <div class="row p-20">
                    <div class="col-lg-6 col-md-6" id="client-username">
                        <div class="form-group my-3" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_username">Client Username
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Username" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14  client-search" placeholder="Enter Client Username" value="{{ $client->user_name }}" name="client_username" id="client_username" autocomplete="off" readonly>

                            <label id="clientUsernameError" class="error text-danger" for="client_username"></label>


                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="form-group my-3" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_name">Client Name
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Name" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="typeahead form-control height-35 f-14" placeholder="Enter Client Name" value="{{ $client->name }}" name="client_name" id="client_name" autocomplete="off" readonly>
                            <label id="clientNameError" class="error text-danger" for="client_name"></label>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6">
                        <div class="form-group my-3" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_name">Project Name
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project name from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" value="" name="project_name" id="project_name" autocomplete="off">
                            <label id="projectNameError" class="error text-danger" for="project_name"></label>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="form-group my-3" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_link">Project Link
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project URL from the browser and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            @if ($lead != null)
                                <input type="text" class="form-control height-35 f-14" placeholder="Enter Project Link" value="{{ $lead->project_link }}" name="project_link" id="project_link" autocomplete="off">
                            @else
                                <input type="text" class="form-control height-35 f-14" placeholder="Enter Project Link" value="" name="project_link" id="project_link" autocomplete="off">
                            @endif
                            <label id="projectLinkError" class="error text-danger" for="project_link"></label>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <div class="form-group my-3 mr-0 mr-lg-2 mr-md-2">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_type">Project Type
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project type from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="form-check">
                                                <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="fixed" id="project_type">
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Fixed Project
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="hourly" id="project_type">
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Hourly Project
                                                </label>
                                            </div>
                                        </div>
                                        <label id="project_typeError" class="error text-danger mt-2" for="descriptionText"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4">
                        <div class="form-group my-3 mr-0 mr-lg-2 mr-md-2">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="amount">Upsell Project Budget
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the upsell project budget from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14" placeholder="" value="" name="amount" id="amount" autocomplete="off">
                            <label id="amountError" class="error text-danger" for="amount"></label>
                        </div>
                    </div>
                    <?php
                    $currencies= App\Models\Currency::all();

                    ?>
                    <div class="col-md-4 col-lg-4 mt-3 ">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency</label>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Select the currency from Freelancer.com based on the project currency." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                            <div class="select-others height-35 rounded">
                                <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker">
                                    <select class="form-control height-35 f-14 select-picker" name="original_currency_id" id="original_currency_id">
                                        <option selected>--</option>
                                        @foreach ($currencies as $currency)
                                        @if ($lead != null)
                                            <option value="{{ $currency->id }}" {{ $lead->original_currency_id == $currency->id ? 'selected' : '' }}>{{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}</option>
                                        @else
                                            <option value="{{ $currency->id }}" {{ $deal->original_currency_id == $currency->id ? 'selected' : '' }}>{{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}</option>
                                        @endif
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="description">Project Description
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project description from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description" id="description" class="form-control"></textarea>
                            <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            <label id="descriptionError" class="error text-danger" for="description"></label>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="comments">Cover Letter
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the cover letter you submitted when you closing the deal and paste it here. Do not forget to format it (if needed)." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="comments" id="comments" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('comments');
                            </script>
                            <label id="commentsError" class="error text-danger" for="comments"></label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <button type="submit" class="btn btn-primary" id="submitButton">Create Deal</button>
                </div>
                <br>
                <br>
            </div>
        </form>

    </div>
</div>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
<script>
    // Get the radio buttons and amount input field
    const projectTypeRadio = document.getElementsByName('project_type');
    const amountInput = document.getElementById('amount');

    for (let i = 0; i < projectTypeRadio.length; i++) {
        projectTypeRadio[i].addEventListener('change', function() {
            if (this.value === 'hourly') {
                amountInput.readOnly = true;
                amountInput.value = '0';
            } else {
                amountInput.readOnly = false;
                amountInput.value = '';
            }
        });
    }
</script>
<script>
    $('#submitButton').click(function(e){
        e.preventDefault();
        $("#submitButton").attr("disabled", true);
        $("#submitButton").html("Processing...");
        var description = CKEDITOR.instances.description.getData();
        var comments = CKEDITOR.instances.comments.getData();
        var project_type = $('input[name="project_type"]:checked').val();
        var data= {
            '_token': "{{ csrf_token() }}",
            'client_username': document.getElementById("client_username").value,
            'client_name': document.getElementById("client_name").value,
            'project_name': document.getElementById("project_name").value,
            'project_link': document.getElementById("project_link").value,
            'project_type': project_type,
            'amount': document.getElementById("amount").value,
            'original_currency_id': document.getElementById("original_currency_id").value,
            'description': description,
            'comments': comments,
            'pm_id': {{ Auth::user()->role_id }},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-client-deal')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                window.location.href = response.redirectUrl;
                toastr.success('Deal Added Successfully');
                $('#submitButton').attr("disabled", false);
                $('#submitButton').html("Create Deal");
            },
            error: function(error) {
                if(error.responseJSON.errors.client_username){
                    $('#clientUsernameError').text(error.responseJSON.errors.client_username);
                }else{
                    $('#clientUsernameError').text('');
                }
                if(error.responseJSON.errors.client_name){
                    $('#clientUsernameError').text(error.responseJSON.errors.client_name);
                }else{
                    $('#clientUsernameError').text('');
                }
                if(error.responseJSON.errors.project_name){
                    $('#projectNameError').text(error.responseJSON.errors.project_name);
                }else{
                    $('#projectNameError').text('');
                }
                if(error.responseJSON.errors.project_link){
                    $('#projectLinkError').text(error.responseJSON.errors.project_link);
                }else{
                    $('#projectLinkError').text('');
                }
                if(error.responseJSON.errors.project_type){
                    $('#project_typeError').text(error.responseJSON.errors.project_type);
                }else{
                    $('#project_typeError').text('');
                }
                if(error.responseJSON.errors.amount){
                    $('#amountError').text(error.responseJSON.errors.amount);
                }else{
                    $('#amountError').text('');
                }
                if(error.responseJSON.errors.description){
                    $('#descriptionError').text(error.responseJSON.errors.description);
                }else{
                    $('#descriptionError').text('');
                }
                if(error.responseJSON.errors.comments){
                    $('#commentsError').text(error.responseJSON.errors.comments);
                }else{
                    $('#commentsError').text('');
                }
                $('#submitButton').attr("disabled", false);
                $('#submitButton').html("Create Deal");
            }
        });
    });
</script>
@endsection
