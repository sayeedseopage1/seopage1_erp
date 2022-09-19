<?php

namespace App\Models;

use App\Traits\CustomFieldsTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ProjectTemplate
 *
 * @property int $id
 * @property string $project_name
 * @property int|null $category_id
 * @property int|null $client_id
 * @property string|null $project_summary
 * @property string|null $notes
 * @property string|null $feedback
 * @property string $client_view_task
 * @property string $allow_client_notification
 * @property string $manual_timelog
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProjectCategory|null $category
 * @property-read \App\Models\User|null $client
 * @property-read mixed $extras
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateMember[] $members
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectTemplateTask[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereAllowClientNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereClientViewTask($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereManualTimelog($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereProjectSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplate whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $membersMany
 * @mixin \Eloquent
 * @property-read int|null $members_many_count
 */
class ProjectTemplate extends BaseModel
{
    use CustomFieldsTrait;

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class)->withoutGlobalScopes(['active']);
    }

    public function members(): HasMany
    {
        return $this->hasMany(ProjectTemplateMember::class );
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(ProjectTemplateTask::class, 'project_template_id')->orderBy('id', 'desc');
    }

    /**
     * @return bool
     */
    public function checkProjectUser()
    {
        $project = ProjectTemplateMember::where('project_template_id', $this->id)
            ->where('user_id', auth()->user()->id)
            ->count();

        if($project > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * @return bool
     */
    public function checkProjectClient()
    {
        $project = ProjectTemplateMember::where('id', $this->id)
            ->where('client_id', auth()->user()->id)
            ->count();

        if($project > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    public static function clientProjects($clientId)
    {
        return ProjectTemplateMember::where('client_id', $clientId)->get();
    }

    public static function byEmployee($employeeId)
    {
        return ProjectTemplateMember::join('project_template_members', 'project_template_members.project_template_id', '=', 'project_templates.id')
            ->where('project_template_members.user_id', $employeeId)
            ->get();
    }

    public function membersMany(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_template_members');
    }

}
