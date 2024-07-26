<?php

namespace App\Models;

use App\Observers\ContractObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Deal;
use App\Models\Currency;

/**
 * App\Models\Contract
 *
 * @property int $id
 * @property int $client_id
 * @property string $subject
 * @property string $amount
 * @property string $original_amount
 * @property int|null $contract_type_id
 * @property \Illuminate\Support\Carbon $start_date
 * @property string $original_start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property string|null $original_end_date
 * @property string|null $description
 * @property string|null $contract_name
 * @property string|null $company_logo
 * @property string|null $alternate_address
 * @property string|null $cell
 * @property string|null $office
 * @property string|null $city
 * @property string|null $state
 * @property string|null $country
 * @property string|null $postal_code
 * @property string|null $contract_detail
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User $client
 * @property-read \App\Models\ContractType|null $contractType
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractDiscussion[] $discussion
 * @property-read int|null $discussion_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ContractRenew[] $renewHistory
 * @property-read int|null $renew_history_count
 * @property-read \App\Models\ContractSign|null $signature
 * @method static \Database\Factories\ContractFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAlternateAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCompanyLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereContractTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOffice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereOriginalStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $hash
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereHash($value)
 * @property int|null $currency_id
 * @property-read \App\Models\Currency|null $currency
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCurrencyId($value)
 * @property string|null $event_id
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereEventId($value)
 */
class Contract extends BaseModel
{
    use HasFactory;

    protected $dates = [
        'start_date',

    ];

    protected $with = ['currency'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return ($this->company_logo) ? asset_url('contract-logo/' . $this->company_logo) : global_setting()->logo_url;
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function contractType(): BelongsTo
    {
        return $this->belongsTo(ContractType::class, 'contract_type_id');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function signature(): HasOne
    {
        return $this->hasOne(ContractSign::class, 'contract_id');
    }

    public function discussion(): HasMany
    {
        return $this->hasMany(ContractDiscussion::class)->orderBy('id', 'desc');
    }

    public function renewHistory(): HasMany
    {
        return $this->hasMany(ContractRenew::class, 'contract_id')->orderBy('id', 'desc');
    }

    public function files(): HasMany
    {
        return $this->hasMany(ContractFile::class, 'contract_id')->orderBy('id', 'desc');
    }
    public function milestone(): HasMany
    {
        return $this->hasMany(ContractFile::class, 'contract_id')->orderBy('id', 'desc');
    }
    public function cross_departmental_work(): HasMany
    {
        return $this->hasMany(ContractFile::class, 'contract_id')->orderBy('id', 'desc');
    }
    public function deal()
    {
        return $this->belongsTo(Deal::class, 'deal_id');
    }
    public function original_currency()
    {
        return $this->belongsTo(Currency::class, 'original_currency_id');
    }

    public function project()
    {
        return $this->belongsTo(project::class, 'deal_id', 'deal_id');
    }
}
