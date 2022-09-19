<?php

namespace App\Models;

use App\Observers\ClientNoteObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ClientNote
 *
 * @property int $id
 * @property int|null $client_id
 * @property string $title
 * @property int $type
 * @property int|null $member_id
 * @property int $is_client_show
 * @property int $ask_password
 * @property string $details
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereAskPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereIsClientShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ClientNote whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\User|null $client
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ClientUserNote[] $members
 * @property-read int|null $members_count
 */
class ClientNote extends BaseModel
{

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(ClientUserNote::class, 'client_note_id');
    }

}
