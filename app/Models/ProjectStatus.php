<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\UserLeadboardSetting;


class ProjectStatus extends Model
{
    use HasFactory;
    protected $table = 'project_statuses';

    public function projects()
    {
        return $this->hasMany(Project::class, 'status_id')->orderBy('column_priority');
    }

    public function userSetting()
    {
        return $this->hasOne(UserLeadboardSetting::class, 'board_column_id')->where('user_id', user()->id);
    }
}
