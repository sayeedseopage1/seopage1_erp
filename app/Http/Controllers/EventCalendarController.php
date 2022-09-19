<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Helper\Reply;
use App\Models\Event;
use App\Models\Leave;
use App\Models\Ticket;
use App\Models\Holiday;
use App\Models\EventAttendee;
use App\Models\EmployeeDetails;
use App\Events\EventInviteEvent;
use App\Http\Requests\Events\StoreEvent;
use App\Http\Requests\Events\UpdateEvent;
use App\Models\TaskboardColumn;

class EventCalendarController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.Events';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('events', $this->user->modules));
            return $next($request);
        });
    }

    public function index()
    {
        $viewPermission = user()->permission('view_events');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (in_array('client', user_roles())) {
            $this->clients = User::client();
        }
        else {
            $this->clients = User::allClients();
            $this->employees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
        }

        if (request('start') && request('end')) {
            $model = Event::with('attendee', 'attendee.user');

            if (request()->clientId && request()->clientId != 'all') {
                $clientId = request()->clientId;
                $model->whereHas('attendee.user', function ($query) use ($clientId) {
                    $query->where('user_id', $clientId);
                });
            }

            if (request()->employeeId && request()->employeeId != 'all' && request()->employeeId != 'undefined') {
                $employeeId = request()->employeeId;
                $model->whereHas('attendee.user', function ($query) use ($employeeId) {
                    $query->where('user_id', $employeeId);
                });
            }

            if (request()->searchText && request()->searchText != 'all') {
                $model->where('event_name', 'like', '%' . request('searchText') . '%');
            }

            if ($viewPermission == 'added') {
                $model->where('added_by', user()->id);
            }

            if ($viewPermission == 'owned') {
                $model->whereHas('attendee.user', function ($query) {
                    $query->where('user_id', user()->id);
                });
            }

            if (in_array('client', user_roles())) {
                $model->whereHas('attendee.user', function ($query) {
                    $query->where('user_id', user()->id);
                });
            }

            if ($viewPermission == 'both') {
                $model->where('added_by', user()->id);
                $model->orWhereHas('attendee.user', function ($query) {
                    $query->where('user_id', user()->id);
                });
            }

            $events = $model->get();

            $eventData = array();

            foreach ($events as $key => $event) {
                $eventData[] = [
                    'id' => $event->id,
                    'title' => ucfirst($event->event_name),
                    'start' => $event->start_date_time,
                    'end' => $event->end_date_time,
                    'extendedProps' => ['bg_color' => $event->label_color, 'color' => '#fff']
                ];
            }

            return $eventData;
        }

        return view('event-calendar.index', $this->data);

    }

    public function create()
    {
        $addPermission = user()->permission('add_events');
        abort_403(!in_array($addPermission, ['all', 'added']));

        $this->employees = User::allEmployees(null, true);
        $this->clients = User::allClients();
        $this->pageTitle = __('modules.events.addEvent');

        if (request()->ajax()) {
            $html = view('event-calendar.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'event-calendar.ajax.create';
        return view('event-calendar.create', $this->data);
    }

    public function store(StoreEvent $request)
    {
        $addPermission = user()->permission('add_events');
        abort_403(!in_array($addPermission, ['all', 'added']));

        $event = new Event();
        $event->event_name = $request->event_name;
        $event->where = $request->where;
        $event->description = str_replace('<p><br></p>', '', trim($request->description));

        $start_date_time = Carbon::createFromFormat($this->global->date_format, $request->start_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->start_time)->format('H:i:s');
        $event->start_date_time = Carbon::parse($start_date_time)->setTimezone('UTC');

        $end_date_time = Carbon::createFromFormat($this->global->date_format, $request->end_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->end_time)->format('H:i:s');
        $event->end_date_time = Carbon::parse($end_date_time)->setTimezone('UTC');

        $event->repeat = $request->repeat ? $request->repeat : 'no';
        $event->send_reminder = $request->send_reminder ? $request->send_reminder : 'no';
        $event->repeat_every = $request->repeat_count;
        $event->repeat_cycles = $request->repeat_cycles;
        $event->repeat_type = $request->repeat_type;
        $event->remind_time = $request->remind_time;
        $event->remind_type = $request->remind_type;
        $event->label_color = $request->label_color;
        $event->event_link = $request->event_link;
        $event->save();

        if ($request->all_employees) {
            $attendees = User::allEmployees(null, true);

            foreach ($attendees as $attendee) {
                EventAttendee::create(['user_id' => $attendee->id, 'event_id' => $event->id]);
            }

            event(new EventInviteEvent($event, $attendees));
        }

        if ($request->user_id) {
            foreach ($request->user_id as $userId) {
                EventAttendee::firstOrCreate(['user_id' => $userId, 'event_id' => $event->id]);
            }

            $attendees = User::whereIn('id', $request->user_id)->get();
            event(new EventInviteEvent($event, $attendees));
        }

        // Add repeated event
        if ($request->has('repeat') && $request->repeat == 'yes') {
            $repeatCount = $request->repeat_count;
            $repeatType = $request->repeat_type;
            $repeatCycles = $request->repeat_cycles;
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->start_date);
            $dueDate = Carbon::createFromFormat($this->global->date_format, $request->end_date);

            for ($i = 1; $i < $repeatCycles; $i++) {
                $startDate = $startDate->add($repeatCount, str_plural($repeatType));
                $dueDate = $dueDate->add($repeatCount, str_plural($repeatType));

                $event = new Event();
                $event->event_name = $request->event_name;
                $event->where = $request->where;
                $event->description = str_replace('<p><br></p>', '', trim($request->description));
                $event->start_date_time = $startDate->format('Y-m-d') . '' . Carbon::parse($request->start_time)->format('H:i:s');
                $event->end_date_time = $dueDate->format('Y-m-d') . ' ' . Carbon::parse($request->end_time)->format('H:i:s');

                if ($request->repeat) {
                    $event->repeat = $request->repeat;
                }
                else {
                    $event->repeat = 'no';
                }

                if ($request->send_reminder) {
                    $event->send_reminder = $request->send_reminder;
                }
                else {
                    $event->send_reminder = 'no';
                }

                $event->repeat_every = $request->repeat_count;
                $event->repeat_cycles = $request->repeat_cycles;
                $event->repeat_type = $request->repeat_type;

                $event->remind_time = $request->remind_time;
                $event->remind_type = $request->remind_type;

                $event->label_color = $request->label_color;
                $event->save();

                if ($request->all_employees) {
                    $attendees = User::allEmployees(null, true);

                    foreach ($attendees as $attendee) {
                        EventAttendee::create(['user_id' => $attendee->id, 'event_id' => $event->id]);
                    }
                }

                if ($request->user_id) {
                    foreach ($request->user_id as $userId) {
                        EventAttendee::firstOrCreate(['user_id' => $userId, 'event_id' => $event->id]);
                    }
                }
            }
        }

        return Reply::successWithData(__('messages.eventCreateSuccess'), ['redirectUrl' => route('events.index'), 'eventId' => $event->id]);

    }

    public function edit($id)
    {
        $this->event = Event::with('attendee', 'attendee.user', 'files')->findOrFail($id);
        $this->editPermission = user()->permission('edit_events');
        $attendeesIds = $this->event->attendee->pluck('user_id')->toArray();

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && $this->event->added_by == user()->id)
            || ($this->editPermission == 'owned' && in_array(user()->id, $attendeesIds))
            || ($this->editPermission == 'both' && (in_array(user()->id, $attendeesIds) || $this->event->added_by == user()->id))
        ));

        $this->pageTitle = __('app.edit') . ' ' . __('app.menu.Events');

        $this->employees = User::allEmployees();
        $this->clients = User::allClients();


        $attendeeArray = [];

        foreach ($this->event->attendee as $key => $item) {
            $attendeeArray[] = $item->user_id;
        }

        $this->attendeeArray = $attendeeArray;

        if (request()->ajax()) {
            $html = view('event-calendar.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'event-calendar.ajax.edit';

        return view('notices.create', $this->data);

    }

    public function update(UpdateEvent $request, $id)
    {
        $this->editPermission = user()->permission('edit_events');
        $event = Event::findOrFail($id);
        $attendeesIds = $event->attendee->pluck('user_id')->toArray();

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && $event->added_by == user()->id)
            || ($this->editPermission == 'owned' && in_array(user()->id, $attendeesIds))
            || ($this->editPermission == 'both' && (in_array(user()->id, $attendeesIds) || $event->added_by == user()->id))
        ));

        $event->event_name = $request->event_name;
        $event->where = $request->where;
        $event->description = str_replace('<p><br></p>', '', trim($request->description));
        $event->start_date_time = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->start_time)->format('H:i:s');
        $event->end_date_time = Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->end_time)->format('H:i:s');

        if ($request->repeat) {
            $event->repeat = $request->repeat;
        }
        else {
            $event->repeat = 'no';
        }

        if ($request->send_reminder) {
            $event->send_reminder = $request->send_reminder;
        }
        else {
            $event->send_reminder = 'no';
        }

        $event->repeat_every = $request->repeat_count;
        $event->repeat_cycles = $request->repeat_cycles;
        $event->repeat_type = $request->repeat_type;

        $event->remind_time = $request->remind_time;
        $event->remind_type = $request->remind_type;

        $event->label_color = $request->label_color;
        $event->event_link = $request->event_link;
        $event->save();

        if ($request->all_employees) {
            $attendees = User::allEmployees();

            foreach ($attendees as $attendee) {
                $checkExists = EventAttendee::where('user_id', $attendee->id)->where('event_id', $event->id)->first();

                if (!$checkExists) {
                    EventAttendee::create(['user_id' => $attendee->id, 'event_id' => $event->id]);

                    // Send notification to user
                    $notifyUser = User::withoutGlobalScope('active')->findOrFail($attendee->id);
                    event(new EventInviteEvent($event, $notifyUser));
                }
            }
        }

        if ($request->user_id) {
            foreach ($request->user_id as $userId) {
                $checkExists = EventAttendee::where('user_id', $userId)->where('event_id', $event->id)->first();

                if (!$checkExists) {
                    EventAttendee::create(['user_id' => $userId, 'event_id' => $event->id]);

                    // Send notification to user
                    $notifyUser = User::withoutGlobalScope('active')->findOrFail($userId);
                    event(new EventInviteEvent($event, $notifyUser));
                }
            }
        }

        return Reply::successWithData(__('messages.eventCreateSuccess'), ['redirectUrl' => route('events.index')]);

    }

    public function show($id)
    {
        $this->viewPermission = user()->permission('view_events');
        $this->event = Event::with('attendee', 'attendee.user')->findOrFail($id);
        $attendeesIds = $this->event->attendee->pluck('user_id')->toArray();

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->event->added_by == user()->id)
            || ($this->viewPermission == 'owned' && in_array(user()->id, $attendeesIds))
            || ($this->viewPermission == 'both' && (in_array(user()->id, $attendeesIds) || $this->event->added_by == user()->id))
        ));


        $this->pageTitle = __('app.menu.Events') . ' ' . __('app.details');

        if (request()->ajax()) {
            $html = view('event-calendar.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'event-calendar.ajax.show';

        return view('event-calendar.create', $this->data);

    }

    public function destroy($id)
    {
        $this->deletePermission = user()->permission('delete_events');
        $event = Event::with('attendee', 'attendee.user')->findOrFail($id);
        $attendeesIds = $event->attendee->pluck('user_id')->toArray();

        abort_403(!($this->deletePermission == 'all'
        || ($this->deletePermission == 'added' && $event->added_by == user()->id)
        || ($this->deletePermission == 'owned' && in_array(user()->id, $attendeesIds))
        || ($this->deletePermission == 'both' && (in_array(user()->id, $attendeesIds) || $event->added_by == user()->id))
        ));

        Event::destroy($id);
        return Reply::successWithData(__('messages.eventDeleteSuccess'), ['redirectUrl' => route('events.index')]);

    }

}
