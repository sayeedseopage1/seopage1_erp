<div class="row">
    <div class="col-md-12" id="pm-card-data">
        <div class="row mt-3" >
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Pending Amount (Upto last month)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unfinished milestones he has by 12 a.m. on the 1st of the month. This is the starting balance for this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$pm_pending_milestone_value_upto_last_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (This month)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones released during this calendar month which were also created during this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$pm_released_amount_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Assigned Amount (For this month)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones created during this calendar month. If any new milestones were created for older projects during this calendar month, that will count here as well. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$total_assigned_amount_for_this_cycle}} ($)</h5>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Released Amount (For this months projects)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the milestones released during this calendar month that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$pm_released_amount_this_month_create}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (For this months projects)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were also created during this calendar month. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$pm_unreleased_amount_month}} ($)</h5>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Total Unreleased Amount (Overall)
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the unreleased milestones that were created during this calendar month or before. Here, the old milestones will also count. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$pm_pending_milestone_value}} ($)</h5>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card p-3" style="border: none">
                    <p style="font-size: 16px; color:#777; font-weight: bold;">Cancelled Amount
                        <a href="#" style="color: #777" data-toggle="popover" data-placement="top" data-content="The sum of all the canceled milestones during this calendar month. Also, the unreleased milestones in the incomplete projects will add up here. We are considering calendar month here, not cycle." data-html="true" data-trigger="hover">
                            <svg class="svg-inline--fa fa-question-circle fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                            </svg>
                        </a>
                    </p>
                    <h5>{{$total_canceled_amount_for_this_cycle}} ($)</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="popover"]').on('click', function(event) {
            event.preventDefault();
        });
    });
</script>
