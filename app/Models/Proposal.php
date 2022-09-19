<?php

namespace App\Models;

use App\Observers\ProposalObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Proposal
 *
 * @property int $id
 * @property int $lead_id
 * @property \Illuminate\Support\Carbon $valid_till
 * @property float $sub_total
 * @property float $total
 * @property int|null $currency_id
 * @property string $discount_type
 * @property float $discount
 * @property int $invoice_convert
 * @property string $status
 * @property string|null $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $client_comment
 * @property int $signature_approval
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProposalItem[] $items
 * @property-read int|null $items_count
 * @property-read \App\Models\Lead $lead
 * @property-read \App\Models\ProposalSign|null $signature
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal query()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereClientComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereDiscountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereInvoiceConvert($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereSignatureApproval($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereSubTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereValidTill($value)
 * @mixin \Eloquent
 * @property string|null $hash
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereHash($value)
 * @property string|null $description
 * @property string $calculate_tax
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereCalculateTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal whereDescription($value)
 */
class Proposal extends BaseModel
{
    protected $table = 'proposals';

    protected $dates = ['valid_till'];

    public function items(): HasMany
    {
        return $this->hasMany(ProposalItem::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function signature(): HasOne
    {
        return $this->hasOne(ProposalSign::class);
    }

}
