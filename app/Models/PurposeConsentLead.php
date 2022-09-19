<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PurposeConsentLead
 *
 * @property int $id
 * @property int $lead_id
 * @property int $purpose_consent_id
 * @property string $status
 * @property string|null $ip
 * @property int|null $updated_by_id
 * @property string|null $additional_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereAdditionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead wherePurposeConsentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentLead whereUpdatedById($value)
 * @mixin \Eloquent
 */
class PurposeConsentLead extends BaseModel
{
    protected $table = 'purpose_consent_leads';


}
