<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class StickyNote
 *
 * @package App
 * @property int $id
 * @property int $user_id
 * @property string $note_text
 * @property string $colour
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $userDetail
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereColour($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereNoteText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StickyNote whereUserId($value)
 * @mixin \Eloquent
 */
class StickyNote extends BaseModel
{
    protected $table = 'sticky_notes';

    protected $dates = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function userDetail(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }
    public function client()
    {
        return $this->hasOne(User::class, 'id', 'client_id');
    }
    public function project()
    {
        return $this->hasOne(Project::class, 'id', 'project_id');
    }
    public function milestone()
    {
        return $this->hasOne(ProjectMilestone::class, 'id', 'milestone_id');
    }
    public function task()
    {
        return $this->hasOne(Task::class, 'id', 'task_id');
    }
    public function subtask()
    {
        return $this->hasOne(SubTask::class, 'id', 'sub_task_id');
    }

}
