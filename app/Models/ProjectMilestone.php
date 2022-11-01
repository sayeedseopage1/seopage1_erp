<?php

namespace App\Models;

use App\Observers\ProjectMilestoneObserver;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ProjectMilestone
 *
 * @property int $id
 * @property int|null $project_id
 * @property int|null $currency_id
 * @property string $milestone_title
 * @property string $summary
 * @property float $cost
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $invoice_created
 * @property int|null $invoice_id
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\Currency|null $currency
 * @property-read mixed $icon
 * @property-read \App\Models\Project|null $project
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereCurrencyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereInvoiceCreated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereMilestoneTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProjectMilestone whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectMilestone extends BaseModel
{
    protected $dates = ['start_date', 'end_date'];
    // public function project()
    // {
    //     return $this->belongsTo(User::class, 'pm_id');
    // }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'milestone_id');
    }

}
