<?php

namespace App\Http\Controllers\Project;

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\Task;
use App\Models\Project;
use App\Models\Subtask;
use App\Models\PMAssign;
use App\Models\PMProject;
use Illuminate\Http\Request;
use App\Models\ProjectTimeLog;
use App\Models\ProjectMilestone;
use App\Models\PmReassignHistory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\PendingAction;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectDeadlineExtension;
use Illuminate\Support\Facades\Validator;

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

    public function projectDetailsWithAssignablePm($deal_id)
    {
        $deal = Deal::select(['deals.id','deals.deal_id','deals.deal_category','deals.cms_name','deals.pm_id','deals.client_name','deals.project_name','users.name as pm_name'])->leftJoin('users', 'users.id', 'deals.pm_id')->find($deal_id);
        if($deal) {
            $deal->assignable_pm = PMAssign::select(['p_m_assigns.id','p_m_assigns.pm_id','p_m_assigns.status','users.name'])->leftJoin('users', 'users.id', 'p_m_assigns.pm_id')->whereIn('p_m_assigns.status', [0,1])->where('p_m_assigns.pm_id', '!=', $deal->pm_id)->groupBy(['p_m_assigns.id'])->get();
        }

        return response()->json([
            'status' => 200,
            'data' => $deal
        ]);
    }

    public function reassignPmToProject(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'deal_id' => 'required|exists:deals,id',
            'pm_id' => 'required|exists:p_m_assigns,pm_id'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $validated = $validator->validated();

        try {
            DB::beginTransaction();
            $deal = Deal::find($validated['deal_id']);
            if($deal->pm_id == $validated['pm_id']) {
                return response()->json([
                    'status' => 400,
                    'data' => 'The PM you selected is already assigned to this project'
                ]);
            }

            $project = Project::where('deal_id', $deal->id)->first();
            if($project->project_status != 'pending'){
                return response()->json([
                    'status' => 400,
                    'data' => 'The project status is: '.$project->project_status.' , you can not reassign the PM of this project'
                ]);
            }
            
            if(!in_array(PMAssign::where('pm_id', $validated['pm_id'])->first()->status, [0, 1])){
                return response()->json([
                    'status' => 400,
                    'data' => 'The PM you selected is permanently disabled'
                ]);
            }

            PmReassignHistory::create([
                'project_id' => $project->id,
                'previously_assigned_to' => $deal->pm_id,
                'reassigned_to' => $validated['pm_id'],
                'reassigned_by' => Auth::user()->id
            ]);
            
            $pending_action = PendingAction::where([['code', 'PWDA'],['project_id', $project->id],['authorization_for', $deal->pm_id]])->first();
            $pending_action->authorization_for = $validated['pm_id'];
            $pending_action->save();

            $deal->pm_id = $validated['pm_id'];
            $deal->save();

            $project->project_admin = $validated['pm_id'];
            $project->pm_id = $validated['pm_id'];
            $project->added_by  = $validated['pm_id'];
            $project->save();

            $pm_project = PMProject::where('project_id', $project->id)->first();
            $pm_project->pm_id = $validated['pm_id'];
            $pm_project->save();

            DB::commit();

            return response()->json([
                'status' => 200,
                'data' => 'Successfully reassigned the PM of this project'
            ]);
        } catch (\Throwable $th) {
            // throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'data' => 'Something went wrong!'
            ]);
        }
    }
}
