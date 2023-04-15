@php
$addProjectCategoryPermission = user()->permission('manage_project_category');
$addClientPermission = user()->permission('add_clients');
$editProjectMemberPermission = user()->permission('edit_project_members');
$addEmployeePermission = user()->permission('add_employees');
$addProjectMemberPermission = user()->permission('add_project_members');
$addProjectMemberPermission = user()->permission('add_project_members');
$createPublicProjectPermission = user()->permission('create_public_project');

@endphp

<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <form action="{{route('store-dispute')}}" method="POST" id="submitForm">
          @csrf
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Dispute/project cancelation/Milestone cancelation/Client complaining to the marketplace information')</h4>
                    <h6 class="text-center mt-3">Please fill out the following fields carefully so our top management can understand the reasons for the issues in this particular project of yours!</h6>
                <div class="row p-20">
                    <div class="col-lg-6 col-md-6">
                        <label for="">Clients username on freelancer.com <strong style="color:red;">*</strong>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Clients username on freelancer.com" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                          <input type="text" class="form-control height-35 f-14" name="client_username" value="" id="client_username" placeholder="Clients username on freelancer.com">
                        <span id="client_usernameError" class="text-danger"></span>

                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Project value (Mention with currency) <strong style="color:red;">*</strong>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Project value (Mention with currency)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                          <input type="number" class="form-control height-35 f-14" name="project_value" value="" id="project_value" placeholder="Project value (Mention with currency)">
                        <span id="project_valueError" class="text-danger"></span>
                    </div>
                    <input type="hidden"  name="project_id" value="{{ $project->id }}">
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">What was the project about (You can copy paste the instruction file here if you want)! <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="What was the project about (You can copy paste the instruction file here if you want)!" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description1" id="description1" class="form-control"></textarea>
                            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                            <script>
                                CKEDITOR.replace('description1');
                            </script>
                            <span id="description1Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description2" id="description2" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description2');
                            </script>
                            <span id="description2Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Did they release the amount that is not in dispute? Or did they release any amount at all? <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did they release the amount that is not in dispute? Or did they release any amount at all?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description3" id="description3" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description3');
                            </script>
                            <span id="description3Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Which phase we were at when this issue occurred? (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Which phase we were at when this issue occurred? (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description4" id="description4" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description4');
                            </script>
                            <span id="description4Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description5" id="description5" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description5');
                            </script>
                            <span id="description5Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description6" id="description6" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description6');
                            </script>
                            <span id="description6Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Was the work delivered fully to the clients satisfaction and as per the agreed job scope? <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Was the work delivered fully to the clients satisfaction and as per the agreed job scope?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description7" id="description7" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description7');
                            </script>
                            <span id="description7Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">What was the deadline and was the deadline met? <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="What was the deadline and was the deadline met? " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description8" id="description8" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description8');
                            </script>
                            <span id="description8Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">What was the work about (You can share the instruction file) (optional)
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="What was the work about (You can share the instruction file) (optional)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description9" id="description9" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description9');
                            </script>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps. <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description10" id="description10" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description10');
                            </script>
                            <span id="description10Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description11" id="description11" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description11');
                            </script>
                            <span id="description11Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description12" id="description12" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description12');
                            </script>
                            <span id="description12Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that) <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description13" id="description13" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description13');
                            </script>
                            <span id="description13Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company! <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company!" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description14" id="description14" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description14');
                            </script>
                            <span id="description14Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)? <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description15" id="description15" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description15');
                            </script>
                            <span id="description15Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Write down anything that you did not specifically mention above. Remember, if we are not aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it! <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Write down anything that you did not specifically mention above. Remember, if we are not aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it!" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description16" id="description16" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description16');
                            </script>
                            <span id="description16Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label for="">Please confirm all the above details are correct & complete & no information was hidden for the client to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc. <strong style="color:red;">*</strong>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Please confirm all the above details are correct & complete & no information was hidden for the client to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <textarea name="description17" id="description17" class="form-control"></textarea>
                            <script>
                                CKEDITOR.replace('description17');
                            </script>
                            <span id="description17Error" class="text-danger"></span>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Your Name<strong style="color:red;">*</strong>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Your Name" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                          <input type="text" class="form-control height-35 f-14 " name="pm_name" id="pm_name" placeholder="Enter your name">
                        <span id="pm_nameError" class="text-danger"></span>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Your Email <strong style="color:red;">*</strong>
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Your Email" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </label>
                          <input type="email" class="form-control height-35 f-14" name="pm_email" id="pm_email" placeholder="Enter your email">
                        <span id="pm_emailError" class="text-danger"></span>
                    </div>
                </div>
                  <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3" type="submit" id="submitBtn">Submit</button>
                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
            </div>
        </form>
    </div>
