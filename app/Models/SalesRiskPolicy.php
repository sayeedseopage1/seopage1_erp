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

    static $valueTypes = [
        'percentage' => 'Percentage',
        'currency' => 'Currency',
        'hourly' => 'Hourly',
        'days' => 'Days',
        'countries' => 'Countries'
    ];

    static $keys =  [
        'hourlyRate' => 'Hourly Rate',
        'milestone' => 'Milestone',
        'threat' => 'Threat',
        'doneByElse' => 'Done By Someone Else',
        'routeWork' => 'Routine Work',
        'availableWeekend' => 'Available During The Weekend',
        'firstSubmission' => 'First Submission',
        'acceptPriceProposal' => "Accept Price Proposal",
        'clientCountry' => 'Client\'s Country',
        'projectDeadline' => 'Project Deadline',
        'projectBudget' => 'Project Budget',
    ];

    public function newEloquentBuilder($query)
    {
        return new SalePolicyRuleBuilder($query);
    }

}
