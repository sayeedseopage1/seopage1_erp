<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesRiskPolicy extends Model
{
    use HasFactory;

    protected $fillable = ['title','department','type', 'value_type', 'value', 'point'];
}
