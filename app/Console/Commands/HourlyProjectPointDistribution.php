<?php

namespace App\Console\Commands;

use App\Models\Currency;
use App\Models\Payment;
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
use App\Models\GoalSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use App\Models\Lead;
use App\Models\ProjectTimeLog;
use App\Models\Seopage1Team;

class HourlyProjectPointDistribution extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hourly_project_point_distribution:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hourly Project Point Distribution';

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
        // DB::beginTransaction();
         $date = '2023-07-01';
         //dd($currentMonth);
         $deals = Deal::select('deals.*','projects.id as project_id')
         ->join('projects','projects.deal_id','deals.id')
         ->where('deals.status','Accepted')
         ->where('projects.status','in progress')
         ->where('deals.project_type','hourly')
         ->get();
        // dd($deals);
        foreach ($deals as $deal) {

            $payments= Payment::where('project_id',$deal->project_id)->whereDate('paid_on','>=',$date)->get();
            foreach ($payments as $payment) {
                # code...
           
            $hourly_project_id= Project::where('id',$payment->project_id)->first();
            $hourly_deal_id = Deal::where('id',$hourly_project_id->deal_id)->first();
    
                $kpi_setting_hourly_project= kpiSetting::where('kpi_status','1')->first();
               // dd($kpi_setting_hourly_project);
                $kpi_setting_hourly_project_logged_hours= kpiSettingLoggedHour::where('kpi_id',$kpi_setting_hourly_project->id)->get();
                $kpi_setting_hourly_project_logged_hours_min= kpiSettingLoggedHour::where('kpi_id',$kpi_setting_hourly_project->id)->min('logged_hours_between');
               // dd($kpi_setting_hourly_project_logged_hours_min);
                $currency = Currency::where('id', $hourly_deal_id->original_currency_id)->first();
            //dd($currency);
            $hourly_rate = ($hourly_deal_id->hourly_rate) / $currency->exchange_rate;
        //  dd($hourly_rate, $kpi_setting_hourly_project_logged_hours_min);
            if($hourly_rate < $kpi_setting_hourly_project_logged_hours_min) 
            {
                $project_budget= ($payment->amount * $kpi_setting_hourly_project->accepted_by_pm)/100;
                

                if($hourly_deal_id->lead_id != null)
                {
                    $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                    $user_name= User::where('id',$lead->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $lead->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }else 
                {
                    $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                    $user_name= User::where('id',$deal_stage->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $user_name->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }
                $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
    
    
                $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_qualified->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                if ($cash_points_qualified != null) {
    
                    $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
    
                $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_short_code->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                if ($cash_points_requirements_defined != null) {
    
                    $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_proposal->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                if ($cash_points_proposal_made != null) {
    
                    $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_negotiation_started->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                if ($cash_points_negotiation_started != null) {
    
                    $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                if($deal_milestone_breakdown != null)
                {
                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
    
                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    if ($cash_points_milestone_breakdown != null) {
    
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
    
    
                }
    
                $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                //dd($deal_id);
                $user_name= User::where('id',$deal_id->added_by)->first();
    
                $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                if ($cash_points_close_deal != null) {
    
                    $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                $user_name= User::where('id',$deal_id_contact->added_by)->first();
    
                $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id_contact->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                if ($cash_points_contact != null) {
    
                    $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                if($hourly_deal_id->authorization_status == 1)
                {

                $team_lead= user::where('role_id',8)->first();
                $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');

              //  dd($cash_points_team_lead);
                $point= new CashPoint();
                $point->user_id= $team_lead->id;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                    '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                    .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                    $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->authorized_by_leader.'% of hourly payment))';
        
                $point->gained_as = "Individual";
                $point->points= $earned_point;
                $point->type = 'Authorization Bonus';
        
                if ($cash_points_team_lead != null) {
                    $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                } else {
                    $point->total_points_earn= $earned_point/100;
                }
        
                $point->created_at= $payment->paid_on;
                $point->save();
                }
              

            }elseif($hourly_rate > $kpi_setting_hourly_project->logged_hours_above)
            {
                $project_budget= ($payment->amount * $kpi_setting_hourly_project->logged_hours_above_sales_amount)/ 100;
                if($hourly_deal_id->lead_id != null)
                {
                    $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                    $user_name= User::where('id',$lead->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $lead->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }else 
                {
                    $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                    $user_name= User::where('id',$deal_stage->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $user_name->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }
                $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
    
    
                $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_qualified->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                if ($cash_points_qualified != null) {
    
                    $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
    
                $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_short_code->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                if ($cash_points_requirements_defined != null) {
    
                    $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_proposal->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                if ($cash_points_proposal_made != null) {
    
                    $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_negotiation_started->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                if ($cash_points_negotiation_started != null) {
    
                    $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                if($deal_milestone_breakdown != null)
                {
                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
    
                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    if ($cash_points_milestone_breakdown != null) {
    
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
    
    
                }
    
                $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                //dd($deal_id);
                $user_name= User::where('id',$deal_id->added_by)->first();
    
                $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                if ($cash_points_close_deal != null) {
    
                    $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                $user_name= User::where('id',$deal_id_contact->added_by)->first();
    
                $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id_contact->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                if ($cash_points_contact != null) {
    
                    $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                if($hourly_deal_id->authorization_status == 1)
                {

                $team_lead= user::where('role_id',8)->first();
                $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');

              //  dd($cash_points_team_lead);
                $point= new CashPoint();
                $point->user_id= $team_lead->id;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                    '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                    .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                    $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
        
                $point->gained_as = "Individual";
                $point->points= $earned_point;
                $point->type = 'Authorization Bonus';
        
                if ($cash_points_team_lead != null) {
                    $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                } else {
                    $point->total_points_earn= $earned_point/100;
                }
        
                $point->created_at= $payment->paid_on;
                $point->save();
                }
              

            }
            else
            {
                foreach ($kpi_setting_hourly_project_logged_hours as $logged_hours) {
                    if ($logged_hours->logged_hours_between <= $hourly_rate && $logged_hours->logged_hours_between_to >= $hourly_rate) {
                        
                        $project_budget= ($payment->amount * $logged_hours->logged_hours_sales_amount) / 100;
                        if($hourly_deal_id->lead_id != null)
                {
                    $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                    $user_name= User::where('id',$lead->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $lead->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }else 
                {
                    $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                    $user_name= User::where('id',$deal_stage->added_by)->first();
                    $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $user_name->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    if ($cash_points != null) {
    
                        $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
                }
                $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
    
    
                $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_qualified->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                if ($cash_points_qualified != null) {
    
                    $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
    
                $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_short_code->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Moren than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                if ($cash_points_requirements_defined != null) {
    
                    $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_proposal->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                if ($cash_points_proposal_made != null) {
    
                    $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
                $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_negotiation_started->updated_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                if ($cash_points_negotiation_started != null) {
    
                    $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }else
                {
                    $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
    
    
    
    
                $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                if($deal_milestone_breakdown != null)
                {
                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
    
                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_milestone_breakdown->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    if ($cash_points_milestone_breakdown != null) {
    
                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
    
                    }
                    $point->created_at= $payment->paid_on;
                    $point->save();
    
    
                }
    
                $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                //dd($deal_id);
                $user_name= User::where('id',$deal_id->added_by)->first();
    
                $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                if ($cash_points_close_deal != null) {
    
                    $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                $user_name= User::where('id',$deal_id_contact->added_by)->first();
    
                $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                $point= new CashPoint();
                $point->user_id= $deal_id_contact->added_by;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                $point->gained_as = "Individual";
                $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                if ($cash_points_contact != null) {
    
                    $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }else
                {
                    $point->total_points_earn=
                        ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
    
                }
                $point->created_at= $payment->paid_on;
                $point->save();
                if($hourly_deal_id->authorization_status == 1)
                {

                $team_lead= user::where('role_id',8)->first();
                $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');

              //  dd($cash_points_team_lead);
                $point= new CashPoint();
                $point->user_id= $team_lead->id;
                $point->project_id= $hourly_project_id->id;
                $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                    '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                    .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                    $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
        
                $point->gained_as = "Individual";
                $point->points= $earned_point;
                $point->type = 'Authorization Bonus';
        
                if ($cash_points_team_lead != null) {
                    $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                } else {
                    $point->total_points_earn= $earned_point/100;
                }
        
                $point->created_at= $payment->paid_on;
                $point->save();
                }
              

                        
                }
                }
            }


            $project_id_find = Project::where('id',$payment->project_id)->first();
            $deal_id_find = Deal::where('id',$project_id_find)->first();
            if($deal_id_find != null && $deal_id_find->project_type == 'hourly')
            {
                $deal_update = Deal::find($deal_id_find);
                $deal_update->payment_date = $payment->paid_on;
                $deal_update->save();
            }   
        
        }
            
        }
        
     
     
     
 }
}
