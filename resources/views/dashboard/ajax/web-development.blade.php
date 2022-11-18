<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<style media="screen">
    .card-color {
        background-color: #1d2026 !important;
    }
  .filter-custom {
	padding: 8px 17px;
	margin-top: 4px;
}
</style>
<?php
$total_members= App\Models\User::count();
$total_managers= App\Models\User::where('role_id',4)->count(); $total_lead_developers= App\Models\User::where('role_id',6)->count(); $total_developers= App\Models\User::where('role_id',5)->count(); $total_deals=
App\Models\Lead::where('deal_status',1)->count(); $total_won_deals= App\Models\Deal::count(); $total_leads= App\Models\Lead::count(); $total_clients= App\Models\ClientDetails::count(); $total_projects= App\Models\Project::count();
$total_task_completed= App\Models\Task::where('status','completed')->count(); $total_due_task= App\Models\Task::where('status','!=','completed')->count(); $total_overdue_task= App\Models\Task::where('board_column_id',7)->count();
$total_payment_release= App\Models\PMAssign::select('release_amount')->sum('release_amount'); $total_project_due= App\Models\Project::select('project_budget')->sum('project_budget'); $total_payment_due= $total_project_due -
$total_payment_release; $project_managers= App\Models\User::where('role_id',4)->get(); $lead_developer= App\Models\User::where('role_id',6)->get(); $developer= App\Models\User::where('role_id',5)->get(); ?> {{-- Individual Project Manager
Overview--}}
<div class="card col-md-4 mb-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Project Manager Combined Overview</h5></div>
<div class="row mt-2">
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>PM Name</th>
                    <th>No. of Projects</th>
                    <th>Total Project Value</th>
                    <th>Total Released Amount</th>
                    <th>% of Project Got Money Released</th>
                    <th>% of Project Got Canceled</th>
                    <th>% of Amount Projects Got Canceled</th>
                    <th>Average Project Completion Time</th>
                    <th>No of Projects Got Canceled</th>
                  {{-- <th>No. of Upsells (PM Made)</th>
                    <th>Value of Upsells (PM Made)</th>
                    <th>No. of Cross-sells (PM Made)</th>
                    <th>Value of Cross-sells (PM Made)</th> --}}
                </x-slot>

                @forelse($projectassign as $item)
                <tr>
                    <td class="pl-20">{{ $loop->index+1 }}</td>
                    <td>
                        <a href="#" data-toggle="modal" data-target="#manageroverviewmodal{{$item->pm_id}}" class="text-darkest-grey f-w-500">{{ ucfirst($item->project->name) }}</a>
                        @include('dashboard.modals.manageroverviewmodal')
                    </td>
                    <td>
                        {{$item->project_count}}
                    </td>
                    <td>
                        ${{round($item->amount,2)}}
                    </td>

                    <td>
                        ${{$item->release_amount}}
                    </td>
                    <td>
                        @if($item->project_count != 0) @php $total_release_percentage= ($item->release_amount/$item->amount)*100;
                        @endphp {{round($total_release_percentage,2)}}% @else No Project Assign Yet @endif
                    </td>
                    <td>
                        @if($item->project_count != 0) @php $project_cancel_count= App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->count(); $total_cancel_percentage=
                        ($project_cancel_count/$item->project_count)*100; @endphp {{$total_cancel_percentage}}% @else No Project Assign Yet @endif
                    </td>
                    <td>
                        @if($item->amount != 0) @php $project_cancel_amount= App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->sum('project_budget'); $total_cancel_amount=
                        ($project_cancel_amount/$item->amount)*100; @endphp {{$total_cancel_amount}}% @else No Project Assign Yet @endif
                    </td>
                    <td>
                        No Data
                    </td>
                    <td>
                        @if($item->project_count != 0) {{$project_cancel_count}} @else No Project Assign Yet @endif
                    </td>
                  {{-- <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td>
                    <td>
                        0
                    </td> --}}
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
                @endforelse
            </x-table>
        </x-cards.data>
    </div>
