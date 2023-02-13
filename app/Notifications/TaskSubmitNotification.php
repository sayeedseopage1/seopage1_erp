<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class TaskSubmitNotification extends Notification
{
    use Queueable;
    protected $task_id;
    protected $sender;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($task_id,$sender)
    {
        $this->task_id=$task_id;
        $this->sender=$sender;
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
        $task= Task::where('id',$this->task_id->id)->first();
        $url = url('/account/tasks/'. $task->id);
        $project= Project::where('id',$task->project_id)->first();
        $sender= User::where('id',$this->sender->id)->first();
  
        $pm= User::where('id',$project->pm_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Task Sumission for '.$task->task_short_code.'') .'</b>'.'
      </h1>';
      $body= '<p>
        '.'You’ve Received a Task Submission Request '.$task->heading.' from '.$sender->name.'. To check the details, follow this link.'.
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
    
  
  
   ;
  
          return (new MailMessage)
          ->subject(__('[No Reply] Task Submission Request') )
  
          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.task.task_submission', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
            'id' => $this->task_id->id,
            'updated_at' => $this->task_id->updated_at->format('Y-m-d H:i:s'),
            'heading' => $this->task_id->heading
        ];
    }
    public function toDatabase($notifiable)
    {
        return [

            'task_id'=> $this->task_id['id']

        ];
    }
}
