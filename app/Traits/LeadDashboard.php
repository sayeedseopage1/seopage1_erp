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
use App\Models\AttendanceSetting;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Role;
use App\Models\TaskRevision;



use Carbon\CarbonPeriod;

trait LeadDashboard
{
	public function LeadDashboard()
	{
        $this->viewEventPermission = user()->permission('view_events');
        $this->viewNoticePermission = user()->permission('view_notice');
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $currentDate = now(global_setting()->timezone)->format('Y-m-d');
    $this->checkTodayLeave = Leave::where('status', 'approved')
    ->select('id')
    ->where('leave_date', now(global_setting()->timezone)->toDateString())
    ->where('user_id', user()->id)
    ->where('duration', '<>', 'half day')
    ->first();
    $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();
    $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
    ->where('user_id', user()->id)
    ->whereNull('end_time')
    ->first();
 
    $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
    $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
        return $value->status == '1';
    })->pluck('widget_name')->toArray();
    
  
    $now = now(global_setting()->timezone);
    $showClockIn = AttendanceSetting::first();

    $this->attendanceSettings = $this->attendanceShift($showClockIn);
    $currentWeekDates = [];
    $weekShifts = [];
    $this->currentWeekDates = $currentWeekDates;
    $this->weekShifts = $weekShifts;
    $this->showClockIn = $showClockIn->show_clock_in_button;
    $this->weekStartDate = $now->copy()->startOfWeek($showClockIn->week_start_from);
    $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
    $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6));
    $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
    $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
    $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);
    $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs(now()->toDateString(), user()->id);
    $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak(now()->toDateString(), user()->id);

    $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
    $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);  
    
    if (request()->ajax())
        {
        // /   dd(request('startDate'),request('endDate'),request('user_id'));

        $devId = request('user_id');
        // $this->username = DB::table('users')->where('id',$devId)->value('name');
        $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
        $endDate1 = request('endDate');
        $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');
      
        $this->startDate1 = Carbon::parse($startDate);
        $this->endDate1 = Carbon::parse($endDate1);
        $user_role = DB::table('users')->select('role_id')->where('id', $devId)->first();
      //  dd($startDate, $endDate);

    
    
            $this->username_lead = DB::table('users')->where('id', $devId)->value('name');
        
            $this->number_of_tasks_received_lead = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
                $this->number_of_tasks_received_lead_data = DB::table('tasks')
                ->select('tasks.id','tasks.heading','client.id as clientId','client.name as clientName','tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date','tasks.due_date','tasks.client_name as client_name','cl.id as cl_id','cl.name as cl_name',
                'tasks.board_column_id','taskboard_columns.column_name as column_name', 'taskboard_columns.label_color'
                //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects','projects.id','tasks.project_id')
                ->leftJoin('users as client','client.id','projects.client_id')
                ->leftJoin('users as cl','cl.id','tasks.client_id')
                ->leftJoin('task_submissions','task_submissions.task_id','tasks.id')
                ->where('tasks.created_at','>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
                foreach($this->number_of_tasks_received_lead_data as $row)
                {
                    $row->revision_count = TaskRevision::where('task_id',$row->id)->where('final_responsible_person','!=', null)->count();
                }
            // $this->submit_number_of_tasks_for_this_month_lead = DB::table('task_submissions')
            // ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            // ->where('task_submissions.created_at', '>=', $startDate)
            // ->where('task_submissions.created_at', '<', $endDate)
            // ->where('tasks.created_at', '>=', $startDate)
            // ->where('tasks.created_at', '<', $endDate)
            // ->where('task_submissions.user_id', $devId)
            // ->where('task_submissions.submission_no', '=', 1)
            // ->distinct('task_submissions.created_at')
            // ->distinct('tasks.id')
            // ->count();

            $this->submit_number_of_tasks_in_this_month_lead = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
          //  ->where('task_submissions.submission_no', '=', 1)
          ->whereNotIn('tasks.board_column_id',[1,2,3])
            ->distinct('task_submissions.created_at')
            ->distinct('tasks.id')
            ->count();
            $this->submit_number_of_tasks_in_this_month_lead_data = DB::table('task_submissions')
                ->select('tasks.id','tasks.heading','client.id as clientId','client.name as clientName','tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date','tasks.due_date','tasks.client_name as client_name','cl.id as cl_id','cl.name as cl_name',
                'tasks.board_column_id','taskboard_columns.column_name as column_name', 'taskboard_columns.label_color'
                //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects','projects.id','tasks.project_id')
                ->leftJoin('users as client','client.id','projects.client_id')
                ->leftJoin('users as cl','cl.id','tasks.client_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->groupBy('tasks.id')
                ->get();
                foreach($this->submit_number_of_tasks_in_this_month_lead_data as $row)
                {
                    $row->revision_count = TaskRevision::where('task_id',$row->id)->where('final_responsible_person','!=', null)->count();
                }


            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $first_attempt_approve_task = 0;
            foreach ($number_of_tasks_approved as $task) {



                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task++;
                }
            }
          
            $this->first_attempt_approve_task_in_this_month_client_lead = $first_attempt_approve_task;

          

            //-----------------------------number of tasks approved in first attempt(in cycle) PM-----------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $first_attempt_approve_task = 0;
            foreach ($number_of_tasks_approved as $task) {

                $min_approve_date = DB::table('task_approves')
                    ->select('task_approves.created_at')
                    ->where('task_approves.task_id', $task->id)
                    ->orderBy('task_approves.created_at', 'asc')
                    ->first();

                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task++;
                }
            }

            $this->first_attempt_approve_task_in_this_month_lead = $first_attempt_approve_task;


       
   
    


        // --------------Average number of attempts needed for approval(in cycle) Project Manager-----------------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task = 0;
        $count_submission_per_approval = 0;
        $total_approval = 0;
        foreach ($number_of_tasks_approved as $task) {

            $min_approve_date = DB::table('task_approves')
            ->select('task_approves.created_at')
            ->where('task_approves.task_id', $task->id)
            ->orderBy('task_approves.created_at', 'asc')
            ->first();

            $number_of_tasks = DB::table('task_submissions')
            ->select('task_submissions.submission_no')
            ->where('task_submissions.task_id', $task->id)
                ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                ->distinct('task_submissions.created_at')
                ->orderBy('task_submissions.id', 'DESC')
                ->first();
            $max_submission = $number_of_tasks->submission_no;
            $count_submission_per_approval = $count_submission_per_approval + $max_submission;
            $total_approval++;
        }
        if ($total_approval > 0) {
            $this->average_submission_aproval_in_this_month_lead = $count_submission_per_approval / $total_approval;
        } else {
            $this->average_submission_aproval_in_this_month_lead = 0;
        }

       


        // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('tasks.board_column_id', '=', 4)
        ->where('tasks.updated_at', '>=', $startDate)
        ->where('tasks.updated_at', '<', $endDate)
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task = 0;
        $count_submission_per_approval = 0;
        $total_approval = 0;
        foreach ($number_of_tasks_approved as $task) {



            $number_of_tasks = DB::table('task_submissions')
            ->select('task_submissions.submission_no')
            ->where('task_submissions.task_id', $task->id)
                ->distinct('task_submissions.created_at')
                ->orderBy('task_submissions.id', 'DESC')
                ->first();
            $max_submission = $number_of_tasks->submission_no;
            $count_submission_per_approval = $count_submission_per_approval + $max_submission;
            $total_approval++;
        }
        if ($total_approval > 0) {
            $this->average_submission_aproval_in_this_month_client_lead = $count_submission_per_approval / $total_approval;
        } else {
            $this->average_submission_aproval_in_this_month_client_lead = 0;
        }

       
        //---------------------------------Percentage of Revision----------------------------------------------------//

        $total_task_assigned = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();

        $assign_task_count_for_revision = 0;
        $number_of_total_revision_for_this_month = 0;
        foreach ($total_task_assigned as $task) {

            $current_task_id = $task->id;
            $disput_responsible_for_revision = DB::table('task_revision_disputes')
            ->where('task_id', $current_task_id)
                ->where(function ($query) use ($current_task_id, $devId) {
                    $query->where('raised_by', $devId)
                    ->orWhere('raised_against', $devId);
                })
                ->where(function ($query) {
                    $query->where('raised_by_percent', '>', 0)
                    ->orWhere('raised_against_percent', '>', 0);
                })

                ->count();

            if ($disput_responsible_for_revision > 0) {
                $disput_responsible_for_revision = 1;
            } // one task for count one revision
            $responsible_for_revision = DB::table('task_revisions')
            ->where('task_id', $current_task_id)
                ->where('final_responsible_person', 'LD')
                ->count();

            if ($responsible_for_revision > 0) {
                $responsible_for_revision = 1;
            }  // one task for count one revision

            $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

            $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

            //count of assign tasks
            $assign_task_count_for_revision++;
        }

        $percentage_of_tasks_with_revision = 0;
        if ($assign_task_count_for_revision > 0) {
            $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
        }
        $this->percentage_of_tasks_with_revision_lead = $percentage_of_tasks_with_revision;
        $this->assign_task_count_for_revision_lead = $assign_task_count_for_revision;
        $this->number_of_total_revision_for_this_month_lead = $number_of_total_revision_for_this_month;

        //------------------------------average Submission Time(Day)----------------------------------------------//

    

        //in this month

        $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
        ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
        ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->where('task_submissions.created_at', '>=', $startDate)
        ->where('task_submissions.created_at', '<', $endDate)
        ->where('task_submissions.user_id', $devId)
        ->where('task_submissions.submission_no', '=', 1)
        ->distinct('task_submissions.created_at')
        ->get();

        $sum_of_total_duration = 0;
        $count_of_submission_task = 0;
        foreach ($submit_number_of_tasks_in_this_month_data as $task) {
            $sum_of_total_duration = $sum_of_total_duration + $task->total_duration;
            $count_of_submission_task++;
        }

        $average_submission_day_in_this_month = 0;

        if ($count_of_submission_task > 0) {
            $average_submission_day_in_this_month = $sum_of_total_duration / $count_of_submission_task;
        }

        $this->average_submission_day_in_this_month_lead = $average_submission_day_in_this_month;

        //-----------Percentage of tasks where deadline was missed -----------------//

        $currentDate = Carbon::now()->format('Y-m-d');

        $number_of_tasks_received_for_deadline = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->count();

        $number_of_tasks_received_for_deadline_data = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.*')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();

        $number_of_tasks_cross_deadline = 0;
        $percentage_of_tasks_deadline = 0;
        foreach ($number_of_tasks_received_for_deadline_data as $task) {
            $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');

            $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');

            if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                $number_of_tasks_cross_deadline++;
            } else if ($dueDate < $currentDate && $task->board_column_id != 4) {

                $number_of_tasks_cross_deadline++;
            }
        }

        $this->number_of_tasks_cross_deadline_lead = $number_of_tasks_cross_deadline;

        if ($number_of_tasks_received_for_deadline > 0) {
            $percentage_of_tasks_deadline = ($number_of_tasks_cross_deadline / $number_of_tasks_received_for_deadline) * 100;
        }

        $this->percentage_of_tasks_deadline_lead = $percentage_of_tasks_deadline;

        //Number of disputes filed

        $this->number_of_dispute_filed_own_lead = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId);
        })
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();

        $this->number_of_dispute_filed_all_lead = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();

        // Number of disputes lost
        $this->number_of_dispute_lost_own_lead = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId);
        })
        ->where('winner', '!=', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->count();

        $this->number_of_dispute_lost_all_lead = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
            ->where('winner', '!=', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();

        // Average number of in-progress tasks

        $total_in_progress_date_range = DB::table('progress_tasks')
        ->where('user_id', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->groupBy('user_id')
        ->sum('count_progress_task');

        $startDateString = request('startDate');
        $endDateString = request('endDate');

        $startDate4 = Carbon::parse($startDateString);
        $endDate4 = Carbon::parse($endDateString);

        $differenceInDays = (int) $endDate4->diffInDays($startDate4);

        $differenceInDays = $differenceInDays + 1;
        $this->average_in_progress_date_range_lead = $total_in_progress_date_range / $differenceInDays;

        //Spent time in revision

        $total_task_assigned = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $total_spent_revision_developer=0;
        foreach ($total_task_assigned as $task) {
            $current_task_id = $task->id;
            $disput_responsible_for_revision = DB::table('task_revision_disputes')
            ->where('task_id', $current_task_id)
            ->where(function ($query) use ($current_task_id, $devId) {
                    $query->where('raised_by', $devId)
                    ->orWhere('raised_against', $devId);
                })
                ->where(function ($query) {
                    $query->where('raised_by_percent', '>', 0)
                    ->orWhere('raised_against_percent', '>', 0);
                })

                ->count();

            if ($disput_responsible_for_revision > 0) {
                 $get_sub_task = DB::table('sub_tasks')
                 ->select('id')
                 ->where('task_id', $current_task_id)
                 ->get();

                if ($get_sub_task->count() == 0) {

                    $spent_revision_developer = DB::table('project_time_logs')
                        ->where('task_id', $task->id)
                        ->where('revision_status', 1)
                        ->where('created_at', '>=', $startDate)
                        ->where('created_at', '<', $endDate)
                        ->groupBy('task_id')
                        ->sum('total_minutes');

                    $total_spent_revision_developer += $spent_revision_developer;
                    
                } else {

                    foreach ($get_sub_task as $subtask) {
                        $get_task = DB::table('tasks')
                            ->select('id')
                            ->where('subtask_id', $subtask->id)
                            ->first();
                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $get_task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');

                        $total_spent_revision_developer += $spent_revision_developer;
                    }

                    
                }
               
            } 

            $responsible_for_revision = DB::table('task_revisions')
            ->where('task_id', $current_task_id)
            ->where('final_responsible_person', 'LD')
            ->count();

            if ($responsible_for_revision > 0) {
                $get_sub_task = DB::table('sub_tasks')
                    ->select('id')
                    ->where('task_id', $current_task_id)
                    ->get();

                if ($get_sub_task->count() == 0) {

                    $spent_revision_developer = DB::table('project_time_logs')
                        ->where('task_id', $task->id)
                        ->where('revision_status', 1)
                        ->where('created_at', '>=', $startDate)
                        ->where('created_at', '<', $endDate)
                        ->groupBy('task_id')
                        ->sum('total_minutes');

                    $total_spent_revision_developer += $spent_revision_developer;
                } else {

                    foreach ($get_sub_task as $subtask) {
                        $get_task = DB::table('tasks')
                            ->select('id')
                            ->where('subtask_id', $subtask->id)
                            ->first();
                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $get_task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');

                        $total_spent_revision_developer += $spent_revision_developer;
                    }
                }
              
            } 
          
        }

        $this->spent_revision_developer_lead = $total_spent_revision_developer / 60;

        //Percentage of tasks where given estimated time was missed//
        
        $number_of_tasks_received_for_deadline = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->count();

        $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.*')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $number_task_cross_estimate_time = 0;
        $percentage_number_task_cross_estimate_time = 0;
        $total_log_time_per_task=0;
        foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

            $get_sub_task = DB::table('sub_tasks')
                ->select('id')
                ->where('task_id', $task->id)
                ->get();

            foreach ($get_sub_task as $subtask) {
                $get_task = DB::table('tasks')
                    ->select('id')
                    ->where('subtask_id', $subtask->id)
                    ->first();
                $log_time_per_task = DB::table('project_time_logs')
                ->where('task_id', $get_task->id)
                ->where('revision_status', '=', 0)
                ->groupBy('task_id')
                ->sum('total_minutes');
                $total_log_time_per_task+= $log_time_per_task;
            }

            $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;

            if ($log_time_per_task > $estimate_minutes_task) {
                $number_task_cross_estimate_time++;
            }

            $total_log_time_per_task = 0;
        }

        if ($number_of_tasks_received_for_deadline > 0) {
            $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
        }

        $this->percentage_number_task_cross_estimate_time_lead = $percentage_number_task_cross_estimate_time;
        $this->number_task_cross_estimate_time_lead = $number_task_cross_estimate_time;
        $this->tasks = Task::select('tasks.id','tasks.heading','projects.project_name','projects.id as ProjectId','client.name as clientName',
        'client.id as client_id','tasks.client_name as task_client_name','tasks.board_column_id',
        'taskboard_columns.column_name','taskboard_columns.label_color',
        'cl.id as cl_id','cl.name as cl_name','tasks.created_at as created_at','task_submissions.created_at as submission_date')
        ->leftJoin('projects','projects.id','tasks.project_id')
        ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
        ->leftJoin('users as client','client.id','projects.client_id')
        ->leftJoin('users as cl','cl.id','tasks.client_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        
        ->leftJoin('task_submissions', function ($join) {
            $join->on('task_submissions.task_id', '=', 'tasks.id')
                ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                ->orderBy('task_submissions.created_at', 'desc');
        })
        ->where('task_users.user_id',$devId)
        ->whereBetween('tasks.created_at', [$startDate, $endDate])
        ->groupBy('tasks.id')
        ->orderBy('tasks.created_at','desc')->get();
        $this->past_tasks = Task::select('tasks.id','tasks.heading','projects.project_name','projects.id as ProjectId','client.name as clientName',
        'client.id as client_id','tasks.client_name as task_client_name','tasks.board_column_id',
        'taskboard_columns.column_name','taskboard_columns.label_color',
        'cl.id as cl_id','cl.name as cl_name','tasks.created_at as created_at','task_submissions.created_at as submission_date')
        ->leftJoin('projects','projects.id','tasks.project_id')
        ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
        ->leftJoin('users as client','client.id','projects.client_id')
        ->leftJoin('users as cl','cl.id','tasks.client_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        
        ->leftJoin('task_submissions', function ($join) {
            $join->on('task_submissions.task_id', '=', 'tasks.id')
                ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                ->orderBy('task_submissions.created_at', 'desc');
        })
        ->where('task_users.user_id',$devId)
        ->whereNotIn('tasks.board_column_id', [2, 3])
        ->whereBetween('tasks.created_at', [$startDate, $endDate])
        ->groupBy('tasks.id')
        ->orderBy('tasks.created_at','desc')->get();

        //-----------------------------number of tasks approved in first attempt(in cycle) PM table-----------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $first_attempt_approve_task = 0;
        $task_id_store = [];
        foreach ($number_of_tasks_approved as $task) {

            $min_approve_date = DB::table('task_approves')
            ->select('task_approves.created_at')
            ->where('task_approves.task_id', $task->id)
            ->orderBy('task_approves.created_at', 'asc')
            ->first();

            $number_of_tasks = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.task_id', $task->id)
            ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
            ->distinct('task_submissions.created_at')
            ->count();
            if ($number_of_tasks == 1) {
                $first_attempt_approve_task++;
                $task_id_store[] = $task->id;
            }
        }

        $first_attempt_approve_task_pm_data_lead = [];

        foreach ($task_id_store as $task) {
            //$task= Task::where('id',$task)->select('id')
            $approve_task_data = DB::table('tasks')
            ->select(
                'tasks.id',
                'tasks.heading',
                'client.id as clientId',
                'client.name as clientName',
                'tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date',
                'tasks.due_date',
                'tasks.client_name as client_name',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name as column_name',
                'taskboard_columns.label_color'
            )
                ->join('task_submissions', 'task_submissions.task_id','=','tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.id', $task )
                //->groupBy('tasks.id', $task)
                ->first();

            $first_attempt_approve_task_pm_data_lead[] = $approve_task_data;
        }


    $this->first_attempt_approve_task_pm_data_lead =$first_attempt_approve_task_pm_data_lead;

    //-----------------------------number of tasks approved in first attempt(in cycle) Client table-----------------------//

    $number_of_tasks_approved = DB::table('tasks')
    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('tasks.board_column_id', '=',4 )
        ->where('tasks.updated_at', '>=', $startDate)
        ->where('tasks.updated_at', '<', $endDate)
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->get();
    $first_attempt_approve_task = 0;
    $task_id_store = [];
    foreach ($number_of_tasks_approved as $task) {
        $number_of_tasks = DB::table('task_submissions')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->where('task_submissions.task_id', $task->id)
        ->distinct('task_submissions.created_at')
        ->count();
        if ($number_of_tasks == 1) {
            $task_id_store[] = $task->id;
            $first_attempt_approve_task++;

        }
    }

    $first_attempt_approve_task_data_client_lead = [];

    foreach ($task_id_store as $task) {
        //$task= Task::where('id',$task)->select('id')
        $approve_task_data = DB::table('tasks')
        ->select(
            'tasks.id',
            'tasks.heading',
            'client.id as clientId',
            'client.name as clientName',
            'tasks.created_at as assign_date',
            'task_submissions.created_at as submission_date',
            'tasks.due_date',
            'tasks.client_name as client_name',
            'cl.id as cl_id',
            'cl.name as cl_name',
            'tasks.board_column_id',
            'taskboard_columns.column_name as column_name',
            'taskboard_columns.label_color'
        )
        ->join('task_submissions',
            'task_submissions.task_id',
            '=',
            'tasks.id'
        )
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
            ->leftJoin('projects', 'projects.id', 'tasks.project_id')
            ->leftJoin('users as client', 'client.id', 'projects.client_id')
            ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
            ->where('tasks.id',
                $task
            )
            //->groupBy('tasks.id', $task)
            ->first();

        $first_attempt_approve_task_data_client_lead[] = $approve_task_data;
    }


    $this->first_attempt_approve_task_data_client_lead = $first_attempt_approve_task_data_client_lead;
     // ----------Average number of attempts needed for approval(in cycle) Project Manager  table-----------------------------//

     $number_of_tasks_approved = DB::table('tasks')
     ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
     ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
     ->select('tasks.id')
     ->where('task_approves.created_at', '>=', $startDate)
     ->where('task_approves.created_at', '<', $endDate)
     ->where('task_users.user_id', $devId)
     ->get();

 $average_attempts_approve_pm_data_lead = [];

 foreach ($task_id_store as $task) {
     //$task= Task::where('id',$task)->select('id')
     $approve_task_data = DB::table('tasks')
     ->select(
         'tasks.id',
         'tasks.heading',
         'client.id as clientId',
         'client.name as clientName',
         'tasks.created_at as assign_date',
         'task_submissions.created_at as submission_date',
         'tasks.due_date',
         'tasks.client_name as client_name',
         'cl.id as cl_id',
         'cl.name as cl_name',
         'tasks.board_column_id',
         'taskboard_columns.column_name as column_name',
         'taskboard_columns.label_color'
     )
     ->join('task_submissions',
         'task_submissions.task_id',
         '=',
         'tasks.id'
     )
         ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
         ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
         ->leftJoin('projects', 'projects.id', 'tasks.project_id')
         ->leftJoin('users as client', 'client.id', 'projects.client_id')
         ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
         ->where('tasks.id',
             $task
         )
         //->groupBy('tasks.id', $task)
         ->first();

     $average_attempts_approve_pm_data_lead[] = $approve_task_data;
 }

 $this->average_attempts_approve_pm_data_lead  =$average_attempts_approve_pm_data_lead;
  // --------------Average number of attempts needed for approval(in cycle) Client table-----------------------------//

  $number_of_tasks_approved = DB::table('tasks')
  ->select('tasks.id')
  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
  ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
  ->select('tasks.id')
  ->where('tasks.board_column_id', '=', 4)
  ->where('tasks.updated_at', '>=',
      $startDate
  )
  ->where('tasks.updated_at',
      '<',
      $endDate
  )
  ->where('task_approves.created_at', '>=', $startDate)
  ->where('task_approves.created_at', '<', $endDate)
  ->where('task_users.user_id', $devId)
  ->distinct('tasks.id')
  ->get();

  $average_attempts_approve_client_data_lead = [];

  foreach ( $number_of_tasks_approved as $task) {
      //$task= Task::where('id',$task)->select('id')
      $approve_task_data = DB::table('tasks')
      ->select(
          'tasks.id',
          'tasks.heading',
          'client.id as clientId',
          'client.name as clientName',
          'tasks.created_at as assign_date',
          'task_submissions.created_at as submission_date',
          'tasks.due_date',
          'tasks.client_name as client_name',
          'cl.id as cl_id',
          'cl.name as cl_name',
          'tasks.board_column_id',
          'taskboard_columns.column_name as column_name',
          'taskboard_columns.label_color'
      )
      ->join(
          'task_submissions',
          'task_submissions.task_id',
          '=',
          'tasks.id'
      )
      ->join('task_users',
          'tasks.id',
          '=',
          'task_users.task_id'
      )
          ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
          ->leftJoin('projects', 'projects.id', 'tasks.project_id')
          ->leftJoin('users as client', 'client.id', 'projects.client_id')
          ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
          ->where(
              'tasks.id',
              $task->id
          )
          //->groupBy('tasks.id', $task)
          ->first();

      $average_attempts_approve_client_data_lead[] = $approve_task_data;
  }

  $this->average_attempts_approve_client_data_lead  = $average_attempts_approve_client_data_lead;
       //---------------------------------Percentage of Revision table----------------------------------------------------//

       $assign_task_count_for_revision = 0;
       $number_of_total_revision_for_this_month = 0;
       $task_id_store=[];
       foreach ($total_task_assigned as $task) {

           $current_task_id = $task->id;
           $disput_responsible_for_revision = DB::table('task_revision_disputes')
               ->where('task_id', $current_task_id)
               ->where(function ($query) use ($current_task_id, $devId) {
                   $query->where('raised_by', $devId)
                   ->orWhere('raised_against', $devId);
               })
               ->where(function ($query) {
                   $query->where('raised_by_percent', '>', 0)
                   ->orWhere('raised_against_percent', '>', 0);
               })

               ->count();

           if ($disput_responsible_for_revision > 0) {
               $disput_responsible_for_revision = 1;
               $task_id_store[]= $task->id;
           } // one task for count one revision
           $responsible_for_revision = DB::table('task_revisions')
           ->where('task_id', $current_task_id)
           ->where('final_responsible_person', 'LD')
           ->count();

           if ($responsible_for_revision > 0) {
               $responsible_for_revision = 1;
               $task_id_store[]= $task->id;
           }  // one task for count one revision

           $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

           $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

           //count of assign tasks
           $assign_task_count_for_revision++;
       }

       $revision_data_lead = [];

       foreach ($task_id_store as $task) {
           //$task= Task::where('id',$task)->select('id')
           $approve_task_data = DB::table('tasks')
           ->select(
               'tasks.id',
               'tasks.heading',
               'client.id as clientId',
               'client.name as clientName',
               'tasks.created_at as assign_date',
               'task_submissions.created_at as submission_date',
               'tasks.due_date',
               'tasks.client_name as client_name',
               'cl.id as cl_id',
               'cl.name as cl_name',
               'tasks.board_column_id',
               'taskboard_columns.column_name as column_name',
               'taskboard_columns.label_color'
           )
           ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
               ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
               ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
               ->leftJoin('projects', 'projects.id', 'tasks.project_id')
               ->leftJoin('users as client', 'client.id', 'projects.client_id')
               ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
               ->where('tasks.id', $task)
               //->groupBy('tasks.id', $task)
               ->first();

           $revision_data_lead[] = $approve_task_data;
       }

       $this->revision_data_lead= $revision_data_lead;

       //------------------------------average Submission Time(Day) table----------------------------------------------//

            //in this month
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
                ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->get();

            $average_submit_data_lead = [];

            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                //$task= Task::where('id',$task)->select('id')
                $approve_task_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                )
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_submit_data_lead[] = $approve_task_data;
            }

            $this->average_submit_data_lead = $average_submit_data_lead;
              //Number of disputes filed all table


              $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
              ->select('task_id')
              ->where(function ($query) use ($devId) {
                  $query->where('raised_by', $devId)
                  ->orWhere('raised_against', $devId);
              })
              ->where('created_at', '>=', $startDate)
              ->where('created_at', '<', $endDate)
              ->get();

          $number_of_dispute_filed_all_data_lead = [];

          foreach ($number_of_dispute_filed_all_id as $task) {
              //$task= Task::where('id',$task)->select('id')
              $task_data = DB::table('tasks')
                  ->select(
                      'tasks.id',
                      'tasks.heading',
                      'client.id as clientId',
                      'client.name as clientName',
                      'tasks.created_at as assign_date',
                      'task_submissions.created_at as submission_date',
                      'tasks.due_date',
                      'tasks.client_name as client_name',
                      'cl.id as cl_id',
                      'cl.name as cl_name',
                      'tasks.board_column_id',
                      'taskboard_columns.column_name as column_name',
                      'taskboard_columns.label_color'
                  )
                  ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                  ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                  ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                  ->leftJoin('users as client', 'client.id', 'projects.client_id')
                  ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                  ->where('tasks.id', $task->task_id)
                  //->groupBy('tasks.id', $task)
                  ->first();

              $number_of_dispute_filed_all_data_lead[] = $task_data;
          }


          $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;

           //-------------------Number of disputes filed all table-----------------//


           $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
           ->select('task_id')
           ->where(function ($query) use ($devId) {
               $query->where('raised_by', $devId)
               ->orWhere('raised_against', $devId);
           })
           ->where('created_at', '>=', $startDate)
           ->where('created_at', '<', $endDate)
           ->get();

       $number_of_dispute_filed_all_data_lead = [];

       foreach ($number_of_dispute_filed_all_id as $task) {
           //$task= Task::where('id',$task)->select('id')
           $task_data = DB::table('tasks')
               ->select(
                   'tasks.id',
                   'tasks.heading',
                   'client.id as clientId',
                   'client.name as clientName',
                   'tasks.created_at as assign_date',
                   'task_submissions.created_at as submission_date',
                   'tasks.due_date',
                   'tasks.client_name as client_name',
                   'cl.id as cl_id',
                   'cl.name as cl_name',
                   'tasks.board_column_id',
                   'taskboard_columns.column_name as column_name',
                   'taskboard_columns.label_color'
               )
               ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
               ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
               ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
               ->leftJoin('projects', 'projects.id', 'tasks.project_id')
               ->leftJoin('users as client', 'client.id', 'projects.client_id')
               ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
               ->where('tasks.id', $task->task_id)
               //->groupBy('tasks.id', $task)
               ->first();

           $number_of_dispute_filed_all_data_lead[] = $task_data;
       }


       $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;
        //------------ Number of disputes lost own table-----------------//
        $number_of_dispute_lost_own_id = DB::table('task_revision_disputes')
        ->select('task_id')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId);
        })
            ->where('winner', '!=', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->get();


        $number_of_dispute_lost_own_data = [];

        foreach ($number_of_dispute_lost_own_id  as $task) {
            //$task= Task::where('id',$task)->select('id')
            $task_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                )
                ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.id', $task->task_id)
                //->groupBy('tasks.id', $task)
                ->first();

            $number_of_dispute_lost_own_data[] = $task_data;
        }


        $this->number_of_dispute_lost_own_data_lead = $number_of_dispute_lost_own_data;
        //----------------- Number of disputes lost all table----------------------//

        $number_of_dispute_lost_all_id = DB::table('task_revision_disputes')
        ->select('task_id')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
        ->where('winner', '!=', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->get();

        $number_of_dispute_lost_all_data = [];

        foreach ($number_of_dispute_lost_all_id  as $task) {
            //$task= Task::where('id',$task)->select('id')
            $task_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                )
                ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.id', $task->task_id)
                //->groupBy('tasks.id', $task)
                ->first();

            $number_of_dispute_lost_all_data[] = $task_data;
        }


        $this->number_of_dispute_lost_all_data_lead = $number_of_dispute_lost_all_data;
        //----------------Average number of in-progress tasks table-------------------//

        $this->total_in_progress_date_range_table_lead = DB::table('progress_tasks')
        ->select('count_progress_task','created_at')
        ->where('user_id', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->get();

         //---------------Hours spent in revisions data-----------------//

         $spent_revision_developer_data_id = DB::table('project_time_logs')
         ->select('task_id')
         ->where('user_id', $devId)
         ->where('revision_status', 1)
         ->where('created_at', '>=', $startDate)
         ->where('created_at', '<', $endDate)
         ->get();

         $spent_revision_developer_data = [];

         foreach ($spent_revision_developer_data_id  as $task) {
             //$task= Task::where('id',$task)->select('id')
             $task_data = DB::table('tasks')
                 ->select(
                     'tasks.id',
                     'tasks.heading',
                     'client.id as clientId',
                     'client.name as clientName',
                     'tasks.created_at as assign_date',
                     'task_submissions.created_at as submission_date',
                     'tasks.due_date',
                     'tasks.client_name as client_name',
                     'cl.id as cl_id',
                     'cl.name as cl_name',
                     'tasks.board_column_id',
                     'taskboard_columns.column_name as column_name',
                     'taskboard_columns.label_color'
                 )
                 ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                 ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                 ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                 ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                 ->leftJoin('users as client', 'client.id', 'projects.client_id')
                 ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                 ->where('tasks.id', $task->task_id)
                 //->groupBy('tasks.id', $task)
                 ->first();

             $spent_revision_developer_data[] = $task_data;
         }

         $this->spent_revision_developer_data_lead  =$spent_revision_developer_data;

         //-------------Percentage of tasks where given estimated time was missed table----------------//
         $estimate_time_missed_id_store=[];
         $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
             ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
             ->select('tasks.*')
             ->where('tasks.created_at', '>=', $startDate)
             ->where('tasks.created_at', '<', $endDate)
             ->where('task_users.user_id', $devId)
             ->get();

         $number_task_cross_estimate_time = 0;
         $percentage_number_task_cross_estimate_time = 0;
         foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

             $log_time_per_task = DB::table('project_time_logs')
             ->where('task_id', $task->id)
             ->where('revision_status', '=', 0)
             ->groupBy('task_id')
             ->sum('total_minutes');

             $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
             if ($log_time_per_task > $estimate_minutes_task) {
                 $number_task_cross_estimate_time++;
                 $estimate_time_missed_id_store []= $task->id;
             }
         }
         if ($number_of_tasks_received_for_deadline > 0) {
             $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
             $estimate_time_missed_id_store []= $task->id;
         }

         $estimate_missed_task_data = [];

         foreach ($estimate_time_missed_id_store as $task) {
             //$task= Task::where('id',$task)->select('id')
             $task_data = DB::table('tasks')
                 ->select(
                     'tasks.id',
                     'tasks.heading',
                     'client.id as clientId',
                     'client.name as clientName',
                     'tasks.created_at as assign_date',
                     'task_submissions.created_at as submission_date',
                     'tasks.due_date',
                     'tasks.client_name as client_name',
                     'cl.id as cl_id',
                     'cl.name as cl_name',
                     'tasks.board_column_id',
                     'taskboard_columns.column_name as column_name',
                     'taskboard_columns.label_color'
                 )
                 ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                 ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                 ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                 ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                 ->leftJoin('users as client', 'client.id', 'projects.client_id')
                 ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                 ->where('tasks.id', $task)
                 //->groupBy('tasks.id', $task)
                 ->first();

             $estimate_missed_task_data[] = $task_data;
         }


         $this->estimate_missed_task_data_lead = $estimate_missed_task_data;


    
    

            $html = view('dashboard.ajax.leaddeveloper.month', $this->data)->render();

            
 
             return Reply::dataOnly([
                 'status' => 'success',
                 'html' => $html,
             ]);

        }else 
        {
            $devId = Auth::id();
            // $this->username = DB::table('users')->where('id',$devId)->value('name');
            $startDate = Carbon::now()->startOfMonth();
         
            $endDate1 = Carbon::now()->endOfMonth();
           
            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');
          //  dd($startDate, $endDate);
          
            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);
            $user_role = DB::table('users')->select('role_id')->where('id', $devId)->first();
    
        
        
                $this->username_lead = DB::table('users')->where('id', $devId)->value('name');
            
                $this->number_of_tasks_received_lead = DB::table('tasks')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->where('tasks.created_at', '>=', $startDate)
                    ->where('tasks.created_at', '<', $endDate)
                    ->where('task_users.user_id', $devId)
                    ->count();
                    $this->number_of_tasks_received_lead_data = DB::table('tasks')
                ->select('tasks.id','tasks.heading','client.id as clientId','client.name as clientName','tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date','tasks.due_date','tasks.client_name as client_name','cl.id as cl_id','cl.name as cl_name',
                'tasks.board_column_id','taskboard_columns.column_name as column_name', 'taskboard_columns.label_color'
                //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects','projects.id','tasks.project_id')
                ->leftJoin('users as client','client.id','projects.client_id')
                ->leftJoin('users as cl','cl.id','tasks.client_id')
                ->leftJoin('task_submissions','task_submissions.task_id','tasks.id')
                ->where('tasks.created_at','>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
                foreach($this->number_of_tasks_received_lead_data as $row)
                {
                    $row->revision_count = TaskRevision::where('task_id',$row->id)->where('final_responsible_person','!=', null)->count();
                }
                // $this->submit_number_of_tasks_for_this_month_lead = DB::table('task_submissions')
                // ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                // ->where('task_submissions.created_at', '>=', $startDate)
                // ->where('task_submissions.created_at', '<', $endDate)
                // ->where('tasks.created_at', '>=', $startDate)
                // ->where('tasks.created_at', '<', $endDate)
                // ->where('task_submissions.user_id', $devId)
                // ->where('task_submissions.submission_no', '=', 1)
                // ->distinct('task_submissions.created_at')
                // ->distinct('tasks.id')
                // ->count();
    
                $this->submit_number_of_tasks_in_this_month_lead = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
            //    ->where('task_submissions.submission_no', '=', 1)
                 ->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();
                $this->submit_number_of_tasks_in_this_month_lead_data = DB::table('task_submissions')
                ->select('tasks.id','tasks.heading','client.id as clientId','client.name as clientName','tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date','tasks.due_date','tasks.client_name as client_name','cl.id as cl_id','cl.name as cl_name',
                'tasks.board_column_id','taskboard_columns.column_name as column_name', 'taskboard_columns.label_color'
                //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects','projects.id','tasks.project_id')
                ->leftJoin('users as client','client.id','projects.client_id')
                ->leftJoin('users as cl','cl.id','tasks.client_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
               // ->where('task_submissions.submission_no', '=', 1)
               ->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->groupBy('tasks.id')
                ->get();
                foreach($this->submit_number_of_tasks_in_this_month_lead_data as $row)
                {
                    $row->revision_count = TaskRevision::where('task_id',$row->id)->where('final_responsible_person','!=', null)->count();
                }
    
    
                //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//
    
                $number_of_tasks_approved = DB::table('tasks')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                    ->select('tasks.id')
                    ->where('tasks.board_column_id', '=', 4)
                    ->where('tasks.updated_at', '>=', $startDate)
                    ->where('tasks.updated_at', '<', $endDate)
                    ->where('task_approves.created_at', '>=', $startDate)
                    ->where('task_approves.created_at', '<', $endDate)
                    ->where('task_users.user_id', $devId)
                    ->get();
                $first_attempt_approve_task = 0;
                foreach ($number_of_tasks_approved as $task) {

                    $number_of_tasks = DB::table('task_submissions')
                        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                        ->where('task_submissions.task_id', $task->id)
                        ->distinct('task_submissions.created_at')
                        ->count();
                    if ($number_of_tasks == 1) {
                        $first_attempt_approve_task++;
                    }
                }
              
                $this->first_attempt_approve_task_in_this_month_client_lead = $first_attempt_approve_task;
    
              
    
                //-----------------------------number of tasks approved in first attempt(in cycle) PM-----------------------//
    
                $number_of_tasks_approved = DB::table('tasks')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                    ->select('tasks.id')
                    ->where('task_approves.created_at', '>=', $startDate)
                    ->where('task_approves.created_at', '<', $endDate)
                    ->where('task_users.user_id', $devId)
                    ->get();
                $first_attempt_approve_task = 0;
                foreach ($number_of_tasks_approved as $task) {
    
                    $min_approve_date = DB::table('task_approves')
                        ->select('task_approves.created_at')
                        ->where('task_approves.task_id', $task->id)
                        ->orderBy('task_approves.created_at', 'asc')
                        ->first();
    
                    $number_of_tasks = DB::table('task_submissions')
                        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                        ->where('task_submissions.task_id', $task->id)
                        ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                        ->distinct('task_submissions.created_at')
                        ->count();
                    if ($number_of_tasks == 1) {
                        $first_attempt_approve_task++;
                    }
                }
    
                $this->first_attempt_approve_task_in_this_month_lead = $first_attempt_approve_task;
    
    
           
                // $this->first_attempt_approve_task_for_this_month_lead = $first_attempt_approve_task;
       
        
    
    
            // --------------Average number of attempts needed for approval(in cycle) Project Manager-----------------------------//
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {
    
                $min_approve_date = DB::table('task_approves')
                ->select('task_approves.created_at')
                ->where('task_approves.task_id', $task->id)
                ->orderBy('task_approves.created_at', 'asc')
                ->first();
    
                $number_of_tasks = DB::table('task_submissions')
                ->select('task_submissions.submission_no')
                ->where('task_submissions.task_id', $task->id)
                    ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month_lead = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month_lead = 0;
            }
    
         
    
            // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('tasks.board_column_id', '=', 4)
            ->where('tasks.updated_at', '>=', $startDate)
            ->where('tasks.updated_at', '<', $endDate)
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {
    
    
    
                $number_of_tasks = DB::table('task_submissions')
                ->select('task_submissions.submission_no')
                ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month_client_lead = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month_client_lead = 0;
            }
    
           
    
            //---------------------------------Percentage of Revision----------------------------------------------------//
    
            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
    
            $assign_task_count_for_revision = 0;
            $number_of_total_revision_for_this_month = 0;
            foreach ($total_task_assigned as $task) {
    
                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                ->where('task_id', $current_task_id)
                    ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                        ->orWhere('raised_against_percent', '>', 0);
                    })
    
                    ->count();
    
                if ($disput_responsible_for_revision > 0) {
                    $disput_responsible_for_revision = 1;
                } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'LD')
                    ->count();
    
                if ($responsible_for_revision > 0) {
                    $responsible_for_revision = 1;
                }  // one task for count one revision
    
                $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;
    
                $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;
    
                //count of assign tasks
                $assign_task_count_for_revision++;
            }
    
            $percentage_of_tasks_with_revision = 0;
            if ($assign_task_count_for_revision > 0) {
                $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
            }
            $this->percentage_of_tasks_with_revision_lead = $percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision_lead = $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month_lead = $number_of_total_revision_for_this_month;
    
            //------------------------------average Submission Time(Day)----------------------------------------------//
    
           
    
            //in this month
    
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
            ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
            ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
            ->where('task_submissions.submission_no', '=', 1)
            ->distinct('task_submissions.created_at')
            ->get();
    
            $sum_of_total_duration = 0;
            $count_of_submission_task = 0;
            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                $sum_of_total_duration = $sum_of_total_duration + $task->total_duration;
                $count_of_submission_task++;
            }
    
            $average_submission_day_in_this_month = 0;
    
            if ($count_of_submission_task > 0) {
                $average_submission_day_in_this_month = $sum_of_total_duration / $count_of_submission_task;
            }
    
            $this->average_submission_day_in_this_month_lead = $average_submission_day_in_this_month;
    
            //-----------Percentage of tasks where deadline was missed -----------------//
    
            $currentDate = Carbon::now()->format('Y-m-d');
    
            $number_of_tasks_received_for_deadline = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
    
            $number_of_tasks_received_for_deadline_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
    
            $number_of_tasks_cross_deadline = 0;
            $percentage_of_tasks_deadline = 0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');
    
                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');
    
                if ($dueDate < $updatedAt && $task->board_column_id == 4) {
    
                    $number_of_tasks_cross_deadline++;
                } else if ($dueDate < $currentDate && $task->board_column_id != 4) {
    
                    $number_of_tasks_cross_deadline++;
                }
            }
    
            $this->number_of_tasks_cross_deadline_lead = $number_of_tasks_cross_deadline;
    
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_of_tasks_deadline = ($number_of_tasks_cross_deadline / $number_of_tasks_received_for_deadline) * 100;
            }
    
            $this->percentage_of_tasks_deadline_lead = $percentage_of_tasks_deadline;
    
            //Number of disputes filed
    
            $this->number_of_dispute_filed_own_lead = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId);
            })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();
    
            $this->number_of_dispute_filed_all_lead = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId)
                ->orWhere('raised_against', $devId);
            })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();
    
            // Number of disputes lost
            $this->number_of_dispute_lost_own_lead = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId);
            })
            ->where('winner', '!=', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();
    
            $this->number_of_dispute_lost_all_lead = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId)
                ->orWhere('raised_against', $devId);
            })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();
    
            // Average number of in-progress tasks
    
            $total_in_progress_date_range = DB::table('progress_tasks')
            ->where('user_id', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->groupBy('user_id')
            ->sum('count_progress_task');
    
            $startDateString = request('start_date');
            $endDateString = request('end_date');
    
            $startDate4 = Carbon::parse($startDateString);
            $endDate4 = Carbon::parse($endDateString);
    
            $differenceInDays = (int) $endDate4->diffInDays($startDate4);
    
            $differenceInDays = $differenceInDays + 1;
            $this->average_in_progress_date_range_lead = $total_in_progress_date_range / $differenceInDays;
    
            //Spent time in revision
    
            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $total_spent_revision_developer=0;
            foreach ($total_task_assigned as $task) {
                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                ->where('task_id', $current_task_id)
                ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                        ->orWhere('raised_against_percent', '>', 0);
                    })
    
                    ->count();
    
                if ($disput_responsible_for_revision > 0) {
                     $get_sub_task = DB::table('sub_tasks')
                     ->select('id')
                     ->where('task_id', $current_task_id)
                     ->get();
    
                    if ($get_sub_task->count() == 0) {
    
                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');
    
                        $total_spent_revision_developer += $spent_revision_developer;
                        
                    } else {
    
                        foreach ($get_sub_task as $subtask) {
                            $get_task = DB::table('tasks')
                                ->select('id')
                                ->where('subtask_id', $subtask->id)
                                ->first();
                            $spent_revision_developer = DB::table('project_time_logs')
                                ->where('task_id', $get_task->id)
                                ->where('revision_status', 1)
                                ->where('created_at', '>=', $startDate)
                                ->where('created_at', '<', $endDate)
                                ->groupBy('task_id')
                                ->sum('total_minutes');
    
                            $total_spent_revision_developer += $spent_revision_developer;
                        }
    
                        
                    }
                   
                } 
    
                $responsible_for_revision = DB::table('task_revisions')
                ->where('task_id', $current_task_id)
                ->where('final_responsible_person', 'LD')
                ->count();
    
                if ($responsible_for_revision > 0) {
                    $get_sub_task = DB::table('sub_tasks')
                        ->select('id')
                        ->where('task_id', $current_task_id)
                        ->get();
    
                    if ($get_sub_task->count() == 0) {
    
                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');
    
                        $total_spent_revision_developer += $spent_revision_developer;
                    } else {
    
                        foreach ($get_sub_task as $subtask) {
                            $get_task = DB::table('tasks')
                                ->select('id')
                                ->where('subtask_id', $subtask->id)
                                ->first();
                            $spent_revision_developer = DB::table('project_time_logs')
                                ->where('task_id', $get_task->id)
                                ->where('revision_status', 1)
                                ->where('created_at', '>=', $startDate)
                                ->where('created_at', '<', $endDate)
                                ->groupBy('task_id')
                                ->sum('total_minutes');
    
                            $total_spent_revision_developer += $spent_revision_developer;
                        }
                    }
                  
                } 
              
            }
    
            $this->spent_revision_developer_lead = $total_spent_revision_developer / 60;
    
            //Percentage of tasks where given estimated time was missed//
            
            $number_of_tasks_received_for_deadline = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
    
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $number_task_cross_estimate_time = 0;
            $percentage_number_task_cross_estimate_time = 0;
            $total_log_time_per_task=0;
            foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {
    
                $get_sub_task = DB::table('sub_tasks')
                    ->select('id')
                    ->where('task_id', $task->id)
                    ->get();
    
                foreach ($get_sub_task as $subtask) {
                    $get_task = DB::table('tasks')
                        ->select('id')
                        ->where('subtask_id', $subtask->id)
                        ->first();
                    $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $get_task->id)
                    ->where('revision_status', '=', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');
                    $total_log_time_per_task+= $log_time_per_task;
                }
    
                $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
    
                if ($log_time_per_task??0 > $estimate_minutes_task) {
                    $number_task_cross_estimate_time++;
                }
    
                $total_log_time_per_task = 0;
            }
    
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
            }
    
            $this->percentage_number_task_cross_estimate_time_lead = $percentage_number_task_cross_estimate_time;
            $this->number_task_cross_estimate_time_lead = $number_task_cross_estimate_time;
            $this->average_in_progress_date_range = $total_in_progress_date_range / $differenceInDays;
        $this->tasks = Task::select('tasks.id','tasks.heading','projects.project_name','projects.id as ProjectId','client.name as clientName',
        'client.id as client_id','tasks.client_name as task_client_name','tasks.board_column_id',
        'taskboard_columns.column_name','taskboard_columns.label_color',
        'cl.id as cl_id','cl.name as cl_name','tasks.created_at as created_at','task_submissions.created_at as submission_date')
        ->leftJoin('projects','projects.id','tasks.project_id')
        ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
        ->leftJoin('users as client','client.id','projects.client_id')
        ->leftJoin('users as cl','cl.id','tasks.client_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        
        ->leftJoin('task_submissions', function ($join) {
            $join->on('task_submissions.task_id', '=', 'tasks.id')
                ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                ->orderBy('task_submissions.created_at', 'desc');
        })
        ->where('task_users.user_id',$devId)
        ->whereBetween('tasks.created_at', [$startDate, $endDate])
        ->groupBy('tasks.id')
        ->orderBy('tasks.created_at','desc')->get();
        $this->past_tasks = Task::select('tasks.id','tasks.heading','projects.project_name','projects.id as ProjectId','client.name as clientName',
        'client.id as client_id','tasks.client_name as task_client_name','tasks.board_column_id',
        'taskboard_columns.column_name','taskboard_columns.label_color',
        'cl.id as cl_id','cl.name as cl_name','tasks.created_at as created_at','task_submissions.created_at as submission_date')
        ->leftJoin('projects','projects.id','tasks.project_id')
        ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
        ->leftJoin('users as client','client.id','projects.client_id')
        ->leftJoin('users as cl','cl.id','tasks.client_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        
        ->leftJoin('task_submissions', function ($join) {
            $join->on('task_submissions.task_id', '=', 'tasks.id')
                ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                ->orderBy('task_submissions.created_at', 'desc');
        })
        ->where('task_users.user_id',$devId)
        ->whereNotIn('tasks.board_column_id', [2, 3])
        ->whereBetween('tasks.created_at', [$startDate, $endDate])
        ->groupBy('tasks.id')
        ->orderBy('tasks.created_at','desc')->get();

        //-----------------------------number of tasks approved in first attempt(in cycle) PM table-----------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $first_attempt_approve_task = 0;
        $task_id_store = [];
        foreach ($number_of_tasks_approved as $task) {

            $min_approve_date = DB::table('task_approves')
            ->select('task_approves.created_at')
            ->where('task_approves.task_id', $task->id)
            ->orderBy('task_approves.created_at', 'asc')
            ->first();

            $number_of_tasks = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.task_id', $task->id)
            ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
            ->distinct('task_submissions.created_at')
            ->count();
            if ($number_of_tasks == 1) {
                $first_attempt_approve_task++;
                $task_id_store[] = $task->id;
            }
        }

        $first_attempt_approve_task_pm_data_lead = [];

        foreach ($task_id_store as $task) {
            //$task= Task::where('id',$task)->select('id')
            $approve_task_data = DB::table('tasks')
            ->select(
                'tasks.id',
                'tasks.heading',
                'client.id as clientId',
                'client.name as clientName',
                'tasks.created_at as assign_date',
                'task_submissions.created_at as submission_date',
                'tasks.due_date',
                'tasks.client_name as client_name',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name as column_name',
                'taskboard_columns.label_color'
            )
                ->join('task_submissions', 'task_submissions.task_id','=','tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.id', $task )
                //->groupBy('tasks.id', $task)
                ->first();

            $first_attempt_approve_task_pm_data_lead[] = $approve_task_data;
        }


    $this->first_attempt_approve_task_pm_data_lead =$first_attempt_approve_task_pm_data_lead;
    //-----------------------------number of tasks approved in first attempt(in cycle) Client table-----------------------//

    $number_of_tasks_approved = DB::table('tasks')
    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('tasks.board_column_id', '=',4 )
        ->where('tasks.updated_at', '>=', $startDate)
        ->where('tasks.updated_at', '<', $endDate)
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->get();
    $first_attempt_approve_task = 0;
    $task_id_store = [];
    foreach ($number_of_tasks_approved as $task) {
        $number_of_tasks = DB::table('task_submissions')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->where('task_submissions.task_id', $task->id)
        ->distinct('task_submissions.created_at')
        ->count();
        if ($number_of_tasks == 1) {
            $task_id_store[] = $task->id;
            $first_attempt_approve_task++;

        }
    }

    $first_attempt_approve_task_data_client_lead = [];

    foreach ($task_id_store as $task) {
        //$task= Task::where('id',$task)->select('id')
        $approve_task_data = DB::table('tasks')
        ->select(
            'tasks.id',
            'tasks.heading',
            'client.id as clientId',
            'client.name as clientName',
            'tasks.created_at as assign_date',
            'task_submissions.created_at as submission_date',
            'tasks.due_date',
            'tasks.client_name as client_name',
            'cl.id as cl_id',
            'cl.name as cl_name',
            'tasks.board_column_id',
            'taskboard_columns.column_name as column_name',
            'taskboard_columns.label_color'
        )
        ->join('task_submissions',
            'task_submissions.task_id',
            '=',
            'tasks.id'
        )
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
            ->leftJoin('projects', 'projects.id', 'tasks.project_id')
            ->leftJoin('users as client', 'client.id', 'projects.client_id')
            ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
            ->where('tasks.id',
                $task
            )
            //->groupBy('tasks.id', $task)
            ->first();

        $first_attempt_approve_task_data_client_lead[] = $approve_task_data;
    }


    $this->first_attempt_approve_task_data_client_lead = $first_attempt_approve_task_data_client_lead;
    // dd($this->first_attempt_approve_task_data_client_lead );
     // ----------Average number of attempts needed for approval(in cycle) Project Manager  table-----------------------------//

     $number_of_tasks_approved = DB::table('tasks')
     ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
     ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
     ->select('tasks.id')
     ->where('task_approves.created_at', '>=', $startDate)
     ->where('task_approves.created_at', '<', $endDate)
     ->where('task_users.user_id', $devId)
     ->get();

 $average_attempts_approve_pm_data_lead = [];

 foreach ($task_id_store as $task) {
   // dd($task);
     //$task= Task::where('id',$task)->select('id')
     $approve_task_data = DB::table('tasks')
     ->select(
         'tasks.id',
         'tasks.heading',
         'client.id as clientId',
         'client.name as clientName',
         'tasks.created_at as assign_date',
         'task_submissions.created_at as submission_date',
         'tasks.due_date',
         'tasks.client_name as client_name',
         'cl.id as cl_id',
         'cl.name as cl_name',
         'tasks.board_column_id',
         'taskboard_columns.column_name as column_name',
         'taskboard_columns.label_color'
     )
     ->join('task_submissions',
         'task_submissions.task_id',
         '=',
         'tasks.id'
     )
         ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
         ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
         ->leftJoin('projects', 'projects.id', 'tasks.project_id')
         ->leftJoin('users as client', 'client.id', 'projects.client_id')
         ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
         ->where('tasks.id',
             $task
         )
         //->groupBy('tasks.id', $task)
         ->first();

     $average_attempts_approve_pm_data_lead[] = $approve_task_data;
 }

 $this->average_attempts_approve_pm_data_lead  =$average_attempts_approve_pm_data_lead;
 //dd($this->average_attempts_approve_pm_data_lead);

  // --------------Average number of attempts needed for approval(in cycle) Client table-----------------------------//

  $number_of_tasks_approved = DB::table('tasks')
  ->select('tasks.id')
  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
  ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
  ->select('tasks.id')
  ->where('tasks.board_column_id', '=', 4)
  ->where('tasks.updated_at', '>=',
      $startDate
  )
  ->where('tasks.updated_at',
      '<',
      $endDate
  )
  ->where('task_approves.created_at', '>=', $startDate)
  ->where('task_approves.created_at', '<', $endDate)
  ->where('task_users.user_id', $devId)
  ->distinct('tasks.id')
  ->get();
  

  $average_attempts_approve_client_data_lead = [];

  foreach ( $number_of_tasks_approved as $task) {
      //$task= Task::where('id',$task)->select('id')
      $approve_task_data = DB::table('tasks')
      ->select(
          'tasks.id',
          'tasks.heading',
          'client.id as clientId',
          'client.name as clientName',
          'tasks.created_at as assign_date',
          'task_submissions.created_at as submission_date',
          'tasks.due_date',
          'tasks.client_name as client_name',
          'cl.id as cl_id',
          'cl.name as cl_name',
          'tasks.board_column_id',
          'taskboard_columns.column_name as column_name',
          'taskboard_columns.label_color'
      )
      ->join(
          'task_submissions',
          'task_submissions.task_id',
          '=',
          'tasks.id'
      )
      ->join('task_users',
          'tasks.id',
          '=',
          'task_users.task_id'
      )
          ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
          ->leftJoin('projects', 'projects.id', 'tasks.project_id')
          ->leftJoin('users as client', 'client.id', 'projects.client_id')
          ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
          ->where(
              'tasks.id',
              $task->id
          )
          //->groupBy('tasks.id', $task)
          ->first();

      $average_attempts_approve_client_data_lead[] = $approve_task_data;
  }

  $this->average_attempts_approve_client_data_lead  = $average_attempts_approve_client_data_lead;
  
         //---------------------------------Percentage of Revision table----------------------------------------------------//

         $assign_task_count_for_revision = 0;
         $number_of_total_revision_for_this_month = 0;
         $task_id_store=[];
         foreach ($total_task_assigned as $task) {

             $current_task_id = $task->id;
             $disput_responsible_for_revision = DB::table('task_revision_disputes')
                 ->where('task_id', $current_task_id)
                 ->where(function ($query) use ($current_task_id, $devId) {
                     $query->where('raised_by', $devId)
                     ->orWhere('raised_against', $devId);
                 })
                 ->where(function ($query) {
                     $query->where('raised_by_percent', '>', 0)
                     ->orWhere('raised_against_percent', '>', 0);
                 })

                 ->count();

             if ($disput_responsible_for_revision > 0) {
                 $disput_responsible_for_revision = 1;
                 $task_id_store[]= $task->id;
             } // one task for count one revision
             $responsible_for_revision = DB::table('task_revisions')
             ->where('task_id', $current_task_id)
             ->where('final_responsible_person', 'LD')
             ->count();

             if ($responsible_for_revision > 0) {
                 $responsible_for_revision = 1;
                 $task_id_store[]= $task->id;
             }  // one task for count one revision

             $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

             $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

             //count of assign tasks
             $assign_task_count_for_revision++;
         }

         $revision_data_lead = [];

         foreach ($task_id_store as $task) {
             //$task= Task::where('id',$task)->select('id')
             $approve_task_data = DB::table('tasks')
             ->select(
                 'tasks.id',
                 'tasks.heading',
                 'client.id as clientId',
                 'client.name as clientName',
                 'tasks.created_at as assign_date',
                 'task_submissions.created_at as submission_date',
                 'tasks.due_date',
                 'tasks.client_name as client_name',
                 'cl.id as cl_id',
                 'cl.name as cl_name',
                 'tasks.board_column_id',
                 'taskboard_columns.column_name as column_name',
                 'taskboard_columns.label_color'
             )
             ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                 ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                 ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                 ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                 ->leftJoin('users as client', 'client.id', 'projects.client_id')
                 ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                 ->where('tasks.id', $task)
                 //->groupBy('tasks.id', $task)
                 ->first();

             $revision_data_lead[] = $approve_task_data;
         }

         $this->revision_data_lead= $revision_data_lead;
       
       
         //------------------------------average Submission Time(Day) table----------------------------------------------//

            //in this month
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
                ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->get();

            $average_submit_data_lead = [];

            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                //$task= Task::where('id',$task)->select('id')
                $approve_task_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                )
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_submit_data_lead[] = $approve_task_data;
            }

            $this->average_submit_data_lead = $average_submit_data_lead;
           
          
              //Number of disputes filed all table


              $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
              ->select('task_id')
              ->where(function ($query) use ($devId) {
                  $query->where('raised_by', $devId)
                  ->orWhere('raised_against', $devId);
              })
              ->where('created_at', '>=', $startDate)
              ->where('created_at', '<', $endDate)
              ->get();

          $number_of_dispute_filed_all_data_lead = [];

          foreach ($number_of_dispute_filed_all_id as $task) {
              //$task= Task::where('id',$task)->select('id')
             
              $task_data = DB::table('tasks')
                  ->select(
                      'tasks.id',
                      'tasks.heading',
                      'client.id as clientId',
                      'client.name as clientName',
                      'tasks.created_at as assign_date',
                      'task_submissions.created_at as submission_date',
                      'tasks.due_date',
                      'tasks.client_name as client_name',
                      'cl.id as cl_id',
                      'cl.name as cl_name',
                      'tasks.board_column_id',
                      'taskboard_columns.column_name as column_name',
                      'taskboard_columns.label_color'
                  )
                  ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                  ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                  ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                  ->leftJoin('users as client', 'client.id', 'projects.client_id')
                  ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                  ->where('tasks.id', $task->task_id)
                  //->groupBy('tasks.id', $task)
                  ->first();

              $number_of_dispute_filed_all_data_lead[] = $task_data;
          }


          $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;
        //  dd($this->number_of_dispute_filed_all_data_lead );
           //-------------------Number of disputes filed all table-----------------//


           $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
           ->select('task_id')
           ->where(function ($query) use ($devId) {
               $query->where('raised_by', $devId)
               ->orWhere('raised_against', $devId);
           })
           ->where('created_at', '>=', $startDate)
           ->where('created_at', '<', $endDate)
           ->get();

       $number_of_dispute_filed_all_data_lead = [];

       foreach ($number_of_dispute_filed_all_id as $task) {
           //$task= Task::where('id',$task)->select('id')
           $task_data = DB::table('tasks')
               ->select(
                   'tasks.id',
                   'tasks.heading',
                   'client.id as clientId',
                   'client.name as clientName',
                   'tasks.created_at as assign_date',
                   'task_submissions.created_at as submission_date',
                   'tasks.due_date',
                   'tasks.client_name as client_name',
                   'cl.id as cl_id',
                   'cl.name as cl_name',
                   'tasks.board_column_id',
                   'taskboard_columns.column_name as column_name',
                   'taskboard_columns.label_color'
               )
               ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
               ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
               ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
               ->leftJoin('projects', 'projects.id', 'tasks.project_id')
               ->leftJoin('users as client', 'client.id', 'projects.client_id')
               ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
               ->where('tasks.id', $task->task_id)
               //->groupBy('tasks.id', $task)
               ->first();

           $number_of_dispute_filed_all_data_lead[] = $task_data;
       }


       $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;
      

       //------------ Number of disputes lost own table-----------------//
            $number_of_dispute_lost_own_id = DB::table('task_revision_disputes')
            ->select('task_id')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId);
            })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();


            $number_of_dispute_lost_own_data = [];

            foreach ($number_of_dispute_lost_own_id  as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $number_of_dispute_lost_own_data[] = $task_data;
            }


            $this->number_of_dispute_lost_own_data_lead = $number_of_dispute_lost_own_data;
              //----------------- Number of disputes lost all table----------------------//

        $number_of_dispute_lost_all_id = DB::table('task_revision_disputes')
        ->select('task_id')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
        ->where('winner', '!=', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->get();

        $number_of_dispute_lost_all_data = [];

        foreach ($number_of_dispute_lost_all_id  as $task) {
            //$task= Task::where('id',$task)->select('id')
            $task_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                )
                ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.id', $task->task_id)
                //->groupBy('tasks.id', $task)
                ->first();

            $number_of_dispute_lost_all_data[] = $task_data;
        }


        $this->number_of_dispute_lost_all_data_lead = $number_of_dispute_lost_all_data;
         //----------------Average number of in-progress tasks table-------------------//

         $this->total_in_progress_date_range_table_lead = DB::table('progress_tasks')
         ->select('count_progress_task','created_at')
         ->where('user_id', $devId)
         ->where('created_at', '>=', $startDate)
         ->where('created_at', '<', $endDate)
         ->get();

          //---------------Hours spent in revisions data-----------------//

          $spent_revision_developer_data_id = DB::table('project_time_logs')
          ->select('task_id')
          ->where('user_id', $devId)
          ->where('revision_status', 1)
          ->where('created_at', '>=', $startDate)
          ->where('created_at', '<', $endDate)
          ->get();
 
          $spent_revision_developer_data = [];
 
          foreach ($spent_revision_developer_data_id  as $task) {
              //$task= Task::where('id',$task)->select('id')
              $task_data = DB::table('tasks')
                  ->select(
                      'tasks.id',
                      'tasks.heading',
                      'client.id as clientId',
                      'client.name as clientName',
                      'tasks.created_at as assign_date',
                      'task_submissions.created_at as submission_date',
                      'tasks.due_date',
                      'tasks.client_name as client_name',
                      'cl.id as cl_id',
                      'cl.name as cl_name',
                      'tasks.board_column_id',
                      'taskboard_columns.column_name as column_name',
                      'taskboard_columns.label_color'
                  )
                  ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                  ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                  ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                  ->leftJoin('users as client', 'client.id', 'projects.client_id')
                  ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                  ->where('tasks.id', $task->task_id)
                  //->groupBy('tasks.id', $task)
                  ->first();
 
              $spent_revision_developer_data[] = $task_data;
          }
 
          $this->spent_revision_developer_data_lead  =$spent_revision_developer_data;

          //-------------Percentage of tasks where given estimated time was missed table----------------//
          $estimate_time_missed_id_store=[];
          $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
              ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
              ->select('tasks.*')
              ->where('tasks.created_at', '>=', $startDate)
              ->where('tasks.created_at', '<', $endDate)
              ->where('task_users.user_id', $devId)
              ->get();

          $number_task_cross_estimate_time = 0;
          $percentage_number_task_cross_estimate_time = 0;
          foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

              $log_time_per_task = DB::table('project_time_logs')
              ->where('task_id', $task->id)
              ->where('revision_status', '=', 0)
              ->groupBy('task_id')
              ->sum('total_minutes');

              $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
              if ($log_time_per_task > $estimate_minutes_task) {
                  $number_task_cross_estimate_time++;
                  $estimate_time_missed_id_store []= $task->id;
              }
          }
          if ($number_of_tasks_received_for_deadline > 0) {
              $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
              $estimate_time_missed_id_store []= $task->id;
          }

          $estimate_missed_task_data = [];

          foreach ($estimate_time_missed_id_store as $task) {
              //$task= Task::where('id',$task)->select('id')
              $task_data = DB::table('tasks')
                  ->select(
                      'tasks.id',
                      'tasks.heading',
                      'client.id as clientId',
                      'client.name as clientName',
                      'tasks.created_at as assign_date',
                      'task_submissions.created_at as submission_date',
                      'tasks.due_date',
                      'tasks.client_name as client_name',
                      'cl.id as cl_id',
                      'cl.name as cl_name',
                      'tasks.board_column_id',
                      'taskboard_columns.column_name as column_name',
                      'taskboard_columns.label_color'
                  )
                  ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                  ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                  ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                  ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                  ->leftJoin('users as client', 'client.id', 'projects.client_id')
                  ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                  ->where('tasks.id', $task)
                  //->groupBy('tasks.id', $task)
                  ->first();

              $estimate_missed_task_data[] = $task_data;
          }


          $this->estimate_missed_task_data_lead = $estimate_missed_task_data;


        
            return view('dashboard.employee.lead', $this->data);
        }
       
       
    }
}
