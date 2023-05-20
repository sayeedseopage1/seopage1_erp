<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Deal;
use App\Models\User;

class DealAuthorizationSendNotification extends Notification
{
    use Queueable;
    protected $deal,$sender;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($deal,$sender)
    {
        $this->deal=$deal;
        $this->sender=$sender;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $deal= Deal::where('id',$this->deal->id)->first();
        //$url = url('/account/deals/'. $deal->id);
        $authorization_url = route('authorization_request', $deal->id);
        //329?tab=deliverables
  
  
        $sender= User::where('id',$this->sender->id)->first();
        
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
       <h1 style="color: red; text-align: center;" >' . __('Price authorization request send for '.$deal->short_code.'') .'</b>'.'
   </h1>';
      $body= '<p>
        '.'You’ve Received an price authorization request for '.$deal->client_username.' from '.$sender->name.'. To check the details, follow this link.'.
     '</p>'
     ;
     $content =
  
     '<p>
        <b style="color: black">' . __('Deal Name') . ': '.'</b>' . '<a href="'.route('deals.show',$deal->id).'">'.$deal->project_name . '
    </p>'
    .
    '<p>
       <b style="color: black">' . __('Client Name') . ': '.'</b>'.$deal->client_username .'</a>'. '
   </p>'
     .
     '<p>
        <b style="color: black">' . __('Sales Executive') . ': '.'</b>' . '<a href="'.route('employees.show',$sender->id).'">'.$sender->name .'</a>'. '
    </p>'
  
  
   ;
  
          return (new MailMessage)
          ->subject(__('Client '.$deal->client_username.', Price authorization request') )
  
          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.deals.price_authorization', ['url' => $authorization_url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
