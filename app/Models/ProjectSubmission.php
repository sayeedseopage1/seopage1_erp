<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectNiche;

class ProjectSubmission extends Model
{
    use HasFactory;
      protected $table = 'project_submissions';
      public function category()
      {
          return $this->belongsTo(ProjectNiche::class, 'niche');
      }
}
