<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\LeadFollowUp;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class AutoFollowUpReminder extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $leadFollowup;
    private $emailSetting;

    public function __construct(LeadFollowUp $leadFollowup)
    {
        $this->leadFollowup = $leadFollowup;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'follow-up-reminder')->first();
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

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
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
        $url = route('leads.show', $this->leadFollowup->lead->id).'?tab=follow-up';

        $followUpDate = (!is_null($this->leadFollowup->next_follow_up_date)) ? $this->leadFollowup->next_follow_up_date->format(global_setting()->date_format) : null;

        $content = ucfirst($this->leadFollowup->remark);

        return (new MailMessage)
            ->subject(__('email.followUpReminder.subject') . ' #' . $this->leadFollowup->id . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.followUpReminder.nextFollowUpDate') . ' :- ' . $followUpDate)
            ->line($content)
            ->action(__('email.followUpReminder.action'), $url)
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    // phpcs:ignore
    public function toArray($notifiable)
    {
        // dd($this->leadFollowup->id);
        return [
            'follow_up_id' => $this->leadFollowup->id,
            'id' => $this->leadFollowup->lead->id,
            'created_at' => $this->leadFollowup->created_at->format('Y-m-d H:i:s'),
            'heading' => __('email.followUpReminder.subject'),
        ];
    }

}
