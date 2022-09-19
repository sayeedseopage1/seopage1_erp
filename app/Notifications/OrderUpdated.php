<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;

class OrderUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $order;
    private $emailSetting;

    public function __construct(Order $order)
    {
        $this->order = $order;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'order-createupdate-notification')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') ? ['mail', 'database'] : ['database'];

        if ($this->emailSetting->send_push == 'yes') {
            array_push($via, OneSignalChannel::class);
        }

        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage|void
     */
    public function toMail($notifiable)
    {

        if ($this->order) {

            return (new MailMessage)
                ->subject(__('email.order.updateSubject') . ' - ' . config('app.name') . '.')
                ->greeting(__('email.hello') . ' ' . $notifiable->name . '!')
                ->line(__('email.order.updateText'))
                ->action(__('email.order.action'), route('orders.show', $this->order->id))
                ->line(__('email.thankyouNote'));
        }
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
            'id' => $this->order->id,
            'order_number' => $this->order->order_number
        ];
    }

}
