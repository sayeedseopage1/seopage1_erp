@php
    $addProjectCategoryPermission = user()->permission('manage_project_category');
    $addClientPermission = user()->permission('add_clients');
    $editProjectMemberPermission = user()->permission('edit_project_members');
    $addEmployeePermission = user()->permission('add_employees');
    $addProjectMemberPermission = user()->permission('add_project_members');
    $addProjectMemberPermission = user()->permission('add_project_members');
    $createPublicProjectPermission = user()->permission('create_public_project');

@endphp
<style media="screen">
    .rating {
        float:left;
        display:flex;
        flex-direction: row-reverse;
        font-size:10px;
        margin-right:auto;
    }

    /* :not(:checked) is a filter, so that browsers that don’t support :checked don’t
      follow these rules. Every browser that supports :checked also supports :not(), so
      it doesn’t make the test unnecessarily selective */
    .rating:not(:checked) > input {
        position:absolute;
        top:-9999px;
        clip:rect(0,0,0,0);
    }

    .rating:not(:checked) > label {
        float:left;
        width:1em;
        /* padding:0 .1em; */
        overflow:hidden;
        white-space:nowrap;
        cursor:pointer;
        font-size:300%;
        /* line-height:1.2; */
        color:#ddd;
    }

    .rating:not(:checked) > label:before{
        content: '★ ';

    }

    .rating > input:checked ~ label {
        color: orange;

    }

    .rating:not(:checked) > label:hover,
    .rating:not(:checked) > label:hover ~ label{
        color: orange;

    }

    .rating > input:checked + label:hover,
    .rating > input:checked + label:hover ~ label,
    .rating > input:checked ~ label:hover,
    .rating > input:checked ~ label:hover ~ label,
    .rating > label:hover ~ input:checked ~ label

    {
        color: orange;

    }

    .rating > label:active {
        position:relative;
        top:2px;
        left:2px;
    }
    /* .rating:not(:checked) > label {
      float: left;
      width: 55px;

      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      font-size: 5em;
      line-height: 1.2;
      color: #ddd;
  } */
    .rating:not(:checked) > label {
        float: left;
        width: 30px;
        /* padding: 0 .1em; */
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        font-size: 27px;
        line-height: 1.2;
        color: #ddd;
    }

