<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraphicTaskFile extends Model
{
    use HasFactory;

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
