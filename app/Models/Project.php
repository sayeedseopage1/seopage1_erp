<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Deal;
use App\Models\User;
use App\Models\ProjectStatus;
use App\Models\ProjectCategory;
use App\Traits\CustomFieldsTrait;
use App\Observers\ProjectObserver;
use App\Helper\ProjectManagerPointLogic;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ProjectDeliverablesClientDisagree;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Project
 *
 * @property int $id
 * @property string $project_name
 * @property string|null $project_summary
 * @property int|null $project_admin
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon|null $deadline
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectNote[] $notes
 * @property int|null $category_id
 * @property int|null $client_id
 * @property int|null $team_id
 * @property string|null $feedback
 * @property string $manual_timelog
 * @property string $client_view_task
 * @property string $allow_client_notification
 * @property int $completion_percent
 * @property string $calculate_task_progress
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property float|null $project_budget
 * @property int|null $currency_id
 * @property float|null $hours_allocated
 * @property string $status
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\ProjectCategory|null $category
 * @property-read \App\Models\User|null $client
 * @property-read \App\Models\ClientDetails|null $clientdetails
 * @property-read \App\Models\Currency|null $currency
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Discussion[] $discussions
 * @property-read int|null $discussions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Expense[] $expenses
 * @property-read int|null $expenses_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectFile[] $files
 * @property-read int|null $files_count
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read mixed $is_project_admin
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Invoice[] $invoices
 * @property-read int|null $invoices_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Issue[] $issues
 * @property-read int|null $issues_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMember[] $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $membersMany
 * @property-read int|null $members_many_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMilestone[] $milestones
 * @property-read int|null $milestones_count
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\ProjectRating|null $rating
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTimeLog[] $times
 * @property-read int|null $times_count
 * @method static \Illuminate\Database\Eloquent\Builder|Project canceled()
 * @method static \Illuminate\Database\Eloquent\Builder|Project completed()
 * @method static \Database\Factories\ProjectFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Project finished()
 * @method static \Illuminate\Database\Eloquent\Builder|Project inProcess()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Project notStarted()
 * @method static \Illuminate\Database\Eloquent\Builder|Project onHold()
 * @method static \Illuminate\Database\Query\Builder|Project onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Project overdue()
 * @method static \Illuminate\Database\Eloquent\Builder|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereAllowClientNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCalculateTaskProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereClientViewTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCompletionPercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereHoursAllocated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereManualTimelog($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectBudget($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereProjectSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Project withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Project withoutTrashed()
 * @mixin \Eloquent
 * @property string|null $hash
 * @method static \Illuminate\Database\Eloquent\Builder|Project whereHash($value)
 * @property int $public
 * @method static \Illuminate\Database\Eloquent\Builder|Project wherePublic($value)
 */
class Project extends BaseModel
{
    use CustomFieldsTrait, HasFactory;
    use SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($item) {
            if ($item->isDirty('status') && in_array($item->status, ['finished', 'partially finished'])) {
                // The project_completion_time will be updated when a project is finished
                $project = Project::where('id', $item->id)->update([
                    'project_completion_time' => now()
                ]);

                $project = \App\Models\Project::with('times:id,project_id,total_minutes,total_hours,revision_id,revision_status')
                ->select('projects.id')
                ->selectRaw('SUM(project_deliverables.estimation_time) * 60 as total_estimate_minutes')
                ->join('project_milestones', function($join) {
                    $join->on('projects.id', '=', 'project_milestones.project_id')
                        ->where('project_milestones.status', '=', 'complete');
                })
                ->join('project_deliverables', 'project_milestones.id', '=', 'project_deliverables.milestone_id')
                ->groupBy('projects.id')
                ->find($item->id);

                if($project){
                    $totalLoggedMinutes = array_reduce($project->times->toArray(), function($carry, $item) {
                        return $carry + intval($item['total_minutes']);
                    }, 0);
    
                    $totalRevisionLoggedMinutes = array_reduce($project->times->toArray(), function($carry, $item) {
                        return $carry + ($item['revision_id'] ? intval($item['total_minutes']) : 0);
                    }, 0);
    
                    // Project Manager Point Distribution ( Estimated vs logged hours )
                    if($percentage = round(($totalLoggedMinutes / $project->total_estimate_minutes) * 100, 2)) ProjectManagerPointLogic::distribute(2, $item->id, $percentage);
    
                    // Project Manager Point Distribution ( Amount of revisions )
                    if($totalRevisionLoggedMinutes > 60 && $percentage = round(($totalRevisionLoggedMinutes / $project->total_estimate_minutes) * 100, 2)) ProjectManagerPointLogic::distribute(3, $item->id, $percentage);
                }

                // Project Manager Point Distribution ( Project completion )
                ProjectManagerPointLogic::distribute(5, $item->id, 1);

                $projectDeadlineItem = ProjectDeadlineExtension::where('project_id', $item->id)->first();
                // Project Manager Point Distribution ( Meeting the deadline )
                if (Carbon::parse($projectDeadlineItem ? $projectDeadlineItem->old_deadline : $item->deadline)->greaterThanOrEqualTo(Carbon::today())) ProjectManagerPointLogic::distribute(7, $item->id, 1);
            }
        });
    }

    protected $dates = ['start_date', 'deadline'];

    protected $guarded = ['id'];

    protected $appends = ['isProjectAdmin'];

    public $customFieldModel = 'App\Models\Project';

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class, 'category_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function clientdetails(): BelongsTo
    {
        return $this->belongsTo(ClientDetails::class, 'client_id', 'user_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(ProjectMember::class, 'project_id');
    }

    public function membersMany(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_members')->using(ProjectMember::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id')->orderBy('id', 'desc');
    }

    public function files(): HasMany
    {
        return $this->hasMany(ProjectFile::class, 'project_id')->orderBy('id', 'desc');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'project_id')->orderBy('id', 'desc');
    }

    public function issues(): HasMany
    {
        return $this->hasMany(Issue::class, 'project_id')->orderBy('id', 'desc');
    }

    public function times(): HasMany
    {
        return $this->hasMany(ProjectTimeLog::class, 'project_id')->with('breaks')->orderBy('id', 'desc');
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(ProjectMilestone::class, 'project_id')->orderBy('id', 'desc');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'project_id')->orderBy('id', 'desc');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ProjectNote::class, 'project_id')->orderBy('id', 'desc');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'project_id')->orderBy('id', 'desc');
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function discussions(): HasMany
    {
        return $this->hasMany(Discussion::class, 'project_id')->orderBy('id', 'desc');
    }

    public function rating(): HasOne
    {
        return $this->hasOne(ProjectRating::class);
    }

    /**
     * @return bool
     */
    public function checkProjectUser()
    {
        $project = ProjectMember::where('project_id', $this->id)
            ->where('user_id', auth()->user()->id)
            ->count();

        if ($project > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * @return bool
     */
    public function checkProjectClient()
    {
        $project = Project::where('id', $this->id)
            ->where('client_id', auth()->user()->id)
            ->count();

        if ($project > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    public static function clientProjects($clientId)
    {
        return Project::where('client_id', $clientId)->get();
    }

    public static function allProjects()
    {
        $projects = Project::leftJoin('project_members', 'project_members.project_id', 'projects.id')
            ->select('projects.*')
            ->orderBy('project_name', 'asc');

        if (!isRunningInConsoleOrSeeding()) {

            if (user()->permission('view_projects') == 'added') {
                $projects->where('projects.added_by', user()->id);
            }

            if (user()->permission('view_projects') == 'owned' && in_array('employee', user_roles())) {
                $projects->where('project_members.user_id', user()->id);
            }

            if (user()->permission('view_projects') == 'owned' && in_array('client', user_roles())) {
                $projects->where('projects.client_id', user()->id);
            }
        }

        return $projects->groupBy('projects.id')->get();
    }

    public static function allProjectsHavingClient()
    {
        $projects = Project::with('currency')->leftJoin('project_members', 'project_members.project_id', 'projects.id')
            ->whereNotNull('client_id')
            ->select('projects.*')
            ->orderBy('project_name', 'asc');

        if (!isRunningInConsoleOrSeeding()) {

            if (user()->permission('view_projects') == 'added') {
                $projects->where('projects.added_by', user()->id);
            }

            if (user()->permission('view_projects') == 'owned' && in_array('employee', user_roles())) {
                $projects->where('project_members.user_id', user()->id);
            }

            if (user()->permission('view_projects') == 'owned' && in_array('client', user_roles())) {
                $projects->where('projects.client_id', user()->id);
            }
        }

        return $projects->groupBy('projects.id')->get();
    }

    public static function byEmployee($employeeId)
    {
        return Project::join('project_members', 'project_members.project_id', '=', 'projects.id')
            ->where('project_members.user_id', $employeeId)
            ->get();
    }

    public function scopeCompleted($query)
    {
        return $query->where('completion_percent', '100');
    }

    public function scopeInProcess($query)
    {
        return $query->where('status', 'in progress');
    }

    public function scopeOnHold($query)
    {
        return $query->where('status', 'on hold');
    }

    public function scopeFinished($query)
    {
        return $query->where('status', 'finished');
    }

    public function scopeNotStarted($query)
    {
        return $query->where('status', 'not started');
    }

    public function scopeCanceled($query)
    {
        return $query->where('status', 'canceled');
    }

    public function scopeOverdue($query)
    {
        $setting = global_setting();
        return $query->where('completion_percent', '<>', '100')
            ->where('deadline', '<', Carbon::today()->timezone($setting->timezone));
    }

    public function getIsProjectAdminAttribute()
    {
        if (auth()->user() && $this->project_admin == auth()->user()->id) {
            return true;
        }

        return false;
    }

    public function pinned()
    {
        $pin = Pinned::where('user_id', user()->id)->where('project_id', $this->id)->first();

        if (!is_null($pin)) {
            return true;
        }

        return false;
    }
    public function deal()
    {
        return $this->belongsTo(Deal::class, 'deal_id');
    }
    public function pm()
    {
        return $this->belongsTo(User::class, 'pm_id');
    }
    public function project_type()
    {
        return $this->belongsTo(ProjectCategory::class, 'category_id');
    }
    public function signature(): HasOne
    {
        return $this->hasOne(ContractSign::class, 'project_id');
    }
    public function projectStatus()
    {
        return $this->belongsTo(ProjectStatus::class, 'status_id');
    }
    public function client_name()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    public function pm_name()
    {
        return $this->belongsTo(User::class, 'pm_id');
    }

    public function getActivityDescriptionForAttribute($attribute)
    {
        switch ($attribute) {
            case 'project_summary':
                return 'Project Summary';
            case 'project_name':
                return 'Project Name';
            // Add more cases for each attribute you want to customize
            default:
                return parent::getActivityDescriptionForAttribute($attribute);
        }
    }

    public function hasClientDisagree() : bool
    {
        $data = ProjectDeliverablesClientDisagree::where([
            'project_id' => $this->id,
            'status' => '0'
        ])->exists();

        if ($data) {
            return true;
        } else {
            return false;
        }
    }

    public function pmGoals()
    {
        return $this->hasMany(ProjectPmGoal::class, 'project_id');
    }

    public function pmProject()
    {
        return $this->hasOne(PMProject::class, 'project_id');
    }
}
