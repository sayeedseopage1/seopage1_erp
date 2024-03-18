<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesRiskPolicy extends Model
{
    use HasFactory;

    protected $fillable = ['title','department','type', 'parent_id', 'value_type', 'value', 'points', 'comment'];

    static $types = ['parent', 'greaterThan', 'lessThan', 'fixed', 'range', 'yesNo', 'list'];
    static $valueTypes = ['percentage', 'currency', 'hourly', 'days', 'countries'];
}
