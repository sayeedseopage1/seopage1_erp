<?php

namespace App\Observers;

use App\Models\TaskboardColumn;
use App\Models\User;
use App\Models\UserTaskboardSetting;

class TaskBoardColumnObserver
{

    public function created(TaskboardColumn $taskboardColumn)
    {
        if (user()) {
            $employees = User::allEmployees();

            foreach ($employees as $item) {
                UserTaskboardSetting::create([
                    'user_id' => $item->id,
                    'board_column_id' => $taskboardColumn->id
                ]);
            }
        }
    }

}
