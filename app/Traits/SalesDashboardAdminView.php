<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Lead;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\Contract;
use App\Models\Attendance;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

trait SalesDashboardAdminView
{
    public function salesDashboardAdminApi($sales)
    {
        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date'   => 'date|after:start_date',
            'table_type' => 'string',
            'sale_id'    => 'nullable',
        ]);

        if ($validator->fails()) {
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $salesId = request('sale_id') ?? $sales->id;
            $tableType = request('table_type');

            if (request('start_date') && request('end_date')) {
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            } else {
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfDay();
                // $startDate = Carbon::parse('2023-06-01')->startOfMonth();
                // $endDate = Carbon::parse('2023-06-31')->endOfMonth();
            }

            $exclude_end_date = Carbon::parse($endDate)->subDays(45)->format('Y-m-d');
            $this->username = $sales->name;

            $saleExecutive = [];

            $leadsWithSaleId = Lead::where('added_by', $salesId);
            $leadsWithDateAndIdClone = clone $leadsWithSaleId;

            $leadsWithDateAndId = $leadsWithDateAndIdClone->with('currency:id,currency_symbol', 'addedByUser:id,name', 'addedByUser.employeeDetail:id,user_id,designation_id,employee_id', 'addedByUser.employeeDetail.designation:id,name')
                ->whereBetween('created_at', [$startDate, $endDate])->select('id', 'client_name', 'bid_value', 'created_at', 'deal_status', 'currency_id', 'added_by', 'bidding_minutes', 'bidding_seconds');
            $numberOfLeadsReceivedGet = clone $leadsWithDateAndId;

            $numberOfLeadsReceivedFixed = clone $leadsWithDateAndId;
            $numberOfLeadsReceivedHourly = clone $leadsWithDateAndId;
            $numberOfLeadsReceivedFixed = clone $numberOfLeadsReceivedFixed->where('project_type', 'fixed');
            $numberOfLeadsReceivedHourly = clone $numberOfLeadsReceivedHourly->where('project_type', 'hourly');

            if ($tableType == 'leads_received') {
                $saleExecutive += [
                    'number_of_leads_received_list' => $numberOfLeadsReceivedGet->get(),
                ];
            } else {
                $saleExecutive += [
                    'number_of_leads_received_list' => [],
                ];
            }
            $number_of_leads_received = $numberOfLeadsReceivedGet->count();
            $number_of_leads_received_fixed = $numberOfLeadsReceivedFixed->count();
            $number_of_leads_received_hourly = $numberOfLeadsReceivedHourly->count();


            $saleExecutive += [
                'sale_user'                       => $sales,
                'start_date'                      => $startDate,
                'end_date'                        => $endDate,
                'table_type'                      => $tableType,
                'number_of_leads_received'        => $number_of_leads_received,
                'number_of_leads_received_fixed'  => $number_of_leads_received_fixed,
                'number_of_leads_received_hourly' => $number_of_leads_received_hourly,
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

            if ($tableType == 'convert_deals') {
                $saleExecutive += [
                    'number_of_leads_convert_deals_list' => $number_of_leads_convert_deals->get(),
                ];
            } else {
                $saleExecutive += [
                    'number_of_leads_convert_deals_list' => [],
                ];
            }
            $this->number_of_leads_convert_deals = $number_of_leads_convert_deals->count();
            $this->number_of_leads_convert_deals_fixed = $number_of_leads_convert_deals_fixed->count();
            $this->number_of_leads_convert_deals_hourly = $number_of_leads_convert_deals_hourly->count();


            $saleExecutive += [
                'number_of_leads_convert_deals'        => $this->number_of_leads_convert_deals,
                'number_of_leads_convert_deals_fixed'  => $this->number_of_leads_convert_deals_fixed,
                'number_of_leads_convert_deals_hourly' => $this->number_of_leads_convert_deals_hourly,
            ];


            $number_of_leads_convert_won_deals = $number_of_leads_convert_deals->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });

            $number_of_leads_convert_won_deals_fixed = $number_of_leads_convert_deals_fixed->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });

            $number_of_leads_convert_won_deals_hourly = $number_of_leads_convert_deals_hourly->whereHas('leadDeal', function ($q) use ($startDate, $endDate) {
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });

            if ($tableType == 'convert_won_deals') {
                $this->number_of_leads_convert_won_deals_get = $number_of_leads_convert_won_deals->get();
                $saleExecutive += [
                    'number_of_leads_convert_won_deals_list' => $this->number_of_leads_convert_won_deals_get,
                ];
            } else {
                $saleExecutive += [
                    'number_of_leads_convert_won_deals_list' => [],
                ];
            }

            $this->number_of_leads_convert_won_deals = $number_of_leads_convert_won_deals->count();
            $this->number_of_leads_convert_won_deals_fixed = $number_of_leads_convert_won_deals_fixed->count();
            $this->number_of_leads_convert_won_deals_hourly = $number_of_leads_convert_won_deals_hourly->count();

            $saleExecutive += [
                'number_of_leads_convert_won_deals'        => $this->number_of_leads_convert_won_deals,
                'number_of_leads_convert_won_deals_fixed'  => $this->number_of_leads_convert_won_deals_fixed,
                'number_of_leads_convert_won_deals_hourly' => $this->number_of_leads_convert_won_deals_hourly,
            ];

            // Number of leads that got converted to won deals End

            $number_of_leads_create = $leadsWithDateAndId->count();
            $number_of_leads_amount = $leadsWithDateAndId->sum('value');

            $this->average_number_of_leads_amount = $number_of_leads_create ? round($number_of_leads_amount / $number_of_leads_create, 2) : 0;

            $delay_minute = $leadsWithDateAndId->sum('bidding_minutes');
            $delay_second = $leadsWithDateAndId->sum('bidding_seconds');

            $this->average_bidding_delay_time = $number_of_leads_create ? round((($delay_minute * 60 + $delay_second) / $number_of_leads_create), 2) : 0;

            $saleExecutive += [
                'average_number_of_leads_amount' => $this->average_number_of_leads_amount,
                'average_bidding_delay_time'     => gmdate('H:i:s', $this->average_bidding_delay_time),
            ];

            //---------------bidding frequency--------------------------------------

            $total_minutes = 0;
            $frequency_count = 0;

            $attendance_data_by_user = Attendance::with('leads')
                ->where('user_id', $salesId)
                ->whereNotNull('clock_out_time')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();
            foreach ($attendance_data_by_user as $attendance) {
                $flag = 0;
                $startTime = '';
                foreach ($attendance?->leads as $lead) {
                    if ($lead->created_at >= $attendance->clock_in_time && $lead->created_at <= $attendance->clock_out_time) {
                        if ($flag == 0) {
                            $flag = 1;
                            $startTime = Carbon::parse($lead->created_at);
                        } else {
                            $endTime = Carbon::parse($lead->created_at);
                            $minutesDifference = $endTime->diffInMinutes($startTime);
                            $startTime = $endTime;
                            $total_minutes += $minutesDifference;
                            $frequency_count++;
                        }
                    }
                }
            }

            $this->bidding_frequency = $frequency_count ? $total_minutes / $frequency_count : 0;

            $saleExecutive += [
                'bidding_frequency' => $this->bidding_frequency,
            ];

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

            //---------------Project completion/Won deal ratio-----------------------------------//


            $contractsSaleEndDate = Contract::with('project')
                ->where('last_updated_by', $salesId)
                ->where('updated_at', '<', $endDate);

            $projectCompletionCountClone = clone $contractsSaleEndDate;
            $projectCanceledCountClone = clone $contractsSaleEndDate;
            $wonDealCountRejectProjectClone = clone $contractsSaleEndDate;

            //--------Finished Projects---------------//



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



            //exclude one for end cycle date and other for today.  suppose today december 20  and end cycle 31.

            $this->won_deal_count_reject_project = $wonDealCountRejectProjectClone->count();

            // same logic for end date for current month

            $this->project_completion_count_ratio = $this->won_deal_count ? ($this->project_completion_count / $this->won_deal_count) * 100 : 0;

            $this->project_canceled_count_ratio = $this->won_deal_count ? ($this->project_canceled_count / $this->won_deal_count) * 100 : 0;

            $this->project_reject_count_ratio = $this->won_deal_count_reject_project ? ($this->project_reject_count / $this->won_deal_count_reject_project) * 100 : 0;


            // --------------Number of won deals table (fixed)-------------//

            if (false) {
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
            }

            // --------------Number of won deals table (hourly)-------------//
            if (false) {
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
            }

            $dealWithSaleIdDate = Deal::with('currency', 'user')
                ->where('added_by', $salesId)
                ->whereBetween('created_at', [$startDate, $endDate]);

            $dealWithSaleIdDateClone = clone $dealWithSaleIdDate;
            $dealWithSaleIdDatePartiallyFinishedClone = clone $dealWithSaleIdDate;
            $dealWithSaleIdDateDeniedClone = clone $dealWithSaleIdDate;

            $no_of_won_deals = $dealWithSaleIdDateClone->get();

            $finished_project = Deal::with('currency', 'user')
                ->where([
                    ['added_by', '=', $salesId],
                    ['created_at', '<', $endDate],
                    ['created_at', '>=', $startDate],
                ])->whereRelation('project', 'status', 'finished');

            $finished_project_count = $finished_project->count();

            if ($tableType == 'finished_project') {
                $saleExecutive += [
                    'finished_project_list' => $finished_project->get(),
                ];
            } else {
                $saleExecutive += [
                    'finished_project_list' => []
                ];
            }


            $this->no_of_won_deals_value = round($dealWithSaleIdDateClone->sum('amount'), 2);

            $canceled_project = $dealWithSaleIdDatePartiallyFinishedClone->with('project', 'user', 'currency')
                ->whereRelation('project', 'status', 'partially finished')
                ->orWhereRelation('project', 'status', 'canceled');
            $canceled_project_count = $canceled_project->count();
            if ($tableType == 'canceled_project') {
                $saleExecutive += [
                    'canceled_project_list' => $canceled_project->get(),
                ];
            } else {
                $saleExecutive += [
                    'canceled_project_list' => []
                ];
            }

            $rejected_project = $dealWithSaleIdDateDeniedClone->with('project', 'user', 'currency')->where('deals.status', '!=', 'Denied');

            $rejected_project_count = $rejected_project->count();

            if ($tableType == 'rejected_project') {
                $saleExecutive += [
                    'rejected_project_list' => $rejected_project->get(),
                ];
            } else {
                $saleExecutive += [
                    'rejected_project_list' => []
                ];
            }

            if (count($no_of_won_deals)) {
                $avg_deal_amount = round($this->no_of_won_deals_value / count($no_of_won_deals), 2);
                $finished_project_ratio = round($finished_project_count / count($no_of_won_deals), 2);
                $canceled_project_ratio = round($canceled_project_count / count($no_of_won_deals), 2);
                $rejected_project_ratio = round($rejected_project_count / count($no_of_won_deals), 2);
            } else {
                $avg_deal_amount = 0;
                $finished_project_ratio = 0;
                $canceled_project_ratio = 0;
                $rejected_project_ratio = 0;
            }

            // $country_wise_won_deals_count = Deal::join('users as client', 'client.id', 'deals.client_id')
            //     ->where('deals.added_by', $salesId)
            //     ->whereBetween('deals.created_at', [$startDate, $endDate])
            //     ->groupBy('client.country_id')
            //     ->where('deals.status', '!=', 'Denied')
            //     ->get();

            $saleExecutive += [
                'no_of_won_deals_list'   => ($tableType == 'num_of_won_deal') ? $no_of_won_deals : [],
                'no_of_won_deals_count'  => $no_of_won_deals->count(),
                'no_of_won_deals_value'  => $this->no_of_won_deals_value,
                'avg_deal_amount'        => $avg_deal_amount,
                'finished_project_ratio' => $finished_project_ratio,
                'finished_project_count' => $finished_project_count,
                'canceled_project_ratio' => $canceled_project_ratio,
                'canceled_project_count' => $canceled_project_count,
                'rejected_project_ratio' => $rejected_project_ratio,
                'rejected_project_count' => $rejected_project_count,
            ];

            return response(['data' => $saleExecutive], 200)->header('Content-Type', 'application/json');
        }
    }

    public function salesDashboardCountryWiseBiddingBreakdownAdminApi($sales)
    {
        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date'   => 'date|after:start_date',
            'sale_id'    => 'nullable',
        ]);
        if ($validator->fails()) {
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $salesId = request('sale_id') ?? $sales->id;
            if (request('start_date') && request('end_date')) {
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            } else {
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfDay();
                // $startDate = Carbon::parse('2023-06-01')->startOfMonth();
                // $endDate = Carbon::parse('2023-06-31')->endOfMonth();
            }

            //Country wise bidding breakdown

            $number_of_leads_received = Lead::where('added_by', $salesId)
                ->whereBetween('created_at', [$startDate, $endDate]);

            $number_of_leads_receivedClone = clone $number_of_leads_received;
            if ($number_of_leads_received->count()) {
                $country_wise_lead = $number_of_leads_receivedClone->select('country', DB::raw('COUNT(*) as lead_count, SUM(value) as lead_value'))
                    ->groupBy('country')->orderBy('lead_count', 'DESC')->get()->toArray();
            } else {
                $country_wise_lead = [];
            }


            if (count($country_wise_lead)) {
                $totalValue = array_sum(array_column($country_wise_lead, 'lead_value'));
                $country_wise_lead = Arr::map($country_wise_lead, function (array $value, string $key) use ($totalValue) {
                    return $value += [
                        'avg_lead_value'        => round($value['lead_value'] / $value['lead_count'], 2),
                        'percentage_lead_value' => round(($value['lead_value'] / $totalValue) * 100, 2),
                    ];
                });
            }

            $saleExecutive = [
                'country_wise_leads'       => $country_wise_lead ?? [],
                'country_wise_leads_count' => count($country_wise_lead) ?? 0,
                'number_of_leads_received' => $number_of_leads_received->count() ?? 0,
            ];
            return response(['data' => $saleExecutive], 200)->header('Content-Type', 'application/json');
        }
    }
    public function salesDashboardCountryWiseWonDealsAdminApi($sales)
    {
        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date'   => 'date|after:start_date',
            'sale_id'    => 'nullable',
        ]);
        if ($validator->fails()) {
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $salesId = request('sale_id') ?? $sales->id;

            if (request('start_date') && request('end_date')) {
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            } else {
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfDay();
                // $startDate = Carbon::parse('2023-06-01')->startOfMonth();
                // $endDate = Carbon::parse('2023-06-31')->endOfMonth();
            }

            // $country_wise_won_deals_count = Deal::join('users as client', 'client.id', 'deals.client_id')
            //     ->where('deals.added_by', $salesId)
            //     ->whereBetween('deals.created_at', [$startDate, $endDate])
            //     ->groupBy('client.country_id')
            //     ->where('deals.status', '!=', 'Denied')
            //     ->get();

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
                $lead_count = count($leads);

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
                    'won_deals_count'     => round($won_deals_count, 2),
                    'won_deals_value'     => round($won_deals_value, 2),
                    'avg_won_deals_value' => round($won_deals_value, 2) ? round($won_deals_value / $lead_count, 2) : 0,
                ];
                $leads_country[] = $country_data;
            }

            $totalCount = array_sum(array_column($leads_country, 'won_deals_count'));
            $totalValue = array_sum(array_column($leads_country, 'won_deals_value'));

            $leads_country = Arr::map($leads_country, function (array $value, string $key) use ($totalValue) {
                return $value += [
                    'percentage_won_deals_value' => round(($value['won_deals_value'] / $totalValue) * 100, 2),
                ];
            });


            $saleExecutive = [
                'country_wise_won_deals'       => $leads_country,
                'country_wise_won_deals_count' => count($leads_country),
            ];
            return response(['data' => $saleExecutive])->header('Content-Type', 'application/json');
        }
    }

    public function salesDashboardAdminView($sales)
    {
        return view('dashboard.employee.admin_view_sales_executive', $this->data);
    }
}
