<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PmReassignHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'previously_assigned_to',
        'reassigned_to',
        'reassigned_by'
    ];
}
