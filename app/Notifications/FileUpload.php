<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Project;
use App\Models\ProjectFile;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class FileUpload extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $file;
    private $project;
    private $global;
    private $emailSetting;

    public function __construct(ProjectFile $file)
    {
        $this->file = $file;
        $this->project = Project::find($this->file->project_id);
        $this->emailSetting = EmailNotificationSetting::where('slug', 'employee-assign-to-project')->first();

        $this->global = global_setting();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = [];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('email.fileUpload.subject') .' '. $this->project->project_name . ' - ' . config('app.name'))
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.fileUpload.subject')  . mb_ucwords($this->project->project_name))
            ->line(__('modules.projects.fileName') . ' - ' . $this->file->filename)
            ->line(__('app.date') . ' - ' . $this->file->created_at->format($this->global->date_format))
            ->action(__('email.fileUpload.action'), route('projects.show', [$this->project->id, 'tab' => 'files']))
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
//phpcs:ignore
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }

}
