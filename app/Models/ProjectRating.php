<?php

namespace App\Models;

use App\Observers\ProjectRatingObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ProjectRating
 *
 * @property int $id
 * @property int $project_id
 * @property float $rating
 * @property string|null $comment
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Project $project
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectRating whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectRating extends BaseModel
{

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

}
