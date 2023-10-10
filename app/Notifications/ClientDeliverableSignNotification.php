<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Storage; 


class ClientDeliverableSignNotification extends Notification
{
    use Queueable;
    protected $project_id;
    protected $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project_id,$user)
    {
        $this->project_id=$project_id;
        $this->user=$user;
       // dd($this->user);
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
        $project= Project::where('id',$this->project_id->id)->first();
        $url = url('/account/projects/'. $project->id.'?tab=deliverables');
        $user= User::where('id',$this->user->id)->first();
        
 
 
        $pm= User::where('id',$project->pm_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $filename = str_slug($project->project_name) . '-agreement-' . $project->id . '.pdf';
        $pdfPath = storage_path('app/temp/' . $filename); // Path to the saved PDF
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Client has signed '.$project->project_short_code.' project deliverable document' ) .'</b>'.'
      </h1>';
      $body= '<p>
        '.'Client ('.$client->name.') signed deliverable document '.$project->project_name.'. To check the details, follow this link.'.
     '</p>'
     ;
     $content =
 
     '<p>
        <b style="color: black">' . __('Project Name') . ': '.'</b>' . '<a href="'.route('projects.show',$project->id).'">'.$project->project_name . '
    </p>'
    .
    '<p>
       <b style="color: black">' . __('Client Name') . ': '.'</b>' . '<a href="'.route('clients.show',$client->id).'">'.$client->name .'</a>'. '
   </p>'
     .
     '<p>
        <b style="color: black">' . __('Project Manager') . ': '.'</b>' . '<a href="'.route('employees.show',$pm->id).'">'.$pm->name .'</a>'. '
    </p>'
 
 
   ;
   $subject= 'Client ' . $client->name . ' signed the deliverables';
   if($user->role_id == null)
   {
            $header= '';
        $body= '<p>
        '.'You signed deliverable document '.$project->project_name.'. To check the details, follow this link.'.
        '</p>'
        ;
        $content = ''

        ;
    $subject = 'Greetings from Seopage1';
    $url = url('/projects/public/download/'. $project->id); 
    
   }
   $mailMessage = (new MailMessage)
   ->subject(__('' . $subject . ''))
   ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
   ->markdown('mail.project.client_deliverable_sign', ['url' => $url, 'content' => $content,'greet'=> $greet, 'body' => $body, 'header' => $header, 'name' => mb_ucwords($notifiable->name)])
   ->attach($pdfPath, [
       'as' => $filename,
       'mime' => 'application/pdf',
   ]);

return $mailMessage;
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

            'project_id'=> $this->project_id['id']

        ];
    }
}
