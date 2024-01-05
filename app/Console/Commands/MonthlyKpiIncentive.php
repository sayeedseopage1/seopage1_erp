<?php

namespace App\Console\Commands;

use DateTime;
use DB;
use Illuminate\Console\Command;
use App\Models\kpiSetting;
use App\Models\User;
use App\Models\CashPoint;
use App\Models\UserIncentive;
use App\Models\IncentiveSetting;
use App\Models\GoalSetting;
use App\Models\Seopage1Team;
use \Carbon\Carbon;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;

class MonthlyKpiIncentive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:monthly_kpi_incentive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'it will update monthly basis kpi and incentive from settings';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {   
    //     $last_day_of_month= Carbon::now()->endOfMonth();
    //     $date = new DateTime($last_day_of_month);
    //     $date->setTime(23, 59);  // Set the time to 23:59

    // $lastMinute = $date->format('Y-m-d h:m:s');
    //     $current_time= Carbon::now()->format('Y-d-m h:m:s');
    //     dd($current_time, $lastMinute);
    //DB::beginTransaction();
    
    // /dd($shift_users);
   // DB::beginTransaction();
        // $check_kpi = kpiSetting::where([
        //     'kpi_status' => '2',
        //     'cron_status' => '0',
        //     'start_month' => Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d')
        // ])->first();
    //    / dd($check_kpi);
        $left_days = (int) Carbon::now()->endOfMonth()->format('d') - (int) Carbon::now()->format('d');
        //dd($left_days);
        if($left_days == 3)
        {
            $kpiSetting= kpiSetting::orderBy('id','desc')->first();
            $incentivesetting= IncentiveSetting::orderBy('id','desc')->first();
           // dd($incentivesetting);
          //  DB::beginTransaction();
            $update_kpi = new kpiSetting();
            $update_kpi->the_bidder = $kpiSetting->the_bidder;
            $update_kpi->qualify = $kpiSetting->qualify;
            $update_kpi->requirements_defined = $kpiSetting->requirements_defined;
            $update_kpi->less_than = $kpiSetting->less_than;
            $update_kpi->less_than_get = $kpiSetting->less_than_get;
            $update_kpi->more_than = $kpiSetting->more_than;
            $update_kpi->more_than_get = $kpiSetting->more_than_get;
            $update_kpi->proposal_made = $kpiSetting->proposal_made;
            $update_kpi->negotiation_started = $kpiSetting->negotiation_started;
            $update_kpi->milestone_breakdown = $kpiSetting->milestone_breakdown;
            $update_kpi->closed_deal = $kpiSetting->closed_deal;
            $update_kpi->contact_form = $kpiSetting->contact_form;
            $update_kpi->authorized_by_leader = $kpiSetting->authorized_by_leader;
            $update_kpi->additional_sales_amount = $kpiSetting->additional_sales_amount;
            $update_kpi->client_type = $kpiSetting->client_type;
            $update_kpi->after = $kpiSetting->after;
            $update_kpi->after_reach_amount = $kpiSetting->after_reach_amount;
            $update_kpi->generate_project = $kpiSetting->generate_project;
            $update_kpi->generate_single_deal = $kpiSetting->generate_single_deal;
            $update_kpi->generate_sales_above = $kpiSetting->generate_sales_above;
            $update_kpi->generate_sales_above_point = $kpiSetting->generate_sales_above_point;
            $update_kpi->bonus_point = $kpiSetting->bonus_point;
            $update_kpi->logged_hours_above = $kpiSetting->logged_hours_above;
            $update_kpi->logged_hours_above_sales_amount = $kpiSetting->logged_hours_above_sales_amount;
            $update_kpi->achieve_more_than = $kpiSetting->achieve_more_than;
            $update_kpi->achieve_less_than = $kpiSetting->achieve_less_than;
            $update_kpi->accepted_by_pm = $kpiSetting->accepted_by_pm;
            $update_kpi->kpi_status = "2";
            $update_kpi->cron_status = "0";
            $update_kpi->bonus_status = $kpiSetting->bonus_status;
            $update_kpi->start_month = Carbon::now()->addMonth(1)->startOfMonth()->format('Y-m-d');
            $update_kpi->created_at = Carbon::now();
            $update_kpi->updated_at = Carbon::now();
            $update_kpi->save();
            $update_incentive= new IncentiveSetting();
            $update_incentive->every_shift_every_point_above = $incentivesetting->every_shift_every_point_above;
            $update_incentive->individual_goal_percentage = $incentivesetting->individual_goal_percentage;
            $update_incentive->point_of_value = $incentivesetting->point_of_value;
            $update_incentive->point_of_contribute = $incentivesetting->point_of_contribute;
            $update_incentive->incentive_deduction = $incentivesetting->incentive_deduction;
            $update_incentive->incentive_status = "2";
            $update_incentive->cron_status = "0";
            $update_incentive->start_month = Carbon::now()->addMonth(1)->startOfMonth()->format('Y-m-d');
            $update_incentive->created_at = Carbon::now();
            $update_incentive->updated_at = Carbon::now();
            $update_incentive->save();
            $kpisetiing_g_sales= kpiSettingGenerateSale::where('kpi_id',$kpiSetting->id)->get();
           // dd($kpisetiing_g_sales[0]);
 
                $update_kpisetting_g_sale = new kpiSettingGenerateSale();
                $update_kpisetting_g_sale->kpi_id = $update_kpi->id;
                $update_kpisetting_g_sale->generate_sales_from = $kpisetiing_g_sales[0]->generate_sales_from;
                $update_kpisetting_g_sale->generate_sales_to= $kpisetiing_g_sales[0]->generate_sales_to;
                $update_kpisetting_g_sale->generate_sales_amount = $kpisetiing_g_sales[0]->generate_sales_amount;
                $update_kpisetting_g_sale->bonus_status = 0;
                $update_kpisetting_g_sale->created_at = Carbon::now();
                $update_kpisetting_g_sale->updated_at = Carbon::now();
                $update_kpisetting_g_sale->save();
                $update_kpisetting_g_sale = new kpiSettingGenerateSale();
                $update_kpisetting_g_sale->kpi_id = $update_kpi->id;
                $update_kpisetting_g_sale->generate_sales_from = $kpisetiing_g_sales[1]->generate_sales_from;
                $update_kpisetting_g_sale->generate_sales_to= $kpisetiing_g_sales[1]->generate_sales_to;
                $update_kpisetting_g_sale->generate_sales_amount = $kpisetiing_g_sales[1]->generate_sales_amount;
                $update_kpisetting_g_sale->bonus_status = 0;
                $update_kpisetting_g_sale->created_at = Carbon::now();
                $update_kpisetting_g_sale->updated_at = Carbon::now();
                $update_kpisetting_g_sale->save();
                $update_kpisetting_g_sale = new kpiSettingGenerateSale();
                $update_kpisetting_g_sale->kpi_id = $update_kpi->id;
                $update_kpisetting_g_sale->generate_sales_from = $kpisetiing_g_sales[2]->generate_sales_from;
                $update_kpisetting_g_sale->generate_sales_to= $kpisetiing_g_sales[2]->generate_sales_to;
                $update_kpisetting_g_sale->generate_sales_amount = $kpisetiing_g_sales[2]->generate_sales_amount;
                $update_kpisetting_g_sale->bonus_status = 0;
                $update_kpisetting_g_sale->created_at = Carbon::now();
                $update_kpisetting_g_sale->updated_at = Carbon::now();
                $update_kpisetting_g_sale->save();
                $kpisetiing_log_hours= kpiSettingLoggedHour::where('kpi_id',$kpiSetting->id)->get();
                $update_kpisetting_log_h= new kpiSettingLoggedHour();
                $update_kpisetting_log_h->kpi_id = $update_kpi->id;
                $update_kpisetting_log_h->logged_hours_between = $kpisetiing_log_hours[0]->logged_hours_between;
                $update_kpisetting_log_h->logged_hours_between_to= $kpisetiing_log_hours[0]->logged_hours_between_to;
                $update_kpisetting_log_h->logged_hours_sales_amount = $kpisetiing_log_hours[0]->logged_hours_sales_amount;
               
                $update_kpisetting_log_h->created_at = Carbon::now();
                $update_kpisetting_log_h->updated_at = Carbon::now();
                $update_kpisetting_log_h->save();
                $update_kpisetting_log_h= new kpiSettingLoggedHour();
                $update_kpisetting_log_h->kpi_id = $update_kpi->id;
                $update_kpisetting_log_h->logged_hours_between = $kpisetiing_log_hours[1]->logged_hours_between;
                $update_kpisetting_log_h->logged_hours_between_to= $kpisetiing_log_hours[1]->logged_hours_between_to;
                $update_kpisetting_log_h->logged_hours_sales_amount = $kpisetiing_log_hours[1]->logged_hours_sales_amount;
               
                $update_kpisetting_log_h->created_at = Carbon::now();
                $update_kpisetting_log_h->updated_at = Carbon::now();
                $update_kpisetting_log_h->save();
               
        }
        if (Carbon::today() == Carbon::now()->startOfMonth()) {
            $update_kpi_s= kpiSetting::where('kpi_status',"2")->first();
            // dd($update_kpi_s);
            $update_kpi_s->kpi_status = "1";
            $update_kpi_s->cron_status = "1";
            $update_kpi_s->updated_at= Carbon::now();
            $update_kpi_s->save();
            $update_incentive_s= IncentiveSetting::where('incentive_status',"2")->first();
            $update_incentive_s->incentive_status = "1";
            $update_incentive_s->cron_status = "1";
            $update_incentive_s->updated_at= Carbon::now();
            $update_incentive_s->save();
            $kpiSetting->kpi_status = "0";
            $kpiSetting->cron_status = "1";
            $kpiSetting->save();
            $incentivesetting->incentive_status = "0";
            $incentivesetting->cron_status = "1";
            $incentivesetting->save();

         //   dd($update_kpi_s, $update_incentive_s);

        
        }
        //dd("bsjdbaskbd");
       
