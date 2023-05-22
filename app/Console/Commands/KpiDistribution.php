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
    

    

    

   


   

                    

        // $this->info('Points distributed successfully.');
    
}
    }

