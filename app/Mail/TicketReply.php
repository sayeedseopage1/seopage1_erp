<?php

namespace App\Mail;

use App\Models\TicketEmailSetting;
use App\Models\TicketReply as ModelsTicketReply;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TicketReply extends Mailable
{
    use Queueable, SerializesModels;

    private $ticketEmailSetting;
    public $ticketReply;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ModelsTicketReply $ticketReply)
    {
        $this->ticketEmailSetting = TicketEmailSetting::first();
        $this->ticketReply = $ticketReply;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $previousReply = ModelsTicketReply::where('ticket_id', $this->ticketReply->ticket_id)
            ->whereNotNull('imap_message_id')->orderBy('id', 'desc')
            ->first();

        if ($this->ticketEmailSetting->status == 1) {
            $this->from($this->ticketEmailSetting->mail_from_email, $this->ticketEmailSetting->mail_from_name)
                ->subject($this->ticketReply->ticket->subject)
                ->view('emails.ticket.reply');
 
            if (!is_null($previousReply) && !is_null($previousReply->imap_message_id)) {
                $this->withSwiftMessage(function ($message) use ($previousReply) {
                    $message->getHeaders()->addTextHeader(
                    'In-Reply-To', '<'.$previousReply->imap_message_id.'>'
                    );
                    
                    ModelsTicketReply::where('id', $this->ticketReply->id)->update(['imap_message_id' => $message->getId()]);
                });
            }
 
            return $this;
        }
    }

}
