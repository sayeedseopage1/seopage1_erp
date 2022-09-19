<?php

namespace App\Models;

use App\Observers\TaskCategoryObserver;

/**
 * App\Models\TaskCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TaskCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TaskCategory extends BaseModel
{
    protected $table = 'task_category';

    public static function allCategories()
    {
        if (user()->permission('view_task_category') == 'all') {
            return TaskCategory::all();
        }
        else {
            return TaskCategory::where('added_by', user()->id)->get();
        }
    }

}
