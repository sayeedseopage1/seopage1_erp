<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TicketReplyTemplate
 *
 * @property int $id
 * @property string $reply_heading
 * @property string $reply_text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereReplyHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereReplyText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketReplyTemplate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TicketReplyTemplate extends BaseModel
{
    //
}
