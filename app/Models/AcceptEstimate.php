<?php

namespace App\Models;

/**
 * App\Models\AcceptEstimate
 *
 * @property int $id
 * @property int $estimate_id
 * @property string $full_name
 * @property string $email
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate query()
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereEstimateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AcceptEstimate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AcceptEstimate extends BaseModel
{

    public function getSignatureAttribute()
    {
        return asset_url('estimate/accept/'.$this->attributes['signature']);
    }

}
