<?php

namespace App\Models;

use App\Observers\ProjectCategoryObserver;
use Froiden\RestAPI\ApiModel;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ProjectCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Project[] $project
 * @property-read int|null $project_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectCategory extends ApiModel
{
    protected $table = 'project_category';
    protected $default = ['id','category_name'];

    public function project(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public static function allCategories()
    {
        if (user()->permission('view_project_category') == 'all') {
            return ProjectCategory::all();
        }
        else {
            return ProjectCategory::where('added_by', user()->id)->get();
        }
    }

}
