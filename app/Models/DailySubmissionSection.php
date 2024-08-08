<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySubmissionSection extends Model
{
    use HasFactory;

    public function submission_details()
    {
        return $this->hasMany(DailySubmissionDetail::class, 'daily_submission_sections_id');
    }
}
