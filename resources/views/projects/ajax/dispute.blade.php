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
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2 @error('client_username') is-invalid @enderror" :fieldLabel="__('Clients username on freelancer.com')"
                            fieldName="client_username" fieldRequired="true" fieldId="client_username"
                             :fieldPlaceholder="__('Client Username')" />
                             @error('client_username')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror

                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2 @error('project_value') is-invalid @enderror" :fieldLabel="__('Project value (Mention with currency)')"
                            fieldName="project_value" fieldRequired="true" fieldId="project_value"
                             :fieldPlaceholder="__('Project Value')" />
                             @error('project_value')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror
                    </div>


                    <input type="hidden"  name="project_id" value="{{ $project->id }}">



                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description1" fieldRequired="true"
                                :fieldLabel="__('What was the project about (You can copy paste the instruction file here if you want)!')">
                            </x-forms.label>


                                  <textarea name="description1" class="form-control  @error('description1') is-invalid @enderror"  rows="3"></textarea>
                                @error('description1')
                                <div class="mt-3">
                                  <div class="alert alert-danger">{{ $message }}</div>
                                  </div>
                                @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description2" fieldRequired="true"
                                :fieldLabel="__('What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD)')">
                            </x-forms.label>

                                <textarea name="description2" class="form-control  @error('description2') is-invalid @enderror"  rows="3"></textarea>
                              @error('description2')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description3" fieldRequired="true"
                                :fieldLabel="__('Did they release the amount that is not in dispute? Or did they release any amount at all?')">
                            </x-forms.label>


                                <textarea name="description3" class="form-control  @error('description3') is-invalid @enderror"  rows="3"></textarea>
                              @error('description3')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description4" fieldRequired="true"
                                :fieldLabel="__('Which phase we were at when this issue occurred?
                                (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback)')">
                            </x-forms.label>


                                <textarea name="description4" class="form-control  @error('description4') is-invalid @enderror"  rows="3"></textarea>
                              @error('description4')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description5" fieldRequired="true"
                                :fieldLabel="__('What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com)')">
                            </x-forms.label>
                            <textarea name="description5" class="form-control  @error('description5') is-invalid @enderror"  rows="3"></textarea>
                          @error('description5')
                          <div class="mt-3">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror

                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description6" fieldRequired="true"
                                :fieldLabel="__('According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail)')">
                            </x-forms.label>

                                <textarea name="description6" class="form-control  @error('description6') is-invalid @enderror" rows="3"></textarea>
                              @error('description6')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description7" fieldRequired="true"
                                :fieldLabel="__('Was the work delivered fully to the clients satisfaction and as per the agreed job scope?')">
                            </x-forms.label>

                                <textarea name="description7" class="form-control  @error('description7') is-invalid @enderror"  rows="3"></textarea>
                              @error('description7')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description8" fieldRequired="true"
                                :fieldLabel="__('What was the deadline and was the deadline met?')">
                            </x-forms.label>

                                <textarea name="description8" class="form-control  @error('description8') is-invalid @enderror"  rows="3"></textarea>
                              @error('description8')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description9"
                                :fieldLabel="__('What was the work about (You can share the instruction file) (optional)')">
                            </x-forms.label>

                                <textarea name="description9" class="form-control"  rows="3"></textarea>

                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description10" fieldRequired="true"
                                :fieldLabel="__('Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps. ')">
                            </x-forms.label>

                                <textarea name="description10" class="form-control  @error('description10') is-invalid @enderror" rows="3"></textarea>
                              @error('description10')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description11" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that)')">
                            </x-forms.label>

                                <textarea name="description11" class="form-control  @error('description11') is-invalid @enderror" rows="3"></textarea>
                              @error('description11')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description12" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that)')">
                            </x-forms.label>

                                <textarea name="description12" class="form-control  @error('description12') is-invalid @enderror" rows="3"></textarea>
                              @error('description12')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description13" fieldRequired="true"
                                :fieldLabel="__('When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that)')">
                            </x-forms.label>

                                <textarea name="description13" class="form-control  @error('description13') is-invalid @enderror" rows="3"></textarea>
                              @error('description13')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description14" fieldRequired="true"
                                :fieldLabel="__('List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company!')">
                            </x-forms.label>

                                <textarea name="description14" class="form-control  @error('description14') is-invalid @enderror" rows="3"></textarea>
                              @error('description14')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description15" fieldRequired="true"
                                :fieldLabel="__('If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)?')">
                            </x-forms.label>

                                <textarea name="description15" class="form-control  @error('description15') is-invalid @enderror" rows="3"></textarea>
                              @error('description15')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description16" fieldRequired="true"
                                :fieldLabel="__('Write down anything that you did not specifically mention above. Remember, if we are not
                                aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it!')">
                            </x-forms.label>

                                <textarea name="description16" class="form-control  @error('description16') is-invalid @enderror" rows="3"></textarea>
                              @error('description16')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <x-forms.label class="my-3" fieldId="description17" fieldRequired="true"
                                :fieldLabel="__('Please confirm all the above details are correct & complete & no information was hidden for the client
                                to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc. ')">
                            </x-forms.label>

                                <textarea name="description17" class="form-control  @error('description17') is-invalid @enderror" rows="3"></textarea>
                              @error('description17')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2 @error('pm_name') is-invalid @enderror" :fieldLabel="__('Your Name')"
                            fieldName="pm_name" fieldRequired="true" fieldId="pm_name"
                             :fieldPlaceholder="__('placeholders.project')" />
                             @error('pm_name')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2  @error('pm_email') is-invalid @enderror" :fieldLabel="__('Your Email')"
                            fieldName="pm_email" fieldRequired="true" fieldId="pm_email"
                             :fieldPlaceholder="__('placeholders.project')" />
                             @error('pm_email')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror
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








</script>
