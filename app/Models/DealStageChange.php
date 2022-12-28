<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class DealStageChange extends Model
{
    use HasFactory;
      protected $table = 'deal_stage_changes';
      public function user()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
