<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderItemImage
 *
 * @property int $id
 * @property int|null $order_item_id
 * @property string|null $external_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $file_url
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage whereOrderItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItemImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class OrderItemImage extends BaseModel
{

    use IconTrait;

    protected $appends = ['file_url', 'icon'];

    Protected $fillable = ['order_item_id', 'external_link'];

    public function getFileUrlAttribute()
    {
        return $this->external_link;
    }

}
