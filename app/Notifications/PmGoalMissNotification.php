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
        $url = url('/account/project-status?modal_type=individual_goal_details&status=expired');
        $client= User::where('id',$pm_goal->client_id)->first();

        // calculating ordinal suffix 
        $nthGoal = 1;
        ProjectPmGoal::where('project_id', $pm_goal->project_id)->orderBy('id', 'ASC')->each(function($item) use($pm_goal, &$nthGoal) {
            if ($pm_goal->id == $item->id) 
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

        $header = '<strong>' . __(''.$nthGoal.' goal for client ' . $client->name . ' was not met') . '</strong>';

        $body= '<p>'.'You couldn’t meet this goal!'.'</p>';
        $content =
        '<p>
            <b style="color: black">' . __('Project name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
        </p>'.
        '<p>
            <b style="color: black">' . __('Client name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Project category') . ': '.'</b>' . '<span>'.$pm_goal->project_category.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal number') . ': '.'</b>' . '<span>'.$nthGoal.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal description') . ': '.'</b>' . '<span>'.$pm_goal->expired_meet_description.'</span>'. '
        </p>';
        $pm_goal->mail_status = 2;
        $pm_goal->save();

          return (new MailMessage)
          ->subject(__(''.$nthGoal.' goal for client ' . $client->name . ' was not met') )

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
