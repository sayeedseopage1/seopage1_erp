@php
    $viewLeadAgentPermission = user()->permission('view_lead_agents');
    $viewLeadCategoryPermission = user()->permission('view_lead_category');
    $viewLeadSourcesPermission = user()->permission('view_lead_sources');
    $addLeadAgentPermission = user()->permission('add_lead_agent');
    $addLeadSourcesPermission = user()->permission('add_lead_sources');
    $addLeadCategoryPermission = user()->permission('add_lead_category');
    $addLeadNotePermission = user()->permission('add_lead_note');
@endphp
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<style>
    label.error {
        color: #dc3545;
        font-size: 14px;
    }
</style>
<div class="row">

    <div class="col-sm-12">

        <form action="{{route('store-lead')}}" id="store-lead" method="post">
            @csrf

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
                            <input type="text" class="form-control height-35 f-14 error" placeholder="Type project name from Freelancer.com." value="" name="client_name" id="client_name" autocomplete="off" aria-invalid="true">
                            <label id="clientNameError" class="error" for="client_name"></label>
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
                                <option value="">--</option>
                                @foreach ($countries as $item)
                                    <option value="{{ $item->nicename }}">
                                        <span class="flag-icon flag-icon-al flag-icon-squared">{{ $item->iso3 }}</span>
                                        {{ $item->nicename }}
                                    </option>
                                @endforeach
                            </select>
                            <label id="countryError" class="error" for="country"></label>
                        </div>
                    </div>
                    <!-- CLIENT COUNTRY END -->
                    <!-- PROJECT LINK START -->
                    <div class="col-lg-6 col-md-6">
                        <div class="form-group " required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_link">Project Link
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project URL from the browser and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="url" class="form-control height-35 f-14" placeholder="Copy the project URL from the browser and paste it here." value="" name="project_link" id="project_link" autocomplete="off">
                            <label id="projectLinkError" class="error" for="project_link"></label>
                        </div>
                    </div>
                    <!-- PROJECT LINK END -->
                    <!-- CURRENCY START -->
                    <?php
                    $currencies= App\Models\Currency::all();

                    ?>
                    <div class="col-md-6 col-lg-6">
                        <div class="form-group c-inv-select mb-lg-0 mb-md-0 mb-4">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="original_currency_id">Currency</label>
                            <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Select the currency from Freelancer.com based on the project currency." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                            <div class="select-others height-35 rounded">
                                <div class="dropdown bootstrap-select form-control height-35 f-14 select-picker">
                                    <select class="form-control height-35 f-14 select-picker" name="original_currency_id" id="original_currency_id">
                                        <option value="">--</option>
                                        @foreach ($currencies as $currency)
                                            <option value="{{ $currency->id }}">
                                                {{ $currency->currency_code . ' (' . $currency->currency_symbol . ')' }}
                                            </option>
                                        @endforeach
                                    </select>
                                    <label id="currencyError" class="error" for="currency"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CURRENCY END -->
                    <div class="col-md-4 mt-3">
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
                                            <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="fixed" id="project_type1" onclick="showDeadline()">
                                            <label class="form-check-label" for="project_type1">
                                                Fixed Project
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="project_type" value="hourly" id="project_type2" onclick="hideDeadline()">
                                            <label class="form-check-label" for="project_type2">
                                                Hourly Project
                                            </label>
                                        </div>
                                    </div>
                                    <label id="project_typeError" class="error" for="descriptionText"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- DEADLINE START -->
                    <div class="col-md-4 col-lg-4 mt-3" id="deadlineBox">
                        <label for="">Deadline <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the deadline you provided when placing the bid." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <input type="datetime-local" class="form-control height-35 f-14" name="deadline" id="deadline" placeholder="mm/dd/yyyy" style="background: #ffffff;">
                        <label id="deadLineError" class="error" for="deadline"></label>
                    </div>
                    <!-- DEADLINE END -->
                    <!-- PROJECT BUDGET START -->
                    <div class="col-md-4 mt-3" id="set-time-estimate-fields">
                        <label for="" id="projectBudgetLabel">Project Budget <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project budget from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="bid_value" min="1" id="bid_value" placeholder="Minimum" autocomplete="off">
                                    <label id="bidValueError" class="error" for="bid_value"></label>
                                </div>
                                <div class="col-md-6">
                                    <input type="number" name="bid_value2" class="form-control height-35 f-14 border rounded p-2 error" id="bid_value2" placeholder="Maximum" autocomplete="off">
                                    <label id="bidValue2Error" class="error" for="bid_value2"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- PROJECT ID START -->
                    <div class="col-lg-4" id="projectIdBox" style="display: none; margin-top: 12px;">
                        <div class="form-group" required="required">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_id">Project Id
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project id from Freelancer.com. The project id must be a number." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <input type="text" class="form-control height-35 f-14 error" placeholder="Type project id from Freelancer.com." value="" name="project_id" id="project_id" autocomplete="off" aria-invalid="true">
                            <label id="project_idError" class="error" for="project_id"></label>
                        </div>
                    </div>
                    <!-- PROJECT ID END -->
                    <!-- PROJECT BUDGET END -->
                    <!-- BID VALUE START -->
                    <div class="col-md-6 mt-3" id="set-time-estimate-fields">
                        <label for="">Bid Value <span style="color:red;">*</span>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the bid value." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="value" min="1" id="value" placeholder="" autocomplete="off">
                                    <label id="valueError" class="error" for="value"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- BID VALUE END -->
                    <!-- Total spent START -->
                    <div class="col-md-6 mt-3" id="totalSpentBox">
                        <label for="">Total Spent
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the total spent." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="number" class="form-control border rounded p-2 height-35 f-14 error" name="total_spent" id="total_spent" placeholder="" autocomplete="off">
                                    <label id="total_spentError" class="error" for="total_spent"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Total spent END -->
                    <!-- PROJECT DESCRIPTION START -->
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group">
                            <label class="text-dark-grey" data-label="true" for="descriptionText">Project Description
                                <sup class="mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project description from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description" id="descriptionText" class="form-control"></textarea>
                           <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                            <script>
                                CKEDITOR.replace('description');
                            </script>
                            <label id="descriptionError" class="error" for="descriptionText"></label>
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
                            <textarea name="cover_letter" id="coverLetterText" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('cover_letter');
                            </script>
                            <label id="coverLetterError" class="error" for="coverLetterText"></label>
                        </div>
                    </div>
                </div>

                <div class="row p-20 d-none" id="other-details">

                </div>
                <div class="col-lg-4 col-md-6">
                    <button type="button" class="btn btn-primary" id="submit-button"><span class="btn-txt">Create Lead<span></button>
                </div>
                <br>
                <br>
            </div>
        </form>

    </div>
