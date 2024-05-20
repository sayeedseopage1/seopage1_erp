<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectPmGoalFile;

class ProjectPmGoal extends Model
{
    use HasFactory;

    static $goalCodes = [
        'fixed' => [
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
                    'single' => 'One milestone has to be released.',
                    'type' => 'milestone_value_released',
                ],
                [
                    'code' => 'MPMR',
                    'name' => 'At least 1 more milestone released.',
                    'type' => 'more_milestone_released',
                ],
                [
                    'code' => 'MMPMR',
                    'name' => 'At least 1 more milestone released.',
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
                    'single' => 'One milestone has to be released.',
                    'type' => '1st_milestone_released',
                ],
                [
                    'code' => 'MPMR',
                    'name' => 'One more milestone has to be released.',
                    'type' => 'more_milestone_released',
                ],
                [
                    'code' => 'MMPMR',
                    'name' => 'At least 1 more milestone released.',
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
                'name' => 'Remaining amount has to be released.',
                'type' => 'reaming_amount_gaol',
            ],
        ],
        'hourly' => [
            'regular' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned'
                ],
                [
                    'code' => '3HT',
                    'name' => 'At least 3 hours have been tracked.',
                    'type' => 'hours_3_tracked',
                ],
                [
                    'code' => '6HT',
                    'name' => 'At least 6 hours have been tracked.',
                    'type' => 'hours_6_tracked',
                ],
                [
                    'code' => '10HT',
                    'name' => 'At least 10 hours have been tracked between 6th and 12th days.',
                    'type' => 'hours_10_tracked_between_6th_and_12th_days',
                ],
                [
                    'code' => '10HTW',
                    'name' => 'At least 10 hours have been tracked during that week.',
                    'type' => 'hours_10_tracked_during_week',
                ],
            ],
            'priority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned'
                ],
                [
                    'code' => '3HT',
                    'name' => 'At least 3 hours have been tracked.',
                    'type' => 'hours_3_tracked',
                ],
                [
                    'code' => '7HT',
                    'name' => 'At least 7 hours have been tracked.',
                    'type' => 'hours_7_tracked',
                ],
                [
                    'code' => '12HT',
                    'name' => 'At least 12 hours have been tracked between 6th and 12th days.',
                    'type' => 'hours_12_tracked_between_6th_and_12th_days',
                ],
                [
                    'code' => '12HTW',
                    'name' => 'At least 12 hours have been tracked during that week.',
                    'type' => 'hours_12_tracked_during_week',
                ],
            ],
            'highPriority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned'
                ],
                [
                    'code' => '4HT',
                    'name' => 'At least 4 hours have been tracked.',
                    'type' => 'hours_4_tracked',
                ],
                [
                    'code' => '8HT',
                    'name' => 'At least 8 hours have been tracked.',
                    'type' => 'hours_8_tracked',
                ],
                [
                    'code' => '15HT',
                    'name' => 'At least 15 hours have been tracked between 6th and 12th days.',
                    'type' => 'hours_15_tracked_between_6th_and_12th_days',
                ],
                [
                    'code' => '15HTW',
                    'name' => 'At least 15 hours have been tracked during that week.',
                    'type' => 'hours_15_tracked_during_week',
                ],
            ],
            'topMostPriority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned'
                ],
                [
                    'code' => '5HT',
                    'name' => 'At least 5 hours have been tracked.',
                    'type' => 'hours_5_tracked',
                ],
                [
                    'code' => '8HT',
                    'name' => 'At least 8 hours have been tracked.',
                    'type' => 'hours_8_tracked',
                ],
                [
                    'code' => '15HT',
                    'name' => 'At least 15 hours have been tracked between 6th and 12th days.',
                    'type' => 'hours_15_tracked_between_6th_and_12th_days',
                ],
                [
                    'code' => '15HTW',
                    'name' => 'At least 15 hours have been tracked during that week.',
                    'type' => 'hours_15_tracked_during_week',
                ],
            ],
            'criticallySensitive' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned'
                ],
                [
                    'code' => '5HT',
                    'name' => 'At least 5 hours have been tracked.',
                    'type' => 'hours_5_tracked',
                ],
                [
                    'code' => '10HT',
                    'name' => 'At least 10 hours have been tracked.',
                    'type' => 'hours_10_tracked',
                ],
                [
                    'code' => '18HT',
                    'name' => 'At least 18 hours have been tracked between 6th and 12th days.',
                    'type' => 'hours_18_tracked_between_6th_and_12th_days',
                ],
                [
                    'code' => '18HTW',
                    'name' => 'At least 18 hours have been tracked during that week.',
                    'type' => 'hours_18_tracked_during_week',
                ],
            ],
        ],
        'upsell' => [
            'code' => 'OMMR',
            'name' => 'At least 1 more milestone released',
            'type' => 'one_more_milestone_released',
        ],
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
