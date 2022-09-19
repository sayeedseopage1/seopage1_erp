<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewPayment extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $payment;
    private $emailSetting;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'invoice-createupdate-notification')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = array();
        $via = ['database'];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
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
        if (($this->payment->project_id && $this->payment->project->client_id != null) || ($this->payment->invoice_id && $this->payment->invoice->client_id != null)) {

            return (new MailMessage)
                ->subject(__('email.payment.subject') . ' - ' . config('app.name') . '.')
                ->greeting(__('email.hello') . ' ' . $notifiable->name . '!')
                ->line(__('email.payment.text'))
                ->action(__('email.payment.action'), route('payments.show', $this->payment->id))
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
        return $this->payment->toArray();
    }

}
