<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;

    protected $fillable = ['title','criteria_id','description'];

    public function factors()
    {
        return $this->hasMany(Factor::class, 'criteria_id');
    }
}
