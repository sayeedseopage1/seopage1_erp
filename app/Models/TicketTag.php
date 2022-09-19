<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TicketTag
 *
 * @property int $id
 * @property int $tag_id
 * @property int $ticket_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\TicketTagList $tag
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereTagId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereTicketId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketTag whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketTag extends BaseModel
{
    protected $guarded = ['id'];

    public function tag(): BelongsTo
    {
        return $this->belongsTo(TicketTagList::class, 'tag_id');
    }

}
