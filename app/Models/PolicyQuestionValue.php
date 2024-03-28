<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyQuestionValue extends Model
{
    use HasFactory;

    protected $fillable = ['question_id', 'value', 'deal_id'];
}
