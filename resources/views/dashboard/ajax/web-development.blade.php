<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<style media="screen">

.card-color {
  background-color: #1D2026 !important;
}
</style>
<?php
$total_members= App\Models\User::count();
$total_managers= App\Models\User::where('role_id',4)->count();
$total_lead_developers= App\Models\User::where('role_id',6)->count();
$total_developers= App\Models\User::where('role_id',5)->count();
$total_deals= App\Models\Lead::where('deal_status',1)->count();
$total_won_deals= App\Models\Deal::count();
$total_leads= App\Models\Lead::count();
$total_clients= App\Models\ClientDetails::count();
$total_projects= App\Models\Project::count();
$total_task_completed= App\Models\Task::where('status','completed')->count();
$total_due_task= App\Models\Task::where('status','!=','completed')->count();
$total_overdue_task= App\Models\Task::where('board_column_id',7)->count();
$total_payment_release= App\Models\PMAssign::select('release_amount')->sum('release_amount');
$total_project_due= App\Models\Project::select('project_budget')->sum('project_budget');
$total_payment_due= $total_project_due - $total_payment_release;
 ?>
 <div class="card col-md-2 mb-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Team Overview</h5></div>
<div class="row mt-2">

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Members')" :value="$total_members"
                    icon="layer-group" />

        </div>


        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Sales Executive')" :value="0"
                    icon="layer-group" />

        </div>



        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Project Manager')" :value="$total_managers"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Lead Developer')" :value="$total_lead_developers"
                    icon="layer-group" />

        </div>


        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Developer')" :value="$total_developers"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Leads')" :value="$total_leads"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Deals')" :value="$total_deals"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Won Deals')" :value="$total_won_deals"
                    icon="layer-group" />

        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Clients')" :value="$total_clients"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Projects')" :value="$total_projects"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Task Completed')" :value="$total_task_completed"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Due Tasks')" :value="$total_due_task"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Overdue Tasks')" :value="$total_overdue_task"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Payment Released')" :value="$total_payment_release"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Payment Due')" :value="'USD '.$total_payment_due"
                    icon="layer-group" />

        </div>





</div>
<hr>
<div class="card col-md-3 mb-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Dynamic Overview (Date Wise)</h5></div>
<div class="row mt-2">

       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Leads')" :value="$new_leads"
                   icon="layer-group" />

       </div>


       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Deals')" :value="$new_deals"
                   icon="layer-group" />

       </div>



       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Qualified Sales')" :value="$new_qualified_sales"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Projects')" :value="$totalProject"
                   icon="layer-group" />

       </div>


       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Clients')" :value="$new_clients"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Payment Released')" :value="'$ '.$payment_release"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Payment Due')" :value="'$ '.$payment_due"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Ongoing Project')" :value="$on_going_project"
                   icon="layer-group" />

       </div>

       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Projects Under Review')" :value="$under_review"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Projects On Hold')" :value="$on_hold"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Projects Canceled')" :value="$canceled"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Projects Payment In Progress')" :value="$payment_in_progress"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Tasks')" :value="$new_task"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Tasks Completed')" :value="$task_completed"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Tasks Under Review')" :value="$task_under_review"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Due Tasks')" :value="$task_due"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Overdue Tasks')" :value="$task_overdue"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('New Milestone')" :value="$new_milestone"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Milestone Completed')" :value="$milestone_completed"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Incomplete Milestone')" :value="$milestone_incomplete"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Invoice Generated')" :value="$total_invoice"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Invoice Paid')" :value="$invoice_paid"
                   icon="layer-group" />

       </div>
       <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

               <x-cards.widget :title="__('Invoice Unpaid')" :value="$invoice_unpaid"
                   icon="layer-group" />

       </div>










</div>

<hr>
<?php
$project_managers= App\Models\User::where('role_id',4)->get();
$lead_developer= App\Models\User::where('role_id',6)->get();
$developer= App\Models\User::where('role_id',5)->get();

 ?>
<div class="card col-md-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Project Manager Overview</h5></div>



<div class="row mb-3">
  @foreach($project_managers as $manager)
  <div class="col-sm-12 col-lg-6 mt-3">
      <x-cards.data :title="__('')" padding="false" >
        <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($manager->name)}}</span></h5>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('Avg. Project Completion Time')" :value="0"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="0"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">
              <a href="javascript:;" id="cancel">
                  <x-cards.widget :title="__('Total Canceled Project')" :value="0"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('Neg. FB After Submission')" :value="0"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="0"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">

                  <x-cards.widget :title="__('Total Canceled Project')" :value="0"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="0"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="0"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">
              <a href="javascript:;" id="cancel">
                  <x-cards.widget :title="__('Total Canceled Project')" :value="0"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>





      </x-cards.data>
  </div>
  @endforeach
