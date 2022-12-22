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
use App\Notifications\MilestoneReleaseNotification;
use App\Models\User;

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
      //dd($request);
        $milestone = new ProjectMilestone();
        $milestone->project_id = $request->project_id;
        $milestone->milestone_title = $request->milestone_title;
        $milestone->summary = $request->summary;
        $milestone->cost = ($request->cost == '') ? '0' : $request->cost;
        $milestone->currency_id = $request->currency_id;
        $milestone->status = $request->status;
        $milestone->start_date = $request->start_date == null ? $request->start_date : Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $milestone->end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $milestone->save();

        $project = Project::findOrFail($request->project_id);

        if ($request->add_to_budget == 'yes') {
            $project->project_budget = (!is_null($project->project_budget) ? ($project->project_budget + $milestone->cost) : $milestone->cost);
            $project->currency_id = $request->currency_id;
            $project->save();
        }

        $this->logProjectActivity($project->id, 'messages.newMilestoneCreated');
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
      //dd($request);
        $milestone = ProjectMilestone::findOrFail($id);
        $milestone->project_id = $request->project_id;
        $milestone->milestone_title = $request->milestone_title;
        $milestone->summary = $request->summary;
        $milestone->cost = ($request->cost == '') ? '0' : $request->cost;
        $milestone->currency_id = $request->currency_id;
        $milestone->status = $request->status;
        $milestone->start_date = $request->start_date == null ? $request->start_date : Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $milestone->end_date = $request->end_date == null ? $request->end_date : Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $milestone->save();

        $this->logProjectActivity($milestone->project_id, 'messages.milestoneUpdated');
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

}
