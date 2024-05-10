<?php

namespace App\Listeners;

use App\Events\MilestoneAddedEvent;
use App\Http\Controllers\HelperPmProjectStatusController;
use App\Models\Deal;
use App\Models\PmGoalSetting;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\ProjectPmGoal;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

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
