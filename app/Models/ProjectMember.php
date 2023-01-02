<?php

namespace App\Models;

use App\Observers\ProjectMemberObserver;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\ProjectMember
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $hourly_rate
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Project $project
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereHourlyRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMember whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectMember extends Pivot
{
    use Notifiable;

    protected $hidden = ['user_id', 'project_id'];
    protected $table = 'project_members';

    public function routeNotificationForMail()
    {
        return $this->user->email;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public static function byProject($id)
    {
        return ProjectMember::join('users', 'users.id', '=', 'project_members.user_id')
            ->where('project_members.project_id', $id)
            ->where('users.status', 'active')
            ->get();
    }

    public static function checkIsMember($projectId, $userId)
    {
        return ProjectMember::where('project_id', $projectId)
            ->where('user_id', $userId)->first();
    }
    public function usr()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
