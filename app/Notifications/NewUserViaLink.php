<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\SlackSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class NewUserViaLink extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $new_user;
    private $emailSetting;

    public function __construct($new_user)
    {
        $this->new_user = $new_user;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'user-join-via-invitation')->first();
    }

    /**
     * Get the notification's delivery channels.
     *t('mail::layout')
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $via = ['database'];

        if ($this->emailSetting->send_email == 'yes' && $notifiable->email_notifications && $notifiable->email != '') {
            array_push($via, 'mail');
        }

        if ($this->emailSetting->send_slack == 'yes' && slack_setting()->status == 'active') {
            array_push($via, 'slack');
        }

        return $via;

    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {

        $url = route('employees.show', $this->new_user->id);

        return (new MailMessage)
            ->subject(__('email.newUserViaLink.subject') . ' ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.newUserViaLink.text'))
            ->line(__('app.name') . ':- ' . $this->new_user->name)
            ->line(__('app.email') . ':- ' . $this->new_user->email)
            ->action(__('email.newUserViaLink.action'), $url)
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    //phpcs:ignore
    public function toArray($notifiable)
    {
        return [
            'user_id' => $this->new_user->id,
            'name' => $this->new_user->name,
            'image_url' => $this->new_user->image_url,
        ];
    }

    /**
     * Get the Slack representation of the notification.
     *
     * @param mixed $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
        $slack = SlackSetting::setting();

        try {
            return (new SlackMessage())
                ->from(config('app.name'))
                ->image($slack->slack_logo_url)
                ->to('@' . $notifiable->slack_username)
                ->content('*' . __('email.newUserViaLink.subject') . ' ' . config('app.name') . '!*' . "\n" . __('email.newUserViaLink.text'));
        } catch (\Exception $e) {
            return (new SlackMessage())
                ->from(config('app.name'))
                ->image($slack->slack_logo_url)
                ->content('This is a redirected notification. Add slack username for *' . mb_ucwords($notifiable->name) . '*');
        }

    }

}
