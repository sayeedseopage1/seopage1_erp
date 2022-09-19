<?php

namespace App\Traits;

trait IconTrait
{
    protected $mimeType = [
        'txt' => 'fa-file-alt',
        'htm' => 'fa-file-code',
        'html' => 'fa-file-code',
        'css' => 'fa-file-code-o',
        'js' => 'fa-file-code',
        'json' => 'fa-file-code',
        'xml' => 'fa-file-code',
        'swf' => 'fa-file',
        'CR2' => 'fa-file',
        'flv' => 'fa-file-video',

        // images
        'png' => 'fa-file-image',
        'jpe' => 'fa-file-image',
        'jpeg' => 'fa-file-image',
        'jpg' => 'fa-file-image',
        'gif' => 'fa-file-image',
        'bmp' => 'fa-file-image',
        'ico' => 'fa-file-image',
        'tiff' => 'fa-file-image',
        'tif' => 'fa-file-image',
        'svg' => 'fa-file-image',
        'svgz' => 'fa-file-image',

        // archives
        'zip' => 'fa-file-archive',
        'rar' => 'fa-file-archive',
        'exe' => 'fa-file-archive',
        'msi' => 'fa-file-archive',
        'cab' => 'fa-file-archive',

        // audio/video
        'mp3' => 'fa-file-audio',
        'qt' => 'fa-file-video',
        'mov' => 'fa-file-video',
        'mp4' => 'fa-file-video',
        'mkv' => 'fa-file-video',
        'avi' => 'fa-file-video',
        'wmv' => 'fa-file-video',
        'mpg' => 'fa-file-video',
        'mp2' => 'fa-file-video',
        'mpeg' => 'fa-file-video',
        'mpe' => 'fa-file-video',
        'mpv' => 'fa-file-video',
        '3gp' => 'fa-file-video',
        'm4v' => 'fa-file-video',
        'webm' => 'fa-file-video',

        // adobe
        'pdf' => 'fa-file-pdf',
        'psd' => 'fa-file-image',
        'ai' => 'fa-file',
        'eps' => 'fa-file',
        'ps' => 'fa-file',

        // ms office
        'doc' => 'fa-file-alt',
        'rtf' => 'fa-file-alt',
        'xls' => 'fa-file-excel',
        'ppt' => 'fa-file-powerpoint',
        'docx' => 'fa-file-word',
        'xlsx' => 'fa-file-excel',
        'pptx' => 'fa-file-powerpoint',


        // open office
        'odt' => 'fa-file-alt',
        'ods' => 'fa-file-alt',
    ];

    public function getIconAttribute()
    {

        $ext = pathinfo($this->filename, PATHINFO_EXTENSION); /* @phpstan-ignore-line */

        if (in_array($ext, ['png', 'jpe', 'jpeg', 'jpg', 'gif', 'bmp', 'ico', 'tif', 'svg', 'svgz', 'psd', 'csv'])) {
            return 'images';
        }

        if (!in_array($ext, array_keys($this->mimeType))) {
            $ext = 'doc';
        }

        return $this->mimeType[strtolower($ext)];
    }

}
