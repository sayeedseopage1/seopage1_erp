<?php

namespace App\Traits;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\DashboardWidget;
use DB;
use Auth;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\Project;

trait LeadDashboard
{
	public function LeadDashboard()
	{
		$this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
		$this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);

		$this->viewEventPermission = user()->permission('view_events');
	    $this->viewNoticePermission = user()->permission('view_notice');
	    $this->editTimelogPermission = user()->permission('edit_timelogs');
	    $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
		
		$this->today_deadline_task_assigned_to_me=DB::table('task_users')
		->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
		->where('due_date',Carbon::today())
	   
		->count();
		$this->today_deadline_task_assigned_by_me= Task::where('due_date',Carbon::today())->where('added_by',Auth::id())->count();
		$this->total_deadline_task_assigned_to_me=DB::table('task_users')
		->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
		->where('due_date',Carbon::today())
	   
		->get();
		$this->total_deadline_task_assigned_by_me= Task::where('due_date',Carbon::today())->where('added_by',Auth::id())->get();

		$this->total_not_started_projects= Project::where('status','not started')->count();
		$this->total_in_progress_projects= Project::where('status','in progress')->count();
		$this->total_under_review_projects= Project::where('status','under review')->count();
		$this->total_on_hold_projects= Project::where('status','on hold')->count();
		$this->total_canceled_projects= Project::where('status','canceled')->count();
		$this->total_finished_projects= Project::where('status','finished')->count();
//dd($this->today_deadline_task_assigned_to_me);
	    $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
	        return $value->status == '1';
	    })->pluck('widget_name')->toArray();
	    // Getting Attendance setting data

	    if (request('start') && request('end') && !is_null($this->viewEventPermission) && $this->viewEventPermission != 'none') {
	        $eventData = array();

	        $events = Event::with('attendee', 'attendee.user');

	        if ($this->viewEventPermission == 'added') {
	            $events->where('events.added_by', $this->user->id);
	        }
	        elseif ($this->viewEventPermission == 'owned' || $this->viewEventPermission == 'both') {
	            $events->where('events.added_by', $this->user->id)
	            ->orWhere(function ($q) {
	                $q->whereHas('attendee.user', function ($query) {
	                    $query->where('user_id', $this->user->id);
	                });
	            });
	        }

	        $events = $events->get();

	        foreach ($events as $key => $event) {
	            $eventData[] = [
	                'id' => $event->id,
	                'title' => ucfirst($event->event_name),
	                'start' => $event->start_date_time,
	                'end' => $event->end_date_time,
	                'extendedProps' => ['bg_color' => $event->label_color, 'color' => '#fff'],
	            ];
	        }

	        return $eventData;
	    }

	    $this->checkTodayLeave = Leave::where('status', 'approved')
	    ->select('id')
	    ->where('leave_date', now(global_setting()->timezone)->toDateString())
	    ->where('user_id', user()->id)
	    ->where('duration', '<>', 'half day')
	    ->first();
	    $currentDate = now(global_setting()->timezone)->format('Y-m-d');
	    $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();

	    $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
	    
	    if (request()->ajax()) {
	        $html = view('dashboard.ajax.lead', $this->data)->render();
	        
	        return Reply::dataOnly([
	        	'status' => 'success', 
	        	'html' => $html, 
	        	'title' => $this->pageTitle
	        ]);
	    }else {
	        return view('dashboard.employee.lead', $this->data);
	    }
	}
}