</style>

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">
<link href=" https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.css " rel="stylesheet">
<div class="row">
    <div class="col-sm-12">
        <form action="{{route('project-completion')}}" method="POST" id="projectCompletionForm">
            @csrf
            <input type="hidden" name="milestone_id" value="{{$milestone->id}}">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Project Completion Form')</h4>
                <div class="row p-20">
                    <div class="col-lg-12 col-md-12">
                        <label for="">Did you complete the QC Protocol?
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you complete the QC Protocol?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row">
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input " type="radio" name="qc_protocol" value="1" id="qc_protocol1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="qc_protocol1">
                                        Yes
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="qc_protocol" value="0" id="qc_protocol2">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="qc_protocol2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="qc_protocolError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5">
                        <div class="form-group">
                            <div class="d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="login_yes" name="login_yes" value="1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you collect the login information?
                                        <sup class="f-14 mr-1">*</sup>
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you collect the login information?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="login_yesError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3" id="login_yes_box">
                        <label for="">Did You share the login info with client?
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did You share the login info with client?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row" id="login">
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="login_information"  value="1" id="login_information1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault3">
                                        Yes
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="login_information" value="0" id="login_information2">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault4">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="login_informationError" class="text-danger"></span>
                    </div>
                    <div class="col-md-12 col-lg-12 mt-3" id="login_information_box">
                        <label for="">Submit Login Info for Future Use <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit Login Info for Future Use" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row">
                            <div class="col-md-4 col-lg-4">
                                <input type="text" class="form-control height-35 f-14 " name="login_url" id="login_url" value="" placeholder="Enter login Url">
                                <span id="login_urlError" class="text-danger"></span>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" class="form-control height-35 f-14 " id="login1" name="login" value="" placeholder="Enter email/username">
                                <span id="loginError" class="text-danger"></span>
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" class="form-control height-35 f-14" id="password" name="password" value="" placeholder="Enter Password">
                                <span id="passwordError" class="text-danger"></span>
                            </div>
                            <div class="col-md-8 col-lg-8 mt-3">
                                <input type="text" class="form-control height-35 f-14 " id="screenshot" name="screenshot" value="" placeholder="Enter Verification Link. (Screenshot)">
                                <span id="screenshotError" class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5">
                        <div class="form-group">
                            <div class="d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="drive_yes" name="drive_yes" value="1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you upload the backup folder link in google drive?
                                        <sup class="f-14 mr-1">*</sup>
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you upload the backup folder link in google drive?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3" id="drive_yes_box">
                        <label for="">Did you share the updated backup with client?
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you share the updated backup with client?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row" >
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="drive_information" id="drive_information1"  value="1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault9">
                                        Yes
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="drive_information" id="drive_information2" value="0" >
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault10">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="drive_informationError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5" id="drive_box">
                        <label for="">Attach Google Drive Backup Folder Link <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Attach Google Drive Backup Folder Link" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <input type="text" class="form-control height-35 f-14" name="google_link" id="google_link" value="">
                        <span id="google_linkError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5">
                        <div class="row">
                            <div class="col-md-4">
                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault16">
                                    Please Rate The Work Quality of Technical Team
                                    <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Please Rate The Work Quality of Technical Team" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="rating mt-3 ml-1">
                                    <input type="radio" id="star10" name="rating" value="10" /><label for="star10" title="Meh"></label>
                                    <input type="radio" id="star9" name="rating" value="9" /><label for="star9" title="Meh"></label>
                                    <input type="radio" id="star8" name="rating" value="8" /><label for="star8" title="Meh"></label>
                                    <input type="radio" id="star7" name="rating" value="7" /><label for="star7" title="Meh"></label>
                                    <input type="radio" id="star6" name="rating" value="6" /><label for="star6" title="Meh"></label>
                                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Meh"></label>
                                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="bad"></label>
                                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="bad"></label>
                                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="tim"></label>
                                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="time"></label>
                                </div>
                                <span id="ratingError" class="text-danger"></span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did The Sales Executive Defined Requirements Properly?
                                    <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did The Sales Executive Defined Requirements Properly?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="rating mt-3 ml-1">
                                    <input type="radio" id="star20" name="requirements" value="10" /><label for="star20" title="Meh"></label>
                                    <input type="radio" id="star19" name="requirements" value="9" /><label for="star19" title="Meh"></label>
                                    <input type="radio" id="star18" name="requirements" value="8" /><label for="star18" title="Meh"></label>
                                    <input type="radio" id="star17" name="requirements" value="7" /><label for="star17" title="Meh"></label>
                                    <input type="radio" id="star16" name="requirements" value="6" /><label for="star16" title="Meh"></label>
                                    <input type="radio" id="star15" name="requirements" value="5" /><label for="star15" title="Meh"></label>
                                    <input type="radio" id="star14" name="requirements" value="4" /><label for="star14" title="bad"></label>
                                    <input type="radio" id="star13" name="requirements" value="3" /><label for="star13" title="bad"></label>
                                    <input type="radio" id="star12" name="requirements" value="2" /><label for="star12" title="tim"></label>
                                    <input type="radio" id="star11" name="requirements" value="1" /><label for="star11" title="time"></label>
                                </div>
                                <span id="requirementsError" class="text-danger"></span>
                            </div>
                            <div class="col-md-4">
                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did The Sales Executive Determined The Price Correctly?
                                    <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did The Sales Executive Determined The Price Correctly?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="rating mt-3 ml-1">
                                    <input type="radio" id="star30" name="price" value="10" /><label for="star30" title="Meh"></label>
                                    <input type="radio" id="star29" name="price" value="9" /><label for="star29" title="Meh"></label>
                                    <input type="radio" id="star28" name="price" value="8" /><label for="star28" title="Meh"></label>
                                    <input type="radio" id="star27" name="price" value="7" /><label for="star27" title="Meh"></label>
                                    <input type="radio" id="star26" name="price" value="6" /><label for="star26" title="Meh"></label>
                                    <input type="radio" id="star25" name="price" value="5" /><label for="star25" title="Meh"></label>
                                    <input type="radio" id="star24" name="price" value="4" /><label for="star24" title="bad"></label>
                                    <input type="radio" id="star23" name="price" value="3" /><label for="star23" title="bad"></label>
                                    <input type="radio" id="star22" name="price" value="2" /><label for="star22" title="tim"></label>
                                    <input type="radio" id="star21" name="price" value="1" /><label for="star21" title="time"></label>
                                </div>
                                <span id="priceError" class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <div class="row mt-3">
                            <div class="col-md-4">
                                <textarea  class="form-control f-14" rows="4" cols="80" name="comments" id="comments"></textarea>
                                <span id="commentsError" class="text-danger"></span>
                            </div>
                            <div class="col-md-4">
                                <textarea  class="form-control f-14" rows="4" cols="80" name="comments2" id="comments2"></textarea>
                                <span id="comments2Error" class="text-danger"></span>
                            </div>
                            <div class="col-md-4">
                                <textarea  class="form-control f-14" rows="4" cols="80" name="comments3" id="comments3"></textarea>
                                <span id="comments3Error" class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 mt-5">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 mt-1">
                                <label class="" for="">Submit The Niche/Category of The Project
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit The Niche/Category of The Project" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="input-group w-100">
                                    <x-forms.input-group>
                                        <select class="form-control select-picker" name="niche" id="option_value" data-live-search="true" data-size="8">
                                            @foreach($categories as $category)
                                                <option value="{{$category->id}}">{{$category->category_name}}</option>
                                            @endforeach
                                        </select>
                                        <x-slot name="append">
                                            <button  type="button" class="btn btn-outline-secondary border-grey" data-toggle="modal" data-target="#nicheaddmodal" type="button">@lang('app.add')</button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 mt-5">
                                <div class="form-group">
                                    <div class="d-flex">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="dummy_yes" name="dummy_yes" value="1">
                                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you collect the dummy/test site information?
                                                <sup class="f-14 mr-1">*</sup>
                                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you collect the dummy/test site information?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 mt-3" id="dummy_yes_box">
                                <label for="">
                                    Did You share the dummy/test site link info with client?
                                    <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did You share the dummy/test site link info with client?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <div class="row">
                                    <div class="col-md-1">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="dummy_information"  id="dummy_information1" value="1">
                                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault11">
                                                Yes
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="dummy_information" id="dummy_information2" value="0" >
                                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault12">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <span id="dummy_informationError" class="text-danger"></span>
                            </div>
                            <div class="col-lg-6 col-md-6 mt-3" id="dummy_box">
                                <label for="">Submit The Dummy/Test Site Link <sup class="f-14 mr-1">*</sup>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit The Dummy/Test Site Link" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <input type="text" class="form-control height-35 f-14" name="dummy_link" id="dummy_link" value="">
                                <span id="dummy_linkError" class="text-danger"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5">
                        <label for="">Did You Notify the Client About Dummy Site Removal After 2-Weeks?
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did You Notify the Client About Dummy Site Removal After 2-Weeks?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row">
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="notify" value="1" id="notify1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault1">
                                        Yes
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="notify" value="0" id="notify2">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="notifyError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-5">
                        <div class="form-group">
                            <div class="d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="actual_yes" name="actual_yes" value="1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you collect the actual site information?
                                        <sup class="f-14 mr-1">*</sup>
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did you collect the actual site information?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3" id="actual_yes_box">
                        <label for="">
                            Did You share the actual site link with client?
                            <sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did You share the actual site link with client?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <div class="row">
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="actual_information" id="actual_information1"  value="1">
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault12">
                                        Yes
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="actual_information" id="actual_information2" value="0" >
                                    <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="flexRadioDefault13">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                        <span id="actual_informationError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-12 col-md-12 mt-3" id="actual_box">
                        <label for="">Submit The Actual Site Link<sup class="f-14 mr-1">*</sup>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit The Actual Site Link" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                        <input type="text" class="form-control height-35 f-14" name="actual_link" id="actual_link" value="">
                        <span id="actual_linkError" class="text-danger"></span>
                    </div>
                </div>
            </div>
            <br>
            <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3"  type="submit" id="submitButton">Submit</button>
            <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
            </x-forms.button-cancel>


    </div>
    </form>

