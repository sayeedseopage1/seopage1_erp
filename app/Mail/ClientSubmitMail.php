<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ClientSubmitMail extends Mailable
{
    use Queueable, SerializesModels;
    public $data,$user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data,$user)
    {
        $this->data = $data;
        $this->user = $user;
        // /dd($data,$user);

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      $subject = '[No Reply] Client Has Submitted Form Successfully';
       return $this->view('emails.client_submission_form')->subject($subject);
    }
}
