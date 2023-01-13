<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Project;
use App\Models\User;

class ProjectSubmissionNotification extends Notification
{
    use Queueable;
    protected $milestone;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($milestone)
    {
        $this->milestone=$milestone;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
     public function toMail($notifiable)
     {
       $project= Project::where('id',$this->milestone->project_id)->first();
       $url = url('/account/projects/'. $project->id);


       $pm= User::where('id',$project->pm_id)->first();
       $client= User::where('id',$project->client_id)->first();
       $greet= '<p>
          <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
      </p>'
      ;
      $header= '<p>
         <h1 style="color: red; text-align: center;" >' . __('Project Completion Request Received '.$project->project_short_code.'') .'</b>'.'
     </h1>';
     $body= '<p>
       '.'You’ve Received a Project Completion Request '.$project->project_short_code.'. To check the details, follow this link.'.
    '</p>'
    ;
    $content =

    '<p>
       <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
   </p>'
   .
   '<p>
      <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
  </p>'
    .
    '<p>
       <b style="color: black">' . __('Project Manager') . ': '.'</b>' . '<a href="'.route('employees.show',$pm->id).'">'.$pm->name .'</a>'. '
   </p>'


  ;

         return (new MailMessage)
         ->subject(__('[No Reply] Project Completion Request Received') )

         ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
         ->markdown('mail.project.project_submission', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);

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
    public function toDatabase($notifiable)
    {
        return [

            'milestone_id'=> $this->milestone['id']

        ];
    }
}
