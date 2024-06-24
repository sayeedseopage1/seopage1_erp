<?php

namespace App\Models;

use App\Observers\SubTaskObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * App\Models\SubTask
 *
 * @property int $id
 * @property int $task_id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property string|null $start_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \App\Models\Task $task
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $description
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTaskFile[] $files
 * @property-read int|null $files_count
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereDescription($value)
 * @property int|null $assigned_to
 * @property-read \App\Models\User|null $assignedTo
 * @method static \Illuminate\Database\Eloquent\Builder|SubTask whereAssignedTo($value)
 */
class SubTask extends BaseModel
{
    protected $dates = ['due_date', 'start_date'];

    protected $with = ['assignedTo'];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function addedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function files(): HasMany
    {
        return $this->hasMany(SubTaskFile::class, 'sub_task_id');
    }

    public function timeLogs(): HasMany
    {
        return $this->hasMany(ProjectTimeLog::class, 'task_id', 'task_id');
    }
}
