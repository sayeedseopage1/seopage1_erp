<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskComment;

class TaskCommentNotification extends Notification
{
    use Queueable;
    protected $task;
    protected $sender;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($task,$sender)
    {
        $this->task=$task;
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

        $task= Task::where('id',$this->task->id)->first();
        $url = url('/account/tasks/'. $task->id);
        $project= Project::where('id',$task->project_id)->first();
        $sender= User::where('id',$this->sender->id)->first();
        $task_comment = TaskComment::where('task_id', $task->id)
                        ->orderBy('created_at', 'desc')
                        ->first();

        $pm= User::where('id',$project->pm_id)->first();
        $client= User::where('id',$project->client_id)->first();

        if ($task_comment->files) {
            $files = json_decode($task_comment->files);
             $imgUrls = '';

             foreach ($files as $item) {
                $img = 'https://seopage1storage.s3.ap-southeast-1.amazonaws.com/' . $item;
               $imgUrls .= ' <img src="'.$img.'" alt=""><br>';
            }
        }


        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('New comment added: Client ('.$client->name.') Task ('.$task->heading.')') .'</b>'.'
      </h1>';
      $body= '<p>
        '.$sender->name.' added a comment on this task ('.$task->heading.'). To check the details, follow this link.'.
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
       <b style="color: black">' . __('Comment') . ': '.'</b>' .$task_comment->comment . '
   </p>'. 
   '<p>
       <b style="color: black">' . __('Attachments') . ': '.'</b><br>' .$imgUrls . '
   </p>'


   ;
 
//    dd($imgUrls);


          return (new MailMessage)
          ->subject(__('New comment added: Client ('.$client->name.') Task ('.$task->heading.')') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.task.task_comment', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
            'id' => $this->task->id,
            'updated_at' => $this->task->updated_at->format('Y-m-d H:i:s'),
            'heading' => $this->task->heading
        ];
    }
    public function toDatabase($notifiable)
    {
        return [

            'task_id'=> $this->task['id']

        ];
    }
}
