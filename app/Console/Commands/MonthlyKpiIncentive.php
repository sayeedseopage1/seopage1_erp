<?php

namespace App\Console\Commands;

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
        } else if (Carbon::today() == Carbon::now()->endOfMonth() || 1==1) {
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

            if ($this_month_kpi) {
                $users = User::whereIn('role_id', [7, 8])->get();
                foreach ($users as $value) {
                    $this_users_shift = Seopage1Team::where([
                        ['id', '!=', 1],
                        ['members' , 'LIKE', '%'.$value->id.'%']
                    ])->get();

                    $team_members = [];
                    foreach($this_users_shift as $user_shift) {
                        $team_array = explode(',', rtrim($user_shift->members, ','));
                        foreach ($team_array as $array_user) {
                            array_push($team_members, $array_user);
                        }
                    }
                    $team_members = array_unique($team_members);

                    $total_cash_point = CashPoint::whereIn('user_id', $team_members)
                    ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
                    ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
                    ->get();

                    $total_cash_point_sum = $total_cash_point->sum('points');

                    if ($total_cash_point_sum > $this_month_incentive->every_shift_every_point_above) {

                        $deals = CashPoint::where('user_id', $value->id)
                        ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
                        ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
                        ->get()
                        ->sum('points');
                        $deduction_amount = 0;
                        $user_incentive_amount = $total_cash_point_sum - $this_month_incentive->every_shift_every_point_above;
                        $user_team_goal_monthly = GoalSetting::where([
                            'assigneeType' => 'Team',
                            'goal_status' => 0,
                            'frequency' => 'Monthly',
                            'team_id' => 1,
                        ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
                        ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
                        ->first();

                        if ($user_team_goal_monthly) {
                            $point_deduction = 100 - $this_month_incentive->individual_goal_percentage;
                            
                            $user_incentive_amount_deduction = ($user_incentive_amount * $point_deduction) / 100;
                            $deduction_amount = $deduction_amount + $user_incentive_amount_deduction;
                            $user_incentive_amount = $user_incentive_amount - $user_incentive_amount_deduction;
                        }


                        $user_goal_from_team = Seopage1Team::where([
                            ['id' , '!=' , 1],
                            ['members' , 'LIKE', '%'.$value->id.'%']
                        ])->get()->pluck('id');

                        $user_team_goal_10_days = GoalSetting::where([
                            'assigneeType' => 'User',
                            'goal_status' => 0,
                            'frequency' => '10 Days',
                        ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
                        ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
                        ->whereIn('id', $user_goal_from_team)
                        ->first();

                        if ($user_team_goal_10_days) {
                            $user_incentive_amount_deduction = ($user_incentive_amount * $this_month_incentive->incentive_deduction) / 100;
                            $deduction_amount = $deduction_amount + $user_incentive_amount_deduction;
                            $user_incentive_amount = $user_incentive_amount - $user_incentive_amount_deduction;
                        }
                        
                        $this_user_cashpoint = CashPoint::where('user_id', $value->id)
                        ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
                        ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
                        ->get();
                        

                        $this_user_contribution = (100 / $total_cash_point->sum('points')) * $this_user_cashpoint->sum('points');

                        $this_user_goal = GoalSetting::where([
                            'goal_status' => 1,
                            'user_id' => $value->id,
                        ])->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
                        ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
                        ->count();

                        $this_users_team = Seopage1Team::where([
                            ['members' , 'LIKE', '%'.$value->id.'%']
                        ])->get()->pluck('id');

                        $this_user_team_goal = GoalSetting::where([
                            'goal_status' => 1,
                        ])->whereIn('team_id', $this_users_team)
                        ->whereDate('startDate', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
                        ->whereDate('endDate', '<=', Carbon::now()->endOfMonth()->format('Y-m-d'))
                        ->count();

                        $user_incentive = new UserIncentive();
                        $user_incentive->user_id = $value->id;
                        $user_incentive->point_earned = $deals;
                        $user_incentive->incentive_earned = ((($this_user_contribution * $user_incentive_amount) / 100)) * $this_month_incentive->point_of_contribute;
                        $user_incentive->redeem_point = $deals;
                        $user_incentive->achieve_goal = $this_user_goal + $this_user_team_goal;
                        $user_incentive->month = $this_month_kpi->start_month;
                        $user_incentive->deduction_amount = $deduction_amount;
                        $user_incentive->deduction_incentive_amount = $deduction_amount * $this_month_incentive->point_of_contribute;
                        //dd($user_incentive);
                        $user_incentive->save();

                        $point = new CashPoint();
                        $point->user_id= $value->id;
                        $point->activity= $value->name . ' deduct '.$deals.' points';
                        $point->gained_as = "Individual";
                        $point->points= -$user_incentive_amount;
                        $point->total_points_earn = 0;
                        $point->total_points_redeem = $deals;
                        $point->total_points_void = 0;
                        $point->save();
                    }
                }

                $this_month_kpi->kpi_status = '0';
                $this_month_kpi->save();
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
