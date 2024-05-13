<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity',
        'project_id',
        'gained_as',
        'points',
        'total_points_lost',
        'total_points_earn',
        'total_points_redeem',
        'total_points_void',
        'bonus_type',
        'type',
        'factor_id'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function project()
    {
        return $this->hasOne(Project::class, 'id', 'project_id');
    }

    public function factor()
    {
        return $this->hasOne(Factor::class, 'id', 'factor_id');
    }
}
