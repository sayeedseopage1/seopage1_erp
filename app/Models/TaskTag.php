<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TaskTag
 *
 * @property-read mixed $icon
 * @property-read \App\Models\TaskTagList $tag
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTag query()
 * @mixin \Eloquent
 */
class TaskTag extends BaseModel
{
    protected $guarded = ['id'];

    public function tag(): BelongsTo
    {
        return $this->belongsTo(TaskTagList::class, 'tag_id');
    }

}
