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
use App\Helper\Reply;

trait LeadDashboard
{
	public function LeadDashboard()
	{
		if (request('mode') == 'today' && request()->ajax()) {
			$this->today_deadline_task_assigned_to_me = DB::table('task_users')
			->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
			->where('due_date', request('startDate'))
			->count();

			$this->today_deadline_task_assigned_by_me = Task::where('due_date', request('startDate'))->where('added_by',Auth::id())->count();
			
			$this->total_deadline_task_assigned_to_me = DB::table('task_users')
			->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
			->where('due_date', request('startDate'))
			->get();

			$this->total_deadline_task_assigned_by_me= Task::where('due_date', request('startDate'))->where('added_by',Auth::id())->get();

            $html = view('dashboard.ajax.leaddeveloper.today', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} elseif (request('mode') == 'month' && request()->ajax()) {
			$date = Carbon::createFromFormat('Y-m-d', request('startDate'));
            $startMonth = $date->startOfMonth()->addDays(20)->toDateString(); 
            $endMonth = $date->startOfMonth()->addMonth(1)->addDays(19)->toDateString(); 

			$this->total_not_started_projects= Project::where('status','not started')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_in_progress_projects= Project::where('status','in progress')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_under_review_projects= Project::where('status','under review')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_on_hold_projects= Project::where('status','on hold')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_canceled_projects= Project::where('status','canceled')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_finished_projects= Project::where('status','finished')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_to_do_tasks= Task::where('board_column_id',2)->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_doing_tasks= Task::where('board_column_id',3)->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_overdue_tasks= Task::whereBetween('due_date', [$startMonth, $endMonth])->where('status','incomplete')->whereBetween('created_at', [$startMonth, $endMonth])->count();
			$this->total_under_review_tasks= Task::where('board_column_id',6)->whereBetween('created_at', [$startMonth, $endMonth])->count();
		
			$this->total_rating = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->whereBetween('task_approves.created_at', [$startMonth, $endMonth])
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->first();

			$this->average = ($this->total_rating->avg_rating + $this->total_rating->avg_rating2 + $this->total_rating->avg_rating3) / 3;

			$this->negative_review = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->whereBetween('task_approves.created_at', [$startMonth, $endMonth])
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->groupBy('task_approves.id')
		    ->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 <= ?', [3])
		    ->count();

			$this->positive_review = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->whereBetween('task_approves.created_at', [$startMonth, $endMonth])
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->groupBy('task_approves.id')
		    ->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 > ?', [3])
		    ->count();

			$this->total_rating_assign_by_me = DB::table('tasks')
		    ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
		    ->where('tasks.added_by', Auth::id())
		    ->whereBetween('task_approves.created_at', [$startMonth, $endMonth])
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->first();

			$this->average_review_assign_by_me = ($this->total_rating_assign_by_me->avg_rating + $this->total_rating_assign_by_me->avg_rating2 + $this->total_rating_assign_by_me->avg_rating3) / 3;
			
			$this->total_deadline_task_assigned_to_me_period=DB::table('task_users')
			->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
			->whereBetween('due_date', [$startMonth, $endMonth])
			->orderBy('tasks.id','desc')
			->get();

			$this->total_deadline_task_assigned_by_me_period= Task::where('added_by',Auth::id())->whereBetween('due_date', [$startMonth, $endMonth])->orderBy('tasks.id','desc')->get();

			$html = view('dashboard.ajax.leaddeveloper.month', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} elseif (request('mode') == 'general' && request()->ajax()) {
			$startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
            $endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
            // dd($startDate, $endDate);
			$this->total_not_started_projects_general= Project::where('status','not started')->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_in_progress_projects_general= Project::where('status','in progress')->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_under_review_projects_general= Project::where('status','under review')->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_on_hold_projects_general= Project::where('status','on hold')->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_canceled_projects_general= Project::where('status','canceled')->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_finished_projects_general= Project::where('status','finished')->whereBetween('created_at', [$startDate, $endDate])->count();
			//dd($this->today_deadline_task_assigned_to_me);
			$this->total_to_do_tasks_general= Task::where('board_column_id',2)->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_doing_tasks_general= Task::where('board_column_id',3)->whereBetween('created_at', [$startDate, $endDate])->count();
			$this->total_overdue_tasks_general= Task::whereBetween('due_date', [$startDate, $endDate])->where('status','incomplete')->count();
			$this->total_under_review_tasks_general= Task::where('board_column_id',6)->whereBetween('created_at', [$startDate, $endDate])->count();

			$this->total_rating_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->whereBetween('task_approves.created_at', [$startDate, $endDate])
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->first();

			$this->average_general = ($this->total_rating_general->avg_rating + $this->total_rating_general->avg_rating2 + $this->total_rating_general->avg_rating3) / 3;

			$this->negative_review_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->whereBetween('task_approves.created_at', [$startDate, $endDate])
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->groupBy('task_approves.id')
			->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 <= ?', [3])
			->count();

			$this->positive_review_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->whereBetween('task_approves.created_at', [$startDate, $endDate])
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->groupBy('task_approves.id')
			->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 > ?', [3])
			->count();

			$this->total_rating_assign_by_me_general = DB::table('tasks')
			->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
			->where('tasks.added_by', Auth::id())
			->whereBetween('task_approves.created_at', [$startDate, $endDate])
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->first();

	 		$this->average_review_assign_by_me_general = ($this->total_rating_assign_by_me_general->avg_rating + $this->total_rating_assign_by_me_general->avg_rating2 + $this->total_rating_assign_by_me_general->avg_rating3) / 3;
	 
	 		$this->total_task_assigned_to_me_general=DB::table('task_users')
	 		->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
	 		->whereBetween('due_date', [$startDate, $endDate])
	 		->orderBy('tasks.id','desc')->get();

	 		$this->total_task_assigned_by_me_general= Task::where('added_by',Auth::id())->where('status','!=','completed')->whereBetween('due_date', [$startDate, $endDate])->orderBy('tasks.id','desc')->get();
	 		$html = view('dashboard.ajax.leaddeveloper.general', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} else {


			$this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
			$this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);

			$this->viewEventPermission = user()->permission('view_events');
		    $this->viewNoticePermission = user()->permission('view_notice');
		    $this->editTimelogPermission = user()->permission('edit_timelogs');
		    $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();

			//total task today start
			
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
			//total tasks today end


			// total task periodic data start

			$this->total_not_started_projects= Project::where('status','not started')->count();
			$this->total_in_progress_projects= Project::where('status','in progress')->count();
			$this->total_under_review_projects= Project::where('status','under review')->count();
			$this->total_on_hold_projects= Project::where('status','on hold')->count();
			$this->total_canceled_projects= Project::where('status','canceled')->count();
			$this->total_finished_projects= Project::where('status','finished')->count();
			//dd($this->today_deadline_task_assigned_to_me);
			$this->total_to_do_tasks= Task::where('board_column_id',2)->count();
			$this->total_doing_tasks= Task::where('board_column_id',3)->count();
			$this->total_overdue_tasks= Task::where('due_date','<',Carbon::today())->where('status','incomplete')->count();
			$this->total_under_review_tasks= Task::where('board_column_id',6)->count();
		
			$this->total_rating = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->first();

			$this->average = ($this->total_rating->avg_rating + $this->total_rating->avg_rating2 + $this->total_rating->avg_rating3) / 3;
			$this->negative_review = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->groupBy('task_approves.id')
		    ->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 <= ?', [3])
		    ->count();

			$this->positive_review = DB::table('task_users')
		    ->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
		    ->where('task_users.user_id', Auth::id())
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->groupBy('task_approves.id')
		    ->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 > ?', [3])
		    ->count();

			$this->total_rating_assign_by_me = DB::table('tasks')
		    ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
		    ->where('tasks.added_by', Auth::id())
		    ->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
		    ->first();

			$this->average_review_assign_by_me = ($this->total_rating_assign_by_me->avg_rating + $this->total_rating_assign_by_me->avg_rating2 + $this->total_rating_assign_by_me->avg_rating3) / 3;
			
			$this->total_deadline_task_assigned_to_me_period=DB::table('task_users')
			->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
			
		   
			->orderBy('tasks.id','desc')->where('tasks.status','!=','completed')->get();

			$this->total_deadline_task_assigned_by_me_period= Task::where('added_by',Auth::id())->orderBy('tasks.id','desc')->where('tasks.status','!=','completed')->get();

			// total tasks periodic data end


			// total tasks general view start 
			$this->total_not_started_projects_general= Project::where('status','not started')->count();
			$this->total_in_progress_projects_general= Project::where('status','in progress')->count();
			$this->total_under_review_projects_general= Project::where('status','under review')->count();
			$this->total_on_hold_projects_general= Project::where('status','on hold')->count();
			$this->total_canceled_projects_general= Project::where('status','canceled')->count();
			$this->total_finished_projects_general= Project::where('status','finished')->count();
			//dd($this->today_deadline_task_assigned_to_me);
			$this->total_to_do_tasks_general= Task::where('board_column_id',2)->count();
			$this->total_doing_tasks_general= Task::where('board_column_id',3)->count();
			$this->total_overdue_tasks_general= Task::where('due_date','<',Carbon::today())->where('status','incomplete')->count();
			$this->total_under_review_tasks_general= Task::where('board_column_id',6)->count();

			$this->total_rating_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->first();

			$this->average_general = ($this->total_rating_general->avg_rating + $this->total_rating_general->avg_rating2 + $this->total_rating_general->avg_rating3) / 3;

			$this->negative_review_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->groupBy('task_approves.id')
			->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 <= ?', [3])
			->count();

			$this->positive_review_general = DB::table('task_users')
			->join('task_approves', 'task_users.task_id', '=', 'task_approves.task_id')
			->where('task_users.user_id', Auth::id())
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->groupBy('task_approves.id')
			->havingRaw('(avg_rating + avg_rating2 + avg_rating3) / 3 > ?', [3])
			->count();

			$this->total_rating_assign_by_me_general = DB::table('tasks')
			->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
			->where('tasks.added_by', Auth::id())
			->selectRaw('AVG(task_approves.rating) as avg_rating, AVG(task_approves.rating2) as avg_rating2, AVG(task_approves.rating3) as avg_rating3')
			->first();

	 		$this->average_review_assign_by_me_general = ($this->total_rating_assign_by_me_general->avg_rating + $this->total_rating_assign_by_me_general->avg_rating2 + $this->total_rating_assign_by_me_general->avg_rating3) / 3;
	 
	 		$this->total_task_assigned_to_me_general=DB::table('task_users')
	 		->join('tasks', 'task_users.task_id', '=', 'tasks.id')->where('user_id',Auth::id())
	 		->orderBy('tasks.id','desc')->where('status','!=','completed')->get();

	 		$this->total_task_assigned_by_me_general= Task::where('added_by',Auth::id())->orderBy('tasks.id','desc')->where('status','!=','completed')->get();



	 		// total tasks general view end


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
}