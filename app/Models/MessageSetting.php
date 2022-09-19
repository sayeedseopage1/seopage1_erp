<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MessageSetting
 *
 * @property int $id
 * @property string $allow_client_admin
 * @property string $allow_client_employee
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereAllowClientAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereAllowClientEmployee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MessageSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MessageSetting extends BaseModel
{
    //
}
