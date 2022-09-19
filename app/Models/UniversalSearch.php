<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UniversalSearch
 *
 * @property int $id
 * @property int $searchable_id
 * @property string|null $module_type
 * @property string $title
 * @property string $route_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch query()
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereModuleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereRouteName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereSearchableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UniversalSearch whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class UniversalSearch extends BaseModel
{
    protected $table = 'universal_search';
}
