<?php

namespace App\Models;
use App\Observers\ProjectActivityObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProjectActivity
 *
 * @property int $id
 * @property int $project_id
 * @property string $activity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectActivity whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectActivity extends BaseModel
{
    protected $observer = ProjectActivityObserver::class;
    protected $table = 'project_activity';

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public static function getProjectActivities($projectId, $limit, $userID = null)
    {
        $projectActivity = ProjectActivity::select('project_activity.id', 'project_activity.project_id', 'project_activity.activity', 'project_activity.created_at', 'project_activity.updated_at');

        if ($userID) {
            $projectActivity = $projectActivity->join('projects', 'projects.id', '=', 'project_activity.project_id')
                ->join('project_members', 'project_members.project_id', '=', 'projects.id')
                ->where('project_members.user_id', '=', $userID);
        }

        $projectActivity = $projectActivity->where('project_activity.project_id', $projectId)
            ->orderBy('project_activity.id', 'desc')
            ->limit($limit)
            ->get();

        return $projectActivity;
    }

    public function addedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by');
    }
}
