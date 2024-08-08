<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailySubmission extends Model
{
    use HasFactory;

    public function sections()
    {
        return $this->hasMany(DailySubmissionSection::class, 'daily_submission_id');
    }
}
