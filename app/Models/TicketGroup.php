<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\TicketGroup
 *
 * @property int $id
 * @property string $group_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketAgentGroups[] $agents
 * @property-read int|null $agents_count
 * @property-read mixed $icon
 * @property-read mixed $enabledAgents
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereGroupName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketGroup whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketGroup extends BaseModel
{

    public function agents(): HasMany
    {
        return $this->hasMany(TicketAgentGroups::class, 'group_id');
    }

    public function enabledAgents(): HasMany
    {
        return $this->agents()->where('status', '=', 'enabled');
    }

}
