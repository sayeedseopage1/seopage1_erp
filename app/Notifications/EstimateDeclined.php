<?php

namespace App\Notifications;

use App\Models\Estimate;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class EstimateDeclined extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $estimate;

    public function __construct(Estimate $estimate)
    {
        $this->estimate = $estimate;

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

        if ($notifiable->email_notifications && $notifiable->email != '') {
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
            ->subject(__('email.estimateDeclined.subject').' - '.config('app.name').__('!'))
            ->greeting(__('email.hello').' '.mb_ucwords($notifiable->name).__('!'))
            ->line(__('email.estimateDeclined.text'))
            ->action(__('email.estimateDeclined.action'), route('estimates.show', $this->estimate->id))
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */

    // phpcs:ignore
    public function toArray($notifiable)
    {
        return [
            'id' => $this->estimate->id,
            'estimate_number' => $this->estimate->estimate_number
        ];
    }

}
