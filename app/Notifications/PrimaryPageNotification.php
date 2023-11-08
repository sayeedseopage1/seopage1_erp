<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskType;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PrimaryPageNotification extends Notification
{
    use Queueable;
    protected $task_type;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($task_type)
    {
        $this->task_type = $task_type;
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
        $task_type = TaskType::where('id',$this->task_type->id)->first();
        $task = Task::where('id',$task_type->task_id)->first();
        $url = url('/account/tasks/'.$task->id);

        $project = Project::where('id',$task->project_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $pm= User::where('id',$project->pm_id)->first();
        $ld = User::where('id',$task->added_by)->first();
        $task_user = TaskUser::where('task_id',$task->id)->first();
        $assingee_to= User::where('id',$task_user->user_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hi, '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Primary page authorization (Client '.$client->name.', Lead Developer '.$ld->name.' ,Developer '.$assingee_to->name.')!') .'</b>'.'
      </h1>';
      $body= '<p>
        '.'You’ve Received a mail. To check the details, follow this link.'.
     '</p>'
     ;
     $content =
    '<p>
        <b style="color: black">' . __('Task Name') . ': '.'</b>' . '<a href="'.route('tasks.show',$task->id).'">'.$task->heading . '
    </p>'
    .
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
    </p>'
    .
    '<p>
       <b style="color: black">' . __('Project Manager') . ': '.'</b>' . '<a href="'.route('employees.show',$pm->id).'">'.$pm->name .'</a>'. '
   </p>'
     .
    '<p>
       <b style="color: black">' . __('Assingee To') . ': '.'</b>' . '<a href="'.route('employees.show',$assingee_to->id).'">'.$assingee_to->name .'</a>'. '
   </p>'
     .
    '<p>
       <b style="color: black">' . __('Assingee By') . ': '.'</b>' . '<a href="'.route('employees.show',$ld->id).'">'.$ld->name .'</a>'. '
   </p>'
     .
    '<p>
       <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
   </p>'
   ;


          return (new MailMessage)
          ->subject(__('Primary page authorization (Client '.$client->name.', Lead Developer '.$ld->name.' ,Developer '.$assingee_to->name.')!') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.task.primary_page', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