</div>
<hr />

<div class="row">
    @if (in_array('projects', $modules) && in_array('status_wise_project', $activeWidgets))
    <div class="col-sm-12 col-lg-6 mt-3">
        <x-cards.data :title="__('')">
            <div class="card col-md-6" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Status Wise Projects</h5></div>
            <x-pie-chart id="task-chart" :labels="$statusWiseProject['labels']" :values="$statusWiseProject['values']" :colors="$statusWiseProject['colors']" height="250" width="300" />
        </x-cards.data>
    </div>
    @endif
    <div class="col-sm-12 col-lg-6 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <div class="card col-md-6 mt-3 ml-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Status Wise Projects</h5></div>
            <br />

            <x-table class="border-0 pb-3 admin-dash-table table-hover">
                <x-slot name="thead">
                    <th>In Progress</th>
                    <th>Not Started</th>
                    <th>On Hold</th>
                    <th>Canceled</th>
                    <th>Completed</th>
                </x-slot>

                <tr>
                    <td>
                        @php $project_in_progress= App\Models\Project::where('status','in progress')->count(); @endphp {{$project_in_progress}}
                    </td>
                    <td>
                        @php $project_not_started= App\Models\Project::where('status','not started')->count(); @endphp {{ $project_not_started}}
                    </td>
                    <td>
                        @php $project_on_hold= App\Models\Project::where('status','on hold')->count(); @endphp {{$project_on_hold}}
                    </td>

                    <td class="f-14" width="20%">
                        @php $project_canceled= App\Models\Project::where('status','canceled')->count(); @endphp {{$project_canceled}}
                    </td>

                    <td>
                        @php $project_finished= App\Models\Project::where('status','finished')->count(); @endphp {{$project_finished}}
                    </td>
                </tr>
            </x-table>
        </x-cards.data>
    </div>
