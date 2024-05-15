<?php

namespace App\Models;

use App\Models\IncentiveFactor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IncentiveCriteria extends Model
{
    use HasFactory;

    protected $fillable = [
        'incentive_type_id',
        'title'
    ];

    public function incentiveFactors()
    {
        return $this->hasMany(IncentiveFactor::class, 'incentive_criteria_id');
    }
}
