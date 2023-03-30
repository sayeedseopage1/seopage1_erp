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
                            <td colspan="5" class="shadow-none">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </div>
        </div>
    </div>
</div>