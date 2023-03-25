@php
    $addProjectCategoryPermission = user()->permission('manage_project_category');
    $addClientPermission = user()->permission('add_clients');
    $editProjectMemberPermission = user()->permission('edit_project_members');
    $addEmployeePermission = user()->permission('add_employees');
    $addProjectMemberPermission = user()->permission('add_project_members');
    $addProjectMemberPermission = user()->permission('add_project_members');
    $createPublicProjectPermission = user()->permission('create_public_project');

@endphp
<link rel="stylesheet" href="{{asset('form-wizard/css/style.css')}}">
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>



<style type="text/css">
    /* body{background: linear-gradient(to right, #2c3b4e, #4a688a, #2c3b4e);} */

    .myBook, .page {
        background: #F3F9FF;
        border: none;
        padding: 3%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .myBook section button{position:absolute;bottom:0;}
    .page-next{right:0}

    .btn-primary:hover {
        color: #ffffff;
        background-color: #111 !important;
        border-color: #111 !important;
    }
    label.error{color:red;}
    .progress {position:relative; }
    .progress span {
        position:absolute;
        left:0;
        width:100%;
        text-align:center;
        z-index:2;
        font-weight:bold;
    }

    .progress{
        height: 25px;
        background: #262626;
        padding: 5px;
        overflow: visible;
        border-radius: 20px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #7992a8;
        margin-top: 50px;
    }

    .progress .progress-bar{
        border-radius: 20px;
        position: relative;
        animation: animate-positive 2s;
    }
    .progress .progress-value{
        display: block;
        padding: 3px 7px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        background: #191919;
        border: 1px solid #000;
        position: absolute;
        top: -40px;
        right: -10px;
    }
    .progress .progress-value:after{
        content: "";
        border-top: 10px solid #191919;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        bottom: -6px;
        left: 26%;
    }


    .sp1step p {
        font-size: 18px;
        color: #444;
        word-break: break-word;
        font-family: Georgia,"Times New Roman",Times,serif;
        text-align: center;
    }

    .sp1next {
        background: #1D82F5;
        border: none;
        text-transform: capitalize;
        font-family: arial;
        letter-spacing: 1px;
        padding: 8px 25px;
        border-radius: 52px;
    }
    .sp1next:hover{
        background: #111;
    }
    .page-prev.btn.btn-danger.sp1next {
        background: #111;
        border: none;
    }
    .page-prev.btn.btn-danger.sp1next:hover{
        background: #1D82F5;
        border: none;
    }
    .sp1step h4 {
        font-size: 20px;
        font-family: "Times New Roman",Times,serif;
        color: #1D82F5;
    }
    .sp1step a {
        color: #1D82F5;
    }

    .sp1step label {
        color: #1D82F5;
        font-family: Georgia,"Times New Roman",Times,serif;
        /* padding-right: 1px; */
    }
    #newsp12 {
        display: flex;
        align-items: stretch;
        justify-content: center;
        align-content: center;
        height: 100% !important;
    }
    #newsp12023 h4 a {
        color: #1D82F5;
    }

    #newsp12 .radio-inline+.radio-inline, .checkbox-inline+.checkbox-inline {
        margin-top: 0;
        margin-left: 0px;
    }

    #newsp12023 .radio-inline, .checkbox-inline {
        padding-left: 0;
        padding-bottom: 27px;
        flex-direction: row;
    }

    #newsp12 p {
        color: #444;
        font-size: 17px;
        font-family: arial;
        text-align: center;
    }

    #newsp12 .radio-inline, .checkbox-inline {
        padding-left: 0;
        margin-bottom: 0;
    }

    .progress-bar.active{
        animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;
    }
    @-webkit-keyframes animate-positive{
        0% { width: 0; }
    }
    @keyframes animate-positive{
        0% { width: 0; }
    }

    #ssp1 {
        margin-bottom: 30px !important;
    }
    .sp1step textarea.form-control{
        margin: 9px 0;
    }



    /* 1/14/2023  */

    .rad-label {
        display: flex;
        align-items: center;
        border-radius: 50px;
        padding: 14px 14px;
        cursor: pointer;
        transition: .3s;
        justify-content: center;
        align-content: flex-end;
        width: 100%;
        margin: 4px 4px;
        float: left;
        flex-direction: row;
    }
    .rad-label:hover,
    .rad-label:focus-within {
        background: hsla(0, 0%, 80%, .14);
    }

    .rad-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        height: 1px;
        opacity: 0;
        z-index: -1;
    }

    .rad-design {
        width: 22px;
        height: 22px;
        border-radius: 100px;

        background: linear-gradient(to right bottom, hsl(154, 97%, 62%), hsl(225, 97%, 62%));
        position: relative;
    }

    .rad-design::before {
        content: '';

        display: inline-block;
        width: inherit;
        height: inherit;
        border-radius: inherit;

        background: hsl(0, 0%, 90%);
        transform: scale(1.1);
        transition: .3s;
    }

    .rad-input:checked+.rad-design::before {
        transform: scale(0);
    }

    .rad-text {
        color: hsl(0, 0%, 60%);
        margin-left: 14px;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 900;

        transition: .3s;
    }

    .rad-input:checked~.rad-text {
        color: hsl(0, 0%, 40%);
    }


    /* ABS */
    /* ====================================================== */
    .abs-site-link {
        position: fixed;
        bottom: 40px;
        left: 20px;
        color: hsla(0, 0%, 0%, .5);
        font-size: 16px;
    }

    .newitem {
        margin: 0 auto;
        display: flex;
        width: 250px;
    }

    #newbts{
        margin-bottom: 20px;
    }

    #newsp12023 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    /* ============  */

    .myBook, .page {

        height: auto;

    }
    .progress-bar {

        background-color: green;

    }
    .progress {

        margin-bottom: 20px;
    }
    .progress .progress-value {
        display: block;
        padding: 8px 7px;
        font-size: 12px;
        color: #fff;
        border-radius: 4px;
        background: transparent;
        border: 0px solid #000;
        position: absolute;
        top: -1px;
        right: 7px;
    }

    .progress .progress-value:after {
        content: "";
        border-top: 0px solid #191919;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        bottom: -6px;
        left: 26%;
    }

    .newitem {
        padding-bottom: 60px;
    }
