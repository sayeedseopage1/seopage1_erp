<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Invoice;
use App\Models\SlackSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class PaymentReminder extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $invoice;
    private $user;
    private $emailSetting;

    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;

        if($invoice->project_id != null && $invoice->project_id != ''){
            $this->user = $invoice->project->client;
        }
        elseif($invoice->client_id != null && $invoice->client_id != ''){
            $this->user = $invoice->client;
        }

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

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        if ($this->emailSetting->send_slack == 'yes' && slack_setting()->status == 'active') {
            array_push($via, 'slack');
        }

        if ($this->emailSetting->send_push == 'yes') {
            array_push($via, OneSignalChannel::class);
        }

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
        $paymentUrl = route('front.invoice', [$this->invoice->hash]);

        $content = __('app.invoiceNumber') . ' : ' . ucfirst($this->invoice->invoice_number) . '<p>
            <b style="color: green">' . __('app.dueDate') . ' : ' . $this->invoice->due_date->format(global_setting()->date_format) . '</b>
        </p>';

        return (new MailMessage)
            ->subject(__('email.paymentReminder.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($this->user->name) . '!')
            ->markdown('mail.payment.reminder', ['paymentUrl' => $paymentUrl, 'content' => $content]);
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
            'id' => $this->invoice->id,
            'created_at' => $this->invoice->created_at->format('Y-m-d H:i:s'),
            'heading' => $this->invoice->invoice_number
        ];
    }

    /**
     * Get the Slack representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
        $slack = SlackSetting::setting();

        if (count($notifiable->employee) > 0 && (!is_null($notifiable->employee[0]->slack_username) && ($notifiable->employee[0]->slack_username != ''))) {
            return (new SlackMessage())
                ->from(config('app.name'))
                ->image($slack->slack_logo_url)
                ->to('@' . $notifiable->employee[0]->slack_username)
                ->content('*' . __('email.paymentReminder.subject') . '*' . "\n" . __('app.invoice') . ' - ' . ucfirst($this->invoice->invoice_number));
        }

        return (new SlackMessage())
            ->from(config('app.name'))
            ->image($slack->slack_logo_url)
            ->content('This is a redirected notification. Add slack username for *' . mb_ucwords($notifiable->name) . '*');
    }

    // phpcs:ignore
    public function toOneSignal($notifiable)
    {
        return OneSignalMessage::create()
            ->subject(__('email.paymentReminder.subject'))
            ->body($this->invoice->heading);
    }

}
