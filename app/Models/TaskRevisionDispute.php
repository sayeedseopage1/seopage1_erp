<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskRevisionDispute extends Model
{
    use HasFactory;

    public function taskDisputeQuestions()
    {
        return $this->hasMany(TaskDisputeQuestion::class, 'dispute_id');
    }

    public function disputeWinner()
    {
        return $this->belongsTo(User::class, 'winner');
    }

    public function raisedBy()
    {
        return $this->belongsTo(User::class, 'raised_by');
    }
    public function raisedAgainst()
    {
        return $this->belongsTo(User::class, 'raised_against');
    }
}
