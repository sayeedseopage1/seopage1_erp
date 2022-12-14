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
        <form action="{{route('store-dispute')}}" method="POST">
          @csrf
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Dispute/project cancelation/Milestone cancelation/Client complaining to the marketplace information')</h4>
                    <h6 class="text-center mt-3">Please fill out the following fields carefully so our top management can understand the reasons for the issues in this particular project of yours!</h6>
                <div class="row p-20">



                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Clients username on freelancer.com')"
                            fieldName="client_username" fieldRequired="true" fieldId="client_username"
                             :fieldPlaceholder="__('placeholders.project')" />
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Project value (Mention with currency)')"
                            fieldName="project_value" fieldRequired="true" fieldId="project_value"
                             :fieldPlaceholder="__('placeholders.project')" />
                    </div>


                    <input type="hidden" id="project_id" name="project_id" value="{{ $project->id }}">



                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description1" fieldRequired="true"
                                :fieldLabel="__('What was the project about (You can copy paste the instruction file here if you want)!')">
                            </x-forms.label>
                            <div id="description1"></div>
                            <textarea name="description1" id="description1-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description2" fieldRequired="true"
                                :fieldLabel="__('What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD)')">
                            </x-forms.label>
                            <div id="description2"></div>
                            <textarea name="description2" id="description2-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description3" fieldRequired="true"
                                :fieldLabel="__('Did they release the amount that is not in dispute? Or did they release any amount at all?')">
                            </x-forms.label>
                            <div id="description3"></div>
                            <textarea name="description3" id="description3-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description4" fieldRequired="true"
                                :fieldLabel="__('Which phase we were at when this issue occurred? (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback)')">
                            </x-forms.label>
                            <div id="description4"></div>
                            <textarea name="description4" id="description4-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description5" fieldRequired="true"
                                :fieldLabel="__('What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com)')">
                            </x-forms.label>
                            <div id="description5"></div>
                            <textarea name="description5" id="description5-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description6" fieldRequired="true"
                                :fieldLabel="__('According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail)')">
                            </x-forms.label>
                            <div id="description6"></div>
                            <textarea name="description6" id="description6-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description7" fieldRequired="true"
                                :fieldLabel="__('Was the work delivered fully to the clients satisfaction and as per the agreed job scope?')">
                            </x-forms.label>
                            <div id="description7"></div>
                            <textarea name="description7" id="description7-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description8" fieldRequired="true"
                                :fieldLabel="__('What was the deadline and was the deadline met?')">
                            </x-forms.label>
                            <div id="description8"></div>
                            <textarea name="description8" id="description8-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description9"
                                :fieldLabel="__('What was the work about (You can share the instruction file) (optional)')">
                            </x-forms.label>
                            <div id="description9"></div>
                            <textarea name="description9" id="description9-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description10" fieldRequired="true"
                                :fieldLabel="__('Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps. ')">
                            </x-forms.label>
                            <div id="description10"></div>
                            <textarea name="description10" id="description10-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description11" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that)')">
                            </x-forms.label>
                            <div id="description11"></div>
                            <textarea name="description11" id="description11-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description12" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that)')">
                            </x-forms.label>
                            <div id="description12"></div>
                            <textarea name="description12" id="description12-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description13" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that)')">
                            </x-forms.label>
                            <div id="description13"></div>
                            <textarea name="description13" id="description13-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description14" fieldRequired="true"
                                :fieldLabel="__('List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company!')">
                            </x-forms.label>
                            <div id="description14"></div>
                            <textarea name="description14" id="description14-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description15" fieldRequired="true"
                                :fieldLabel="__('If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)?')">
                            </x-forms.label>
                            <div id="description15"></div>
                            <textarea name="description15" id="description15-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description16" fieldRequired="true"
                                :fieldLabel="__('Write down anything that you did not specifically mention above. Remember, if we are not
                                aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it!')">
                            </x-forms.label>
                            <div id="description16"></div>
                            <textarea name="description16" id="description16-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description17" fieldRequired="true"
                                :fieldLabel="__('Please confirm all the above details are correct & complete & no information was hidden for the client
                                to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc. ')">
                            </x-forms.label>
                            <div id="description17"></div>
                            <textarea name="description17" id="description17-text"
                                class="d-none"></textarea>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Your Name')"
                            fieldName="pm_name" fieldRequired="true" fieldId="pm_name"
                             :fieldPlaceholder="__('placeholders.project')" />
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Your Email')"
                            fieldName="pm_email" fieldRequired="true" fieldId="pm_email"
                             :fieldPlaceholder="__('placeholders.project')" />
                    </div>





                </div>








                <x-form-actions>
                  <button id="save-dispute-form" class="btn-primary rounded f-14 p-2 mr-3 ml-3" type="submit" >Submit</button>

                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {



        quillImageLoad('#description1');
        quillImageLoad('#description2');
        quillImageLoad('#description3');
        quillImageLoad('#description4');
        quillImageLoad('#description5');
        quillImageLoad('#description6');
        quillImageLoad('#description7');
        quillImageLoad('#description8');
        quillImageLoad('#description9');
        quillImageLoad('#description10');
        quillImageLoad('#description11');
        quillImageLoad('#description12');
        quillImageLoad('#description13');
        quillImageLoad('#description14');
        quillImageLoad('#description15');
        quillImageLoad('#description16');
        quillImageLoad('#description17');
        $('#save-dispute-form').click(function() {
            var note1 = document.getElementById('description1').children[0].innerHTML;
            document.getElementById('description1-text').value = note1;
            var note2 = document.getElementById('description2').children[0].innerHTML;
            document.getElementById('description2-text').value = note2;
            var note3 = document.getElementById('description3').children[0].innerHTML;
            document.getElementById('description3-text').value = note3;
            var note4 = document.getElementById('description4').children[0].innerHTML;
            document.getElementById('description4-text').value = note4;
            var note5 = document.getElementById('description5').children[0].innerHTML;
            document.getElementById('description5-text').value = note5;
            var note6 = document.getElementById('description6').children[0].innerHTML;
            document.getElementById('description6-text').value = note6;
            var note7 = document.getElementById('description7').children[0].innerHTML;
            document.getElementById('description7-text').value = note7;
            var note8 = document.getElementById('description8').children[0].innerHTML;
            document.getElementById('description8-text').value = note8;
            var note9 = document.getElementById('description9').children[0].innerHTML;
            document.getElementById('description9-text').value = note9;
            var note10 = document.getElementById('description10').children[0].innerHTML;
            document.getElementById('description10-text').value = note10;
            var note11 = document.getElementById('description11').children[0].innerHTML;
            document.getElementById('description11-text').value = note11;
            var note12 = document.getElementById('description12').children[0].innerHTML;
            document.getElementById('description12-text').value = note12;
            var note13 = document.getElementById('description13').children[0].innerHTML;
            document.getElementById('description13-text').value = note13;
            var note14 = document.getElementById('description14').children[0].innerHTML;
            document.getElementById('description14-text').value = note14;
            var note15 = document.getElementById('description15').children[0].innerHTML;
            document.getElementById('description15-text').value = note15;
            var note16 = document.getElementById('description16').children[0].innerHTML;
            document.getElementById('description16-text').value = note16;
            var note17 = document.getElementById('description17').children[0].innerHTML;
            document.getElementById('description17-text').value = note17;
          

        });




    });



</script>
