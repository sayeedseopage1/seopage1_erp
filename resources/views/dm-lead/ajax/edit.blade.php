@php
$viewLeadAgentPermission = user()->permission('view_lead_agents');
$viewLeadCategoryPermission = user()->permission('view_lead_category');
$viewLeadSourcesPermission = user()->permission('view_lead_sources');
$addLeadAgentPermission = user()->permission('add_lead_agent');
$addLeadSourcesPermission = user()->permission('add_lead_sources');
$addLeadCategoryPermission = user()->permission('add_lead_category');
@endphp
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form action="{{route('digital-marketing-lead-update')}}" method="post" id="update-lead">
          @csrf
          <input type="hidden" name="id" value="{{$lead->id}}">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.lead.leadDetails')</h4>

                <div class="row p-20">
                    <!-- PROJECT NAME START -->
                        <div class="col-lg-6">
                            <div class="form-group" required="required">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_name">Project Name
                                    <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project name from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <input type="text" class="form-control height-35 f-14 error" value="{{$lead->client_name}}" name="client_name" id="client_name" autocomplete="off" aria-invalid="true">
                                <label id="clientNameError" class="error text-danger" for="client_name"></label>
                            </div>
                        </div>
                        <!-- PROJECT NAME END -->
                    <!-- CLIENT COUNTRY START -->
                    <div class="col-lg-6">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="country">Client country
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the country name." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="country" id="country" data-live-search="true" class="form-control select-picker error" data-size="8">
                                @if($lead->country != null)
                                    <option selected value="{{$lead->country}}">{{$lead->country}}</option>
                                @endif
                                @foreach ($countries as $item)
                                    <option value="{{ $item->nicename }}">
                                        <span class="flag-icon flag-icon-al flag-icon-squared">{{ $item->iso3 }}</span>
                                        {{ $item->nicename }}
                                    </option>
                                @endforeach
                            </select>
                            <label id="countryError" class="error text-danger" for="country"></label>
                        </div>
                    </div>
                    <!-- CLIENT COUNTRY END -->
                    <!-- PROJECT LINK START -->
                    <div class="col-lg-4 col-md-4">
                        <div class="form-group " required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_link">Project Link
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project URL from the browser and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="url" class="form-control height-35 f-14" value="{{$lead->project_link}}" name="project_link" id="project_link" autocomplete="off">
                            <label id="projectLinkError" class="error text-danger" for="project_link"></label>
                        </div>
                    </div>
                    <!-- PROJECT LINK END -->
                    <!-- DEADLINE START -->
                    <div class="col-md-4 col-lg-4 mt-1" id="deadlineBox">
                        <label for="">Deadline <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the deadline you provided when placing the bid." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <input type="datetime-local" class="form-control height-35 f-14" value="{{ \Carbon\Carbon::parse($lead->deadline)->format('Y-m-d H:i') }}"  name="deadline" id="deadline" style="background: #ffffff;">
                        <label id="deadLineError" class="error text-danger" for="deadline"></label>
                    </div>
                    <!-- DEADLINE END -->
                    <!-- CURRENCY START -->
                    <?php
                    $currencies= App\Models\Currency::all();

                    ?>
                    <div class="col-md-4 col-lg-4">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency</label>
                            <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Select the currency from Freelancer.com based on the project currency." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                            <div class="select-others height-35 rounded">
                                <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker">
                                    <select class="form-control height-35 f-14 select-picker" name="original_currency_id" id="original_currency_id">
                                        @if($lead->original_currency_id != null)
                                            <?php
                                            $currency_id= App\Models\Currency::where('id',$lead->original_currency_id)->first();
                                            ?>
                                            <option selected value="{{$lead->original_currency_id}}">  {{ $currency_id->currency_code . ' (' . $currency_id->currency_symbol . ')' }}</option>
                                        @endif
                                        @foreach ($currencies as $currency)
                                            <option value="{{ $currency->id }}">
                                                {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                            </option>
                                        @endforeach
                                    </select>
                                    <label id="currencyError" class="error text-danger" for="currency"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CURRENCY END -->
                    <!-- PROJECT BUDGET START -->
                    <div class="col-md-5 mt-3" id="set-time-estimate-fields">
                        <label for="">Project Budget <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project budget from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="bid_value" min="1" id="bid_value" value="{{$lead->bid_value}}" autocomplete="off">
                                    <label id="bidValueError" class="error text-danger" for="bid_value"></label>
                                </div>
                                <div class="col-md-6">
                                    <input type="number" name="bid_value2" class="form-control height-35 f-14 border rounded p-2 error" id="bid_value2" value="{{$lead->bid_value2}}" autocomplete="off">
                                    <label id="bidValue2Error" class="error text-danger" for="bid_value2"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- PROJECT BUDGET END -->
                    <!-- BID VALUE START -->
                    <div class="col-md-2 mt-3" id="set-time-estimate-fields">
                        <label for="">Bid Value <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the bid value." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="value" min="1" id="value" value="{{$lead->actual_value}}" autocomplete="off">
                                    <label id="valueError" class="error text-danger" for="value"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- BID VALUE END -->
                    <!-- PROJECT ID START -->
                    @if ($lead->project_id)
                    <div class="col-md-5" style="margin-top: 12px;">
                        <div class="form-group" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_id">Project Id
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project id from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14 @error('project_id') is-invalid @enderror" placeholder="Type project id from Freelancer.com." value="{{$lead->project_id}}" name="project_id" id="project_id" autocomplete="off" aria-invalid="true">
                            @error('project_id')
                            <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>
                    @else
                    <div class="col-md-5" style="margin-top: 12px;">
                        <label for="">Total Spent
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the total spent." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="total_spent" id="total_spent" value="{{$lead->total_spent}}" autocomplete="off">
                                    <label id="total_spentError" class="error" for="total_spent"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endif
                    <!-- PROJECT ID END -->
                    <div class="col-md-6 my-3">
                        <label for="">Project Type <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Collect the bidding delay time from Freelancer.com and enter the exact delay time here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row">
                                        <div class="form-check">
                                            <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="fixed" id="project_type" @if($lead->project_type == 'fixed') checked @endif>
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Fixed Project
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="hourly" id="project_type" @if($lead->project_type == 'hourly') checked @endif>
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                Hourly Project
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Lead Source -->
                    <div class="col-lg-6" style="margin-top: 13px;">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="lead_source">Lead Source
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Select the lead source name." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="lead_source" id="lead_source" data-live-search="true" class="form-control select-picker error" data-size="8" onchange="handleLeadSourceChange()">
                                <option value="">--</option>
                                    <option value="Upwork.com" {{$lead->lead_source=='Upwork.com' ? 'selected' : ''}}>Upwork.com</option>
                                    <option value="Freelancer.com" {{$lead->lead_source=='Freelancer.com' ? 'selected' : ''}}>Freelancer.com</option>
                            </select>
                            <label id="lead_sourceError" class="error" for="lead_source"></label>
                        </div>
                    </div>
                    <!-- Lead Source END -->

                    <!-- PROJECT DESCRIPTION START -->
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="descriptionText">Project Description
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project description from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description" id="descriptionText" class="form-control  @error('description') is-invalid @enderror">{!!$lead->note!!}</textarea>
                           <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            @error('description')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <!-- PROJECT DESCRIPTION END -->
                    <!-- COVER LETTER START -->
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="coverLetterText">Cover Letter
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the cover letter you submitted when placing the bid and paste it here. Do not forget to format it (If needed)." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="cover_letter" id="coverLetterText" class="form-control  @error('cover_letter') is-invalid @enderror">{!!$lead->cover_letter!!}</textarea>
                            <script>
                                CKEDITOR.replace('cover_letter');
                            </script>
                            @error('cover_letter')
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <!-- COVER LETTER END -->
                </div>
                <div class="row p-20">
                </div>
                <button type="submit" class="btn btn-primary" id="updateBtn">Update</button>
            </div>
        </form>

    </div>
</div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    const form = document.getElementById('update-lead');
    const button = document.getElementById('updateBtn');
    const nameField = document.getElementById('client_name');
    const country = document.getElementById('country');
    const projectLink = document.getElementById('project_link');
    const deadline = document.getElementById('deadline');
    const currency = document.getElementById('original_currency_id');
    const bid_value = document.getElementById('bid_value');
    const bid_value2 = document.getElementById('bid_value2');
    const value = document.getElementById('value');
    const insight_screenshot = document.getElementById('insight_screenshot');
    const projectpage_screenshot = document.getElementById('projectpage_screenshot');


    form.addEventListener('input', () => {
        let valid = true;
        if (nameField.value.trim() === '') {
            valid = false;
            clientNameError.textContent = 'Please enter the project name!';
        } else {
            clientNameError.textContent = '';
        }
        if (country.value.trim() === '') {
            valid = false;
            countryError.textContent = 'Please select client country!';
        } else {
            countryError.textContent = '';
        }
        if (projectLink.value.trim() === '') {
            valid = false;
            projectLinkError.textContent = 'Please enter correct project link (Freelancer.com) with https!';
        } else {
            projectLinkError.textContent = '';
        }
        if (deadline.value.trim() === '') {
            valid = false;
            deadLineError.textContent = 'Please select project deadline from Freelancer.com!';
        } else {
            deadLineError.textContent = '';
        }
        if (currency.value.trim() === '') {
            valid = false;
            currencyError.textContent = 'Please select correct currency!';
        } else {
            currencyError.textContent = '';
        }
        if (bid_value.value.trim() === '') {
            valid = false;
            bidValueError.textContent = 'Please enter minimum project budget!';
        } else {
            bidValueError.textContent = '';
        }
        if (bid_value2.value.trim() === '') {
            valid = false;
            bidValue2Error.textContent = 'Please enter maximum project budget!';
        } else {
            bidValue2Error.textContent = '';
        }
        if (value.value.trim() === '') {
            valid = false;
            valueError.textContent = 'Please enter bid value!';
        } else {
            valueError.textContent = '';
        }
        if (insight_screenshot.value.trim() === '') {
            valid = false;
            insightScreenshotError.textContent = 'Please enter project insight page screenshot link (Freelancer.com) with https!';
        } else {
            insightScreenshotError.textContent = '';
        }
        if (projectpage_screenshot.value.trim() === '') {
            valid = false;
            projectpageScreenshotError.textContent = 'Please enter project page screenshot link (Freelancer.com) with https!';
        } else {
            projectpageScreenshotError.textContent = '';
        }

        button.disabled = !valid;
    });
</script>
<script>
    flatpickr("#deadline", {
        // enableTime: true,
        dateFormat: "Y-m-d",
    });
    $("#updateBtn").on('click',function() {
        $("#updateBtn").html("Processing...");
    });
</script>
