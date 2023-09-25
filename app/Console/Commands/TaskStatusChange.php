<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Task;
use App\Models\Subtask;
use DateTime;
use Carbon\Carbon;



class TaskStatusChange extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'task_status_change:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Task Status Change Daily';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sub_tasks= Task::where('board_column_id',6)->where('subtask_id','!=',null)->get();
        foreach($sub_tasks as $task)
        {
            $current_date= Carbon::now();
            $task_date= Carbon::parse($task->updated_at);
            $hoursDifference = $current_date->diffInMinutes($task_date);
            $check_date= Carbon::parse($task->updated_at)->addMinutes(2160);
            $dayName = $task_date->format('l');
           if($dayName != 'Saturday')
           {
            if($hoursDifference > 2160)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 8;
                $task_update->save();

            }


           }else {
            if($hoursDifference > 3600)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 8;
                $task_update->save();

            }


           }
           
           
           
           
        }

        $tasks= Task::where('board_column_id',6)->where('subtask_id',null)->get();
        foreach($tasks as $task)
        {
            $current_date= Carbon::now();
            $task_date= Carbon::parse($task->updated_at);
            $hoursDifference = $current_date->diffInMinutes($task_date);
            $check_date= Carbon::parse($task->updated_at)->addMinutes(2160);
            $dayName = $task_date->format('l');
           if($dayName != 'Saturday')
           {
            if($hoursDifference > 2160)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 9;
                $task_update->save();
            $subtasks_tasks = Subtask::select('tasks.*')
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->where('sub_tasks.task_id',$task->id)->get();
            foreach($subtasks_tasks as $subtask)
            {
                $subtask_update= Task::find($subtask->id);
                $subtask_update->board_column_id = 9;
                $subtask_update->save();

            }


            }


           }else {
            if($hoursDifference > 3600)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 9;
                $task_update->save();
                $subtasks_tasks = Subtask::select('tasks.*')
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->where('sub_tasks.task_id',$task->id)->get();
            foreach($subtasks_tasks as $subtask)
            {
                $subtask_update= Task::find($subtask->id);
                $subtask_update->board_column_id = 9;
                $subtask_update->save();

            }


            }


           }

           
        $tasks= Task::where('board_column_id',9)->where('subtask_id',null)->get();
        foreach($tasks as $task)
        {
            $current_date= Carbon::now();
            $task_date= Carbon::parse($task->updated_at);
            $hoursDifference = $current_date->diffInMinutes($task_date);
            $check_date= Carbon::parse($task->updated_at)->addMinutes(2160);
            $dayName = $task_date->format('l');
           if($dayName != 'Saturday')
           {
            if($hoursDifference > 2160)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 4;
                $task_update->save();
            $subtasks_tasks = Subtask::select('tasks.*')
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->where('sub_tasks.task_id',$task->id)->get();
            foreach($subtasks_tasks as $subtask)
            {
                $subtask_update= Task::find($subtask->id);
                $subtask_update->board_column_id = 4;
                $subtask_update->save();

            }


            }


           }else {
            if($hoursDifference > 3600)
            {
                $task_update= Task::find($task->id);
                $task_update->board_column_id = 4;
                $task_update->save();
                $subtasks_tasks = Subtask::select('tasks.*')
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->where('sub_tasks.task_id',$task->id)->get();
            foreach($subtasks_tasks as $subtask)
            {
                $subtask_update= Task::find($subtask->id);
                $subtask_update->board_column_id = 4;
                $subtask_update->save();

            }


            }


           }
           
           
           
           
        }
    }




  
        $this->info('Task Status Changed Successfully');
    }
}
