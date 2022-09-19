<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Team
 *
 * @mixin \Eloquent
 * @property int $id
 * @property string $team_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read int|null $members_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeDetails[] $teamMembers
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Team[] $childs
 * @property-read int|null $team_members_count
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereTeamName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\EmployeeTeam[] $members
 */

class Team extends BaseModel
{
    protected $fillable = ['team_name'];

    public function members(): HasMany
    {
        return $this->hasMany(EmployeeTeam::class, 'team_id');
    }

    public function teamMembers(): HasMany
    {
        return $this->hasMany(EmployeeDetails::class, 'department_id');
    }

    public static function allDepartments()
    {
        if (user()->permission('view_department') == 'all' || user()->permission('view_department') == 'none') {
            return Team::all();
        }

        return Team::where('added_by', user()->id)->get();
    }

    public function childs(): HasMany
    {
        return $this->hasMany(Team::class, 'parent_id')->with('childs');
    }

}
