<?php

namespace App\Models;

use App\Models\Lead;
use App\Models\User;
use App\Models\Project;
use App\Models\Currency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Deal extends Model
{
    use HasFactory;
    protected $table = 'deals';

    static $saleAnalysisStatus = ['previous-won', 'previous-denied', 'pending', 'analysis', 'authorized', 'auto-authorized', 'denied', 'no-analysis'];

    public function original_currency()
    {
        return $this->belongsTo(Currency::class, 'original_currency_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
    public function pm()
    {
        return $this->belongsTo(User::class, 'pm_id');
    }
    public function lead()
    {
        return $this->belongsTo(Lead::class, 'lead_id');
    }
    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id')->withoutGlobalScopes(['active']);
    }

    public function has_award_time_request()
    {
        return $this->belongsTo(AwardTimeIncress::class, 'id', 'deal_id');
    }

    public function pm_project(): HasOne
    {
        return $this->hasOne(PMProject::class, 'deal_id');
    }

    public function project(): HasOne
    {
        return $this->hasOne(Project::class, 'deal_id');
    }

    public function dealStageChanges()
    {
        return $this->hasMany(DealStageChange::class, 'deal_id', 'deal_id');
    }
    // public function dealStageChangesQualifying()
    // {
    //     return $this->hasMany(DealStageChange::class, 'deal_id', 'deal_id')->where('deal_stage_id', 1);
    // }
}
