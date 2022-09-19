<?php

namespace App\Notifications;

use App\Models\UserInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvitationEmail extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var UserInvitation
     */
    private $invite;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(UserInvitation $invite)
    {
        $this->invite = $invite;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    // phpcs:ignore
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
    // phpcs:ignore
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject($this->invite->user->name . ' ' . __('email.invitation.subject') . config('app.name'))
            ->greeting(__('email.hello'))
            ->line($this->invite->user->name . ' ' . __('email.invitation.subject') . config('app.name') . '.')
            ->line($this->invite->message)
            ->action(__('email.invitation.action'), route('invitation', $this->invite->invitation_code));
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
        return [
            //
        ];
    }

}
