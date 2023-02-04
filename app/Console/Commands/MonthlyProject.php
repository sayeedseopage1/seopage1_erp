<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PMAssign;
use Carbon\Carbon;

class MonthlyProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monthly_project_refresh:monthly';
    /**
     * The console command description.
     *
     * @var string
     */

    protected $description = 'Monthly Project Refresh';

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
      $pm_projects= PMAssign::where('status','1')->get();



      foreach ($pm_projects as $manager) {

            $today_date= Carbon::today();
            //$current_date = Carbon::now()->startOfMonth();
            $firstDay =  Carbon::now()->startOfMonth();
            $month_end= Carbon::now()->startOfMonth()->addDays(20);
          //  dd($today_date,$firstDay,$month_end);
            if ($today_date->equalTo($month_end)) {
          $pm_update= PmAssign::find($manager->id);
          $pm_update->monthly_project_count =0;
          $pm_update->monthly_project_amount= 0;
          $pm_update->monthly_release_amount= 0;
          $pm_update->save();

          }





      }

      $this->info('Project Refreshed');
    }
}
