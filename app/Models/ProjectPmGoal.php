<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectPmGoalFile;

class ProjectPmGoal extends Model
{
    use HasFactory;
    public function projectGoalFiles(){
        return $this->hasMany(ProjectPmGoalFile::class,'goal_id','id');
    }
}
