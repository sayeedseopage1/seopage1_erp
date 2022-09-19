<?php

namespace App\Models;

use App\Observers\IssueObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\Issue
 *
 * @property int $id
 * @property string $description
 * @property int|null $user_id
 * @property int|null $project_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project|null $project
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereUserId($value)
 * @mixin \Eloquent
 */
class Issue extends BaseModel
{
    use Notifiable;

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    /**
     * @param int $projectId
     * @param null $userID
     * @return Issue[]|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public static function projectIssuesPending($projectId, $userID = null)
    {
        $projectIssue = Issue::where('project_id', $projectId);

        if ($userID) {
            $projectIssue = $projectIssue->where('user_id', '=', $userID);
        }

        $projectIssue = $projectIssue->where('status', 'pending')
            ->get();

        return $projectIssue;
    }

    public function checkIssueClient(): bool
    {
        $issue = Issue::where('id', $this->id)
            ->where('user_id', auth()->user()->id)
            ->count();

        if ($issue > 0) {
            return true;
        }

        return false;

    }

}