</div>
<hr />
{{-- Total Project Overview--}}
<div class="card col-md-4 mt-2 mb-3 ml-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Project OverView</h5></div>
<div class="col-sm-12 col-lg-12 mt-3">
    <x-cards.data :title="__('')" padding="false" otherClasses="h-200">

        <form id="myForm">


        <div class="row ml-2 mt-2 ">
          <!-- <div class="col-md-2">
            <label for="start_date">Start Date</label>
              <input type="date" class="form-control form-control-lg" name="" value="" placeholder="Start Date">
          </div>
          <div class="col-md-2">
            <label for="start_date">Due Date</label>
              <input type="date" class="form-control form-control-lg" name="" value="" placeholder="Start Date">
          </div>
          <div class="col-md-2">
            <label for="start_date">Due Date</label>
            <select class="form-control form-control-lg" name="">
              <option value="">Budget</option>
              <option value="">Progress</option>
            </select>

          </div> -->
          <?php
          $date= \Carbon\Carbon::now();
           ?>
          {{--<div class="col-md-6 col-lg-2 mt-1">
              <x-forms.datepicker fieldId="start_date"
                  :fieldLabel="__('modules.projects.startDate')" fieldName="start_date"
                  :fieldPlaceholder="__('Search By Start Date')" />
          </div>
          <div class="col-md-6 col-lg-2 mt-1">
              <x-forms.datepicker fieldId="due_date"
                  :fieldLabel="__('Due Date')" fieldName="due_date"
                  :fieldPlaceholder="__('Search By Due Date')" />
          </div> --}}
          <div class="col-md-6 col-lg-4">
              <x-forms.label class="my-3" fieldId="type_id"
                  :fieldLabel="__('Select Type')">
              </x-forms.label>
              <x-forms.input-group>
                  <select class="form-control select-picker" id="type_id" name="type_id"
                      data-live-search="true">
                      <option value="">--</option>

                          <option
                            value="budget"  >
                              Budget

                          </option>
                          <option
                            value="progress"  >
                            Progress

                          </option>

                  </select>


              </x-forms.input-group>
          </div>
          <div class="col-md-6 col-lg-4">
              <x-forms.label class="my-3" fieldId="stauts_id"
                  :fieldLabel="__('Select Status')">
              </x-forms.label>
              <x-forms.input-group>
                <?php
                $status= App\Models\ProjectStatusSetting::where('status_name','!=','finished')->get();
                 ?>
                  <select class="form-control select-picker" id="status_id" name="status_id"
                      data-live-search="true">
                      <option value="">--</option>
                      @foreach ($status as $data)



                          <option
                          value="{{$data->status_name}}" >
                            {{$data->status_name}}

                          </option>

                          @endforeach

                  </select>


              </x-forms.input-group>
          </div>
        {{--  <div class="col-md-6 col-lg-2 mt-5">
              <button class="btn-primary rounded f-14 p-y filter-custom" id="ajaxSubmit" type="button" >Filter</button>
          </div> --}}



        </div>
        <!-- <div class="d-flex justify-content-center mt-3">
          <button class="btn-primary rounded f-14 p-y" type="button" >Filter</button>
        </div> -->
          </form>
          <hr>


        <x-table class="border-0 pb-3 admin-dash-table table-hover">

            <x-slot name="thead">
                <th class="pl-20">#</th>
                <th>Project Name</th>
                <th>Project Budget</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Current Status</th>
                <th>Progress(%)</th>
            </x-slot>
                <tbody id="tbody">
            @forelse($projects as $item)
            <tr>
                <td class="pl-20">{{ $loop->index + 1 }}</td>
                <td>
                    <a href="{{ route('projects.show', [$item->id]) }}" class="text-darkest-grey f-w-500">{{ ucfirst($item->project_name) }}</a>
                </td>
                <td>
                  ${{ ucfirst($item->project_budget) }}
                </td>
                <td>
                    {{ date('d-m-Y', strtotime($item->start_date))}}
                </td>
                <td>
                    {{ date('d-m-Y', strtotime($item->deadline))}}
                </td>

                <?php
                      $status_id= App\Models\ProjectStatusSetting::where('status_name',$item->status)->first(); //dd($status_id); ?>
                <td class="f-14" width="20%">
                    <x-status :style="'color:'.$status_id->color" :value="$item->status" />
                </td>

                <td>
                    {{$item->completion_percent}}%
                </td>
            </tr>

            @empty
            <tr>
                <td colspan="5" class="shadow-none">
                    <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                </td>
            </tr>
              </tbody>

            @endforelse
        </x-table>
    </x-cards.data>
</div>
<hr>

{{-- Total Milestone Overview--}}

<div class="row mt-2">

    @if (in_array('projects', $modules) && in_array('pending_milestone', $activeWidgets))
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <div class="card col-md-6 mt-2 mb-3 ml-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Pending Milestone</h5></div>
            <x-table class="border-0 pb-3 admin-dash-table table-hover">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>@lang('modules.projects.milestoneTitle')</th>
                    <th>@lang('modules.projects.milestoneCost')</th>
                    <th>@lang('app.project')</th>
                </x-slot>

                @forelse($pendingMilestone as $key=>$item)
                <tr id="row-{{ $item->id }}">
                    <td class="pl-20">{{ $key + 1 }}</td>
                    <td>
                        <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500" data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                    </td>
                    <td>
                        @if (!is_null($item->currency_id)) {{ $item->currency->currency_symbol . $item->cost }} @else {{ $item->cost }} @endif
                    </td>
                    <td>
                        <a href="{{ route('projects.show', [$item->project_id]) }}" class="text-darkest-grey">{{ $item->project->project_name }}</a>
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
        </x-cards.data>
    </div>
    @endif
