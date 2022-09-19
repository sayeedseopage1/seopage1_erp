<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\NoticeView
 *
 * @property int $id
 * @property int $notice_id
 * @property int $user_id
 * @property int $read
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView query()
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereNoticeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NoticeView whereUserId($value)
 * @mixin \Eloquent
 */
class NoticeView extends BaseModel
{
    protected $dates = ['created_at', 'updated_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

}
