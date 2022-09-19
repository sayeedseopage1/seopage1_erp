<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\SubTask;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SubTaskAssigneeAdded extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $subTask;
    private $emailSetting;

    public function __construct(SubTask $subTask)
    {
        $this->subTask = $subTask;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'user-assign-to-task')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    //phpcs:ignore
    public function via($notifiable)
    {
        $via = ['database'];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        return $via;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('email.subTaskAssigneeAdded.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(ucfirst($this->subTask->title) . ' ' . __('email.subTaskAssigneeAdded.subject') . '.')
            ->line((!is_null($this->subTask->task->project)) ? __('app.project') . ' - ' . ucfirst($this->subTask->task->project->project_name) : '')
            ->action(__('email.subTaskAssigneeAdded.action'), route('tasks.show', [$this->subTask->task->id, 'view' => 'sub_task']))
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
            'id' => $this->subTask->task->id,
            'created_at' => $this->subTask->created_at->format('Y-m-d H:i:s'),
            'heading' => $this->subTask->title
        ];
    }

}
