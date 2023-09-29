<div class="row">
    <div class="col-md-12" id="pm-card-data">
        <div class="row mt-3" >
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Pending Amount (Upto last month)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the unfinished milestones he has by 12 a.m. on the 1st of the month. This is the starting balance for this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$pm_pending_milestone_value_upto_last_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (This month)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones released during this calendar month which were also created during this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$pm_released_amount_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Assigned Amount (For this month)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones created during this calendar month. If any new milestones were created for older projects during this calendar month, that will count here as well. We are considering calendar month here, not cycle. " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$total_assigned_amount_for_this_cycle}} ($)</h5>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (For this months projects)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones released during this calendar month that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$pm_released_amount_this_month_create}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (For this months projects)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were also created during this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$pm_unreleased_amount_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (Overall)
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$pm_pending_milestone_value}} ($)</h5>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Cancelled Amount
                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The sum of all the canceled milestones during this calendar month. Also, the unreleased milestones in the incomplete projects will add up here. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                        </svg>
                    </p>
                    <h5>{{$total_canceled_amount_for_this_cycle}} ($)</h5>
                </div>
            </div>
        </div>
    </div>
</div>
