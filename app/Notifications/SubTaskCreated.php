<?php

namespace App\Notifications;

use App\Models\SubTask;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SubTaskCreated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $subTask;

    public function __construct(SubTask $subTask)
    {
        $this->subTask = $subTask;
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
        return $via;
    }

    /*
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
    */

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
