<?php

namespace App\Console\Commands;

use App\Models\GoalSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use App\Models\Lead;
use App\Models\ProjectTimeLog;
use App\Models\Seopage1Team;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\Deal;
use App\Models\User;
use App\Models\DealStage;
use App\Models\DealStageChange;
use App\Models\kpiSetting;
use App\Models\CashPoint;
use DB;


class KpiDistribution extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kpi_distribution:monthly';

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
        $date = '2023-05-01';
        //dd($currentMonth);
        $projects = Project::whereDate('start_date','>=',$date)->where('project_status','Accepted')->get();
        // /dd($projects);
      //  \DB::beginTransaction();

        foreach ($projects as $value) {
           
                 //kpi distribution start from here 
        $find_project_id= Project::where('id',$value->id)->first();
        $find_deal_id= Deal::where('id',$find_project_id->deal_id)->first();
        // dd($find_project_id);
       
            $kpi= kpiSetting::first();
        //    / dd($kpi);

         
            $project_budget= ($find_deal_id->amount * $kpi->accepted_by_pm)/100;

            if($find_deal_id->lead_id != null)
            {
                $lead = Lead::where('id',$find_deal_id->lead_id)->first();
                $user_name= User::where('id',$lead->added_by)->first(); 
                $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $lead->added_by;
                $point->project_id= $find_project_id->id;
                $point->activity= $user_name->name . ' created the bid';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi->the_bidder)/100;

                if ($cash_points != null) {
               
                    $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi->the_bidder)/100;

                }else 
                {
                    $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;

                }
                $point->save();
            }
                    $deal_qualified= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',1)->first();


                    $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' made the deal qulaify deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->qualify)/100;

                    if ($cash_points_qualified != null) {
                   
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;

                    }
                    $point->save();
                  

               
                    $deal_short_code= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',2)->first();

                    $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' made the deal requirements defined';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->requirements_defined)/100;

                    if ($cash_points_requirements_defined != null) {
                   
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;

                    }
                    $point->save();
                   

              
                
                    $deal_proposal= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' created the proposal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->proposal_made)/100;

                    if ($cash_points_proposal_made != null) {
                   
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;

                    }
                    $point->save();
                   

                
                    $deal_negotiation_started= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',4)->first();                               
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' started negotiation started';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->negotiation_started)/100;

                    if ($cash_points_negotiation_started != null) {
                   
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;

                    }
                    $point->save();

                  
                   
               
                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',5)->first();
                    if($deal_milestone_breakdown != null)
                    {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 

                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' created the milestone breakdown';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->milestone_breakdown)/100;

                    if ($cash_points_milestone_breakdown != null) {
                   
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget*$kpi->milestone_breakdown)/100;

                    }
                    $point->save();


                    }

                    $deal_id= Deal::where('id',$find_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name= User::where('id',$deal_id->added_by)->first(); 

                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id->added_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' closed the deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->closed_deal)/100;

                    if ($cash_points_close_deal != null) {
                   
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget*$kpi->closed_deal)/100;

                    }
                    $point->save();
                    $deal_id_contact= Deal::where('id',$find_deal_id->id)->first();
                    $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id_contact->added_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi->contact_form)/100;

                    if ($cash_points_contact != null) {
                   
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget*$kpi->contact_form)/100;

                    }
                    $point->save();
                    if ($find_deal_id->authorization_status == 1) {
                        $earned_point = ($kpi->authorized_by_leader * $project_budget) / 100;

                     $user_name= User::where('role_id',8)->first(); 
                     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     //kpi point
                     $point= new CashPoint();
                     $point->user_id= $user_name->id;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' for authorizing deal';
                     $point->gained_as = "Individual";
                     $point->points= $earned_point;
             
                     if ($cash_points_team_lead != null) {            
                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ $earned_point;
                     } else {
                         $point->total_points_earn= $earned_point;
                     }
             
                     $point->save();
                     }
                   
                    


                    if ($find_deal_id->amount > $kpi->generate_single_deal) {

                        $bonus_point= $kpi->bonus_point;
                        if($find_deal_id->lead_id != null)
             {
                 $lead = Lead::where('id',$find_deal_id->lead_id)->first();
                 $user_name= User::where('id',$lead->added_by)->first(); 
                 $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                 $point= new CashPoint();
                 $point->user_id= $lead->added_by;
                 $point->project_id= $find_project_id->id;
                 $point->activity= $user_name->name . ' created the bid';
                 $point->gained_as = "Individual";
                 $point->points= ($bonus_point*$kpi->the_bidder)/100;

                 if ($cash_points != null) {
                
                     $point->total_points_earn= $cash_points->total_points_earn+ ($bonus_point*$kpi->the_bidder)/100;

                 }else 
                 {
                     $point->total_points_earn=  ($bonus_point*$kpi->the_bidder)/100;

                 }
                 $point->save();
                // dd($point);

             }
                     $deal_qualified= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',1)->first();


                     $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                     $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_qualified->updated_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' made the deal qulaify deal';
                     $point->gained_as = "Individual";
                     $point->points= ($bonus_point*$kpi->qualify)/100;

                     if ($cash_points_qualified != null) {
                    
                         $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($bonus_point*$kpi->qualify)/100;

                     }else 
                     {
                         $point->total_points_earn=  ($bonus_point*$kpi->qualify)/100;

                     }
                     $point->save();
                   

                
                     $deal_short_code= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',2)->first();

                     $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                     $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_short_code->updated_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' made the deal requirements defined';
                     $point->gained_as = "Individual";
                     $point->points= ($bonus_point*$kpi->requirements_defined)/100;

                     if ($cash_points_requirements_defined != null) {
                    
                         $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($bonus_point*$kpi->requirements_defined)/100;

                     }else 
                     {
                         $point->total_points_earn=  ($bonus_point*$kpi->requirements_defined)/100;

                     }
                     $point->save();
                    

               
                 
                     $deal_proposal= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',3)->first();
                     $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                     $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_proposal->updated_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' created the proposal';
                     $point->gained_as = "Individual";
                     $point->points= ($bonus_point*$kpi->proposal_made)/100;

                     if ($cash_points_proposal_made != null) {
                    
                         $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($bonus_point*$kpi->proposal_made)/100;

                     }else 
                     {
                         $point->total_points_earn=  ($bonus_point*$kpi->proposal_made)/100;

                     }
                     $point->save();
                    

                 
                     $deal_negotiation_started= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',4)->first();                               
                     $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                     $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_negotiation_started->updated_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' started negotiation started';
                     $point->gained_as = "Individual";
                     $point->points= ($bonus_point*$kpi->negotiation_started)/100;

                     if ($cash_points_negotiation_started != null) {
                    
                         $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($bonus_point*$kpi->negotiation_started)/100;

                     }else 
                     {
                         $point->total_points_earn=  ($bonus_point*$kpi->negotiation_started)/100;

                     }
                     $point->save();
                    
                
                     $deal_milestone_breakdown= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',5)->first();

                     if($deal_milestone_breakdown != null)
                     {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $deal_milestone_breakdown->updated_by;
                        $point->project_id= $find_project_id->id;
                        $point->activity= $user_name->name . ' created the milestone breakdown';
                        $point->gained_as = "Individual";
                        $point->points= ($bonus_point*$kpi->milestone_breakdown)/100;

                        if ($cash_points_milestone_breakdown != null) {
                       
                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($bonus_point*$kpi->milestone_breakdown)/100;

                        }else 
                        {
                            $point->total_points_earn=
                            ($bonus_point*$kpi->milestone_breakdown)/100;

                        }
                        $point->save();


                     }
                     $deal_id= Deal::where('id',$find_deal_id->id)->first();
                     //dd($deal_id);
                     $user_name= User::where('id',$deal_id->added_by)->first(); 

                     $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_id->added_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' closed the deal';
                     $point->gained_as = "Individual";
                     $point->points= ($project_budget*$kpi->closed_deal)/100;

                     if ($cash_points_close_deal != null) {
                    
                         $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

                     }else 
                     {
                         $point->total_points_earn=
                         ($project_budget*$kpi->closed_deal)/100;

                     }
                     $point->save();
                     $deal_id_contact= Deal::where('id',$find_deal_id->id)->first();
                     $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                     $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     $point= new CashPoint();
                     $point->user_id= $deal_id_contact->added_by;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                     $point->gained_as = "Individual";
                     $point->points= ($project_budget*$kpi->contact_form)/100;

                     if ($cash_points_contact != null) {
                    
                         $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;

                     }else 
                     {
                         $point->total_points_earn=
                         ($project_budget*$kpi->contact_form)/100;

                     }
                     $point->save();

                     if ($find_deal_id->authorization_status == 1) {
                        $earned_point = ($kpi->authorized_by_leader * $find_deal_id->amount) / 100;

                     $user_name= User::where('role_id',8)->first(); 
                     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     //kpi point
                     $point= new CashPoint();
                     $point->user_id= $user_name->id;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' for authorizing deal';
                     $point->gained_as = "Individual";
                     $point->points= $earned_point;
             
                     if ($cash_points_team_lead != null) {            
                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ $earned_point;
                     } else {
                         $point->total_points_earn= $earned_point;
                     }
             
                     $point->save();
                     }

                    
                    

                     
                    
                     }
                     $currentMonth = Carbon::now()->month;
                    // / dd($currentMonth);
                  $monthly_deal = Deal::whereMonth('created_at', $currentMonth)->sum('amount');
                    //$monthly_deal = 20000;

                     $kpi_settings= kpiSettingGenerateSale::all();
                    // dd($kpi_settings);
                     $user_name= User::where('role_id',8)->first(); 
                     $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                     foreach ($kpi_settings as $value) {
                        // /dd($value);
                        if ( $monthly_deal >= $value->generate_sales_from  &&  $monthly_deal <= $value->generate_sales_to ) {

                     $point= new CashPoint();
                     $point->user_id= $user_name->id;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' for achieving monthly target';
                     $point->gained_as = "Individual";
                     $point->points= ($project_budget*$value->generate_sales_amount)/100;

                     if ($cash_points_team_lead != null) {
                    
                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ ($project_budget*$value->generate_sales_amount)/100;

                     }else 
                     {
                         $point->total_points_earn=
                         ($project_budget*$value->generate_sales_amount)/100;

                     }
                     $point->save();
                            
                        }
                     }
                     if ($monthly_deal > $kpi->generate_sales_above)
                {
                        $user_name= User::where('role_id',8)->first(); 
                        $cash_points_team_lead= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                     $point->user_id= $user_name->id;
                     $point->project_id= $find_project_id->id;
                     $point->activity= $user_name->name . ' for achieving monthly target';
                     $point->gained_as = "Individual";
                     $point->points= ($project_budget*$kpi->generate_sales_above_point)/100;

                     if ($cash_points_team_lead != null) {
                    
                         $point->total_points_earn=$cash_points_team_lead->total_points_earn+ ($project_budget*$kpi->generate_sales_above_point)/100;

                     }else 
                     {
                         $point->total_points_earn=
                         ($project_budget*$kpi->generate_sales_above_point)/100;

                     }
                     $point->save();
                     }
                     if ($monthly_deal > $kpi->after && $monthly_deal >= $monthly_deal+ $kpi->additional_sales_amount ) {

                        $project_budget_additional= $kpi->after_reach_amount;
                       
            if($find_deal_id->lead_id != null)
            {
                $lead = Lead::where('id',$find_deal_id->lead_id)->first();
                $user_name= User::where('id',$lead->added_by)->first(); 
                $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $lead->added_by;
                $point->project_id= $find_project_id->id;
                $point->activity= $user_name->name . ' created the bid';
                $point->gained_as = "Individual";
                $point->points= ($project_budget_additional*$kpi->the_bidder)/100;

                if ($cash_points != null) {
               
                    $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget_additional*$kpi->the_bidder)/100;

                }else 
                {
                    $point->total_points_earn=  ($project_budget_additional*$kpi->the_bidder)/100;

                }
                $point->save();
               // dd($point);

            }
                    $deal_qualified= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',1)->first();


                    $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' made the deal qulaify deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->qualify)/100;

                    if ($cash_points_qualified != null) {
                   
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget_additional*$kpi->qualify)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget_additional*$kpi->qualify)/100;

                    }
                    $point->save();
                  

               
                    $deal_short_code= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',2)->first();

                    $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' made the deal requirements defined';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->requirements_defined)/100;

                    if ($cash_points_requirements_defined != null) {
                   
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget_additional*$kpi->requirements_defined)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget_additional*$kpi->requirements_defined)/100;

                    }
                    $point->save();
                   

              
                
                    $deal_proposal= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' created the proposal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->proposal_made)/100;

                    if ($cash_points_proposal_made != null) {
                   
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget_additional*$kpi->proposal_made)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget_additional*$kpi->proposal_made)/100;

                    }
                    $point->save();
                   

                
                    $deal_negotiation_started= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',4)->first();                               
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' started negotiation started';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->negotiation_started)/100;

                    if ($cash_points_negotiation_started != null) {
                   
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget_additional*$kpi->negotiation_started)/100;

                    }else 
                    {
                        $point->total_points_earn=  ($project_budget_additional*$kpi->negotiation_started)/100;

                    }
                    $point->save();

                  
                   
               
                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$find_deal_id->deal_id)->where('deal_stage_id',5)->first();
                    if($deal_milestone_breakdown != null)
                    {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 

                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' created the milestone breakdown';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->milestone_breakdown)/100;

                    if ($cash_points_milestone_breakdown != null) {
                   
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget_additional*$kpi->milestone_breakdown)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget_additional*$kpi->milestone_breakdown)/100;

                    }
                    $point->save();


                    }

                    $deal_id= Deal::where('id',$find_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name= User::where('id',$deal_id->added_by)->first(); 

                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id->added_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' closed the deal';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->closed_deal)/100;

                    if ($cash_points_close_deal != null) {
                   
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget_additional*$kpi->closed_deal)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget_additional*$kpi->closed_deal)/100;

                    }
                    $point->save();
                    $deal_id_contact= Deal::where('id',$find_deal_id->id)->first();
                    $user_name= User::where('id',$deal_id_contact->added_by)->first(); 

                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id_contact->added_by;
                    $point->project_id= $find_project_id->id;
                    $point->activity= $user_name->name . ' submitted the contact form for the project manager';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget_additional*$kpi->contact_form)/100;

                    if ($cash_points_contact != null) {
                   
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget_additional*$kpi->contact_form)/100;

                    }else 
                    {
                        $point->total_points_earn=
                        ($project_budget_additional*$kpi->contact_form)/100;

                    }
                    $point->save();

                       

                     }
                    

            
            
        
    }
    // $completed_projects = Project::whereDate('start_date','>=',$date)->where('project_status','Accepted')->where('status','finished')->get();
    // foreach ($completed_projects as $project) {
    //     $kpi_settings = kpiSettingLoggedHour::all();
    //     $total_minutes = ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');
    //     $kpi= kpiSetting::first();
        
    //     //$total_minutes = 1500;
    //     //$project->project_budget = 4000;

    //     if ($total_minutes > 0 && $project->project_budget >= $kpi->achieve_less_than ) {
    //         $total_hours = $total_minutes / 60;
    //         //un-comment this when finished
    //         $project_hourly_rate = $project->project_budget / $total_hours;
    //         //--------------
    //         foreach ($kpi_settings as $value) {
    //             //$value->logged_hours_between_to = 200;
    //             if ($value->logged_hours_between <= $project_hourly_rate && $value->logged_hours_between_to >= $project_hourly_rate) {
    //                 $deal = Deal::find($project->deal_id);
    //                 $project_budget= ($deal->amount * ($value->logged_hours_sales_amount) - $kpi->accepted_by_pm) / 100;

    //                 if($deal->lead_id != null) {
    //                     $lead = Lead::where('id',$deal->lead_id)->first();
    //                     $user_name= User::where('id',$lead->added_by)->first(); 
    //                     $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
    //                     $point= new CashPoint();
    //                     $point->user_id= $lead->added_by;
    //                     $point->project_id= $project->id;
    //                     $point->activity= $user_name->name . ' created the bid';
    //                     $point->gained_as = "Individual";
    //                     $point->points= ($project_budget*$kpi->the_bidder)/100;

    //                     if ($cash_points != null) {
    //                         $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
    //                     } else {
    //                         $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
    //                     }

    //                     $point->save();
    //                 }

    //                 $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

    //                 $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
    //                 $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal_qualified->updated_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' made the deal qulaify deal';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->qualify)/100;

    //                 if ($cash_points_qualified != null) {
    //                     $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
    //                 } else {
    //                     $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
    //                 }

    //                 $point->save();

    //                 $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();

    //                 $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
    //                 $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal_short_code->updated_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' made the deal requirements defined';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->requirements_defined)/100;

    //                 if ($cash_points_requirements_defined != null) {
    //                     $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
    //                 } else {
    //                     $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
    //                 }

    //                 $point->save();

    //                 $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
    //                 $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
    //                 $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal_proposal->updated_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' created the proposal';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->proposal_made)/100;

    //                 if ($cash_points_proposal_made != null) {
    //                     $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
    //                 } else {
    //                     $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
    //                 }

    //                 $point->save();

    //                 $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
    //                 $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
    //                 $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal_negotiation_started->updated_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' started negotiation started';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->negotiation_started)/100;

    //                 if ($cash_points_negotiation_started != null) {
    //                     $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
    //                 } else {
    //                     $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
    //                 }

    //                 $point->save();


    //                 $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
    //                 if ($deal_milestone_breakdown != null) {
    //                     $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
    //                     $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                     $point= new CashPoint();
    //                     $point->user_id= $deal_milestone_breakdown->updated_by;
    //                     $point->project_id= $project->id;
    //                     $point->activity= $user_name->name . ' created the milestone breakdown';
    //                     $point->gained_as = "Individual";
    //                     $point->points= ($project_budget*$kpi->milestone_breakdown)/100;

    //                     if ($cash_points_milestone_breakdown != null) {
    //                         $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
    //                     } else {
    //                         $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
    //                     }

    //                     $point->save();
    //                 }

    //                 $user_name= User::where('id',$deal->added_by)->first(); 

    //                 $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal->added_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' closed the deal';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->closed_deal)/100;

    //                 if ($cash_points_close_deal != null) {
                   
    //                     $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

    //                 }else 
    //                 {
    //                     $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;

    //                 }
    //                 $point->save();
    //                 $user_name= User::where('id',$deal->added_by)->first(); 

    //                 $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal->added_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' submitted the contact form for the project manager';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->contact_form)/100;

    //                 if ($cash_points_contact != null) {
    //                     $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
    //                 } else {
    //                     $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;

    //                 }
    //                 $point->save();

    //                 if ($deal->authorization_status == 1) {
    //                     $team_lead = User::where('role_id', 8)->first();
    //                     $user_name= User::where('id',$team_lead->id)->first(); 

    //                     $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
    //                     $point= new CashPoint();
    //                     $point->user_id= $team_lead->id;
    //                     $point->project_id= $project->id;
    //                     $point->activity= $user_name->name . ' authorizes the deal';
    //                     $point->gained_as = "Individual";
    //                     $point->points= ($project_budget*$kpi->authorized_by_leader)/100;

    //                     if ($cash_points_contact != null) {
    //                         $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
    //                     } else {
    //                         $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;

    //                     }
    //                     $point->save();
                        
    //                 }
    //             }
    //         }

    //         //$project_hourly_rate = 35;

    //         if ($kpi->logged_hours_above >= $project_hourly_rate) {
    //             $deal = Deal::find($project->deal_id);
    //             $project_budget= ($deal->amount * ($kpi->logged_hours_above_sales_amount) - $kpi->accepted_by_pm) / 100;

    //             if($deal->lead_id != null) {
    //                 $lead = Lead::where('id',$deal->lead_id)->first();
    //                 $user_name= User::where('id',$lead->added_by)->first(); 
    //                 $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $lead->added_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' created the bid';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->the_bidder)/100;

    //                 if ($cash_points != null) {
    //                     $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
    //                 } else {
    //                     $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
    //                 }

    //                 $point->save();
    //             }

    //             $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();

    //             $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
    //             $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal_qualified->updated_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' made the deal qulaify deal';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->qualify)/100;

    //             if ($cash_points_qualified != null) {
    //                 $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
    //             } else {
    //                 $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
    //             }

    //             $point->save();

    //             $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();

    //             $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
    //             $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal_short_code->updated_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' made the deal requirements defined';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->requirements_defined)/100;

    //             if ($cash_points_requirements_defined != null) {
    //                 $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
    //             } else {
    //                 $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
    //             }

    //             $point->save();

    //             $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
    //             $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
    //             $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal_proposal->updated_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' created the proposal';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->proposal_made)/100;

    //             if ($cash_points_proposal_made != null) {
    //                 $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
    //             } else {
    //                 $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
    //             }

    //             $point->save();

    //             $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
    //             $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
    //             $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal_negotiation_started->updated_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' started negotiation started';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->negotiation_started)/100;

    //             if ($cash_points_negotiation_started != null) {
    //                 $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
    //             } else {
    //                 $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
    //             }

    //             $point->save();


    //             $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
    //             if ($deal_milestone_breakdown != null) {
    //                 $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
    //                 $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $deal_milestone_breakdown->updated_by;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' created the milestone breakdown';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->milestone_breakdown)/100;

    //                 if ($cash_points_milestone_breakdown != null) {
    //                     $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
    //                 } else {
    //                     $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
    //                 }

    //                 $point->save();
    //             }

    //             $user_name= User::where('id',$deal->added_by)->first(); 

    //             $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal->added_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' closed the deal';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->closed_deal)/100;

    //             if ($cash_points_close_deal != null) {
               
    //                 $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;

    //             }else 
    //             {
    //                 $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;

    //             }
    //             $point->save();
    //             $user_name= User::where('id',$deal->added_by)->first(); 

    //             $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    //             $point= new CashPoint();
    //             $point->user_id= $deal->added_by;
    //             $point->project_id= $project->id;
    //             $point->activity= $user_name->name . ' submitted the contact form for the project manager';
    //             $point->gained_as = "Individual";
    //             $point->points= ($project_budget*$kpi->contact_form)/100;

    //             if ($cash_points_contact != null) {
    //                 $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
    //             } else {
    //                 $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;

    //             }
    //             $point->save();

    //             if ($deal->authorization_status == 1) {
    //                 $team_lead = User::where('role_id', 8)->first();
    //                 $user_name= User::where('id',$team_lead->id)->first(); 

    //                 $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
    //                 $point= new CashPoint();
    //                 $point->user_id= $team_lead->id;
    //                 $point->project_id= $project->id;
    //                 $point->activity= $user_name->name . ' authorizes the deal';
    //                 $point->gained_as = "Individual";
    //                 $point->points= ($project_budget*$kpi->authorized_by_leader)/100;

    //                 if ($cash_points_contact != null) {
    //                     $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
    //                 } else {
    //                     $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;

    //                 }
    //                 $point->save();
                    
    //             }
    //         }
    //     }

    // }
