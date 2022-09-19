<?php

namespace App\Notifications;

use App\Models\EmployeeShiftSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ShiftScheduled extends Notification implements ShouldQueue
{
    use Queueable;

    public $employeeShiftSchedule;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(EmployeeShiftSchedule $employeeShiftSchedule)
    {
        $this->employeeShiftSchedule = $employeeShiftSchedule;
    }

    public function via()
    {
        return ['mail', 'database'];
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
            ->subject(__('email.shiftScheduled.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('app.date') .': '.$this->employeeShiftSchedule->date->toFormattedDateString())
            ->line(__('modules.attendance.shiftName') .': '. $this->employeeShiftSchedule->shift->shift_name)
            ->action(__('email.loginDashboard'), route('dashboard'))
            ->line(__('email.thankyouNote'));
    }

    public function toArray()
    {
        return [
            'user_id' => $this->employeeShiftSchedule->user_id,
            'shift_id' => $this->employeeShiftSchedule->employee_shift_id,
            'date' => $this->employeeShiftSchedule->date
        ];
    }

}
