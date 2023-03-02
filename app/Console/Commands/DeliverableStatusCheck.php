<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Project;
use DateTime;
use Carbon\Carbon;
// use Notification;
// use App\Notifications\DueDateNotification;
use App\Models\PMProject;
use App\Models\ContractSign;

class DeliverableStatusCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deliverable_status_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    public function __construct()
    {
        parent::__construct();
    }
    protected $description = 'Deliverable Status Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $projects= Project::where('status','in progress')->get();

        //$daily_bonus= User::where('id',Auth::id())->first();
        //dd($daily_bonus->packages->price);
        //dd($sponsor_bonus['royality_bonus']);

        foreach ($projects as $project) {

                // $date1 = new DateTime($task['due_date']);
                // $date2 = new DateTime(Carbon::now()->addDay(1));
                // $days  = $date2->diff($date1)->format('%a');
                // //dd($days);
                $sign= ContractSign::where('project_id',$project->id)->first();
                if($sign == null)
                {

                  if($project->status != 'finished' || $project->status != 'canceled')
                  {
                    $pm_project= PMProject::where('project_id',$project->id)->first();
                    if($pm_project->reason == null)
                    {
                      
                    $accept_date= $project->updated_at;
                    $current_time= Carbon::now();
                    $diff_in_minutes = $current_time->diffInMinutes($accept_date);
                    if($diff_in_minutes >= 1440)
                    {
                      $pmproject_update= PMProject::find($pm_project->id);
                      $pmproject_update->deliverable_status= 0;
                      $pmproject_update->save();
    
                    }
                    }
  
    
    
    
                  }

                }
               
               

               


        }

        $this->info('Status updated successfully');

      //  $use=((($user['packages']['return_percentage']*$user['packages']['price'])/100)*$sponsor_bonus['royality_bonus']/100)*$income[$i]/100;
    }
    
}
