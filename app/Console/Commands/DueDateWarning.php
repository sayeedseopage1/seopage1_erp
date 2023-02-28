<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Project;
use DateTime;
use Carbon\Carbon;
use Notification;
use App\Notifications\DueDateNotification;

class DueDateWarning extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
      protected $signature = 'duedate:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Due Date Check';

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
      //return Command::SUCCESS;

        $projects= Project::where('status','in progress')->get();

        //$daily_bonus= User::where('id',Auth::id())->first();
        //dd($daily_bonus->packages->price);
        //dd($sponsor_bonus['royality_bonus']);

        foreach ($projects as $project) {

                // $date1 = new DateTime($task['due_date']);
                // $date2 = new DateTime(Carbon::now()->addDay(1));
                // $days  = $date2->diff($date1)->format('%a');
                // //dd($days);
                $to = new DateTime($project['deadline']?->format('Y-m-d')??'');
                $from = new DateTime(Carbon::now()?->format('Y-m-d')??'');
                $days  = $from->diff($to)->format('%a');
                //$startDate?->format('d/m/Y') ?? '',


                if ($days <= 1) {
                $users= User::where('id',$project->pm_id)->orWhere('role_id',6)->orWhere('role_id',1)->get();
                foreach ($users as $user) {


                   Notification::send($user, new DueDateNotification($project));
                }

                }





        }

        $this->info('Notification Send Successfully');

      //  $use=((($user['packages']['return_percentage']*$user['packages']['price'])/100)*$sponsor_bonus['royality_bonus']/100)*$income[$i]/100;
    }

}
