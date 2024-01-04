<?php

namespace App\Traits;

use App\Helper\Reply;
use App\Http\Requests\ClockIn\ClockInRequest;
use App\Models\Attendance;
use App\Models\AttendanceSetting;
use App\Models\CompanyAddress;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\EmployeeShiftSchedule;
use App\Models\Event;
use App\Models\Holiday;
use App\Models\Lead;
use App\Models\Deal;
use App\Models\LeadAgent;
use App\Models\Leave;
use App\Models\Notice;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\Ticket;
use App\Models\TicketAgentGroups;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use DateTime;
use App\Models\DealStage;

/**
*
*/
trait SalesDashboard
{

	/**
		* @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
	*/
	public function SalesDashboard()
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
          // dd(request('startDate'),request('endDate'),request('user_id'));

        $devId = request('user_id');
        // $this->username = DB::table('users')->where('id',$devId)->value('name');
        $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
        $endDate1 = request('endDate');
        $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');
      
        $this->startDate1 = Carbon::parse($startDate);
        $this->endDate1 = Carbon::parse($endDate1);
        $user_role = DB::table('users')->select('role_id')->where('id', $devId)->first();
     


    
    
	//		dd("nksadnkasl");
            $html = view('dashboard.ajax.salesexecutive.month', $this->data)->render();

            
 
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
    
        


        
            return view('dashboard.employee.sales_executive', $this->data);
        }
       
       
    }
}