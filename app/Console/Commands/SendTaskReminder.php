<?php

namespace App\Console\Commands;

use App\Events\TaskReminderEvent;
use App\Models\Setting;
use App\Models\Task;
use App\Models\TaskboardColumn;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendTaskReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-task-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send task reminders';

    /**
     *
     */
    public function handle()
    {
        $company = Setting::first();

        $now = Carbon::now($company->timezone);

        if ($company->before_days > 0) {
            $beforeDeadline = $now->clone()->subDays($company->before_days)->format('Y-m-d');
            $this->tasks($beforeDeadline);
        }

        if ($company->after_days > 0) {
            $afterDeadline = $now->clone()->addDays($company->after_days)->format('Y-m-d');
            $this->tasks($afterDeadline);
        }

        if ($company->on_deadline) {
            $onDeadline = $now->clone()->format('Y-m-d');
            $this->tasks($onDeadline);
        }

    }

    private function tasks($dueDate)
    {
        $completedTaskColumn = TaskboardColumn::completeColumn();
        $tasks = Task::select('id')
            ->where('due_date', $dueDate)
            ->where('board_column_id', '<>', $completedTaskColumn->id)
            ->get();

        foreach ($tasks as $task) {
            event(new TaskReminderEvent($task));
        }
    }

}
