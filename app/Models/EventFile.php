<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EventFile extends BaseModel
{
    use IconTrait;

    use HasFactory;

    const FILE_PATH = 'events';

    protected $appends = ['file_url', 'icon'];

    public function getFileUrlAttribute()
    {
        return asset_url_local_s3(EventFile::FILE_PATH . '/' . $this->event_id . '/' . $this->hashname);
    }

}
