<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\SubTask;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SubTaskCompleted extends Notification implements ShouldQueue
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
        $this->emailSetting = EmailNotificationSetting::where('slug', 'task-completed')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = ['database'];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        if ($this->emailSetting->send_slack == 'yes' && slack_setting()->status == 'active') {
            array_push($via, 'slack');
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
            ->subject(__('email.subTaskComplete.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(ucfirst($this->subTask->title) . ' ' . __('email.subTaskComplete.subject') . '.')
            ->line((!is_null($this->subTask->task->project)) ? __('app.project') . ' - ' . ucfirst($this->subTask->task->project->project_name) : '')
            ->action(__('email.subTaskComplete.action'), route('tasks.show', [$this->subTask->task->id, 'view' => 'sub_task']))
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
            'heading' => $this->subTask->title,
            'completed_on' => (!is_null($this->subTask->completed_on)) ? $this->subTask->completed_on->format('Y-m-d H:i:s') : now()->format('Y-m-d H:i:s')
        ];
    }

}
