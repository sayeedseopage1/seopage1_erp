<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\kpiSetting;
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
        $this_month_kpi = kpiSetting::where([
            'kpi_status' => '1',
            'cron_status' => '1',
            'start_month' => Carbon::now()->startOfMonth()->format('Y-m-d')
        ])->first();
        if ($this_month_kpi) {
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
    }   
}