</div>
</div>

@include('projects.modals.addnichemodal')
@include('projects.modals.deletenichemodal')

@push('scripts')

    <script>
        $('#submitButton').click(function(e){
            // alert('ok');
            e.preventDefault();
            $('#submitButton').attr("disabled", true);
            $('#submitButton').html("Processing...");
            var qc_protocol = $('input[name="qc_protocol"]:checked').val();
            var login_information = $('input[name="login_information"]:checked').val();
            var drive_information = $('input[name="drive_information"]:checked').val();
            var dummy_information = $('input[name="dummy_information"]:checked').val();
            var notify = $('input[name="notify"]:checked').val();
            var actual_information = $('input[name="actual_information"]:checked').val();
            var rating = $('input[name="rating"]:checked').val();
            var requirements = $('input[name="requirements"]:checked').val();
            var price = $('input[name="price"]:checked').val();
            var data= {
                '_token': "{{ csrf_token() }}",
                'qc_protocol': qc_protocol,
                'login_yes': document.getElementById("login_yes").value,
                'login_information': login_information,
                'login_url': document.getElementById("login_url").value,
                'login': document.getElementById("login1").value,
                'password': document.getElementById("password").value,
                'screenshot': document.getElementById("screenshot").value,
                'drive_yes': document.getElementById("drive_yes").value,
                'drive_information': drive_information,
                'google_link': document.getElementById("google_link").value,
                'rating': rating,
                'requirements': requirements,
                'price': price,
                'comments': document.getElementById("comments").value,
                'comments2': document.getElementById("comments2").value,
                'comments3': document.getElementById("comments3").value,
                'niche': document.getElementById("option_value").value,
                'dummy_yes': document.getElementById("dummy_yes").value,
                'dummy_information': dummy_information,
                'dummy_link': document.getElementById("dummy_link").value,
                'notify': notify,
                'actual_yes': document.getElementById("actual_yes").value,
                'actual_information': actual_information,
                'actual_link': document.getElementById("actual_link").value,
                'milestone_id': {{$milestone->id}},
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('project-completion')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    // console.log(response.message);
                    $('#projectCompletionForm').trigger("reset");
                    window.location.href=response.redirectUrl;
                    $('#submitButton').attr("disabled", false);
                    $('#submitButton').html("Submit");
                    toastr.success('Submitted Successfully');

                },
                error: function(error) {
                    // console.log(response);
                    if(error.responseJSON.errors.qc_protocol){
                        $('#qc_protocolError').text(error.responseJSON.errors.qc_protocol);
                    }else{
                        $('#qc_protocolError').text('');
                    }
                    if(error.responseJSON.errors.login_yes){
                        $('#login_yesError').text(error.responseJSON.errors.login_yes);
                    }else{
                        $('#login_yesError').text('');
                    }
                    if(error.responseJSON.errors.login_information){
                        $('#login_informationError').text(error.responseJSON.errors.login_information);
                    }else{
                        $('#login_informationError').text('');
                    }
                    if(error.responseJSON.errors.login_url){
                        $('#login_urlError').text(error.responseJSON.errors.login_url);
                    }else{
                        $('#login_urlError').text('');
                    }
                    if(error.responseJSON.errors.login){
                        $('#loginError').text(error.responseJSON.errors.login);
                    }else{
                        $('#loginError').text('');
                    }
                    if(error.responseJSON.errors.password){
                        $('#passwordError').text(error.responseJSON.errors.password);
                    }else{
                        $('#passwordError').text('');
                    }
                    if(error.responseJSON.errors.screenshot){
                        $('#screenshotError').text(error.responseJSON.errors.screenshot);
                    }else{
                        $('#screenshotError').text('');
                    }
                    if(error.responseJSON.errors.drive_yes){
                        $('#drive_yesError').text(error.responseJSON.errors.drive_yes);
                    }else{
                        $('#drive_yesError').text('');
                    }
                    if(error.responseJSON.errors.drive_information){
                        $('#drive_informationError').text(error.responseJSON.errors.drive_information);
                    }else{
                        $('#drive_informationError').text('');
                    }
                    if(error.responseJSON.errors.google_link){
                        $('#google_linkError').text(error.responseJSON.errors.google_link);
                    }else{
                        $('#google_linkError').text('');
                    }
                    if(error.responseJSON.errors.rating){
                        $('#ratingError').text(error.responseJSON.errors.rating);
                    }else{
                        $('#ratingError').text('');
                    }
                    if(error.responseJSON.errors.requirements){
                        $('#requirementsError').text(error.responseJSON.errors.requirements);
                    }else{
                        $('#requirementsError').text('');
                    }
                    if(error.responseJSON.errors.price){
                        $('#priceError').text(error.responseJSON.errors.price);
                    }else{
                        $('#priceError').text('');
                    }
                    if(error.responseJSON.errors.comments){
                        $('#commentsError').text(error.responseJSON.errors.comments);
                    }else{
                        $('#commentsError').text('');
                    }
                    if(error.responseJSON.errors.comments2){
                        $('#comments2Error').text(error.responseJSON.errors.comments2);
                    }else{
                        $('#comments2Error').text('');
                    }
                    if(error.responseJSON.errors.comments3){
                        $('#comments3Error').text(error.responseJSON.errors.comments3);
                    }else{
                        $('#comments3Error').text('');
                    }
                    if(error.responseJSON.errors.dummy_yes){
                        $('#dummy_yesError').text(error.responseJSON.errors.dummy_yes);
                    }else{
                        $('#dummy_yesError').text('');
                    }
                    if(error.responseJSON.errors.dummy_information){
                        $('#dummy_informationError').text(error.responseJSON.errors.dummy_information);
                    }else{
                        $('#dummy_informationError').text('');
                    }
                    if(error.responseJSON.errors.dummy_link){
                        $('#dummy_linkError').text(error.responseJSON.errors.dummy_link);
                    }else{
                        $('#dummy_linkError').text('');
                    }
                    if(error.responseJSON.errors.notify){
                        $('#notifyError').text(error.responseJSON.errors.notify);
                    }else{
                        $('#notifyError').text('');
                    }
                    if(error.responseJSON.errors.actual_yes){
                        $('#actual_yesError').text(error.responseJSON.errors.actual_yes);
                    }else{
                        $('#actual_yesError').text('');
                    }
                    if(error.responseJSON.errors.actual_information){
                        $('#actual_informationError').text(error.responseJSON.errors.actual_information);
                    }else{
                        $('#actual_informationError').text('');
                    }
                    if(error.responseJSON.errors.actual_link){
                        $('#actual_linkError').text(error.responseJSON.errors.actual_link);
                    }else{
                        $('#actual_linkError').text('');
                    }
                    $('#submitButton').attr("disabled", false);
                    $('#submitButton').html("Submit");
                }
            });
        });

    </script>

    <script type="text/javascript">
        $(document).ready(function() {
            fetchniche();
            function fetchniche()
            {
                $.ajax({
                    type: "GET",
                    url: "{{route('get-niche')}}",

                    dataType: "json",
                    success: function (response){
                        //  console.log(response.milestones);
                        let spans= '';
                        response.categories.forEach((item)=> {

                            spans += `<tr>
          <td>${item.id}</td>
          <td>${item.category_name}</td>
          <td class="text-right">
            <button type="button" class="btn-secondary rounded f-14 p-2 delete_niche" value="${item.id}" >
        <svg class="svg-inline--fa fa-trash fa-w-14 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
          <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg><!-- <i class="fa fa-trash mr-1"></i> Font Awesome fontawesome.com -->
    Delete
    </button></td>
        </tr>`
                        });

                        document.querySelector('#niche_value').innerHTML= spans;


                    }
                });
            }
            $(document).on('click','.delete_niche',function(e){
                e.preventDefault();
                var category_id= $(this).val();
                //  console.log(category_id);
                $('#delete_niche_id').val(category_id);

                $('#deleteniche').modal('show');
            });
            $(document).on('click','.delete_niche_btn',function(e){
                e.preventDefault();

                var category_id= $('#delete_niche_id').val();
                //console.log(category_id);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    type: "DELETE",
                    url: "/projects/delete-niche/"+category_id,
                    success: function (response){
                        //console.log(response);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Category Deleted Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })


                        $('#success_message').addClass('alert alert-danger');
                        $('#success_message').text(response.message);
                        $('#deleteniche').modal('hide');
                        $('delete_niche_btn').text("Yes Delete");
                        fetchniche();
                    }

                });

            });
            $(document).on('click','.add_niche',function(e){
                //alert('success');
                e.preventDefault();
                $('#editmilestone').modal('show');
//console.log("test");
                var data= {
                    'category_name': $('.category_name').val(),



                }
//console.log(data);
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    type: "POST",
                    url: "{{route('add-niche')}}",
                    data: data,
                    dataType: "json",
                    success: function (response){
                        if (response.status == 400) {
                            $('#saveform_errList').html("");
                            $('#saveform_errList').addClass('alert alert-danger');
                            $.each(response.errors, function (key, err_values){
                                $('#saveform_errList').append('<li>'+err_values+'</li>');
                            });
                        }
                        else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Category Added Successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            $('#saveform_errList').html("");
                            $('#success_message').addClass('alert alert-success');
                            $('#success_message').text(response.message);
                            $('#nicheaddmodal').modal('hide');
                            $('#nicheaddmodal').find('input').val("");
                            fetchniche();

                        }
                    }
                });
            });
        });


    </script>
    <script type="text/javascript">


        $(document).ready(function() {
            $("#login_information_box").hide();
            $("#login_yes_box").hide();
            $("#drive_yes_box").hide();
            $("#drive_box").hide();
            $("#dummy_yes_box").hide();
            $("#dummy_box").hide();
            $("#actual_yes_box").hide();
            $("#actual_box").hide();
        });
        $(document).ready(function() {
            $('#login_yes').click(function() {


                var check = $('#login_yes').is(":checked") ? true : false;
                //console.log(check);
                if (check == true) {
                    $('#login_yes_box').show();
                } else {
                    $('#login_yes_box').hide();
                }
                // /coonsole.log(value);

            });
            $("input[name$='login_information']").click(function() {
                var value = $(this).val();
                // /coonsole.log(value);
                if (value == 1) {
                    $("#login_information_box").show();
                }else {
                    $("#login_information_box").hide();
                }



            });
        });

        $(document).ready(function() {
            $('#drive_yes').click(function() {


                var check2 = $('#drive_yes').is(":checked") ? true : false;
                //console.log(check);
                if (check2 == true) {
                    $('#drive_yes_box').show();
                } else {
                    $('#drive_yes_box').hide();
                }
                // /coonsole.log(value);

            });
            $("input[name$='drive_information']").click(function() {
                var value2 = $(this).val();
                //console.log(value2);
                if (value2 == 1) {
                    $("#drive_box").show();
                }else {
                    $("#drive_box").hide();
                }



            });
        });

        $(document).ready(function() {
            $('#dummy_yes').click(function() {


                var check3 = $('#dummy_yes').is(":checked") ? true : false;
                //console.log(check);
                if (check3 == true) {
                    $('#dummy_yes_box').show();
                } else {
                    $('#dummy_yes_box').hide();
                }
                // /coonsole.log(value);

            });
            $("input[name$='dummy_information']").click(function() {
                var value3 = $(this).val();
                //console.log(value2);
                if (value3 == 1) {
                    $("#dummy_box").show();
                }else {
                    $("#dummy_box").hide();
                }



            });
        });

        $(document).ready(function() {
            $('#actual_yes').click(function() {


                var check4 = $('#actual_yes').is(":checked") ? true : false;
                //console.log(check);
                if (check4 == true) {
                    $('#actual_yes_box').show();
                } else {
                    $('#actual_yes_box').hide();
                }
                // /coonsole.log(value);

            });
            $("input[name$='actual_information']").click(function() {
                var value4 = $(this).val();
                //console.log(value2);
                if (value4 == 1) {
                    $("#actual_box").show();
                }else {
                    $("#actual_box").hide();
                }



            });
        });



    </script>


@endpush
<script src=" https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.js "></script>
