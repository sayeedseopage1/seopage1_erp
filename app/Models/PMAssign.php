<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class PMAssign extends Model
{
    use HasFactory;
      protected $table = 'p_m_assigns';
      public function project()
      {
          return $this->belongsTo(User::class, 'pm_id');
      }
}
