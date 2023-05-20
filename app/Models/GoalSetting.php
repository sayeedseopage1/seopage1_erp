<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoalSetting extends Model
{
    use HasFactory;

    public function goal()
    {
        return $this->belongsTo(Seopage1Team::class, 'team_id');
    }
}
