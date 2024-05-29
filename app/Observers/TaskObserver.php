<?php

namespace App\Observers;

use App\Events\TaskEvent;
use App\Events\TaskUpdated as EventsTaskUpdated;
use App\Http\Controllers\AccountBaseController;
use App\Models\GoogleCalendarModule;
use App\Models\Notification;
use App\Models\ProjectTimeLog;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskUser;
use App\Traits\ProjectProgress;
use App\Models\UniversalSearch;
use App\Models\User;
use Carbon\Carbon;
use App\Services\Google;

class TaskObserver
{

    use ProjectProgress;

    public function saving(Task $task)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $task->last_updated_by = user()->id;

            /* Add/Update google calendar event */
            if (!request()->has('repeat') || request()->repeat == 'no' && !is_null($task->due_date)) {
                $task->event_id = $this->googleCalendarEvent($task);
            }
        }
    }

    public function saved(Task $task)
    {
        /* Add/Update google calendar event */
        if (!request()->has('repeat') || request()->repeat == 'no' && !is_null($task->due_date)) {
            $this->googleCalendarEvent($task);
        }
    }

    public function creating(Task $task)
    {
        $task->hash = \Illuminate\Support\Str::random(32);

        if (!isRunningInConsoleOrSeeding()) {
            if (user()) {
                // $task->created_by = user()->id;
                // $task->added_by = user()->id;
            }

            if (request()->has('board_column_id')) {
                $task->board_column_id = request()->board_column_id;
            }
            else if (isset(global_setting()->default_task_status)) {
                $task->board_column_id = global_setting()->default_task_status;
            }
            else {
                $taskBoard = TaskboardColumn::where('slug', 'incomplete')->first();
                $task->board_column_id = $taskBoard->id;
            }
        }
    }

    public function created(Task $task)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (request()->has('project_id') && request()->project_id != 'all' && request()->project_id != '') {
                if ($task->project->client_id != null && $task->project->allow_client_notification == 'enable' && $task->project->client->status != 'deactive') {
                    event(new TaskEvent($task, $task->project->client, 'NewClientTask'));
                }
            }

            $log = new AccountBaseController();

            if (\user()) {
                $log->logTaskActivity($task->id, user()->id, 'createActivity', $task->board_column_id);
            }

            if ($task->project_id) {
                // Calculate project progress if enabled
                // $mainTask = Task::where('id', $task->dependent_task_id)->first();
                // $subTask = SubTask::where('id', $task->subtask_id)->first();
                // $assigned_to = User::find($subTask->assigned_to);
                // $text = 'Subtask ' .$task->heading. ' has been created against task ' . $mainTask->heading . ' and assigned to ' . $assigned_to->name;
                // $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
                // $log->logProjectActivity($task->project_id, $link);
                $this->calculateProjectProgress($task->project_id);
            }

            // Log search
            $log->logSearchEntry($task->id, $task->heading, 'tasks.edit', 'task');

            // Sync task users
            if (!empty(request()->user_id) && request()->template_id == '') {
                $task->users()->sync(request()->user_id);
            }

        }
    }

    // phpcs:ignore
    public function updated(Task $task)
    {
    //   /  dd($task);
        $movingTaskId = request()->has('movingTaskId'); // If task moved in taskboard

        if (!isRunningInConsoleOrSeeding()) {

            if ($task->isDirty('board_column_id')) {

                if ($task->boardColumn->slug == 'completed') {
                    // send task complete notification
                    $admins = User::allAdmins();
                    event(new TaskEvent($task, $admins, 'TaskCompleted'));

                    if (!is_null($task->added_by) && !in_array($task->added_by, $admins->pluck('id')->toArray())) {
                        event(new TaskEvent($task, $task->addedByUser, 'TaskCompleted'));
                    }

                    $taskUser = $task->users->whereNotIn('id', $admins->pluck('id'))->whereNotIn('id', [$task->added_by]);
                    event(new TaskEvent($task, $taskUser, 'TaskCompleted'));

                    $timeLogs = ProjectTimeLog::with('user')->whereNull('end_time')
                        ->where('task_id', $task->id)
                        ->get();

                    if ($timeLogs) {
                        foreach ($timeLogs as $timeLog) {

                            $timeLog->end_time = now();
                            $timeLog->edited_by_user = user()->id;
                            $timeLog->save();

                            /** @phpstan-ignore-next-line */
                            $timeLog->total_hours = ($timeLog->end_time->diff($timeLog->start_time)->format('%d') * 24) + ($timeLog->end_time->diff($timeLog->start_time)->format('%H'));

                            if ($timeLog->total_hours == 0) {
                                /** @phpstan-ignore-next-line */
                                $timeLog->total_hours = round(($timeLog->end_time->diff($timeLog->start_time)->format('%i') / 60), 2);
                            }

                            /** @phpstan-ignore-next-line */
                            $timeLog->total_minutes = ($timeLog->total_hours * 60) + ($timeLog->end_time->diff($timeLog->start_time)->format('%i'));

                            $timeLog->save();
                        }
                    }

                    if ((request()->project_id && request()->project_id != 'all') || (!is_null($task->project_id))) {
                        $project = $task->project;

                        if ($project->client_id != null && $project->allow_client_notification == 'enable' && $project->client->status != 'deactive') {
                            event(new TaskEvent($task, $project->client, 'TaskCompletedClient'));
                        }
                    }
                }
            }

            if (request('user_id')) {
                if (($movingTaskId != '' && $task->id == $movingTaskId) || $movingTaskId == '') {
                    // Send notification to user
                    event(new TaskEvent($task, $task->users, 'TaskUpdated'));

                    if ((request()->project_id != 'all') && !is_null($task->project)) {
                        if ($task->project->client_id != null && $task->project->allow_client_notification == 'enable' && $task->project->client->status != 'deactive') {
                            event(new TaskEvent($task, $task->project->client, 'TaskUpdatedClient'));
                        }
                    }
                }
            }
        }

        /* Add/Update google calendar event */
        if (!request()->has('repeat') || request()->repeat == 'no' && !is_null($task->due_date)) {
            $task->event_id = $this->googleCalendarEvent($task);
        }

        event(new EventsTaskUpdated($task));

        if (\user()) {
            if (($movingTaskId != '' && $task->id == $movingTaskId) || $movingTaskId == '') {
                $log = new AccountBaseController();
                $log->logTaskActivity($task->id, user()->id, 'statusActivity', $task->board_column_id);
            }
        }

        if ($task->project_id) {
            if (($movingTaskId != '' && $task->id == $movingTaskId) || $movingTaskId == '') {
                // Calculate project progress if enabled
                $this->calculateProjectProgress($task->project_id);
            }
        }
    }

    public function deleting(Task $task)
    {
        $universalSearches = UniversalSearch::where('searchable_id', $task->id)->where('module_type', 'task')->get();

        if ($universalSearches) {
            foreach ($universalSearches as $universalSearch) {
                UniversalSearch::destroy($universalSearch->id);
            }
        }

        $notifyData = ['App\Notifications\NewTask', 'App\Notifications\TaskUpdated', 'App\Notifications\TaskComment',
        'App\Notifications\TaskCommentClient', 'App\Notifications\TaskCompleted', 'App\Notifications\NewClientTask','App\Notifications\TaskCompletedClient','App\Notifications\TaskNote','App\Notifications\TaskNoteClient','App\Notifications\TaskReminder','App\Notifications\TaskUpdatedClient','App\Notifications\SubTaskCreated','App\Notifications\SubTaskCompleted'];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where(function ($q) use ($task) {
                $q->where('data', 'like', '{"id":'.$task->id.',%');
                $q->orWhere('data', 'like', '%,"task_id":'.$task->id.',%');
            })->delete();

        /* Start of deleting event from google calendar */
        $google = new Google();
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token )
        {
            $google->connectUsing($googleAccount->token);
            try {
                if ($task->event_id) {
                    $google->service('Calendar')->events->delete('primary', $task->event_id);
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

        /* End of deleting event from google calendar */
    }

    /**
     * @param Task $task
     */
    public function deleted(Task $task)
    {
        if (!is_null($task->project_id)) {
            // Calculate project progress if enabled
            $this->calculateProjectProgress($task->project_id);
        }
    }

    protected function googleCalendarEvent($event)
    {
        $module = GoogleCalendarModule::first();
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token && $module->task_status == 1)
        {

            $google = new Google();
            $attendiesData = [];

            $attendees = TaskUser::with(['user'])->whereHas('user', function($query){
                $query->where('status', 'active')->where('google_calendar_status', true);
            })->where('task_id', $event->id)->get();

            foreach($attendees as $attend){
                if(!is_null($attend->user) && !is_null($attend->user->email))
                {
                    $attendiesData[] = ['email' => $attend->user->email];
                }
            }

            // Create event
            $google = $google->connectUsing($googleAccount->token);

            $eventData = new \Google_Service_Calendar_Event(array(
                'summary' => $event->heading,
                'location' => $googleAccount->address,
                'description' => $event->description,
                'colorId' => 7,
                'start' => array(
                    'dateTime' => $event->start_date,
                    'timeZone' => $googleAccount->timezone,
                ),
                'end' => array(
                    'dateTime' => $event->due_date,
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
                if ($event->event_id) {
                    $results = $google->service('Calendar')->events->patch('primary', $event->event_id, $eventData);
                }
                else {
                    $results = $google->service('Calendar')->events->insert('primary', $eventData);
                }

                return $results->id;
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

        return $event->event_id;
    }

    // Google calendar for multiple events
    protected function googleCalendarEventMulti($eventIds)
    {
        $googleAccount = global_setting();

        if ($googleAccount->google_calendar_status == 'active' && $googleAccount->google_calendar_verification_status == 'verified' && $googleAccount->token )
        {
            $google = new Google();
            $events = Task::whereIn('id', $eventIds)->get();
            $event = $events->first();

            $frq = ['day' => 'DAILY', 'week' => 'WEEKLY', 'month', 'MONTHLY','year' => 'YEARLY'];
            $frequency = $frq[$event->repeat_type];

            $eventData = new \Google_Service_Calendar_Event();
            $eventData->setSummary($event->heading);
            $eventData->setLocation('');

            $start = new \Google_Service_Calendar_EventDateTime();
            $start->setDateTime($event->start_date->toAtomString());
            $start->setTimeZone($googleAccount->timezone);

            $eventData->setStart($start);
            $end = new \Google_Service_Calendar_EventDateTime();
            $end->setDateTime($event->due_date->toAtomString());
            $end->setTimeZone($googleAccount->timezone);

            $eventData->setEnd($end);
            /** @phpstan-ignore-next-line */
            $eventData->setRecurrence(array('RRULE:FREQ='.$frequency.';INTERVAL='.$event->repeat_every.';COUNT='.$event->repeat_cycles.';'));

            $attendees = TaskUser::with(['user'])->whereHas('user', function($query){
                $query->where('status', 'active')->where('google_calendar_status', true);
            })->where('task_id', $event->id)->get();

            $attendiesData = [];

            foreach($attendees as $attend) {
                if(!is_null($attend->user) && !is_null($attend->user->email))
                {
                    $attendee1 = new \Google_Service_Calendar_EventAttendee();
                    $attendee1->setEmail($attend->user->email);
                    $attendiesData[] = $attendee1;
                }
            }

            /** @phpstan-ignore-next-line */
            $eventData->attendees = $attendiesData;

            // Create event
            $google->connectUsing($googleAccount->token);

            try {
                if ($event->event_id) {
                    $results = $google->service('Calendar')->events->patch('primary', $event->event_id, $eventData);
                }
                else {
                    $results = $google->service('Calendar')->events->insert('primary', $eventData);
                }

                foreach($events as $event){
                    $event->event_id = $results->id;
                    $event->save();
                }

                return;
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

            foreach($events as $event){
                $event->event_id = $event->event_id;
                $event->save();
            }

            return;
        }
    }

}
