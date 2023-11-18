<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PPAuthDenyNotification extends Notification
{
    use Queueable;
    protected $findTask;
    protected $taskType;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($findTask, $taskType)
    {
        $this->findTask = $findTask;
        $this->taskType = $taskType;
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
        $task = Task::where('id',$this->findTask->id)->first();
        $taskType = TaskType::where('id',$this->taskType->id)->first();
        $url = url('/account/tasks/'. $task->id);

        $project = Project::where('id',$task->project_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Primary page authorization denied!') .'</b>'.'
      </h1>';
      $body= '<p>
        '.'Your request for declaring this page as a “Secondary Page Development” has been declined, and the task category has been changed to Secondary Page Development!'.
     '</p>'
     ;
     $content =
     '<p>
        <b style="color: black">' . __('Task Name') . ': '.'</b>' . '<a href="'.route('tasks.show',$task->id).'">'.$task->heading . '
    </p>'
    .
    '<p>
       <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
   </p>'.
   '<p>
       <b style="color: black">' . __('Reason') . ': '.'</b>' . '<span>'.$taskType->comment .'</span>'. '
   </p>'


   ;

          return (new MailMessage)
          ->subject(__('Primary page authorization denied!') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.pending-parent-task.pp_auth_deny', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
