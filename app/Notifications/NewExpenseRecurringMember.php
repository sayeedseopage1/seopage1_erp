<?php

namespace App\Notifications;

use App\Models\EmailNotificationSetting;
use App\Models\ExpenseRecurring;
use App\Models\SlackSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\OneSignal\OneSignalChannel;
use NotificationChannels\OneSignal\OneSignalMessage;

class NewExpenseRecurringMember extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $expense;
    private $emailSetting;

    public function __construct(ExpenseRecurring $expense)
    {
        $this->expense = $expense;
        $this->emailSetting = EmailNotificationSetting::where('slug', 'new-expenseadded-by-member')->first();

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
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(__('email.newExpenseRecurring.subject') . ' - ' . config('app.name'))
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . '!')
            ->line(__('email.newExpenseRecurring.subject') . '.')
            ->line(__('app.employee') . ': ' . mb_ucwords($this->expense->user->name))
            ->line(__('modules.expenses.itemName') . ': ' . $this->expense->item_name)
            ->line(__('app.price') . ': ' . $this->expense->currency->currency_symbol . $this->expense->price)
            ->action(__('email.newExpenseRecurring.action'), route('recurring-expenses.show', $this->expense->id))
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
        return $this->expense->toArray();
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
                ->content(__('email.newExpenseRecurring.subject') . ' - ' . $this->expense->item_name . ' - ' . $this->expense->currency->currency_symbol . $this->expense->price . "\n" . url('/login'));
        }

        return (new SlackMessage())
            ->from(config('app.name'))
            ->image($slack->slack_logo_url)
            ->content('This is a redirected notification. Add slack username for *' . mb_ucwords($notifiable->name) . '*');
    }

    // phpcs:ignore
    public function toOneSignal($notifiable)
    {
        return OneSignalMessage::create()
            ->subject(__('email.newExpenseRecurring.subject'))
            ->body($this->expense->item_name . ' by ' . mb_ucwords($this->expense->user->name));
    }

}
