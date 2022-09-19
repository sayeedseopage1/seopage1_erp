<?php

namespace App\Console\Commands;

use App\Events\TaskEvent;
use App\Models\Setting;
use App\Models\Task;
use Illuminate\Console\Command;

class AutoCreateRecurringTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recurring-task-create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create recurring tasks';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $settings = Setting::first();
        $now = now($settings->timezone);

        $repeatedTasks = Task::withCount('recurrings')
            ->with('labels', 'users')
            ->where('repeat', 1)
            ->whereDate('start_date', '<', $now->toDateString())
            ->where('repeat_complete', 0)
            ->get();

        $repeatedTasks->each(function ($task) use ($now, $settings) {

            if ($task->repeat_cycles == -1 || $task->recurrings_count < ($task->repeat_cycles - 1)) { // Subtract 1 to include original task

                $startDate = $task->start_date->copy();
                $endDate = (!is_null($task->due_date)) ? $task->due_date->copy() : null;
                $repeatCount = $task->repeat_count + ($task->recurrings_count * $task->repeat_count);
                $repeatStartDate = null;
                $repeatDueDate = null;

                if ($task->repeat_type == 'day' && $now->toDateString() == $startDate->copy()->addDays($repeatCount)->toDateString()) {
                    $repeatStartDate = $startDate->copy()->addDays($repeatCount);
                    $repeatDueDate = (!is_null($endDate)) ? $endDate->addDays($repeatCount) : null;

                } elseif ($task->repeat_type == 'week' && $now->toDateString() == $startDate->copy()->addWeeks($repeatCount)->toDateString()) {
                    $repeatStartDate = $startDate->copy()->addWeeks($repeatCount);
                    $repeatDueDate = (!is_null($endDate)) ? $endDate->addWeeks($repeatCount) : null;

                } elseif ($task->repeat_type == 'month' && $now->toDateString() == $startDate->copy()->addMonths($repeatCount)->toDateString()) {
                    $repeatStartDate = $startDate->copy()->addMonths($repeatCount);
                    $repeatDueDate = (!is_null($endDate)) ? $endDate->addMonths($repeatCount) : null;

                } elseif ($task->repeat_type == 'year' && $now->toDateString() == $startDate->copy()->addYears($repeatCount)->toDateString()) {
                    $repeatStartDate = $startDate->copy()->addYears($repeatCount);
                    $repeatDueDate = (!is_null($endDate)) ? $endDate->addYears($repeatCount) : null;
                }

                if (isset($repeatStartDate) || isset($repeatDueDate)) {
                    $this->createTask($task, $repeatStartDate, $repeatDueDate, $settings->default_task_status);

                    // Mark repeat complete if cycles are complete
                    if ($task->repeat_cycles != -1 && ($task->recurrings_count + 2) == $task->repeat_cycles) { // Add 2 to include newly created task and the original task
                        $task->repeat_complete = 1;
                        $task->save();
                    }

                }

            }
        });
    }

    protected function createTask($task, $startDate, $endDate, $taskStatus)
    {
        $newTask = new Task();
        $newTask->heading = $task->heading;
        $newTask->description = $task->description;
        $newTask->start_date = $startDate->format('Y-m-d');
        $newTask->due_date = (!is_null($endDate)) ? $endDate->format('Y-m-d') : null;
        $newTask->project_id = $task->project_id;
        $newTask->task_category_id = $task->category_id;
        $newTask->priority = $task->priority;
        $newTask->board_column_id = $taskStatus;
        $newTask->recurring_task_id = $task->id;
        $newTask->is_private = $task->is_private;
        $newTask->billable = $task->billable;
        $newTask->estimate_hours = $task->estimate_hours;
        $newTask->estimate_minutes = $task->estimate_minutes;
        $newTask->save();

        $newTask->users()->sync($task->users->pluck('id')->toArray());
        $newTask->labels()->sync($task->labels->pluck('id')->toArray());

        foreach ($newTask->users as $key => $user) {
            event(new TaskEvent($newTask, $user, 'NewTask'));
        }

    }

}
