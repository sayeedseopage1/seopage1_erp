<?php

namespace App\Models;

use App\Traits\IconTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraphicTaskFile extends Model
{
    use HasFactory, IconTrait;

    const FILE_PATH = 'task-files';

    protected $appends = ['file_url', 'icon'];

    public function getFileUrlAttribute()
    {
        return 'https://seopage1storage.s3.ap-southeast-1.amazonaws.com/'.$this->hashname;
    }

    protected $fillable = [
        'task_id',
        'graphic_work_detail_id',
        'file_type',
        'filename',
        'hashname',
        'size',
        'user_id'
    ];
}
