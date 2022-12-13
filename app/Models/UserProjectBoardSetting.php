<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserProjectboardSetting
 *
 * @property int $id
 * @property int $user_id
 * @property int $board_column_id
 * @property int $collapsed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereBoardColumnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereCollapsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProjectboardSetting whereUserId($value)
 * @mixin \Eloquent
 */
class UserProjectBoardSetting extends BaseModel
{
    use HasFactory;
    protected $guarded = ['id'];

}
