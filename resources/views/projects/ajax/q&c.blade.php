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
        <x-form id="save-project-data-form" method="PUT">
            <div class="add-client bg-white rounded mb-5">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('Q & C Form')</h4>





                  <div class="col-md-8 col-lg-8 mt-3">
                    <h5>Step 1: Complete These Checklists Before Migration</h5>

                  </div>

                <div class="col-md-6 col-lg-8">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check1" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check the site is loading with https:// or not? If not, please add SSL and confirm.</label>

                          </div>
                          </div>

                    </div>
                </div>


                  <div class="col-md-6 col-lg-8">
                      <div class="form-group">
                          <div class="d-flex">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" name="check2" value="" required>
                              <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check the site is loading with favicon or not? If not, please add and confirm.</label>

                            </div>

                          </div>
                      </div>
                  </div>


                <div class="col-md-6 col-lg-8">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check3" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check whether the client was using web mails or not? If yes, please confirm that the webmail is working perfectly</label>

                          </div>

                        </div>
                    </div>
                </div>


                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check4" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check whether the contact forms are working properly? If not, please add your own email and test that it is working properly with captcha. After testing, add clients email.</label>

                          </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-8">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check5" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check the social media links are working perfectly? If not, please check that those links are working perfectly and confirm.</label>

                          </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check6" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check whether the login, register, other top bar links, and footer links are working properly or not? If not, please fix it and confirm.</label>

                          </div>


                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check7" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Visit the website and scroll down from the top to bottom for all main pages like home, about, service, product page, product category page and confirm that images and the sections are aligned properly.</label>

                          </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check8" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check whether there is any lorem ipsum text or not? If not, please fix them. If agreement was to keep lorem ipsum text, keep them as agreement says.</label>

                          </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check9" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check if there are any logical issues like need attention or not? If not checked, please check for issues and fix them. Example Issue (In this case, this form field will allow registration from people whose credit card will expire in a few months (4 months). Nobody else will be able to register/reserve a vehicle. For example, I personally have a few credit cards and the earliest expiration date is in 2024. So if I want to reserve a vehicle here, I can’t because there is no provision to pick a year after 2022. Look for such logical issues on the site, specially in the sections where there are functionalities. Screenshot: https://prnt.sc/ZCOCTbJiQorn).</label>

                          </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check10" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you checked the site loading speed? If not, run test on GTmetrix and make sure the score is more than 55 and check Pingdom tool to check the page size. Ensure that the site meet our highest standard.</label>

                          </div>


                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-12">
                    <div class="form-group">
                        <div class="d-flex">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="check11" value="" required>
                            <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check the website on mobile device or smaller screens? If not, please make sure that major pages of the site are responsive perfectly on different screen sizes. For the sections that cannot be accommodated in the mobile screen, find a way to accommodate them in a reasonable manner. For example, tables with 5–6 columns.</label>

                          </div>

                        </div>
                    </div>
                </div>
                <hr>
                <div class="col-md-8 col-lg-8 mt-3">
                  <h5>Step 2: Complete These Checklists After Migration</h5>

                </div>

              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check12" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for=""> Did you check if the site was already migrated to the live server or not. If yes, make sure it is indexed and followed for search engines. Our developers normally no index a site from 2 places. One, from the “Reading” menu under “settings” where they select the option “Discourage search engines to crawl this site”. Another is robots txt. Here is its written “Disallow: /”, that means the entire site is blocked for bots. Need to remove both to make the site crawlable for the bots.</label>

                        </div>

                      </div>
                  </div>
              </div>





              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check13" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Did you check if all the links are working fine or not? In many cases, we saw that there are hashtag links, and IP address links even after the site is migrated. Please run a full-site check and fix where needed.</label>

                        </div>

                      </div>
                  </div>
              </div>


              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check14" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Add a backup plugin that can store and send backups to client email once per week. Ask the client for the email where he wants the backups to be stored.</label>

                        </div>


                      </div>
                  </div>
              </div>

              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check15" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Add an uptime monitoring plugin. Add client email and 1-2 of our emails there, including developers@seopage1.net and Rajat07me@gmail.com. So both clients, and we get notified as soon as the site is down.</label>

                        </div>

                      </div>
                  </div>
              </div>

              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check16" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Keep a backup of the final website (This may be needed in case the client comes back after a few months and claims something was not done after that thing got messed up somehow).</label>

                        </div>


                      </div>
                  </div>
              </div>

              <div class="col-md-6 col-lg-12">
                  <div class="form-group">
                      <div class="d-flex">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name="check17" value="" required>
                          <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="">Fill in the site title and tagline. Go to settings>General to find this: https://prnt.sc/xFoLFQjiqiLj. Put a nice title of 60 characters max in the title field (based on competitors) and a relevant tagline/slogan. For the tagline, you can check with the client or if the client asks to put any of our choice, we can just put it.</label>

                        </div>

                      </div>
                  </div>
              </div>






            <br>
            <br>



                  </div>


                  <button  class="btn-primary rounded f-14 p-2 mr-3 ml-3" type="submit" >Submit</button>

                    <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>

            </div>
        </x-form>

    </div>
</div>


<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
