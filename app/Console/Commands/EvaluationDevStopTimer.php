<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelperPendingActionController;
use App\Models\EmployeeEvaluation as ModelsEmployeeEvaluation;
use App\Models\ProjectTimeLog;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EvaluationDevStopTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'evaluation_dev_stop_timer_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Evaluation Dev Stop Timer Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // \DB::beginTransaction();
        $employee_evaluations = ModelsEmployeeEvaluation::where('employee_status',0)->get();
        foreach($employee_evaluations as $data)
        {
            $currentTime = Carbon::now();
            if($data->exp_date <= $currentTime)
            {
                $project_time_log = ProjectTimeLog::where('user_id', $data->user_id)->where('end_time', null)->first();
                $project_time_log->end_time = $data->exp_date;
                $project_time_log->save();
            }
        }

        $this->info('Evaluation Developer Timer Stop Successfully');
    }
}
