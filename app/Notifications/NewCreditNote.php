<?php

namespace App\Notifications;

use App\Http\Controllers\CreditNoteController;
use App\Models\CreditNotes;
use App\Models\EmailNotificationSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;

class NewCreditNote extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $creditNotes;
    private $emailSetting;

    public function __construct(CreditNotes $creditNotes)
    {
        $this->creditNotes = $creditNotes;

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
        $via = ($notifiable->email_notifications && $notifiable->email != '') ? ['mail', 'database'] : ['database'];

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

        if ( !is_null($this->creditNotes->client_id)) {
            // For Sending pdf to email
            $invoiceController = new CreditNoteController();

            if ($pdfOption = $invoiceController->domPdfObjectForDownload($this->creditNotes->id)) {
                $pdf = $pdfOption['pdf'];
                $filename = $pdfOption['fileName'];

                return (new MailMessage)
                    ->subject(__('email.creditNote.subject') . ' - ' . config('app.name') . '.')
                    ->greeting(__('email.hello') . ' ' . $notifiable->name . '!')
                    ->line(__('email.creditNote.text'))
                    ->action(__('email.creditNote.action'), route('creditnotes.show', $this->creditNotes->id))
                    ->line(__('email.thankyouNote'))
                    ->attachData($pdf->output(), $filename . '.pdf');
            }
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
            'id' => $this->creditNotes->id,
            'cn_number' => $this->creditNotes->cn_number
        ];
    }

}
