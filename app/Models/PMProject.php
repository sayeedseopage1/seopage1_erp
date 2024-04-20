<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMProject extends Model
{
    use HasFactory;
    protected $table = 'p_m_projects';
    protected $guarded =[];

    protected static function booted()
    {
        static::creating(function ($pm_project) {
            $pm_project->project_award_time_platform = Deal::find($pm_project->deal_id)->award_time;
        });
    }
}
