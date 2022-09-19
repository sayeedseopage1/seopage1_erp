<?php
namespace App\Models;

use App\Observers\HolidayObserver;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property \Illuminate\Support\Carbon $date
 * @property string|null $occassion
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read \App\Models\User|null $addedBy
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday query()
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereOccassion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $event_id
 * @method static \Illuminate\Database\Eloquent\Builder|Holiday whereEventId($value)
 */
class Holiday extends BaseModel
{
    // Don't forget to fill this array
    protected $fillable = ['date', 'occassion'];

    protected $guarded = ['id'];
    protected $dates = ['date'];

    public static function getHolidayByDates($startDate, $endDate)
    {
        return Holiday::select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as holiday_date'), 'occassion')->where('date', '>=', $startDate)->where('date', '<=', $endDate)->get();
    }

    public static function checkHolidayByDate($date)
    {
        return Holiday::Where('date', $date)->first();
    }

    public function addedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by')->withoutGlobalScopes(['active']);
    }

}
