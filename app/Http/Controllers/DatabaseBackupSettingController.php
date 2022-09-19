<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\DatabaseBackup\UpdateRequest;
use App\Models\DatabaseBackupSetting;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class DatabaseBackupSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.menu.databaseBackupSetting');
        $this->activeSettingMenu = 'database_backup_settings';
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

    public function index()
    {
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

        $this->backupSetting = DatabaseBackupSetting::first();
        $this->backups = array_reverse($backups);

        return view('database-backup-settings.index', $this->data);
    }

    public function create()
    {
        $this->backupSetting = DatabaseBackupSetting::first();
        return view('database-backup-settings.settings', $this->data);
    }

    public function store(UpdateRequest $request)
    {
        $backupSetting = DatabaseBackupSetting::first();
        $backupSetting->status = isset($request->status) ? 'active' : 'inactive';
        $backupSetting->hour_of_day = Carbon::createFromFormat($this->global->time_format, $request->hour_of_day)->format('H:i:s');
        $backupSetting->backup_after_days = $request->backup_after_days;
        $backupSetting->delete_backup_after_days = $request->delete_backup_after_days;
        $backupSetting->save();

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function createBackup()
    {
        try {
            /* Only database backup */
            Artisan::call('backup:run --only-db');
            return Reply::success(__('messages.databasebackup.backedupSuccessful'));
        } catch (Exception $e) {
            return Reply::error(__('messages.databasebackup.databaseError'));
        }
    }

    public function download($file_name)
    {
        $file = config('laravel-backup.backup.name') . '/backup/' . $file_name;
        $disk = Storage::disk('localBackup');

        if ($disk->exists($file)) {
            $fs = Storage::disk('localBackup')->getDriver();
            $stream = $fs->readStream($file);

            return \Response::stream(function () use ($stream) {
                fpassthru($stream);
            }, 200, [
                'Content-disposition' => 'attachment; filename="' . basename($file) . '"',
            ]);
        }

        return Reply::error(__('messages.databasebackup.backupNotExist'));

    }

    public function delete($file_name)
    {
        $disk = Storage::disk('localBackup');

        if ($disk->exists(config('laravel-backup.backup.name') . '/backup/' . $file_name)) {
            $disk->delete(config('laravel-backup.backup.name') . '/backup/' . $file_name);

            // For showing number of backed-up databases
            $files = $disk->files('/backup');

            return Reply::successWithData(__('messages.databasebackup.backupDeleted'), ['fileCount' => count($files)]);

        }

        return Reply::error(__('messages.databasebackup.backupNotExist'));
    }

    public static function humanFileSize($size, $unit = '')
    {
        if ((!$unit && $size >= 1 << 30) || $unit == 'GB') {
            return number_format($size / (1 << 30), 2) . 'GB';
        }

        if ((!$unit && $size >= 1 << 20) || $unit == 'MB') {
            return number_format($size / (1 << 20), 2) . 'MB';
        }

        if ((!$unit && $size >= 1 << 10) || $unit == 'KB') {
            return number_format($size / (1 << 10), 2) . 'KB';
        }

        return number_format($size) . ' bytes';
    }

}
