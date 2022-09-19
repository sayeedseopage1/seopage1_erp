<?php

namespace App\Models;

use App\Observers\RemovalRequestLeadObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RemovalRequestLead
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int|null $lead_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Lead|null $lead
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead query()
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereLeadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemovalRequestLead whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class RemovalRequestLead extends BaseModel
{

    protected $table = 'removal_requests_lead';

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

}
