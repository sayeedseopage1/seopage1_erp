<?php

namespace App\Traits;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Role;
use App\Models\Task;
use \Carbon\Carbon;
use App\Helper\Reply;
use Carbon\CarbonPeriod;

use Auth;
use Illuminate\Support\Facades\DB;

trait DeveloperDashboard
{
    public function DeveloperDashboard()
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

   

        $this->username = DB::table('users')->where('id', $devId)->value('name');
        $this->developer_task_data = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
        ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at',)
        ->where('tasks.created_at', '>=', $startDate)
        ->where('tasks.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->count();

        $this->number_of_tasks_received = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->where('tasks.created_at','>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->count(); 
    //    dd( $this->number_of_tasks_received, count( $this->number_of_tasks_received));

            $this->number_of_tasks_received_primary_page = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Primary Page Development')
            ->where('task_users.user_id', $devId)
            ->count();

        $this->number_of_tasks_received_secondary_page = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Secondary Page Development')
            ->where('task_users.user_id', $devId)
            ->count();


        $this->submit_number_of_tasks_in_this_month = DB::table('task_submissions')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->where('task_submissions.created_at', '>=', $startDate)
        ->where('task_submissions.created_at', '<', $endDate)
        ->where('task_submissions.user_id', $devId)
        ->where('task_submissions.submission_no', '=', 1)
        ->distinct('task_submissions.created_at')
        ->distinct('tasks.id')
        ->count();


        $this->submit_number_of_tasks_primary_page_in_this_month = DB::table('task_submissions')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
        ->where('task_submissions.created_at', '>=', $startDate)
        ->where('task_submissions.created_at', '<', $endDate)
        ->where('task_submissions.user_id', $devId)
        ->where('task_submissions.submission_no', '=', 1)
        ->where('task_types.page_type', '=', 'Primary Page Development')
        ->distinct('task_submissions.created_at')
        ->distinct('tasks.id')
        ->count();

      
        $this->submit_number_of_tasks_secondary_page_in_this_month = DB::table('task_submissions')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
        ->where('task_submissions.created_at', '>=', $startDate)
        ->where('task_submissions.created_at', '<', $endDate)
        ->where('task_submissions.user_id', $devId)
        ->where('task_submissions.submission_no', '=', 1)
        ->where('task_types.page_type', '=', 'Secondary Page Development')
        ->distinct('task_submissions.created_at')
        ->distinct('tasks.id')
        ->count();


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

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
        ->select('tasks.id')
        ->where('tasks.board_column_id', '=', 4)
        ->where('tasks.updated_at', '>=', $startDate)
        ->where('tasks.updated_at', '<', $endDate)
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_types.page_type', '=', 'Primary Page Development')
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task_primary_page = 0;
        foreach ($number_of_tasks_approved as $task) {
            

            $number_of_tasks = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.task_id', $task->id)
                ->distinct('task_submissions.created_at')
                ->count();
            if ($number_of_tasks == 1) {
                $first_attempt_approve_task_primary_page++;
            }
        }

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
        ->select('tasks.id')
         ->where('tasks.board_column_id', '=', 4)
        ->where('tasks.updated_at', '>=', $startDate)
         ->where('tasks.updated_at', '<', $endDate)
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_types.page_type', '=', 'Secondary Page Development')
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task_secondary_page = 0;
        foreach ($number_of_tasks_approved as $task) {
           

            $number_of_tasks = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.task_id', $task->id)
                ->distinct('task_submissions.created_at')
                ->count();
            if ($number_of_tasks == 1) {
                $first_attempt_approve_task_secondary_page++;
            }
        }

        $this->first_attempt_approve_task_in_this_month_client = $first_attempt_approve_task;
        $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page;
        $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page;

       


    //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task=0;
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
            if($number_of_tasks==1){
                $first_attempt_approve_task++;

            }                
        }

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
        ->select('tasks.id')
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_types.page_type', '=', 'Primary Page Development')
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task_primary_page = 0;
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
            if ($number_of_tasks ==1) {
                $first_attempt_approve_task_primary_page++;
            }
        }

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
        ->select('tasks.id')
        ->where('task_approves.created_at', '>=', $startDate)
        ->where('task_approves.created_at', '<', $endDate)
        ->where('task_types.page_type', '=', 'Secondary Page Development')
        ->where('task_users.user_id', $devId)
        ->get();
        $first_attempt_approve_task_secondary_page = 0;
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
            if ($number_of_tasks ==1) {
                $first_attempt_approve_task_secondary_page++;
            }
        }

      $this->first_attempt_approve_task_in_this_month= $first_attempt_approve_task;
      $this->first_attempt_approve_task_primary_page_in_this_month= $first_attempt_approve_task_primary_page;
      $this->first_attempt_approve_task_secondary_page_in_this_month= $first_attempt_approve_task_secondary_page;

  




        // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//

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

            $min_approve_date= DB::table('task_approves')
             ->select('task_approves.created_at')
             ->where('task_approves.task_id',$task->id)
             ->orderBy('task_approves.created_at', 'asc')
             ->first();

            $number_of_tasks = DB::table('task_submissions')
            ->select('task_submissions.submission_no')
            ->where('task_submissions.task_id', $task->id)
            ->where('task_submissions.created_at','<', $min_approve_date->created_at)
            ->distinct('task_submissions.created_at')
            ->orderBy('task_submissions.id', 'DESC')
            ->first();
            $max_submission = $number_of_tasks->submission_no;
            $count_submission_per_approval = $count_submission_per_approval + $max_submission;
            $total_approval++;
        }
        if ($total_approval > 0) {
            $this->average_submission_aproval_in_this_month = $count_submission_per_approval / $total_approval;
        } else {
            $this->average_submission_aproval_in_this_month = 0;
        }

      

        // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//

        $number_of_tasks_approved = DB::table('tasks')
        ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
        ->select('tasks.id')
        ->where('tasks.board_column_id','=',4)
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
            if($number_of_tasks != null)
            {
                $max_submission = $number_of_tasks->submission_no;
            
            $count_submission_per_approval = $count_submission_per_approval + $max_submission;
            $total_approval++;

            }
           
            
        }
        if ($total_approval > 0) {
            $this->average_submission_aproval_in_this_month_client = $count_submission_per_approval / $total_approval;
        } else {
            $this->average_submission_aproval_in_this_month_client = 0;
        }
              
      
        //---------------------------------Percentage of Revision----------------------------------------------------//

        $total_task_assigned = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();

        $assign_task_count_for_revision=0;
        $number_of_total_revision_for_this_month=0;
        foreach($total_task_assigned as $task){

              $current_task_id=$task->id;
              $disput_responsible_for_revision= DB::table('task_revision_disputes')
                           ->where('task_id', $current_task_id)
                           ->where(function ($query) use ($current_task_id, $devId) {
                                       $query->where('raised_by', $devId)
                                             ->orWhere('raised_against', $devId);
                                             
                             })
                           ->where(function ($query) {
                                      $query->where('raised_by_percent','>',0)
                                            ->orWhere('raised_against_percent','>',0);
                             })
                 
                         ->count();

            if($disput_responsible_for_revision>0) {
                  $disput_responsible_for_revision=1;
                } // one task for count one revision
            $responsible_for_revision = DB::table('task_revisions')
                                ->where('task_id', $current_task_id)
                                ->where('final_responsible_person','D')
                                ->count();

                  if ($responsible_for_revision > 0) {
                $responsible_for_revision = 1;
            }  // one task for count one revision
            
                $total_revision_dispute_without_dispute= $disput_responsible_for_revision+$responsible_for_revision;

                $number_of_total_revision_for_this_month= $number_of_total_revision_for_this_month+ $total_revision_dispute_without_dispute;
                
                //count of assign tasks
                $assign_task_count_for_revision++;    
        }

         $percentage_of_tasks_with_revision=0;
         if($assign_task_count_for_revision>0){
           $percentage_of_tasks_with_revision= ($number_of_total_revision_for_this_month/ $assign_task_count_for_revision)*100;
         }
            $this->percentage_of_tasks_with_revision=$percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision= $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;


      //in this month

        $submit_number_of_tasks_in_this_month_count = $this->submit_number_of_tasks_in_this_month;

        $log_time_minute_total_in_this_month = 0;
        $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
        ->select('tasks.id')
        ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
        ->where('task_submissions.created_at', '>=', $startDate)
        ->where('task_submissions.created_at', '<', $endDate)
        ->where('task_submissions.user_id', $devId)
        ->where('task_submissions.submission_no', '=', 1)
        ->distinct('task_submissions.created_at')
        ->distinct('tasks.id')
        ->get();

        foreach ($submit_number_of_tasks_in_this_month_data as $task) {
              $log_time_per_task= DB::table('project_time_logs')
                                ->where('task_id', $task->id)
                                ->where('revision_status', 0)
                                ->groupBy('task_id')
                                ->sum('total_minutes');
        $log_time_minute_total_in_this_month = $log_time_minute_total_in_this_month + $log_time_per_task;

        }

        $average_submission_time_in_this_month = 0;

    if ($submit_number_of_tasks_in_this_month_count > 0){
        $average_submission_time_in_this_month = $log_time_minute_total_in_this_month / $submit_number_of_tasks_in_this_month_count;
            $average_submission_time_in_this_month= $average_submission_time_in_this_month/60;
  
    }

        $this->average_submission_time_in_this_month= $average_submission_time_in_this_month;


    

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

        $this->average_submission_day_in_this_month = $average_submission_day_in_this_month;


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

        $number_of_tasks_cross_deadline=0;
        $percentage_of_tasks_deadline=0;
        foreach ($number_of_tasks_received_for_deadline_data as $task) {
            $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');
        
            $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');
      
            if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                $number_of_tasks_cross_deadline++;
              
                  
            }else if($dueDate < $currentDate && $task->board_column_id != 4){

                $number_of_tasks_cross_deadline++;
                
            }
        }

        $this->number_of_tasks_cross_deadline= $number_of_tasks_cross_deadline;

       
           
        if($number_of_tasks_received_for_deadline>0){
        $percentage_of_tasks_deadline= ($number_of_tasks_cross_deadline/ $number_of_tasks_received_for_deadline)*100;}

        $this->percentage_of_tasks_deadline= $percentage_of_tasks_deadline;

        //Percentage of tasks where given estimated time was missed
        $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.*')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $number_task_cross_estimate_time=0;
        $percentage_number_task_cross_estimate_time = 0;
        foreach($number_of_tasks_received_for_missed_estimate_data as $task){

            $log_time_per_task = DB::table('project_time_logs')
                ->where('task_id', $task->id)
                ->where('revision_status','=',0)
                ->groupBy('task_id')
                ->sum('total_minutes');

            $estimate_minutes_task= $task->estimate_hours*60+ $task->estimate_minutes;
            if($log_time_per_task> $estimate_minutes_task){
                $number_task_cross_estimate_time++;
            }

        }
        if($number_of_tasks_received_for_deadline>0){
        $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time/ $number_of_tasks_received_for_deadline)*100;
        }
        
        $this->percentage_number_task_cross_estimate_time= $percentage_number_task_cross_estimate_time;
        $this->number_task_cross_estimate_time = $number_task_cross_estimate_time;
        $this->number_of_tasks_received_for_missed_estimate_data= $number_of_tasks_received_for_missed_estimate_data;

        
        //Number of disputes filed

          $this->number_of_dispute_filed_own= DB::table('task_revision_disputes')
                    ->where(function ($query) use ($devId) {
                           $query->where('raised_by', $devId);
                                
                  })
                  ->where('created_at', '>=', $startDate)
                  ->where('created_at', '<', $endDate)
                  ->count();

        $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();

        // Number of disputes lost
        $this->number_of_dispute_lost_own = DB::table('task_revision_disputes')
            ->where(function ($query) use ( $devId) {
                $query->where('raised_by', $devId);
                    
            })
          ->where('winner', '!=', $devId)  
           ->where('created_at', '>=', $startDate)
           ->where('created_at', '<', $endDate)
           ->count();

        $this->number_of_dispute_lost_all = DB::table('task_revision_disputes')
        ->where(function ($query) use ($devId) {
            $query->where('raised_by', $devId)
            ->orWhere('raised_against', $devId);
        })
        ->where('winner', '!=', $devId)
        ->where('created_at', '>=', $startDate)
        ->where('created_at', '<', $endDate)
        ->count();

        //Hours spent in revisions 

        $spent_revision_developer = DB::table('project_time_logs')
                    ->where('user_id', $devId)
                    ->where('revision_status', 1)
                    ->where('created_at', '>=', $startDate)
                    ->where('created_at', '<', $endDate)
                    ->sum('total_minutes');

        $this->spent_revision_developer= $spent_revision_developer/60;


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

        $differenceInDays= $differenceInDays+1;
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
    

            $html = view('dashboard.ajax.developerdashboard.month', $this->data)->render();
            
 
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
    
      
    
            $this->username = DB::table('users')->where('id', $devId)->value('name');
            $this->developer_task_data = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at',)
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->count();
    
            $this->number_of_tasks_received = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at','>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
                
            //    dd( $this->number_of_tasks_received, count( $this->number_of_tasks_received));
                $this->number_of_tasks_received_primary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Primary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();
    
            $this->number_of_tasks_received_secondary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Secondary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();
    
            $this->submit_number_of_tasks_in_this_month = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
            ->where('task_submissions.submission_no', '=', 1)
            ->distinct('task_submissions.created_at')
            ->distinct('tasks.id')
            ->count();
    
          
    
            $this->submit_number_of_tasks_primary_page_in_this_month = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
            ->where('task_submissions.submission_no', '=', 1)
            ->where('task_types.page_type', '=', 'Primary Page Development')
            ->distinct('task_submissions.created_at')
            ->distinct('tasks.id')
            ->count();
    
          
    
            $this->submit_number_of_tasks_secondary_page_in_this_month = DB::table('task_submissions')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
            ->where('task_submissions.submission_no', '=', 1)
            ->where('task_types.page_type', '=', 'Secondary Page Development')
            ->distinct('task_submissions.created_at')
            ->distinct('tasks.id')
            ->count();
    
    
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
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->select('tasks.id')
            ->where('tasks.board_column_id', '=', 4)
            ->where('tasks.updated_at', '>=', $startDate)
            ->where('tasks.updated_at', '<', $endDate)
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Primary Page Development')
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task_primary_page = 0;
            foreach ($number_of_tasks_approved as $task) {
                
    
                $number_of_tasks = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task_primary_page++;
                }
            }
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->select('tasks.id')
             ->where('tasks.board_column_id', '=', 4)
            ->where('tasks.updated_at', '>=', $startDate)
             ->where('tasks.updated_at', '<', $endDate)
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Secondary Page Development')
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task_secondary_page = 0;
            foreach ($number_of_tasks_approved as $task) {
               
    
                $number_of_tasks = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task_secondary_page++;
                }
            }
    
            $this->first_attempt_approve_task_in_this_month_client = $first_attempt_approve_task;
            $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page;
            $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page;
    
          
    
        //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task=0;
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
                if($number_of_tasks==1){
                    $first_attempt_approve_task++;
    
                }                
            }
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Primary Page Development')
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task_primary_page = 0;
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
                if ($number_of_tasks ==1) {
                    $first_attempt_approve_task_primary_page++;
                }
            }
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
            ->select('tasks.id')
            ->where('task_approves.created_at', '>=', $startDate)
            ->where('task_approves.created_at', '<', $endDate)
            ->where('task_types.page_type', '=', 'Secondary Page Development')
            ->where('task_users.user_id', $devId)
            ->get();
            $first_attempt_approve_task_secondary_page = 0;
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
                if ($number_of_tasks ==1) {
                    $first_attempt_approve_task_secondary_page++;
                }
            }
    
          $this->first_attempt_approve_task_in_this_month= $first_attempt_approve_task;
          $this->first_attempt_approve_task_primary_page_in_this_month= $first_attempt_approve_task_primary_page;
          $this->first_attempt_approve_task_secondary_page_in_this_month= $first_attempt_approve_task_secondary_page;
    
        
    
    
    
    
            // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//
    
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
    
                $min_approve_date= DB::table('task_approves')
                 ->select('task_approves.created_at')
                 ->where('task_approves.task_id',$task->id)
                 ->orderBy('task_approves.created_at', 'asc')
                 ->first();
    
                $number_of_tasks = DB::table('task_submissions')
                ->select('task_submissions.submission_no')
                ->where('task_submissions.task_id', $task->id)
                ->where('task_submissions.created_at','<', $min_approve_date->created_at)
                ->distinct('task_submissions.created_at')
                ->orderBy('task_submissions.id', 'DESC')
                ->first();
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month = 0;
            }
    
           
    
            // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//
    
            $number_of_tasks_approved = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
            ->select('tasks.id')
            ->where('tasks.board_column_id','=',4)
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
                $this->average_submission_aproval_in_this_month_client = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month_client = 0;
            }
    
           
    
            //---------------------------------Percentage of Revision----------------------------------------------------//
    
            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
    
            $assign_task_count_for_revision=0;
            $number_of_total_revision_for_this_month=0;
            foreach($total_task_assigned as $task){
    
                  $current_task_id=$task->id;
                  $disput_responsible_for_revision= DB::table('task_revision_disputes')
                               ->where('task_id', $current_task_id)
                               ->where(function ($query) use ($current_task_id, $devId) {
                                           $query->where('raised_by', $devId)
                                                 ->orWhere('raised_against', $devId);
                                                 
                                 })
                               ->where(function ($query) {
                                          $query->where('raised_by_percent','>',0)
                                                ->orWhere('raised_against_percent','>',0);
                                 })
                     
                             ->count();
    
                if($disput_responsible_for_revision>0) {
                      $disput_responsible_for_revision=1;
                    } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                                    ->where('task_id', $current_task_id)
                                    ->where('final_responsible_person','D')
                                    ->count();
    
                      if ($responsible_for_revision > 0) {
                    $responsible_for_revision = 1;
                }  // one task for count one revision
                
                    $total_revision_dispute_without_dispute= $disput_responsible_for_revision+$responsible_for_revision;
    
                    $number_of_total_revision_for_this_month= $number_of_total_revision_for_this_month+ $total_revision_dispute_without_dispute;
                    
                    //count of assign tasks
                    $assign_task_count_for_revision++;    
            }
    
             $percentage_of_tasks_with_revision=0;
             if($assign_task_count_for_revision>0){
               $percentage_of_tasks_with_revision= ($number_of_total_revision_for_this_month/ $assign_task_count_for_revision)*100;
             }
                $this->percentage_of_tasks_with_revision=$percentage_of_tasks_with_revision;
                $this->assign_task_count_for_revision= $assign_task_count_for_revision;
                $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;
    
    
       
          //in this month
    
            $submit_number_of_tasks_in_this_month_count = $this->submit_number_of_tasks_in_this_month;
    
            $log_time_minute_total_in_this_month = 0;
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
            ->select('tasks.id')
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->where('task_submissions.created_at', '>=', $startDate)
            ->where('task_submissions.created_at', '<', $endDate)
            ->where('task_submissions.user_id', $devId)
            ->where('task_submissions.submission_no', '=', 1)
            ->distinct('task_submissions.created_at')
            ->distinct('tasks.id')
            ->get();
    
            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                  $log_time_per_task= DB::table('project_time_logs')
                                    ->where('task_id', $task->id)
                                    ->where('revision_status', 0)
                                    ->groupBy('task_id')
                                    ->sum('total_minutes');
            $log_time_minute_total_in_this_month = $log_time_minute_total_in_this_month + $log_time_per_task;
    
            }
    
            $average_submission_time_in_this_month = 0;
    
        if ($submit_number_of_tasks_in_this_month_count > 0){
            $average_submission_time_in_this_month = $log_time_minute_total_in_this_month / $submit_number_of_tasks_in_this_month_count;
                $average_submission_time_in_this_month= $average_submission_time_in_this_month/60;
      
        }
    
            $this->average_submission_time_in_this_month= $average_submission_time_in_this_month;
    
    
         
    
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
    
            $this->average_submission_day_in_this_month = $average_submission_day_in_this_month;
    
    
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
    
            $number_of_tasks_cross_deadline=0;
            $percentage_of_tasks_deadline=0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');
            
                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');
          
                if ($dueDate < $updatedAt && $task->board_column_id == 4) {
    
                    $number_of_tasks_cross_deadline++;
                  
                      
                }else if($dueDate < $currentDate && $task->board_column_id != 4){
    
                    $number_of_tasks_cross_deadline++;
                    
                }
            }
    
            $this->number_of_tasks_cross_deadline= $number_of_tasks_cross_deadline;
    
           
               
            if($number_of_tasks_received_for_deadline>0){
            $percentage_of_tasks_deadline= ($number_of_tasks_cross_deadline/ $number_of_tasks_received_for_deadline)*100;}
    
            $this->percentage_of_tasks_deadline= $percentage_of_tasks_deadline;
    
            //Percentage of tasks where given estimated time was missed
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $number_task_cross_estimate_time=0;
            $percentage_number_task_cross_estimate_time = 0;
            foreach($number_of_tasks_received_for_missed_estimate_data as $task){
    
                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status','=',0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');
    
                $estimate_minutes_task= $task->estimate_hours*60+ $task->estimate_minutes;
                if($log_time_per_task> $estimate_minutes_task){
                    $number_task_cross_estimate_time++;
                }
    
            }
            if($number_of_tasks_received_for_deadline>0){
            $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time/ $number_of_tasks_received_for_deadline)*100;
            }
            
            $this->percentage_number_task_cross_estimate_time= $percentage_number_task_cross_estimate_time;
            $this->number_task_cross_estimate_time = $number_task_cross_estimate_time;
            $this->number_of_tasks_received_for_missed_estimate_data= $number_of_tasks_received_for_missed_estimate_data;
    
            
            //Number of disputes filed
    
              $this->number_of_dispute_filed_own= DB::table('task_revision_disputes')
                        ->where(function ($query) use ($devId) {
                               $query->where('raised_by', $devId);
                                    
                      })
                      ->where('created_at', '>=', $startDate)
                      ->where('created_at', '<', $endDate)
                      ->count();
    
            $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId)
                ->orWhere('raised_against', $devId);
            })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();
    
            // Number of disputes lost
            $this->number_of_dispute_lost_own = DB::table('task_revision_disputes')
                ->where(function ($query) use ( $devId) {
                    $query->where('raised_by', $devId);
                        
                })
              ->where('winner', '!=', $devId)  
               ->where('created_at', '>=', $startDate)
               ->where('created_at', '<', $endDate)
               ->count();
    
            $this->number_of_dispute_lost_all = DB::table('task_revision_disputes')
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId)
                ->orWhere('raised_against', $devId);
            })
            ->where('winner', '!=', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->count();
    
            //Hours spent in revisions 
    
            $spent_revision_developer = DB::table('project_time_logs')
                        ->where('user_id', $devId)
                        ->where('revision_status', 1)
                        ->where('created_at', '>=', $startDate)
                        ->where('created_at', '<', $endDate)
                        ->sum('total_minutes');
    
            $this->spent_revision_developer= $spent_revision_developer/60;
    
    
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
    
            $differenceInDays= $differenceInDays+1;
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
          //  dd($this->tasks);
    
        
            return view('dashboard.employee.developer', $this->data);
        }
       
       
    }
}
