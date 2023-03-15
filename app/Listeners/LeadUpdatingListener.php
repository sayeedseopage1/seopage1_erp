<?php

namespace App\Listeners;

use App\Events\eloquent.updating: Lead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LeadUpdatingListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\eloquent.updating: Lead  $event
     * @return void
     */
    public function handle(LeadUpdating $event)
{
    $changes = $event->lead->getChanges();
    $user = Auth::user();
    
    foreach($changes as $field => $value) {
        $activity = new LeadActivity();
        $activity->lead_id = $event->lead->id;
        $activity->user_id = $user->id;
        $activity->field = $field;
        $activity->old_value = $event->lead->getOriginal($field);
        $activity->new_value = $value;
        $activity->save();
    }
}
    
}
