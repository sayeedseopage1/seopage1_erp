<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ThemeSetting
 *
 * @property int $id
 * @property string $panel
 * @property string $header_color
 * @property string $sidebar_color
 * @property string $sidebar_text_color
 * @property string $link_color
 * @property string|null $user_css
 * @property string $sidebar_theme
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereHeaderColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereLinkColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting wherePanel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarTextColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereSidebarTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ThemeSetting whereUserCss($value)
 * @mixin \Eloquent
 */
class ThemeSetting extends BaseModel
{
    //
}
