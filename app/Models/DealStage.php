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
      public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
    public function client()
  {
      return $this->belongsTo(User::class, 'client_username');
  } 

    public function deal()
    {
        return $this->hasOne(Deal::class, 'deal_id', 'short_code');
    }
}
