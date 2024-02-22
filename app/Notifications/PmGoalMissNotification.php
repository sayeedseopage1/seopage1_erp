<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\ProjectPmGoal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PmGoalMissNotification extends Notification
{
    use Queueable;
    protected $goal_check;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($goal_check)
    {
        $this->goal_check = $goal_check;
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

        $pm_goal= ProjectPmGoal::where('id',$this->goal_check->id)->first();
        $project= Project::where('id',$pm_goal->project_id)->first();
        $pm= User::where('id',$project->pm_id)->first();
        $url = url('/account/project-status/'. $pm_goal->id);


        $client= User::where('id',$pm_goal->client_id)->first();

        $greet= '<p><b style="color: black">'  . '<span style="color:black">'.'Hi '. $notifiable->name. ','.'</span>'.'</b></p>';

        $header= '<strong>' . __('Client '.$client->name.', Project manager '.$pm->name.' missed '.$pm_goal->duration.' days goal for a '.$pm_goal->project_category.' project '.$project->project_name.' .') .'</strong>';

        $body= '<p>'.'You’ve Received a mail. To check the details, follow this link.'.'</p>';
        $content =
        '<p>
            <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
        </p>'.
        '<p>
            <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal Name') . ': '.'</b>' . '<span>'.$pm_goal->goal_name.'</span>'. '
        </p>';

        $pm_goal->mail_status = 1;
        $pm_goal->save();

          return (new MailMessage)
          ->subject(__('Client '.$client->name.', Project manager '.$pm->name.' missed '.$pm_goal->duration.' days goal for a '.$pm_goal->project_category.' project '.$project->project_name.' .') )

          ->greeting(__('email.Hi') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.pm-goal.miss_goal', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
