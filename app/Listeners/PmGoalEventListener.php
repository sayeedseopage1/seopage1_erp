<?php

namespace App\Listeners;

use App\Events\PmGoalEvent;
use App\Models\Invoice;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\ProjectDeliverable;
use App\Models\ProjectMilestone;
use App\Models\ProjectPmGoal;
use App\Models\ProjectTimeLog;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class PmGoalEventListener
{
    protected $type = [
        'new_task_added',
        'task_submission_made',
        'milestone_invoice_added',
        'task_time_stopped'
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
            case 'milestone_invoice_added':
                self::milestoneInvoiceAddedEventHandle($event);
                break;
            case 'task_time_stopped':
                self::hourlyGoalCompletion($event);
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

        // $task = Task::where(['project_id' => $projectId, 'board_column_id' => 9])->count();
        // if ($task != 1) return;

        $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => 'TSM'])->first();

        if (time() > strtotime($goal->goal_end_date)) return;

        $goal->goal_status = 1;
        $goal->save();
    }

    private function milestoneInvoiceAddedEventHandle($event)
    {
        $invoice = $event->data['invoice'];
        if ($invoice->status != 'paid') return;

        $project = Project::find($invoice->project_id);

        // initial milestones
        $paidAmount = Invoice::where(['project_id' => $project->id, 'status' => 'paid'])->sum('total');
        $projectAccept = PMProject::where('project_id', $project->id)->first();
        $milestones = ProjectMilestone::from('project_milestones as mile')->join('invoices as in', 'in.milestone_id', 'mile.id')
            ->select('mile.*', 'in.status')
            ->where('mile.project_id', $project->id)->where('mile.created_at', '<=', $projectAccept->created_at);

        $milestoneSum = $milestones->sum('actual_cost');
        $milestoneCount = $milestones->count();
        $paidMilestoneCount = $milestones->where(['in.status' => 'paid'])->count();

        $goal = ProjectPmGoal::where('project_id', $project->id)->first();
        if ($goal->project_type == 'fixed' && strtolower($goal->project_category) == 'regular') {
            self::fixedRegularPmGoalCompletion($project, $invoice, $milestoneSum, $paidAmount, $milestoneCount, $paidMilestoneCount);
            return;
        } else if ($goal->project_type == 'fixed') {
            self::fixedPriorityPmGoalCompletion($project, $invoice, $paidMilestoneCount, $milestoneCount, $paidAmount);
            return;
        }
    }

    private function fixedRegularPmGoalCompletion($project, $invoice, $milestoneSum, $paidAmount, $milestoneCount, $paidMilestoneCount)
    {
        $projectBudget = $project->deal->actual_amount;

        if ($milestoneSum >= $paidAmount && $paidMilestoneCount >= ($milestoneCount / 2)) {
            $goal = ProjectPmGoal::whereIn('goal_code', ['FPMR', 'MPMR', 'MMPMR', 'OMMR'])->where(['project_id' => $project->id, 'goal_status' => 0])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        } else if ($projectBudget > $milestoneSum && $projectBudget == $paidAmount) {
            $goal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'ERAG'])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        } else if ($projectBudget < $paidAmount) {
            // extra goal fulfilled
            $extraGoal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'ERAG', 'goal_status' => 0])->first();
            $extraGoal->goal_status = 1;
            $extraGoal->save();

            $milestone = ProjectMilestone::where(['id' => $invoice->milestone_id, 'parent_id' => null, 'status' => 'complete'])->first();
            if (!$milestone) return;

            $goal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'UOMMR'])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        }
    }

    private function fixedPriorityPmGoalCompletion($project, $invoice, $paidMilestoneCount, $milestoneCount, $paidAmount)
    {
        $projectBudget = $project->deal->actual_amount;

        if ($paidMilestoneCount == 1) {
            $goal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'FMR', 'goal_status' => 0])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        } else if ($paidMilestoneCount > 1 && $milestoneCount < $paidMilestoneCount) {
            $goal = ProjectPmGoal::whereIn('goal_code', ['MPMR', 'MMPMR', 'OMMR'])->where(['project_id' => $project->id, 'goal_status' => 0])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        } else if ($projectBudget < $paidAmount) {
            $extraGoal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'ERAG', 'goal_status' => 0])->first();
            $extraGoal->goal_status = 1;
            $extraGoal->save();

            $milestone = ProjectMilestone::where(['id' => $invoice->milestone_id, 'parent_id' => null, 'status' => 'complete'])->first();
            if (!$milestone) return;

            $goal = ProjectPmGoal::where(['project_id' => $project->id, 'goal_code' => 'UOMMR'])->first();
            if (!$goal || time() > strtotime($goal->goal_end_date)) return;

            $goal->goal_status = 1;
            $goal->save();
        }
    }

    private function hourlyGoalCompletion($event)
    {
        $projectId = $event->data['projectId'];
        $totalMinutes = ProjectTimeLog::where('project_id', $projectId)->sum('total_minutes');
        // dd($totalMinutes);

        if ($totalMinutes < 60) return;

        // find first goal
        $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => 'HTA'])->first();
        if (!$goal) return;

        if ($goal->goal_status == 0 && time() <= strtotime($goal->goal_end_date)) {
            $goal->goal_status = 1;
            $goal->save();
        }

        if ($totalMinutes < 3 * 60) return;

        // 2nd goal completion ----------------------- //
        $projectPriority = $goal->project_category;

        if ($projectPriority == 'regular' || $projectPriority == 'priority') {
            $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => '3HT', 'goal_status' => 0])->first();
            if ($goal && time() <= strtotime($goal->goal_end_date)) {
                $goal->goal_status = 1;
                $goal->save();
            }

            $totalMinutes -= (3 * 60);
        } else if ($totalMinutes >= 4 * 60 && $totalMinutes < 5 * 60 && $projectPriority == 'highPriority') {
            $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => '4HT', 'goal_status' => 0])->first();
            if ($goal && time() <= strtotime($goal->goal_end_date)) {
                $goal->goal_status = 1;
                $goal->save();
            }
            $totalMinutes -= 4 * 60;
        } else if ($totalMinutes >= 5 * 60 && $projectPriority == 'topMostPriority') {
            $goal = ProjectPmGoal::where(['project_id' => $projectId, 'goal_code' => '5HT', 'goal_status' => 0])->first();
            if ($goal && time() <= strtotime($goal->goal_end_date)) {
                $goal->goal_status = 1;
                $goal->save();
            }
            $totalMinutes -= 5 * 60;
        } else return;
        // 2nd goal completion end ----------------------- //

        // find next goal
        $goals = ProjectPmGoal::where(['project_id' => $projectId])->whereNotIn('goal_code', ['HTA', '3HT', '4HT', '5HT'])->get();
        // dd($totalMinutes);
        if (count($goals) < 1) return;
        // $total = 0;
        // $dIds = [];
        foreach ($goals as $item) {

            $data = json_decode($item->data);
            if (!isset($data->deliverable_id)) return;

            if (!$deliverable = ProjectDeliverable::find($data->deliverable_id)) return;

            // check deliverable time exceeded
            if ($item->goal_status == 0 && time() <= strtotime($item->goal_end_date)) {
                // dd($dIds, $total, $totalMinutes, ($deliverable->estimation_time * 60));
                if ($totalMinutes >= ($deliverable->estimation_time * 60)) {
                    $item->goal_status = 1;
                    $item->save();
                    break;
                } else return;
            } else {
                // $total += $deliverable->estimation_time;
                // $dIds[] = [$deliverable->id => $deliverable->estimation_time ];
                $totalMinutes -= ($deliverable->estimation_time * 60);
            }
        }
    }
}
