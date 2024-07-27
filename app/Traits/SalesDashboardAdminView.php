<?php

namespace App\Traits;

use Auth;
use DateTime;
use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Event;
use App\Models\Leave;
use App\Models\Notice;
use App\Models\Ticket;
use App\Models\Holiday;
use App\Models\Project;
use Carbon\CarbonPeriod;
use App\Models\DealStage;
use App\Models\LeadAgent;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\CompanyAddress;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\TaskboardColumn;
use App\Models\AttendanceSetting;
use App\Models\TicketAgentGroups;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use App\Models\EmployeeShiftSchedule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Collection;
use App\Http\Requests\ClockIn\ClockInRequest;
use App\Models\Contract;

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

        // dd(request()->all(), request('start_date'), request('end_date'), $sales->id);

        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date' => 'date|after:start_date',
        ]);
        if ($validator->fails()) {
            dd(Reply::error(__('validation_failed'), $validator->errors()));
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $salesId = $sales->id;
            
            
            if(request('start_date') && request('end_date')){
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            }else{
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfMonth();
                // $startDate = Carbon::parse('2023-06-01')->startOfMonth();
                // $endDate = Carbon::parse('2023-06-31')->endOfMonth();
            }

            $exclude_end_date = Carbon::parse($endDate)->subDays(45)->format('Y-m-d');

            $this->username = $sales->name;



            $leadsWithSaleId = Lead::where('added_by', $salesId);

            $leadsWithDateAndIdClone = clone $leadsWithSaleId;

            $leadsWithDateAndId = $leadsWithDateAndIdClone->whereBetween('created_at', [$startDate, $endDate]);

            $saleExecutive = [];

            // Number Of Leads Start 

            $numberOfLeadsReceivedGet = clone $leadsWithDateAndId;
            $numberOfLeadsReceivedFixed = clone $leadsWithDateAndId;
            $numberOfLeadsReceivedHourly = clone $leadsWithDateAndId;


            $numberOfLeadsReceivedFixed = clone $numberOfLeadsReceivedFixed->where('project_type', 'fixed');
            $numberOfLeadsReceivedHourly = clone $numberOfLeadsReceivedHourly->where('project_type', 'hourly');

            $this->number_of_leads_received_get = $numberOfLeadsReceivedGet->get();

            $this->number_of_leads_received = $numberOfLeadsReceivedGet->count();

            $this->number_of_leads_received_fixed = $numberOfLeadsReceivedFixed->count();

            $this->number_of_leads_received_hourly = $numberOfLeadsReceivedHourly->count();


            $saleExecutive += [
                'number_of_leads_received' => $this->number_of_leads_received,
                'number_of_leads_received_list' => $this->number_of_leads_received_get,
                'number_of_leads_received_fixed' => $this->number_of_leads_received_fixed,
                'number_of_leads_received_hourly' => $this->number_of_leads_received_hourly,
            ];


            $number_of_leads_convert_deals = $numberOfLeadsReceivedGet->whereHas('dealStage', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });

            $number_of_leads_convert_deals_fixed = $numberOfLeadsReceivedFixed->whereHas('dealStage', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });

            $number_of_leads_convert_deals_hourly = $numberOfLeadsReceivedHourly->whereHas('dealStage', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });


            $this->number_of_leads_convert_deals = $number_of_leads_convert_deals->count();

            $this->number_of_leads_convert_deals_get = $number_of_leads_convert_deals->get();

            $this->number_of_leads_convert_deals_fixed = $number_of_leads_convert_deals_fixed->count();

            $this->number_of_leads_convert_deals_hourly = $number_of_leads_convert_deals_hourly->count();


            $saleExecutive += [
                'number_of_leads_convert_deals' => $this->number_of_leads_convert_deals,
                'number_of_leads_convert_deals_list' => $this->number_of_leads_convert_deals_get,
                'number_of_leads_convert_deals_fixed' => $this->number_of_leads_convert_deals_fixed,
                'number_of_leads_convert_deals_hourly' => $this->number_of_leads_convert_deals_hourly,
            ];


            $number_of_leads_convert_won_deals = $number_of_leads_convert_deals->with('leadDeal.pm_project')
                ->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                });

            $number_of_leads_convert_won_deals_fixed = $number_of_leads_convert_deals_fixed->with('leadDeal.pm_project')
                ->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                });

            $number_of_leads_convert_won_deals_hourly = $number_of_leads_convert_deals_hourly->with('leadDeal.pm_project')
                ->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate]);
                });

            $this->number_of_leads_convert_won_deals = $number_of_leads_convert_won_deals->count();

            $this->number_of_leads_convert_won_deals_get = $number_of_leads_convert_won_deals->get();

            $this->number_of_leads_convert_won_deals_fixed = $number_of_leads_convert_won_deals_fixed->count();

            $this->number_of_leads_convert_won_deals_hourly = $number_of_leads_convert_won_deals_hourly->count();

            $saleExecutive += [
                'number_of_leads_convert_won_deals' => $this->number_of_leads_convert_won_deals,
                'number_of_leads_convert_won_deals_list' => $this->number_of_leads_convert_won_deals_get,
                'number_of_leads_convert_won_deals_fixed' => $this->number_of_leads_convert_won_deals_fixed,
                'number_of_leads_convert_won_deals_hourly' => $this->number_of_leads_convert_won_deals_hourly,
            ];

            // Number of leads that got converted to won deals End


            $number_of_leads_create = $leadsWithDateAndId->count();
            $number_of_leads_amount = $leadsWithDateAndId->sum('value');

            $this->average_number_of_leads_amount = $number_of_leads_create ? round($number_of_leads_amount / $number_of_leads_create, 2) : 0;


            $delay_minute = $leadsWithDateAndId->sum('bidding_minutes');
            $delay_second = $leadsWithDateAndId->sum('bidding_seconds');

            $this->average_bidding_delay_time = $number_of_leads_create ? round((($delay_minute * 60 + $delay_second) / $number_of_leads_create) / 60, 2) : 0;

            $saleExecutive += [
                'average_number_of_leads_amount' => $this->average_number_of_leads_amount,
                'average_bidding_delay_time' => $this->average_bidding_delay_time,
            ];

            // ---------------bidding frequency--------------------------------------//  
            $total_minutes = 0;
            $frequency_count = 0;

            // $attendance_data_by_user = DB::table('attendances')
            //     ->select('clock_in_time', 'clock_out_time')
            //     ->where('user_id', $salesId)
            //     ->where('created_at', '>=', $startDate)
            //     ->where('created_at', '<', $endDate)
            //     ->get();

            // foreach ($attendance_data_by_user as $attendance) {

            //     if ($attendance->clock_out_time != Null) {
            //         $lead_generate = DB::table('leads')
            //             ->select('created_at')
            //             ->where('user_id', $salesId)
            //             ->where('created_at', '>=', $attendance->clock_in_time)
            //             ->where('created_at', '<', $attendance->clock_out_time)
            //             ->orderBy('created_at')
            //             ->get();

            //         $flag = 0;
            //         $startTime = '';
            //         foreach ($lead_generate as $lead) {

            //             if ($flag == 0) {
            //                 $flag = 1;
            //                 $startTime = Carbon::parse($lead->created_at);

            //             } else {
            //                 $endTime = Carbon::parse($lead->created_at);
            //                 $minutesDifference = $endTime->diffInMinutes($startTime);
            //                 $startTime = $endTime;
            //                 $total_minutes += $minutesDifference;
            //                 $frequency_count++;

            //             }

            //         }
            //     }
            // }

            $this->bidding_frequency = $frequency_count ? $total_minutes / $frequency_count : 0;

            //    Country wise bidding breakdown Start

            $country_wise_lead_counts = clone $leadsWithDateAndId;

            $this->country_wise_lead_counts = $country_wise_lead_counts
                ->select('country', DB::raw('COUNT(*) as lead_count'))
                ->groupBy('country')
                ->orderBy('lead_count', 'DESC')
                ->get();

            $saleExecutive += [
                'country_wise_lead_counts' => $this->country_wise_lead_counts
            ];

            //    Country wise bidding breakdown End


            // --------------Number of won deals (fixed)-------------//

            $number_of_leads_convert_won_fix_deals = Deal::with('lead', 'dealStageChanges')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_type', 'fixed')->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_fix_deals as $won_deals) {

                if ($won_deals->added_by == $salesId) {

                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;
                }

                if ($won_deals?->lead?->added_by == $salesId) {

                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;

                }

                $qualify_contribution = 0;
                $needs_defined_contribution = 0;
                $proposal_made_contribution = 0;
                $negotiation_contribution = 0;
                $milestone_contribution = 0;

                foreach ($won_deals?->dealStageChanges as $dealStageChanges) {

                    if ($dealStageChanges->updated_by == $salesId) {

                        switch ($dealStageChanges->deal_stage_id) {
                            case 1:
                                $qualify_contribution++;
                                break;
                            case 2:
                                $needs_defined_contribution++;
                                break;
                            case 3:
                                $proposal_made_contribution++;
                                break;
                            case 4:
                                $negotiation_contribution++;
                                break;
                            case 5:
                                $milestone_contribution++;
                                break;
                            default:
                                # code...
                                break;
                        }
                    }
                }
                if ($qualify_contribution) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                }
                if ($needs_defined_contribution) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                }
                if ($proposal_made_contribution) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                }
                if ($negotiation_contribution) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                }
                if ($milestone_contribution) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                }
            }

            $this->won_deals_count_fixed = round($won_deals_count, 2);
            $this->won_deals_value_fixed = round($won_deals_value, 2);

            $saleExecutive += [
                'won_deals_count_fixed' => $this->won_deals_count_fixed,
                'won_deals_value_fixed' => $this->won_deals_value_fixed,
            ];


            // --------------Number of won deals (hourly)-------------//

            $number_of_leads_convert_won_hourly_deals = Deal::with('lead', 'dealStageChanges')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_type', 'hourly')->get();

            $won_deals_count = 0;
            $won_deals_value = 0;

            foreach ($number_of_leads_convert_won_hourly_deals as $won_deals) {
                //closing the deal

                if ($won_deals->added_by == $salesId) {
                    $won_deals_count += .125;
                    $won_deals_value += $won_deals->hourly_rate;
                }

                //The bidder
                if ($won_deals?->lead?->added_by == $salesId) {
                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                }

                $qualify_contribution = 0;
                $needs_defined_contribution = 0;
                $proposal_made_contribution = 0;
                $negotiation_contribution = 0;
                $milestone_contribution = 0;

                foreach ($won_deals?->dealStageChanges as $dealStageChanges) {

                    if ($dealStageChanges->updated_by == $salesId) {
                        switch ($dealStageChanges->deal_stage_id) {
                            case 1:
                                $qualify_contribution++;
                                break;
                            case 2:
                                $needs_defined_contribution++;
                                break;
                            case 3:
                                $proposal_made_contribution++;
                                break;
                            case 4:
                                $negotiation_contribution++;
                                break;
                            case 5:
                                $milestone_contribution++;
                                break;
                            default:
                                # code...
                                break;
                        }
                    }
                }

                if ($qualify_contribution) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->hourly_rate;
                }
                if ($needs_defined_contribution) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->hourly_rate;
                }
                if ($proposal_made_contribution) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->hourly_rate;
                }
                if ($negotiation_contribution) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->hourly_rate;
                }
                if ($milestone_contribution) {
                    $won_deals_count += .15 / $milestone_contribution;
                    $won_deals_value += .15 / $milestone_contribution * $won_deals->hourly_rate;
                }
            }

            $this->won_deals_count_hourly = round($won_deals_count, 2);
            $this->won_deals_value_hourly = round($won_deals_value, 2);

            $saleExecutive += [
                'won_deals_count_hourly' => $this->won_deals_count_hourly,
                'won_deals_value_hourly' => $this->won_deals_value_hourly,
            ];

            // --------------Number of won deals (Country wise)-------------//

            $leads_country_data = Lead::with('leadDeal.dealStageChanges')
                ->whereHas('leadDeal', function ($query) use ($startDate, $endDate) {
                    $query->whereBetween('created_at', [$startDate, $endDate]);
                })
                ->get()
                ->groupBy('country')
                ->toArray();

            $leads_country = [];

            foreach ($leads_country_data as $key => $leads) {
                $country_data = ['country' => $key];

                $won_deals_count = 0;
                $won_deals_value = 0;

                foreach ($leads as $lead) {
                    if ($lead['lead_deal']['added_by'] == $salesId && isset($lead['lead_deal'])) {
                        //closing the deal
                        $won_deals_count += .125;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .125 * $lead['lead_deal']['amount'] : .125 * $lead['lead_deal']['hourly_rate'];

                    }
                    if ($lead['added_by'] == $salesId && isset($lead['lead_deal'])) {
                        //The bidder
                        $won_deals_count += .25;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .25 * $lead['lead_deal']['amount'] : .25 * $lead['lead_deal']['hourly_rate'];
                    }

                    $qualify_contribution = 0;
                    $needs_defined_contribution = 0;
                    $proposal_made_contribution = 0;
                    $negotiation_contribution = 0;
                    $milestone_contribution = 0;

                    foreach ($lead['lead_deal']['deal_stage_changes'] ?? [] as $dealStageChanges) {
                        if ($dealStageChanges['updated_by'] == $salesId) {
                            switch ($dealStageChanges['deal_stage_id']) {
                                case 1:
                                    $qualify_contribution++;
                                    break;
                                case 2:
                                    $needs_defined_contribution++;
                                    break;
                                case 3:
                                    $proposal_made_contribution++;
                                    break;
                                case 4:
                                    $negotiation_contribution++;
                                    break;
                                case 5:
                                    $milestone_contribution++;
                                    break;
                                default:
                                    # code...
                                    break;
                            }
                        }
                    }

                    if ($qualify_contribution) {
                        $won_deals_count += .0375 / $qualify_contribution;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .0375 / $qualify_contribution * $lead['lead_deal']['amount'] : .0375 / $qualify_contribution * $lead['lead_deal']['hourly_rate'];
                    }
                    if ($needs_defined_contribution) {
                        $won_deals_count += .1875 / $needs_defined_contribution;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .1875 / $needs_defined_contribution * $lead['lead_deal']['amount'] : .1875 / $needs_defined_contribution * $lead['lead_deal']['hourly_rate'];
                    }
                    if ($proposal_made_contribution) {
                        $won_deals_count += .125 / $proposal_made_contribution;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .125 / $proposal_made_contribution * $lead['lead_deal']['amount'] : .125 / $proposal_made_contribution * $lead['lead_deal']['hourly_rate'];
                    }
                    if ($negotiation_contribution) {
                        $won_deals_count += .125 / $negotiation_contribution;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .125 / $negotiation_contribution * $lead['lead_deal']['amount'] : .125 / $negotiation_contribution * $lead['lead_deal']['hourly_rate'];
                    }
                    if ($milestone_contribution) {
                        $won_deals_count += .15 / $milestone_contribution;
                        $won_deals_value += $lead['lead_deal']['project_type'] == 'fixed' ? .15 / $milestone_contribution * $lead['lead_deal']['amount'] : .15 / $milestone_contribution * $lead['lead_deal']['hourly_rate'];
                    }

                }
                $country_data += [
                    'won_deals_count' => round($won_deals_count, 2),
                    'won_deals_value' => round($won_deals_value, 2),
                ];
                $leads_country[] = $country_data;
            }

            // dump($leads_country, array_sum(array_column($leads_country, 'won_deals_count')), array_sum(array_column($leads_country, 'won_deals_value')));

            // $sort_leads_country_data = $leads_country_data->sortByDesc('won_deals_value');

            $this->leads_country_data = $leads_country;

            $saleExecutive += [
                'leads_country_data' => $leads_country,
            ];

            //---------------Project completion/Won deal ratio-----------------------------------//


            $contractsSaleEndDate = Contract::with('project')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $endDate);

            $projectCompletionCountClone = clone $contractsSaleEndDate;
            $projectCanceledCountClone = clone $contractsSaleEndDate;
            $wonDealCountRejectProjectClone = clone $contractsSaleEndDate;

            //--------Finished Projects---------------//
            $this->finished_project_count = Deal::with('project')
                ->where([
                    ['added_by', '=', $salesId],
                    ['created_at', '<', $endDate],
                    ['created_at', '>=', $startDate],
                ])->whereRelation('project', 'status', 'finished')->get();

            $this->project_completion_count = $projectCompletionCountClone->whereRelation('project', 'status', 'finished')->count();


            $this->project_canceled_count = $projectCanceledCountClone->whereHas('project', function ($query) {
                $query->whereIn('status', ['canceled', 'partially finished']);
            })->count();

            //--------Reject Projects Count---------------//

            $this->project_reject_count_data = $wonDealCountRejectProjectClone->whereRelation('project', 'project_status', 'Not Accepted')->select('id', 'deal_id', 'last_updated_by')->get();

            $this->project_reject_count = $this->project_reject_count_data->count();

            $contractsExcludeEndDate = Contract::where('last_updated_by', $salesId)
                ->where('updated_at', '<', $exclude_end_date);

            $contractsExcludeEndDateClone = clone $contractsExcludeEndDate;

            $this->won_deal_count_get = $contractsExcludeEndDateClone->get();

            $this->won_deal_count = $contractsExcludeEndDateClone->count();



            // exclude one for end cycle date and other for today.  suppose today december 20  and end cycle 31. but logic will be  20-exclude date for current month 

            $this->won_deal_count_reject_project = $wonDealCountRejectProjectClone->count();

            // same logic for end date for current month

            $this->project_completion_count_ratio = $this->won_deal_count ? ($this->project_completion_count / $this->won_deal_count) * 100 : 0;

            $this->project_canceled_count_ratio = $this->won_deal_count ? ($this->project_canceled_count / $this->won_deal_count) * 100 : 0;

            $this->project_reject_count_ratio = $this->won_deal_count_reject_project ? ($this->project_reject_count / $this->won_deal_count_reject_project) * 100 : 0;


            // --------------Number of won deals table (fixed)-------------//

            // $number_of_leads_convert_won_fix_deals = Deal::with('lead', 'dealStageChanges')
            //     ->whereBetween('created_at', [$startDate, $endDate])
            //     ->where('project_type', 'fixed')->get();

            $number_of_leads_convert_won_deals_table = $number_of_leads_convert_won_fix_deals;



            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';
            $numberOfLeadsConvertWonDeals = [];

            foreach ($number_of_leads_convert_won_deals_table as $won_deals) {

                $deal = $won_deals->toArray();
                // closing the deal
                if ($won_deals->added_by == $salesId) {
                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->amount;
                    $deal += ['closing_deal' => $yes];
                } else {
                    $deal += ['closing_deal' => $no];
                }

                // The bidder
                if ($won_deals?->lead?->added_by == $salesId) {
                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->amount;
                    $deal += ['bidder' => $yes];
                } else {
                    $deal += ['bidder' => $no];
                }


                $qualify_contribution = 0;
                $needs_defined_contribution = 0;
                $proposal_made_contribution = 0;
                $negotiation_contribution = 0;
                // $milestone_contribution = 0;

                foreach ($won_deals?->dealStageChanges as $dealStageChanges) {

                    if ($dealStageChanges->updated_by == $salesId) {

                        switch ($dealStageChanges->deal_stage_id) {
                            case 1:
                                $qualify_contribution++;
                                break;
                            case 2:
                                $needs_defined_contribution++;
                                break;
                            case 3:
                                $proposal_made_contribution++;
                                break;
                            case 4:
                                $negotiation_contribution++;
                                break;
                            // case 5:
                            //     $milestone_contribution++;
                            //     break;
                            // default:
                            //     # code...
                            //     break;
                        }
                    }
                }
                if ($qualify_contribution) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                    $deal += ['qualifying' => $yes];
                } else {
                    $deal += ['qualifying' => $no];
                }
                if ($needs_defined_contribution) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                    $deal += ['needs_defined' => $yes];
                } else {
                    $deal += ['needs_defined' => $no];
                }
                if ($proposal_made_contribution) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                    $deal += ['proposal_made' => $yes];
                } else {
                    $deal += ['proposal_made' => $no];
                }
                if ($negotiation_contribution) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                    $deal += ['negotiation_started' => $yes];
                } else {
                    $deal += ['negotiation_started' => $no];
                }
                // use for 5
                // if ($milestone_contribution) {
                //     $won_deals_count += .15 / $milestone_contribution;
                //     $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                //     $deal += ['sharing_milestone_breakdown' => $yes];
                // } else {
                //     $deal += ['sharing_milestone_breakdown' => $no];
                // }

                $milestone_contribution = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('deal_stage_id', 5)
                    ->distinct('updated_by')
                    ->get();

                $milestone = DB::table('deal_stage_changes')
                    ->where('deal_id', $won_deals->deal_id)
                    ->where('updated_by', $salesId)
                    ->where('deal_stage_id', 5)
                    ->count();
                if ($milestone > 0 && $milestone_contribution->count() > 0) {

                    $won_deals_count += .15 / $milestone_contribution->count();
                    $won_deals_value += .15 / $milestone_contribution->count() * $won_deals->amount;
                    $deal += ['sharing_milestone_breakdown' => $yes];
                } else {
                    $deal += ['sharing_milestone_breakdown' => $no];
                }

                $deal += ['deals_each_count' => $won_deals_count];
                $deal += ['deals_each_value' => $won_deals_value];

                $numberOfLeadsConvertWonDeals[] = $deal;

                $won_deals_count = 0;
                $won_deals_value = 0;
                $deal = [];

            }

            $this->number_of_leads_convert_won_deals_table = $numberOfLeadsConvertWonDeals;

            $saleExecutive += [
                'number_of_leads_convert_won_deals_table' => $numberOfLeadsConvertWonDeals,
            ];

            // --------------Number of won deals table (hourly)-------------//

            $number_of_leads_convert_won_deals_table_hourly = $number_of_leads_convert_won_hourly_deals;

            $won_deals_count = 0;
            $won_deals_value = 0;
            $yes = 'YES';
            $no = 'NO';
            $numberOfLeadsConvertWonDealsTableHourly = [];

            foreach ($number_of_leads_convert_won_deals_table_hourly as $won_deals) {

                $deal = $won_deals->toArray();

                //closing the deal
                if ($won_deals->added_by == $salesId) {
                    $won_deals_count += .125;
                    $won_deals_value += .125 * $won_deals->hourly_rate;
                    $deal += ['closing_deal' => $yes];
                } else {
                    $deal += ['closing_deal' => $no];
                }
                //The bidder
                if ($won_deals?->lead?->added_by == $salesId) {
                    $won_deals_count += .25;
                    $won_deals_value += .25 * $won_deals->hourly_rate;
                    $deal += ['bidder' => $yes];
                } else {
                    $deal += ['bidder' => $no];
                }

                $qualify_contribution = 0;
                $needs_defined_contribution = 0;
                $proposal_made_contribution = 0;
                $negotiation_contribution = 0;
                // $milestone_contribution = 0;

                foreach ($won_deals?->dealStageChanges as $dealStageChanges) {

                    if ($dealStageChanges->updated_by == $salesId) {

                        switch ($dealStageChanges->deal_stage_id) {
                            case 1:
                                $qualify_contribution++;
                                break;
                            case 2:
                                $needs_defined_contribution++;
                                break;
                            case 3:
                                $proposal_made_contribution++;
                                break;
                            case 4:
                                $negotiation_contribution++;
                                break;
                            // case 5:
                            //     $milestone_contribution++;
                            //     break;
                            // default:
                            //     # code...
                            //     break;
                        }
                    }
                }

                if ($qualify_contribution) {
                    $won_deals_count += .0375 / $qualify_contribution;
                    $won_deals_value += .0375 / $qualify_contribution * $won_deals->amount;
                    $deal += ['qualifying' => $yes];
                } else {
                    $deal += ['qualifying' => $no];
                }
                if ($needs_defined_contribution) {
                    $won_deals_count += .1875 / $needs_defined_contribution;
                    $won_deals_value += .1875 / $needs_defined_contribution * $won_deals->amount;
                    $deal += ['needs_defined' => $yes];
                } else {
                    $deal += ['needs_defined' => $no];
                }
                if ($proposal_made_contribution) {
                    $won_deals_count += .125 / $proposal_made_contribution;
                    $won_deals_value += .125 / $proposal_made_contribution * $won_deals->amount;
                    $deal += ['proposal_made' => $yes];
                } else {
                    $deal += ['proposal_made' => $no];
                }
                if ($negotiation_contribution) {
                    $won_deals_count += .125 / $negotiation_contribution;
                    $won_deals_value += .125 / $negotiation_contribution * $won_deals->amount;
                    $deal += ['negotiation_started' => $yes];
                } else {
                    $deal += ['negotiation_started' => $no];
                }
                // use for 5
                // if ($milestone_contribution) {
                //     $won_deals_count += .15 / $milestone_contribution;
                //     $won_deals_value += .15 / $milestone_contribution * $won_deals->amount;
                //     $deal += ['sharing_milestone_breakdown' => $yes];
                // } else {
                //     $deal += ['sharing_milestone_breakdown' => $no];
                // }

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
                    $deal += ['sharing_milestone_breakdown' => $yes];
                } else {
                    $deal += ['sharing_milestone_breakdown' => $no];
                }

                $deal += ['deals_each_count' => $won_deals_count];
                $deal += ['deals_each_value' => $won_deals_value];

                $numberOfLeadsConvertWonDealsTableHourly[] = $deal;

                $won_deals_count = 0;
                $won_deals_value = 0;
                $deal = [];
            }

            $this->number_of_leads_convert_won_deals_table_hourly = $numberOfLeadsConvertWonDealsTableHourly;

            $saleExecutive += [
                'number_of_leads_convert_won_deals_table_hourly' => $numberOfLeadsConvertWonDealsTableHourly,
            ];

            $dealWithSaleIdDate = Deal::where('added_by', $salesId)->whereBetween('created_at', [$startDate, $endDate]);

            $dealWithSaleIdDateClone = clone $dealWithSaleIdDate;
            $dealWithSaleIdDatePartiallyFinishedClone = clone $dealWithSaleIdDate;
            $dealWithSaleIdDateDeniedClone = clone $dealWithSaleIdDate;

            $this->no_of_won_deals_count = $dealWithSaleIdDateClone->get();


            $this->no_of_won_deals_value = round($dealWithSaleIdDateClone->sum('amount'), 2);

            $this->canceled_project_count = $dealWithSaleIdDatePartiallyFinishedClone->with('project', 'user', 'currency')
                ->whereRelation('project', 'status', 'partially finished')
                ->orWhereRelation('project', 'status', 'canceled')
                ->get();

            $this->rejected_project_count = $dealWithSaleIdDateDeniedClone->with('project', 'user', 'currency')->where('deals.status', '!=', 'Denied')->get();

            if (count($this->no_of_won_deals_count)) {
                $this->avg_deal_amount = $this->no_of_won_deals_value / count($this->no_of_won_deals_count);
                $this->finished_project_ratio = count($this->finished_project_count) / count($this->no_of_won_deals_count);
                $this->canceled_project_ratio = round(count($this->canceled_project_count) / count($this->no_of_won_deals_count), 2);
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
                ->whereBetween('deals.created_at', [$startDate, $endDate])
                ->groupBy('client.country_id')
                ->where('deals.status', '!=', 'Denied')
                ->get();

            // $saleExecutive += [
            //     'no_of_won_deals_count' => $this->no_of_won_deals_count,
            //     'no_of_won_deals_value' => $this->no_of_won_deals_value,
            //     'avg_deal_amount' => $this->avg_deal_amount,
            //     'finished_project_ratio' => $this->finished_project_ratio,
            //     'canceled_project_ratio' => $this->canceled_project_ratio,
            //     'rejected_project_ratio' => $this->rejected_project_ratio,
            //     'country_wise_won_deals_count' => $this->country_wise_won_deals_count,
            // ];

            return response($saleExecutive , 200)->header('Content-Type', 'application/json');

            // return view('dashboard.employee.admin_view_sales_executive', $this->data);
        }


    }
}