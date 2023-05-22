<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\Deal;
use App\Models\User;
use App\Models\DealStage;
use App\Models\DealStageChange;
use App\Models\KpiSetting;
use App\Models\CashPoint;


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
        $projects = Project::whereDate('start_date','>=',$date)->where('project_status','Accepted')->count();
        dd($projects);

        // foreach ($projects as $project) {
           
        //         $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

        //         $from = Carbon::createFromFormat('Y-m-d H:s:i', $deal->award_time);

        //         $diff_in_minutes = $from->diffInMinutes($to);
        //         if ($diff_in_minutes >1200) {
        //             $update_deal= Deal::find($deal->id);
        //             $update_deal->status= 'Denied';
        //             $update_deal->save();
        //             $project= Project::where('deal_id',$deal->id)->first();
        //             $project_update= Project::find($project->id);
        //             $project_update->status= 'canceled';
        //             $project_update->project_status = 'Not Accepted';
        //             $project_update->save();
        //         }
            
            
        // }

                    

        $this->info('Award Time Checked and Status Changed');
    }
}

