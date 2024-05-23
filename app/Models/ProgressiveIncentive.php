<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressiveIncentive extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'pm_id',
        'incentive_factor_id',
        'acquired_value',
        'incentive_amount_type',
        'incentive_amount'
    ];
}
