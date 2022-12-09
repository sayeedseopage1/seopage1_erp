<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class ProjectStatusSetting extends Model
{
    use HasFactory;

    protected $fillable = ['status_name', 'color', 'status'];
    protected $table = 'lead_status';

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'status_id')->orderBy('column_priority');
    }

    public function userSetting(): HasOne
    {
        return $this->hasOne(UserProjectboardSetting::class, 'board_column_id')->where('user_id', user()->id);
    }
}
