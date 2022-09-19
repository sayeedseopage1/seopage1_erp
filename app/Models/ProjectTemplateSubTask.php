<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProjectTemplateSubTask
 *
 * @property int $id
 * @property int $project_template_task_id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\ProjectTemplateTask $task
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereProjectTemplateTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateSubTask whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectTemplateSubTask extends BaseModel
{
    protected $dates = ['start_date','due_date'];

    public function task(): BelongsTo
    {
        return $this->belongsTo(ProjectTemplateTask::class);
    }

}
