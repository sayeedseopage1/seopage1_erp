<?php

namespace App\Models;

use App\Builder\SalePolicyRuleBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesRiskPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'key',
        'type',
        'parent_id',
        'value_type',
        'value',
        'points',
        'comment'
    ];

    static $types = ['parent', 'greaterThan', 'lessThan', 'fixed', 'range', 'yesNo', 'list'];
    static $valueTypes = ['percentage', 'currency', 'hourly', 'days', 'countries'];

    static $keys =  [
        'clientCountry' => 'Client\'s Country',
        'projectDeadline' => 'Project Deadline',
        'projectBudget' => 'Project Budget',
    ];

    public function newEloquentBuilder($query)
    {
        return new SalePolicyRuleBuilder($query);
    }

}
