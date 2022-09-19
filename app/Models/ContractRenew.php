<?php

namespace App\Models;

use App\Observers\ContractRenewObserver;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ContractRenew
 *
 * @property int $id
 * @property int $renewed_by
 * @property int $contract_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property string $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Contract $contract
 * @property-read mixed $icon
 * @property-read \App\Models\User $renewedBy
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereRenewedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContractRenew whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ContractRenew extends BaseModel
{
    protected $dates = [
        'start_date',
        'end_date'
    ];

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }

    public function renewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'renewed_by');
    }

}
