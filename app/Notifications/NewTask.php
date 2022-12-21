<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\SlackSetting;
use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;
use App\Models\User;
use App\Models\Project;

class NewTask extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $task;
    private $emailSetting;

    public function __construct(Task $task)
    {
        $this->task = $task;
        $this->emailSetting = EmailNotificationSetting::userAssignTask();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = ['database'];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        if ($this->emailSetting->send_slack == 'yes' && slack_setting()->status == 'active') {
            array_push($via, 'slack');
        }

        if ($this->emailSetting->send_push == 'yes') {
            array_push($via, OneSignalChannel::class);
        }

        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = route('tasks.show', $this->task->id);


        $dueDate = (!is_null($this->task->due_date)) ? $this->task->due_date->format(global_setting()->date_format) : null;
        $creationDate = (!is_null($this->task->created_at)) ? $this->task->created_at->format(global_setting()->date_format) : null;
        $user= User::where('id',$this->task->added_by)->first();
        $project= Project::where('id',$this->task->project_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
        $assigned_by= '<p>
           <b style="color: black">'  . '<span style="color:blue">'. '<a class="text-darkest-grey" href="'. route('employees.show', $user->id) .'">'.$user->name.'</a>'. '</span>'.'</b>' . ' has assigned a new task to you. Check the short details below. You can check the details about this task following '. '<a class="text-darkest-grey" href="'. route('tasks.show', $this->task->id) . '">this link'.'.'.'</a>'.'
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('New Task Assigned to You') .'</b>'.'
      </h1>';

        $content =
        '<p>
           <b style="color: black">' . __('Task Name') . ': '.'</b>' . ucfirst($this->task->heading) . '
       </p>' .
        '<p>
           <b style="color: black">' . __('Task Assign Date') . ': '.'</b>' . $creationDate . '
       </p>'
        .

         '<p>
            <b style="color: red">' . __('app.dueDate') . ': ' . $dueDate . '</b>
        </p>'
        .
        '<p>
           <b style="color: black">' . __('Task Assigned By') . ': '.'</b>' . '<a class="text-darkest-grey" href="'. route('employees.show', $user->id) .'">'.$user->name.'</a>' . '
       </p>'.
       '<p>
          <b style="color: black">' . __('Project Name') . ': '.'</b>' . $project->project_name . '
      </p>';

        return (new MailMessage)
            ->subject(__('email.newTask.subject') . ' #' . $this->task->id . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->markdown('mail.task.created', ['url' => $url, 'content' => $content,'greet'=> $greet, 'assigned_by'=> $assigned_by,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'id' => $this->task->id,
            'created_at' => $this->task->created_at->format('Y-m-d H:i:s'),
            'heading' => $this->task->heading
        ];
    }

    /**
     * Get the Slack representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
        $slack = SlackSetting::setting();
        $dueDate = (!is_null($this->task->due_date)) ? $this->task->due_date->format(global_setting()->date_format) : null;

        if (count($notifiable->employee) > 0 && (!is_null($notifiable->employee[0]->slack_username) && ($notifiable->employee[0]->slack_username != ''))) {
            return (new SlackMessage())
                ->from(config('app.name'))
                ->image($slack->slack_logo_url)
                ->to('@' . $notifiable->employee[0]->slack_username)
                ->content('*' . __('email.newTask.subject') . '*' . "\n" . '<'.route('tasks.show', $this->task->id).'|'.ucfirst($this->task->heading).'>' . "\n" . ' #' . $this->task->id . "\n" . __('app.dueDate') . ': ' . $dueDate . (!is_null($this->task->project) ? "\n" . __('app.project') . ' - ' . ucfirst($this->task->project->project_name) : ''));
        }

        return (new SlackMessage())
            ->from(config('app.name'))
            ->image($slack->slack_logo_url)
            ->content('This is a redirected notification. Add slack username for *' . mb_ucwords($notifiable->name) . '*');
    }

    // phpcs:ignore
    public function toOneSignal($notifiable)
    {
        return OneSignalMessage::create()
            ->subject(__('email.newTask.subject'))
            ->body($this->task->heading);
    }

}
