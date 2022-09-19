<?php

namespace App\Models;

use App\Observers\TaskCommentObserver;
use App\Observers\TaskNoteObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TaskNote
 *
 * @property int $id
 * @property int $task_id
 * @property int|null $user_id
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskNote whereUserId($value)
 * @mixin \Eloquent
 */
class TaskNote extends BaseModel
{

    protected $with = ['user'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

}
