<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\OrderItems
 *
 * @property int $id
 * @property int $order_id
 * @property string $item_name
 * @property string|null $item_summary
 * @property string $type
 * @property int $quantity
 * @property int $unit_price
 * @property float $amount
 * @property string|null $hsn_sac_code
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int|null $product_id
 * @property-read \App\Models\OrderItemImage|null $orderItemImage
 * @property-read \App\Models\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItems whereProductId($value)
 */
class OrderItems extends BaseModel
{

    protected $fillable = ['order_id', 'product_id', 'item_name', 'item_summary', 'type', 'quantity', 'unit_price', 'amount', 'hsn_sac_code', 'taxes'];

    protected $with = ['orderItemImage', 'product'];

    public static function taxbyid($id)
    {
        return Tax::where('id', $id)->withTrashed();
    }

    public function orderItemImage(): HasOne
    {
            return $this->hasOne(OrderItemImage::class, 'order_item_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function getTaxListAttribute()
    {
        $orderItem = OrderItems::find($this->id);
        $taxes = '';

        if($orderItem && $orderItem->taxes){
            $numItems = count(json_decode($orderItem->taxes));

            if(!is_null($orderItem->taxes))
            {
                foreach (json_decode($orderItem->taxes) as $index => $tax) {
                    $tax = $this->taxbyid($tax)->first();
                    $taxes .= $tax->tax_name . ': ' . $tax->rate_percent . '%';

                    $taxes = ($index + 1 != $numItems) ? $taxes . ', ' : $taxes;
                }
            }
        }

        return $taxes;
    }

}