</div>
<hr />
<div class="card col-md-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Lead Developer Overview</h5></div>
<div class="row mb-3">
    @foreach($lead_developer as $lead_dev)
    <div class="col-sm-12 col-lg-12 mt-3 mb-3">
        <x-cards.data :title="__('')" padding="false">
            <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($lead_dev->name)}}</span></h5>
            <div class="row ml-2">
                <div class="col-xl-3 col-lg-3 col-md-2 mb-3" style="color: blue;">
                    <?php
         $number_of_projects= App\Models\ProjectMember::where('user_id',$lead_dev->id)->count(); //dd($number_of_projects); ?>

                    <x-cards.widget :title="__('Project completion rate within deadline')" :value="$totalCanceledProject . '%'" icon="layer-group" />
                </div>
                <div class="col-xl-3 col-lg-3 col-md-2 mb-3" style="color: blue;">
                    <x-cards.widget :title="__('Number of negative comments')" :value="$totalCanceledProject" icon="layer-group" />
                </div>
                <div class="col-xl-3 col-lg-3 col-md-2 mb-3" style="color: blue;">
                    <x-cards.widget :title="__('Negative rating percentage')" :value="$totalCanceledProject . '%'" icon="layer-group" />
                </div>
                <div class="col-xl-3 col-lg-3 col-md-2 mb-5" style="color: blue;">
                    <x-cards.widget :title="__('Percentage of tasks completed on time')" :value="$totalCanceledProject" icon="layer-group" />
                </div>

                <div class="col-xl-3 col-lg-3 col-md-2 mb-5" style="color: blue;">
                    <x-cards.widget :title="__('Project cancel rate')" :value="$totalCanceledProject . '%'" icon="layer-group" />
                </div>
            </div>
        </x-cards.data>
    </div>
    @endforeach
</div>

<hr />
{{-- Developer Overview --}}
<div class="card col-md-3 mt-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Developers Overview</h5></div>
<div class="row">
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Name</th>
                    <th>No. of tasks Working On</th>
                    <th>No. of projects Working On</th>
                    <th>Total Project Value</th>
                    <th>Avg.Task Completion Time</th>
                    <th>Task Approval Rate</th>
                </x-slot>
                @forelse($developers as $item)
                <tr>

                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                        <a href="/account/employees/{{$item->id}}" class="text-darkest-grey f-w-500">{{$item->name}}</a>
                    </td>
                    <td>
                      <?php
                        //$user_tasks= App\Models\TaskUser::with('task')->where('user_id',$item->id)->count();
                        $user_tasks = DB::table('tasks')
                          ->join('task_users', 'tasks.id', '=', 'task_users.task_id')

                          ->select('tasks.*', 'task_users.user_id')
                          ->where('user_id',$item->id)
                          ->where('board_column_id','=','2')

                          ->count();


                       ?>

                       {{$user_tasks}}


                    </td>
                    <td>
                      <?php

                              $user_projects = DB::table('projects')
                                ->join('project_members', 'projects.id', '=', 'project_members.project_id')

                                ->select('projects.*', 'project_members.user_id')
                                ->where('user_id',$item->id)
                                ->where('status','!=','not started')
                                ->Where('status','!=','finished')

                                ->count();
                                //dd($users);

                       ?>

                       {{$user_projects}}


                    </td>
                    <td>
                      <?php

                              $user_projects_value = DB::table('projects')
                                ->join('project_members', 'projects.id', '=', 'project_members.project_id')

                                ->select('projects.*', 'project_members.user_id')
                                ->where('user_id',$item->id)
                                ->where('status','!=','not started')
                                ->Where('status','!=','finished')

                                ->sum('project_budget');
                                //dd($users);

                       ?>

                       ${{$user_projects_value}}
                    </td>
                    <td>
                      <?php

                            $avg_task_completion_time= App\Models\ProjectTimeLog::where('user_id',$item->id)->avg('total_minutes');
                                //dd($users);

                       ?>
                       @if($avg_task_completion_time < 1)
                       No Data
                       @else
                       {{$avg_task_completion_time}} Minutes
                       @endif

                    </td>

                    <td>
                      <?php

                              $total_completed_tasks = DB::table('tasks')
                                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')

                                ->select('tasks.*', 'task_users.user_id')
                                ->where('user_id',$item->id)
                                ->where('status','completed')


                                ->count();
                              $total_assign_tasks= App\Models\TaskUser::where('user_id',$item->id)->count();

                        if ($total_assign_tasks == 0) {
                          $task_approval_rate= 0;
                        }else {
                          $task_approval_rate= ($total_completed_tasks/$total_assign_tasks)*100;
                        }

                                //dd($users);

                       ?>

                       {{round($task_approval_rate,2)}}%

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
        </x-cards.data>
    </div>
