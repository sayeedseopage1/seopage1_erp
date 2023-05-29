<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\kpiSetting;
use App\Models\User;
use App\Models\CashPoint;
use App\Models\UserIncentive;
use App\Models\IncentiveSetting;
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
        } else if (/*Carbon::today() == Carbon::now()->endOfMonth()*/ 1==1) {
            $this_month_kpi = kpiSetting::where([
                'kpi_status' => '1',
                'cron_status' => '1',
                'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
            ])->first();

            if ($this_month_kpi) {
                $users = User::whereIn('role_id', [7, 8])->get();
                foreach ($users as $value) {
                    $deals = CashPoint::where('user_id', $value->id)
                    ->whereDate('created_at', '>=', Carbon::now()->startOfMonth())
                    ->whereDate('created_at', '<=', Carbon::now()->endOfMonth())
                    ->get()
                    ->sum('points');
                    
                    $user_incentive = new UserIncentive();
                    $user_incentive->user_id = $value->id;
                    $user_incentive->point_earned = $deals;
                    $user_incentive->point_earned = $deals;
                    $user_incentive->month = $this_month_kpi->start_month;
                    $user_incentive->save();

                    $point= new CashPoint();
                    $point->user_id= $value->id;
                    $point->activity= $value->name . ' deduct '.$deals.' points';
                    $point->gained_as = "Individual";
                    $point->points= -$deals;
                    $point->total_points_earn = 0;
                    $point->total_points_redeem = $deals;
                    $point->total_points_void = 0;
                    $point->save();
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

            $this_month_incentive = IncentiveSetting::where([
                'incentive_status' => '1',
                'cron_status' => '1',
                'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
            ])->first();

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
