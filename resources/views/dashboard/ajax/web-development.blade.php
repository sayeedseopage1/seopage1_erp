<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>

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
 ?>
<div class="row">

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Members')" :value="$total_members"
                    icon="layer-group" />

        </div>


        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Sales Executive')" :value="$totalAcceptedProject"
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

                <x-cards.widget :title="__('Total Deals')" :value="$total_deals"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Won Deals')" :value="$total_won_deals"
                    icon="layer-group" />

        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">

                <x-cards.widget :title="__('Total Leads')" :value="$total_leads"
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





</div>
<?php
$project_managers= App\Models\User::where('role_id',4)->get();
$lead_developer= App\Models\User::where('role_id',6)->get();
$developer= App\Models\User::where('role_id',5)->get();

 ?>

    <x-cards.data :title="__('Project Manager Overview')" padding="false" >


<div class="row mb-3 ml-3 mr-3">
  @foreach($project_managers as $manager)
  <div class="col-sm-12 col-lg-6 mt-3">
      <x-cards.data :title="__('')" padding="false" >
        <h5 class="text-center mt-3"><span class="badge badge-primary">{{mb_ucwords($manager->name)}}</span></h5>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('Avg. Project Completion Time')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">
              <a href="javascript:;" id="cancel">
                  <x-cards.widget :title="__('Total Canceled Project')" :value="$totalCanceledProject"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('Neg. FB After Submission')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">

                  <x-cards.widget :title="__('Total Canceled Project')" :value="$totalCanceledProject"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>
        <div class="row ml-5">
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 ml-3" style="color:blue;">

                  <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <div class="col-xl-5 col-lg-6 col-md-6 mb-3 mr-3">

                  <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="$totalCanceledProject"
                      icon="layer-group" />

          </div>
          <!-- <div class="col-xl-4 col-lg-6 col-md-6 mb-3 mr-1">
              <a href="javascript:;" id="cancel">
                  <x-cards.widget :title="__('Total Canceled Project')" :value="$totalCanceledProject"
                      icon="layer-group" />
              </a>
          </div> -->
        </div>





      </x-cards.data>
  </div>
  @endforeach
</div>
  </x-cards.data>
<div class="row">
  <div class="col-sm-12 col-lg-6 mt-3">
      <x-cards.data :title="__('Project Manager Combined Overview')" padding="false" otherClasses="h-200">
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
      <x-cards.data :title="__('Project OverView')" padding="false" otherClasses="h-200">
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

<div class="row">
    @if (in_array('projects', $modules) && in_array('status_wise_project', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.statusWiseProject')">
                <x-pie-chart id="task-chart" :labels="$statusWiseProject['labels']"
                    :values="$statusWiseProject['values']" :colors="$statusWiseProject['colors']" height="250" width="300" />
            </x-cards.data>
        </div>
    @endif


    @if (in_array('projects', $modules) && in_array('pending_milestone', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.pendingMilestone')" padding="false" otherClasses="h-200">
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
<x-cards.data :title="__('Lead Developer Overview')" padding="false" >


<div class="row mt-3 ml-3 mr-3 mt-3">
@foreach($lead_developer as $lead_dev)
<div class="col-sm-12 col-lg-6 mt-3">
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
</x-cards.data>
<br>

{{-- Developer Overview--}}
<x-cards.data :title="__('Developer Overview')" padding="false" >


<div class="row mb-3 ml-3 mr-3 mt-3">
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
</x-cards.data>

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
