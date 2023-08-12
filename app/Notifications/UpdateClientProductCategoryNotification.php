<?php

namespace App\Notifications;

use App\Models\ProductCategoryCollection;
use App\Models\Project;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateClientProductCategoryNotification extends Notification
{
    use Queueable;
    protected $sales_product_category;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($sales_product_category)
    {
        $this->sales_product_category = $sales_product_category;
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
        $project= Project::where('deal_id',$this->sales_product_category->deal_id)->first();
        $url = url('/account/projects/'. $project->id);


        $pm= User::where('id',$project->pm_id)->first();
        $client= User::where('id',$project->client_id)->first();
        $product_category = ProductCategoryCollection::where('id',$this->sales_product_category->product_cat_callection_id)->first();
        $greet= '<p>
           <b style="color: black">'  . '<span style="color:black">'.'Hello '.$notifiable->name. ','.'</span>'.'</b>
       </p>'
       ;
       $header= '<p>
          <h1 style="color: red; text-align: center;" >' . __('Product Cattegory/Collection Form Updated ') .'</b>'.'
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
        <b style="color: black">' . __('Service Type') . ': '.'</b>' . '<span>'.$product_category->service_type.'</span>'. '
    </p>'


   ;

          return (new MailMessage)
          ->subject(__('Client '.$client->name.', Product Category/Collection Form Updated') )

          ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.service-type.product_category_update', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
