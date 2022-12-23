<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
class WonDealMail extends Mailable
{
    use Queueable, SerializesModels;
     public $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;

        //dd($data);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

      $subject = '[No Reply] New Project Assigned To You';
       return $this->view('emails.new_won_deal')->subject($subject);
        //return $this->view('view.name');
    }
}
