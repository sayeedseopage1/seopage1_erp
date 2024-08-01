<?php

namespace App\Notifications;

use App\Models\PmGoalDeadlineExtHistory;
use App\Models\Project;
use App\Models\ProjectPmGoal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PmGoalExtendRequestNotification extends Notification
{
    use Queueable;
    protected $goal;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($goal)
    {
        $this->goal = $goal;
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

        $goal= ProjectPmGoal::where('id',$this->goal->id)->first();
        $project= Project::where('id',$goal->project_id)->first();
        $extension = PmGoalDeadlineExtHistory::where('goal_id', $this->goal->id)->first();
        $url = url('/account/project-status?modal_type=filtered_goal_details&goal_id=' . $goal->id. '&project_id='.$project->id);
        $client= User::where('id',$goal->client_id)->first();
        $pm= User::where('id',$goal->pm_id)->first();

        // calculating ordinal suffix 
        $nthGoal = 0;
        ProjectPmGoal::where('project_id', $goal->project_id)->orderBy('id', 'ASC')->each(function($item) use($goal, &$nthGoal) {
            if ($goal->id == $item->id) 
                return false;
            $nthGoal++;
        });

        $ends = ['th','st','nd','rd','th','th','th','th','th','th'];
        if (($nthGoal %100) >= 11 && ($nthGoal%100) <= 13)
            $nthGoal = $nthGoal. 'th';
        else
            $nthGoal = $nthGoal. $ends[$nthGoal % 10];
        // end calculation
        
        $greet= '<p><b style="color: black">'  . '<span style="color:black">'.'Hi '. $notifiable->name. ','.'</span>'.'</b></p>';
        $header = '<strong>' . __('Goal deadline extension requested by PM ('.$pm->name.')') . '</strong>';

        $body= '<p>'.'PM ('.$pm->name.') requested an extension for the following goal: </p>';
        $content =
        '<p>
            <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
        </p>'.
        '<p>
            <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Project Category') . ': '.'</b>' . '<span>'.$goal->project_category.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal Number') . ': '.'</b>' . '<span>'.$nthGoal.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal Title') . ': '.'</b>' . '<span>'.$goal->goal_name.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Actual Goal Deadline') . ': '.'</b>' . '<span>'.$goal->goal_end_date.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Extension Requested Till') . ': '.'</b>' . '<span>'.$extension->extended_day. ' Days'.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Reason for extension') . ': '.'</b>' . '<span>'.$extension->extended_pm_reason.'</span>'. '
        </p>';
        $goal->mail_status = 4;
        $goal->save();

          return (new MailMessage)
          ->subject(__('Goal deadline extension requested by PM ('.$pm->name.')') )

          ->greeting(__('email.Hi') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.pm-goal.extend_request', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
