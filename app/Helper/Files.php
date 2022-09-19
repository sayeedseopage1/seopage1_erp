<?php

namespace App\Helper;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

/**
 * Class Reply
 * @package App\Classes
 */
class Files
{

    const UPLOAD_FOLDER = 'user-uploads';

    /**
     * @param mixed $image
     * @param string $dir
     * @param null $width
     * @param int $height
     * @param null $crop
     * @return string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public static function upload($image, string $dir, $width = null, int $height = 800, $crop = null)
    {
        // To upload files to local server
        config(['filesystems.default' => 'local']);

        $uploadedFile = $image;
        $folder = $dir . '/';

        if (!$uploadedFile->isValid()) {
            throw new \Exception('File was not uploaded correctly');
        }

        $newName = self::generateNewFileName($uploadedFile->getClientOriginalName());

        $tempPath = public_path(self::UPLOAD_FOLDER . '/temp/' . $newName);

        /** Check if folder exits or not. If not then create the folder */
        if (!File::exists(public_path(self::UPLOAD_FOLDER. '/' . $folder))) {
            File::makeDirectory(public_path(self::UPLOAD_FOLDER. '/' . $folder), 0775, true);
        }

        $newPath = $folder . '/' . $newName;

        $uploadedFile->storeAs('temp', $newName);

        if (!empty($crop)) {
            // Crop image
            if (isset($crop[0])) {
                // To store the multiple images for the copped ones
                foreach ($crop as $cropped) {
                    $image = Image::make($tempPath);

                    if (isset($cropped['resize']['width']) && isset($cropped['resize']['height'])) {

                        $image->crop(floor($cropped['width']), floor($cropped['height']), floor($cropped['x']), floor($cropped['y']));

                        $fileName = str_replace('.', '_' . $cropped['resize']['width'] . 'x' . $cropped['resize']['height'] . '.', $newName);
                        $tempPathCropped = public_path(self::UPLOAD_FOLDER. '/temp') . '/' . $fileName;
                        $newPathCropped = $folder . '/' . $fileName;

                        // Resize in Proper format
                        $image->resize($cropped['resize']['width'], $cropped['resize']['height'], function ($constraint) {
                            /* $constraint->aspectRatio();
                             $constraint->upsize();
                            */
                        });

                        $image->save($tempPathCropped);

                        Storage::put($newPathCropped, File::get($tempPathCropped), ['public']);

                        // Deleting cropped temp file
                        File::delete($tempPathCropped);
                    }

                }
            }
            else {
                $image = Image::make($tempPath);
                $image->crop(floor($crop['width']), floor($crop['height']), floor($crop['x']), floor($crop['y']));
                $image->save();
            }

        }

        if (($width || $height) && \File::extension($uploadedFile->getClientOriginalName()) !== 'svg') {
            // Crop image

            $image = Image::make($tempPath);
            $image->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $image->save();
        }

        Storage::put($newPath, File::get($tempPath), ['public']);

        // Deleting temp file
        File::delete($tempPath);


        return $newName;
    }

    public static function generateNewFileName($currentFileName)
    {
        $ext = strtolower(File::extension($currentFileName));
        $newName = md5(microtime());

        return ($ext === '') ? $newName : $newName . '.' . $ext;
    }

    /**
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     * @throws \Exception
     */
    public static function uploadLocalOrS3($uploadedFile, $dir)
    {
        if (!$uploadedFile->isValid()) {
            throw new \Exception('File was not uploaded correctly');
        }

        if (config('filesystems.default') === 'local') {
            $newName = self::upload($uploadedFile, $dir, false, false, false);
            // Add data to file_storage table
            return self::fileStore($uploadedFile, $dir, $newName);
        }

        // Add data to file_storage table
        $newName = self::fileStore($uploadedFile, $dir);


        // We have given 2 options of upload for now s3 and local
        Storage::disk('s3')->putFileAs($dir, $uploadedFile, $newName);

        return $newName;
    }

    public static function fileStore($file, $folder, $generateNewName = '')
    {

        // Keep $generateNewName empty if you do not want to generate new name
        $newName = ($generateNewName == '') ? self::generateNewFileName($file->getClientOriginalName()) : $generateNewName;
        $settings = storage_setting();
        $storageLocation = $settings->filesystem == 'aws_s3' ? 'aws_s3' : 'local';

        $fileStorage = new \App\Models\FileStorage();
        $fileStorage->filename = $newName;
        $fileStorage->size = $file->getSize();
        $fileStorage->path = $folder;
        $fileStorage->storage_location = $storageLocation;
        $fileStorage->save();

        return $newName;

    }

    public static function deleteFile($image, $folder)
    {
        $dir = trim($folder, '/');
        $path = Files::UPLOAD_FOLDER.'/'.$dir . '/' . $image;

        if (!File::exists(public_path($path))) {
            return true;
        }

        if (File::exists(public_path($path))) {
            try {
                Storage::delete($path);
                $fileStorageFile = \App\Models\FileStorage::where('filename', $image)->first();

                if($fileStorageFile){
                    $fileStorageFile->delete();
                }
            } catch (\Throwable $th) {
                return true;
            }
        }
    }

    public static function deleteDirectory($folder)
    {
        $dir = trim($folder);
        Storage::deleteDirectory($dir);
        return true;
    }

}
