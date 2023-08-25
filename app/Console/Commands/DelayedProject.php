<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Project;
use DateTime;
use Carbon\Carbon;
use Notification;

class DelayedProject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string    
     */
    protected $signature = 'delayed_project_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delayed Projects Check Daily';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $projects= Project::where('status','in progress')->where('delayed_status',0)->get();
  
          //$daily_bonus= User::where('id',Auth::id())->first();
          //dd($daily_bonus->packages->price);
          //dd($sponsor_bonus['royality_bonus']);
  
          foreach ($projects as $project) {
  
                 
            $to = new DateTime($project['created_at']);
            $from = new DateTime(); // Using Carbon::now() is unnecessary, DateTime already represents the current time
            
            $interval = $from->diff($to);
            $days = $interval->days;
                 
  
                  if($days >= 15)
                  {
                    $project_id= Project::find($project->id);
                    $project_id->delayed_status = 1; 
                    $project_id->save();
                 
                  }
                
                 
  
  
          }
  
          $this->info('Project marks as delayed');
    }
}
