<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendingAction extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::created(function ($pendingAction) {
            $buttonName = null;
            if($pendingAction->code == 'DSA') {
                $buttonName = 'explain_dispute';
            }elseif($pendingAction->code == 'DFA'){
                $buttonName = 'project_dispute_authorization';
            }elseif($pendingAction->code == 'TGA'){
                $buttonName = 'pm_task_guidline_authorization';
            }elseif($pendingAction->code == 'QCA'){
                $buttonName = 'project_qc_authorization';
            }elseif($pendingAction->code == 'PCA'){
                $buttonName = 'completion_form_authorization';
            }
            
            if($buttonName){
                $button = json_decode($pendingAction->button);
                $button[0]->button_url = $button[0]->button_url.'?modal_type='.$buttonName;
                $pendingAction->button = json_encode($button);
                $pendingAction->save();
            }
        });
    }
}
