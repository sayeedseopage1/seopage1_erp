<?php

namespace App\Notifications;

use App\Models\Deal;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class HourlyDealNotification extends Notification
{
    use Queueable;
    protected $deal;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($deal)
    {
        $this->deal = $deal;
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

        $deal= Deal::where('id',$this->deal->id)->first();
        $url = url('/account/contracts/'. $deal->id);


        $client= User::where('id',$deal->client_id)->first();

        $greet= '<p><b style="color: black">'  . '<span style="color:black">'.'Hi '. $notifiable->name. ','.'</span>'.'</b></p>';

        $header= '<strong>' . __('New Project Assigned To You') .'</strong>';

        $body = '<p>' . 'We have won a new deal for you on <span>' . $deal->created_at->format('Y-m-d') . ' at ' . $deal->created_at->format('h:i:s A') . '.</span> Let\'s check the short details below. You can check the details about this deal following <a href="erp.seopage1.net/account/contracts/' . $deal->id . '">this link.</a>' . '</p>';

        $content = '<h4 style="color: #D99218; font-weight: 700; font-size: 22px;">' . __('Deal Details') . ': ' . '</h4>' .
                    '<ul>' .
                    '<li class="py-1"><strong>' . __('Deal Name') . ': ' . $deal->project_name . '</strong></li>' .
                    '<li class="py-1"><strong>' . __('Deal Type') . ': <span style="color:green">' . $deal->project_type . '</span></strong></li>'.
                    '<li class="py-1"><strong>' . __('Created On') . ': ' . $deal->created_at->format('Y-m-d') . ' at ' . $deal->created_at->format('h:i:s A') . '</strong></li>' .
                    '<li class="py-1"><strong>' . __('Client Name') . ': ' . $client->user_name . '</strong></li><br>';

                if ($deal->deadline != null) {
                    $content .= '<li class="py-1"><strong>' . __('The last Delivery Time Is') . ': ' . $deal->deadline . '</strong></li>';
                }

                $content .= '<li><strong>' . __('Freelancer Profile Link') . ': <a target="_blank" href="' . $deal->profile_link . '">' . $deal->profile_link . '</a></strong></li>' .
                    '<li class="py-1"><strong>' . __('Freelancer Message Link') . ': <a target="_blank" href="' . $deal->message_link . '">' . $deal->message_link . '</a></strong></li>' .
                    '<li class="py-1"><strong>' . __('Sales Executive') . ': ' . $deal->user->email . '</strong></li>' .
                    '</ul><hr>' .

                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description2 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be better than the references.)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description3 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for section layouts DEF.com is for header & footer styling. However, none of these can be copied)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description4 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work the way he wants.)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description5 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description6 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description7 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description8 . '</p>' .
                    '</div>'.
                    '<div>' .
                    '<h5 style="color: blue; font-size:16px;">Any other notes for the project manager/technical team</h5>' .
                    '<p style="color: black; font-size:14px;">' . $deal->description9 . '</p>' .
                    '</div>';

                    // dd('adsasdas');
          return (new MailMessage)
          ->subject(__('Client '.$client->name.', New Project Assigned To You') )

          ->greeting(__('email.Hi') . ' ' . mb_ucwords($notifiable->name) . ',')
          ->markdown('mail.won-deal.hourly_deal', ['url' => $url, 'greet'=> $greet,'content' => $content, 'body'=> $body,'header'=>$header, 'name' => mb_ucwords($notifiable->name)]);
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
