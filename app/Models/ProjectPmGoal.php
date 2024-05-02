<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectPmGoalFile;

class ProjectPmGoal extends Model
{
    use HasFactory;

    static $goalCodes = [
        'regular' => [
            [
                'code' => 'DCS',
                'name' => 'Deliverables have to be signed off and all the tasks have to be created with proper planning.',
                'type' => 'deliverable_signed_by_client'
            ],
            [
                'code' => 'TSM',
                'name' => '1st submission has to be made.',
                'type' => '1st_task_submissino',
            ],
            [
                'code' => 'FPMR',
                'name' => 'At least 50% of the milestones have to be released.',
                'type' => '50%_milestone_value_released',
            ],
            [
                'code' => 'MPMR',
                'name' => 'At least 1 more milestone released between 12-15 days.',
                'type' => 'more_milestone_released',
            ],
            [
                'code' => 'MMPMR',
                'name' => 'At least 1 more milestone released between 12-15 days.',
                'type' => 'more_and_more_milestone_released',
            ],
            [
                'code' => 'OMMR',
                'name' => 'This 1 more milestone need to be released.',
                'type' => 'one_more_milestone_released',
            ],

        ],
        'priority' => [
            [
                'code' => 'DCS',
                'name' => 'Deliverables have to be signed off and all the tasks have to be created with proper planning.',
                'type' => 'deliverable_signed_by_client'
            ],
            [
                'code' => 'TSM',
                'name' => '1st submission has to be made.',
                'type' => '1st_task_submissino',
            ],
            [
                'code' => 'FMR',
                'name' => '1st milestone has to be released.',
                'type' => '1st_milestone_released',
            ],
            [
                'code' => 'MPMR',
                'name' => 'One more milestone has to be released between 7-12 th days.',
                'type' => 'more_milestone_released',
            ],
            [
                'code' => 'MMPMR',
                'name' => 'At least 1 more milestone released between 12-15 days.',
                'type' => 'more_and_more_milestone_released',
            ],
            [
                'code' => 'OMMR',
                'name' => 'At least 1 more milestone released.',
                'type' => 'one_more_milestone_released',
            ],
        ],
        'extraGoal' => [
            'code' => 'ERAG',
            'name' => 'Extra Remaining Amount Goal.',
            'type' => 'extra_reaming_amount_gaol',
        ]
    ];
}
