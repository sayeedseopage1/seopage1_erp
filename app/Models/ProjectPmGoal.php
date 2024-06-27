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
                    'name' => 'Deliverables have to be signed off and first task have to be created with proper planning.',
                    'type' => 'deliverable_signed_by_client',
                    'complete' => 'Deliverables were signed off and first task was created with proper planning.',
                    'expire' => 'Deliverables were not signed off within the specified timeframe.'
                ],
                [
                    'code' => 'TSM',
                    'name' => '1st submission has to be made.',
                    'type' => '1st_task_submission',
                    'complete' => '1st submission was successfully made.',
                    'expire' => '1st submission was not made within the specified timeframe.'
                ],
                [
                    'code' => 'FPMR',
                    'name' => 'At least 50% of the milestones have to be released.',
                    'single' => 'One milestone has to be released.',
                    'type' => 'milestone_value_released',
                    'complete' => 'At least 50% of the milestones were successfully released.',
                    'expire' => 'At least 50% of the milestones were not released within the specified timeframe.'
                ],
                [
                    'code' => 'MPMR',
                    'name' => 'At least one more milestone released.',
                    'type' => 'more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],
                [
                    'code' => 'MMPMR',
                    'name' => 'At least 1 more milestone released.',
                    'type' => 'more_and_more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],
                [
                    'code' => 'OMMR',
                    'name' => 'This 1 more milestone need to be released.',
                    'type' => 'one_more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],

            ],
            'priority' => [
                [
                    'code' => 'DCS',
                    'name' => 'Deliverables have to be signed off and first task have to be created with proper planning.',
                    'type' => 'deliverable_signed_by_client',
                    'complete' => 'Deliverables were signed off and first task was created with proper planning.',
                    'expire' => 'Deliverables were not signed off within the specified timeframe.'
                ],
                [
                    'code' => 'TSM',
                    'name' => '1st submission has to be made.',
                    'type' => '1st_task_submission',
                    'complete' => '1st submission was successfully made.',
                    'expire' => '1st submission was not made within the specified timeframe.'
                ],
                [
                    'code' => 'FMR',
                    'name' => '1st milestone has to be released.',
                    'single' => 'One milestone has to be released.',
                    'type' => '1st_milestone_released',
                    'complete' => 'The first milestone was successfully released.',
                    'expire' => 'The first milestone was not released within the specified timeframe.'
                ],
                [
                    'code' => 'MPMR',
                    'name' => 'One more milestone has to be released.',
                    'type' => 'more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],
                [
                    'code' => 'MMPMR',
                    'name' => 'At least 1 more milestone released.',
                    'type' => 'more_and_more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],
                [
                    'code' => 'OMMR',
                    'name' => 'At least 1 more milestone released.',
                    'type' => 'one_more_milestone_released',
                    'complete' => 'At least one more milestone was successfully released.',
                    'expire' => 'At least one more milestone was not released within the specified timeframe.'
                ],
            ],
            'extraGoal' => [
                'code' => 'ERAG',
                'name' => 'Remaining amount has to be released.',
                'type' => 'reaming_amount_gaol',
            	'complete' => 'The remaining amount was successfully released.',
            	'expire' => 'The remaining amount was not released within the specified timeframe.'
            ],
        ],
        'hourly' => [
            'regular' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned',
                    'complete' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'expire' => 'At least one task was not assigned and 1 hour was not tracked within the specified timeframe.'
                ],
                [
                    'code' => '3HT',
                    'name' => 'At least 3 hours have been tracked.',
                    'type' => 'hours_3_tracked',
                    'complete' => 'At least 3 hours have been tracked.',
                    'expire' => 'At least 3 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '6HT',
                    'name' => 'At least 6 hours have been tracked.',
                    'type' => 'hours_6_tracked',
                    'complete' => 'At least 6 hours have been tracked.',
                    'expire' => 'At least 6 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '10HT',
                    'name' => 'At least 10 hours have been tracked.',
                    'type' => 'hours_10_tracked_between_6th_and_12th_days',
                    'complete' => 'At least 10 hours have been tracked',
                    'expire' => 'At least 10 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '10HTW',
                    'name' => 'At least 10 hours have been tracked during that week.',
                    'type' => 'hours_10_tracked_during_week',
                    'complete' => 'At least 10 hours have been tracked during this week.',
                    'expire' => 'At least 10 hours were not tracked during that week within the specified timeframe.'
                ],
            ],
            'priority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned',
                    'complete' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'expire' => 'At least one task was not assigned and 1 hour was not tracked within the specified timeframe.'
                ],
                [
                    'code' => '3HT',
                    'name' => 'At least 3 hours have been tracked.',
                    'type' => 'hours_3_tracked',
                    'complete' => 'At least 3 hours have been tracked.',
                    'expire' => 'At least 3 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '7HT',
                    'name' => 'At least 7 hours have been tracked.',
                    'type' => 'hours_7_tracked',
                    'complete' => 'At least 7 hours have been tracked.',
                    'expire' => 'At least 7 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '12HT',
                    'name' => 'At least 12 hours have been tracked.',
                    'type' => 'hours_12_tracked_between_6th_and_12th_days',
                    'complete' => 'At least 12 hours have been tracked.',
                    'expire' => 'At least 12 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '12HTW',
                    'name' => 'At least 12 hours have been tracked during that week.',
                    'type' => 'hours_12_tracked_during_week',
                    'complete' => 'At least 12 hours have been tracked during this week.',
                    'expire' => 'At least 12 hours were not tracked during that week within the specified timeframe.'
                ],
            ],
            'highPriority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned',
                    'complete' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'expire' => 'At least one task was not assigned and 1 hour was not tracked within the specified timeframe.'
                ],
                [
                    'code' => '4HT',
                    'name' => 'At least 4 hours have been tracked.',
                    'type' => 'hours_4_tracked',
                    'complete' => 'At least 4 hours have been tracked.',
                    'expire' => 'At least 4 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '8HT',
                    'name' => 'At least 8 hours have been tracked.',
                    'type' => 'hours_8_tracked',
                    'complete' => 'At least 8 hours have been tracked.',
                    'expire' => 'At least 8 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '15HT',
                    'name' => 'At least 15 hours have been tracked.',
                    'type' => 'hours_15_tracked_between_6th_and_12th_days',
                    'complete' => 'At least 15 hours have been tracked.',
                    'expire' => 'At least 15 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '15HTW',
                    'name' => 'At least 15 hours have been tracked during that week.',
                    'type' => 'hours_15_tracked_during_week',
                    'complete' => 'At least 15 hours have been tracked during this week.',
                    'expire' => 'At least 15 hours were not tracked during that week within the specified timeframe.'
                ],
            ],
            'topMostPriority' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned',
                    'complete' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'expire' => 'At least one task was not assigned and 1 hour was not tracked within the specified timeframe.'
                ],
                [
                    'code' => '5HT',
                    'name' => 'At least 5 hours have been tracked.',
                    'type' => 'hours_5_tracked',
                    'complete' => 'At least 5 hours have been tracked.',
                    'expire' => 'At least 5 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '8HT',
                    'name' => 'At least 8 hours have been tracked.',
                    'type' => 'hours_8_tracked',
                    'complete' => 'At least 8 hours have been tracked.',
                    'expire' => 'At least 8 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '15HT',
                    'name' => 'At least 15 hours have been tracked.',
                    'type' => 'hours_15_tracked_between_6th_and_12th_days',
                    'complete' => 'At least 15 hours have been tracked.',
                    'expire' => 'At least 15 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '15HTW',
                    'name' => 'At least 15 hours have been tracked during that week.',
                    'type' => 'hours_15_tracked_during_week',
                    'complete' => 'At least 15 hours have been tracked during this week.',
                    'expire' => 'At least 15 hours were not tracked during that week within the specified timeframe.'
                ],
            ],
            'criticallySensitive' => [
                [
                    'code' => 'HTA',
                    'name' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'type' => 'task_need_to_be_assigned',
                    'complete' => 'At least one task has been assigned and 1 hour has been tracked.',
                    'expire' => 'At least one task was not assigned and 1 hour was not tracked within the specified timeframe.'
                ],
                [
                    'code' => '5HT',
                    'name' => 'At least 5 hours have been tracked.',
                    'type' => 'hours_5_tracked',
                    'complete' => 'At least 5 hours have been tracked.',
                    'expire' => 'At least 5 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '10HT',
                    'name' => 'At least 10 hours have been tracked.',
                    'type' => 'hours_10_tracked',
                    'complete' => 'At least 10 hours have been tracked.',
                    'expire' => 'At least 10 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '18HT',
                    'name' => 'At least 18 hours have been tracked.',
                    'type' => 'hours_18_tracked_between_6th_and_12th_days',
                    'complete' => 'At least 18 hours have been tracked.',
                    'expire' => 'At least 18 hours were not tracked within the specified timeframe.'
                ],
                [
                    'code' => '18HTW',
                    'name' => 'At least 18 hours have been tracked during that week.',
                    'type' => 'hours_18_tracked_during_week',
                    'complete' => 'At least 18 hours have been tracked during this week.',
                    'expire' => 'At least 18 hours were not tracked during that week within the specified timeframe.'
                ],
            ],
        ],
        'upsell' => [
            'code' => 'UOMMR',
            'name' => 'This upsold milestone has to be released.',
            'type' => 'upsell_one_more_milestone_released',
            'complete' => 'The upsold milestone has been successfully released.',
            'expire' => 'The upsold milestone was not released within the specified timeframe.'
        ],
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
