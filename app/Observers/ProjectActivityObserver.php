<?php

namespace App\Observers;

use App\Models\ProjectActivity;

class ProjectActivityObserver
{
    /**
     * Handle the ProjectActivity "created" event.
     *
     * @param  \App\Models\ProjectActivity  $projectActivity
     * @return void
     */
    public function created(ProjectActivity $projectActivity)
    {
        $projectActivity->added_by = \Auth::id();
        $projectActivity->save();
    }

    /**
     * Handle the ProjectActivity "updated" event.
     *
     * @param  \App\Models\ProjectActivity  $projectActivity
     * @return void
     */
    public function updated(ProjectActivity $projectActivity)
    {
        //
    }

    /**
     * Handle the ProjectActivity "deleted" event.
     *
     * @param  \App\Models\ProjectActivity  $projectActivity
     * @return void
     */
    public function deleted(ProjectActivity $projectActivity)
    {
        //
    }

    /**
     * Handle the ProjectActivity "restored" event.
     *
     * @param  \App\Models\ProjectActivity  $projectActivity
     * @return void
     */
    public function restored(ProjectActivity $projectActivity)
    {
        //
    }

    /**
     * Handle the ProjectActivity "force deleted" event.
     *
     * @param  \App\Models\ProjectActivity  $projectActivity
     * @return void
     */
    public function forceDeleted(ProjectActivity $projectActivity)
    {
        //
    }
}
