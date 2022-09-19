<?php

namespace App\Models;

use App\Observers\UserInvitationObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\UserInvitation
 *
 * @property int $id
 * @property int $user_id
 * @property string $invitation_type
 * @property string|null $email
 * @property string $invitation_code
 * @property string $status
 * @property string|null $email_restriction
 * @property string|null $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereEmailRestriction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereInvitationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereInvitationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserInvitation whereUserId($value)
 * @mixin \Eloquent
 */
class UserInvitation extends BaseModel
{
    use Notifiable;

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
