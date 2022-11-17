<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Currency;

class Deal extends Model
{
    use HasFactory;
      protected $table = 'deals';
      public function original_currency()
      {
          return $this->belongsTo(Currency::class, 'original_currency_id');
      }
}
