<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="col-10 d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today's Leads</h5>
                <div class="d-flex justify-content-between">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayLeadcount}}
                            <span class="f-12 font-weight-normal text-lightest">Leads Created Today</span>
                        </p>
                    </a>
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($avg_bid_value)}} $
                            <span class="f-12 font-weight-normal text-lightest">Avg. Bid Value</span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="col-2 d-block text-right">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="col-10 d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today Converted Leads</h5>
                <div class="d-flex justify-content-between">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayLeadconverted}}<span class="f-12 font-weight-normal text-lightest">Leads Converted Today</span></p>
                    </a>
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($todayLeadconvertedValue,2)}} $<span class="f-12 font-weight-normal text-lightest">Converted Lead Value</span>
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