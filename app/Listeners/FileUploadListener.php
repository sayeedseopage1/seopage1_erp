<?php

namespace App\Listeners;

use App\Events\FileUploadEvent;
use App\Models\Project;
use App\Models\User;
use App\Notifications\FileUpload;
use Illuminate\Support\Facades\Notification;

class FileUploadListener
{

    /**
     * Handle the event.
     *
     * @param  FileUploadEvent  $event
     * @return void
     */

    public function handle(FileUploadEvent $event)
    {
        $project = Project::findOrFail($event->fileUpload->project_id);
        Notification::send($project->membersMany, new FileUpload($event->fileUpload));

        if (($event->fileUpload->project->client_id != null)) {
            // Notify client
            $notifyUser = User::withoutGlobalScopes(['active'])->find($event->fileUpload->project->client_id);

            if ($notifyUser) {
                Notification::send($notifyUser, new FileUpload($event->fileUpload));
            }
        }

    }

}
