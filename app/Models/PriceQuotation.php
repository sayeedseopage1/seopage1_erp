<?php

namespace App\Models;

use App\Models\Currency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PriceQuotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial_no',
        'deal_stage_id',
        'project_cms_id',
        'project_niche_id',
        'no_of_primary_pages',
        'no_of_secondary_pages',
        'no_of_major_functionalities',
        'risk_factor',
        'total_hours_of_primary_page',
        'total_hours_of_secondary_page',
        'total_hours_of_major_functionality',
        'total_hours_of_others_works',
        'total_calculated_hours',
        'currency_id',
        'deadline_type',
        'no_of_days',
        'platform_account_id',
        'calculated_actual_budget',
        'calculated_usd_budget',
        'project_budget',
        'added_by'
    ];

    public function dealStage()
    {
        return $this->hasOne(DealStage::class, 'id', 'deal_stage_id');
    }

    public function projectCms()
    {
        return $this->hasOne(ProjectCms::class, 'id', 'project_cms_id');
    }

    public function projectNiche()
    {
        return $this->hasOne(ProjectNiche::class, 'id', 'project_niche_id');
    }

    public function currency()
    {
        return $this->hasOne(Currency::class, 'id', 'currency_id');
    }

    public function platformAccount()
    {
        return $this->hasOne(PlatformAccount::class, 'id', 'platform_account_id');
    }

    public function addedBy()
    {
        return $this->hasOne(User::class, 'id', 'added_by');
    }
}
