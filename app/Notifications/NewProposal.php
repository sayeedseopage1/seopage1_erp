<?php

namespace App\Notifications;

use App\Http\Controllers\ProposalController;
use App\Models\Proposal;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewProposal extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */

    private $proposal;

    public function __construct(Proposal $proposal)
    {
        $this->proposal = $proposal;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via()
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage|void
     */
    // phpcs:ignore
    public function toMail($notifiable)
    {
        $proposalController = new ProposalController();

        if ($pdfOption = $proposalController->domPdfObjectForDownload($this->proposal->id)) {
            $pdf = $pdfOption['pdf'];
            $filename = $pdfOption['fileName'];

            return (new MailMessage)
                ->subject(__('email.proposal.subject'))
                ->greeting(__('email.hello') . ' ' . mb_ucwords($this->proposal->lead->client_name) . '!')
                ->line(__('email.proposal.text'))
                ->action(__('app.view') . ' ' . __('app.proposal'), route('front.proposal', $this->proposal->hash))
                ->attachData($pdf->output(), $filename . '.pdf');
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
        return $this->proposal->toArray();
    }

}
