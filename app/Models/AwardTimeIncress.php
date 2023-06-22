<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardTimeIncress extends Model
{
    use HasFactory;
    protected $table = 'award_time_incresses_request';

    public function project()
    {
        return $this->belongsTo(Project::class, 'deal_id', 'deal_id');
    }

    public function deal()
    {
        return $this->belongsTo(Deal::class, 'deal_id', 'id');
    }

    public function request_from_user()
    {
        return $this->belongsTo(User::class, 'request_from', 'id');
    }
}
