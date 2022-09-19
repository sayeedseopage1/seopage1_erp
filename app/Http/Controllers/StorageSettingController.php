<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Admin\Storage\StoreRequest;
use App\Models\FileStorage;
use App\Models\StorageSetting;
use App\Helper\Files;
use App\Http\Requests\Settings\StorageAwsFileUpload;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class StorageSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.storageSettings';
        $this->activeSettingMenu = 'storage_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_storage_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->awsCredentials = StorageSetting::where('filesystem', 'aws_s3')->first();
        $this->localCredentials = StorageSetting::where('filesystem', 'local')->first();

        $authKeys = !is_null($this->awsCredentials) ? json_decode($this->awsCredentials->auth_keys) : '';

        $this->driver = $authKeys !== '' ? $authKeys->driver : '';
        $this->key = $authKeys !== '' ? $authKeys->key : '';
        $this->secret = $authKeys !== '' ? $authKeys->secret : '';
        $this->region = $authKeys !== '' ? $authKeys->region : '';
        $this->bucket = $authKeys !== '' ? $authKeys->bucket : '';

        $this->awsRegions = StorageSetting::$awsRegions;
        $this->localFilesCount = FileStorage::where('storage_location', 'local')->count();

        return view('storage-settings.index', $this->data);
    }

    /**
     * @param StoreRequest $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreRequest $request)
    {

        $storageData = StorageSetting::all();

        if (count($storageData) > 0) {
            foreach ($storageData as $data) {
                $data->status = 'disabled';
                $data->save();
            }
        }

        $storage = StorageSetting::firstorNew(['filesystem' => $request->storage]);

        switch ($request->storage) {
        case 'local':
            $storage->filesystem = $request->storage;
            $storage->status = 'enabled';
                break;
        case 'aws_s3':
            $storage->filesystem = $request->storage;
            $json = '{"driver": "s3", "key": "' . $request->aws_key . '", "secret": "' . $request->aws_secret . '", "region": "' . $request->aws_region . '", "bucket": "' . $request->aws_bucket . '"}';
            $storage->auth_keys = $json;
            $storage->status = 'enabled';
                break;
        }

        $storage->save();

        cache()->forget('storage-setting');
        session(['storage_setting' => StorageSetting::where('status', 'enabled')->first()]);
        return Reply::success(__('messages.settingsUpdated'));
    }

    public function awsTestModal()
    {
        return view('storage-settings.test-aws');
    }

    public function awsTest(StorageAwsFileUpload $request)
    {
        $file = $request->file('file');
        $filename = Files::uploadLocalOrS3($file, '/');

        $fileUrl = asset_url_local_s3($filename);
        return Reply::successWithData(__('messages.fileUploaded'), ['fileurl' => $fileUrl]);
    }

    public function awsLocalToAwsModal()
    {
        $this->files = FileStorage::orderBy('storage_location', 'asc')->get();
        $this->localFilesCount = FileStorage::where('storage_location', 'local')->count();

        return view('storage-settings.local-to-aws', $this->data);
    }

    /**
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function moveFilesLocalToAwsS3()
    {
        $files = FileStorage::where('storage_location', 'local')->get();

        foreach ($files as $file) {
            $contents = public_path(Files::UPLOAD_FOLDER . '/' . $file->path . '/' . $file->filename);
            $uploaded = Storage::disk('s3')->put($file->path . '/' . $file->filename, $contents);

            if ($uploaded) {
                $file->storage_location = 'aws_s3';
                $file->save();
                $this->deleteFileFromLocal($contents);
            }
        }

        return Reply::successWithData(__('messages.filesMoveToAwsSuccessfully'), ['fileurl' => 'done']);
    }

    private function deleteFileFromLocal($filePath)
    {
        if (File::exists($filePath)) {
            try {
                unlink($filePath);
            } catch (\Throwable $th) {
                return true;
            }
        }
    }

}
