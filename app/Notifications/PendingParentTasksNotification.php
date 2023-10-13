<?php

namespace App\Notifications;

use App\Models\PendingParentTasks;
use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PendingParentTasksNotification extends Notification
{
    use Queueable;
    protected $pending_parent_tasks;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($pending_parent_tasks)
    {
        $this->pending_parent_tasks = $pending_parent_tasks;
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
        $pending_parent_tasks = PendingParentTasks::where('id',$this->pending_parent_tasks->id)->first();
        $project= Project::where('id',$pending_parent_tasks->project_id)->first();
        $url = url('/account/projects/'. $project->id.'?tab=tasks');


        $client= User::where('id',$project->client_id)->first();
        $pm= User::where('id',$project->pm_id)->first();
        $assingee_to= User::where('id',$pending_parent_tasks->user_id)->first();
        $added_by= User::where('id',$pending_parent_tasks->added_by)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hi, '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Client '.$client->name.', Pm '.$pm->name.' ,Wants to assign his/her task to the team.') .'</b>'.'
      </h1>';
      $body= '<p>
        '.'You’ve Received a mail. To check the details, follow this link.'.
     '</p>'
     ;
     $content =

     '<p>
        <b style="color: black">' . __('Task Name') . ': '.'</b>' .$pending_parent_tasks->heading . '
    </p>'.
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
    </p>'.
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
    </p>'
    .
    '<p>
       <b style="color: black">' . __('Assingee To') . ': '.'</b>' . '<a href="'.route('employees.show',$assingee_to->id).'">'.$assingee_to->name .'</a>'. '
   </p>'
     .
    '<p>
       <b style="color: black">' . __('Added By') . ': '.'</b>' . '<a href="'.route('employees.show',$added_by->id).'">'.$added_by->name .'</a>'. '
   </p>'.
    '<p>
       <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
   </p>'
   ;

          return (new MailMessage)
          ->subject(__('Client '.$client->name.', Pm '.$pm->name.' ,Wants to assign his/her task to the team') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.pending-parent-task.pending_parent_task', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
