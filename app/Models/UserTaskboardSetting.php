<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserTaskboardSetting
 *
 * @property int $id
 * @property int $user_id
 * @property int $board_column_id
 * @property int $collapsed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereCollapsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserTaskboardSetting whereUserId($value)
 * @mixin \Eloquent
 */
class UserTaskboardSetting extends BaseModel
{
    use HasFactory;

    protected $guarded = ['id'];
}
