<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\GoalSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use App\Models\Lead;
use App\Models\ProjectTimeLog;
use App\Models\Seopage1Team;

use Carbon\Carbon;
use App\Models\Project;
use App\Models\Deal;
use App\Models\User;
use App\Models\DealStage;
use App\Models\DealStageChange;
use App\Models\kpiSetting;
use App\Models\CashPoint;
use DB;

class GoalAchieveCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'goal_achieve_check:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gaol Achieve Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function __construct()
    {
        parent::__construct();
    }
    public function handle()
    {
        $currentMonth = Carbon::now()->startOfMonth();
       
        // /dd($currentMonth);
        
        $deal_projects = Project::where('created_at', '>=', $currentMonth)
        ->where('project_status','!=','Not Accepted')->get();

        foreach ($deal_projects as $deal_project) {
           $goals = GoalSetting::where([
                'goal_status' =>  0, 
            ])->get();

           $deal_id= Deal::where('id',$deal_project['deal_id'])->first();            
            foreach($goals as $goal) {
                $start = Carbon::parse($goal->startDate);
                $end = Carbon::parse($goal->endDate);
                $dateToCheck = Carbon::parse($deal_id->created_at);
                
                if ($dateToCheck->between($start, $end)) {
                    if ($goal->entryType == 'Won') {
                        $team = Seopage1Team::find($goal->team_id);
                        $user_id = explode(',', rtrim($team->members, ','));
                    }
        
                    $array = [];
                    if ($goal->dealType == 'All Clients' || $goal->dealType == 'Existing Client') {
                        $deals_data = Deal::select([
                            'deals.*',
                           
                            'leads.added_by as bidder',
                        ])
                        ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                       
                        ->whereDate('deals.created_at', '>=', $goal->startDate);
        
                        if (!is_null($goal->endDate)) {
                            $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                        }
                        $deals_data = $deals_data->where('deals.status', '!=','Denied')
                       // ->whereIn('deals.added_by', $user_id)
                        ->orderBy('deals.id', 'desc')
                        ->get();

                        $team_total_amount = 0;
                        foreach ($deals_data as $key => $value) {
                            $check_client = Deal::whereDate('created_at', '>=', $goal->startDate);
                            if (!is_null($goal->endDate)) {
                                $check_client = $check_client->whereDate('created_at', '<=', $goal->endDate);
                            }
                            $check_client = $check_client->select('client_id')->groupBy('client_id')->get();
        
                            if ($goal->trackingType == 'count') {
                                $value->amount = 1;
                                $value->tracking_type = 'count';
                            }
                            
                            $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                            $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                            $value->team_total_amount = 0;
                           
                           // dd($value->deal_stage);
        
                            foreach ($value->deal_stage as $key => $deal_stage) {
                                $amount = 0;
                                if ($deal_stage->deal_stage_id ==  1) {
                                    $value->qualified_by = $deal_stage->updated_by;
                                    $amount = round((4 * $value->amount) / 100, 2);
                                    $value->qualified_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 2) {
                                    $value->required_defined = $deal_stage->updated_by;
                                    $amount = round((17 * $value->amount) / 100, 2);
                                    $value->required_defined_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 3) {
                                    $value->proposal_made = $deal_stage->updated_by;
                                    $amount = round((12 * $value->amount) / 100, 2);
                                    $value->proposal_made_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 4) {
                                    $value->negotiation_started = $deal_stage->updated_by;
                                    $amount = round((12 * $value->amount) / 100, 2);
                                    $value->negotiation_started_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 5) {
                                    $value->milestone_breakdown = $deal_stage->updated_by;
                                    $amount = round((14 * $value->amount) / 100, 2);
                                    $value->milestone_breakdown_amount = $amount;
                                }
        
                                if (in_array($deal_stage->updated_by, $user_id)) {
                                    $team_total_amount = $team_total_amount + $amount;
                                    $value->team_total_amount = $team_total_amount;
                                }
                            }
        
                            $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                            $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $user_id)->get();
                            //  dd($team_summation);
        
                            if (in_array($value->added_by, $user_id)) {
                                //$team_total_amount = $team_total_amount + $amount;
                                $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                            }
        
                            if (in_array($value->bidder, $user_id)) {
                                //$team_total_amount = $team_total_amount + $amount;
                                $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                            }
        
                            $array[] = $value;
                        }
                        if($goal->team_id == 1) {
                            if($goal->trackingType == 'value') {
                                $team_total_amount = Deal::where('status','!=','Denied')->sum('amount');
                            } else {
                                $team_total_amount = Deal::where('status','!=','Denied')->count(); 
                            }
                        }
                  
                        if ($team_total_amount >= (int) $goal->trackingValue) {
                            $goal_id= GoalSetting::find($goal->id);
                            $goal_id->goal_status = 1;
                            $goal_id->save();
                            if ($goal->achievablePoints > 0) {
        
                                $distribute_amount = $goal->achievablePoints / count($user_id);
                                
                                foreach ($user_id as $value2) {
        
                                    $user_name = User::find($value2);
                                    $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
        
                                    $point= new CashPoint();
                                    $point->user_id= $value2;
                                    $point->project_id= $deal_project->id;
                                    $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                                    $point->gained_as = "Individual";
                                    $point->points= $distribute_amount;
        
                                    if ($user_last_point != null) {
                                        $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                                    } else {
                                        $point->total_points_earn=  $distribute_amount;
                                    }
        
                                    $point->save();
                                }
                            }
                        }
                    } elseif ($goal->dealType == 'New Client') {
                        $deals_data = Deal::select([
                            'deals.*',
                           
                            'leads.added_by as bidder',
                        ])
                        ->leftjoin('leads', 'leads.id', 'deals.lead_id')
                       
                        ->whereDate('deals.created_at', '>=', $goal->startDate)
                        ->where('deals.client_badge','=','new client');
        
                        if (!is_null($goal->endDate)) {
                            $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                        }

                        $deals_data = $deals_data->where('deals.status', '!=','Denied')
                        ->orderBy('deals.id', 'desc')
                        ->get();
                        $team_total_amount = 0;
        
                        foreach ($deals_data as $key => $value) {
                            if ($goal->trackingType == 'count') {
                                $value->amount = 1;
                                $value->tracking_type = 'count';
                            }
        
                            $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                            $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                            $value->team_total_amount = 0;
                           
        
                            foreach ($value->deal_stage as $key => $deal_stage) {
                                $amount = 0;
                                if ($deal_stage->deal_stage_id ==  1) {
                                    $value->qualified_by = $deal_stage->updated_by;
                                    $amount = round((4 * $value->amount) / 100, 2);
                                    $value->qualified_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 2) {
                                    $value->required_defined = $deal_stage->updated_by;
                                    $amount = round((17 * $value->amount) / 100, 2);
                                    $value->required_defined_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 3) {
                                    $value->proposal_made = $deal_stage->updated_by;
                                    $amount = round((12 * $value->amount) / 100, 2);
                                    $value->proposal_made_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 4) {
                                    $value->negotiation_started = $deal_stage->updated_by;
                                    $amount = round((12 * $value->amount) / 100, 2);
                                    $value->negotiation_started_amount = $amount;
                                } elseif ($deal_stage->deal_stage_id == 5) {
                                    $value->milestone_breakdown = $deal_stage->updated_by;
                                    $amount = round((14 * $value->amount) / 100, 2);
                                    $value->milestone_breakdown_amount = $amount;
                                }
        
                                if (in_array($deal_stage->updated_by, $user_id)) {
                                    $team_total_amount = $team_total_amount + $amount;
                                    $value->team_total_amount = $team_total_amount;
                                }
                            }
        
                            $value->won_deal_amount = round((17 * $value->amount) / 100, 2);
                            $team_summation = DealStageChange::where('deal_id', $value->deal_id)->whereIn('updated_by', $user_id)->get();
        
                            if (in_array($value->added_by, $user_id)) {
                                $value->team_total_amount = round($value->team_total_amount + $value->won_deal_amount, 2);
                            }
        
                            if (in_array($value->bidder, $user_id)) {
                                $value->team_total_amount = round($value->team_total_amount + $value->bidder_amount, 2);
                            }
        
                           $array[] = $value;
                        }
                        if($goal->team_id == 1) {
                            if (is_null($goal->endDate)) {
                                $end_date = Carbon::parse($goal->startDate);
                                if ($goal->frequency == 'Monthly') {
                                    $end_date = $end_date->addMonths()->format('Y-m-d');
                                } elseif ($goal->frequency == 'Quarterly') {
                                    $end_date = $end_date->addMonths(3)->format('Y-m-d');
                                } elseif ($goal->frequency == 'Yearly') {
                                    $end_date = $end_date->addMonths(12)->format('Y-m-d');
                                } else {
                                    $end_date = $end_date->addDays(10)->format('Y-m-d');
                                }
                            } else {
                                $end_date = $goal->endDate;
                            }

                            if($goal->trackingType == 'value') {
                                $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                ->whereDate('start_date', '>=', $goal->startDate)
                                ->whereDate('start_date', '<=', $end_date)
                                ->sum('amount');
                            } else {
                                $team_total_amount = Deal::where('status','!=','Denied')->where('client_badge','new client')
                                ->whereDate('start_date', '>=', $goal->startDate)
                                ->whereDate('start_date', '<=', $end_date)
                                ->count(); 
                            }
                        }

                        if ($team_total_amount >= (int) $goal->trackingValue) {
                            $goal_id= GoalSetting::find($goal->id);
                            $goal_id->goal_status = 1;
                            $goal_id->save();
        
                                if ($goal->achievablePoints > 0) {
        
                                    $distribute_amount = $goal->achievablePoints / count($user_id);
                                    
                                    foreach ($user_id as $value2) {
        
                                        $user_name = User::find($value2);
                                        $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
        
                                        $point= new CashPoint();
                                        $point->user_id= $value2;
                                        $point->project_id= $deal_project->id;
                                        $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                                        $point->gained_as = "Individual";
                                        $point->points= $distribute_amount;
        
                                        if ($user_last_point != null) {
                                            $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                                        } else {
                                            $point->total_points_earn=  $distribute_amount;
                                        }
        
                                        $point->save();
                                    }
                                }
                            }
                        
                    }
                }
            }

           
           
    
           
            foreach ($goals as $goal) {
                $start = Carbon::parse($goal->startDate);
                $end = Carbon::parse($goal->endDate);
                $dateToCheck = Carbon::parse($deal_id->created_at);
    
                if ($dateToCheck->between($start, $end)) {
    
                if($goal->team_id != null)
                {
                    $team = Seopage1Team::find($goal->team_id);
        
                    $users = explode(',', $team->members);
                    $user_data = [];
                    foreach ($users as $key => $value) {
                        if ($value != '') {
                             //$user = User::find($value);
                            array_push($user_data,$value);
                        }
                    }
                } else {
                    $user_data[]= $goal->user_id;
                }
            }
            
            
            // Always use an array of user IDs, even if $goal->user_id is set
            $goal2 = $goal->user_id ? [$goal->user_id] : $user_data;
           
            
            if ($goal->entryType == 'Added') {
    
                if($goal->dealType == 'New Client')
                {
        
           //dd("nksdnlas");
                $dealStage = DealStage::select([
                    'deal_stages.*',
                    'deal_stages.id as id',
                    'deal_stages.id as deal_id',
                    'deal_stages.client_username as client_username',
                    'deal_stages.project_name as deal_project_name',
                    'deal_stages.project_link as deal_project_link',
                    'deal_stages.amount as deal_amount',
                    'deal_stages.deal_stage as deal_stage',
                    'deal_stages.deal_status as deal_status',
                    'deal_stages.actual_amount as deal_original_amount',
                    'deal_stages.created_at as deal_created_at',
                    'leads.added_by as lead_converted_by',
                    'leads.id as lead_id',
                ])
                ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->whereIn('leads.added_by', $goal2)
                ->whereDate('deal_stages.created_at', '>=', $goal->startDate)
                ->where('deal_stages.client_badge','=','new client');
                
            //  /dd($dealStage);
        
                if (!is_null($goal->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
                   // dd($dealStage);
                }
        
                $dealStage_amount2 = $dealStage->get();
                $dealStage_amount = $dealStage->sum('deal_stages.amount');
                $dealStage_count = $dealStage->count();
               // dd($dealStage_amount,$dealStage_count);
                if ($goal->trackingType == 'value') {
                    
                        $deal_amount = $dealStage_amount;
                    //    / dd($deal_amount);
                    
                } else {
                   
                        $deal_amount = $dealStage_count;
                   
                }
               //dd($deal_amount);
                if ($deal_amount >= (int) $goal->trackingValue) {
                    $goal_update= GoalSetting::find($goal->id);
                    $goal_update->goal_status = 1;
                    $goal_update->save();
                    if ($goal->achievablePoints > 0) {
    
                        $distribute_amount = $goal->achievablePoints / count($user_data); 
                        
                        foreach ($user_data as $value) {
    
                            $user_name = User::find($value);
                            $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    
                            $point= new CashPoint();
                            $point->user_id= $value;
                           // $point->project_id= $find_project_id->id;
                            $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                            $point->gained_as = "Individual";
                            $point->points= $distribute_amount;
    
                            if ($user_last_point != null) {
                                $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                            } else {
                                $point->total_points_earn=  $distribute_amount;
                            }
    
                            $point->save();
                        }
                    }
    
                }
    
            }else 
            {
                $dealStage = DealStage::select([
                    'deal_stages.*',
                    'deal_stages.id as id',
                    'deal_stages.id as deal_id',
                    'deal_stages.client_username as client_username',
                    'deal_stages.project_name as deal_project_name',
                    'deal_stages.project_link as deal_project_link',
                    'deal_stages.amount as deal_amount',
                    'deal_stages.deal_stage as deal_stage',
                    'deal_stages.deal_status as deal_status',
                    'deal_stages.actual_amount as deal_original_amount',
                    'deal_stages.created_at as deal_created_at',
                    'leads.added_by as lead_converted_by',
                    'leads.id as lead_id',
                ])
                ->leftJoin('leads', 'leads.id', '=', 'deal_stages.lead_id')
                ->whereIn('leads.added_by', $goal2)
                ->whereDate('deal_stages.created_at', '>=', $goal->startDate);
                // ->groupBy('deal_stages.client_username');
            //  /dd($dealStage);
        
                if (!is_null($goal->endDate)) {
                    $dealStage = $dealStage->whereDate('deal_stages.created_at', '<=', $goal->endDate);
                   // dd($dealStage);
                }
        
                $dealStage_amount = $dealStage->sum('deal_stages.amount');
                $dealStage_count = $dealStage->count();
                if ($goal->trackingType == 'value') {
                    
                        $deal_amount = $dealStage_amount;
                    //    / dd($deal_amount);
                    
                } else {
                   
                        $deal_amount = $dealStage_count;
                   
                }
                // dd($deal_amount);
                if ($deal_amount >= (int) $goal->trackingValue) {
                    $goal_update= GoalSetting::find($goal->id);
                    $goal_update->goal_status = 1;
                    $goal_update->save();
                    if ($goal->achievablePoints > 0) {
    
                        $distribute_amount = $goal->achievablePoints / count($user_data);
                        
                        foreach ($user_data as $value) {
    
                            $user_name = User::find($value);
                            $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    
                            $point= new CashPoint();
                            $point->user_id= $value;
                           // $point->project_id= $find_project_id->id;
                            $point->activity= $user_name->name . ' For achieving '.$goal->frequency.' Goal '.$goal->title;
                            $point->gained_as = "Individual";
                            $point->points= $distribute_amount;
    
                            if ($user_last_point != null) {
                                $point->total_points_earn= $user_last_point->total_points_earn + $distribute_amount;
                            } else {
                                $point->total_points_earn=  $distribute_amount;
                            }
    
                            $point->save();
                        }
                    }
                }
    
            }
            // kpi points distribution start from here
    
    
             // kpi points distribution end here
        
        
            }
           
    
                
            }
        
        
        }
      
    }

}
