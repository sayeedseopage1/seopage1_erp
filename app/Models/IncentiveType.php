<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncentiveType extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'cash_value'
    ];

    public function incentiveCriterias()
    {
        return $this->hasMany(IncentiveCriteria::class, 'incentive_type_id');
    }
}
