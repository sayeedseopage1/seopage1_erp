<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\LeadsDealsActivityLogObserver;

class LeadsDealsActivityLog extends BaseModel
{
    use HasFactory;

    protected $table = 'leads_deals_activity_logs';
    
    public function addedBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}