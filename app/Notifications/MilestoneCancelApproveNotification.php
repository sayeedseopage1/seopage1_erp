<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\ProjectMilestone;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Project;
use App\Models\User;

class MilestoneCancelApproveNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    protected $milestone;

     public function __construct($milestone)
    {
        $this->milestone = $milestone;
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
        $project= Project::where('id',$this->milestone->project_id)->first();
       // dd($project);
        $url = url('/account/projects/'. $project->id .'?tab=milestones');
        $milestone_id= ProjectMilestone::where('id',$this->milestone->id)->first();
  
      //dd($project);
  
      //$incomplete_milestone= ProjectMilestone::where('project_id',$project->id)->where('status','incomplete')->get();
      $complete_milestone= ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
      $currency= Currency::where('id',$milestone_id->original_currency_id)->first();
      $invoice_unpaid= Invoice::where('id',$project->id)->where('status','unpaid')->count();
      $invoice_paid= Invoice::where('id',$project->id)->where('status','paid')->count();
  
      $pm= User::where('id',$project->pm_id)->first();
      $client= User::where('id',$project->client_id)->first();
      $greet= '<p>
         <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
     </p>'
     ;
     $header= '<p>
        <h1 style="color: red; text-align: center;" >' . __('You have a milestone cancel request') .'</b>'.'
    </h1>';
      $body= '<p>
      A cancelation request sent by <strong><b>'.$pm->name.'</b></strong> for the following project '.'<a href="'.route('projects.show',$project->id).'">'. $project->project_name .'</a>' . ' but payment not completed fully. Let'. '&#39;'. 's check the short details below. You can check the details about this project following '.'<a href="'.route('projects.show',$project->id).'">'.'this link'.'</a>'.'
     </p>'
     ;
     $content =
     '<p>
        <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
    </p>' .
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
    </p>'
     .
     '<p>
        <b style="color: black">' . __('Project Manager') . ': '.'</b>' . '<a href="'.route('employees.show',$pm->id).'">'.$pm->name .'</a>'. '
    </p>' 
  
   ;
  
          return (new MailMessage)
          ->subject(__('Client '.$client->name.', a milestone cancelation request sent for approval') )
  
          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.milestone.cancel', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
    public function toDatabase($notifiable)
    {
        return [
            'milestone_id' => $this->milestone['id'],
           

        ];
    }
}
