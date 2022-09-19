<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ClientCategory
 *
 * @property int $id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ClientCategory extends BaseModel
{
    protected $table = 'client_categories';
}
