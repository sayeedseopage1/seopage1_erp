<?php

namespace App\Models;

use App\Observers\EstimateObserver;
use App\Traits\CustomFieldsTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Estimate
 *
 * @property int $id
 * @property int $client_id
 * @property string|null $estimate_number
 * @property \Illuminate\Support\Carbon $valid_till
 * @property float $sub_total
 * @property float $discount
 * @property string $discount_type
 * @property float $total
 * @property int|null $currency_id
 * @property string $status
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $send_status
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User $client
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $original_estimate_number
 * @property-read mixed $total_amount
 * @property-read mixed $valid_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EstimateItem[] $items
 * @property-read int|null $items_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\AcceptEstimate|null $sign
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereEstimateNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereSendStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereValidTill($value)
 * @mixin \Eloquent
 * @property string|null $hash
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereHash($value)
 * @property string $calculate_tax
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereCalculateTax($value)
 * @property string|null $description
 * @method static \Illuminate\Database\Eloquent\Builder|Estimate whereDescription($value)
 */
class Estimate extends BaseModel
{
    use Notifiable;
    use CustomFieldsTrait;

    protected $dates = ['valid_till'];
    protected $appends = ['total_amount', 'valid_date', 'original_estimate_number'];
    protected $with = ['currency'];
    public $customFieldModel = 'App\Models\Estimate';

    public function items(): HasMany
    {
        return $this->hasMany(EstimateItem::class, 'estimate_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function clientdetails(): BelongsTo
    {
            return $this->belongsTo(ClientDetails::class, 'client_id', 'user_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function sign(): HasOne
    {
        return $this->hasOne(AcceptEstimate::class, 'estimate_id');
    }

    public function getTotalAmountAttribute()
    {
        return (!is_null($this->total) && isset($this->currency) && !is_null($this->currency->currency_symbol)) ? $this->currency->currency_symbol . $this->total : '';
    }

    public function getValidDateAttribute()
    {
        return !is_null($this->valid_till) ? Carbon::parse($this->valid_till)->format('d F, Y') : '';
    }

    public function getOriginalEstimateNumberAttribute()
    {
        $invoiceSettings = invoice_setting();
        $zero = '';

        if (strlen($this->attributes['estimate_number']) < $invoiceSettings->estimate_digit) {
            $condition = $invoiceSettings->estimate_digit - strlen($this->attributes['estimate_number'] );

            for ($i = 0; $i < $condition; $i++) {
                $zero = '0' . $zero;
            }
        }

        $zero = $zero . $this->attributes['estimate_number'];
        return $zero;
    }

    public function getEstimateNumberAttribute($value)
    {
        if (!is_null($value)) {
            $invoiceSettings = invoice_setting();
            $zero = '';

            if (strlen($value) < $invoiceSettings->estimate_digit) {
                $condition = $invoiceSettings->estimate_digit - strlen($value);

                for ($i = 0; $i < $condition; $i++) {
                    $zero = '0' . $zero;
                }
            }

            $zero = $invoiceSettings->estimate_prefix . '#' . $zero . $value;
            return $zero;
        }

        return '';
    }

    public static function lastEstimateNumber()
    {
        $invoice = DB::select('SELECT MAX(CAST(`estimate_number` as UNSIGNED)) as estimate_number FROM `estimates`');
        return $invoice[0]->estimate_number;
    }

}
