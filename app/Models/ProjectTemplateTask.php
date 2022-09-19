<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ProjectTemplateTask
 *
 * @property int $id
 * @property string $heading
 * @property string|null $description
 * @property int $project_template_id
 * @property string $priority
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $project_template_task_category_id
 * @property-read mixed $icon
 * @property-read \App\Models\ProjectTemplate $projectTemplate
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateSubTask[] $subtasks
 * @property-read int|null $subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateTaskUser[] $users
 * @property-read int|null $users_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $usersMany
 * @property-read int|null $users_many_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereProjectTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereProjectTemplateTaskCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateTask whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectTemplateTask extends BaseModel
{

    public function projectTemplate(): BelongsTo
    {
        return $this->belongsTo(ProjectTemplate::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(ProjectTemplateTaskUser::class, 'project_template_task_id');
    }

    public function usersMany(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_template_task_users');
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(ProjectTemplateSubTask::class);
    }

}
