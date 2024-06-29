<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Subtask;
use App\Models\TaskSubmission;
use App\Models\TaskBoardColumn;
use App\Observers\TaskObserver;
use App\Models\ProjectMilestone;
use App\Traits\CustomFieldsTrait;
use App\Models\Scopes\OrderByDesc;
use Illuminate\Support\Facades\Auth;
use App\Helper\ProjectManagerPointLogic;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Factor;

/**
 * App\Models\Task
 *
 * @property int $id
 * @property string $heading
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property int|null $project_id
 * @property int|null $task_category_id
 * @property string $priority
 * @property string $status
 * @property int|null $board_column_id
 * @property int $column_priority
 * @property \Illuminate\Support\Carbon|null $completed_on
 * @property int|null $created_by
 * @property int|null $recurring_task_id
 * @property-read \Illuminate\Database\Eloquent\Collection|Task[] $recurrings
 * @property-read int|null $recurrings_count
 * @property int|null $dependent_task_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $milestone_id
 * @property int $is_private
 * @property int $billable
 * @property int $estimate_hours
 * @property int $estimate_minutes
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $activeTimerAll
 * @property-read int|null $active_timer_all_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $approvedTimeLogs
 * @property-read int|null $approved_time_logs_count
 * @property-read \App\Models\TaskboardColumn|null $boardColumn
 * @property-read \App\Models\TaskCategory|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskComment[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $completedSubtasks
 * @property-read int|null $completed_subtasks_count
 * @property-read \App\Models\User|null $createBy
 * @property-read \App\Models\User|null $addedByUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $create_on
 * @property-read string $due_on
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $is_task_user
 * @property-read mixed $total_estimated_minutes
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskHistory[] $history
 * @property-read int|null $history_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $incompleteSubtasks
 * @property-read int|null $incomplete_subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskLabel[] $label
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskUser[] $taskUsers
 * @property-read int|null $label_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskLabelList[] $labels
 * @property-read int|null $labels_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TaskNote[] $notes
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubTask[] $subtasks
 * @property-read int|null $subtasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $timeLogged
 * @property-read int|null $time_logged_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Task newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Task pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Task query()
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereBillable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereColumnPriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCompletedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDependentTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereEstimateHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereEstimateMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereHeading($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereIsPrivate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereMilestoneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRecurringTaskId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereTaskCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $hash
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereHash($value)
 * @property int $repeat
 * @property int $repeat_complete
 * @property int|null $repeat_count
 * @property string $repeat_type
 * @property int|null $repeat_cycles
 * @property-read \App\Models\ProjectTimeLog|null $activeTimer
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $activeUsers
 * @property-read int|null $active_users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRepeat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRepeatComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRepeatCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRepeatCycles($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereRepeatType($value)
 * @property string|null $event_id
 * @method static \Illuminate\Database\Eloquent\Builder|Task whereEventId($value)
 */
class Task extends BaseModel
{
    use Notifiable, SoftDeletes;
    use CustomFieldsTrait;

    protected $dates = ['due_date', 'completed_on', 'start_date'];
    protected $appends = ['due_on', 'create_on'];
    protected $guarded = ['id'];
    public $customFieldModel = 'App\Models\Task';