</div>
<hr>


<div class="row mt-2">
  <div class="col-sm-12 col-lg-6 mt-3">
      <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
        <div class="card col-md-6 mt-2 mb-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Project Manager Combined Overview</h5></div>
          <x-table class="border-0 pb-3 admin-dash-table table-hover">

              <x-slot name="thead">
                  <th class="pl-20">#</th>
                  <th>PM Name</th>
                  <th>No. of Projects</th>
                  <th>Total Project Value</th>
                  <th>Total Released Amount</th>
              </x-slot>

              @forelse($projectassign as $item)
                  <tr>
                      <td class="pl-20">{{ $loop->index+1 }}</td>
                      <td>
                          <a href="/account/employees/{{$item->pm_id}}" class="text-darkest-grey f-w-500"
                            >{{ ucfirst($item->project->name) }}</a>
                      </td>
                      <td>
                        {{$item->project_count}}
                      </td>
                      <td>
                          ${{$item->amount}}
                      </td>
                      <?php
                      $pm_projects= App\Models\PMProject::where('pm_id',$item->pm_id)->get();

                      foreach ($pm_projects as $value) {
                        $payment= 0;
                        $payment_s= App\Models\Payment::where('project_id',$value->project_id)->where('status','complete')->sum('amount');
                        $payment += $payment+$payment_s;

                      }

                       ?>
                      <td>{{$payment}}</td>
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
          <div class="card col-md-6 mt-2 mb-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Project OverView</h5></div>
          <x-table class="border-0 pb-3 admin-dash-table table-hover">

              <x-slot name="thead">
                  <th class="pl-20">#</th>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Current Status</th>
                  <th>Progress(%)</th>
              </x-slot>

              @forelse($projects as $item)
                  <tr >
                      <td class="pl-20">{{ $loop->index + 1 }}</td>
                      <td>
                          <a href="{{ route('projects.show', [$item->id]) }}" class="text-darkest-grey f-w-500"
                              >{{ ucfirst($item->project_name) }}</a>
                      </td>
                      <td>
                        {{
                        date('d-m-Y', strtotime($item->start_date))}}

                      </td>
                      <td>
                        {{
                        date('d-m-Y', strtotime($item->deadline))}}
                      </td>

                        <?php
                          $status_id= App\Models\ProjectStatusSetting::where('status_name',$item->status)->first();
                          //dd($status_id);
                         ?>
                         <td class="f-14" width="20%">
                           <x-status :style="'color:'.$status_id->color"
                                 :value="$item->status" />
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
              @endforelse
          </x-table>
      </x-cards.data>
  </div>
</div>
<hr>
{{-- Contry Wise Client Overview--}}
  <div class="card col-md-3 mt-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Country Wise Clients</h5></div>
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
                      <td>

                      </td>
                      <td>

                      </td>



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
<hr>
<div class="row">
    @if (in_array('projects', $modules) && in_array('status_wise_project', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('')">
                <div class="card col-md-6" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Status Wise Projects</h5></div>
                <x-pie-chart id="task-chart" :labels="$statusWiseProject['labels']"
                    :values="$statusWiseProject['values']" :colors="$statusWiseProject['colors']" height="250" width="300" />
            </x-cards.data>
        </div>
    @endif


    @if (in_array('projects', $modules) && in_array('pending_milestone', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
                <div class="card col-md-6 mt-2 mb-3 ml-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Pending Milestone</h5></div>
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
                                <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500"
                                    data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                            </td>
                            <td>
                                @if (!is_null($item->currency_id))
                                    {{ $item->currency->currency_symbol . $item->cost }}
                                @else
                                    {{ $item->cost }}
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('projects.show', [$item->project_id]) }}"
                                    class="text-darkest-grey">{{ $item->project->project_name }}</a>
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
<br>
{{-- Lead Developer Overview--}}
<hr>

<div class="card col-md-2" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Lead Developer Overview</h5></div>
<div class="row mb-3">
@foreach($lead_developer as $lead_dev)
<div class="col-sm-12 col-lg-6 mt-3 mb-3">
  <x-cards.data :title="__('')" padding="false" >
    <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($lead_dev->name)}}</span></h5>
    <div class="row ml-5">
      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

              <x-cards.widget :title="__('Avg. Milestone Completion Time')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>
      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3" style="color:blue;">

              <x-cards.widget :title="__('Avg. Rating')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>


    </div>
    <div class="row ml-5">

      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3">

              <x-cards.widget :title="__('% of Milestone Compl. on Time')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>
      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3" style="color:blue;">

              <x-cards.widget :title="__('% of Milestone Cancl. Rate')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>

    </div>






  </x-cards.data>
