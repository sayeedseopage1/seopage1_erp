<?php

namespace App\Traits;

use App\Helper\Reply;
use App\Http\Requests\ClockIn\ClockInRequest;
use App\Models\Attendance;
use App\Models\AttendanceSetting;
use App\Models\CompanyAddress;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\EmployeeShiftSchedule;
use App\Models\Event;
use App\Models\Holiday;
use App\Models\Lead;
use App\Models\Deal;
use App\Models\LeadAgent;
use App\Models\Leave;
use App\Models\Notice;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\Ticket;
use App\Models\TicketAgentGroups;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use DateTime;
use App\Models\DealStage;

/**
 *
 */
trait SalesDashboardAdminView
{

    /**
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function SalesDashboardAdminView($sales)
    {
        // dd($sales);
        $this->viewEventPermission = user()->permission('view_events');
        $this->viewNoticePermission = user()->permission('view_notice');
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $currentDate = now(global_setting()->timezone)->format('Y-m-d');
        $this->checkTodayLeave = Leave::where('status', 'approved')
            ->select('id')
            ->where('leave_date', now(global_setting()->timezone)->toDateString())
            ->where('user_id', user()->id)
            ->where('duration', '<>', 'half day')
            ->first();
        $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();
        $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')
            ->first();

        $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();


        $now = now(global_setting()->timezone);
        $showClockIn = AttendanceSetting::first();

        $this->attendanceSettings = $this->attendanceShift($showClockIn);
        $currentWeekDates = [];
        $weekShifts = [];
        $this->currentWeekDates = $currentWeekDates;
        $this->weekShifts = $weekShifts;
        $this->showClockIn = $showClockIn->show_clock_in_button;
        $this->weekStartDate = $now->copy()->startOfWeek($showClockIn->week_start_from);
        $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
        $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6));
        $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);
        $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs(now()->toDateString(), user()->id);
        $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak(now()->toDateString(), user()->id);

        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);

        if (request()->ajax()) {
            // dd(request('startDate'),request('endDate'),request('user_id'));

            $salesId = $sales->id;
            // $this->username = DB::table('users')->where('id',$salesId)->value('name');
            $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            $endDate1 = request('endDate');
            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);
            $user_role = DB::table('users')->select('role_id')->where('id', $salesId)->first();
            $exclude_end_date = Carbon::parse($endDate)->subDays(45)->format('Y-m-d');
            $this->number_of_leads_received_fixed = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('project_type', 'fixed')
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_received_hourly = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('project_type', 'hourly')
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_received = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();
            $this->number_of_leads_received_get = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $this->number_of_leads_convert_deals_fixed = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'fixed')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_deals_hourly = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'hourly')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_deals = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_deals_get = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->get();

            $this->number_of_leads_convert_won_deals_fixed = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'fixed')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals_hourly = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'hourly')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals_get = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();


            //--------------     won deals  table     --------------------------//

            $this->number_of_leads_convert_won_deals_data = DB::table('deal_stages')
                ->select('deals.*', 'leads.created_at as lead_created')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            // average bidding 
            $number_of_leads_create_data = DB::table('leads')
                ->select('leads.*')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();
            $this->number_of_leads_create_data = $number_of_leads_create_data;

            $number_of_leads_create = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $number_of_leads_amount = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('value');

            if ($number_of_leads_create > 0) {
                $this->average_number_of_leads_amount = $number_of_leads_amount / $number_of_leads_create;
            } else {
                $this->average_number_of_leads_amount = 0;
            }



            // average bidding delay time 

            $number_of_leads_create = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $delay_minute = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('bidding_minutes');

            $delay_second = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('bidding_seconds');

            if ($number_of_leads_create > 0) {
                $this->average_bidding_delay_time = (($delay_minute * 60 + $delay_second) / $number_of_leads_create) / 60;
            } else {
                $this->average_bidding_delay_time = 0;

            }

            // ---------------bidding frequency--------------------------------------//  
            $total_minutes = 0;
            $freqency_count = 0;
            $attendence_data_by_user = DB::table('attendances')
                ->select('clock_in_time', 'clock_out_time')
                ->where('user_id', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            foreach ($attendence_data_by_user as $attendence) {

                if ($attendence->clock_out_time != Null) {
                    $lead_generate = DB::table('leads')
                        ->select('created_at')
                        ->where('user_id', $salesId)
                        ->where('created_at', '>=', $attendence->clock_in_time)
                        ->where('created_at', '<', $attendence->clock_out_time)
                        ->orderBy('created_at')
                        ->get();

                    $flag = 0;
                    $startTime = '';
                    foreach ($lead_generate as $lead) {

                        if ($flag == 0) {
                            $flag = 1;
                            $startTime = Carbon::parse($lead->created_at);

                        } else {
                            $endTime = Carbon::parse($lead->created_at);
                            $minutesDifference = $endTime->diffInMinutes($startTime);
                            $startTime = $endTime;
                            $total_minutes += $minutesDifference;
                            $freqency_count++;

                        }

                    }
                }
            }

            if ($freqency_count > 0) {
                $this->bidding_frequency = $total_minutes / $freqency_count;
            } else {
                $this->bidding_frequency = 0;

            }

            //Country wise bidding breakdown


            $number_of_leads_received = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $country_wise_lead_counts = DB::table('leads')
                ->select('country', DB::raw('COUNT(*) as lead_count'))
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->where('added_by', $salesId)
                ->groupBy('country')
                ->orderBy('lead_count', 'DESC')
                ->get();

            foreach ($country_wise_lead_counts as $leads) {

                $leads_percentage = ($leads->lead_count / $number_of_leads_received) * 100;

                $leads->leads_percentage = $leads_percentage;
            }
            $this->country_wise_lead_counts = $country_wise_lead_counts;

            // --------------Number of won deals (fixed)-------------//

            $number_of_leads_convert_won_deals = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'fixed')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_deals as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;

                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;

                }


                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                }

            }

            $this->won_deals_count_fixed = $won_deals_count;
            $this->won_deals_value_fixed = $won_deals_value;


            // --------------Number of won deals (hourly)-------------//

            $number_of_leads_convert_won_deals = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'hourly')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_deals as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += $won_deals->hourly_rate;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                }


                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                }
            }

            $this->won_deals_count_hourly = $won_deals_count;
            $this->won_deals_value_hourly = $won_deals_value;


            // --------------Number of won deals (Country wise)-------------//

            $leads_country_data = DB::table('leads')
                ->select('country')
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->distinct('country')
                ->get();

            foreach ($leads_country_data as $lead_country) {

                $number_of_leads_convert_won_deals = DB::table('deals')
                    ->select('deals.*')
                    ->join('leads', 'deals.lead_id', '=', 'leads.id')
                    ->where('leads.country', $lead_country->country)
                    ->where('deals.created_at', '>=', $startDate)
                    ->where('deals.created_at', '<', $endDate)
                    ->get();

                $won_deals_count = 0;
                $won_deals_value = 0;

                foreach ($number_of_leads_convert_won_deals as $won_deals) {

                    //closing the deal

                    if ($won_deals->added_by == $salesId) {

                        $won_deals_count += .125;
                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 * $won_deals->hourly_rate;

                        }

                    }

                    //The bidder

                    $leads = DB::table('leads')
                        ->where('added_by', $salesId)
                        ->where('id', $won_deals->lead_id)
                        ->count();

                    if ($leads > 0) {

                        $won_deals_count += .25;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .25 * $won_deals->amount;
                        } else {

                            $won_deals_value += .25 * $won_deals->hourly_rate;
                        }
                    }

                    //Qualifying

                    $qualify_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->lead_id)
                        ->where('deal_stage_id', 1)
                        ->count();

                    $qualify = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->lead_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 1)
                        ->count();

                    if ($qualify > 0) {
                        $won_deals_count += .0375 / $qualify_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                        }
                    }


                    //Needs Defined

                    $needs_defined_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 2)
                        ->count();

                    $needs_defined = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 2)
                        ->count();

                    if ($needs_defined > 0) {
                        $won_deals_count += .1875 / $needs_defined_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Proposal made

                    $proposal_made_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 3)
                        ->count();

                    $proposal_made = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 3)
                        ->count();

                    if ($proposal_made > 0) {
                        $won_deals_count += .125 / $proposal_made_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Negotiation started

                    $negotiation_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 4)
                        ->count();

                    $negotiation = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 4)
                        ->count();

                    if ($negotiation > 0) {
                        $won_deals_count += .125 / $negotiation_contribution;


                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Sharing milestone breakdown

                    $milestone_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 5)
                        ->count();

                    $milestone = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 5)
                        ->count();

                    if ($milestone > 0) {
                        $won_deals_count += .15 / $milestone_contribution;


                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                        }
                    }
                }

                $lead_country->won_deals_count = $won_deals_count;
                $lead_country->won_deals_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;

            }

            $sort_leads_country_data = $leads_country_data->sortByDesc('won_deals_value');

            $this->leads_country_data = $sort_leads_country_data;

            //---------------Project completion/Won deal ratio-----------------------------------//


            $this->project_completion_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.status', 'finished')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->project_canceled_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->whereIn('projects.status', ['canceled', 'partially finished'])
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->project_reject_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.project_status', 'Not Accepted')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->won_deal_count = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $exclude_end_date)
                ->count();

            $this->won_deal_count_get = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $exclude_end_date)
                ->get();

            // exclude one for end cycle date and other for today.  suppose today december 20  and end cycle 31. but logic will be  20-exclude date for current month 

            $this->won_deal_count_reject_project = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $endDate)
                ->count();

            // same logic for end date for current month
            if ($this->won_deal_count > 0) {
                $this->project_completion_count_ratio = ($this->project_completion_count / $this->won_deal_count) * 100;
            } else {
                $this->project_completion_count_ratio = 0;
            }

            if ($this->won_deal_count > 0) {
                $this->project_canceled_count_ratio = ($this->project_canceled_count / $this->won_deal_count) * 100;
            } else {
                $this->project_canceled_count_ratio = 0;
            }


            if ($this->won_deal_count_reject_project > 0) {
                $this->project_reject_count_ratio = ($this->project_reject_count / $this->won_deal_count_reject_project) * 100;
            } else {
                $this->project_reject_count_ratio = 0;
            }



            //--------Reject Projects Count---------------//

            $this->project_reject_count_data = DB::table('contracts')
                ->select('projects.*', 'contracts.last_updated_by')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.project_status', 'Not Accepted')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->get();

            // --------------Number of won deals table (fixed)-------------//

            $number_of_leads_convert_won_deals_table = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'fixed')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';

            foreach ($number_of_leads_convert_won_deals_table as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;

                    $won_deals->closing_deal = $yes;


                } else {

                    $won_deals->closing_deal = $no;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;
                    $won_deals->bidder = $yes;
                } else {

                    $won_deals->bidder = $no;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->distinct('updated_by')
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0 && $qualify_contribution > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                    $won_deals->qualifying = $yes;
                } else {

                    $won_deals->qualifying = $no;
                }

                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->distinct('updated_by')
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0 && $needs_defined_contribution > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;

                    $won_deals->needs_defined = $yes;
                } else {

                    $won_deals->needs_defined = $no;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->distinct('updated_by')
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0 && $proposal_made_contribution > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                    $won_deals->proposal_made = $yes;
                } else {

                    $won_deals->proposal_made = $no;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->distinct('updated_by')
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0 && $negotiation_contribution > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                    $won_deals->negotiation_started = $yes;
                } else {

                    $won_deals->negotiation_started = $no;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->distinct('updated_by')
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0 && $milestone_contribution > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                    $won_deals->sharing_milestone_breakdown = $yes;
                } else {

                    $won_deals->sharing_milestone_breakdown = $no;
                }

                $won_deals->deals_each_count = $won_deals_count;
                $won_deals->deals_each_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;

            }

            $this->number_of_leads_convert_won_deals_table = $number_of_leads_convert_won_deals_table;

            // --------------Number of won deals table (hourly)-------------//

            $number_of_leads_convert_won_deals_table_hourly = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'hourly')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';

            foreach ($number_of_leads_convert_won_deals_table_hourly as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->hourly_rate;

                    $won_deals->closing_deal = $yes;
                } else {

                    $won_deals->closing_deal = $no;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                    $won_deals->bidder = $yes;
                } else {

                    $won_deals->bidder = $no;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->distinct('updated_by')
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0 && $qualify_contribution > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                    $won_deals->qualifying = $yes;
                } else {

                    $won_deals->qualifying = $no;
                }

                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->distinct('updated_by')
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0 && $needs_defined_contribution > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;

                    $won_deals->needs_defined = $yes;
                } else {

                    $won_deals->needs_defined = $no;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->distinct('updated_by')
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0 && $proposal_made_contribution > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                    $won_deals->proposal_made = $yes;
                } else {

                    $won_deals->proposal_made = $no;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->distinct('updated_by')
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0 && $negotiation_contribution > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                    $won_deals->negotiation_started = $yes;
                } else {

                    $won_deals->negotiation_started = $no;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->distinct('updated_by')
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0 && $milestone_contribution > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                    $won_deals->sharing_milestone_breakdown = $yes;
                } else {

                    $won_deals->sharing_milestone_breakdown = $no;
                }

                $won_deals->deals_each_count = $won_deals_count;
                $won_deals->deals_each_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;
            }

            $this->number_of_leads_convert_won_deals_table_hourly = $number_of_leads_convert_won_deals_table_hourly;
            $this->no_of_won_deals_count = Deal::where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->get();
            $this->no_of_won_deals_value = Deal::where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->sum('deals.amount');
            $this->finished_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->where('projects.status', 'finished')
                ->get();
            $this->canceled_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->where('projects.status', 'partially finished')
                ->orWhere('projects.status', 'canceled')
                ->get();
            $this->rejected_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->where('deals.status', '!=', 'Denied')

                ->get();
            if (count($this->no_of_won_deals_count) > 0) {
                $this->avg_deal_amount = $this->no_of_won_deals_value / count($this->no_of_won_deals_count);
                $this->finished_project_ratio = count($this->finished_project_count) / count($this->no_of_won_deals_count);
                $this->canceled_project_ratio = count($this->canceled_project_count) / count($this->no_of_won_deals_count);
                $this->rejected_project_ratio = count($this->rejected_project_count) / count($this->no_of_won_deals_count);

            } else {
                $this->avg_deal_amount = 0;
                $this->finished_project_ratio = 0;
                $this->canceled_project_ratio = 0;
                $this->rejected_project_ratio = 0;

            }

            $this->country_wise_won_deals_count = Deal::
                join('users as client', 'client.id', 'deals.client_id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->groupBy('client.country_id')
                ->where('deals.status', '!=', 'Denied')
                ->get();




            //		dd("nksadnkasl");
            $html = view('dashboard.ajax.salesexecutive.admin_view_month', $this->data)->render();



            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
            ]);

        } else {
            $salesId = $sales->id;
            // $this->username = DB::table('users')->where('id',$salesId)->value('name');
            // $startDate = Carbon::now()->startOfMonth();

            $startDate = Carbon::parse('2024-08-01')->startOfMonth();
            $endDate = Carbon::parse('2024-08-31')->endOfMonth()->addDays(1);

            $startDate1 = Carbon::parse('2024-06-01')->startOfMonth();
            $endDate1 = Carbon::parse('2024-06-31')->endOfMonth()->addDays(1);

            $endDate1 = Carbon::now()->endOfMonth();

            // $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');
            $exclude_end_date = Carbon::parse($endDate)->subDays(45)->format('Y-m-d');
            //  dd($startDate, $endDate);


            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);



            $leads = Lead::whereBetween('created_at', [$startDate1, $endDate1])->where('added_by', $salesId);
            $saleExecutive = [];

            // Number Of Leads Start 

            $number_of_leads_received_get = clone $leads;
            $number_of_leads_received_fixed = clone $leads;
            $number_of_leads_received_hourly = clone $leads;

            $this->number_of_leads_received_get = $number_of_leads_received_get->with('currency:id,currency_symbol', 'addedByUser:id,name')
                ->select('id', 'currency_id', 'added_by', 'client_name', 'bid_value', 'created_at', 'deal_status')
                ->get();


            $this->number_of_leads_received = $this->number_of_leads_received_get->count();

            $this->number_of_leads_received_hourly = $number_of_leads_received_hourly->where('project_type', 'hourly')->count();

            $this->number_of_leads_received_fixed = $number_of_leads_received_fixed->where('project_type', 'fixed')->count();

            $saleExecutive = [
                'number_of_leads_received' => $this->number_of_leads_received,
                'number_of_leads_received_fixed' => $this->number_of_leads_received_fixed,
                'number_of_leads_received_hourly' => $this->number_of_leads_received_hourly,
                'number_of_leads_received_get' => $this->number_of_leads_received_get,
            ];

            // dd($saleExecutive);
            // Number Of Leads End 

            $this->number_of_leads_convert_deals_fixed = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'fixed')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            dd($this->number_of_leads_convert_deals_fixed);

            $this->number_of_leads_convert_deals_hourly = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'hourly')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_deals = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_deals_get = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->get();

            $this->number_of_leads_convert_won_deals_fixed = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'fixed')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals_hourly = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.project_type', 'hourly')
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->count();

            $this->number_of_leads_convert_won_deals_get = DB::table('deal_stages')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();



            //--------------     won deals  table     --------------------------//

            $this->number_of_leads_convert_won_deals_data = DB::table('deal_stages')
                ->select('deals.*', 'leads.created_at as lead_created')
                ->join('leads', 'deal_stages.lead_id', '=', 'leads.id')
                ->join('deals', 'deal_stages.lead_id', '=', 'deals.lead_id')
                ->join('p_m_projects', 'deals.id', '=', 'p_m_projects.deal_id')
                ->where('leads.added_by', $salesId)
                ->where('leads.created_at', '>=', $startDate)
                ->where('leads.created_at', '<', $endDate)
                ->where('deal_stages.created_at', '>=', $startDate)
                ->where('deal_stages.created_at', '<', $endDate)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            // average bidding 
            $number_of_leads_create_data = DB::table('leads')
                ->select('leads.*')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();
            $this->number_of_leads_create_data = $number_of_leads_create_data;

            $number_of_leads_create = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $number_of_leads_amount = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('value');

            if ($number_of_leads_create > 0) {
                $this->average_number_of_leads_amount = $number_of_leads_amount / $number_of_leads_create;
            } else {
                $this->average_number_of_leads_amount = 0;
            }



            // average bidding delay time 

            $number_of_leads_create = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $delay_minute = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('bidding_minutes');

            $delay_second = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('bidding_seconds');

            if ($number_of_leads_create > 0) {
                $this->average_bidding_delay_time = (($delay_minute * 60 + $delay_second) / $number_of_leads_create) / 60;
            } else {
                $this->average_bidding_delay_time = 0;

            }

            // ---------------bidding frequency--------------------------------------//  
            $total_minutes = 0;
            $freqency_count = 0;
            $attendence_data_by_user = DB::table('attendances')
                ->select('clock_in_time', 'clock_out_time')
                ->where('user_id', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            foreach ($attendence_data_by_user as $attendence) {

                if ($attendence->clock_out_time != Null) {
                    $lead_generate = DB::table('leads')
                        ->select('created_at')
                        ->where('user_id', $salesId)
                        ->where('created_at', '>=', $attendence->clock_in_time)
                        ->where('created_at', '<', $attendence->clock_out_time)
                        ->orderBy('created_at')
                        ->get();

                    $flag = 0;
                    $startTime = '';
                    foreach ($lead_generate as $lead) {

                        if ($flag == 0) {
                            $flag = 1;
                            $startTime = Carbon::parse($lead->created_at);

                        } else {
                            $endTime = Carbon::parse($lead->created_at);
                            $minutesDifference = $endTime->diffInMinutes($startTime);
                            $startTime = $endTime;
                            $total_minutes += $minutesDifference;
                            $freqency_count++;

                        }

                    }
                }
            }

            if ($freqency_count > 0) {
                $this->bidding_frequency = $total_minutes / $freqency_count;
            } else {
                $this->bidding_frequency = 0;

            }

            //Country wise bidding breakdown


            $number_of_leads_received = DB::table('leads')
                ->where('added_by', $salesId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $country_wise_lead_counts = DB::table('leads')
                ->select('country', DB::raw('COUNT(*) as lead_count'))
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->where('added_by', $salesId)
                ->groupBy('country')
                ->orderBy('lead_count', 'DESC')
                ->get();

            foreach ($country_wise_lead_counts as $leads) {

                $leads_percentage = ($leads->lead_count / $number_of_leads_received) * 100;

                $leads->leads_percentage = $leads_percentage;
            }
            $this->country_wise_lead_counts = $country_wise_lead_counts;

            // --------------Number of won deals (fixed)-------------//

            $number_of_leads_convert_won_deals = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'fixed')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_deals as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;

                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;

                }


                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                }

            }

            $this->won_deals_count_fixed = $won_deals_count;
            $this->won_deals_value_fixed = $won_deals_value;


            // --------------Number of won deals (hourly)-------------//

            $number_of_leads_convert_won_deals = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'hourly')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_deals as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += $won_deals->hourly_rate;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                }


                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                }
            }

            $this->won_deals_count_hourly = $won_deals_count;
            $this->won_deals_value_hourly = $won_deals_value;


            // --------------Number of won deals (Country wise)-------------//

            $leads_country_data = DB::table('leads')
                ->select('country')
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->distinct('country')
                ->get();

            foreach ($leads_country_data as $lead_country) {

                $number_of_leads_convert_won_deals = DB::table('deals')
                    ->select('deals.*')
                    ->join('leads', 'deals.lead_id', '=', 'leads.id')
                    ->where('leads.country', $lead_country->country)
                    ->where('deals.created_at', '>=', $startDate)
                    ->where('deals.created_at', '<', $endDate)
                    ->get();

                $won_deals_count = 0;
                $won_deals_value = 0;

                foreach ($number_of_leads_convert_won_deals as $won_deals) {

                    //closing the deal

                    if ($won_deals->added_by == $salesId) {

                        $won_deals_count += .125;
                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 * $won_deals->hourly_rate;

                        }

                    }

                    //The bidder

                    $leads = DB::table('leads')
                        ->where('added_by', $salesId)
                        ->where('id', $won_deals->lead_id)
                        ->count();

                    if ($leads > 0) {

                        $won_deals_count += .25;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .25 * $won_deals->amount;
                        } else {

                            $won_deals_value += .25 * $won_deals->hourly_rate;
                        }
                    }

                    //Qualifying

                    $qualify_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->lead_id)
                        ->where('deal_stage_id', 1)
                        ->count();

                    $qualify = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->lead_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 1)
                        ->count();

                    if ($qualify > 0) {
                        $won_deals_count += .0375 / $qualify_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                        }
                    }


                    //Needs Defined

                    $needs_defined_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 2)
                        ->count();

                    $needs_defined = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 2)
                        ->count();

                    if ($needs_defined > 0) {
                        $won_deals_count += .1875 / $needs_defined_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Proposal made

                    $proposal_made_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 3)
                        ->count();

                    $proposal_made = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 3)
                        ->count();

                    if ($proposal_made > 0) {
                        $won_deals_count += .125 / $proposal_made_contribution;

                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Negotiation started

                    $negotiation_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 4)
                        ->count();

                    $negotiation = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 4)
                        ->count();

                    if ($negotiation > 0) {
                        $won_deals_count += .125 / $negotiation_contribution;


                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                        }
                    }

                    //Sharing milestone breakdown

                    $milestone_contribution = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('deal_stage_id', 5)
                        ->count();

                    $milestone = DB::table('deal_stage_changes')
                        ->where('deal_id', $won_deals->deal_id)
                        ->where('updated_by', $salesId)
                        ->where('deal_stage_id', 5)
                        ->count();

                    if ($milestone > 0) {
                        $won_deals_count += .15 / $milestone_contribution;


                        if ($won_deals->project_type == 'fixed') {

                            $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                        } else {

                            $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                        }
                    }
                }

                $lead_country->won_deals_count = $won_deals_count;
                $lead_country->won_deals_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;

            }

            $sort_leads_country_data = $leads_country_data->sortByDesc('won_deals_value');

            $this->leads_country_data = $sort_leads_country_data;

            //---------------Project completion/Won deal ratio-----------------------------------//


            $this->project_completion_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.status', 'finished')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->project_canceled_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->whereIn('projects.status', ['canceled', 'partially finished'])
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->project_reject_count = DB::table('contracts')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.project_status', 'Not Accepted')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->count();

            $this->won_deal_count = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $exclude_end_date)
                ->count();

            $this->won_deal_count_get = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $exclude_end_date)
                ->get();


            // exclude one for end cycle date and other for today.  suppose today december 20  and end cycle 31. but logic will be  20-exclude date for current month 

            $this->won_deal_count_reject_project = DB::table('contracts')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $endDate)
                ->count();

            // same logic for end date for current month
            if ($this->won_deal_count > 0) {
                $this->project_completion_count_ratio = ($this->project_completion_count / $this->won_deal_count) * 100;
            } else {
                $this->project_completion_count_ratio = 0;
            }

            if ($this->won_deal_count > 0) {
                $this->project_canceled_count_ratio = ($this->project_canceled_count / $this->won_deal_count) * 100;
            } else {
                $this->project_canceled_count_ratio = 0;
            }


            if ($this->won_deal_count_reject_project > 0) {
                $this->project_reject_count_ratio = ($this->project_reject_count / $this->won_deal_count_reject_project) * 100;
            } else {
                $this->project_reject_count_ratio = 0;
            }



            //--------Reject Projects Count---------------//

            $this->project_reject_count_data = DB::table('contracts')
                ->select('projects.*', 'contracts.last_updated_by')
                ->join('projects', 'contracts.deal_id', '=', 'projects.deal_id')
                ->where('projects.project_status', 'Not Accepted')
                ->where('contracts.last_updated_by', $salesId)
                ->where('contracts.updated_at', '<', $endDate)
                ->get();

            // --------------Number of won deals table (fixed)-------------//

            $number_of_leads_convert_won_deals_table = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'fixed')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';

            foreach ($number_of_leads_convert_won_deals_table as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;

                    $won_deals->closing_deal = $yes;


                } else {

                    $won_deals->closing_deal = $no;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;
                    $won_deals->bidder = $yes;
                } else {

                    $won_deals->bidder = $no;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->distinct('updated_by')
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0 && $qualify_contribution > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                    $won_deals->qualifying = $yes;
                } else {

                    $won_deals->qualifying = $no;
                }

                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->distinct('updated_by')
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0 && $needs_defined_contribution > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;

                    $won_deals->needs_defined = $yes;
                } else {

                    $won_deals->needs_defined = $no;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->distinct('updated_by')
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0 && $proposal_made_contribution > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                    $won_deals->proposal_made = $yes;
                } else {

                    $won_deals->proposal_made = $no;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->distinct('updated_by')
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0 && $negotiation_contribution > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                    $won_deals->negotiation_started = $yes;
                } else {

                    $won_deals->negotiation_started = $no;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->distinct('updated_by')
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0 && $milestone_contribution > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                    $won_deals->sharing_milestone_breakdown = $yes;
                } else {

                    $won_deals->sharing_milestone_breakdown = $no;
                }

                $won_deals->deals_each_count = $won_deals_count;
                $won_deals->deals_each_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;

            }

            $this->number_of_leads_convert_won_deals_table = $number_of_leads_convert_won_deals_table;

            // --------------Number of won deals table (hourly)-------------//

            $number_of_leads_convert_won_deals_table_hourly = DB::table('deals')
                ->select('deals.*')
                ->where('deals.project_type', 'hourly')
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->get();

            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';

            foreach ($number_of_leads_convert_won_deals_table_hourly as $won_deals) {

                //closing the deal

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->hourly_rate;

                    $won_deals->closing_deal = $yes;
                } else {

                    $won_deals->closing_deal = $no;
                }


                //The bidder

                $leads = DB::table('leads')
                    ->where('added_by', $salesId)
                    ->where('id', $won_deals->lead_id)
                    ->count();

                if ($leads > 0) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                    $won_deals->bidder = $yes;
                } else {

                    $won_deals->bidder = $no;
                }

                //Qualifying

                $qualify_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 1)
                    ->distinct('updated_by')
                    ->count();

                $qualify = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 1)
                    ->count();

                if ($qualify > 0 && $qualify_contribution > 0) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                    $won_deals->qualifying = $yes;
                } else {

                    $won_deals->qualifying = $no;
                }

                //Needs Defined

                $needs_defined_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 2)
                    ->distinct('updated_by')
                    ->count();

                $needs_defined = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 2)
                    ->count();

                if ($needs_defined > 0 && $needs_defined_contribution > 0) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;

                    $won_deals->needs_defined = $yes;
                } else {

                    $won_deals->needs_defined = $no;
                }

                //Proposal made


                $proposal_made_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 3)
                    ->distinct('updated_by')
                    ->count();

                $proposal_made = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 3)
                    ->count();

                if ($proposal_made > 0 && $proposal_made_contribution > 0) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                    $won_deals->proposal_made = $yes;
                } else {

                    $won_deals->proposal_made = $no;
                }

                //Negotiation started

                $negotiation_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 4)
                    ->distinct('updated_by')
                    ->count();

                $negotiation = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 4)
                    ->count();

                if ($negotiation > 0 && $negotiation_contribution > 0) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                    $won_deals->negotiation_started = $yes;
                } else {

                    $won_deals->negotiation_started = $no;
                }

                //Sharing milestone breakdown

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->distinct('updated_by')
                    ->count();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();

                if ($milestone > 0 && $milestone_contribution > 0) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                    $won_deals->sharing_milestone_breakdown = $yes;
                } else {

                    $won_deals->sharing_milestone_breakdown = $no;
                }

                $won_deals->deals_each_count = $won_deals_count;
                $won_deals->deals_each_value = $won_deals_value;

                $won_deals_count = 0;
                $won_deals_value = 0;
            }

            $this->number_of_leads_convert_won_deals_table_hourly = $number_of_leads_convert_won_deals_table_hourly;
            $this->no_of_won_deals_count = Deal::where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->get();
            $this->no_of_won_deals_value = Deal::where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->sum('deals.amount');
            $this->finished_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->where('projects.status', 'finished')
                ->get();
            $this->canceled_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)

                ->where('projects.status', 'partially finished')
                ->orWhere('projects.status', 'canceled')
                ->get();
            $this->rejected_project_count = Deal::join('projects', 'projects.deal_id', 'deals.id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->where('deals.status', '!=', 'Denied')

                ->get();
            if (count($this->no_of_won_deals_count) > 0) {
                $this->avg_deal_amount = $this->no_of_won_deals_value / count($this->no_of_won_deals_count);
                $this->finished_project_ratio = count($this->finished_project_count) / count($this->no_of_won_deals_count);
                $this->canceled_project_ratio = count($this->canceled_project_count) / count($this->no_of_won_deals_count);
                $this->rejected_project_ratio = count($this->rejected_project_count) / count($this->no_of_won_deals_count);

            } else {
                $this->avg_deal_amount = 0;
                $this->finished_project_ratio = 0;
                $this->canceled_project_ratio = 0;
                $this->rejected_project_ratio = 0;

            }

            $this->country_wise_won_deals_count = Deal::
                join('users as client', 'client.id', 'deals.client_id')
                ->where('deals.added_by', $salesId)
                ->where('deals.created_at', '>=', $startDate)
                ->where('deals.created_at', '<', $endDate)
                ->groupBy('client.country_id')
                ->where('deals.status', '!=', 'Denied')
                ->get();




            return view('dashboard.employee.admin_view_sales_executive', $this->data);
        }


    }
}