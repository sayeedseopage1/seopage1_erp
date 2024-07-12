<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];
}
