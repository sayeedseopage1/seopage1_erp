<?php

namespace App\Models;

use App\Observers\ProposalSignObserver;
use App\Scopes\CompanyScope;

/**
 * App\Models\ProposalSign
 *
 * @property int $id
 * @property int $proposal_id
 * @property string $full_name
 * @property string $email
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereProposalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProposalSign whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProposalSign extends BaseModel
{

    public function getSignatureAttribute()
    {
        return !is_null($this->attributes['signature']) ? asset_url('proposal/sign/'.$this->attributes['signature']) : null;
    }

}
