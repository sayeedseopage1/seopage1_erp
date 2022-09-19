<?php namespace App\Models;

use App\Observers\PinnedObserver;
use App\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Pinned
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Project|null $project
 * @property-read \App\Models\Task|null $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pinned whereUserId($value)
 * @mixin \Eloquent
 */
class Pinned extends BaseModel
{
    protected $table = 'pinned';
    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

}