</div>
<hr />
{{-- Sales Executive Overview Leads--}}
<div class="card col-md-3 mt-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Sales Executive Overview (Leads)</h5></div>
<div class="row">
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Name</th>
                    <th>No. of Leads</th>
                    <th>No. of Leads Converted</th>
                    <th>Total Bids Value</th>
                    <th>Avg. Bids Value</th>
                    <th>Won Deals</th>
                    <th>% of Leads Conversion</th>
                    <th>% of Won Deal</th>
                    <th>Avg. Bidding Frequency</th>
                </x-slot>
                @forelse($sales as $sale)

                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                        <a href="/account/employees/{{$sale->user_id}}" class="text-darkest-grey f-w-500">{{$sale->user->name}}</a>
                    </td>
                    <td>{{$sale->leads_count}}</td>
                    <td>
                        {{$sale->deals_count}}
                    </td>
                    <td>
                        @if($sale->lead_value == null) Not Applicable @else ${{round($sale->lead_value,2)}} @endif
                    </td>
                    <td>
                        @if($sale->lead_value == null) Not Applicable @else @php $av_lead_value = $sale->lead_value/ $sale->leads_count; @endphp ${{round($av_lead_value,2)}} @endif
                    </td>

                    <td>
                        {{$sale->won_deals}}
                    </td>
                    <td>
                        @if($sale->leads_count == 0) Not Applicable @else @php $percentage_of_conversion = ($sale->deals_count/$sale->leads_count)*100; @endphp {{round($percentage_of_conversion,3)}}% @endif
                    </td>
                    <td>@if($sale->leads_count == 0) Not Applicable @else @php $percentage_of_won_deal = ($sale->won_deals/$sale->leads_count)*100; @endphp {{round($percentage_of_won_deal,3)}}% @endif</td>

                    <td>
                        @if($sale->avg_lead_time == null) Not Applicable @else {{round($sale->avg_lead_time,2)}} minutes @endif
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
        </x-cards.data>
    </div>
</div>
<hr />

{{-- Sales Executive Overview Deals--}}
<div class="card col-md-3 mt-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Sales Executive Overview (Deals)</h5></div>
<div class="row">
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Name</th>
                    <th>No. of Deals Converted</th>
                    <th>No. of Deals Lost</th>
                    <th>No. of deals moved to the price negotiation stage</th>
                    <th>Total Won Deals Value</th>
                    <th>Deal to Won Deals Conv. Rate</th>
                    <th>No of Wrong Deals</th>
                </x-slot>
                @forelse($sales as $deal)

                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                        <a href="/account/employees/{{$sale->user_id}}" class="text-darkest-grey f-w-500">{{$deal->user->name}}</a>
                    </td>
                    <td>{{$deal->deals_count}}</td>
                    <td>
                        {{$deal->lost_deals}}
                    </td>
                    <td>{{$deal->negotiation_started}}</td>
                    <td>@if($deal->deal_value== null) Not Applicable @else ${{round($deal->deal_value,2)}} @endif</td>

                    <td>@if($sale->deals_count == 0) Not Applicable @else @php $percentage_of_won_deal = ($sale->won_deals/$sale->deals_count)*100; @endphp {{$percentage_of_won_deal}}% @endif</td>
                    <td>{{$deal->wrong_deals}}</td>
                </tr>
                @empty

                <tr>
                    <td colspan="5" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
                @endforelse
            </x-table>
        </x-cards.data>
    </div>
