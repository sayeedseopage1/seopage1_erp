<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factor extends Model
{
    use HasFactory;

    protected $fillable = [
        'criteria_id',
        'title',
        'project_type',
        'lower_limit',
        'upper_limit',
        'limit_type',
        'limit_unit',
        'lower_limit_condition',
        'upper_limit_condition',
        'limit_depend_on_models_and_fields',
        'point_type',
        'points',
        'point_depend_on_model',
        'point_depend_on_field',
        'status'
    ];

    public function criteria()
    {
        return $this->hasOne(Criteria::class, 'id', 'criteria_id');
    }
}
