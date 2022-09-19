<?php

namespace App\Models;

use Froiden\RestAPI\ApiModel;

/**
 * App\Models\BaseModel
 *
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel query()
 * @mixin \Eloquent
 */
class BaseModel extends ApiModel
{

    public static function options($items, $group = null, $columnName = null)
    {
        $options = '<option value="">--</option>';


        foreach ($items as $item) {

            $name = is_null($columnName) ? $item->name : $item->{$columnName};

            $selected = (!is_null($group) && ($item->id == $group->id)) ? 'selected' : '';

            $options .= '<option ' . $selected . ' value="' . $item->id . '"> ' . $name . ' </option>';
        }

        return $options;
    }

}
