<?php

namespace App\Http\Controllers\Projects;

use App\Models\Deal;
use App\Models\Project;
use App\Models\PMAssign;
use App\Models\PMProject;
use Illuminate\Http\Request;
use App\Models\PmReassignHistory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectInsightController extends Controller
{
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
