<div class="row">
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#num_of_lead{{ $number_of_leads_received }}">
                            {{ $number_of_leads_received }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.num_of_lead_modal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads that got converted to deals</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#no_of_lead_converted_to_deals{{ $number_of_leads_convert_deals) }}">
                            {{ $number_of_leads_convert_deals }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.no_of_lead_that_got_converted_to_deals_modal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads that got converted to won deals</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#no_of_lead_converted_won_deal{{ count($number_of_leads_convert_won_deals_get) }}">
                            {{ $number_of_leads_convert_won_deals }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.no_of_lead_converted_to_won_deals_modal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average bidding amount (For leads)</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_bidding_amount{{ count($number_of_leads_received_get) }}">
                            {{ $average_number_of_leads_amount }}$
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.avg_bidding_amount')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average bidding delay time</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_bidding_delay_time{{ count($number_of_leads_received_get) }}">
                            {{ $average_bidding_delay_time }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.avg_bidding_delay_time')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Bidding frequency</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#bidding_frequency{{ count($number_of_leads_received_get) }}">
                            {{ $bidding_frequency }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.bidding_frequency')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Country wise bidding breakdown</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#country_wise_bidding{{ count($country_wise_lead_counts) }}">
                            {{ count($country_wise_lead_counts) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.country_wise_bidding')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row d-flex justify-content-between mb-3">
    <div class="col-md-6">
        <h4 class="bg-white rounded b-shadow-4 mb-4 mb-md-0 mb-lg-0 d-inline-block" style="padding: 7px;">Core Metrics
            For Closers :-</h4>
    </div>
</div>
<div class="row">
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of won deals</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#num_of_won_deal{{ count($no_of_won_deals_count) }}">
                            {{ count($no_of_won_deals_count) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.num_of_won_deal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of won deals</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#value_of_won_deal{{ count($no_of_won_deals_count) }}">
                            ${{ round($no_of_won_deals_value, 2) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.value_of_won_deals')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Country wise won deals</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#country_wise_won_deal{{ count($country_wise_won_deals_count) }}">
                            {{ count($country_wise_won_deals_count) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.country_wise_won_deal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average deal amount</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_deal_amount{{ count($no_of_won_deals_count) }}">
                            ${{ round($avg_deal_amount, 2) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.avg_deal_amount')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion/Won deal ratio</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#finished_project{{ count($finished_project_count) }}">
                            {{ round($finished_project_ratio, 2) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.finished_project')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled project count/won deal ration</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#canceled_project{{ count($canceled_project_count) }}">
                            {{ round($canceled_project_ratio, 2) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.canceled_project')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rejected project count/won deal ratio</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#rejected_project{{ count($rejected_project_count) }}">
                            {{ round($rejected_project_ratio, 2) }}
                        </a>
                    </p>
                    @include('dashboard.ajax.salesexecutive.modals.rejected_project')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
