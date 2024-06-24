<?php

namespace App\Http\Controllers\Project;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\ProjectDeadlineExtension;

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
        $project = Project::select(['id','project_name','project_short_code','client_id','pm_id','start_date','deadline','project_budget','currency_id','deal_id','project_challenge','comments','requirement_defined','deadline_meet','project_summary','status'])->with('client:id,name,country_id', 'client.country:id,iso,nicename', 'pm:id,name,country_id', 'pm.country:id,iso,nicename', 'currency:id,currency_code,currency_symbol', 'deal:id,project_type,amount,upsell_actual_amount,profile_link,message_link,original_currency_id,lead_id,price_authorization,requirment_define,project_deadline_authorization,description,description2,description3,description4,description5,description6,description7,description8,description9', 'deal.original_currency:id,currency_code,currency_symbol', 'workingEnvironment:id,project_id,site_url,frontend_password,login_url,email,password', 'pmTaskGuidline', 'pmTaskGuidelineAuthorizations','projectSubmission', 'projectPortfolio.theme')->find($project_id);

        $tasks = Task::where('project_id',$project->id);

        if (!$project) {
            return response()->json(['status' => 404, 'message' => 'Project not found'], 404);
        }

        $projectArray = $project->toArray();
        
        $projectArray['progress'] = $tasks->count() ? round(($tasks->where('status','completed')->count()/$tasks->count())*100) : 0;

        $pendingDeadlineExtensionRequests = ProjectDeadlineExtension::where('project_id',$project_id)->where('status', 1)->count();

        if( Auth::user()->role_id == 4 && $project->status == 'in progress' ){
            $projectArray['buttons']['extend_deadline_form'] = !$pendingDeadlineExtensionRequests ? true : false;
            $projectArray['buttons']['extend_deadline_pending'] = $pendingDeadlineExtensionRequests ? true : false;
        }
        
        $projectArray['buttons']['deadline_extension_authorization'] = Auth::user()->role_id == 1 && $pendingDeadlineExtensionRequests ? true : false;
        

        $projectArray['buttons']['mark_as_incomplete'] = Auth::user()->role_id == 1 ? true : false;
        $projectArray['buttons']['pm_task_guidline'] = true;
        $projectArray['buttons']['qc_authorization'] = Auth::user()->role_id == 1 ? true : false;
        $projectArray['buttons']['completion_form_authorization'] = Auth::user()->role_id == 1 ? true : false;
        $projectArray['buttons']['dispute_authorization'] = Auth::user()->role_id == 1 ? true : false;

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
