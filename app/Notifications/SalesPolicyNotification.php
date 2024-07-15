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
                $subject = 'Client: ' . $this->data['client'] . ': Sales risk authorization needed';
                $header = 'Please authorize sales risk for the following project:';
                $body = strtr('Project name: projectName</a> <br/>
                Client name: clientName<br/>
                Sales person: salesPerson <br/>
                Sum of points: salesPoint<br/>', $this->data);
                $url = $this->url;
                $text = 'Authorize';
                break;
            case 'sales_lead_authorization':
                $subject = 'Client ' . $this->data['client'] . ': Sales authorization needed';
                $header = 'Please authorize the following sale made by your team member:';
                $body = strtr('Project name: projectName</a> <br/>
                Client name: clientName<br/>
                Sales person: salesPerson <br/>', $this->data);
                $url = $this->url;
                $text = 'Authorize';
                break;
            case 'pending_large_from_submission':
                $subject = 'Client ' . $this->data['client'] . ': Finish the pending works for your own deal!';
                $header = 'Please finish the pending works for your own deal:';
                $body = strtr('Won deal name: projectName<br/>
                Client name: clientName <br/>', $this->data);
                $url = $this->url;
                $text = 'Review';
                break;
        }

        return (new MailMessage)
            ->subject(__($subject))
            ->markdown('mail.sales-policy-mail', ['header' => $header, 'body' => $body, 'url' => $url, 'text' => $text]);
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
