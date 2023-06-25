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
        $check_kpi = kpiSetting::where([
            'kpi_status' => '2',
            'cron_status' => '0',
            'start_month' => Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d')
        ])->first();

        $left_days = (int) Carbon::now()->endOfMonth()->format('d') - (int) Carbon::now()->format('d');

        if ($left_days == 3 && is_null($check_kpi)) {
            $existing_kpi = kpiSetting::where([
                'kpi_status' => '1',
                'cron_status' => '1',
                'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
            ])->first();
            
            unset($existing_kpi->id, $existing_kpi->created_at, $existing_kpi->updated_at);
            
            $existing_kpi->kpi_status = '2';
            $existing_kpi->cron_status = '1';
            $existing_kpi->start_month = Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d');
            
            kpiSetting::insert($existing_kpi->toArray());
        } else if (Carbon::today() == Carbon::now()->endOfMonth()) {
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

        //     if ($this_month_kpi) {
        //         $shifts = [
        //             'morning_shift' => [208, 217],
        //             'evening_shift' => [219, 220],
        //             'night_shift' => [221, 222],
        //         ];

        //         foreach ($shifts as $key => $shift) {
        //             //foreach ($shift as $value) {
        //                 /*$this_users_shift = Seopage1Team::where([
        //                     ['id', '!=', 1],
        //                     ['members' , 'LIKE', '%'.$value.'%']
        //                 ])->get();

        //                 $team_members = [];
        //                 foreach($this_users_shift as $user_shift) {
        //                     $team_array = explode(',', rtrim($user_shift->members, ','));
        //                     foreach ($team_array as $array_user) {
        //                         array_push($team_members, $array_user);
        //                     }
        //                 }
        //                 $team_members = array_unique($team_members);*/

        //                 $total_cash_point = CashPoint::whereIn('user_id', $shift)
        //                 ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
        //                 ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
        //                 ->get();
        //                 $total_cash_point_sum = $total_cash_point->sum('points');

        //                 if ($total_cash_point_sum > $this_month_incentive->every_shift_every_point_above) {
        //                     $user_incentive_amount = $total_cash_point_sum - $this_month_incentive->every_shift_every_point_above;
        //                     foreach ($shift as $value) {
        //                         $deals = CashPoint::where('user_id', $value)
        //                         ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
        //                         ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
        //                         ->get()
        //                         ->sum('points');

        //                         $deduction_amount = 0;
        //                         $user_team_goal_monthly = GoalSetting::where([
        //                             'assigneeType' => 'Team',
        //                             'goal_status' => 0,
        //                             'frequency' => 'Monthly',
        //                             'team_id' => 1,
        //                         ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
        //                         ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
        //                         ->first();

        //                         if ($user_team_goal_monthly) {
        //                             $point_deduction = 100 - $this_month_incentive->individual_goal_percentage;
                                    
        //                             $user_incentive_amount_deduction = ($user_incentive_amount * $point_deduction) / 100;
        //                             $deduction_amount = $deduction_amount + $user_incentive_amount_deduction;
        //                             $user_incentive_amount = $user_incentive_amount - $user_incentive_amount_deduction;
        //                         }


        //                         $user_goal_from_team = Seopage1Team::where([
        //                             ['id' , '!=' , 1],
        //                             ['members' , 'LIKE', '%'.$value.'%']
        //                         ])->get()->pluck('id');

        //                         $user_team_goal_10_days = GoalSetting::where([
        //                             'assigneeType' => 'User',
        //                             'goal_status' => 0,
        //                             'frequency' => '10 Days',
        //                         ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
        //                         ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
        //                         ->whereIn('id', $user_goal_from_team)
        //                         ->first();

        //                         // if ($user_team_goal_10_days) {
        //                         //     $user_incentive_amount_deduction = ($user_incentive_amount * $this_month_incentive->incentive_deduction) / 100;
        //                         //     $deduction_amount = $deduction_amount + $user_incentive_amount_deduction;
        //                         //     $user_incentive_amount = $user_incentive_amount - $user_incentive_amount_deduction;
        //                         // }

        //                         $this_user_cashpoint = CashPoint::where('user_id', $value)
        //                         ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
        //                         ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
        //                         ->get();

        //                         $this_user_contribution = (100 / $total_cash_point->sum('points')) * $this_user_cashpoint->sum('points');

        //                         $this_user_goal = GoalSetting::where([
        //                             'goal_status' => 1,
        //                             'user_id' => $value,
        //                         ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
        //                         ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
        //                         ->count();

        //                         $this_users_team = Seopage1Team::where([
        //                             ['members' , 'LIKE', '%'.$value.'%']
        //                         ])->get()->pluck('id');

        //                         $this_user_team_goal = GoalSetting::where([
        //                             'goal_status' => 1,
        //                         ])->whereIn('team_id', $this_users_team)
        //                         ->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
        //                         ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
        //                         ->count();

        //                         $user_incentive = new UserIncentive();
        //                         $user_incentive->user_id = $value;
        //                         $user_incentive->point_earned = $deals;
        //                         $user_incentive->incentive_earned = ((($this_user_contribution * $user_incentive_amount) / 100)) * $this_month_incentive->point_of_contribute;
        //                         $user_incentive->redeem_point = $deals;
        //                         $user_incentive->achieve_goal = $this_user_goal + $this_user_team_goal;
        //                         $user_incentive->month = $this_month_kpi->start_month;
        //                         $user_incentive->deduction_amount = $deduction_amount;
        //                         $user_incentive->deduction_incentive_amount = $deduction_amount * $this_month_incentive->point_of_contribute;
        //                         //dd($user_incentive);
        //                         $user_incentive->save();

                               
        //                     }
        //                 }
        //             //}
        //         }
       
        // }
               
                
        //       //  dd($total_cash_point_sum);
        //         $this_month_kpi->kpi_status = '0';
        //         $this_month_kpi->save();
        //     }
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