</style>

<div class="container mb-5">
    <div class="row">
        <div class="col-md-8 offset-2" style="overflow:hidden;padding:20px">

            <!-- <div class="progress">
                <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" >
                </div>
                <span style="text-align:center">Completed: 0%</span>
            </div> -->


            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" style="width: 0%;">
                    <div class="progress-value">0%</div>
                </div>
            </div>


            <form name="demo" id="demo" class="myBook" action="{{route('submit-qc-form')}}" method="post">
                @csrf
                <input type="hidden" name="milestone_id" value="{{$milestone_id}}">
                <!-- Step – 01:  -->
                <!-- Step – 01:  -->

                <section class="sp1step">
                    <h4 class="text-center" id="far"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p> Did you check the site is loading with https:// or not? If not, please add SSL and confirm. </p>

                    <!-- <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                        <label for="vehicle1"> Yes </label><br>

                    </label>

                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                        <label for="vehicle1"> No </label><br>
                    </label> -->

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="site_https" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="site_https" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>




                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p> Did you check the site is loading with favicon or not? If not, please add and confirm.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="favicon" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="favicon" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>


                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p> Did you check whether the client was using web mails or not? If yes, please confirm that the webmail is working perfectly.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="webmail" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="webmail" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p> Did you check whether the contact forms are working properly? If not, please add your own email and test that it's working properly with captcha. After testing, add client's email.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="contact_form" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="contact_form" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you check the social media links are working perfectly? If not, please check that those links are working perfectly and confirm.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="social_media" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="social_media" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>


                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you check whether the login, register, other top bar links, and footer links are working properly or not? If not, please fix it and confirm</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="login_link" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="login_link" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Visit the website and scroll down from the top to bottom for all main pages like home, about, service, product page, product category page and confirm that images and the sections are aligned properly.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="scroll_down" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="scroll_down" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you check whether there is any lorem ipsum text or not? If not, please fix them. If agreement was to keep lorem ipsum text, keep them as agreement says.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="lorem_text" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="lorem_text" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you check if there are any logical issues like need attention or not? If not checked, please check for issues and fix them. Example Issue (In this case, this form field will allow registration from people whose credit card will expire in a few months (4 months). Nobody else will be able to register/reserve a vehicle. For example, I personally have a few credit cards and the earliest expiration date is in 2024. So if I want to reserve a vehicle here, I can’t because there is no provision to pick a year after 2022. Look for such logical issues on the site, specially in the sections where there are functionalities. Screenshot: <a href="https://prnt.sc/ZCOCTbJiQorn" target="_blank">https://prnt.sc/ZCOCTbJiQorn</a></p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="logical_issues" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="logical_issues" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you checked the site's loading speed? If not, run test on GTmetrix and make sure the score is more than 55 and check Pingdom tool to check the page size. Ensure that the site meet our highest standard</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="loading_speed" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="loading_speed" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center"> Step – 01: Complete These Checklists Before Migration</h4> <br>
                    <p>Did you check the website on mobile device or smaller screens? If not, please make sure that major pages of the site are responsive perfectly on different screen sizes. For the sections that cannot be accommodated in the mobile screen, find a way to accommodate them in a reasonable manner. For example, tables with 5–6 columns</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="mobile_speed" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="mobile_speed" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <!-- alert  -->

                <section class="page" id="newsp12">
                    <h4 style="text-align: center;padding: 20px;color: #1D82F5;"> Congratulations!!! You've completed step-01 successfully.</h4><br/>

                    <p>Are You agree For Step 02</p>

                    <!-- <label class="radio-inline">
                        <input type="checkbox" id="ts" name="ts" value="1" required>
                        <label for="ts"> Yes</label>
                    </label>

                    <label class="radio-inline" id="ssp1">

                        <input type="checkbox" onclick="myFunction()">
                        <label for="ts"> No</label> <br>
                    </label> -->

                    <div class="newitem" id="newbts">
                        <label class="rad-label" >
                            <input type="checkbox" class="rad-input" name="step_1" id="ts" name="ts" value="1" required>
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="checkbox" class="rad-input" name="step_1" onclick="myFunction()">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>

                    <button type="button" class="page-prev btn btn-danger sp1next">Prev</button>
                    <button type="submit" class="page-next btn btn-success sp1next" id="sendForm">Step 02</button>



                </section>

                <!-- Step – 02: Start -->
                <!-- Step – 02: Start -->

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Did you check if the site was already migrated to the live server or not. If yes, make sure it is indexed and followed for search engines. Our developers normally no index a site from 2 places. One, from the “Reading” menu under “settings” where they select the option “Discourage search engines to crawl this site”. Another is robots txt. Here is its written “Disallow: /”, that means the entire site is blocked for bots. Need to remove both to make the site crawlable for the bots.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="migration" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="migration" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Did you check if all the links are working fine or not? In many cases, we saw that there are hashtag links, and IP address links even after the site is migrated. Please run a full-site check and fix where needed.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="links_working" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="links_working" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Add a backup plugin that can store and send backups to clients' email once per week. Ask the client for the email where he wants the backups to be stored.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="backup_plugin" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="backup_plugin" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Add an uptime monitoring plugin. Add client's email and 1-2 of our emails there, including <a href="mailto:developers@seopage1.net">developers@seopage1.net</a> and <a href="mailto:Rajat07me@gmail.com">Rajat07me@gmail.com</a> So both clients, and we get notified as soon as the site is down.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="uptime_monitoring" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="uptime_monitorig" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Keep a backup of the final website (This may be needed in case the client comes back after a few months and claims something was not done after that thing got messed up somehow).</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="final_backup" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="final_backup" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <section class="sp1step">
                    <h4 class="text-center">Step – 02: Complete These Checklists After Migration</h4> <br>

                    <p>Fill in the site title and tagline. Go to settings>General to find this: <a href="https://prnt.sc/xFoLFQjiqiLj" target="_blank">https://prnt.sc/xFoLFQjiqiLj</a>. Put a nice title of 60 characters max in the title field (based on competitors) and a relevant tagline/slogan. For the tagline, you can check with the client or if the client asks to put any of our choice, we can just put it.</p><br>

                    <div class="newitem">
                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="slogan" value="1">
                            <div class="rad-design"></div>
                            <div class="rad-text">Yes</div>
                        </label>

                        <label class="rad-label">
                            <input type="radio" class="rad-input" name="slogan" value="0">
                            <div class="rad-design"></div>
                            <div class="rad-text">No</div>
                        </label>
                    </div>



                    <button type="button" class="page-prev btn btn-danger sp1next ">Prev</button>
                    <button type="button" class="page-next btn btn-primary sp1next ">Next</button>

                </section>

                <!-- conditions -->

                <section class="page" id="newsp12023">

                    <h4 style="text-align: center;"> Terms of Service</h4> <br/>

                    <!-- <label class="radio-inline">
                        <input type="checkbox" id="ts" name="ts" value="1" required>
                        <label for="ts"> I agree</label>
                    </label> -->

                    <div class="newitem" id="newbts">
                        <label class="rad-label">
                            <input type="checkbox" class="rad-input" name="agree" id="ts" name="ts" value="1" required>
                            <div class="rad-design"></div>
                            <div class="rad-text">I agree</div>
                        </label>
                    </div>

                    <br></br>

                    <button type="button" class="page-prev btn btn-danger sp1next">Prev</button>
                    <button type="submit" class="page-next btn btn-success sp1next" id="sendForm">Complete</button>
                </section>
                <section class="page" style="margin:auto;text-align:center">
                    Your form has been submitted.
                </section>

            </form>





        </div>

    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>

<script>

    $(document).ready(function(){

        $thing = $('#demo').book({
            onPageChange:updateProgress,
            speed:200}
        ).validate();

        /* IE doesn't have a trunc function */
        if (!Math.trunc) {
            Math.trunc = function (v) {
                return v < 0 ? Math.ceil(v) : Math.floor(v);
            };
        }

        /* Update progress bar whenever the page changes */
        function updateProgress(prevPageIndex, currentPageIndex, pageCount, pageName){
            t = (currentPageIndex / (pageCount-1)) * 100;

            $('.progress-bar').attr('aria-valuenow', t);
            $('.progress-bar').css('width', t+'%');
            // $('.progress span').text('Completed: '+Math.trunc(t)+'%');
            $('.progress-value').text(Math.trunc(t)+'%');

            //	console.log(pageName);
        }

        /* form's submit button */
        $('#sendForm').on('click', function(e){
            e.preventDefault();

            if ($('#demo').valid()){
                // do ajax thingy here
                alert('Your data was sent.');
            }
        });


    }); // end document ready

</script>

<!-- step alert  -->

<script>
    function myFunction() {
        var txt;
        if (confirm("No, I Want To Do IT Later!")) {
            txt = " You pressed Cancel!";
        }

        document.getElementById("demo").innerHTML = txt;
    }
</script>



<!-- radio   -->


<script>
    $("input[name='select']").change(function() {
        var selectedOption = $("input[name='select']:checked").val();
        $.ajax({
            type: "POST",
            url: "save-to-db.php",
            data: { option: selectedOption },
            success: function(response) {
                console.log(response);
            }
        });
    });
</script>


<!-- step  -->

<script>

    (function($){
        $.fn.book = function(options){

            var defaults = {
                onPageChange: function(){},
                speed: 400
            };

            var settings = $.extend(defaults, options);


            if (this.length > 1){
                this.each(function(){ $(this).book(options) });
                return this;
            }

            var pageIndex = 0;

            var $this = $(this);

            // The sections need to match the parent (<form>) container's size for animation to look correct
            var pages = $this.children('section').css({width:'100%',height:'100%',position:'relative'});



            // The form will expand to fit the container it's in (unless overridden).
            //this.css({width:'100%', display:'flex', margin:'auto', overflow:'hidden'});



            // Hide all but the first page
            // Add events to next and previous buttons found in the form
            this.initialize = function(){

                pages.hide();
                pages.first('section').show();

                pages.find('.page-next').on('click', this.nextPage);

                pages.find('.page-prev').on('click', this.prevPage);

                return this;
            }


            // Get current page number
            this.getPageIndex = function(){
                return pageIndex;
            }


            // Returns number of pages in this book
            this.getPageCount = function(){
                return pages.length;
            }


            // Set to a specific page
            this.setPage = function(i){

                return changePage(i);
            }




            function changePage(index){

                if (index >= 0 && index < pages.length && index != pageIndex){


                    // Only check validation if moving forward. Exit early if validation fails.
                    if ((index > pageIndex) && (typeof $this.valid === 'function')){
                        if (!$this.valid()){
                            return this;
                        }
                    }

                    oldPageIndex = pageIndex;            // retain for callback info
                    $currentPage = pages.eq(pageIndex);  // Get currently display page to slide off screen
                    $newPage     = pages.eq(index);      // Get target page to slide onto screen
                    pageIndex    = index;                // update pageIndex
                    pageName     = ($newPage[0].hasAttribute("name")) ? $newPage.attr('name') : null;  // used in callback

                    console.log('thingy');
                    if (typeof settings.onPageChange == 'function'){
                        settings.onPageChange.call(this, oldPageIndex, pageIndex, pages.length, pageName );
                    }



                    if (index > oldPageIndex){ // move forward

                        $currentPage.hide("slide", {direction:"left"}, settings.speed, function(){
                            $newPage.show("slide", {direction:"right"}, settings.speed);
                        });

                    }else{ // move back

                        $currentPage.hide("slide", {direction:"right"}, settings.speed, function(){
                            $newPage.show("slide", {direction:"left"}, settings.speed);
                        });

                    }

                }
                return this;
            };



            // Moves forward to the next page, if one is available
            this.nextPage = function(){
                if (pageIndex >= pages.length-1) return this;
                return changePage(pageIndex+1);
            };



            // Moves back to the previous page. If on first page already, does nothing
            this.prevPage = function(){
                if (pageIndex == 0) return this;
                return changePage(pageIndex-1);

            };


            return this.initialize();
        };


    }(jQuery));

</script>
