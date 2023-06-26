<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Observers\AuthorizationActionOnserver;

class AuthorizationAction extends Model
{
    use HasFactory;
    protected $fillable = [
        'model_name',
        'model_id',
        'type',
        'deal_id',
        'project_id',
        'link',
        'title',
        'description',
        'authorization_by',
        'approved_at',
        'status'
    ];

    protected $with = ['authorization'];

    public function authorization()
    {
        return $this->belongsTo(User::class, 'authorization_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function get_model()
    {
        return class_basename($this->model_name);
    }

    public function getStatusOptionsAttribute()
    {
        $options = [
            'task_time_extension_by_lead_developer' => [
                'approved', 'reject', 'review'
            ],
            'task_time_extension_by_developer' => [
                'approved', 'reject', 'review'
            ],
            'deliverable' => [
                'approved', 'review'
            ],
            'other_type_deliverable' => [
                'approved', 'review'
            ],
            'project_challenge' => [
                'approved', 'reject', 'review'
            ],
            'project_qc' => [
                'approved', 'reject', 'review', 'modification'
            ],
            'project_completion' => [
                'approved', 'reject', 'review'
            ],
            'project_deliverable_time_extention' => [
                'approved', 'review'
            ],
            'milestone_cancel' => [
                'approved', 'review'
            ],
            'deliverable_modification_by_top_managment' => [
                'approved', 'review'
            ],
            'deliverable_modification_by_client' => [
                 'review'
            ],
            'task_submission_by_lead_developer' => [
                 'review'
            ],
            'task_submission_by_developer' => [
                 'review'
            ],
          
            'task_approved_by_lead_develoer' => [
                 'review'
            ],
            'task_revision_by_lead_developer' => [
                'review'
            ],
            'task_revision_by_project_manager' => [
                'review'
            ],
            'complete_milestone' => [
                'approved', 'review'
            ],
            'invoice_created' => [
                'approved', 'review'
            ],
            'payment_created' => [
                'approved', 'review'
            ],
            'task_assigned_on_lead_developer' => [
                 'review'
            ],
            'task_assign_by_lead_developer' => [
                'review'
            ],
           
            'award_time_extension' => [
                'review'
            ],
            'project_manager_accept_project' => [



                'review'

            ],
            'saleslead_price_authorization' => [

                'review'



            ]
        ];

        return $options[$this->type];
    }
}
