<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncentivePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'user_id',
        'total_incentive_amount',
        'held_amount',
        'payable_amount',
        'paid_amount',
        'status',
        'created_at',
        'updated_at'
    ];

    public function incentivePaymentHistories()
    {
        return $this->hasMany(IncentivePaymentHistory::class, 'incentive_payment_id', 'id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
