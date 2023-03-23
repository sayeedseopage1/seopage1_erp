<?php
$project_counts= App\Models\PMAssign::where('pm_id',$item->pm_id)->first();
if ($project_counts->project_count != 0) {
    $project_release_count= App\Models\Project::where('pm_id',$item->pm_id)->where('due',0)->count();
    if ($project_release_count != 0) {
        $total_release_percentage= ($project_release_count / $project_counts->project_count)* 100;
    }else {
        $total_release_percentage=0;
    }

    $project_cancelation=  App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->count();
    if ($project_cancelation != 0) {
        $percentage_of_project_cancelation = ($project_cancelation / $project_counts->project_count)*100;
    }else {
        $percentage_of_project_cancelation= 0;
    }

    $projects_on_hold= App\Models\Project::where('pm_id',$item->pm_id)->where('status','on hold')->count();
    if ($projects_on_hold != 0) {
        $projects_on_hold_percentage= ($project_counts->project_count / $projects_on_hold)*100;
    }else {
        $projects_on_hold_percentage= 0;
    }

}else {
    $total_release_percentage=0;
    $percentage_of_project_cancelation= 0;
    $projects_on_hold_percentage= 0;
}
if ($project_counts->amount != 0) {

    $project_cancelation_rate=  App\Models\Project::where('pm_id',$item->pm_id)->where('status','canceled')->sum('project_budget');
    $percentage_of_project_cancelation_rate= ($project_cancelation_rate/$project_counts->amount)*100;
}else {

    $percentage_of_project_cancelation_rate= 0;
}
?>
<div class="modal fade" id="manageroverviewmodal{{$item->pm_id}}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">{{ ucfirst($item->project->name) }}</h5>
                <div class="{{ request('tab') == 'overview' || request('tab') == '' ? 'd-none' : 'd-flex' }} ml-auto align-items-center border-left-grey border-left-grey-sm-0 h-100 pl-4">
                    <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i>
                    <div class="select-status">
                        <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange_{{$item->pm_id}}" placeholder="@lang('placeholders.dateRange')">
                    </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row" id="show_pm_{{$item->pm_id}}">
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
                        <x-cards.widget :title="__('Number of projects')" :value="$project_counts->project_count" icon="layer-group"/>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
                        <x-cards.widget :title="__('Total project value')" :value="round($project_counts->amount, 2)" icon="layer-group" />
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">
                        <x-cards.widget :title="__('Total released amount')" :value="$project_counts->release_amount" icon="layer-group" />
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('% of Project Got Completion')" :value="round($total_release_percentage, 2) .'%'" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('% of Project Got Canceled')" :value="round($percentage_of_project_cancelation, 2) . '%'" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('No. of Upsells')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('Value of Upsells')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('No. of Cross-sells')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('Value of Cross-sells')" :value="0" icon="layer-group" />

                    </div>


                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('Avg. Project Completion Time')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                        <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('Neg. FB After Submission')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                        <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="0" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                        <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="round($percentage_of_project_cancelation_rate, 2) . '%'" icon="layer-group" />

                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                        <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="$projects_on_hold_percentage .'%'" icon="layer-group" />

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
<script type="text/javascript">
    $(function() {
        @php
            $startDate = $startDate->addMonths(1);
            $endDate = $endDate->addMonths(1);
        @endphp
        function cb_{{$item->pm_id}}(start, end) {
            $('#datatableRange_{{$item->pm_id}}').val(start.format('{{ global_setting()->moment_date_format }}') +
                ' @lang("app.to") ' + end.format(
                    '{{ global_setting()->moment_date_format }}'));
        }
        
        $('#datatableRange_{{$item->pm_id}}').daterangepicker({
            @php
                $todayDate = \Carbon\Carbon::today()->format('d');
                if ($todayDate > 21) {
                    $thisMonthMoment = "moment().startOf('month').add(20, 'days'), moment().startOf('month').add(1, 'month').add(19, 'days')";
                    $lastMonthMoment = "moment().startOf('month').subtract(1, 'month').add(20, 'days'), moment().startOf('month').add(19, 'days')";
                } else {
                    $thisMonthMoment = "moment().startOf('month').subtract(1, 'month').add(20, 'days'), moment().startOf('month').add(19, 'days')";
                    $lastMonthMoment = "moment().startOf('month').subtract(2, 'month').add(20, 'days'), moment().startOf('month').subtract(1, 'month').add(19, 'days')";
                }
            @endphp
            
            locale: daterangeLocale,
            linkedCalendars: false,
            startDate: moment("{{ $startDate->format(global_setting()->date_format) }}", '{{ global_setting()->moment_format }}'),
            endDate: moment("{{ $endDate->format(global_setting()->date_format) }}", '{{ global_setting()->moment_format }}'),
            ranges: {
                "@lang('app.today')": [moment(), moment()],
                "@lang('app.last30Days')": [moment().subtract(29, 'days'), moment()],
                "@lang('app.thisMonth')": [{!! $thisMonthMoment !!}],
                "@lang('app.lastMonth')": [{!! $lastMonthMoment !!}],
                "@lang('app.last90Days')": [moment().subtract(89, 'days'), moment()],
                "@lang('app.last6Months')": [moment().subtract(6, 'months'), moment()],
                "@lang('app.last1Year')": [moment().subtract(1, 'years'), moment()]
            },
            opens: 'left',
        }, cb_{{$item->pm_id}});

        $('#datatableRange_{{$item->pm_id}}').on('apply.daterangepicker', function(ev, picker) {
            var dateRangePicker = $('#datatableRange_{{$item->pm_id}}').data('daterangepicker');
            var startDate = $('#datatableRange_{{$item->pm_id}}').val();
            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            const requestUrl = '{{route("dashboard.projectManageDetalsOnAdvanceDashboard")}}';


            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: ".admin-dashboard",
                type: 'POST',
                data: {
                    _token: '{{csrf_token()}}',
                    pm_id: '{{$item->pm_id}}',
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == 'success') {
                        $('#show_pm_{{$item->pm_id}}').html(response.html);
                    }
                }
            });
        });
    });
</script>
