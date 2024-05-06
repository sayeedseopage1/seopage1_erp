<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Helper\ProjectManagerPointLogic;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskRevision extends Model
{
    use HasFactory;

    protected static function boot(){
        parent::boot();

        static::created(function($item){
            if(($item->final_responsible_person && $item->final_responsible_person == 'PM') || (in_array($item->dispute_between, ['PLR', 'CPR', 'SPR']) && ($item->raised_by_percent || $item->raised_against_percent))){
                $project_category = ProjectPmGoal::where('project_id', $item->project_id)->first()->project_category;
                $comparableValue = $project_category == 'Regular' ? 1 : ($project_category == 'Priority' ? 2 : ($project_category == 'High-priority' ? 3 : ($project_category == 'Top most priority' ? 4 : ($project_category == 'Critically sensitive' ? 5 : 0))));
                
                // Project Manager Point Distribution ( For every revision due to Pm's own fault )
                ProjectManagerPointLogic::distribute(16, $item->project_id, $comparableValue);
            }
        });

        static::updated(function($item){
            if(($item->isDirty('final_responsible_person') && $item->final_responsible_person && $item->final_responsible_person == 'PM') || (($item->isDirty('raised_by_percent') || $item->isDirty('raised_against_percent')) && in_array($item->dispute_between, ['PLR', 'CPR', 'SPR']) && ($item->raised_by_percent || $item->raised_against_percent))){
                $project_category = ProjectPmGoal::where('project_id', $item->project_id)->first()->project_category;
                $comparableValue = $project_category == 'Regular' ? 1 : ($project_category == 'Priority' ? 2 : ($project_category == 'High-priority' ? 3 : ($project_category == 'Top most priority' ? 4 : ($project_category == 'Critically sensitive' ? 5 : 0))));
                
                // Project Manager Point Distribution ( For every revision due to Pm's own fault )
                ProjectManagerPointLogic::distribute(16, $item->project_id, $comparableValue); 
            }
        });
    }
}
