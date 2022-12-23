<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use APp\Models\Project;
use App\Models\User;

class DueDateNotification extends Notification
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
    $greet= '<p>
       <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
   </p>'
   ;
   $header= '<p>
      <h1 style="color: red; text-align: center;" >' . __('You have a Project DueDate Tommorow') .'</b>'.'
  </h1>';
    $body= '<p>
  You have a project '.'<a href="'.route('projects.show',$project->id).'">'. $project->project_name .'</a>' . ' '.'deadlline tommorow ' .$project->deadline->format('Y-m-d'). ' at ' .$project->deadline->format('h:i:s A').' Let`s check the short details below. You can check the details about this project following this link.'.'
   </p>'
   ;
   $content =
   '<p>
      <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('employees.show',$client->id).'">'.$client->name .'</a>'. '
  </p>' .
   '<p>
      <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
  </p>'
   .
   '<p>
      <b style="color: black">' . __('Project Manager') . ': '.'</b>' . '<a href="'.route('employees.show',$pm->id).'">'.$pm->name .'</a>'. '
  </p>' .
   '<p>
      <b style="color: red">' . __('Due Date') . ': ' .$project->deadline->format('Y-m-d').' '. $project->deadline->format('h:i:s A'). '</b>'. '
  </p>'



 ;

        return (new MailMessage)
        ->subject(__('[No Reply] You have a Project DueDate Tommorow') )

        ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.project.duedate', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);

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
          'id' => $this->proejct->id,
          'dueDate' => $this->project->deadline->format('Y-m-d H:i:s'),
          'project_name' => $this->project->project_name
      ];
    }
    public function toDatabase($notifiable)
    {
        return [
            'project_id' => $this->project['id']


        ];
    }
}
