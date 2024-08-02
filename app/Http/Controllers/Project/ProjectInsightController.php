<?php

namespace App\Http\Controllers\Project;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Subtask;
use Illuminate\Http\Request;
use App\Models\ProjectTimeLog;
use App\Models\ProjectMilestone;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ProjectDeadlineExtension;

class ProjectInsightController extends Controller
{
    public function getProjectMilestones($project_id)
    {
        $data = DB::select(
            DB::raw("
                SELECT 
                    pm.*,
                    c.id as currency_id, c.currency_code as currency_code, c.currency_symbol as currency_symbol,
                    oc.id as original_currency_id, oc.currency_code as original_currency_code, oc.currency_symbol as original_currency_symbol,
                    inv.id as invoice_id, inv.status as paid_status
                FROM 
                    project_milestones pm
                LEFT JOIN 
                    currencies c ON pm.currency_id = c.id
                LEFT JOIN 
                    currencies oc ON pm.original_currency_id = oc.id
                LEFT JOIN
                    invoices inv ON pm.id = inv.milestone_id
                WHERE 
                    pm.project_id = :project_id
            "), ['project_id' => $project_id]
        );

        // $data = ProjectMilestone::select(['*','created_at'])->with('currency:id,currency_code,currency_symbol','original_currency:id,currency_code,currency_symbol')->where('project_id', $project_id)->get();

        return response()->json([
            'code' => 200,
            'data' => $data??[]
        ]);
    }

    public function getProjectTasks($project_id)
    {
        $data = Task::select(['id','project_id','heading','start_date','due_date','original_due_date','status','board_column_id','estimate_hours','estimate_minutes'])->with('boardColumn', 'timeLogged')->where('project_id', $project_id)->whereNull('subtask_id')->get()->map(function($row){
            $timeLog = '--';
            if($row->timeLogged) {
                $totalMinutes = $row->timeLogged->sum('total_minutes');
                foreach($row->timeLogged as $value) {
                    if (is_null($value->end_time)) {
                        $workingTime = $value->start_time->diffInMinutes(Carbon::now());
                        $totalMinutes = $totalMinutes + $workingTime;
                    }
                }
                $breakMinutes = $row->breakMinutes();
                $totalMinutes = $totalMinutes - $breakMinutes;
                $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';
                if ($totalMinutes % 60 > 0) {
                    $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                }
            }
            
            $tas_id = Task::where('id',$row->id)->first();
            $subtasks = Subtask::where('task_id', $tas_id->id)->get();
            
            // Showing first logged time under a task
            $row->logged_start_time = null;
            $taskTimeLog = ProjectTimeLog::where('task_id', $row->id)->first();
            if($taskTimeLog){
                $row->logged_start_time = $taskTimeLog->start_time ? Carbon::parse($taskTimeLog->start_time)->format('Y-m-d H:i:s') : null;
            }
            else{
                $subTaskIds = Subtask::where('task_id', $tas_id->id)->pluck('id');
                $tasksIds = Task::whereIn('subtask_id', $subTaskIds)->pluck('id');
                $startTime = ProjectTimeLog::whereIn('task_id',$tasksIds)->first()->start_time ?? null;
                $row->logged_start_time = $startTime ? Carbon::parse($startTime)->format('Y-m-d H:i:s') : null;
            }

            foreach ($subtasks as $subtask) {
                $task = Task::where('subtask_id', $subtask->id)->first();
                $totalMinutes = $totalMinutes + $task->timeLogged->sum('total_minutes');
                foreach($task->timeLogged as $value) {
                    if (is_null($value->end_time)) {
                        $workingTime = $value->start_time->diffInMinutes(Carbon::now());
                        $totalMinutes = $totalMinutes + $workingTime;
                    }
                }
            }
            
            if($subtasks == null) {
                $row->hours_logged = $timeLog;
            } else {
                $timeL = intdiv(($totalMinutes), 60) . ' ' . __('app.hrs') . ' ';
                if ($totalMinutes % 60 > 0) {
                    $timeL .= ($totalMinutes) % 60 . ' ' . __('app.mins');
                }
                $row->hours_logged =  $timeL;
            }
            return $row;
        });

        return response()->json([
            'code' => 200,
            'data' => $data??[]
        ]);
    }

    public function getPendingExtensionRequest($project_id)
    {
        return response()->json([
            'code' => 200,
            'data' => ProjectDeadlineExtension::where('project_id',$project_id)->where('status', 1)->first()??[]
        ]);
    }
}
