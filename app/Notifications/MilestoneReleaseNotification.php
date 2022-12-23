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

class MilestoneReleaseNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
     protected $milestone;
     protected $invoice;
    // / protected $output;


    public function __construct($milestone,$invoice)
    {
      // /dd($invoice);
        $this->milestone = $milestone;
        $this->invoice = $invoice;
    //    $this->output = $output;
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
    $milestones= ProjectMilestone::where('project_id',$project->id)->get();
    //dd($milestones);
    foreach ($milestones as $key => $milest) {
      if ($milest->id == $milestone_id->id) {
        $data= $key+1;
        //dd($data);
        // code...
      }
      // code...
    }
    $incomplete_milestone= ProjectMilestone::where('project_id',$project->id)->where('status','incomplete')->get();
    $complete_milestone= ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
    $currency= Currency::where('id',$milestone_id->original_currency_id)->first();

    if($milestone_id->summary != null)
    {
      $description= $milestone_id->summary;

    }else {
      $description = 'No Description Found';
    }

    $client= User::where('id',$project->client_id)->first();
    $pm= User::where('id',$project->pm_id)->first();

      $greet= '<p>
         <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
     </p>'
     ;
     $header= '<p>
        <h1 style="color: red; text-align: center;" >' . __('New Payment Realesed') .'</b>'.'
    </h1>';
      $body= '<p>
        New Milestone was released on '.$this->invoice->updated_at->format('Y-m-d') .' '. 'at'.' ' . $this->invoice->created_at->format('h:i:s A') . ' '.'Let'. '&#39;'. 's check the short details below. You can check all the milestones of this project by clicking View Milestone.
     </p>'
     ;
     $remaining='';
     foreach ($incomplete_milestone as $key => $val)
       {
         $remaining .=

         '<p>'.


           '<b style="color: black">' . __( $complete_milestone+$key+1 .'. ') .'</b>' . $val->milestone_title .'('.$val->actual_cost . $currency->currency_symbol.')'.




      '</p>';

    }


      $content =
      '<p>
         <b style="color: black">' . __('Milestone No') . ': '.'</b>' . $data . '
     </p>' .
      '<p>
         <b style="color: black">' . __('Milestone Title') . ': '.'</b>' . $this->milestone->milestone_title . '
     </p>'
      .
      '<p>
         <b style="color: black">' . __('Project') . ': '.'</b>' . $project->project_name . '
     </p>'
     .
     '<p>
        <b style="color: black">' . __('Client') . ': '.'</b>' . $client->name . '
    </p>'
    .
    '<p>
         <b style="color: black">' . __('Project Manager') . ': '.'</b>' . $this->milestone->milestone_title . '
     </p>'

      .
      '<p>
         <b style="color: black">' . __('Milestone Cost') . ': '.'</b>' . $this->milestone->actual_cost .$currency->currency_symbol .'
     </p>'
     .
     '<p>
        <b style="color: black">' . __('Description') . ': '.'</b>' . $description .'
    </p>'.

    '<h1>
        <b style="color:black; text-align:center;">Remaining Milestone </b>
    </h1>'.'<hr>'

    ;

        return (new MailMessage)
              ->subject(__('[No Reply] New Milestone Released Successfully') )

              ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
              ->markdown('mail.milestone.release', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header,'remaining'=>$remaining, 'name' => mb_ucwords($notifiable->name)]);

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
            'invoice_id'=> $this->invoice['id']

        ];
    }
}