    protected static function boot()
    {
        parent::boot();

        static::created(function ($item) {
            if(!$item->subtask_id && !$item->independent_task_status){
                $project = Project::with('deal')->find($item->project_id);
                if($latestTask = Task::where('id', '!=', $item->id)->where('project_id', $project->id)->orderBy('id', 'desc')->first()){
                    $start_date = Carbon::createFromFormat('Y-m-d H:i:s', $latestTask->created_at);
                    $countSundays = $start_date->diffInDaysFiltered(function (Carbon $date) {
                        return $date->dayOfWeek === Carbon::SUNDAY;
                    }, Carbon::now());
                    $hoursDifference = Carbon::now()->diffInHours($start_date) - ($countSundays * 24);
                    if($hoursDifference > 0){
                        $points = (int) ($hoursDifference/24) * Factor::where('criteria_id', 12)->first()->points;
                        // Project Manager Point Distribution ( Task hold time during assign phase )
                        // ProjectManagerPointLogic::distribute(12, $item->project_id, abs($points) ? 1 : 0, $points);
                    }
                }else{
                    $start_date = Carbon::createFromFormat('Y-m-d H:i:s', $project->project_acceptance_time ?? now());
                    $countSundays = $start_date->diffInDaysFiltered(function (Carbon $date) {
                        return $date->dayOfWeek === Carbon::SUNDAY;
                    }, Carbon::now());
                    $acceptanceToFirstTaskDuration = (Carbon::now()->diffInMinutes($start_date)/60) - ($countSundays * 24);
                    // Project Manager Point Distribution ( If all the tasks are created in the first 2 dayse )
                    ProjectManagerPointLogic::distribute(6, $item->project_id, $acceptanceToFirstTaskDuration);

                    $hoursDifference = (Carbon::now()->diffInMinutes($start_date)/60) - 24 - ($countSundays * 24); // This 24 hours check 48 hours for below condition
                    if($hoursDifference > 0){
                        $points = (int) ($hoursDifference/24) * Factor::where('criteria_id', 12)->first()->points;

                        $taskitem = Task::with('project.client')->find($item->id);
                        $activity = 'Your task hold time for task <a style="color:blue" href="'.route('tasks.show',$taskitem->id??null).'">'.$taskitem->heading??null. '</a> (Project <a style="color:blue" href="'.route('projects.show',$taskitem->project->id??null).'">'.$taskitem->project->project_name??null. '</a> from client  <a style="color:blue" href="'.route('clients.show', $taskitem->project->client->id??null).'">'. $taskitem->project->client->name??null. '</a>) is more than 48 hours during assign phase';

                        // Project Manager Point Distribution ( Task hold time during assign phase )
                        ProjectManagerPointLogic::distribute(12, $item->project_id, abs($points) ? 1 : 0, $points, $activity);
                    }
                }
            }
        });

        static::updated(function ($item) {
            if ($item->isDirty('board_column_id') && in_array($item->board_column_id, [8, 9, 1]) && $item->getOriginal('board_column_id') === 6) {
                if(!$item->subtask_id && Auth::user()->role_id == 4 && $lastSubmission = TaskSubmission::where('task_id', $item->id)->orderBy('id', 'desc')->first()){
                    $hoursDifference = Carbon::parse($lastSubmission->created_at)->diffInHours(Carbon::now());
                    
                    $taskitem = Task::with('project.client')->find($item->id);
                    $activity = 'You did not take any action of this submitted task <a style="color:blue" href="'.route('tasks.show',$taskitem->id??null).'">'.$taskitem->heading??null. '</a>, for project <a style="color:blue" href="'.route('projects.show',$taskitem->project->id??null).'">'.$taskitem->project->project_name??null. '</a>  (Client <a style="color:blue" href="'.route('clients.show', $taskitem->project->client->id??null).'">'. $taskitem->project->client->name??null. '</a>) in 36 hours';

                    // Project Manager Point Distribution ( Reviewing the work )
                    ProjectManagerPointLogic::distribute(8, $item->project_id, $hoursDifference, null, $activity);
                }

                if(!$item->subtask_id && Auth::user()->role_id == 4){
                    $lastSubmissionTime = Carbon::parse(TaskSubmission::where('task_id', $item->id)->orderBy('id', 'desc')->first()->created_at);
                    if(!TaskSubmission::where('task_id', $item->id)->where('created_at', '<', $lastSubmissionTime->format('Y-m-d H:i'))->count()){
                        // First Submission
                        $start_date = $lastSubmissionTime;
                        $countSundays = $start_date->diffInDaysFiltered(function (Carbon $date) {
                            return $date->dayOfWeek === Carbon::SUNDAY;
                        }, Carbon::now());
                        $hoursDifference = Carbon::now()->diffInHours($start_date) - ($countSundays * 24);
                        if($hoursDifference > 0){
                            $points = (int) ($hoursDifference/12) * Factor::where('criteria_id', 13)->first()->points;
                            
                            $taskitem = Task::with('project.client')->find($item->id);
                            $activity = 'Your task hold time for task <a style="color:blue" href="'.route('tasks.show',$taskitem->id??null).'">'.$taskitem->heading??null. '</a> (Project <a style="color:blue" href="'.route('projects.show',$taskitem->project->id??null).'">'.$taskitem->project->project_name??null. '</a> from client <a style="color:blue" href="'.route('clients.show', $taskitem->project->client->id??null).'">'. $taskitem->project->client->name??null. '</a>) is more than 12 hours during submission phase';

                            // Project Manager Point Distribution ( Task hold time during submission phase )
                            ProjectManagerPointLogic::distribute(13, $item->project_id, abs($points) ? 1 : 0, $points, $activity);
                        }
                    }else{
                        $start_date = $lastSubmissionTime;
                        $countSundays = $start_date->diffInDaysFiltered(function (Carbon $date) {
                            return $date->dayOfWeek === Carbon::SUNDAY;
                        }, Carbon::now());
                        $hoursDifference = Carbon::now()->diffInHours($start_date) - ($countSundays * 24);
                        if($hoursDifference > 0){
                            $points = (int) ($hoursDifference/4) * Factor::where('criteria_id', 14)->first()->points;
                            
                            $taskitem = Task::with('project.client')->find($item->id);
                            $activity = 'Your task hold time for task <a style="color:blue" href="'.route('tasks.show',$taskitem->id??null).'">'.$taskitem->heading??null. '</a> (Project <a style="color:blue" href="'.route('projects.show',$taskitem->project->id??null).'">'.$taskitem->project->project_name??null. '</a> from client <a style="color:blue" href="'.route('clients.show', $taskitem->project->client->id??null).'">'. $taskitem->project->client->name??null. '</a>) is more than 4 hours during revision submission phase';

                            // Project Manager Point Distribution ( Task hold time during revision submission )
                            ProjectManagerPointLogic::distribute(14, $item->project_id, abs($points) ? 1 : 0, $points, $activity);
                        }
                    }
                }
            }
        });
    }

