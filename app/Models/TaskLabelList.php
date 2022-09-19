<?php

namespace App\Models;

use App\Observers\TaskLabelListObserver;
use App\Observers\TaskLabelObserver;
use App\Scopes\CompanyScope;

/**
 * App\Models\TaskLabelList
 *
 * @property int $id
 * @property string $label_name
 * @property string|null $color
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read mixed $label_color
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereLabelName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskLabelList whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TaskLabelList extends BaseModel
{
    protected $table = 'task_label_list';

    protected $guarded = ['id'];
    public $appends = ['label_color'];

    public function getLabelColorAttribute()
    {
        if ($this->color) {
            return $this->color;
        }

        return '#3b0ae1';
    }

}
