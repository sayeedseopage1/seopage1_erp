<div class="row">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$totalLeads->count()}}
                            <span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Converted</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$Leadconverted}}<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Lost</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$totalostdeal}}<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Bids Value</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($totalbidsValue,2)}} $<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Bids Value</h5>
                <div class="d-flex">
                    <a href="#">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($avg_value, 2)}} $<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                        
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Won Deals</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$totalwondeal}}<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> % of Leads Converted
                </h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                           
                            


                            {{round( $percentage_of_lead_converted, 2 )}}%

                            
                            
                            <span class="f-12 font-weight-normal text-lightest">



                            </span>

                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Won</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                           
                            {{round($percentage_of_deal_won, 2)}}%
                           
                            <span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Lost</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">

                           
                            {{-- $percentage = $lostLeads->where('deal_status', 'Lost')->count() / $lostLeads->count(); --}}
                           {{round($percentage_of_deal_lost,2)}}%

                            <span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Projects Got Rejected by PMs</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$rejectedbyPm}}<span class="f-12 font-weight-normal text-lightest"></span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Won Deals Getting Rejected</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$percentage_of_deal_getting_rejected}}%<span class="f-12 font-weight-normal text-lightest"></span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>