<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceQuotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'deal_stage_id',
        'project_cms_id',
        'project_niche_id',
        'no_of_primary_pages',
        'no_of_secondary_pages',
        'no_of_major_functionalities',
        'risk_factor',
        'total_hours_of_others_works',
        'currency_id',
        'deadline_type',
        'deadline',
        'platform_account_id',
        'calculated_budget',
        'project_budget'
    ];
}
