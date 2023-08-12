<?php

namespace App\Notifications;

use App\Models\BlogArticle;
use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateClientBlogArticlesNotification extends Notification
{
    use Queueable;
    protected $sales_blog_article;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($sales_blog_article)
    {
        $this->sales_blog_article = $sales_blog_article;
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
        $project= Project::where('deal_id',$this->sales_blog_article->deal_id)->first();
        $url = url('/account/projects/'. $project->id);


        $pm= User::where('id',$project->pm_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $blog_article = BlogArticle::where('id',$this->sales_blog_article->blog_article_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Blog/Articles Form Updated ') .'</b>'.'
      </h1>';
    //    $header= '<p>
    //       <h1 style="color: red; text-align: center;" >' . __('Project Q&C Received '.$project->project_short_code.'') .'</b>'.'
    //   </h1>';
      $body= '<p>
        '.'You’ve Received a mail. To check the details, follow this link.'.
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
        <b style="color: black">' . __('Service Type') . ': '.'</b>' . '<span>'.$blog_article->service_type.'</span>'. '
    </p>'


   ;

          return (new MailMessage)
          ->subject(__('Client '.$client->name.', Blog Articles Form Updated') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.service-type.blog_article_update', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
