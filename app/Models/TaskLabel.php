<?php

namespace App\Models;

use App\Observers\TaskLabelListObserver;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TaskLabel
 *
 * @property int $id
 * @property int $label_id
 * @property int $task_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TaskLabelList $label
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereLabelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabel whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TaskLabel extends BaseModel
{
    protected $guarded = ['id'];

    public function label(): BelongsTo
    {
        return $this->belongsTo(TaskLabelList::class, 'label_id');
    }

}