        // if ($left_days <= 8 && is_null($check_kpi)) {
        //     $existing_kpi = kpiSetting::where([
        //         'kpi_status' => '1',
        //         'cron_status' => '1',
        //         'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
        //     ])->first();
            
        //     unset($existing_kpi->id, $existing_kpi->created_at, $existing_kpi->updated_at);
            
        //     $existing_kpi->kpi_status = '2';
        //     $existing_kpi->cron_status = '1';
        //     $existing_kpi->start_month = Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d');
            
        //     kpiSetting::insert($existing_kpi->toArray());
        // } 
      if (Carbon::today() == Carbon::now()->startOfMonth()) {
            $this_month_kpi = kpiSetting::where([
                'kpi_status' => '1',
                'cron_status' => '1',
                'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
            ])->first();

            $this_month_incentive = IncentiveSetting::where([
                'incentive_status' => '1',
                'cron_status' => '1',
                'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
            ])->first();

       
            $shift_users= User::where('shift','!=',null)->get();
          //  dd($shift_users);
          $shift_users= User::where('shift','!=',null)->get();
    $current_month = Carbon::now()->startofMonth()->format('Y-m-d');
    $kpi_setting= kpiSetting::where('kpi_status',1)->first();
    $incentive_setting= IncentiveSetting::where('incentive_status',1)->first();
    foreach ($shift_users as $shift) {
        $shift_members= User::where('shift',$shift->shift)->get();
        $shift_points = 0;
        $data= [];
        foreach ($shift_members as $value) {
              $shift_points= CashPoint::where('user_id',$value->id)->sum('points') + $shift_points;
           //  $shift_points= 710.54;
           
        }
      
      $individual_points= CashPoint::where('user_id',$shift->id)->sum('points');
    //    $individual_points= 238.28;
      
        $contribution= ($individual_points*100 )/$shift_points;
      //  $contribution= 76.73;
        if($shift_points > $incentive_setting->every_shift_every_point_above)
        {
            $shift_incentive_achievable_point = $shift_points - $incentive_setting->every_shift_every_point_above ;

        }else 
        {
            $shift_incentive_achievable_point =0; 
        }
       
        $user_achieved_point = $shift_incentive_achievable_point * $contribution /100;
        $amount_before_deduction = $user_achieved_point* $incentive_setting->point_of_value;
        
            $ten_days_goals = DB::table('goal_settings')
            ->whereRaw('DATEDIFF(endDate, startDate) < 12')
            ->whereRaw('MONTH(created_at) = MONTH(?) AND YEAR(created_at) = YEAR(?)', [$current_month, $current_month])
            ->where('team_id',$shift->shift)
            ->where('goal_status',0)
            ->count();
            if ($ten_days_goals > 0) {
                $contribution_after_deduction = $contribution*$incentive_setting->incentive_deduction/100;
                // / dd($contribution_after_deduction);
               // $shift_incentive_achievable_point_with_deduction = $shift_incentive_achievable_point - ($shift_incentive_achievable_point*$incentive_setting->incentive_deduction/100);
                $user_final_achievable_point_without_minimum_goal = $user_achieved_point - ($user_achieved_point*$contribution_after_deduction/100);
            }else 
            {
                $user_final_achievable_point_without_minimum_goal = $user_achieved_point;

            }
            //dd($shift_incentive_achievable_point);
           
            // $team_goal= DB::table('goal_settings')
            
            // ->whereRaw('MONTH(created_at) = MONTH(?) AND YEAR(created_at) = YEAR(?)', [$current_month, $current_month])
            // ->where('team_id',1)
            // ->where('goal_status',0)
            // ->count();
            $team_goal = 0;
            if ($team_goal > 0) {
                $user_final_achievable_point_without_minimum_goal = $user_final_achievable_point_without_minimum_goal* ($incentive_setting->individual_goal_percentage/100) ;
            }
            $user_deducted_points= $user_achieved_point - $user_final_achievable_point_without_minimum_goal;
            $amount_after_deduction = $user_final_achievable_point_without_minimum_goal * $incentive_setting->point_of_value;
            $deducted_incentive_amount= $amount_before_deduction - $amount_after_deduction;
            $incentive_amount_after_20p_held= $amount_after_deduction - ($amount_after_deduction*20/100);
            $incentive_held_amount= $amount_after_deduction - $incentive_amount_after_20p_held;
            $minimum_shift_goal= GoalSetting::where('team_id',$shift->shift)->where('goalType','Minimum')->count();
            $minimum_shift_achieve_goal= GoalSetting::where('team_id',$shift->shift)->where('goalType','Minimum')->where('goal_status',1)->count();
            $milestone_shift_goal= GoalSetting::where('team_id',$shift->shift)->where('goalType','Milestone')->count();
            $milestone_shift_achieve_goal= GoalSetting::where('team_id',$shift->shift)->where('goalType','Milestone')->where('goal_status',1)->count();
            $total_team_goal= GoalSetting::where('team_id',1)->where('goalType','Minimum')->count();
            $total_team_goal_achieve= GoalSetting::where('team_id',1)->where('goalType','Minimum')->where('goal_status',1)->count();
            $total_goals= $total_team_goal+ $minimum_shift_goal+ $milestone_shift_goal;
            $total_goals_achieve= $minimum_shift_achieve_goal+ $milestone_shift_achieve_goal + $total_team_goal_achieve;
            //dd($data);
            // $data['month'] = $current_month;
            // $data['name'] = $shift->name;
            // $data['non_incentive_points'] = $incentive_setting->every_shift_every_point_above;
            // $data['shift_achieved_points']= $shift_points;
            // $data['shift_incentive_achievable_point'] = $shift_incentive_achievable_point;
            // $data['contribution']= $contribution;
            // $data['user_achieved_points']= $user_achieved_point;
            // $data['amount_before_deduction']= $amount_before_deduction;
            // $data['user_deducted_points']= $user_deducted_points;
            // $data['user_point_after_deduction']= $user_final_achievable_point_without_minimum_goal;
            // $data['amount_after_deduction']= $amount_after_deduction;
            // $data['deducted_incentive_amount']= $deducted_incentive_amount;
            // $data['incentive_amount_after_20_percent_held']= $incentive_amount_after_20p_held;
            // $data['incentive_held_amount']= $incentive_held_amount;
            // $data['final_payable_incentive_amount']= $incentive_amount_after_20p_held;
            $minimum_shift_goals= GoalSetting::where('team_id',$shift->shift)->where('goalType','Minimum')->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $minimum_shift_goals_achieved= GoalSetting::where('team_id',$shift->shift)->where('goalType','Minimum')->where('goal_status',1)->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $milestone_goals= GoalSetting::where('team_id',$shift->shift)->where('goalType','Milestone')->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $milestone_goals_achieved= GoalSetting::where('team_id',$shift->shift)->where('goalType','Milestone')->where('goal_status',1)->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $total_team_goal= GoalSetting::where('team_id',1)->where('goalType','Minimum')->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $total_team_goal_achieved= GoalSetting::where('team_id',1)->where('goalType','Minimum')->where('goal_status',1)->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
            ->count();
            $incentive = new UserIncentive();
            $incentive->month = $current_month;
            $incentive->user_id= $shift->id;
            $incentive->non_incentive_points = $incentive_setting->every_shift_every_point_above;;
            $incentive->shift_achieved_points= $shift_points;
            $incentive->shift_incentive_achievable_point= $shift_incentive_achievable_point;
            $incentive->contribution =$contribution;
            $incentive->user_achieved_points =$user_achieved_point;
            $incentive->amount_before_deduction =$amount_before_deduction;
            $incentive->user_deducted_points = $user_deducted_points;
            $incentive->user_point_after_deduction =$user_final_achievable_point_without_minimum_goal;
            $incentive->amount_after_deduction =$amount_after_deduction;
            $incentive->deducted_incentive_amount= $deducted_incentive_amount;
            $incentive->incentive_amount_after_20_percent_held= $incentive_amount_after_20p_held;
            $incentive->incentive_held_amount= $incentive_held_amount;
            $incentive->final_payable_incentive_amount= $incentive_amount_after_20p_held;
            $incentive->minimum_shift_goals= $minimum_shift_goals;
            $incentive->minimum_shift_goals_achieved= $minimum_shift_goals_achieved;
            $incentive->milestone_goals= $milestone_goals;
            $incentive->milestone_goals_achieved= $milestone_goals_achieved;
            $incentive->team_goal= $total_team_goal;
            $incentive->total_team_goal_achieved= $total_team_goal_achieved;
            $incentive->total_goals= $minimum_shift_goals+$milestone_goals+$total_team_goal;
            $incentive->total_goals_achieved= $minimum_shift_goals_achieved+ $milestone_goals_achieved+ $total_team_goal_achieved;
            $incentive->save();

    }
    $team= Seopage1Team::where('id',1)->first();
    $users = explode(',', $team->members);
    $user_data = [];
                foreach ($users as $key => $value) {
                    if ($value != '') {
                         //$user = User::find($value);
                        array_push($user_data,$value);
                    }
                }
    foreach($user_data as $user)
    {
        // /dd($user);
        $user_cash_points= CashPoint::where('user_id',$user)->sum('points');
        $point = new CashPoint();
        $point->user_id= $user;
        $user_name = User::where('id',$user)->first();
    //    / dd($value);
        $point->activity= $user_name->name. ' deduct '.$user_cash_points.' points';
        $point->gained_as = "Individual";
        $point->points= -$user_cash_points;
        $point->total_points_earn = 0;
        $point->total_points_redeem = $user_cash_points;
        $point->total_points_void = 0;
        $point->save();
    }

            $kpi = kpiSetting::where([
                'kpi_status' => '2',
                'cron_status' => '0',
                'start_month' => Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d')
            ])->get();

            if ($kpi) {
                foreach ($kpi as $value) {
                    $value->cron_status = '1';
                    $value->kpi_status = '1';
                    $value->save();
                }
            }

            if ($this_month_incentive) {
                $this_month_incentive->incentive_status = '0';
                $this_month_incentive->save();
            }
            
            $incentive = IncentiveSetting::where([
                'incentive_status' => '2',
                'cron_status' => '0',
                'start_month' => Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d')
            ])->get();

            if ($incentive) {
                foreach ($incentive as $value) {
                    $value->cron_status = '1';
                    $value->incentive_status = '1';
                    $value->save();
                }
            }

            $this->info('new kpi incentive changed');
        } else {
            $this->info('nothing for update');
        }
    }   
}
