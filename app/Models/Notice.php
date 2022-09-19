<?php

namespace App\Models;

use App\Observers\NoticeObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\Notice
 *
 * @property int $id
 * @property string $to
 * @property string $heading
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $department_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Team|null $department
 * @property-read mixed $icon
 * @property-read mixed $notice_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\NoticeView[] $member
 * @property-read int|null $member_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\NoticeFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereDepartmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notice whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Notice extends BaseModel
{
    use Notifiable, HasFactory;
    protected $appends = ['notice_date'];

    public function member(): HasMany
    {
        return $this->hasMany(NoticeView::class, 'notice_id');
    }

    public function getNoticeDateAttribute()
    {
        if(!is_null($this->created_at)){
            return Carbon::parse($this->created_at)->format('d F, Y');
        }

        return '';
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'department_id', 'id');
    }

}
