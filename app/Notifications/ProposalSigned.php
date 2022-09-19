<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Proposal;
use App\Models\ProposalSign;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Bus\Queueable;

class ProposalSigned extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $proposal;
    private $emailSetting;

    public function __construct(Proposal $proposal)
    {
        $this->proposal = $proposal;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'lead-notification')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = ['database'];

        if ($notifiable->email_notifications && $this->emailSetting->send_email == 'yes' && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {

        $url = route('front.proposal', $this->proposal->hash);

        if($this->proposal->status == 'accepted'){

            return (new MailMessage)
                ->subject(__('email.proposalSigned.subject'))
                ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . '!')
                ->line(__('app.status') . ' : ' . mb_ucwords($this->proposal->status))
                ->action(__('app.view') . ' ' . __('app.proposal'), $url)
                ->line(__('email.thankyouNote'));
        }

        return (new MailMessage)
            ->subject(__('email.proposalRejected.subject'))
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . '!')
            ->line(__('email.proposalRejected.rejected') . ' : ' . $this->proposal->client_comment)
            ->line(__('app.status') . ': ' . mb_ucwords($this->proposal->status))
            ->action(__('app.view') . ' ' . __('app.proposal'), $url)
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    //phpcs:ignore
    public function toArray($notifiable)
    {
        return $this->proposal->toArray();
    }

}
