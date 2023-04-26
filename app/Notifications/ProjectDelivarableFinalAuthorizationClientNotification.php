<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectDelivarableFinalAuthorizationClientNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project)
    {
        $this->project = $project;
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
        // $project= Project::where('id',$this->project->id)->first();
        $url = route('front.agreement', $this->project->project_short_code);

        //329?tab=deliverables
        $greet= '<p>
        <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
        </p>'
        ;
        $header= '<p>
        <h1 style="color: red; text-align: center;" >' . __('Deliverable authorization accepted for final submission '.$this->project->project_short_code.'') .'</b>'.'
        </h1>';
        $body= '<p>
        '.'Deliverable authorization accepted for final submission '.$this->project->project_short_code.'. To check the details, follow this link.'.
        '</p>'
        ;

        return (new MailMessage)
        ->subject(__('Deliverable authorization accepted for final submission') )

        ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.project.deliverable_final_authorization_accept_client_notification', [
            'url' => $url, 
            'greet'=> $greet,
            'body'=> $body,
            'header'=>$header, 
            'name' => mb_ucwords($notifiable->name)
        ]);
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
