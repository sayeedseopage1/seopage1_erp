<?php

namespace App\Models;

use App\Observers\LeadCategoryObserver;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\LeadCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LeadCategory extends BaseModel
{
    protected $table = 'lead_category';
    protected $default = ['id','category_name'];

}
