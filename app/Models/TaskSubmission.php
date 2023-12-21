<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Task;

class TaskSubmission extends Model
{
    use HasFactory;
      protected $table = 'task_submissions';
      public function user()
      {
          return $this->belongsTo(User::class, 'user_id');
      }
      public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
