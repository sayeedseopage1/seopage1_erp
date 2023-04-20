<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectMilestone;
use App\Models\ProjectDeliverablesClientDisagree;

class ProjectDeliverable extends BaseModel
{
    use HasFactory;
    protected $table = 'project_deliverables';
    public function milestone()
    {
        return $this->belongsTo(ProjectMilestone::class, 'milestone_id');
    }

    public function get_client_request(): BelongsTo
    {
        //return $this->belongsTo(ProjectDeliverablesClientDisagree::class, 'id');
    }
}
