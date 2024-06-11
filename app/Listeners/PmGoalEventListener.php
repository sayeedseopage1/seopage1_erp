<?php

namespace App\Listeners;

use App\Events\PmGoalEvent;
use App\Models\ProjectPmGoal;
use App\Models\Task;
use App\Models\TaskboardColumn;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;

class PmGoalEventListener
{
    protected $type = [
        'new_task_added',
        'task_submission_made',
    ];
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
     * @param  \App\Events\PmGoalEvent  $event
     * @return void
     */
    public function handle(PmGoalEvent $event)
    {
        DB::beginTransaction();
        switch ($event->type) {
            case 'new_task_added':
                self::newTaskAddedEventHandle($event);
                break;
            case 'task_submission_made':
                self::taskSubmissionEventHandle($event);
                break;
        }
        DB::commit();
    }

    public function newTaskAddedEventHandle($event)
    {
        $projectId = $event->data['projectId'];
        $taskCount = Task::where('project_id', $projectId)->count();
        if ($taskCount > 1) return;

        $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => 'DCS'])->first();
        if (time() > strtotime($goal->goal_end_date)) return;

        $goal->goal_status = 1;
        $goal->save();
    }

    public function taskSubmissionEventHandle($event)
    {
        $projectId = $event->data['projectId'];

        $task = Task::where(['project_id' => $projectId, 'board_column_id' => 9])->count();
        $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => 'TSM'])->first();

        if ($task != 1) return;

        $goal->goal_status = 1;
        $goal->save();
    }
}
