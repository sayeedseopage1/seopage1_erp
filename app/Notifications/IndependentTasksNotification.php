<?php

namespace App\Notifications;

use App\Models\PendingParentTasks;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class IndependentTasksNotification extends Notification
{
    use Queueable;
    protected $ppTask;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ppTask)
    {
        $this->ppTask = $ppTask;
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
        $independent_tasks = PendingParentTasks::where('id',$this->ppTask->id)->first();
        $url = url('/account/independent-task');


        if($independent_tasks->client_id !=null){
            $independentTaskClient= User::where('id',$independent_tasks->client_id)->first();
        }
        $assingee_to= User::where('id',$independent_tasks->user_id)->first();
        $added_by= User::where('id',$independent_tasks->added_by)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hi, '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('An independent task created by '.$added_by->name.' requires your authorization') .'</b>'.'
      </h1>';

      $body= '<p>
        '.'You’ve Received a mail. To check the details, follow this link.'.
     '</p>'
     ;
     $content =

     '<p>
        <b style="color: black">' . __('Task Name') . ': '.'</b>' .$independent_tasks->heading . '
    </p>'.
    '<p>
        <b style="color: black">' . __('Task Description') . ': '.'</b>' .$independent_tasks->description . '
    </p>'.
    '<p>
       <b style="color: black">' . __('Assingee To') . ': '.'</b>' . '<a href="'.route('employees.show',$assingee_to->id).'">'.$assingee_to->name .'</a>'. '
   </p>'
     .
    '<p>
       <b style="color: black">' . __('Added By') . ': '.'</b>' . '<a href="'.route('employees.show',$added_by->id).'">'.$added_by->name .'</a>'. '
   </p>';

          return (new MailMessage)
          ->subject(__('An independent task created by '.$added_by->name.' requires your authorization') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.independent-task.independent_task', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
