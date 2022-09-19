<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProductSubCategory
 *
 * @property int $id
 * @property int $category_id
 * @property string $category_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProductCategory $category
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCategoryName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProductSubCategory extends BaseModel
{
    protected $table = 'product_sub_category';

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

}
