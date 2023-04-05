<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Milestone\StoreMilestone;
use App\Models\BaseModel;
use App\Models\Currency;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\ProjectTimeLogBreak;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Auth;
use Notification;
use App\Notifications\MilestoneComplete;
use App\Models\User;
use App\Models\PMAssign;
use App\Models\Contract;
use App\Models\Deal;
use App\Models\ProjectActivity;
use Illuminate\Support\Facades\Validator; 
use App\Notifications\MilestoneCancelNotification;
use App\Notifications\MilestoneCancelApproveNotification;
class ProjectMilestoneController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projects';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('projects', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $id = request('id');

        $this->project = Project::findOrFail($id);
        $addProjectMilestonePermission = user()->permission('add_project_milestones');
        $project = Project::findOrFail($id);

        abort_403(!($addProjectMilestonePermission == 'all' || $project->project_admin == user()->id));
        return view('projects.milestone.create', $this->data);
    }
    public function CompleteMilestone(Request $request)
    {
      $milestone_id= ProjectMilestone::where('id',$request->id)->first();
      //dd($request);
      $milestone= ProjectMilestone::find($request->id);
      $milestone->status= "complete";
      $milestone->last_updated_by= Auth::id();
      $milestone->save();
      $project= Project::where('id',$milestone->project_id)->first();
      $milestone_count= ProjectMilestone::where('project_id',$milestone->project_id)->count();

      $milestone_complete= ProjectMilestone::where('project_id',$milestone->project_id)->where('status','complete')->count();
      //  dd($milestone_count,$milestone_complete);
      if ($milestone_count == $milestone_complete) {
        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {


           Notification::send($user, new MilestoneComplete($project,$milestone));
        }
      }

    //  dd($output);

      return back()->with('success','Milestone Status Updated Successfully');
    }

    /**
     * @param StoreMilestone $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreMilestone $request)
    {
        // /dd($request);
        $currency= Currency::where('currency_code',$request->original_currency_id)->first();

        // /dd($currency);
        $milestone = new ProjectMilestone();
        $milestone->project_id = $request->project_id;
        $milestone->milestone_title = $request->milestone_title;
        $milestone->summary = $request->summary;
        $milestone->milestone_type = $request->milestone_type;
        //$currency= Currency::where('id',$deal->original_currency_id)->first();
        //dd($currency);
        $milestone->cost = ($request->actual_cost)/$currency->exchange_rate;
        $milestone->actual_cost = ($request->actual_cost == '') ? '0' : $request->actual_cost;
        $milestone->currency_id = 1;
       
        $milestone->original_currency_id = $currency->id;
       
        $milestone->save();

        $project = Project::where('id',$request->project_id)->first();

        $project_milestone_cost= ProjectMilestone::where('project_id',$project->id)->sum('cost');
        if($project_milestone_cost > $project->project_budget && $project_milestone_cost-$project->project_budget > 1 )
        {
            $project_update= Project::find($project->id);
            $project_update->project_budget= $project->project_budget+$milestone->cost;
            $project_update->due= $project->due+ $milestone->cost;
            if($project->status == 'finished')
            {
                $project_update->status ='in progress';
            }
            $project_update->save();
            $pm_id= PMAssign::where('pm_id',$project->pm_id)->first();
            $pm_assign= PMAssign::find($pm_id->id);
            $pm_assign->amount= $pm_assign->amount+ $milestone->cost;
            $pm_assign->monthly_project_amount= $pm_assign->monthly_project_amount+ $milestone->cost;
            $pm_assign->save();

            $deal_id= Deal::where('id',$project->deal_id)->first();
            $deal= Deal::find($deal_id->id);
            $deal->actual_amount= $deal->actual_amount+ $milestone->actual_cost;
            $deal->amount= $deal->amount+ $milestone->cost;
            $deal->save();
            $contract_id= Contract::where('deal_id',$deal->id)->first();
            $contract= Contract::find($contract_id->id);
            $contract->actual_amount= $contract->actual_amount+ $milestone->actual_cost;
            $contract->original_amount= $contract->original_amount+ $milestone->actual_cost;
            $contract->amount= $contract->amount+ $milestone->cost;
            $contract->save();
            $log_user = Auth::user();
            $activity = new ProjectActivity();
            $activity->activity= $milestone->milestone_title. '- New milestone added by '. $log_user->name;
         
            $activity->project_id = $project_update->id;
           
            $activity->save();
    

           

        }

        // if ($request->add_to_budget == 'yes') {
        //     $project->project_budget = (!is_null($project->project_budget) ? ($project->project_budget + $milestone->cost) : $milestone->cost);
        //     $project->currency_id = $request->currency_id;
        //     $project->save();
        // }

       // $this->logProjectActivity($project->id, 'messages.newMilestoneCreated');
        return Reply::success(__('messages.milestoneSuccess'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->milestone = ProjectMilestone::findOrFail($id);
        $this->currencies = Currency::all();
        return view('projects.milestone.edit', $this->data);
    }

    /**
     * @param StoreMilestone $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(StoreMilestone $request, $id)
    {
        $pre_cost= ProjectMilestone::where('id',$id)->first();
    // dd($pre_cost);
        $project_id= Project::where('id',$request->project_id)->first();
        $project_update_price= Project::find($project_id->id);
        $project_update_price->project_budget= $project_id->project_budget-$pre_cost->cost;
        $project_update_price->due= $project_id->due- $pre_cost->cost;
        
        $project_update_price->save();
        $pm_id_update= PMAssign::where('pm_id',$project_id->pm_id)->first();
        $pm_assign_update= PMAssign::find($pm_id_update->id);
        $pm_assign_update->amount= $pm_assign_update->amount- $pre_cost->cost;
        $pm_assign_update->monthly_project_amount= $pm_assign_update->monthly_project_amount- $pre_cost->cost;
        $pm_assign_update->save();

        $deal_id_update= Deal::where('id',$project_id->deal_id)->first();
        $deal_update= Deal::find($deal_id_update->id);
        $deal_update->actual_amount= $deal_update->actual_amount- $pre_cost->actual_cost;
        $deal_update->amount= $deal_update->amount- $pre_cost->cost;
        $deal_update->save();
        $contract_update_id= Contract::where('deal_id',$deal_update->id)->first();
        $contract_update= Contract::find($contract_update_id->id);
        $contract_update->actual_amount= $contract_update->actual_amount- $pre_cost->actual_cost;
        $contract_update->original_amount= $contract_update->original_amount- $pre_cost->actual_cost;
        $contract_update->amount= $contract_update->amount- $pre_cost->cost;
        $contract_update->save();
        $currency= Currency::where('currency_code',$request->original_currency_id)->first();
      //dd($request,$id);
        $milestone = ProjectMilestone::findOrFail($id);
        $originalValues = $milestone->getOriginal();
        $milestone->project_id = $request->project_id;
        $milestone->milestone_title = $request->milestone_title;
        $milestone->summary = $request->summary;
        $milestone->milestone_type= $request->milestone_type;
        $milestone->cost = ($request->actual_cost)/$currency->exchange_rate;
        $milestone->actual_cost = ($request->actual_cost == '') ? '0' : $request->actual_cost;
        $milestone->currency_id = 1;
        $milestone->original_currency_id = $currency->id;
        // $milestone->status = $request->status;
        // $milestone->start_date = $request->start_date == null ? $request->start_date : Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        // $milestone->end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $milestone->save();
        $project = Project::where('id',$milestone->project_id)->first();

        $project_milestone_cost= ProjectMilestone::where('project_id',$project->id)->sum('cost');
        if($project_milestone_cost > $project->project_budget && $project_milestone_cost-$project->project_budget > 1 )
        {
            $project_update= Project::find($project->id);
            $project_update->project_budget= $project->project_budget+$milestone->cost;
            $project_update->due= $project->due+ $milestone->cost;
            if($project->status == 'finished')
            {
                $project_update->status ='in progress';
            }
            $project_update->save();
            $pm_id= PMAssign::where('pm_id',$project->pm_id)->first();
            $pm_assign= PMAssign::find($pm_id->id);
            $pm_assign->amount= $pm_assign->amount+ $milestone->cost;
            $pm_assign->monthly_project_amount= $pm_assign->monthly_project_amount+ $milestone->cost;
            $pm_assign->save();

            $deal_id= Deal::where('id',$project->deal_id)->first();
            $deal= Deal::find($deal_id->id);
            $deal->actual_amount= $deal->actual_amount+ $milestone->actual_cost;
            $deal->amount= $deal->amount+ $milestone->cost;
            $deal->save();
            $contract_id= Contract::where('deal_id',$deal->id)->first();
            $contract= Contract::find($contract_id->id);
            $contract->actual_amount= $contract->actual_amount+ $milestone->actual_cost;
            $contract->original_amount= $contract->original_amount+ $milestone->actual_cost;
            $contract->amount= $contract->amount+ $milestone->cost;
            $contract->save();
            $log_user = Auth::user();
            $activity = new ProjectActivity();
            $activity->activity= $milestone->milestone_title. '- milestone updated by '. $log_user->name;
         
            $activity->project_id = $project_update->id;
           
            $activity->save();

            

           

        }

       // $this->logProjectActivity($milestone->project_id, 'messages.milestoneUpdated');
        return Reply::success(__('messages.milestoneSuccess'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $milestone = ProjectMilestone::findOrFail($id);
        ProjectMilestone::destroy($id);
        $this->logProjectActivity($milestone->project_id, 'messages.milestoneDeleted');
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function show($id)
    {
        $viewMilestonePermission = user()->permission('view_project_milestones');

        $this->milestone = ProjectMilestone::with('tasks', 'tasks.users', 'tasks.boardColumn', 'tasks.createBy', 'tasks.timeLogged', 'project')->findOrFail($id);

        $project = Project::findOrFail($this->milestone->project_id);

        abort_403(!(
            $viewMilestonePermission == 'all'
            || ($viewMilestonePermission == 'added' && $this->milestone->added_by == user()->id)
            || ($viewMilestonePermission == 'owned' && $this->milestone->project->client_id == user()->id && in_array('client', user_roles()))
            || ($viewMilestonePermission == 'owned' && in_array('employee', user_roles()))
            || ($project->project_admin == user()->id)
        ));

        $totalTaskTime = 0;

        foreach($this->milestone->tasks as $totalTime)
        {
            $totalMinutes = $totalTime->timeLogged->sum('total_minutes');
            $breakMinutes = $totalTime->breakMinutes();
            $totalMinutes = $totalMinutes - $breakMinutes;
            $totalTaskTime += $totalMinutes;
        }

        $this->timeLog = intdiv($totalTaskTime, 60) . ' ' . __('app.hrs') . ' ';

        if ($totalTaskTime % 60 > 0) {
            $this->timeLog .= $totalTaskTime % 60 . ' ' . __('app.mins');
        }

        return view('projects.milestone.show', $this->data);
    }

    public function byProject($id)
    {
        if ($id == 0) {
            $options = '<option value="">--</option>';
        }
        else {
            $projects = ProjectMilestone::where('project_id', $id)->get();
            $options = BaseModel::options($projects, null, 'milestone_title');
        }

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

    public function CancelMilestone(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400
            ]);
        };
        $milestone_id= ProjectMilestone::where('id',$request->milestoneId)->first();
        $milestone= ProjectMilestone::find($milestone_id->id);
        $milestone->cancelation_status= 'submitted';
        $milestone->comments= $request->comments;
        $milestone->save();
        $project= Project::where('id',$milestone->project_id)->first();
        $users= User::where('role_id',1)->get();
        foreach ($users as $user) {


           Notification::send($user, new MilestoneCancelNotification($milestone));
        }
        return response()->json([
            'status' => 'success'
        ]);

        
    }
    public function CancelMilestoneApprove(Request $request)
    {
        
        $milestone_id= ProjectMilestone::where('id',$request->milestoneId)->first();
        $milestone= ProjectMilestone::find($milestone_id->id);
        $milestone->cancelation_status= 'approved';
        
        $milestone->save();
        $project= Project::where('id',$milestone->project_id)->first();
        $user= User::where('id',$project->pm_id)->first();
        


           Notification::send($user, new MilestoneCancelApproveNotification($milestone));
       
        return response()->json([
            'status' => 'success'
        ]);

        
    }

}
