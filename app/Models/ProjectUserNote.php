<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProjectUserNote
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_note_id
 * @property int|null $client_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProjectMember[] $members
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereProjectNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectUserNote whereUserId($value)
 * @mixin \Eloquent
 */
class ProjectUserNote extends BaseModel
{
    protected $table = 'project_user_notes';
    protected $fillable = ['user_id', 'project_note_id'];

}