</div>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $('#submitBtn').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var description1 = CKEDITOR.instances.description1.getData();
        var description2 = CKEDITOR.instances.description2.getData();
        var description3 = CKEDITOR.instances.description3.getData();
        var description4 = CKEDITOR.instances.description4.getData();
        var description5 = CKEDITOR.instances.description5.getData();
        var description6 = CKEDITOR.instances.description6.getData();
        var description7 = CKEDITOR.instances.description7.getData();
        var description8 = CKEDITOR.instances.description8.getData();
        var description9 = CKEDITOR.instances.description9.getData();
        var description10 = CKEDITOR.instances.description10.getData();
        var description11 = CKEDITOR.instances.description11.getData();
        var description12 = CKEDITOR.instances.description12.getData();
        var description13 = CKEDITOR.instances.description13.getData();
        var description14 = CKEDITOR.instances.description14.getData();
        var description15 = CKEDITOR.instances.description15.getData();
        var description16 = CKEDITOR.instances.description16.getData();
        var description17 = CKEDITOR.instances.description17.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'client_username': document.getElementById("client_username").value,
            'project_value': document.getElementById("project_value").value,
            'description1': description1,
            'description2': description2,
            'description3': description3,
            'description4': description4,
            'description5': description5,
            'description6': description6,
            'description7': description7,
            'description8': description8,
            'description9': description9,
            'description10': description10,
            'description11': description11,
            'description12': description12,
            'description13': description13,
            'description14': description14,
            'description15': description15,
            'description16': description16,
            'description17': description17,
            'pm_name': document.getElementById("pm_name").value,
            'pm_email': document.getElementById("pm_email").value,
            'project_id': {{ $project->id }},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-dispute')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response.status);
                $('#submitForm').trigger("reset");
                window.location.href=response.redirectUrl;
                toastr.success('Submitted Successfully');
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            },
            error: function(error) {
                // console.log(response);
                if(error.responseJSON.errors.client_username){
                    $('#client_usernameError').text(error.responseJSON.errors.client_username);
                }else{
                    $('#client_usernameError').text('');
                }
                if(error.responseJSON.errors.project_value){
                    $('#project_valueError').text(error.responseJSON.errors.project_value);
                }else{
                    $('#project_valueError').text('');
                }
                if(error.responseJSON.errors.description1){
                    $('#description1Error').text(error.responseJSON.errors.description1);
                }else{
                    $('#description1Error').text('');
                }
                if(error.responseJSON.errors.description2){
                    $('#description2Error').text(error.responseJSON.errors.description2);
                }else{
                    $('#description2Error').text('');
                }
                if(error.responseJSON.errors.description3){
                    $('#description3Error').text(error.responseJSON.errors.description3);
                }else{
                    $('#description3Error').text('');
                }
                if(error.responseJSON.errors.description4){
                    $('#description4Error').text(error.responseJSON.errors.description4);
                }else{
                    $('#description4Error').text('');
                }
                if(error.responseJSON.errors.description5){
                    $('#description5Error').text(error.responseJSON.errors.description5);
                }else{
                    $('#description5Error').text('');
                }
                if(error.responseJSON.errors.description6){
                    $('#description6Error').text(error.responseJSON.errors.description6);
                }else{
                    $('#description6Error').text('');
                }
                if(error.responseJSON.errors.description7){
                    $('#description7Error').text(error.responseJSON.errors.description7);
                }else{
                    $('#description7Error').text('');
                }
                if(error.responseJSON.errors.description8){
                    $('#description8Error').text(error.responseJSON.errors.description8);
                }else{
                    $('#description8Error').text('');
                }
                if(error.responseJSON.errors.description10){
                    $('#description10Error').text(error.responseJSON.errors.description10);
                }else{
                    $('#description10Error').text('');
                }
                if(error.responseJSON.errors.description11){
                    $('#description11Error').text(error.responseJSON.errors.description11);
                }else{
                    $('#description11Error').text('');
                }
                if(error.responseJSON.errors.description12){
                    $('#description12Error').text(error.responseJSON.errors.description12);
                }else{
                    $('#description12Error').text('');
                }
                if(error.responseJSON.errors.description13){
                    $('#description13Error').text(error.responseJSON.errors.description13);
                }else{
                    $('#description13Error').text('');
                }
                if(error.responseJSON.errors.description14){
                    $('#description14Error').text(error.responseJSON.errors.description14);
                }else{
                    $('#description14Error').text('');
                }
                if(error.responseJSON.errors.description15){
                    $('#description15Error').text(error.responseJSON.errors.description15);
                }else{
                    $('#description15Error').text('');
                }
                if(error.responseJSON.errors.description16){
                    $('#description16Error').text(error.responseJSON.errors.description16);
                }else{
                    $('#description16Error').text('');
                }
                if(error.responseJSON.errors.description17){
                    $('#description17Error').text(error.responseJSON.errors.description17);
                }else{
                    $('#description17Error').text('');
                }
                if(error.responseJSON.errors.pm_name){
                    $('#pm_nameError').text(error.responseJSON.errors.pm_name);
                }else{
                    $('#pm_nameError').text('');
                }
                if(error.responseJSON.errors.pm_email){
                    $('#pm_emailError').text(error.responseJSON.errors.pm_email);
                }else{
                    $('#pm_emailError').text('');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });
    });

</script>
