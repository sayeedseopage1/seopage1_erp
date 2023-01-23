<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Currency;
use App\Models\User;

class Deal extends Model
{
    use HasFactory;
      protected $table = 'deals';
      public function original_currency()
      {
          return $this->belongsTo(Currency::class, 'original_currency_id');
      }
        public function user()
      {
          return $this->belongsTo(User::class, 'added_by');
      }
      public function pm()
    {
        return $this->belongsTo(User::class, 'pm_id');
    }

}
