<?php

namespace App\Models;

use App\Models\TaskRevisionDispute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskRevision extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function taskRevisionDispute()
    {
        return $this->hasOne(TaskRevisionDispute::class, 'revision_id');
    }
}
