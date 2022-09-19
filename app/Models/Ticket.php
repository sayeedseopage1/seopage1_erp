<?php

namespace App\Models;

use App\Observers\TicketObserver;
use App\Traits\CustomFieldsTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Ticket
 *
 * @property int $id
 * @property int $user_id
 * @property string $subject
 * @property string $status
 * @property string $priority
 * @property int|null $agent_id
 * @property int|null $channel_id
 * @property int|null $type_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $agent
 * @property-read \App\Models\User $client
 * @property-read mixed $created_on
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketReply[] $reply
 * @property-read int|null $reply_count
 * @property-read \App\Models\User $requester
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketTag[] $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TicketTagList[] $ticketTags
 * @property-read int|null $ticket_tags_count
 * @method static \Database\Factories\TicketFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket newQuery()
 * @method static \Illuminate\Database\Query\Builder|Ticket onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereChannelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Ticket withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Ticket withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $mobile
 * @property int|null $country_id
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereMobile($value)
 * @property string|null $close_date
 * @method static \Illuminate\Database\Eloquent\Builder|Ticket whereCloseDate($value)
 */
class Ticket extends BaseModel
{
    use SoftDeletes, HasFactory;
    use CustomFieldsTrait;

    protected $dates = ['deleted_at'];
    protected $appends = ['created_on'];

    public $customFieldModel = 'App\Models\Ticket';

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id')->withoutGlobalScopes(['active']);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function reply(): HasMany
    {
        return $this->hasMany(TicketReply::class, 'ticket_id');
    }

    public function tags(): HasMany
    {
        return $this->hasMany(TicketTag::class, 'ticket_id');
    }

    public function ticketTags(): BelongsToMany
    {
        return $this->belongsToMany(TicketTagList::class, 'ticket_tags', 'ticket_id', 'tag_id');
    }

    public function getCreatedOnAttribute()
    {
        $setting = global_setting();

        if (!is_null($this->created_at)) {
            return $this->created_at->timezone($setting->timezone)->format('d M Y H:i');
        }

        return '';
    }

}