    protected static function booted()
    {
        static::addGlobalScope(new OrderByDesc); // assign the Scope here
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id')->withTrashed();
    }

    public function activeProject(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function label(): HasMany
    {
        return $this->hasMany(TaskLabel::class, 'task_id');
    }

    public function boardColumn(): BelongsTo
    {
        return $this->belongsTo(TaskboardColumn::class, 'board_column_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_users')->withoutGlobalScopes(['active'])->using(TaskUser::class);
    }

    public function taskUsers(): HasMany
    {
        return $this->hasMany(TaskUser::class, 'task_id');
    }

    public function activeUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_users')->using(TaskUser::class);
    }

    public function labels(): BelongsToMany
    {
        return $this->belongsToMany(TaskLabelList::class, 'task_labels', 'task_id', 'label_id');
    }

    public function createBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->withoutGlobalScopes(['active']);
    }

    public function addedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by')->withoutGlobalScopes(['active']);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TaskCategory::class, 'task_category_id');
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(SubTask::class, 'task_id');
    }

    public function history(): HasMany
    {
        return $this->hasMany(TaskHistory::class, 'task_id')->orderBy('id', 'desc');
    }

    public function completedSubtasks(): HasMany
    {
        return $this->hasMany(SubTask::class, 'task_id')->where('sub_tasks.status', 'complete');
    }

    public function incompleteSubtasks(): HasMany
    {
        return $this->hasMany(SubTask::class, 'task_id')->where('sub_tasks.status', 'incomplete');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(TaskComment::class, 'task_id')->orderBy('id', 'desc');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(TaskNote::class, 'task_id')->orderBy('id', 'desc');
    }

    public function files(): HasMany
    {
        return $this->hasMany(TaskFile::class, 'task_id')->orderBy('id', 'desc');
    }

    public function activeTimer(): HasOne
    {
        return $this->hasOne(ProjectTimeLog::class, 'task_id')
            ->whereNull('project_time_logs.end_time');
    }

    public function userActiveTimer(): HasOne
    {
        return $this->hasOne(ProjectTimeLog::class, 'task_id')
            ->whereNull('project_time_logs.end_time')
            ->where('project_time_logs.user_id', user()->id);
    }

    public function activeTimerAll(): HasMany
    {
        return $this->hasMany(ProjectTimeLog::class, 'task_id')
            ->whereNull('project_time_logs.end_time');
    }

    public function timeLogged(): HasMany
    {
        return $this->hasMany(ProjectTimeLog::class, 'task_id');
    }

    public function approvedTimeLogs(): HasMany
    {
        return $this->hasMany(ProjectTimeLog::class, 'task_id')->where('project_time_logs.approved', 1)->orderBy('project_time_logs.start_time', 'desc');
    }

    public function recurrings(): HasMany
    {
        return $this->hasMany(Task::class, 'recurring_task_id');
    }

    public function scopePending($query)
    {
        $taskBoardColumn = TaskboardColumn::completeColumn();
        return $query->where('tasks.board_column_id', '<>', $taskBoardColumn->id);
    }

    /**
     * @return string
     */
    public function getDueOnAttribute()
    {
        if (!is_null($this->due_date)) {
            return $this->due_date->format(global_setting()->date_format);
        }

        return '';
    }

    public function getCreateOnAttribute()
    {
        if (!is_null($this->start_date)) {
            return $this->start_date->format(global_setting()->date_format);
        }

        return '';
    }

    public function getIsTaskUserAttribute()
    {
        if (user()) {
            return $this->taskUsers->where('user_id', user()->id)->first();
        }
    }

    public function getTotalEstimatedMinutesAttribute()
    {
        $hours = $this->estimate_hours;
        $minutes = $this->estimate_minutes;
        return ($hours * 60) + $minutes;
    }

    /**
     * @param int $projectId
     * @param null $userID
     * @return \Illuminate\Support\Collection
     */
    public static function projectOpenTasks($projectId, $userID = null)
    {
        $taskBoardColumn = TaskboardColumn::completeColumn();
        $projectTask = Task::join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->where('tasks.board_column_id', '<>', $taskBoardColumn->id)
            ->select('tasks.*');

        if ($userID) {
            $projectIssue = $projectTask->where('task_users.user_id', '=', $userID);
        }

        $projectIssue = $projectTask->where('project_id', $projectId)
            ->get();

        return $projectIssue;
    }

    public static function projectCompletedTasks($projectId)
    {
        $taskBoardColumn = TaskboardColumn::completeColumn();
        return Task::where('tasks.board_column_id', $taskBoardColumn->id)
            ->where('project_id', $projectId)
            ->get();
    }

    public static function projectTasks($projectId, $userID = null, $onlyPublic = null, $withoutDueDate = null)
    {

        $projectTask = Task::with('boardColumn')
            ->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->where('project_id', $projectId)
            ->select('tasks.*');

        if ($userID) {
            $projectIssue = $projectTask->where('task_users.user_id', '=', $userID);
        }

        if ($withoutDueDate) {
            $projectIssue = $projectTask->whereNotNull('tasks.due_date');
        }

        if ($onlyPublic != null) {
            $projectIssue = $projectTask->where(
                function ($q) {
                    $q->where('is_private', 0);

                    if (auth()->user()) {
                        $q->orWhere('created_by', auth()->user()->id);
                    }
                }
            );
        }

        $projectIssue = $projectTask->select('tasks.*');
        $projectIssue = $projectTask->orderBy('start_date', 'asc');
        $projectIssue = $projectTask->groupBy('tasks.id');
        $projectIssue = $projectTask->get();

        return $projectIssue;
    }

    public static function projectLogTimeTasks($projectId, $userID = null, $onlyPublic = null, $withoutDueDate = null)
    {

        $projectTask = Task::with('boardColumn')
            ->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->where('project_id', $projectId)
            ->select('tasks.*');

        if ($userID) {
            $projectIssue = $projectTask->where('task_users.user_id', '=', $userID);
        }

        if ($withoutDueDate) {
            $projectIssue = $projectTask->whereNotNull('tasks.due_date');
        }

        if ($onlyPublic != null) {
            $projectIssue = $projectTask->where(
                function ($q) {
                    $q->where('is_private', 0);

                    if (auth()->user()) {
                        $q->orWhere('created_by', auth()->user()->id);
                    }
                }
            );
        }

        // Get tasks related to selected project and selected project manager
        $viewTaskPermission = user()->permission('view_tasks');
        $addTimelogPermission = user()->permission('add_timelogs');

        if ($viewTaskPermission == 'both') {
            $projectTask->where(function ($query) use ($addTimelogPermission) {
                if ($addTimelogPermission == 'all') {
                    $query->where('tasks.added_by', user()->id);
                }

                $query->orWhere('task_users.user_id', user()->id);
            });
        }

        $projectIssue = $projectTask->select('tasks.*');
        $projectIssue = $projectTask->orderBy('start_date');
        $projectIssue = $projectTask->groupBy('tasks.id');
        $projectIssue = $projectTask->get();

        return $projectIssue;
    }

    /**
     * @return bool
     */
    public function pinned()
    {
        $pin = Pinned::where('user_id', user()->id)->where('task_id', $this->id)->first();

        if (!is_null($pin)) {
            return true;
        }

        return false;
    }

    public static function timelogTasks($projectId = null)
    {
        $viewTaskPermission = user()->permission('view_tasks');
        $addTimelogPermission = user()->permission('add_timelogs');

        if ($viewTaskPermission != 'none' && $addTimelogPermission != 'none') {
            $tasks = Task::select('tasks.id', 'tasks.heading')
                ->join('task_users', 'task_users.task_id', '=', 'tasks.id');

            if (!is_null($projectId)) {
                $tasks->where('tasks.project_id', '=', $projectId);
            }

            if ($viewTaskPermission == 'both') {
                $tasks->where(function ($query) use ($addTimelogPermission) {
                    if ($addTimelogPermission == 'all') {
                        $query->where('tasks.added_by', user()->id);
                    }

                    $query->orWhere('task_users.user_id', user()->id);
                });
            }

            if ($viewTaskPermission == 'added' && $addTimelogPermission == 'all') {
                $tasks->where('tasks.added_by', user()->id);
            }

            if ($viewTaskPermission == 'owned') {
                $tasks->where('task_users.user_id', user()->id);
            }

            return $tasks->get();
        }
    }

    public function breakMinutes()
    {
        return ProjectTimeLogBreak::taskBreakMinutes($this->id);
    }
    public function subtask(): BelongsTo
    {
        return $this->belongsTo(Subtask::class,'subtask_id');
    }
    public function milestone()
    {
        return $this->belongsTo(ProjectMilestone::class, 'milestone_id');
    }
    public function stat()
    {
        return $this->belongsTo(TaskBoardColumn::class, 'board_column_id');
    }
    public function submissions()
    {
        return $this->hasMany(TaskSubmission::class);
    }

    /*public function review()
    {
        return $this->belongsTo(TaskApprove::class, 'task_id', 'id');
    }*/

    public function graphicWorkDetail()
    {
        return $this->hasOne(GraphicWorkDetails::class, 'task_id', 'id');
    }
}