</div>
@endforeach
</div>

<hr>

{{-- Developer Overview--}}
<div class="card col-md-2" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Developer Overview</h5></div>


<div class="row mb-3">
@foreach($developer as $dev)
<div class="col-sm-12 col-lg-6 mt-3">
  <x-cards.data :title="__('')" padding="false" >
    <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($dev->name)}}</span></h5>
    <div class="row ml-5">
      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

              <x-cards.widget :title="__('Avg. Task Completion Time')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>
      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3" style="color:blue;">

              <x-cards.widget :title="__('Avg. Rating')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>




    </div>
    <div class="row ml-5">

      <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3">

              <x-cards.widget :title="__('% of Tasks Compl. on Time')" :value="$totalCanceledProject"
                  icon="layer-group" />

      </div>
        <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">
          </div>



    </div>






  </x-cards.data>
</div>
@endforeach
</div>
<hr>


{{-- Leads And Deals Overview--}}
<div class="row">
  <div class="col-sm-12 col-lg-6 mt-3">
      <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
          <div class="card col-md-6 mt-3 ml-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Active Leads Overview</h5></div>
          <br>
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
          <div class="card col-md-6 mt-3 ml-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Active Deals Overview</h5></div>
          <br>
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
                          $deal_id = App\Models\DealStage::where('lead_id',$deal->id)->first();
                        //  dd($deal_id->deal_stage);
                         ?>
                         @if($deal_id != null)

                         @if($deal_id->deal_stage == 0)
                         Contact Made
                         @elseif($deal_id->deal_stage == 1)
                         Requirements Defined
                         @elseif($deal_id->deal_stage == 2)
                         Proposal Made
                         @else
                         Negotiation Started
                         @endif
                         @endif
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
{{-- Sales Executive Overview Leads--}}
<div class="card col-md-3 mt-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Sales Executive Overview (Leads)</h5></div>
<div class="row">
  <div class="col-sm-12 col-lg-12 mt-3">
      <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
          <x-table class="border-0 pb-3 admin-dash-table table-hover">

              <x-slot name="thead">
                  <th class="pl-20">#</th>
                  <th>Sales Executive Name</th>
                  <th>No. of Leads Converted
                    </th>
                  <th>Total Leads Value</th>
                  <th>Avg. Leads Value</th>
                    <th>No of Leads Converted</th>
                    <th>Leads Conversion Rate</th>

              </x-slot>


                  <tr>
                      <td class="pl-20"></td>
                      <td>

                      </td>
                      <td></td>
                      <td>

                      </td>
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
<hr>
{{-- Sales Executive Overview Deals--}}
<div class="card col-md-3 mt-3" style="background-color:#008ff8;"><h5 class="text-center mt-1 text-white">Sales Executive Overview (Deals)</h5></div>
<div class="row">
  <div class="col-sm-12 col-lg-12 mt-3">
      <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
          <x-table class="border-0 pb-3 admin-dash-table table-hover">

              <x-slot name="thead">
                  <th class="pl-20">#</th>
                  <th>Sales Executive Name</th>
                  <th>No. of Deals Converted
                    </th>
                  <th>Total Deals Value</th>
                  <th>Avg. Deals Value</th>
                    <th>No of Won Deals</th>
                    <th>Won Deal Conversion Rate</th>

              </x-slot>


                  <tr>
                      <td class="pl-20"></td>
                      <td>

                      </td>
                      <td></td>
                      <td>

                      </td>
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

<script>
    $('body').on('click', '.milestone-detail', function() {
        var id = $(this).data('milestone-id');
        var url = "{{ route('milestones.show', ':id') }}";
        url = url.replace(':id', id);
        $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_XL, url);
    });

    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-project-dashboard') }}",
            container: '#dashboardWidgetForm',
            blockUI: true,
            type: "POST",
            redirect: true,
            data: $('#dashboardWidgetForm').serialize(),
            success: function() {
                window.location.reload();
            }
        })
    });

    $('#overDue').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;
        //console.log(url);

        string = `?status=overdue&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });
    $('#cancel').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;

        string = `?status=canceled&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });

    $('#totalProjectsCount').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });
    $('#totalAcceptedProjectsCount').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?project_status=Accepted&start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    function getDateRange() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var data = [];
        data['startDate'] = startDate;
        data['endDate'] = endDate;

        return data;
    }
</script>
