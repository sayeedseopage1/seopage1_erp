<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SalesCount extends Model
{
    use HasFactory;
    protected $table = 'sales_counts';
      public function user()
      {
          return $this->belongsTo(User::class,'user_id');
      }
}
