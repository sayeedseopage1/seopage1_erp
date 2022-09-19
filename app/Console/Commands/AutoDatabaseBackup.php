<?php

namespace App\Console\Commands;

use App\Models\DatabaseBackupSetting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class AutoDatabaseBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create-database-backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'auto create database backup';

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
            $backups = [];

            foreach ($files as $file) {
                if (substr($file, -4) == '.zip' && $disk->exists($file)) {
                    $backups[] = [
                        'file_path' => $file,
                        'file_name' => str_replace(config('laravel-backup.backup.name') . 'backup/', '', $file),
                        'file_size' => $disk->size($file),
                        'last_modified' => $disk->lastModified($file),
                    ];
                }
            }

            $backups = array_reverse($backups);

            if(count($backups) == 0){
                Artisan::call('backup:run --only-db');
            }
            else {
                $date = Carbon::parse(($backups)[0]['last_modified']);
                $now = now();
                $dateDifference = $date->diffInDays($now);
                $backupSetting = DatabaseBackupSetting::first();

                if($dateDifference >= $backupSetting->backup_after_days && now()->setTimezone(global_setting()->timezone)->format('H:i:s') >= \Carbon\Carbon::createFromFormat('H:i:s', $backupSetting->hour_of_day)->format('H:i:s')){
                    Artisan::call('backup:run --only-db');
                }
            }

        }

    }

}
