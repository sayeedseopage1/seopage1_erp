<?php

namespace App\Models;

/**
 * App\Models\TaskTagList
 *
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskTagList query()
 * @mixin \Eloquent
 */
class TaskTagList extends BaseModel
{
    protected $table = 'task_tag_list';

    protected $guarded = ['id'];
}
