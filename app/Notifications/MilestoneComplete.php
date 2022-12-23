<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\ProjectMilestone;
use App\Models\Project;
use App\Models\User;
use App\Models\Currency;
use App\Models\Invoice;

class MilestoneComplete extends Notification
{
    use Queueable;
    protected $project;
    protected $milestone;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project,$milestone)
    {
        $this->project = $project;
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
      $project= Project::where('id',$this->milestone->project_id)->first();
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
      <h1 style="color: red; text-align: center;" >' . __('All Milestone Completed') .'</b>'.'
  </h1>';
    $body= '<p>
    All milestones are completed of this project '.'<a href="'.route('projects.show',$project->id).'">'. $project->project_name .'</a>' . ' but payment not completed fully. Let'. '&#39;'. 's check the short details below. You can check the details about this project following '.'<a href="'.route('projects.show',$project->id).'">'.'this link'.'</a>'.'
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
  </p>' .
   '<p>
      <b style="color: black">' . __('Milestone Completed') . ': '.'</b>' . $complete_milestone . '
  </p>'
  .
  '<p>
     <b style="color: black">' . __('Invoice Created') . ': '.'</b>' . $invoice_unpaid . '
 </p>'
 .
 '<p>
      <b style="color: black">' . __('Invoice Paid') . ': '.'</b>' . $invoice_paid . '
  </p>'


 ;

        return (new MailMessage)
        ->subject(__('[No Reply] All Milestone Completed Successfully') )

        ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
        ->markdown('mail.milestone.complete', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);


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
            'project_id'=> $this->project['id']

        ];
    }
}
