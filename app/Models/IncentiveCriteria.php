<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncentiveCriteria extends Model
{
    use HasFactory;

    protected $fillable = [
        'incentive_type_id',
        'title'
    ];
}
