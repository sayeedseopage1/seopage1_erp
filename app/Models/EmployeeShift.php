<?php

namespace App\Models;

use App\Observers\EmployeeShiftObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeShift extends BaseModel
{
    use HasFactory;

    protected $guarded = ['id'];

}
