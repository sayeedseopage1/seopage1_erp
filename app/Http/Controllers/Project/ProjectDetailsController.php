<?php

namespace App\Http\Controllers\Project;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\PmTaskGuideline;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectDeadlineExtension;
use App\Models\PMTaskGuidelineAuthorization;

class ProjectDetailsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $project_id)
    {
        $project = Project::select(['id','project_name','project_short_code','client_id','pm_id','start_date','deadline','project_budget','currency_id','deal_id','project_challenge','comments','requirement_defined','deadline_meet','project_summary','status','dispute_status','dispute_admin_comment'])->with('client:id,name,user_name,country_id', 'client.country:id,iso,nicename', 'pm:id,name,country_id', 'pm.country:id,iso,nicename', 'currency:id,currency_code,currency_symbol', 'deal:id,project_type,amount,upsell_actual_amount,profile_link,message_link,original_currency_id,lead_id,price_authorization,requirment_define,project_deadline_authorization,description,description2,description3,description4,description5,description6,description7,description8,description9', 'deal.original_currency:id,currency_code,currency_symbol', 'workingEnvironment:id,project_id,site_url,frontend_password,login_url,email,password', 'pmTaskGuidline', 'pmTaskGuidelineAuthorizations','projectSubmission', 'projectPortfolio.theme', 'projectDeadlineExtension', 'projectQcSubmission', 'projectDispute')->find($project_id);

        $tasks = Task::where('project_id',$project->id)->whereNull('subtask_id');

        if (!$project) {
            return response()->json(['status' => 404, 'message' => 'Project not found'], 404);
        }

        $projectArray = $project->toArray();
        // return $tasks->count();
        
        $projectArray['progress'] = $tasks->count() ? round(((clone $tasks)->where('board_column_id', 4)->count()/$tasks->count())*100) : 0;
        $boardColumnsCollection = collect([1, 2, 3, 4, 6, 7, 8, 9]);
        $countProgressArray = $boardColumnsCollection->map(function ($id) use ($tasks) {
            return (clone $tasks)->where('board_column_id', $id)->count();
        });
        $projectArray['progress_chart_values'] = $countProgressArray;

        $pendingDeadlineExtensionRequests = $project->projectDeadlineExtension->where('status', 1)->count();
        if( Auth::user()->role_id == 4 && $project->status == 'in progress' ){
            $projectArray['buttons']['extend_deadline_form'] = !$pendingDeadlineExtensionRequests ? true : false;
            $projectArray['buttons']['extend_deadline_pending'] = $pendingDeadlineExtensionRequests ? true : false;
        }
        $projectArray['buttons']['deadline_extension_authorization'] = Auth::user()->role_id == 1 && $pendingDeadlineExtensionRequests ? true : false;
        $projectArray['buttons']['pm_task_guidline_authorization'] = Auth::user()->role_id == 1 && $project->pmTaskGuidelineAuthorizations->where('status', 0)->count() ? true : false;
        $projectArray['buttons']['pm_task_guidline'] = $project->pmTaskGuidline ? true : false;
        $projectArray['buttons']['project_qc_authorization'] = (Auth::user()->role_id == 1 || Auth::user()->role_id == 8) && ($project->projectQcSubmission && $project->projectQcSubmission->status == 'pending') ? true : false;
        $projectArray['buttons']['project_qc_data'] = $project->projectQcSubmission ? true : false;
        $projectArray['buttons']['completion_form_authorization'] = (Auth::user()->role_id == 1 || Auth::user()->role_id == 8) && ($project->projectSubmission && $project->projectSubmission->status == 'pending') ? true : false;
        $projectArray['buttons']['completion_form_data'] = $project->projectSubmission ? true : false;
        
        if($project->status == 'in progress' || $project->status == 'not started' || $project->status == 'on hold'){
            $projectArray['buttons']['mark_as_incomplete'] = $project->dispute_status != 1 && (Auth::user()->role_id == 1 || Auth::user()->role_id == 8) ? true : false;
            $projectArray['buttons']['explain_dispute'] = !$project->projectDispute && $project->dispute_status == 1 && (Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 4) ? true : false;
        }
        $projectArray['buttons']['project_dispute_authorization'] = $project->projectDispute && !$project->dispute_admin_comment && Auth::user()->role_id == 1 ? true : false;
        $projectArray['buttons']['see_project_dispute'] = $project->projectDispute ? true : false;

        unset($projectArray['isProjectAdmin']);

        unset($projectArray['client']['modules']);
        unset($projectArray['client']['client_details']);
        unset($projectArray['client']['session']);
        unset($projectArray['client']['user_other_role']);
        unset($projectArray['client']['role']);
        unset($projectArray['client']['employee_detail']);

        unset($projectArray['pm']['modules']);
        unset($projectArray['pm']['client_details']);
        unset($projectArray['pm']['session']);
        unset($projectArray['pm']['user_other_role']);
        unset($projectArray['pm']['role']);
        unset($projectArray['pm']['employee_detail']);

        return response()->json(['status' => 200, 'data' => $projectArray]);
    }
}
