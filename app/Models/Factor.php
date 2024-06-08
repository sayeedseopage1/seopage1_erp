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
        'lower_limit_top_range',
        'upper_limit_bottom_range',
        'limit_type',
        'limit_unit',
        'lower_limit_condition',
        'upper_limit_condition',
        'lower_limit_top_range_condition',
        'upper_limit_bottom_range_condition',
        'limit_depend_on_models_and_fields',
        'point_type',
        'points',
        'point_depend_on_model',
        'point_depend_on_field',
        'status'
    ];

    // protected $appends = ['calculated_points'];

    public function criteria()
    {
        return $this->hasOne(Criteria::class, 'id', 'criteria_id');
    }

    public function getCalculatedPoints($itemId)
    {
        if($this->point_type==1) return $this->points;
        $modelClass = $this->point_depend_on_model;
        $field_name = $this->point_depend_on_field;
        return number_format(($modelClass::find($itemId)->$field_name/100)*$this->points,2);
    }
}
