<?php

namespace App\Models;

use App\Observers\ProjectTimelogObserver;
use App\Traits\CustomFieldsTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\ProjectTimeLog
 *
 * @property int $id
 * @property string $start
 * @property string $name
 * @property int|null $project_id
 * @property int|null $task_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $start_time
 * @property \Illuminate\Support\Carbon|null $end_time
 * @property string $memo
 * @property string|null $total_hours
 * @property int|null $total_minutes
 * @property int|null $edited_by_user
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $hourly_rate
 * @property int $earnings
 * @property int $approved
 * @property int|null $approved_by
 * @property int|null $invoice_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $editor
 * @property-read mixed $duration
 * @property-read mixed $hours
 * @property-read mixed $icon
 * @property-read mixed $timer
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \App\Models\Task|null $task
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereApprovedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEditedByUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereMemo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTotalHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTotalMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereUserId($value)
 * @mixin \Eloquent
 * @property-read \App\Models\User $user
 * @property string|null $total_break_minutes
 * @property-read \App\Models\ProjectTimeLogBreak|null $activeBreak
 * @property-read Collection|\App\Models\ProjectTimeLogBreak[] $breaks
 * @property-read int|null $breaks_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLog whereTotalBreakMinutes($value)
 */
class ProjectTimeLog extends BaseModel
{
    use Notifiable;
    use CustomFieldsTrait;

    protected $dates = ['start_time', 'end_time'];

    protected $with = ['breaks'];

    public $customFieldModel = 'App\Models\ProjectTimeLog';

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'edited_by_user')->withoutGlobalScopes(['active']);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id')->withTrashed();
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id')->withTrashed();
    }

    public function breaks(): HasMany
    {
        return $this->hasMany(ProjectTimeLogBreak::class, 'project_time_log_id');
    }

    public function activeBreak(): HasOne
    {
        return $this->hasOne(ProjectTimeLogBreak::class, 'project_time_log_id')->whereNull('end_time');
    }

    protected $appends = ['hours', 'duration', 'timer'];

    public function getDurationAttribute()
    {
        $finishTime = now();

        if (!is_null($this->start_time)) {
            return $finishTime->diff($this->start_time)->format('%d days %H Hrs %i Mins %s Secs');
        }

        return '';
    }

    public function getHoursAttribute()
    {
        $totalMinutes = $this->total_minutes;
        $totalMinutes = $totalMinutes - $this->breaks->sum('total_minutes');

        $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

        if (($totalMinutes % 60) > 0) {
            $timeLog .= ($totalMinutes % 60) . ' ' . __('app.mins');
        }

        return $timeLog;
    }

    public function getTimerAttribute()
    {
        $finishTime = now();
        $settings = Setting::organisationSetting();
        $startTime = Carbon::parse($this->start_time)->timezone($settings->timezone);
        $days = $finishTime->diff($startTime)->format('%d');
        $hours = $finishTime->diff($startTime)->format('%H');

        if ($hours < 10) {
            $hours = '0' . $hours;
        }

        $minutes = $finishTime->diff($startTime)->format('%i');

        if ($minutes < 10) {
            $minutes = '0' . $minutes;
        }

        $secs = $finishTime->diff($startTime)->format('%s');

        if ($secs < 10) {
            $secs = '0' . $secs;
        }

        return ((int)$days * 24) + (int)$hours . ':' . (int)$minutes . ':' . (int)$secs;
    }

    public static function dateWiseTimelogs($date, $userID = null)
    {
        $timelogs = ProjectTimeLog::with('breaks')->whereDate('start_time', $date);

        if (!is_null($userID)) {
            $timelogs = $timelogs->where('user_id', $userID);
        }

        return $timelogs = $timelogs->get();
    }

    public static function weekWiseTimelogs($startDate, $endDate, $userID = null)
    {
        $timelogs = ProjectTimeLog::whereBetween(DB::raw('DATE(`start_time`)'), [$startDate, $endDate]);

        if (!is_null($userID)) {
            $timelogs = $timelogs->where('user_id', $userID);
        }

        return $timelogs = $timelogs->sum('total_minutes');
    }

    public static function projectActiveTimers($projectId)
    {
        return ProjectTimeLog::with('user')->whereNull('end_time')
            ->where('project_id', $projectId)
            ->get();
    }

    public static function taskActiveTimers($taskId)
    {
        return ProjectTimeLog::with('user')->whereNull('end_time')
            ->where('task_id', $taskId)
            ->get();
    }

    public static function projectTotalHours($projectId)
    {
        return ProjectTimeLog::where('project_id', $projectId)
            ->sum('total_hours');
    }

    public static function projectTotalMinuts($projectId)
    {
        return ProjectTimeLog::where('project_id', $projectId)
            ->sum('total_minutes');
    }

    public static function memberActiveTimer($memberId)
    {
        return ProjectTimeLog::with('project')->where('user_id', $memberId)
            ->whereNull('end_time')
            ->first();
    }

}
