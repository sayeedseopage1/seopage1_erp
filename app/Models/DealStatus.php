<?php

namespace App\Models;

use App\Observers\LeadStatusObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\LeadStatus
 *
 * @property int $id
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $priority
 * @property int $default
 * @property string $label_color
 * @property-read mixed $icon
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DealStage[] $leads
 * @property-read int|null $leads_count
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereLabelColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DealStatus whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DealStatus extends BaseModel
{
    protected $table = 'deal_status';

    public function deals(): HasMany
    {
        return $this->hasMany(DealStage::class, 'status_id')->orderBy('column_priority');
    }

    public function userSetting(): HasOne
    {
        return $this->hasOne(UserDealboardSetting::class, 'board_column_id')->where('user_id', user()->id);
    }

}