//    / dd("sjknaslkdnasl");

    $deal_projects=  Project::whereDate('start_date','>=',$date)->where('project_status','Accepted')->get();
    foreach ($deal_projects as $deal_project) {
        $goals = GoalSetting::where([
            'goal_status' =>  0, 
        ])->get();
        //dd($goals);
            $deal_id= Deal::where('id',$deal_project->deal_id)->first();
        foreach($goals as $goal) {
            $start = Carbon::parse($goal->startDate);
            $end = Carbon::parse($goal->endDate);
            $dateToCheck = Carbon::parse($deal_id->created_at);
            //dd($dateToCheck );
    
            if ($dateToCheck->between($start, $end)) {
                if ($goal->entryType == 'Added') {
                    $user_id[] = $goal->user_id;
                } elseif ($goal->entryType == 'Won') {
                    $team = Seopage1Team::find($goal->team_id);
                    $user_id = explode(',', rtrim($team->members, ','));
                }
    
                $array = [];
                if ($goal->dealType == 'All Clients') {
                    $deals_data = Deal::select([
                        'deals.*',
                        'pm.id as pm_id',
                        'pm.name as pm_name',
    
                        'leads.added_by as bidder',
                    ])
                    ->leftJoin('leads', 'leads.id', 'deals.lead_id')
                    ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                    ->whereDate('deals.created_at', '>=', $goal->startDate);
    
                    if (!is_null($goal->endDate)) {
                        $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                    }
                    $deals_data = $deals_data->where('deals.status', '!=','Denied')
                    ->whereIn('deals.added_by', $user_id)
                    ->orderBy('deals.id', 'desc')
                    ->get();
                   // dd($deals_data);
    
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
                        $team_total_amount = 0;
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
                  // dd($array);
                    if ($team_total_amount >= (int) $goal->trackingValue) {
                        $goal_id= GoalSetting::find($goal->id);
                        //dd($goal_id);
                        $goal_id->goal_status = 1;
                        $goal_id->save();
    
                        if ($goal->achievablePoints > 0) {
    
                            $distribute_amount = $goal->achievablePoints / count($user_id);
                            
                            foreach ($user_id as $value) {
    
                                $user_name = User::find($value);
                                $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    
                                $point= new CashPoint();
                                $point->user_id= $value;
                                $point->project_id= $find_project_id->id;
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
                        'pm.id as pm_id',
                        'pm.name as pm_name',
    
                        'leads.added_by as bidder',
                    ])
                    ->join('leads', 'leads.id', 'deals.lead_id')
                    ->join('users as pm', 'pm.id', '=', 'deals.pm_id')
                    ->whereDate('deals.created_at', '>=', $goal->startDate);
    
                    if (!is_null($goal->endDate)) {
                        $deals_data = $deals_data->whereDate('deals.created_at', '<=', $goal->endDate);
                    }
                    $deals_data = $deals_data->where('deals.status', '!=','Denied')
                    ->whereIn('deals.added_by', $user_id)
                    ->groupBy('deals.client_id')
                    ->orderBy('deals.id', 'desc')
                    ->get();
    
                    foreach ($deals_data as $key => $value) {
                        if ($goal->trackingType == 'count') {
                            $value->amount = 1;
                            $value->tracking_type = 'count';
                        }
    
                        $value->deal_stage = DealStageChange::where('deal_id', $value->deal_id)->groupBy('deal_stage_id')->get();
                        $value->bidder_amount = round((24 * $value->amount) / 100, 2);
                        $value->team_total_amount = 0;
                        $team_total_amount = 0;
    
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
                        
    
                        if ($team_total_amount >= (int) $goal->trackingValue) {
                            $goal_id= GoalSetting::find($goal->id);
                        $goal_id->goal_status = 1;
                        $goal_id->save();
    
                            if ($goal->achievablePoints > 0) {
    
                                $distribute_amount = $goal->achievablePoints / count($user_id);
                                
                                foreach ($user_id as $value) {
    
                                    $user_name = User::find($value);
                                    $user_last_point = CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
    
                                    $point= new CashPoint();
                                    $point->user_id= $value;
                                    $point->project_id= $find_project_id->id;
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
        }
    }

    

   


   

                    

        // $this->info('Points distributed successfully.');
    
}
    }

