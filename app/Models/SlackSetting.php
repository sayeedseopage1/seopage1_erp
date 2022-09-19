<?php

namespace App\Models;

/**
 * App\Models\SlackSetting
 *
 * @property int $id
 * @property string|null $slack_webhook
 * @property string|null $slack_logo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $status
 * @property-read mixed $icon
 * @property-read mixed $slack_logo_url
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereSlackLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereSlackWebhook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SlackSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SlackSetting extends BaseModel
{

    protected $appends = ['slack_logo_url'];

    public function getSlackLogoUrlAttribute()
    {
        if (is_null($this->slack_logo)) {
            return global_setting()->logo_url;
        }

        return asset_url('slack-logo/' . $this->slack_logo);
    }

    public static function setting()
    {
        return slack_setting();
    }

}
