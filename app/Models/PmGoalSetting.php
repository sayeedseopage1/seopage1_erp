<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PmGoalSetting extends Model
{
    use HasFactory;
    protected $fillable = ['initial_value', 'end_value', 'category', 'project_type'];

    public static $initialValues = [
        // fixed
        [
            'initial_value' => 0,
            'end_value' => 500,
            'category' => 'regular',
            'project_type' => 'fixed'
        ],
        [
            'initial_value' => 501,
            'end_value' => 1000,
            'category' => 'priority',
            'project_type' => 'fixed'
        ],
        [
            'initial_value' => 1001,
            'end_value' => 1700,
            'category' => 'highPriority',
            'project_type' => 'fixed'
        ],
        [
            'initial_value' => 1701,
            'end_value' => 2500,
            'category' => 'topMostPriority',
            'project_type' => 'fixed'
        ],
        [
            'initial_value' => 2501,
            'end_value' => 100000,
            'category' => 'criticallySensitive',
            'project_type' => 'fixed'
        ],

        // hourly
        [
            'initial_value' => 0,
            'end_value' => 20,
            'category' => 'regular',
            'project_type' => 'hourly'
        ],
        [
            'initial_value' => 21,
            'end_value' => 30,
            'category' => 'priority',
            'project_type' => 'hourly'
        ],
        [
            'initial_value' => 31,
            'end_value' => 40,
            'category' => 'highPriority',
            'project_type' => 'hourly'
        ],
        [
            'initial_value' => 41,
            'end_value' => 50,
            'category' => 'topMostPriority',
            'project_type' => 'hourly'
        ],
        [
            'initial_value' => 51,
            'end_value' => 5000,
            'category' => 'criticallySensitive',
            'project_type' => 'hourly'
        ],
    ];
}
