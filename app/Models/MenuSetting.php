<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Psy\Util\Json;

/**
 * App\Models\MenuSetting
 *
 * @property int $id
 * @property string|null $main_menu
 * @property string|null $default_main_menu
 * @property string|null $setting_menu
 * @property string|null $default_setting_menu
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereDefaultMainMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereDefaultSettingMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereMainMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereSettingMenu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class MenuSetting extends BaseModel
{
    protected $table = 'menu_settings';

    public function getMainMenuAttribute($value)
    {
        // decode json to array
        $settings = json_decode($value);

        // fetch all menus
        $menus = Menu::where('setting_menu', 0)->get();

        $menuSettings = [];

        foreach($settings as $key => $setting) {
            if(isset($setting->children)){
                $children = $setting->children;

                $menuObj = $menus->filter(function($item) use($setting) {
                    return $item->id == $setting->id; /* @phpstan-ignore-line */
                })->first();

                if($menuObj) {
                    $menuSettings[$key] = [
                        'id' => $menuObj->id,
                        'menu_name' => $menuObj->menu_name,
                        'translate_name' => $menuObj->translate_name,
                        'translated_name' => __($menuObj->translate_name),
                        'route' => $menuObj->route,
                        'module' => $menuObj->module,
                        'icon' => $menuObj->icon,
                        'setting_menu' => $menuObj->setting_menu,
                    ];
                }

                foreach($children as $childKey => $child) {
                    $menuObj = $menus->filter(function($item) use($child) {
                        return $item->id == $child->id;
                    })->first();

                    if($menuObj) {
                        $menuSettings[$key]['children'][] = [
                            'id' => $menuObj->id,
                            'menu_name' => $menuObj->menu_name,
                            'translate_name' => $menuObj->translate_name,
                            'translated_name' => __($menuObj->translate_name),
                            'route' => $menuObj->route,
                            'module' => $menuObj->module,
                            'icon' => $menuObj->icon,
                            'setting_menu' => $menuObj->setting_menu,
                        ];
                    }
                }
            } else {
                $menuObj = $menus->filter(function($item) use($setting) {
                    return $item->id == $setting->id;
                })->first();

                if($menuObj) {
                    $menuSettings[$key] = [
                        'id' => $menuObj->id,
                        'menu_name' => $menuObj->menu_name,
                        'translate_name' => $menuObj->translate_name,
                        'translated_name' => __($menuObj->translate_name),
                        'route' => $menuObj->route,
                        'module' => $menuObj->module,
                        'icon' => $menuObj->icon,
                        'setting_menu' => $menuObj->setting_menu,
                    ];
                }


            }
        }

        return $menuSettings;
    }

    public function getSettingMenuAttribute($value)
    {
        // decode json to array
        $settings = json_decode($value);

        // fetch all menus
        $menus = Menu::where('setting_menu', 1)->get();

        $settingMenu = [];

        foreach($settings as $key => $setting) {
            if(isset($setting->children)) {
                $children = $setting->children;

                $menuObj = $menus->filter(function($item) use($setting) {
                    return $item->id == $setting->id; /* @phpstan-ignore-line */
                })->first();

                if($menuObj) {
                    $settingMenu[$key] = [
                        'id' => $menuObj->id,
                        'menu_name' => $menuObj->menu_name,
                        'translate_name' => $menuObj->translate_name,
                        'translated_name' => __($menuObj->translate_name),
                        'route' => $menuObj->route,
                        'module' => $menuObj->module,
                        'icon' => $menuObj->icon,
                        'setting_menu' => $menuObj->setting_menu,
                    ];
                }

                foreach($children as $childKey => $child) {
                    $menuObj = $menus->filter(function($item) use($child) {
                        return $item->id == $child->id;
                    })->first();

                    if($menuObj) {
                        $settingMenu[$key]['children'][] = [
                            'id' => $menuObj->id,
                            'menu_name' => $menuObj->menu_name,
                            'translate_name' => $menuObj->translate_name,
                            'translated_name' => __($menuObj->translate_name),
                            'route' => $menuObj->route,
                            'module' => $menuObj->module,
                            'icon' => $menuObj->icon,
                            'setting_menu' => $menuObj->setting_menu,
                        ];
                    }
                }
            } else {
                $menuObj = $menus->filter(function($item) use($setting) {
                    return $item->id == $setting->id;
                })->first();

                if($menuObj) {
                    $settingMenu[$key] = [
                        'id' => $menuObj->id,
                        'menu_name' => $menuObj->menu_name,
                        'translate_name' => $menuObj->translate_name,
                        'translated_name' => __($menuObj->translate_name),
                        'route' => $menuObj->route,
                        'module' => $menuObj->module,
                        'icon' => $menuObj->icon,
                        'setting_menu' => $menuObj->setting_menu,
                    ];

                }

            }
        }

        return $settingMenu;
    }

}