</div>
<hr />
{{-- Leads And Deals Overview--}}
<div class="row">
    <div class="col-sm-12 col-lg-6 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <div class="card col-md-6 mt-3 ml-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Active Leads Overview</h5></div>
            <br />
            <x-table class="border-0 pb-3 admin-dash-table table-hover">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Lead Name</th>
                    <th>Created Date</th>
                    <th>Lead Value</th>
                    <th>Current Status</th>
                    <th>Created By</th>
                </x-slot>

                @forelse($leads as $lead)
                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                        {{$lead->client_name}}
                    </td>
                    <td>
                        {{($lead->created_at)->format('Y-m-d')}}
                    </td>
                    <td>{{$lead->value}}</td>
                    <td>{{$lead->lead_status->type}}</td>

                    <td>{{$lead->user->name}}</td>
                </tr>

                @empty
                <tr>
                    <td colspan="5" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
                @endforelse
            </x-table>
        </x-cards.data>
    </div>

    <div class="col-sm-12 col-lg-6 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <div class="card col-md-6 mt-3 ml-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Active Deals Overview</h5></div>
            <br />
            <x-table class="border-0 pb-3 admin-dash-table table-hover">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Deal Name</th>
                    <th>Created Date</th>
                    <th>Deal Value</th>
                    <th>Current Status</th>
                    <th>Created By</th>
                </x-slot>
                @forelse($deals as $deal)

                <tr>
                    <td class="pl-20">{{$loop->index+1}}</td>
                    <td>
                        {{$deal->client_name}}
                    </td>
                    <td>
                        {{($deal->updated_at)->format('Y-m-d')}}
                    </td>
                    <td>{{$deal->value}}</td>
                    <td>
                        <?php
                          $deal_id = App\Models\DealStage::where('lead_id',$deal->id)->first(); // dd($deal_id->deal_stage); ?> @if($deal_id != null) @if($deal_id->deal_stage == 0) Contact Made @elseif($deal_id->deal_stage == 1)
                        Requirements Defined @elseif($deal_id->deal_stage == 2) Proposal Made @else Negotiation Started @endif @endif
                    </td>

                    <td>{{$deal->user->name}}</td>
                </tr>
                @empty

                <tr>
                    <td colspan="5" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>

                @endforelse
            </x-table>
        </x-cards.data>
    </div>
</div>
<hr>

<div class="card col-md-3 mb-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Team Overview</h5></div>
<div class="row mt-2">
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Members')" :value="$total_members" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Sales Executive')" :value="0" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Project Manager')" :value="$total_managers" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Lead Developer')" :value="$total_lead_developers" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Developer')" :value="$total_developers" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Leads')" :value="$total_leads" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Deals')" :value="$total_deals" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Won Deals')" :value="$total_won_deals" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Clients')" :value="$total_clients" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Projects')" :value="$total_projects" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Task Completed')" :value="$total_task_completed" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Due Tasks')" :value="$total_due_task" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Overdue Tasks')" :value="$total_overdue_task" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Payment Released')" :value="$total_payment_release" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Total Payment Due')" :value="'USD '.$total_payment_due" icon="layer-group" />
    </div>
</div>
<hr />
<div class="card col-md-3 mb-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Dynamic Overview (Date Wise)</h5></div>
<div class="row mt-2">
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Leads')" :value="$new_leads" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Deals')" :value="$new_deals" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Qualified Sales')" :value="$new_qualified_sales" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Projects')" :value="$totalProject" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Clients')" :value="$new_clients" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Payment Released')" :value="'$ '.$payment_release" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Payment Due')" :value="'$ '.$payment_due" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Ongoing Project')" :value="$on_going_project" icon="layer-group" />
    </div>

    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Projects Under Review')" :value="$under_review" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Projects On Hold')" :value="$on_hold" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Projects Canceled')" :value="$canceled" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Projects Payment In Progress')" :value="$payment_in_progress" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Tasks')" :value="$new_task" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Tasks Completed')" :value="$task_completed" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Tasks Under Review')" :value="$task_under_review" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Due Tasks')" :value="$task_due" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Overdue Tasks')" :value="$task_overdue" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('New Milestone')" :value="$new_milestone" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Milestone Completed')" :value="$milestone_completed" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Incomplete Milestone')" :value="$milestone_incomplete" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Invoice Generated')" :value="$total_invoice" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Invoice Paid')" :value="$invoice_paid" icon="layer-group" />
    </div>
    <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
        <x-cards.widget :title="__('Invoice Unpaid')" :value="$invoice_unpaid" icon="layer-group" />
    </div>
