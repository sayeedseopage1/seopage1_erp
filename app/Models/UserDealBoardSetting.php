<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserDealboardSetting
 *
 * @property int $id
 * @property int $user_id
 * @property int $board_column_id
 * @property int $collapsed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereCollapsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserDealboardSetting whereUserId($value)
 * @mixin \Eloquent
 */
class UserDealboardSetting extends BaseModel
{
    use HasFactory;
    protected $guarded = ['id'];

}
