<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class TestEmail extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var \App\Models\EmailNotificationSetting[]|\Illuminate\Contracts\Foundation\Application|\Illuminate\Database\Eloquent\Collection|\Illuminate\Session\SessionManager|\Illuminate\Session\Store|mixed
     */
    private $emailSetting;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->emailSetting = email_notification_setting();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    // phpcs:ignore
    public function via($notifiable)
    {
        $via = array();
        array_push($via, 'mail');
        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    // phpcs:ignore
    public function toMail($notifiable)
    {

        return (new MailMessage)
            ->subject(__('email.test.subject'))
            ->line(__('email.test.text'))

            ->action(__('email.notificationAction'), route('login'))
            ->line(__('email.test.thankyouNote'));
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
