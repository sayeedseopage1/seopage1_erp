<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\DealStage;
use App\Models\Lead;

class LeadConversionMail extends Mailable
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
         


    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      $data= $this->data;
      $lead= Lead::where('id',$data->id)->first();
      $client= User::where('id',$data->client_id)->first();
       $deal= DealStage::where('lead_id',$lead->id)->first();
      $subject = 'Client: '.$deal->client_username. ' Lead Converted To Deal Successfully
';
       return $this->view('emails.new_lead_conversion')->subject($subject);
    }
}
