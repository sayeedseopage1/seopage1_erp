<?php

namespace App\Observers;

use App\Events\TimelogEvent;
use App\Models\EmployeeDetails;
use App\Models\LogTimeFor;
use App\Models\ProjectMember;
use App\Models\ProjectTimeLog;

class ProjectTimelogObserver
{

    public function saving(ProjectTimeLog $projectTimeLog)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $projectTimeLog->last_updated_by = user()->id;
        }

        if (!isRunningInConsoleOrSeeding()) {
            $userId = (request()->has('user_id') ? request('user_id') : $projectTimeLog->user_id);
            $projectId = request('project_id');

            if ($projectId != '') {
                $member = ProjectMember::where('user_id', $userId)->where('project_id', $projectId)->first();
                $projectTimeLog->hourly_rate = ($member && !is_null($member->hourly_rate) ? $member->hourly_rate : 0);
            }
            else {
                $task = $projectTimeLog->task;

                if (!is_null($task) && !is_null($task->project_id)) {
                    $projectId = $task->project_id;
                }

                $member = EmployeeDetails::where('user_id', $userId)->first();
                $projectTimeLog->hourly_rate = (!is_null($member->hourly_rate) ? $member->hourly_rate : 0);
            }

            $minuteRate = $projectTimeLog->hourly_rate / 60;
            $totalMinutes = $projectTimeLog->total_minutes;
            $breakMinutes = $projectTimeLog->breaks()->sum('total_minutes');
            $earning = round(($totalMinutes - $breakMinutes) * $minuteRate, 2); /* @phpstan-ignore-line */
            $projectTimeLog->earnings = $earning;

            if($projectId != '') {
                $projectTimeLog->project_id = $projectTimeLog->task->project_id;
            }

            event(new TimelogEvent($projectTimeLog));

        }
    }

    public function creating(ProjectTimeLog $projectTimeLog)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $projectTimeLog->added_by = user()->id;
        }

        if (!isRunningInConsoleOrSeeding()) {
            $timeLogSetting = LogTimeFor::first();

            if ($timeLogSetting->approval_required) {
                $projectTimeLog->approved = 0;
            }
        }
    }

}
