<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PmUpdateProductDescriptionNotification extends Notification
{
    use Queueable;
    protected $task_user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($task_user)
    {
        $this->task_user = $task_user;
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
        $task = Task::where('id',$this->task_user->task_id)->first();
        $project = Project::where('id',$task->project_id)->first();
        $pm = User::where('id',$project->pm_id)->first();

        $url = url('/account/tasks');

        $client= User::where('id',$project->client_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('You’ve a Task Assigned') .'</b>'.'
      </h1>';
      $body= '<p>
        '.'You’ve Received a Task. To check the details, follow this link.'.
     '</p>'
     ;
     $content =

     '<p>
        <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<span>'.$client->name .'</span>'. '
    </p>'
      .
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<span>'.$project->project_name .'</span>'. '
    </p>'
    .
     '<p>
       <b style="color: black">' . __('Development PM') . ': '.'</b>' . '<span>'.$pm->name .'</span>'. '
   </p>'
   .
   '<p>
      <b style="color: black">' . __('Task Description') . ': '.'</b>' . '<span>' . substr($task->description, 0, 120) . (strlen($task->description) > 120 ? '...' : '') . '</span>' . '
  </p>'

   ;

          return (new MailMessage)
          ->subject(__('Client '.$client->name.', New Task Assigned to You -' . $task->heading .'') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.service-type.pm_product_description', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
