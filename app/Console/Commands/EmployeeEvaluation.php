<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelperPendingActionController;
use App\Models\EmployeeEvaluation as ModelsEmployeeEvaluation;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EmployeeEvaluation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'employee_evaluation_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Employee Evaluation Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tasks = Task::where('u_id',null)->where('independent_task_status',1)->get();
        foreach($tasks as $task){
            $task_user = TaskUser::where('task_id',$task->id)->orderBy('id','desc')->first();
            $user = User::where('id',$task_user->user_id)->first();
            if($user->role_id == 14){
                $employee_evaluation = ModelsEmployeeEvaluation::where('task_id',$task->id)->first();
                $currentTime = Carbon::now();
                $taskDate = Carbon::parse($task->created_at)->addDays(7 * ($employee_evaluation->cron_status));
                if($taskDate <= $currentTime){
                    if($employee_evaluation->sending_status == 0){
                    $helper = new HelperPendingActionController();
                    $helper->NewDeveloperEvaluation($user->id);
                    $employee_evaluation->cron_status = $employee_evaluation->cron_status + 1;
                    $employee_evaluation->sending_status = 1;
                    $employee_evaluation->save();
                    }
                }
            }
        }
        // $user = User::where('role_id',14)->get();
        $this->info('Employee Evaluation Check Successfully');
    }
}
