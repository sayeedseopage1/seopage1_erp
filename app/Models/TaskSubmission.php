<?php

namespace App\Models;

use App\Models\Task;
use App\Models\User;
use App\Models\ProjectTimeLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskSubmission extends Model
{
    use HasFactory;
    protected $table = 'task_submissions';
    protected $appends = ['total_log_time'];

    protected function totalLogTime(): Attribute
    {
        return new Attribute(
            get: fn () => $this->timeLogs->sum('total_minutes'),
        );
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function timeLogs()
    {
        return $this->hasMany(ProjectTimeLog::class, 'task_id', 'task_id');
    }
}
