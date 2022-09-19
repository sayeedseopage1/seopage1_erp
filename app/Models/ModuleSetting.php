<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ModuleSetting
 *
 * @property int $id
 * @property string $module_name
 * @property string $status
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereModuleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ModuleSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ModuleSetting extends BaseModel
{

    protected $guarded = ['id'];

    public static function checkModule($moduleName)
    {

        $user = user();

        $module = ModuleSetting::where('module_name', $moduleName);

        if (in_array('admin', user_roles())) {
            $module = $module->where('type', 'admin');

        }
        elseif (in_array('client', user_roles())) {
            $module = $module->where('type', 'client');

        }
        elseif (in_array('employee', user_roles())) {
            $module = $module->where('type', 'employee');
        }

        $module = $module->where('status', 'active');

        $module = $module->first();

        return $module ? true : false;
    }

}
