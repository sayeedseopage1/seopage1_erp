<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Carbon\Carbon;
use DateTime;

use function Sodium\add;
use Auth;
use App\Models\Deal;
use App\Models\Project;

class AwardTime extends Command
{
    /**
    * The name and signature of the console command.
    *
    * @var string
    */
    protected $signature = 'award_time_check:daily';

    /**
    * The console command description.
    *
    * @var string
    */
    protected $description = 'Award Time Check';

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
        $deals = Deal::where('status','pending')->get();


        foreach ($deals as $deal) {
            if($deal->status != 'Accepted')
            {
                $to = Carbon::createFromFormat('Y-m-d H:s:i', Carbon::now());

                $from = Carbon::createFromFormat('Y-m-d H:s:i', $deal->award_time);

                $diff_in_minutes = $from->diffInMinutes($to);
                if ($diff_in_minutes >1200) {
                    $update_deal= Deal::find($deal->id);
                    $update_deal->status= 'Denied';
                    $update_deal->save();
                    $project= Project::where('deal_id',$deal->id)->first();
                    $project_update= Project::find($project->id);
                    $project_update->status= 'canceled';
                    $project_update->project_status = 'Not Accepted';
                    $project_update->save();
                }
            }
        }

        $this->info('Award Time Checked and Status Changed');
    }
}
