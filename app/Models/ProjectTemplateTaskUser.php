<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProjectTemplateTaskUser
 *
 * @property int $id
 * @property int $project_template_task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProjectTemplateTask $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereProjectTemplateTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTaskUser whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectTemplateTaskUser extends BaseModel
{
    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(ProjectTemplateTask::class, 'project_template_task_id');
    }

}
