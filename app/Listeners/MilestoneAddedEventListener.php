<?php

namespace App\Listeners;

use App\Events\MilestoneAddedEvent;
use App\Http\Controllers\HelperPmProjectStatusController;

class MilestoneAddedEventListener
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
     * @param  \App\Events\MilestoneAddedEvent  $event
     * @return void
     */
    public function handle(MilestoneAddedEvent $event)
    {
        (new HelperPmProjectStatusController)->upsellGoalCreation($event->milestone);
    }
}