</div>




<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
<script>
    function showDeadline() {
        document.getElementById("deadlineBox").style.display = "block";
        document.getElementById("projectIdBox").style.display = "none";
        document.getElementById("totalSpentBox").style.display = "block";
        document.getElementById("projectBudgetLabel").textContent = "Project Budget";
    }

    function hideDeadline() {
        document.getElementById("deadlineBox").style.display = "none";
        document.getElementById("projectIdBox").style.display = "block";
        document.getElementById("totalSpentBox").style.display = "none";
        document.getElementById("projectBudgetLabel").textContent = "Hourly Rate";
    }
</script>
<script>
    $('#submit-button').click(function(e){
        e.preventDefault();
        $('#submit-button').attr("disabled", true);
        $('#submit-button').html("Processing...");
        var description = CKEDITOR.instances.descriptionText.getData();
        var coverLetter = CKEDITOR.instances.coverLetterText.getData();
        var project_type = $('input[name="project_type"]:checked').val();
        var data= {
            '_token': "{{ csrf_token() }}",
            'client_name': document.getElementById("client_name").value,
            'project_id': document.getElementById("project_id").value,
            'country': document.getElementById("country").value,
            'project_link': document.getElementById("project_link").value,
            'deadline': document.getElementById("deadline").value,
            'original_currency_id': document.getElementById("original_currency_id").value,
            'bid_value': document.getElementById("bid_value").value,
            'bid_value2': document.getElementById("bid_value2").value,
            'value': document.getElementById("value").value,
            'total_spent': document.getElementById("total_spent").value,
            'description': description,
            'cover_letter': coverLetter,
            'project_type': project_type,
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('digital-marketing-lead.store')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#store-lead').trigger("reset");
                $('.error').html("");
                $(location).prop('href', '{{route('digital-marketing-lead.index')}}');
                toastr.success('Lead Added Successfully');
                $('#submit-button').attr("disabled", false);
                $('#submit-button').html("Create Lead");
            },
            error: function(error) {
                if(error.responseJSON.errors.client_name){
                    $('#clientNameError').text(error.responseJSON.errors.client_name);
                }else{
                    $('#clientNameError').text('');
                }
                if(error.responseJSON.errors.project_id){
                    $('#project_idError').text(error.responseJSON.errors.project_id);
                }else{
                    $('#project_idError').text('');
                }
                if(error.responseJSON.errors.project_type){
                    $('#project_typeError').text(error.responseJSON.errors.project_type);
                }else{
                    $('#project_typeError').text('');
                }
                if(error.responseJSON.errors.country){
                    $('#countryError').text(error.responseJSON.errors.country);
                }else{
                    $('#countryError').text('');
                }
                if(error.responseJSON.errors.project_link){
                    $('#projectLinkError').text(error.responseJSON.errors.project_link);
                }else{
                    $('#projectLinkError').text('');
                }
                if(error.responseJSON.errors.deadline){
                    $('#deadLineError').text(error.responseJSON.errors.deadline);
                }else{
                    $('#deadLineError').text('');
                }
                if(error.responseJSON.errors.original_currency_id){
                    $('#currencyError').text(error.responseJSON.errors.original_currency_id);
                }else{
                    $('#currencyError').text('');
                }
                if(error.responseJSON.errors.total_spent){
                    $('#total_spentError').text(error.responseJSON.errors.total_spent);
                }else{
                    $('#total_spentError').text('');
                }
                if(error.responseJSON.errors.bid_value){
                    $('#bidValueError').text(error.responseJSON.errors.bid_value);
                }else{
                    $('#bidValueError').text('');
                }
                if(error.responseJSON.errors.bid_value2){
                    $('#bidValue2Error').text(error.responseJSON.errors.bid_value2);
                }else{
                    $('#bidValue2Error').text('');
                }
                if(error.responseJSON.errors.value){
                    $('#valueError').text(error.responseJSON.errors.value);
                }else{
                    $('#valueError').text('');
                }
                if(error.responseJSON.errors.value){
                    $('#valueError').text(error.responseJSON.errors.value);
                }else{
                    $('#valueError').text('');
                }
                if(error.responseJSON.errors.description){
                    $('#descriptionError').text(error.responseJSON.errors.description);
                }else{
                    $('#descriptionError').text('');
                }
                if(error.responseJSON.errors.cover_letter){
                    $('#coverLetterError').text(error.responseJSON.errors.cover_letter);
                }else{
                    $('#coverLetterError').text('');
                }
                $('#submit-button').attr("disabled", false);
                $('#submit-button').html("Create Lead");
            }
        });
    });

</script>
<script>
    flatpickr("input[type=datetime-local]", {});
</script>
