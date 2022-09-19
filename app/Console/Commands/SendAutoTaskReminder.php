<?php

namespace App\Console\Commands;

use App\Events\AutoTaskReminderEvent;
use App\Models\Setting;
use App\Models\Task;
use App\Models\TaskboardColumn;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendAutoTaskReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-auto-task-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send task reminders';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {

        $setting = Setting::first();

        $now = Carbon::now($setting->timezone);
        $completedTaskColumn = TaskboardColumn::completeColumn();

        if ($setting->before_days > 0) {
            $beforeDeadline = $now->clone()->subDays($setting->before_days)->format('Y-m-d');
            $tasks = Task::select('id')
                ->where('due_date', $beforeDeadline)
                ->where('board_column_id', '<>', $completedTaskColumn->id)
                ->get();

            foreach ($tasks as $task) {
                event(new AutoTaskReminderEvent($task));
            }
        }

        if ($setting->after_days > 0) {
            $now->clone()->addDays($setting->after_days)->format('Y-m-d');
        }
    }

}
