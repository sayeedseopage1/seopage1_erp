<!-- Modal -->
<div class="modal fade" id="qc_final_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Project QC Submission Form</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <?php
            $project_qc = App\Models\QCSubmission::where('project_id', $project->id)
                ->orderBy('id', 'desc')
                ->first();
            ?>
            <div class="modal-body">
                <div class="modal-body bg-additional-grey">
                    <div class="card bg-white border-0 b-shadow-4">
                        <div class="card-body ">
                            <h6 class="text-center">Step – 01: Complete These Checklists Before Migration</h6>
                            <table class="table align-middle mb-0 bg-white table-bordered">
                                <thead class="bg-light">
                                    <tr>
                                        <th>SL</th>
                                        <th>Query</th>
                                        <th>Response From Project Manager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                1
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked the site is loading with https:// or not? If not, please add SSL
                                                and confirm.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                    @if ($project_qc->site_https == 1)
                                                        Yes
                                                    @else
                                                        No
                                                    @endif
                                                @else
                                                    --
                                                @endif
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                2

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked the site is loading with favicon or not? If not, please add and
                                                confirm.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->favicon == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                3

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked whether the client was using web mails or not? If yes, please
                                                confirm that the webmail is working perfectly.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->webmail == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                4
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked whether the contact forms are working properly? If not, please
                                                add your own email and test that it's working properly with captcha.
                                                After testing, add client's email.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->contact_form == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                5

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked the social media links are working perfectly? If not, please
                                                check that those links are working perfectly and confirm.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->social_media == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                6

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked whether the login, register, other top bar links, and footer
                                                links are working properly or not? If not, please fix it and confirm

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->login_link == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                7

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Visited the website and scroll down from the top to bottom for all main
                                                pages like home, about, service, product page, product category page and
                                                confirm that images and the sections are aligned properly.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->scroll_down == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                8

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked whether there is any lorem ipsum text or not? If not, please fix
                                                them. If agreement was to keep lorem ipsum text, keep them as agreement
                                                says.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->lorem_text == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                9

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Did you check if there are any logical issues like need attention or
                                                not? If not checked, please check for issues and fix them. Example Issue
                                                (In this case, this form field will allow registration from people whose
                                                credit card will expire in a few months (4 months). Nobody else will be
                                                able to register/reserve a vehicle. For example, I personally have a few
                                                credit cards and the earliest expiration date is in 2024. So if I want
                                                to reserve a vehicle here, I can’t because there is no provision to pick
                                                a year after 2022. Look for such logical issues on the site, specially
                                                in the sections where there are functionalities.
                                            </div>
                                            Screenshot: <a href="https://prnt.sc/ZCOCTbJiQorn"
                                                target="_blank">https://prnt.sc/ZCOCTbJiQorn</a>

                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->logical_issues == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                10

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked the site's loading speed? If not, run test on GTmetrix and make
                                                sure the score is more than 55 and check Pingdom tool to check the page
                                                size. Ensure that the site meet our highest standard

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->loading_speed == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                11

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked the website on mobile device or smaller screens? If not, please
                                                make sure that major pages of the site are responsive perfectly on
                                                different screen sizes. For the sections that cannot be accommodated in
                                                the mobile screen, find a way to accommodate them in a reasonable
                                                manner. For example, tables with 5–6 columns

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->mobile_speed == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>


                                        </td>


                                    </tr>







                                </tbody>
                            </table>


                            <br>
                            <h6 class="text-center">Step – 02: Complete These Checklists After Migration
                            </h6>
                            <table class="table align-middle mb-0 bg-white table-bordered">
                                <thead class="bg-light">
                                    <tr>
                                        <th>SL</th>
                                        <th>Query</th>
                                        <th>Response From Project Manager</th>


                                    </tr>
                                </thead>
                                <tbody>


                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                1

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checked if the site was already migrated to the live server or not. If
                                                yes, make sure it is indexed and followed for search engines. Our
                                                developers normally no index a site from 2 places. One, from the
                                                “Reading” menu under “settings” where they select the option “Discourage
                                                search engines to crawl this site”. Another is robots txt. Here is its
                                                written “Disallow: /”, that means the entire site is blocked for bots.
                                                Need to remove both to make the site crawlable for the bots.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->migration == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                 @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                2

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Checking if all the links are working fine or not? In many cases, we saw
                                                that there are hashtag links, and IP address links even after the site
                                                is migrated. Please run a full-site check and fix where needed.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->links_working == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                3

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Added a backup plugin that can store and send backups to clients' email
                                                once per week. Ask the client for the email where he wants the backups
                                                to be stored.



                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->backup_plugin == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                4

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Add an uptime monitoring plugin. Add client's email and 1-2 of our
                                                emails there, including developers@seopage1.net and Rajat07me@gmail.com
                                                So both clients, and we get notified as soon as the site is down.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->uptime_monitoring == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                5

                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                Keep a backup of the final website (This may be needed in case the
                                                client comes back after a few months and claims something was not done
                                                after that thing got messed up somehow).

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->final_backup == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                6

                                            </div>
                                        </td>
                                        <td>
                                            Fill in the site title and tagline.
                                            Go to settings>General to find this: <a href="https://prnt.sc/xFoLFQjiqiLj"
                                                target="_blank">https://prnt.sc/xFoLFQjiqiLj </a>.
                                            <div class="d-flex align-items-center">


                                                Put a nice title of 60 characters max in the title field (based on
                                                competitors) and a relevant tagline/slogan. For the tagline, you can
                                                check with the client or if the client asks to put any of our choice, we
                                                can just put it.

                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">
                                                @if ($project_qc != null)
                                                @if ($project_qc->slogan == 1)
                                                    Yes
                                                @else
                                                    No
                                                @endif
                                                @else
                                                --
                                                @endif
                                            </p>

                                        </td>


                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                7

                                            </div>
                                        </td>
                                        <td>
                                            <h6>Admin Comment :</h6>
                                            @if ($project_qc != null)
                                            @if ($project_qc->admin_comment)
                                                <p class="fw-normal mb-1">{!! $project_qc->admin_comment !!}</p>
                                            @else
                                                <p>--</p>
                                            @endif
                                            @endif
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
