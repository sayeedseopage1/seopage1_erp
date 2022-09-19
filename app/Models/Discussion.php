<?php

namespace App\Models;

use App\Observers\DiscussionObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Discussion
 *
 * @property int $id
 * @property int $discussion_category_id
 * @property int|null $project_id
 * @property string $title
 * @property string|null $color
 * @property int $user_id
 * @property int $pinned
 * @property int $closed
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon $last_reply_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $best_answer_id
 * @property int|null $last_reply_by_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\DiscussionCategory $category
 * @property-read \App\Models\User|null $lastReplyBy
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DiscussionReply[] $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereBestAnswerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereClosed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereDiscussionCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastReplyAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastReplyById($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion wherePinned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUserId($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DiscussionFile[] $files
 * @property-read int|null $files_count
 */
class Discussion extends BaseModel
{

    protected $guarded = ['id'];
    protected $dates = ['last_reply_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lastReplyBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_reply_by_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(DiscussionReply::class, 'discussion_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(DiscussionCategory::class, 'discussion_category_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(DiscussionFile::class, 'discussion_id');
    }

}
