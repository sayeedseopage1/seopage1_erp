<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helper\ProjectManagerPointLogic;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProjectPmGoal extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($item) {
            if ($item->isDirty('expired_status') && $item->expired_status == 1) {
                $comparableValue = $item->project_category == 'Regular' ? 1 : ($item->project_category == 'Priority' ? 2 : ($item->project_category == 'High-priority' ? 3 : ($item->project_category == 'Top most priority' ? 4 : ($item->project_category == 'Critically sensitive' ? 5 : 0))));
            
                $project = Project::with('client')->find($item->project_id);
                $activity = 'You missed a goal in ('.$item->project_category.') project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a>!';

                // Project Manager Point Distribution ( PM goals )
                ProjectManagerPointLogic::distribute(15, $item->project_id, $comparableValue, null, $activity);
            }
        });
    }
}
