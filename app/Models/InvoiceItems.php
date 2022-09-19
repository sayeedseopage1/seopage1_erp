<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\InvoiceItems
 *
 * @property int $id
 * @property int $invoice_id
 * @property string $item_name
 * @property string|null $item_summary
 * @property string $type
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceItems whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\InvoiceItemImage|null $invoiceItemImage
 * @property-read mixed $tax_list
 */
class InvoiceItems extends BaseModel
{
    protected $guarded = ['id'];

    protected $with = ['invoiceItemImage'];

    public static function taxbyid($id)
    {
        return Tax::where('id', $id)->withTrashed();
    }

    public function invoiceItemImage(): HasOne
    {
        return $this->hasOne(InvoiceItemImage::class, 'invoice_item_id');
    }

    public function getTaxListAttribute()
    {
        $invoiceItem = InvoiceItems::find($this->id);
        $taxes = '';

        if($invoiceItem && $invoiceItem->taxes){
            $numItems = count(json_decode($invoiceItem->taxes));

            if(!is_null($invoiceItem->taxes))
            {
                foreach (json_decode($invoiceItem->taxes) as $index => $tax) {
                    $tax = $this->taxbyid($tax)->first();
                    $taxes .= $tax->tax_name . ': ' . $tax->rate_percent . '%';

                    $taxes = ($index + 1 != $numItems) ? $taxes . ', ' : $taxes;
                }
            }
        }

        return $taxes;
    }

}
