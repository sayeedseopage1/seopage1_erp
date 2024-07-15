<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlatformAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'company_name',
        'username',
        'name',
        'user_url',
        'email',
        'profile_type',
        'generated_on',
        'multiplying_factor',
        'confirmation_of_data_accuracy',
        'status',
        'added_by'
    ];
}
