<?php

namespace App\Models;

use App\Observers\ProjectNoteObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ProjectNote
 *
 * @property int $id
 * @property int|null $project_id
 * @property string $title
 * @property int $type
 * @property int|null $client_id
 * @property int $is_client_show
 * @property int $ask_password
 * @property string $details
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectUserNote[] $members
 * @property-read \App\Models\Project $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectUserNote[] $noteUsers
 * @property-read int|null $members_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereAskPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereIsClientShow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectNote whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read int|null $note_users_count
 */
class ProjectNote extends BaseModel
{

    public function members(): HasMany
    {
        return $this->hasMany(ProjectUserNote::class, 'project_note_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function noteUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_user_notes');
    }

}
