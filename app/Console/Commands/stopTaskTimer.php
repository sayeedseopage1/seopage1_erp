<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\TimelogEvent;
use App\Models\AttendanceSetting;
use App\Models\LogTimeFor;
use App\Models\ProjectTimeLog;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;

class stopTaskTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stop_task_timer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically stop task timer';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $logTimeFor = LogTimeFor::first();
        $setting = Setting::first();
        $admin = User::allAdmins()->first();

        $attendanceSetting = AttendanceSetting::first();

        if ($logTimeFor->auto_timer_stop == 'yes') {
            $activeTimers = ProjectTimeLog::with('user', 'activeBreak')
            ->whereNull('end_time')
            ->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->select('project_time_logs.*', 'users.name')
            ->get();

            foreach ($activeTimers as $value) {
                $endDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $value->start_time->format('Y-m-d').' '.$attendanceSetting->office_end_time);
                $endDateTime = $endDateTime->shiftTimezone($setting->timezone)->timestamp;

                if ($endDateTime < Carbon::now($setting->timezone)->timestamp) {
                    $value->end_time = Carbon::createFromTimestamp($endDateTime);
                    $value->edited_by_user = $admin->id;
                    
                    $diffHoursMin = $value->start_time->diff($value->end_time);
                    
                    $value->total_hours = $diffHoursMin->format('%H');
                    $value->total_minutes = $diffHoursMin->format('%i');
                    if ($value->save()) {
                        event(new TimelogEvent($value));
                        // Stop breaktime if active
                        /** @phpstan-ignore-next-line */
                        if (!is_null($value->activeBreak)) {
                            /** @phpstan-ignore-next-line */
                            $activeBreak = $value->activeBreak;
                            $activeBreak->end_time = $value->end_time;
                            $activeBreak->save();
                        }
                    }
                }
            }
        }
        
        return Command::SUCCESS;
    }
}
