<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncentiveFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'incentive_criteria_id',
        'lower_limit',
        'upper_limit',
        'incentive_amount_type',
        'incentive_amount'
    ];
}
