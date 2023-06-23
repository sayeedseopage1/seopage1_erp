<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskReply extends Model
{
    use HasFactory;
    protected $with = 'user';
    protected $table = 'task_replies';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
