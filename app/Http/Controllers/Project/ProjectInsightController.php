<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\ProjectMilestone;
use App\Models\Task;
use Illuminate\Http\Request;

class ProjectInsightController extends Controller
{
    public function getProjectMilestones($project_id)
    {
        $data = ProjectMilestone::with('currency:id,currency_code,currency_symbol','original_currency:id,currency_code,currency_symbol')->where('project_id', $project_id)->get();

        return response()->json([
            'code' => 200,
            'data' => $data
        ]);
    }

    public function getProjectTasks($project_id)
    {
        $data = Task::select(['id','project_id','heading','start_date','due_date','original_due_date','status','board_column_id','estimate_hours','estimate_minutes'])->where('project_id', $project_id)->whereNull('subtask_id')->get();

        return response()->json([
            'code' => 200,
            'data' => $data
        ]);
    }
}
