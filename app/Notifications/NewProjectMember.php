<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\SlackSetting;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class NewProjectMember extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $project;
    private $emailSetting;
    private $projectMember;

    public function __construct(Project $project)
    {
        $this->project = $project;
        $this->projectMember = ProjectMember::where('project_id', $this->project->id )->first();
        $this->emailSetting = EmailNotificationSetting::where('slug', 'employee-assign-to-project')->first();
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed $notifiable
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

        if ($this->emailSetting->send_push == 'yes') {
            array_push($via, OneSignalChannel::class);
        }

        return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    // phpcs:ignore
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('email.newProjectMember.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.newProjectMember.text') . ' - ' . mb_ucwords($this->project->project_name))
            ->action(__('email.newProjectMember.action'), route('projects.show', $this->project->id))
            ->line(__('email.thankyouNote'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'member_id' => $this->projectMember->id,
            'project_id' => $this->project->id,
            'project' => $this->project->project_name
        ];
    }

    /**
     * Get the Slack representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return SlackMessage
     */
    public function toSlack($notifiable)
    {
        $slack = SlackSetting::setting();

        if (count($notifiable->employee) > 0 && (!is_null($notifiable->employee[0]->slack_username) && ($notifiable->employee[0]->slack_username != ''))) {
            return (new SlackMessage())
                ->from(config('app.name'))
                ->image($slack->slack_logo_url)
                ->to('@' . $notifiable->employee[0]->slack_username)
                ->content('*'.__('email.newProjectMember.subject').'*'."\n".__('email.newProjectMember.text') . ' - ' . mb_ucwords($this->project->project_name));
        }

        return (new SlackMessage())
            ->from(config('app.name'))
            ->image($slack->slack_logo_url)
            ->content('This is a redirected notification. Add slack username for *' . mb_ucwords($notifiable->name) . '*');
    }

    public function toOneSignal()
    {
        return OneSignalMessage::create()
            ->subject(__('email.newProjectMember.subject'))
            ->body(mb_ucwords($this->project->project_name));
    }

}
