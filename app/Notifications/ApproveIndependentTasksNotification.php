<?php

namespace App\Notifications;

use App\Models\PendingParentTasks;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApproveIndependentTasksNotification extends Notification
{
    use Queueable;
    protected $pendingParentTasks;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($pendingParentTasks)
    {
        $this->pendingParentTasks = $pendingParentTasks;
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
        $approve_independent_tasks = PendingParentTasks::where('id',$this->pendingParentTasks->id)->first();
        $url = url('/account/independent-task');

        $added_by= User::where('id',$approve_independent_tasks->added_by)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hi, '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('New independent task assignee to you') .'</b>'.'
      </h1>';

      $body= '<p>
        '.'You’ve Received a independent task. To check the details, follow this link.'.
     '</p>'
     ;
     $content =

     '<p>
        <b style="color: black">' . __('Task Name') . ': '.'</b>' .$approve_independent_tasks->heading . '
    </p>'.
    '<p>
        <b style="color: black">' . __('Task Description') . ': '.'</b>' .$approve_independent_tasks->description . '
    </p>'.
    '<p>
       <b style="color: black">' . __('Added By') . ': '.'</b>' . '<a href="'.route('employees.show',$added_by->id).'">'.$added_by->name .'</a>'. '
   </p>';

          return (new MailMessage)
          ->subject(__('New independent task assignee to you') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.approve-independent-task.approve_independent_task', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
