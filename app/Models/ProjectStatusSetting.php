<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Project;
use App\Models\UserProjectBoardSetting;


class ProjectStatusSetting extends Model
{
    use HasFactory;


    protected $table = 'project_status_settings';

    public function projects()
    {
        return $this->hasMany(Project::class, 'status_id')->orderBy('column_priority');
    }

    public function userSetting()
    {
        return $this->hasOne(UserProjectBoardSetting::class, 'board_column_id')->where('user_id', user()->id);
    }
}
