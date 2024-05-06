<?php

namespace App\Listeners;

use App\Events\MilestoneAddedEvent;
use App\Models\Deal;
use App\Models\PmGoalSetting;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\ProjectPmGoal;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class MilestoneAddedEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\MilestoneAddedEvent  $event
     * @return void
     */
    public function handle(MilestoneAddedEvent $event)
    {
        // check if total budget has been completed
        // if not then pm goal will not be created

        // get total milestone amount
        $milestone = $event->milestone;
        $milestoneSum = ProjectMilestone::where('project_id', $milestone->project_id)->sum('cost');
        $project = Project::find($milestone->project_id);

        // dd($milestoneSum, $project->project_budget, $milestoneSum < $project->project_budget);
        if ($milestoneSum < $project->project_budget) {
            return;
        }

        $lastGoal = ProjectPmGoal::where('project_id', $milestone->project_id)->orderBy('goal_end_date', 'desc')->first();

        $goalCodes = ProjectPmGoal::$goalCodes['upsell'];

        // dd($milestone);

        if($milestone->cost < 100) $goalDuration = 3;
        else $goalDuration = 3 +  (int) (($milestone->cost -100) / 100);

        $goal = new ProjectPmGoal();
        $goal->project_id = $lastGoal->project_id;
        $goal->client_id = $lastGoal->client_id;
        $goal->pm_id = $lastGoal->pm_id;
        $goal->project_type = $lastGoal->project_type;
        $goal->project_category = $lastGoal->project_category;

        $goal->goal_code = $goalCodes['code'];
        $goal->goal_name = $goalCodes['name'];
        $goal->goal_type = $goalCodes['type'];

        $goal->goal_start_date = $lastGoal->goal_start_date;
        $goal->goal_end_date = Carbon::parse($lastGoal->goal_start_date)->addDay($lastGoal->duration + $goalDuration);
        $goal->duration = $lastGoal->duration + $goalDuration;
        $goal->added_by = Auth::user()->id;
        $goal->save();
    }
}
