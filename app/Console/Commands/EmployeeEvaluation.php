<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelperPendingActionController;
use App\Models\EmployeeEvaluation as ModelsEmployeeEvaluation;
use App\Models\EmployeeEvaluationTask;
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
        // \DB::beginTransaction();
        $employee_evaluations = ModelsEmployeeEvaluation::where('employee_status',0)->get();
        foreach($employee_evaluations as $data)
        {
            $currentTime = Carbon::now();
            if($data->exp_date <= $currentTime)
            {
                if($data->pending_action_sending_time == null && $data->user_status == 'PM')
                {
                    $helper = new HelperPendingActionController();
                    $helper->NewPmEvaluation($data->user_id);
                    $data->pending_action_sending_time = Carbon::now();
                    $data->save();
                }elseif($data->pending_action_sending_time == null && $data->user_status == 'LD')
                {
                    $helper = new HelperPendingActionController();
                    $helper->NewPmEvaluation($data->user_id);
                    $data->pending_action_sending_time = Carbon::now();
                    $data->save();
                }elseif($data->pending_action_sending_time == null && $data->user_status == 'SE')
                {
                    $helper = new HelperPendingActionController();
                    $helper->NewPmEvaluation($data->user_id);
                    $data->pending_action_sending_time = Carbon::now();
                    $data->save();
                }else{
                    dd('Developer'); 
                    $helper = new HelperPendingActionController();
                    $helper->NewDeveloperEvaluation($data->user_id);
                    $data->pending_action_sending_time = Carbon::now();
                    $data->save();
                }
            }
        }

        $this->info('Employee Evaluation Check Successfully');
    }
}
