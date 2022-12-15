<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class ProjectDispute extends Model
{
    use HasFactory;
    protected $table = 'project_disputes';
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
