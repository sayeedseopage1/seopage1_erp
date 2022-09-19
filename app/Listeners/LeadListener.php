<?php

namespace App\Listeners;

use App\Events\LeadEvent;
use App\Models\Lead;
use App\Notifications\LeadAgentAssigned;
use Illuminate\Support\Facades\Notification;

class LeadListener
{

    /**
     * Handle the event.
     *
     * @param  LeadEvent $event
     * @return void
     */

    public function handle(LeadEvent $event)
    {
        if ($event->notificationName == 'LeadAgentAssigned') {
            $lead = Lead::with('leadAgent', 'leadAgent.user')->find($event->lead->id);
            Notification::send($lead->leadAgent->user, new LeadAgentAssigned($lead));
        }
    }

}
