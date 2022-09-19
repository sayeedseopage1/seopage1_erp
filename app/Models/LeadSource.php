<?php

namespace App\Models;

use App\Observers\LeadSourceObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\LeadSource
 *
 * @property int $id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Lead[] $leads
 * @property-read int|null $leads_count
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource query()
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LeadSource whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LeadSource extends BaseModel
{
    protected $table = 'lead_sources';

    protected $guarded = ['id'];

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'source_id')->orderBy('column_priority');
    }

}
