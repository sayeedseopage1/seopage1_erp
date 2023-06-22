<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskNoteFile extends Model
{
    use IconTrait;
    const FILE_PATH = 'task-files';

    protected $appends = ['file_url', 'icon'];

    public function getFileUrlAttribute()
    {
        return (!is_null($this->external_link)) ? $this->external_link : asset_url_local_s3('task-files/' . $this->task_id . '/' . $this->hashname);
    }
}
