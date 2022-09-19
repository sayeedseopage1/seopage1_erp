<?php

namespace App\Models;

use App\Observers\TaskUserObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\TaskUser
 *
 * @property int $id
 * @property int $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Task $task
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskUser whereUserId($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 */
class TaskUser extends Pivot
{
    use Notifiable;

    protected $guarded = ['id'];
    protected $table = 'task_users';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

}
