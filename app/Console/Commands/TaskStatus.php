<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;
use DateTime;
use Carbon\Carbon;


class TaskStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'task:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Daily Task Status Check';

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

        $tasks= Task::all();

        //$daily_bonus= User::where('id',Auth::id())->first();
        //dd($daily_bonus->packages->price);
        //dd($sponsor_bonus['royality_bonus']);

        foreach ($tasks as $task) {

                // $date1 = new DateTime($task['due_date']);
                // $date2 = new DateTime(Carbon::now()->addDay(1));
                // $days  = $date2->diff($date1)->format('%a');
                // //dd($days);
                $to = new DateTime($task['due_date']?->format('Y-m-d')??'');
                $from = new DateTime(Carbon::now()?->format('Y-m-d')??'');
                $days  = $from->diff($to)->format('%a');
                //$startDate?->format('d/m/Y') ?? '',

                //dd($from,$to);
                if ($days != 0) {
                  if ($from > $to){

                      if($task->board_column_id != 6)
                      {
                        $task_status= Task::find($task->id);

                        $task_status->board_column_id =7;
                        $task_status->save();
                    }


                    }
                }





        }

        $this->info('Task Status Changed');

      //  $use=((($user['packages']['return_percentage']*$user['packages']['price'])/100)*$sponsor_bonus['royality_bonus']/100)*$income[$i]/100;
    }

}
