<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectMilestone;

class ProjectDeliverable extends Model
{
    use HasFactory;
      protected $table = 'project_deliverables';
      public function milestone()
      {
          return $this->belongsTo(ProjectMilestone::class, 'milestone_id');
      }
}
