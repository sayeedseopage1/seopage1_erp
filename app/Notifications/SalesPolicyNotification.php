<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SalesPolicyNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public $type, public $data, public $url)
    {
        //
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
        switch ($this->type) {
            case 'sales_risk_authorization':
                $subject = 'Client ' . $this->data['client'] . ': Sales risk authorization needed';
                $header = 'Please authorize sales risk for the following project:';
                $body = strtr('Project name: projectName</a> <br/>
                Client name: clientName (It should be linked to that particular clients page)<br/>
                Sales person: salesPerson <br/>
                Sum of points; salePoint<br/>', $this->data);
                $url = $this->url;
                break;
        }

        return (new MailMessage)
            ->subject(__('[No Reply] ' . $subject))
            ->markdown('mail.sales-policy-mail', ['header' => $header, 'body' => $body, 'url' => $url]);
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
