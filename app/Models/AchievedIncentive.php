<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchievedIncentive extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'user_id',
        'incentive_type_id',
        'incentive_point',
        'cash_value',
        'total_cash_amount'
    ];

    public function projectManager()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function incentiveType()
    {
        return $this->hasOne(IncentiveType::class, 'id', 'incentive_type_id');
    }
}
