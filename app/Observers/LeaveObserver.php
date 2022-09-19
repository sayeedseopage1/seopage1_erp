<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Leave;
use App\Services\Google;
use App\Events\LeaveEvent;
use App\Models\Notification;
use App\Models\GoogleCalendarModule;

class LeaveObserver
{

    public function saving(Leave $leave)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leave->last_updated_by = user()->id;
        }
    }

    public function creating(Leave $leave)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leave->added_by = user()->id;
        }
    }

    public function created(Leave $leave)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (request()->duration == 'multiple') {
                if (session()->has('leaves_duration')) {
                    event(new LeaveEvent($leave, 'created', request()->multi_date));
                }
            } else {
                event(new LeaveEvent($leave, 'created'));
            }

            /* Add google calendar event */
            if (!is_null($leave->leave_date) && !is_null($leave->user)) {
                $leave->event_id = $this->googleCalendarEvent($leave);
            }

        }
    }

    public function updating(Leave $leave)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($leave->isDirty('status')) {
                $leave->approved_by = user()->id;
                $leave->approved_at = now()->toDateTimeString();
            }
        }
    }

    public function updated(Leave $leave)
    {
        if (!isRunningInConsoleOrSeeding()) {

            if ($leave->isDirty('status')) {
                event(new LeaveEvent($leave, 'statusUpdated'));
                $leave->approved_by = user()->id;
                $leave->approved_at = now()->toDateTimeString();
            }
            else {
                event(new LeaveEvent($leave, 'updated'));
            }

            /* update google calendar event */
            if (!is_null($leave->leave_date) && !is_null($leave->user)) {
                $leave->event_id = $this->googleCalendarEvent($leave);
            }

        }
    }

    public function deleting(Leave $leave)
    {
        /* Start of deleting event from google calendar */
        $google = new Google();
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token )
        {
            $google->connectUsing($googleAccount->token);
            try {
                if ($leave->event_id) {
                    $google->service('Calendar')->events->delete('primary', $leave->event_id);
                }
            } catch (\Google\Service\Exception $error) {
                if(is_null($error->getErrors())) {
                    // Delete google calendar connection data i.e. token, name, google_id
                    $googleAccount->name = null;
                    $googleAccount->token = null;
                    $googleAccount->google_id = null;
                    $googleAccount->google_calendar_verification_status = 'non_verified';
                    $googleAccount->save();
                }
            }
        }

        $notifiData = ['App\Notifications\NewLeaveRequest', 'App\Notifications\LeaveApplication', 'App\Notifications\MultipleLeaveApplication',
        'App\Notifications\LeaveStatusApprove', 'App\Notifications\LeaveStatusUpdate', 'App\Notifications\LeaveStatusReject', 'App\Notifications\NewMultipleLeaveRequest'];
        Notification::whereIn('type', $notifiData)
            ->whereNull('read_at')
            ->where(function ($q) use ($leave) {
                $q->where('data', 'like', '{"id":'.$leave->id.',%');
                $q->orWhere('data', 'like', '%,"task_id":'.$leave->id.',%');
            })->delete();

        /* End of deleting event from google calendar */
    }

    protected function googleCalendarEvent($leave)
    {
        $module = GoogleCalendarModule::first();
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token && $module->leave_status == 1)
        {

            $google = new Google();
            $attendiesData = [];

            $user = User::where('id', $leave->user_id)->first();

            if ($user->google_calendar_status) {
                $attendiesData[] = ['email' => $user->email];
            }

            $description = $user->name.' '. __('app.leave');

            // Create event
            $google->connectUsing($googleAccount->token);

            $eventData = new \Google_Service_Calendar_Event(array(
                'summary' => $user->name,
                'location' => ' ',
                'description' => $description,
                'colorId' => 6,
                'start' => array(
                    'dateTime' => $leave->leave_date,
                    'timeZone' => $googleAccount->timezone,
                ),
                'end' => array(
                    'dateTime' => $leave->leave_date,
                    'timeZone' => $googleAccount->timezone,
                ),
                'attendees' => $attendiesData,
                'reminders' => array(
                    'useDefault' => false,
                    'overrides' => array(
                        array('method' => 'email', 'minutes' => 24 * 60),
                        array('method' => 'popup', 'minutes' => 10),
                    ),
                ),
            ));

            try {
                if ($leave->event_id) {
                    $results = $google->service('Calendar')->events->patch('primary', $leave->event_id, $eventData);
                }
                else {
                    $results = $google->service('Calendar')->events->insert('primary', $eventData);
                }

                return $results->id;
            }
            catch (\Google\Service\Exception $error) {
                if(is_null($error->getErrors())) {
                    // Delete google calendar connection data i.e. token, name, google_id
                    $googleAccount->name = null;
                    $googleAccount->token = null;
                    $googleAccount->google_id = null;
                    $googleAccount->google_calendar_verification_status = 'non_verified';
                    $googleAccount->save();
                }
            }
        }

        return $leave->event_id;
    }

}
