<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PermissionType
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PermissionType extends BaseModel
{
    use HasFactory;

    protected $guarded = ['id'];
}
