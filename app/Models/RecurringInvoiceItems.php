<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\RecurringInvoiceItems
 *
 * @property int $id
 * @property int $invoice_recurring_id
 * @property string $item_name
 * @property float $quantity
 * @property float $unit_price
 * @property float $amount
 * @property string|null $taxes
 * @property string $type
 * @property string|null $item_summary
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $hsn_sac_code
 * @property mixed $recurringInvoiceItemImage
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems query()
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereHsnSacCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereInvoiceRecurringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereItemName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereItemSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RecurringInvoiceItems whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RecurringInvoiceItems extends BaseModel
{
    protected $table = 'invoice_recurring_items';
    protected $guarded = ['id'];

    public static function taxbyid($id)
    {
        return Tax::where('id', $id)->withTrashed();
    }

    public function recurringInvoiceItemImage(): HasOne
    {
            return $this->hasOne(RecurringInvoiceItemImage::class, 'invoice_recurring_item_id');
    }

}
