<?php

namespace App\Observers;

use App\Events\LeadEvent;
use App\Models\Lead;
use App\Models\Notification as ModelsNotification;
use App\Notifications\LeadAgentAssigned;
use App\Models\UniversalSearch;
use App\Models\User;
use App\Models\LeadsDealsActivityLog;
use Illuminate\Support\Facades\Notification;
use App\Traits\LeadDealActivityLog;
use Auth;

class LeadObserver
{
    use LeadDealActivityLog;

    public function saving(Lead $lead)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $userID = (!is_null(user())) ? user()->id : null;
            $lead->last_updated_by = $userID;
        }
    }

    public function creating(Lead $lead)
    {
        $lead->hash = \Illuminate\Support\Str::random(32);

        if (!isRunningInConsoleOrSeeding()) {
            $userID = (!is_null(user())) ? user()->id : null;
            $lead->added_by = $userID;
        }
    }

    public function updated(Lead $lead)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($lead->isDirty('agent_id')) {
                event(new LeadEvent($lead, $lead->leadAgent, 'LeadAgentAssigned'));
            }
        }
    }

    public function created(Lead $lead)
    {
        $user = Auth::user();
        $text = $user->getRole->name.' '.$user->name.' - Created the lead ('.$lead->client_name.')';
        $link = '<a href="'.route('leads.show', $lead->id).'">'.$text.'</a>';
        $this->saveActivityLog([
            'lead' => $lead->id
        ], $link);

        if (!isRunningInConsoleOrSeeding()) {
            if (request('agent_id') != '') {
                event(new LeadEvent($lead, $lead->leadAgent, 'LeadAgentAssigned'));
            }
            else {
                Notification::send(User::allAdmins(), new LeadAgentAssigned($lead));
            }
        }
    }

    public function deleting(Lead $lead)
    {
            $notifyData = ['App\Notifications\LeadAgentAssigned'];

            ModelsNotification::whereIn('type', $notifyData)
                ->whereNull('read_at')
                ->where('data', 'like', '{"id":'.$lead->id.',%')
                ->delete();
    }

    public function deleted(Lead $lead)
    {
        UniversalSearch::where('searchable_id', $lead->id)->where('module_type', 'lead')->delete();
    }

}
