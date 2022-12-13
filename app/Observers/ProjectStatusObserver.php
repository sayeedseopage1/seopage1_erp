<?php

namespace App\Observers;

use App\Models\ProjectTimeLog;
use App\Models\ProjectStatus;
use App\Models\User;
use App\Models\UserProjectboardSetting;
use App\Models\Project;

class ProjectStatusObserver
{

    public function created(ProjectStatus $projectStatus)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $employees = User::allEmployees();

            foreach ($employees as $item) {
                UserProjectboardSetting::create([
                    'user_id' => $item->id,
                    'board_column_id' => $projectStatus->id
                ]);
            }
        }
    }

    public function deleting(ProjectStatus $projectStatus)
    {
        $defaultStatus = ProjectStatus::where('default', 1)->first();
        abort_403($defaultStatus->id == $projectStatus->id);

        Project::where('status_id', $projectStatus->id)->update(['status_id' => $defaultStatus->id]);;
    }

}
