<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CustomFieldGroup
 *
 * @property int $id
 * @property string $name
 * @property string|null $model
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomFieldGroup whereName($value)
 * @mixin \Eloquent
 */
class CustomFieldGroup extends BaseModel
{
    public $timestamps = false;

}
