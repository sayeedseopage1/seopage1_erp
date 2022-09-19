<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class InvoicePaymentReceived extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $payment;
    private $invoiceSetting;
    private $emailSetting;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
        $this->invoiceSetting = invoice_setting();
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
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $number = '';
        $message = '';
        $url = '';
        $actionBtn = '';

        $invoice = Invoice::find($this->payment->invoice_id);

        if ($invoice->order_id != null) {
            $number = __('app.order').'#'.$invoice->order_id;
            $message = __('email.invoices.paymentReceivedForOrder');
            $url = route('orders.show', $invoice->order_id);
            $actionBtn = __('email.orders.action');
        }
        else {
            $number = $invoice->invoice_number;
            $message = __('email.invoices.paymentReceivedForInvoice');
            $url = route('invoices.show', $invoice->id);
            $actionBtn = __('email.invoices.action');
        }

        return (new MailMessage)
            ->subject(__('email.invoices.paymentReceived').' - '.config('app.name'))
            ->greeting(__('email.hello').' '.mb_ucwords($notifiable->name).__('!'))
            ->line($message.':- ')
            ->line($number)
            ->action($actionBtn, $url)
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

        $invoice = Invoice::find($this->payment->invoice_id);

        if($invoice){
            return [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number
            ];
        }

        return '';
    }

}
