<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\ProgressTask;

class TaskProgress extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'progress_task:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

       $developer_data= DB::table('users')
                       ->select('id')
                       ->where('role_id', 5)
                       ->orWhere('role_id', 6)
                       ->get();

        foreach($developer_data as $developer){
            $progress_task = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where(function ($query) {
                $query->where('board_column_id', 2)
                      ->orwhere('board_column_id', 3);
                })
                ->where('task_users.user_id', $developer->id )
                ->count();

            $data = new ProgressTask();
            $data->user_id =$developer->id;
            $data->count_progress_task = $progress_task;
            $data->save();

        }

        return Command::SUCCESS;
    }
}