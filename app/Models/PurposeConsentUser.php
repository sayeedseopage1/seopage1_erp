<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PurposeConsentUser
 *
 * @property int $id
 * @property int $client_id
 * @property int $purpose_consent_id
 * @property string $status
 * @property string|null $ip
 * @property int $updated_by_id
 * @property string|null $additional_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereAdditionalDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser wherePurposeConsentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PurposeConsentUser whereUpdatedById($value)
 * @mixin \Eloquent
 */
class PurposeConsentUser extends BaseModel
{
    protected $table = 'purpose_consent_users';


}