</div>

<hr />

{{-- Contry Wise Client Overview--}}
<div class="card col-md-3 mt-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Country Wise Clients</h5></div>
<div class="row">
    <div class="col-sm-12 col-lg-12 mt-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Country</th>
                    <th>No. of Clients</th>
                    <th>No. of Projects</th>
                </x-slot>

                <tr>
                    <td class="pl-20"></td>
                    <td></td>
                    <td></td>

                    <td></td>
                </tr>

                <tr>
                    <td colspan="5" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
                </tr>
            </x-table>
        </x-cards.data>
    </div>
</div>
<hr />

{{-- Developer Overview--}}
{{--<div class="card col-md-3" style="background-color: #008ff8;"><h5 class="text-center mt-1 text-white">Developer Overview</h5></div>

<div class="row mb-3">
    @foreach($developer as $dev)
    <div class="col-sm-12 col-lg-6 mt-3">
        <x-cards.data :title="__('')" padding="false">
            <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($dev->name)}}</span></h5>
            <div class="row ml-5">
                <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color: blue;">
                    <x-cards.widget :title="__('Avg. Task Completion Time')" :value="$totalCanceledProject" icon="layer-group" />
                </div>
                <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3" style="color: blue;">
                    <x-cards.widget :title="__('Avg. Rating')" :value="$totalCanceledProject" icon="layer-group" />
                </div>
            </div>
            <div class="row ml-5">
                <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3">
                    <x-cards.widget :title="__('% of Tasks Compl. on Time')" :value="$totalCanceledProject" icon="layer-group" />
                </div>
                <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3"></div>
            </div>
        </x-cards.data>
    </div>
    @endforeach
</div>
--}}



