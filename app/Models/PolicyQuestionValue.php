<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyQuestionValue extends Model
{
    use HasFactory;

    protected $fillable = [ 'deal_id', 'values', 'question_list'];
}
