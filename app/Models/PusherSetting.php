<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PusherSetting
 *
 * @property int $id
 * @property string|null $pusher_app_id
 * @property string|null $pusher_app_key
 * @property string|null $pusher_app_secret
 * @property string|null $pusher_cluster
 * @property int $force_tls
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereForceTls($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherAppSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting wherePusherCluster($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $taskboard
 * @property int $messages
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereMessages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PusherSetting whereTaskboard($value)
 */
class PusherSetting extends BaseModel
{
    //
}
