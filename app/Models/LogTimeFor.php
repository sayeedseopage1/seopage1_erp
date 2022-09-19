<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Holiday
 *
 * @package App\Models
 * @property int $id
 * @property string $log_time_for
 * @property string $auto_timer_stop
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $approval_required
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor query()
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereApprovalRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereAutoTimerStop($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereLogTimeFor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LogTimeFor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LogTimeFor extends BaseModel
{
    // Don't forget to fill this array
    protected $fillable = [];

    protected $guarded = ['id'];
    protected $table = 'log_time_for';

}
