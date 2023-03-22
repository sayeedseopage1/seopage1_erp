<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="col-10 d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today's Leads</h5>
                <div class="d-flex justify-content-between">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayLead->count()}}
                            <span class="f-12 font-weight-normal text-lightest">Leads Created Today</span>
                        </p>
                    </a>
                    <a href="">
                        @if($todayLead->count() != 0)
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($todayLead->sum('value') / $todayLead->count(), 2)}}%<span class="f-12 font-weight-normal text-lightest">Avg. Lead Value</span>
                        </p>
                        @else
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">0%<span class="f-12 font-weight-normal text-lightest">Avg. Lead Value</span>
                        </p>


                        @endif
                    </a>
                    <a href="">
                        @if($todayLead->count() != 0)
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($todayLead->sum('bid_value') / $todayLead->count(), 2)}}%<span class="f-12 font-weight-normal text-lightest">Avg. Bid Value</span>
                        </p>
                        @else 
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">0%<span class="f-12 font-weight-normal text-lightest">Avg. Bid Value</span>
                        </p>


                        @endif
                    </a>
                </div>
            </div>
            <div class="col-2 d-block text-right">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today Converted Leads</h5>
                <div class="d-flex">
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$convertedLead->count()}}<span class="f-12 font-weight-normal text-lightest">Leads Converted Today</span></p>
                    </a>
                    <a href="">
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{$convertedLead->sum('value')}}<span class="f-12 font-weight-normal text-lightest">Converted Lead Value</span>
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
                            {{$totalLeads->where('status_id', 3)->count()}}<span class="f-12 font-weight-normal text-lightest">
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
                            {{$lostLeads->where('deal_status', 'Lost')->count()}}<span class="f-12 font-weight-normal text-lightest">
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
                            {{$totalLeads->sum('bid_value')}}<span class="f-12 font-weight-normal text-lightest">
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
                            {{round($totalLeads->sum('bid_value') / $totalLeads->count(), 2)}}<span class="f-12 font-weight-normal text-lightest">
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
                            {{$lostLeads->where('deal_status', 'pending')->where('won_lost', 'Yes')->count()}}<span class="f-12 font-weight-normal text-lightest">
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
                            @php
                                $percentage = $totalLeads->where('status_id', 3)->count() / $totalLeads->count();
                            @endphp
                            {{round( $percentage * 100, 2 )}} %<span class="f-12 font-weight-normal text-lightest">
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
                            @php
                                $percentage = $lostLeads->where('deal_status', 'pending')->where('won_lost', 'Yes')->count() / $lostLeads->count();
                            @endphp
                            {{round($percentage * 100, 2)}} %<span class="f-12 font-weight-normal text-lightest">
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
                            @php
                                $percentage = $lostLeads->where('deal_status', 'Lost')->count() / $lostLeads->count();
                            @endphp
                            {{round($percentage * 100, 2)}} %<span class="f-12 font-weight-normal text-lightest">
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Converted
                </h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span class="f-12 font-weight-normal text-lightest">
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Bids Value</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span class="f-12 font-weight-normal text-lightest">
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
<div class="row mt-3 mb-3">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0 h-200">
            <div class="d-block text-capitalize w-100">
                <h4 class="f-18 f-w-500 mb-2"><strong>Total Leads</strong></h4>
                <x-table class="h-200">
                    <x-slot name="thead">
                        <th class="pl-20 text-capitalize"> SL. No</th>
                        <th class="pl-20 text-capitalize">Lead Name</th>
                        <th class="pl-20 text-capitalize">Lead Budget</th>
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
                        <td class="pl-20 text-capitalize">{{$value->value}}</td>
                        <td class="pl-20 text-capitalize">{{$value->bid_value}}</td>
                        <td class="pl-20 text-capitalize">
                            @if($value->created_at != null)
                            {{$value->created_at->format('Y-m-d')}}
                            @else
                            --
                            @endif
                        </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$value->leadStatus->lable_color ?? 'red'}};"></i> {{$value->leadStatus->type ?? '--'}}</td>
                    </tr>
                    @endforeach

                </x-table>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0 h-200">
            <div class="d-block text-capitalize">
                <h4 class="f-18 f-w-500 mb-2"><strong>Total Tasks Assigned By Me</strong></h4>
                <x-table>
                    <x-slot name="thead">
                        <th>#</th>

                        <th class="pl-20 text-capitalize">Task</th>
                        <th class="pl-20 text-capitalize">Project</th>
                        <th class="pl-20 text-capitalize">Client</th>
                        <th class="pl-20 text-capitalize">Assignee</th>
                        <th class="pl-20">Status</th>

                    </x-slot>
                    @foreach($tasks as $task)
                    <?php
                    $task_member= App\Models\TaskUser::where('task_id',$task->id)->first();
                    $user_name= App\Models\User::where('id',$task_member->user_id)->first();
                    ?>
                    <tr>
                        <td>
                            {{$loop->index+1}}
                        </td>

                        <td class="pl-20 text-capitalize ">
                            <a class="text-darkest-grey openRightModal" title="{{$task->heading}}" href="/account/tasks/{{$task->id}}" target="_blank">{{$task->heading}}</a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class="text-darkest-grey openRightModal RightModal" title="{{$task->project->project_name}}" id="RightModal" href="/account/projects/{{$task->project->id}}" target="_blank">{{Str::limit($task->project->project_name,15)}}</a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class="openRightModal"  href="/account/clients/{{$task->project->client_id}}" title="{{$task->project->client_name->user_name}}" data-tooltip-bottom="{{$task->project->client_name->user_name}}">
                                @if($task->project->client_name->image != null)
                                <img class="mr-2 taskEmployeeImg rounded-circle" data-original-title="{{$task->project->client_name->user_name}}" src="{{asset('user-uploads/avatar/'. $task->project->client_name->image)}}" alt="{{$task->project->client_name->user_name}}">
                                @else
                                <img class="mr-2 taskEmployeeImg rounded-circle" src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$task->project->client_name->user_name}}" alt="{{$task->project->client_name->user_name}}" >
                                @endif
                            </a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class=""  href="/account/employees/{{$user_name->name}}" title="{{$user_name->name}}" data-tooltip-bottom="{{$user_name->name}}">
                                @if($task->project->client_name->image != null)
                                <img class="mr-2 taskEmployeeImg rounded-circle" data-original-title="{{$user_name->name}}" src="{{asset('user-uploads/avatar/'. $user_name->image)}}" alt="{{$user_name->name}}">
                                @else
                                <img class="mr-2 taskEmployeeImg rounded-circle" src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$user_name->name}}" alt="{{$user_name->name}}" >
                                @endif
                            </a>
                        </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$task->stat->label_color}}"></i> {{$task->status}}</td>

                    </tr>
                    @endforeach

                </x-table>

            </div>
        </div>
    </div>
</div>
