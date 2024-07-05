<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlatformAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'username',
        'user_url',
        'email',
        'profile_type',
        'generated_on',
        'multiplying_factor',
        'confirmation_of_data_accuracy',
        'added_by'
    ];
}
