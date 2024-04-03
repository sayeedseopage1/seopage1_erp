<?php

namespace App\Models;

use App\Builder\SalePolicyQuestionBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesPolicyQuestion extends Model
{
    use HasFactory;

    static $types = [
        'yesNo' => 'Yes/No',
        'numeric' => 'Numeric',
        'list' => 'List',
        'text' => 'Text',
        'longText' => 'Long Text'
    ];
    static $keys =  [
        'hourlyRate' => 'Hourly Rate',
        'milestore' => 'Milestone',
        'threat' => 'Threat',
        'doneByElse' => 'Done By Someone Else',
        'routeWork' => 'Routine Work',
        'availableWeekend' => 'Available During The Weekend',
        'firstSubmisstoin' => 'First Submission',
        'acceptPriceProposal' => "Accept Price Proposal"
    ];

    protected $fillable = [
        'title',
        'key',
        'type',
        'value',
        'parent_id',
        'sequence',
        'placeholder',
        'policy_id',
        'status'
    ];

    public function newEloquentBuilder($query)
    {
        return new SalePolicyQuestionBuilder($query);
    }
}
