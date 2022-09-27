<?php

namespace App\Notifications;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewContract extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $contract;

    public function __construct(Contract $contract)
    {
        $this->contract = $contract;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        // $via = ['database'];
        //
        // if ($notifiable->email_notifications && $notifiable->email != '') {
        //     array_push($via, 'mail');
        // }
        //
        // return $via;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('email.newContract.subject'))
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.newContract.text'))
            ->action(__('app.view') . ' ' . __('app.menu.contract'), route('front.contract.show', $this->contract->hash));
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
        return $this->contract->toArray();
    }

}
