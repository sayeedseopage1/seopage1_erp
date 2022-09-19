<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\PurposeConsent
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\PurposeConsentLead|null $lead
 * @property-read \App\Models\PurposeConsentUser|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PurposeConsent extends BaseModel
{
    protected $table = 'purpose_consent';
    protected $fillable = ['name', 'description'];

    public function lead(): HasOne
    {
        return $this->hasOne(PurposeConsentLead::class, 'purpose_consent_id', 'id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(PurposeConsentUser::class, 'purpose_consent_id', 'id');
    }

}
