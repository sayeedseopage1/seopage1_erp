<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kpiSetting extends Model
{
    use HasFactory;

    public function generate_sales()
    {
        return $this->hasMany(kpiSettingGenerateSale::class, 'kpi_id');
    }

    public function logged_hours()
    {
        return $this->hasMany(kpiSettingLoggedHour::class, 'kpi_id');
    }
}
