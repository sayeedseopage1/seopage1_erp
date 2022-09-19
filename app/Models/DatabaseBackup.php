<?php

namespace App\Models;

/**
 * App\Models\DatabaseBackup
 *
 * @property int $id
 * @property string|null $filename
 * @property string|null $size
 * @property \Illuminate\Support\Carbon|null $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup query()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackup whereSize($value)
 * @mixin \Eloquent
 */
class DatabaseBackup extends BaseModel
{
    protected $table = 'database_backups';
}
