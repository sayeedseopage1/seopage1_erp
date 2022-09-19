<?php

namespace App\Notifications;

use App\Models\EmployeeShiftChangeRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ShiftChangeRequest extends Notification implements ShouldQueue
{
    use Queueable;

    public $employeeShiftSchedule;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(EmployeeShiftChangeRequest $employeeShiftSchedule)
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
            ->subject(__('email.shiftChange.subject') . ' - ' . config('app.name') . '.')
            ->greeting(__('email.hello') . ' ' . mb_ucwords($notifiable->name) . ',')
            ->line(__('email.shiftChange.text'))
            ->line(__('app.employee').': '.$this->employeeShiftSchedule->shiftSchedule->user->name)
            ->line(__('app.date') .': '.$this->employeeShiftSchedule->shiftSchedule->date->toFormattedDateString())
            ->line(__('app.previous').' '.__('modules.attendance.shiftName') .': '. $this->employeeShiftSchedule->shiftSchedule->shift->shift_name)
            ->line(__('app.new').' '.__('modules.attendance.shiftName') .': '. $this->employeeShiftSchedule->shift->shift_name)
            ->action(__('email.shiftChange.action'), route('shifts-change.index'))
            ->line(__('email.thankyouNote'));
    }

    public function toArray()
    {
        return [
            'user_id' => $this->employeeShiftSchedule->shiftSchedule->user_id,
            'shift_id' => $this->employeeShiftSchedule->shiftSchedule->employee_shift_id,
            'new_shift_id' => $this->employeeShiftSchedule->employee_shift_id,
            'date' => $this->employeeShiftSchedule->shiftSchedule->date
        ];
    }

}
