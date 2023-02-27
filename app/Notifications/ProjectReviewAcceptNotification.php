<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Project;
use App\Models\User;
use App\Models\Deal;

class ProjectReviewAcceptNotification extends Notification
{
    use Queueable;
    protected $project;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project)
    {
          $this->project= $project;
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


    $pm= User::where('id',$project->pm_id)->first();
    $client= User::where('id',$project->client_id)->first();
    $deal= Deal::where('id',$project->deal_id)->first();
    $sales_ex= User::where('id',$deal->added_by)->first();
    $user= User::where('id',$project->last_updated_by)->first();

    $greet= '<p>
       <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
   </p>'
   ;
   $header= '<p>
      <h1 style="color: red; text-align: center;" >' . __(' Top Management '.$user->name.' Has '.$project->project_status.' the project '.$project->project_name.'

  ') .'</b>'.'
  </h1>';
    $body= '<p>'.
      ' Top Management Has '.$project->project_status.' New Project '.'<a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a>'.'&#39'.'.challenge. Let'. '&#39;'.'s check the short details below.'

   .'</p>'
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
  </p>' .
   '<p>
      <b style="color: black">' . __('Sales Executive') . ': '.'</b>' .'<a href="'.route('employees.show',$sales_ex->id).'">'.$sales_ex->name .'</a>'. '
  </p>'.
  '<p>
     <b style="color: black">' . __('Challenge Status') . ': '.'</b>' .'<a >'.$project->project_status .'</a>'. '
  </p>'.
  '<p>
     <b style="color: black">' . __('Challenge Comment') . ': '.'</b>' .'<a >'.$project->admin_comment .'</a>'. '
  </p>'



  ;

        return (new MailMessage)
        ->subject(__('Client Name: '.$client->name.', Top Management has (“'.$project->project_status.'”) the '.$project->project_name.'
  ') )

        ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.project.review', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
