<?php

namespace App\Models;

/**
 * App\Models\DatabaseBackupSetting
 *
 * @property int $id
 * @property string $status
 * @property string|null $hour_of_day
 * @property string|null $backup_after_days
 * @property string|null $delete_backup_after_days
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting whereBackupAfterDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting whereDeleteBackupAfterDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting whereHourOfDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DatabaseBackupSetting whereStatus($value)
 * @mixin \Eloquent
 */
class DatabaseBackupSetting extends BaseModel
{
    protected $table = 'database_backup_cron_settings';
    public $timestamps = false;
}
