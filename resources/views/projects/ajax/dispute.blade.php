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
                        <label for="">Clients username on freelancer.com <strong style="color:red;">*</strong></label>
                          <input type="text" class="form-control height-35 f-14  @error('client_username') is-invalid @enderror" name="client_username" value="" required>
                             @error('client_username')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror

                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Project value (Mention with currency) <strong style="color:red;">*</strong></label>
                          <input type="text" class="form-control height-35 f-14  @error('project_value') is-invalid @enderror" name="project_value" value=""
                          required>
                             @error('project_value')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror

                    </div>


                    <input type="hidden"  name="project_id" value="{{ $project->id }}">



                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">What was the project about (You can copy paste the instruction file here if you want)! <strong style="color:red;">*</strong></label>


                                  <textarea name="description1" class="form-control  @error('description1') is-invalid @enderror"  rows="3" required="required" required="required"></textarea>
                                @error('description1')
                                <div class="mt-3">
                                  <div class="alert alert-danger">{{ $message }}</div>
                                  </div>
                                @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">What percentage of the amount is in dispute? Also, write the amount in dispute separately. (for example 60% and 300 USD) <strong style="color:red;">*</strong></label>

                                <textarea name="description2" class="form-control  @error('description2') is-invalid @enderror"  rows="3" required="required"></textarea>
                              @error('description2')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">Did they release the amount that is not in dispute? Or did they release any amount at all? <strong style="color:red;">*</strong></label>


                                <textarea name="description3" class="form-control  @error('description3') is-invalid @enderror"  rows="3" required="required"></textarea>
                              @error('description3')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">Which phase we were at when this issue occurred?
                            (Requirements define, Research/planning, execution (Mention the percentage of execution that was done), QC, Revisions and feedback) <strong style="color:red;">*</strong></label>


                                <textarea name="description4" class="form-control  @error('description4') is-invalid @enderror"  rows="3" required="required"></textarea>
                              @error('description4')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">What is the issue here? (Dispute/Milestone cancelation/Project cancelation/Client complaining to freelancer.com) <strong style="color:red;">*</strong></label>
                            <textarea name="description5" class="form-control  @error('description5') is-invalid @enderror"  rows="3" required="required"></textarea>
                          @error('description5')
                          <div class="mt-3">
                            <div class="alert alert-danger">{{ $message }}</div>
                            </div>
                          @enderror

                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">According to you, which of our team/individuals is responsible for this exactly? (You could not manage the project properly/the sales team brought the wrong project/the developers messed up or anything else. Write in detail) <strong style="color:red;">*</strong></label>

                                <textarea name="description6" class="form-control  @error('description6') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description6')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">'Was the work delivered fully to the clients satisfaction and as per the agreed job scope? <strong style="color:red;">*</strong></label>

                                <textarea name="description7" class="form-control  @error('description7') is-invalid @enderror"  rows="3" required="required"></textarea>
                              @error('description7')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">What was the deadline and was the deadline met? <strong style="color:red;">*</strong></label>

                                <textarea name="description8" class="form-control  @error('description8') is-invalid @enderror"  rows="3" required="required"></textarea>
                              @error('description8')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">What was the work about (You can share the instruction file) (optional) </label>

                                <textarea name="description9" class="form-control"  rows="3"></textarea>

                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">Describe the reason why we are here. In other words, write down why the client is this much dissatisfied and thinks of such extreme steps. <strong style="color:red;">*</strong></label>

                                <textarea name="description10" class="form-control  @error('description10') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description10')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">When did the client get dissatisfied the 1st time (Write the date, the reason, what he demanded and what measures were taken from your side after that) <strong style="color:red;">*</strong></label>

                                <textarea name="description11" class="form-control  @error('description11') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description11')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">When did the client get dissatisfied the 2nd time? (Write down the date, the reason, what he demanded and what measures were taken after that) <strong style="color:red;">*</strong></label>

                                <textarea name="description12" class="form-control  @error('description12') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description12')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">When did the client get dissatisfied the 3rd time? (Write down the date, the reason, what he demanded and what measures were taken from your side after that) <strong style="color:red;">*</strong></label>

                                <textarea name="description13" class="form-control  @error('description13') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description13')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">List down your weaknesses/shortcomings/lackings during this project. Please be honest and do not hide anything. That is in the best interest of you and the company! <strong style="color:red;">*</strong></label>
                                <textarea name="description14" class="form-control  @error('description14') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description14')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">If we have to win here, what is the percentage and value of the amount we should realistically claim (According to you)? <strong style="color:red;">*</strong></label>

                                <textarea name="description15" class="form-control  @error('description15') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description15')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">Write down anything that you did not specifically mention above. Remember, if we are not
                            aware of anything and the client blindsides us during the arbitration, the case will become very weak and it will be close to impossible for us to win it! <strong style="color:red;">*</strong></label>

                                <textarea name="description16" class="form-control  @error('description16') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description16')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">

                            <label for="">Please confirm all the above details are correct & complete & no information was hidden for the client
                            to blindside us. Repetition of such things may lead to tougher actions from the company as in a showcause letter, cash penalty etc. <strong style="color:red;">*</strong></label>

                                <textarea name="description17" class="form-control  @error('description17') is-invalid @enderror" rows="3" required="required"></textarea>
                              @error('description17')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Your Name<strong style="color:red;">*</strong></label>
                          <input type="text" class="form-control height-35 f-14  @error('pm_name') is-invalid @enderror" name="pm_name" value="">
                             @error('pm_name')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror

                    </div>
                    <div class="col-lg-6 col-md-6">
                        <label for="">Your Email <strong style="color:red;">*</strong></label>
                          <input type="email" class="form-control height-35 f-14  @error('pm_email') is-invalid @enderror" name="pm_email" value="">
                             @error('pm_email')
                             <div class="mt-3">
                               <div class="alert alert-danger">{{ $message }}</div>
                               </div>
                             @enderror

                    </div>







                </div>



                  <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3" type="submit" >Submit</button>

                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>


            </div>
        </form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>








</script>
