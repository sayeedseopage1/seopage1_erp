<?php

namespace App\Models;

use App\Models\User;
use App\Models\ProjectTimeLog;
use App\Models\TaskRevisionDispute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskRevision extends Model
{
    use HasFactory;

    protected $appends = ['total_log_time'];

    protected function totalLogTime(): Attribute
    {
        return new Attribute(
            get: fn () => $this->timeLogs->sum('total_minutes'),
        );
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function taskRevisionDispute()
    {
        return $this->hasOne(TaskRevisionDispute::class, 'revision_id');
    }

    public function timeLogs()
    {
        return $this->hasMany(ProjectTimeLog::class, 'revision_id');
    }
}
