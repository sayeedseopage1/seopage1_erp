<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Project;
use App\Models\User;
use App\Models\QCSubmission;

class QcSubmissionAcceptNotification extends Notification
{
    use Queueable;
      protected $milestone;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project)
    {
          $this->project=$project;
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
      $project= Project::where('id',$this->project->id)->first();
      $url = url('/account/projects/'. $project->id);
      $project_submission=QCSubmission::where('project_id',$project->id)->first();


      $pm= User::where('id',$project->pm_id)->first();
      $client= User::where('id',$project->client_id)->first();
      $greet= '<p>
         <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
     </p>'
     ;
     $header= '<p>
        <h1 style="color: red; text-align: center;" >' . __('Top Management Has '.$project_submission->status.' Project Q&C Request (
 '.$project->project_short_code.').') .'</b>'.'
    </h1>';
    $body= '<p>
      '.'Top Management Has '.$project_submission->status.' Project Q&C Request. To Check the Details, Follow This Link.
'.
   '</p>'
   ;
   $content =

   '<p>
      <b style="color: black">' . __('Project ID') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_short_code . '
  </p>'
  .
  '<p>
     <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
 </p>'
 .
  '<p>
     <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
 </p>'



 ;

        return (new MailMessage)
        ->subject(__('Client '.$client->name.', QC Form authorization accepted by Top Management') )

        ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.project.project_qc_accept', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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

            'project_id'=> $this->project['id']

        ];
    }
}
