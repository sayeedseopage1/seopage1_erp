<?php

namespace App\Models;

use App\Observers\ProjectTimelogBreakObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\ProjectTimeLogBreak
 *
 * @property int $id
 * @property int|null $project_time_log_id
 * @property \Illuminate\Support\Carbon $start_time
 * @property \Illuminate\Support\Carbon|null $end_time
 * @property string $reason
 * @property string|null $total_hours
 * @property string|null $total_minutes
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProjectTimeLog|null $timelog
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereProjectTimeLogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereTotalHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereTotalMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTimeLogBreak whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectTimeLogBreak extends BaseModel
{
    use HasFactory;

    protected $dates = ['start_time', 'end_time'];

    public function timelog(): BelongsTo
    {
        return $this->belongsTo(ProjectTimeLog::class, 'project_time_log_id');
    }

    public static function projectBreakMinutes($projectID)
    {
        return ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->where('project_time_logs.project_id', $projectID)
            ->sum('project_time_log_breaks.total_minutes');
    }

    public static function taskBreakMinutes($taskID)
    {
        return ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->where('project_time_logs.task_id', $taskID)
            ->whereNotNull('project_time_logs.end_time')
            ->sum('project_time_log_breaks.total_minutes');
    }

    public static function userBreakMinutes($userID)
    {
        return ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->where('project_time_logs.user_id', $userID)
            ->sum('project_time_log_breaks.total_minutes');
    }

    public static function milestoneBreakMinutes($milestoneID)
    {
        return ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->join('project_milestones', 'project_milestones.project_id', '=', 'project_time_logs.project_id')
            ->where('project_milestones.id', $milestoneID)
            ->sum('project_time_log_breaks.total_minutes');
    }

    public static function dateWiseTimelogBreak($date, $userID = null)
    {
        $timelogs = ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->whereDate('project_time_log_breaks.start_time', $date)
            ->whereNotNull('project_time_logs.end_time')
            ->select('project_time_log_breaks.*');

        if (!is_null($userID)) {
            $timelogs = $timelogs->where('project_time_logs.user_id', $userID);
        }

        return $timelogs = $timelogs->get();
    }

    public static function weekWiseTimelogBreak($startDate, $endDate, $userID = null)
    {
        $timelogs = ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->whereBetween(DB::raw('DATE(project_time_log_breaks.`start_time`)'), [$startDate, $endDate])
            ->whereNotNull('project_time_logs.end_time')
            ->select('project_time_log_breaks.*');

        if (!is_null($userID)) {
            $timelogs = $timelogs->where('project_time_logs.user_id', $userID);
        }

        return $timelogs = $timelogs->sum('project_time_log_breaks.total_minutes');
    }

}
