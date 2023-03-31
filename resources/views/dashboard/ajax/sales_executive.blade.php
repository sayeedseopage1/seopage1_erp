<div class="accordion" id="accordionExample">
    <div class="card">
        <div class="card-header" id="headingOne">
            <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Sales Executive (Today's Update)
                </button>
            </h2>
        </div>

        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
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

            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Sales Executive ({{\Carbon\Carbon::now()->firstOfMonth()->addDays(20)->toFormattedDateString()}} to {{\Carbon\Carbon::now()->firstOfMonth()->addMonths(1)->addDays(19)->toFormattedDateString()}} Update)
                </button>
            </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
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
               
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="headingThree">
            <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Sales Executive (General View) 
                </button>
            </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads</h5>
                                <div class="d-flex">
                                    <a href="#">
                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                            {{$totalleads}}
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
              
                <div class="row mt-3 mb-3">
                    <div class="col-md-6">
                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize w-100 h-200">
                                <h4 class="f-18 f-w-500 mb-2">Total Leads</h4>
                                <x-table class="h-200">
                                    <x-slot name="thead">
                                        <th class="pl-20 text-capitalize"> SL. No</th>
                                        <th class="pl-20 text-capitalize">Lead Name</th>
                                        <th class="pl-20 text-capitalize">Lead Value</th>
                                        <th class="pl-20 text-capitalize">Bid Value</th>
                                        <th class="pl-20 text-capitalize">Created Date</th>
                                        <th class="pl-20 text-capitalize">Conversion Status</th>
                                    </x-slot>
                                    @forelse($totalLeads as $value)
                                    <tr>
                                        <td>{{$loop->index+1}}</td>
                                        <td class="pl-20 text-capitalize ">
                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('leads.show', $value->id)}}" target="_blank">{!!html_entity_decode($value->client_name)!!}</a>
                                        </td>
                                        <td class="pl-20 text-capitalize">{{$value->bid_value}}-{{$value->bid_value2}}{{$value->original_currency->currency_symbol}}</td>
                                        <td class="pl-20 text-capitalize">{{$value->actual_value}}{{$value->original_currency->currency_symbol}}</td>
                                        <td class="pl-20 text-capitalize">
                                            @if($value->created_at != null)
                                            {{$value->created_at->format('Y-m-d')}}
                                            @else
                                            --
                                            @endif
                                        </td>
                                        <td class="pl-20 text-capitalize">
                                            @if($value->deal_status == 0)
                                            <i class="fas fa-circle" style="color:red;"></i> Not Converted
                                            @else 
                                            <i class="fas fa-circle" style="color:green;"></i> Converted

                                            @endif
                                        
                                        </td>
                                    </tr>
                                    @empty
                                        <tr>
                                            <td colspan="6" class="shadow-none">
                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                            </td>
                                        </tr>
                                    @endforelse
                                </x-table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h4 class="f-18 f-w-500 mb-2"><strong>Won Deals Table</strong></h4>
                                <x-table class="h-200">
                                    <x-slot name="thead">
                                        <th class="pl-20 text-capitalize">SL. No.</th>
                                        <th class="pl-20 text-capitalize">Won Deal Name</th>
                                        <th class="pl-20 text-capitalize">Won Deal Value</th>
                                        <th class="pl-20 text-capitalize">Won Date</th>
                                        <th class="pl-20 text-capitalize">Project Status</th>
                                    </x-slot>
                                    @forelse($totalDeals as $value)
                                    <tr>
                                        <td>{{$loop->index+1}}</td>
                                        <td class="pl-20 text-capitalize ">
                                            <a class="text-darkest-grey openRightModal" title="{{$value->project_name}}" href="{{route('deals.show', $value->id)}}" target="_blank">{{$value->project_name}}</a>
                                        </td>
                                        <td class="pl-20 text-capitalize">{{$value->actual_amount}}{{$value->original_currency->currency_symbol}}</td>
                                        <td class="pl-20 text-capitalize">{{$value->created_at->format('Y-m-d')}}</td>
                                        <td class="pl-20 text-capitalize">
                                            {{$value->status}}
                                            
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="7" class="shadow-none">
                                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                        </td>
                                    </tr>
                                    @endforelse
                                </x-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


