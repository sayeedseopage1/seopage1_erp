<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncentivePaymentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'user_id',
        'incentive_payment_id',
        'type',
        'paid_amount',
        'added_by'
    ];

    public function addedBy()
    {
        return $this->hasOne(User::class, 'id', 'added_by');
    }
}
