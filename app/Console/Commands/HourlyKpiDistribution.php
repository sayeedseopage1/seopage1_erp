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

class HourlyKpiDistribution extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kpi_distribution:hourly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kpi distribution';

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
        $date= '2022-04-30';
        $completed_projects = Project::whereDate('start_date','>=',$date)->where('project_status','Accepted')->where('status','finished')->get();
    foreach ($completed_projects as $project) {
        $kpi_settings = kpiSettingLoggedHour::all();
        $total_minutes = ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');
        $kpi= kpiSetting::first();
        
        //$total_minutes = 1500;
        //$project->project_budget = 4000;

        if ($total_minutes > 0 && $project->project_budget >= $kpi->achieve_less_than ) {
            $total_hours = $total_minutes / 60;
            //un-comment this when finished
            $project_hourly_rate = $project->project_budget / $total_hours;
            //--------------
            foreach ($kpi_settings as $value) {
                //$value->logged_hours_between_to = 200;
                if ($value->logged_hours_between <= $project_hourly_rate && $value->logged_hours_between_to >= $project_hourly_rate) {
                    $deal = Deal::find($project->deal_id);
                    $project_budget= ($deal->amount * ($value->logged_hours_sales_amount) - $kpi->accepted_by_pm) / 100;

                    if($deal->lead_id != null) {
                        $lead = Lead::where('id',$deal->lead_id)->first();
                        $user_name= User::where('id',$lead->added_by)->first(); 
                        $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $lead->added_by;
                        $point->project_id= $project->id;
                        $point->activity= $user_name->name . ' created the bid';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi->the_bidder)/100;

                        if ($cash_points != null) {
                            $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
                        } else {
                            $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
                        }

                        $point->save();
                    }

                    $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

                    $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' made the deal qulaify deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->qualify)/100;

                    if ($cash_points_qualified != null) {
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
                    } else {
                        $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
                    }

                    $point->save();

                    $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();

                    $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' made the deal requirements defined';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->requirements_defined)/100;

                    if ($cash_points_requirements_defined != null) {
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
                    } else {
                        $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
                    }

                    $point->save();

                    $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' created the proposal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->proposal_made)/100;

                    if ($cash_points_proposal_made != null) {
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
                    } else {
                        $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
                    }

                    $point->save();

                    $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' started negotiation started';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->negotiation_started)/100;

                    if ($cash_points_negotiation_started != null) {
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
                    } else {
                        $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
                    }

                    $point->save();


                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                    if ($deal_milestone_breakdown != null) {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $deal_milestone_breakdown->updated_by;
                        $point->project_id= $project->id;
                        $point->activity= $user_name->name . ' created the milestone breakdown';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi->milestone_breakdown)/100;

                        if ($cash_points_milestone_breakdown != null) {
                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
                        } else {
                            $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
                        }

                        $point->save();
                    }

                    $user_name= User::where('id',$deal->added_by)->first(); 

                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal->added_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' closed the deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->closed_deal)/100;

                    if ($cash_points_close_deal != null) {
                   
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

                    }else 
                    {
                        $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;

                    }
                    $point->save();
                    $user_name= User::where('id',$deal->added_by)->first(); 

                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal->added_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->contact_form)/100;

                    if ($cash_points_contact != null) {
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
                    } else {
                        $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;

                    }
                    $point->save();

                    if ($deal->authorization_status == 1) {
                        $team_lead = User::where('role_id', 8)->first();
                        $user_name= User::where('id',$team_lead->id)->first(); 

                        $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $team_lead->id;
                        $point->project_id= $project->id;
                        $point->activity= $user_name->name . ' authorizes the deal';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi->authorized_by_leader)/100;

                        if ($cash_points_contact != null) {
                            $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
                        } else {
                            $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;

                        }
                        $point->save();
                        
                    }
                }
            }

            //$project_hourly_rate = 35;

            if ($kpi->logged_hours_above >= $project_hourly_rate) {
                $deal = Deal::find($project->deal_id);
                $project_budget= ($deal->amount * ($kpi->logged_hours_above_sales_amount) - $kpi->accepted_by_pm) / 100;

                if($deal->lead_id != null) {
                    $lead = Lead::where('id',$deal->lead_id)->first();
                    $user_name= User::where('id',$lead->added_by)->first(); 
                    $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $lead->added_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' created the bid';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->the_bidder)/100;

                    if ($cash_points != null) {
                        $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
                    } else {
                        $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
                    }

                    $point->save();
                }

                $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

                $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_qualified->updated_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' made the deal qulaify deal';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->qualify)/100;

                if ($cash_points_qualified != null) {
                    $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
                } else {
                    $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
                }

                $point->save();

                $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();

                $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_short_code->updated_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' made the deal requirements defined';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->requirements_defined)/100;

                if ($cash_points_requirements_defined != null) {
                    $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
                } else {
                    $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
                }

                $point->save();

                $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_proposal->updated_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' created the proposal';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->proposal_made)/100;

                if ($cash_points_proposal_made != null) {
                    $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
                } else {
                    $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
                }

                $point->save();

                $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_negotiation_started->updated_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' started negotiation started';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->negotiation_started)/100;

                if ($cash_points_negotiation_started != null) {
                    $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
                } else {
                    $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
                }

                $point->save();


                $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                if ($deal_milestone_breakdown != null) {
                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' created the milestone breakdown';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->milestone_breakdown)/100;

                    if ($cash_points_milestone_breakdown != null) {
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
                    } else {
                        $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
                    }

                    $point->save();
                }

                $user_name= User::where('id',$deal->added_by)->first(); 

                $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal->added_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' closed the deal';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->closed_deal)/100;

                if ($cash_points_close_deal != null) {
               
                    $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

                }else 
                {
                    $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;

                }
                $point->save();
                $user_name= User::where('id',$deal->added_by)->first(); 

                $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal->added_by;
                $point->project_id= $project->id;
                $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->contact_form)/100;

                if ($cash_points_contact != null) {
                    $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
                } else {
                    $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;

                }
                $point->save();

                if ($deal->authorization_status == 1) {
                    $team_lead = User::where('role_id', 8)->first();
                    $user_name= User::where('id',$team_lead->id)->first(); 

                    $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $team_lead->id;
                    $point->project_id= $project->id;
                    $point->activity= $user_name->name . ' authorizes the deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->authorized_by_leader)/100;

                    if ($cash_points_contact != null) {
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
                    } else {
                        $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;

                    }
                    $point->save();
                    
                }
            }
        }

    }
    }
}
