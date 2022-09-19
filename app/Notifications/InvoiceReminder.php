<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class InvoiceReminder extends Notification implements ShouldQueue
{
    private $invoice;
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($invoice)
    {
        $this->invoice = $invoice;
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
        $via = ['database'];

        if ($notifiable->email != '') {
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
        $setting = global_setting();
        $invoice_setting = invoice_setting()->send_reminder;
        $message = (new MailMessage)
            ->subject(__('email.invoiceReminder.subject') . ' - ' . config('app.name'))
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.invoiceReminder.text') . ' ' . Carbon::now($setting->timezone)->addDays($invoice_setting)->toFormattedDateString());
        $invoice_number = $this->invoice->invoice->invoice_number;


        return $message
            ->line(new HtmlString($invoice_number))
            ->line(__('email.messages.loginForMoreDetails'))
            ->action(__('email.invoiceReminder.action'), route('front.invoice', $this->invoice->invoice->hash))
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
        return $notifiable->toArray();
    }

}
