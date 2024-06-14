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

    protected $fillable = [
        'title',
        'key',
        'type',
        'value',
        'parent_id',
        'sequence',
        'placeholder',
        'policy_id',
        'status',
        'comment'
    ];

    public function newEloquentBuilder($query)
    {
        return new SalePolicyQuestionBuilder($query);
    }
}
