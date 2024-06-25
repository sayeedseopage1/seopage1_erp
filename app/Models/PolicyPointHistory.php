<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyPointHistory extends Model
{
    use HasFactory;

    protected $fillable = ['deal_id', 'policy', 'points', 'point_report'];
}
