<?php

namespace App\Models;

use App\Observers\LeaveObserver;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Leave
 *
 * @property int $id
 * @property int $user_id
 * @property int $leave_type_id
 * @property int $count
 * @property int $halfday
 * @property string $duration
 * @property \Illuminate\Support\Carbon $leave_date
 * @property string $reason
 * @property string $status
 * @property string|null $reject_reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $paid
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $date
 * @property-read mixed $icon
 * @property-read mixed $leaves_taken_count
 * @property-read \App\Models\LeaveType $type
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\LeaveFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave query()
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLeaveDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereLeaveTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave wherePaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereRejectReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereUserId($value)
 * @mixin \Eloquent
 * @property string|null $event_id
 * @method static \Illuminate\Database\Eloquent\Builder|Leave whereEventId($value)
 */
class Leave extends BaseModel
{
    use HasFactory;

    protected $dates = ['leave_date', 'approved_at'];
    protected $guarded = ['id'];
    protected $appends = ['date']; // Being used in attendance

    public function getDateAttribute()
    {
        return $this->leave_date->toDateString();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active'])->withOut('clientDetails', 'role');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by')->withoutGlobalScopes(['active'])->withOut('clientDetails', 'role');
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id');
    }

    public function getLeavesTakenCountAttribute()
    {
        $userId = $this->user_id;
        $setting = global_setting();
        $user = User::withoutGlobalScope('active')->withOut('clientDetails', 'role')->findOrFail($userId);
        $currentYearJoiningDate = Carbon::parse($user->employee[0]->joining_date->format((now(global_setting()->timezone)->year) . '-m-d'));

        if ($currentYearJoiningDate->isFuture()) {
            $currentYearJoiningDate->subYear();
        }

        if ($setting->leaves_start_from == 'joining_date') {
            $fullDay = Leave::where('user_id', $userId)
                ->whereBetween('leave_date', [$currentYearJoiningDate->copy()->toDateString(), $currentYearJoiningDate->copy()->addYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', '<>', 'half day')
                ->count();

            $halfDay = Leave::where('user_id', $userId)
                ->whereBetween('leave_date', [$currentYearJoiningDate->copy()->toDateString(), $currentYearJoiningDate->copy()->addYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', 'half day')
                ->count();

            return ($fullDay + ($halfDay / 2));
        }
        else {
            $fullDay = Leave::where('user_id', $userId)
                ->whereBetween('leave_date', [now(global_setting()->timezone)->startOfYear()->toDateString(), now(global_setting()->timezone)->endOfYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', '<>', 'half day')
                ->count();

            $halfDay = Leave::where('user_id', $userId)
                ->whereBetween('leave_date', [now(global_setting()->timezone)->startOfYear()->toDateString(), now(global_setting()->timezone)->endOfYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', 'half day')
                ->count();

            return ($fullDay + ($halfDay / 2));
        }

    }

    public static function byUserCount($user)
    {
        $setting = global_setting();

        if (!$user instanceof User) {
            $user = User::withoutGlobalScope('active')->withOut('clientDetails', 'role')->findOrFail($user);
        }

        if ($setting->leaves_start_from == 'joining_date' && isset($user->employee[0])) {
            $currentYearJoiningDate = Carbon::parse($user->employee[0]->joining_date->format((now(global_setting()->timezone)->year) . '-m-d'));

            if ($currentYearJoiningDate->isFuture()) {
                $currentYearJoiningDate->subYear();
            }

            $fullDay = Leave::where('user_id', $user->id)
                ->whereBetween('leave_date', [$currentYearJoiningDate->copy()->toDateString(), $currentYearJoiningDate->copy()->addYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', '<>', 'half day')
                ->get();

            $halfDay = Leave::where('user_id', $user->id)
                ->whereBetween('leave_date', [$currentYearJoiningDate->copy()->toDateString(), $currentYearJoiningDate->copy()->addYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', 'half day')
                ->get();

            return (count($fullDay) + (count($halfDay) / 2));

        } else {
            $fullDay = Leave::where('user_id', $user->id)
                ->whereBetween('leave_date', [now(global_setting()->timezone)->startOfYear()->toDateString(), now(global_setting()->timezone)->endOfYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', '<>', 'half day')
                ->get();

            $halfDay = Leave::where('user_id', $user->id)
                ->whereBetween('leave_date', [now(global_setting()->timezone)->startOfYear()->toDateString(), now(global_setting()->timezone)->endOfYear()->toDateString()])
                ->where('status', 'approved')
                ->where('duration', 'half day')
                ->get();

            return (count($fullDay) + (count($halfDay) / 2));
        }
    }

}
