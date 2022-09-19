<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\ProjectTemplateMember
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_template_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\ProjectTemplate $projectTemplate
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereProjectTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectTemplateMember whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectTemplateMember extends BaseModel
{
    use Notifiable;

    protected $with = ['user'];

    public function routeNotificationForMail()
    {
        return $this->user->email;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function projectTemplate(): BelongsTo
    {
        return $this->belongsTo(ProjectTemplate::class);
    }

    public static function byProject($id)
    {
        return ProjectTemplateMember::join('users', 'users.id', '=', 'project_template_members.user_id')
            ->where('project_template_members.project_id', $id)
            ->where('users.status', 'active')
            ->get();
    }

    public static function checkIsMember($projectId, $userId)
    {
        return ProjectTemplateMember::where('project_template_id', $projectId)
            ->where('user_id', $userId)->first();
    }

}
