<?php

namespace App\Notifications;

use App\Models\Project;
use App\Models\ProjectPmGoal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PmGoalReviewExplanationNotification extends Notification
{
    use Queueable;
    protected $ppg;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($ppg)
    {
        $this->ppg = $ppg;
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

        $goal= ProjectPmGoal::where('id',$this->ppg->id)->first();
        $project= Project::where('id',$goal->project_id)->first();
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
        $header = '<strong>' . __('PM '.$pm->name.': '.$nthGoal.' goal for client ' . $client->name . ' was not met! Add your rating!') . '</strong>';

        $body= '<p>'.'PM '. $pm->name .' couldn’t meet his goal. Please check the details below:'.'</p>';
        $content =
        '<p>
            <b style="color: black">' . __('Project name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'"> '.$project->project_name . '
        </p>'.
        '<p>
            <b style="color: black">' . __('Client name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Project category') . ': '.'</b>' . '<span>'.$goal->project_category.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal number') . ': '.'</b>' . '<span>'.$nthGoal.'</span>'. '
        </p>'
        .
        '<p>
            <b style="color: black">' . __('Goal description') . ': '.'</b>' . '<span>'.$goal->expired_meet_description.'</span>'. '
        </p>';
        $goal->mail_status = 3;
        $goal->save();

          return (new MailMessage)
          ->subject(__('PM '.$pm->name.': '.$nthGoal.' goal for client ' . $client->name . ' was not met! Add your rating!') )

          ->greeting(__('email.Hi') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.pm-goal.review_explanation', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
