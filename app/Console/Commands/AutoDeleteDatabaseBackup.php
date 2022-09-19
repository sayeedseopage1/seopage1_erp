<?php

namespace App\Console\Commands;

use App\Models\DatabaseBackupSetting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class AutoDeleteDatabaseBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete-database-backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'auto delete database backup';

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        $setting = DatabaseBackupSetting::first();

        if($setting && $setting->status == 'active') {

            $disk = Storage::disk('localBackup');
            $files = $disk->files('/backup');
            $backupSetting = DatabaseBackupSetting::first();

            foreach ($files as $file) {
                if (substr($file, -4) == '.zip' && $disk->exists($file)) {
                    $date = Carbon::parse($disk->lastModified($file));
                    $now = now();
                    $dateDifference = $date->diffInDays($now);

                    // If file is older, remove it
                    if((int)$backupSetting->delete_backup_after_days > 0 && $dateDifference >= (int)$backupSetting->delete_backup_after_days){
                        $disk->delete('backup/'.str_replace(config('laravel-backup.backup.name') . 'backup/', '', $file));
                    }
                }
            }
        }
    }

}