<script>
    $("body").on("click", ".milestone-detail", function () {
        var id = $(this).data("milestone-id");
        var url = "{{ route('milestones.show', ':id') }}";
        url = url.replace(":id", id);
        $(MODAL_XL + " " + MODAL_HEADING).html("...");
        $.ajaxModal(MODAL_XL, url);
    });

    $("#save-dashboard-widget").click(function () {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-project-dashboard') }}",
            container: "#dashboardWidgetForm",
            blockUI: true,
            type: "POST",
            redirect: true,
            data: $("#dashboardWidgetForm").serialize(),
            success: function () {
                window.location.reload();
            },
        });
    });

    $("#overDue").click(function () {
        var dateRange = $("#datatableRange2").data("daterangepicker");
        var startDate = dateRange.startDate.format("{{ global_setting()->moment_date_format }}");
        var endDate = dateRange.endDate.format("{{ global_setting()->moment_date_format }}");

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;
        //console.log(url);

        string = `?status=overdue&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });
    $("#cancel").click(function () {
        var dateRange = $("#datatableRange2").data("daterangepicker");
        var startDate = dateRange.startDate.format("{{ global_setting()->moment_date_format }}");
        var endDate = dateRange.endDate.format("{{ global_setting()->moment_date_format }}");

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;

        string = `?status=canceled&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });

    $("#totalProjectsCount").click(function () {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });
    $("#totalAcceptedProjectsCount").click(function () {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?project_status=Accepted&start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    function getDateRange() {
        var dateRange = $("#datatableRange2").data("daterangepicker");
        var startDate = dateRange.startDate.format("{{ global_setting()->moment_date_format }}");
        var endDate = dateRange.endDate.format("{{ global_setting()->moment_date_format }}");

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var data = [];
        data["startDate"] = startDate;
        data["endDate"] = endDate;

        return data;
    }

</script>
<script type="text/javascript">
$(document).ready(function() {

    if ($('.custom-date-picker').length > 0) {
        datepicker('.custom-date-picker', {
            position: 'bl',
            ...datepickerConfig
        });
    }

    const dp1 = datepicker('#start_date', {
        position: 'bl',
        onSelect: (instance, date) => {
            dp2.setMin(date);
        },
        ...datepickerConfig
    });

    const dp2 = datepicker('#due_date', {
        position: 'bl',
        onSelect: (instance, date) => {
            dp1.setMax(date);
        },
        ...datepickerConfig
    });
  });

//For Project overview filtering
//   jQuery(document).ready(function(){
//    jQuery('#ajaxSubmit').click(function(e){
//     //e.preventDefault();
//     $.ajaxSetup({
//      headers: {
//          'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
//      }
//  });
//     jQuery.ajax({
//        url: "{{ route('project-overview-filter') }}",
//        method: "get",
//        data: {
//           start_date: jQuery('#start_date').val(),
//           due_date: jQuery('#due_date').val(),
//           type_id: jQuery('#type_id').val(),
//           status_id: jQuery('#status_id').val(),
//       },
//       success: function(response){
//         //console.log(response);
//           $.each(response,function (key,value){
//             $('tbody').append('<tr>'+
//             '<td>'+value['id']+'</td>\
//             <td>'+value['project_name']+'</td>\
//             <td>'+value['project_budget']+'</td>\
//             <td>'+value['start_date']+'</td>\
//             <td>'+value['deadline']+'</td>\
//             <td>'+value['status']+'</td>\
//             <td>'+value['completion_percent']+'</td>\
//             </tr>'
//           );
//           });
//       }
//     });
// });
// });

$(document).ready(function(){
  $("#type_id").on('change',function(){
    var type_id = $(this).val();
    $.ajax({
      url: "{{ route('project-overview-filter') }}",
      type:"GET",
      data:{'type_id':type_id},
      success:function(data){
        //console.log(data);
        var projects = data.projects;
        var html = '';
        console.log(projects);
        if(projects.length > 0){
          for (let i = 0; i < projects.length; i++) {
            html += `<tr>
            <td>${(i+1)}</td>
            <td>${projects[i]['project_name']}</td>
            <td>${projects[i]['project_budget']}$</td>
            <td>${new Date(projects[i]['start_date']).toDateString()}</td>
            <td>${new Date(projects[i]['deadline']).toDateString()}</td>
            <td>${projects[i]['status']}</td>
            <td>${projects[i]['completion_percent']}%</td>
            </tr>`;
          }
        }else {
           html += '<tr>\
           <td>No Projects Found</td>\
           </tr>';
        }
        $("#tbody").html(html);
      }
    });
  });
  $("#status_id").on('change',function(){
    var status_id = $(this).val();
    $.ajax({
      url: "{{ route('project-overview-filter') }}",
      type:"GET",
      data:{'status_id':status_id},
      success:function(data){
        //console.log(data);
        var projects = data.projects;
        var html = '';
        //console.log(projects);
        if(projects.length > 0){
          for (let i = 0; i < projects.length; i++) {
            html +=  `<tr>
            <td>${(i+1)}</td>
            <td>${projects[i]['project_name']}</td>
            <td>${projects[i]['project_budget']}$</td>
            <td>${new Date(projects[i]['start_date']).toDateString()}</td>
            <td>${new Date(projects[i]['deadline']).toDateString()}</td>
            <td>${projects[i]['status']}</td>
            <td>${projects[i]['completion_percent']}%</td>
            </tr>`;
          }
        }else {
           html += '<tr>\
           <td>No Projects Found</td>\
           </tr>';
        }
        $("#tbody").html(html);
      }
    });
  });
});
</script>
