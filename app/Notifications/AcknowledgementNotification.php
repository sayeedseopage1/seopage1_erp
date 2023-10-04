<?php

namespace App\Notifications;

use App\Models\DeveloperStopTimer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AcknowledgementNotification extends Notification
{
    use Queueable;
    protected $dev_stop_timer;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($dev_stop_timer)
    {
        $this->dev_stop_timer = $dev_stop_timer;
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

        $url = 'https://erpdev.seopage1.net/';
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hi, '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '';
      $body= '<p>
        '.count($this->dev_stop_timer) .'Developers Couldn`t meet their minimum daily tracking limit today()'.'Please check more details below:'.
     '</p>'
     ;
     $content = '';
    foreach ($this->dev_stop_timer as $item) {
        $dev = User::where('id', $item->user_id)->first();
        $content .= '<p><b style="color: black">' . __('Developer :') . ': ' . '</b>' . '<span>' . $dev->name . '</span>' . '</p>' .
            '<p><b style="color: black">' . __('Reason For Less Tracked Hours A Day Task :') . ': ' . '</b>' . '<span>' . $item->reason_for_less_tracked_hours_a_day_task . '</span>' . '</p>' .
            '<p><b style="color: black">' . __('Comment :') . ': ' . '</b>' . '<span>' . $item->comment . '</span>' . '</p>';
    }


    return (new MailMessage)
    ->subject(__('Developers Couldn`t meet their minimum daily tracking limit today'))
    ->greeting(__('email.Hi, ') . ' ' . mb_ucwords($notifiable->name) . ',')
    ->markdown('mail.developer-stop-timer.developer_stop_timer', ['url' => $url,'greet' => $greet, 'content' => $content, 'body' => $body, 'header' => $header, 'name' => mb_ucwords($notifiable->name)]);
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
