<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PendingAction;
use DB;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Models\PMProject;
use Carbon\Carbon;
use App\Models\TaskSubmission;
use App\Models\TaskRevision;
use App\Models\ProjectMilestone;
use App\Http\Controllers\HelperPendingActionController;
use App\Models\ProjectSubmission;

class TopmanagementAction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'top_management_action:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Top Management Action';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $actions= PendingAction::where('code','TDA')->where('past_status',0)->get();
        foreach ($actions as $action) {
           $creation_date = Carbon::parse($action->created_at)->addHours(72);
          //  dd($developer,$logged_minutes,$estimate_total_minutes);
          $current_date = Carbon::now();
          if($current_date >= $creation_date )
          {
            $update_action= PendingAction::find($action->id);
            $update_action->created_at = Carbon::now();
            $update_action->updated_at = Carbon::now();
           // $update_action->timeframe = 48;
            $update_action->save();

         
           
        }
        }
        
        $this->info('Pending action created');
    }
}
