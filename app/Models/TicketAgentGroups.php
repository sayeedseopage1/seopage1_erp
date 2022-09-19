<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TicketAgentGroups
 *
 * @property int $id
 * @property int $agent_id
 * @property int|null $group_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TicketGroup|null $group
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAgentGroups whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketAgentGroups extends BaseModel
{

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(TicketGroup::class, 'group_id');
    }

}
