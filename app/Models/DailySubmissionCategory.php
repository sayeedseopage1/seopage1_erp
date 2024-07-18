<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySubmissionCategory extends Model
{
    use HasFactory;
    public function dailySubmissionFields()
    {
        return $this->hasMany(DailySubmissionField::class, 'daily_submission_category_id');
    }
}
