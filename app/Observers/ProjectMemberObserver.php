<?php

namespace App\Observers;

use App\Models\Project;
use App\Models\Notification;
use App\Models\ProjectMember;
use App\Models\EmployeeDetails;
use App\Models\ProjectActivity;
use App\Events\NewProjectMemberEvent;

class ProjectMemberObserver
{

    public function saving(ProjectMember $projectMember)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $projectMember->last_updated_by = user()->id;
        }
        
    }

    public function creating(ProjectMember $projectMember)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $projectMember->added_by = user()->id;
            $member = EmployeeDetails::where('user_id', $projectMember->user_id)->first();

            if (!is_null($member)) {
                $projectMember->hourly_rate = (!is_null($member->hourly_rate) ? $member->hourly_rate : 0);

                $activity = new ProjectActivity();
                $activity->project_id = $projectMember->project_id;
                $activity->activity = mb_ucwords($member->user->name) . ' ' . __('messages.isAddedAsProjectMember');
                $activity->save();
            }
        }
    }

    public function created(ProjectMember $member)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (user() && $member->user_id != user()->id) {
                event(new NewProjectMemberEvent($member));
            }
        }
    }

    public function deleting(ProjectMember $projectMember)
    {
        $notifiData = ['App\Notifications\NewProjectMember'];
        Notification::whereIn('type', $notifiData)
            ->whereNull('read_at')
            ->where(function ($q) use ($projectMember) {
                $q->where('data', 'like', '{"member_id":'.$projectMember->id.',%');
            })->delete();

    }

}
