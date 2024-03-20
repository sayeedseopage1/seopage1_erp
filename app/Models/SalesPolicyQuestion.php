<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesPolicyQuestion extends Model
{
    use HasFactory;

    static $questionTypes = ['yesNo', 'numeric', 'list', 'text', 'longText'];

    protected $fillable = [
        'title',
        'type',
        'parent_id',
        'rule_list',
        'placeholder',
        'policy_id',
    ];
}
