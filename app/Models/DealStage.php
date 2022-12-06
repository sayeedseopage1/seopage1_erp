<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Lead;
use App\Models\User;
use App\Models\Currency;

class DealStage extends Model
{
    use HasFactory;
      protected $table = 'deal_stages';
      public function lead()
      {
          return $this->belongsTo(Lead::class, 'lead_id');
      }
      public function added_by()
      {
          return $this->belongsTo(User::class, 'added_by');
      }
      public function converted_by()
      {
          return $this->belongsTo(User::class, 'converted_by');
      }
      public function original_currency()
      {
          return $this->belongsTo(Currency::class, 'original_currency_id');
      }
}
