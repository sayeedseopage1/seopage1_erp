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
		if (request('mode') == 'today' && request()->ajax()) {
			$this->todayLead = Lead::where('added_by', Auth::id())->whereDate('created_at', request('startDate'))->get();
			$this->todayLeadcount= Lead::where('added_by',Auth::id())->whereDate('created_at',request('startDate'))->count();
			$this->today_bid_value= Lead::where('added_by',Auth::id())->whereDate('created_at',request('startDate'))->sum('value');
			if($this->todayLeadcount != 0)
			{
				$this->avg_bid_value= $this->today_bid_value /$this->todayLeadcount;
			} else 
			{
				$this->avg_bid_value= 0;
			}
			$this->today_min_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at', request('startDate'))->sum('bid_value');
			$this->today_max_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at', request('startDate'))->sum('bid_value2');
			if ($this->todayLeadcount != 0) {
				$this->avg_minlead_value= $this->today_min_lead_value /$this->todayLeadcount;
				$this->avg_maxlead_value= $this->today_max_lead_value /$this->todayLeadcount;
				$this->avg_lead_value = ($this->avg_minlead_value + $this->avg_maxlead_value)/2;
			} else {
				$this->avg_minlead_value= 0;
				$this->avg_maxlead_value= 0;
				$this->avg_lead_value= 0;
			}
			$this->todayLeadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at', request('startDate'))->count();
			$this->todayLeadconvertedValue= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at', request('startDate'))->sum('value');
			$html = view('dashboard.ajax.salesexecutive.today', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} elseif (request('mode') == 'month' && request()->ajax()) {
			$date = Carbon::createFromFormat('Y-m-d', request('startDate'));
            $startDate = $date->startOfMonth()->addDays(20)->toDateString(); 
            $endDate = $date->startOfMonth()->addMonth(1)->addDays(19)->toDateString(); 
            
			$this->todayLead = Lead::where('added_by', Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();
			$this->todayLeadcount= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->today_bid_value= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			if($this->todayLeadcount != 0) {
				$this->avg_bid_value= $this->today_bid_value /$this->todayLeadcount;
			} else {
				$this->avg_bid_value= 0;
			}
			$this->today_min_lead_value= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value');
			$this->today_max_lead_value= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value2');
			if($this->todayLeadcount != 0)
			{
				$this->avg_minlead_value= $this->today_min_lead_value /$this->todayLeadcount;
				$this->avg_maxlead_value= $this->today_max_lead_value /$this->todayLeadcount;
				$this->avg_lead_value = ($this->avg_minlead_value + $this->avg_maxlead_value)/2;
			}else 
			{
				$this->avg_minlead_value= 0;
				$this->avg_maxlead_value= 0;
				$this->avg_lead_value= 0;

			}
			$this->todayLeadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->todayLeadconvertedValue= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->Leadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalbidsValue= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->totalleads= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalwondeal= DealStage::where('added_by',Auth::id())->where('won_lost','Yes')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalostdeal= DealStage::where('added_by',Auth::id())->where('won_lost','No')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->rejectedbyPm= Deal::where('added_by',Auth::id())->where('status','Denied')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			//dd($this->totalostdeal);

			if ($this->totalleads != 0) {
				$this->avg_value= $this->totalbidsValue /$this->totalleads;
			} else  {
				$this->avg_value= 0;
			}

			if ($this->totalleads != 0) {
				$this->percentage_of_lead_converted= ($this->Leadconverted /$this->totalleads)*100;

			} else {
				$this->percentage_of_lead_converted= 0;
			}

			if ($this->Leadconverted != 0) {
				$this->percentage_of_deal_won= ($this->totalwondeal/$this->Leadconverted)*100;

			} else {
				$this->percentage_of_deal_won= 0;
			}

			if ($this->Leadconverted != 0) {
				$this->percentage_of_deal_lost= ($this->totalostdeal/$this->Leadconverted)*100;
			} else {
				$this->percentage_of_deal_lost= 0;
			}

			if ($this->totalwondeal != 0) {
				$this->percentage_of_deal_getting_rejected= ($this->rejectedbyPm/$this->totalwondeal)*100;
			} else {
				$this->percentage_of_deal_getting_rejected= 0;
			}

			$this->convertedLead = Lead::where([
				'added_by' => $this->user->id,
				'status_id' => 3,
			])->whereBetween('created_at', [$startDate, $endDate])->get();

			$this->totalLeads = Lead::where('added_by', $this->user->id)->whereBetween('created_at', [$startDate, $endDate])->get();
			$this->totalDeals = Deal::where('added_by', $this->user->id)->whereBetween('created_at', [$startDate, $endDate])->get();
			// dd($this->totalDeals);

			$this->lostLeads = Lead::select('leads.*')->join('deal_stages', 'deal_stages.lead_id', '=', 'leads.id')->where('leads.added_by', $this->user->id)->whereBetween('leads.created_at', [$startDate, $endDate])->orderBy('leads.id', 'desc')->get();
			$html = view('dashboard.ajax.salesexecutive.month', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} elseif (request('mode') == 'general' && request()->ajax()) {
			$this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();

		    $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
		    $startDate = $this->startDate->toDateString();
		    $endDate = $this->endDate->toDateString();
			$this->todayLead = Lead::where('added_by', Auth::id())->whereDate('created_at', Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();
			$this->todayLeadcount= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->today_bid_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			if($this->todayLeadcount != 0)
			{
				$this->avg_bid_value= $this->today_bid_value /$this->todayLeadcount;
			} else 
			{
				$this->avg_bid_value= 0;
			}
			$this->today_min_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value');
			$this->today_max_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value2');
			if($this->todayLeadcount != 0)
			{
				$this->avg_minlead_value= $this->today_min_lead_value /$this->todayLeadcount;
				$this->avg_maxlead_value= $this->today_max_lead_value /$this->todayLeadcount;
				$this->avg_lead_value = ($this->avg_minlead_value + $this->avg_maxlead_value)/2;
			}else 
			{
				$this->avg_minlead_value= 0;
				$this->avg_maxlead_value= 0;
				$this->avg_lead_value= 0;

			}
			$this->todayLeadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->todayLeadconvertedValue= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->Leadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalbidsValue= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->totalleads= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalwondeal= DealStage::where('added_by',Auth::id())->where('won_lost','Yes')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalostdeal= DealStage::where('added_by',Auth::id())->where('won_lost','No')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->rejectedbyPm= Deal::where('added_by',Auth::id())->where('status','Denied')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			//dd($this->totalostdeal);

			if($this->totalleads != 0) {
				$this->avg_value= $this->totalbidsValue /$this->totalleads;
			} else  {
				$this->avg_value= 0;
			}

			if($this->totalleads != 0)
			{
				$this->percentage_of_lead_converted= ($this->Leadconverted /$this->totalleads)*100;

			}else{
				$this->percentage_of_lead_converted= 0;
			}

			if($this->Leadconverted != 0)
			{
				$this->percentage_of_deal_won= ($this->totalwondeal/$this->Leadconverted)*100;

			}else 
			{
				$this->percentage_of_deal_won= 0;
			}

			if($this->Leadconverted != 0)
			{
				$this->percentage_of_deal_lost= ($this->totalostdeal/$this->Leadconverted)*100;

			}else 
			{
				$this->percentage_of_deal_lost= 0;
			}

			if($this->totalwondeal != 0)
			{
				$this->percentage_of_deal_getting_rejected= ($this->rejectedbyPm/$this->totalwondeal)*100;

			}else 
			{
				$this->percentage_of_deal_getting_rejected= 0;
			}
			//dd($this->percentage_of_deal_lost);


			// $this->minLeadValue= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->select('bid_value')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('');
			$this->convertedLead = Lead::where([
				'added_by' => $this->user->id,
				'status_id' => 3,
			])->whereDate('created_at', Carbon::today())->get();

			$this->totalLeads = Lead::where('added_by', $this->user->id)->whereBetween('created_at', [$this->startDate, $this->endDate])->get();
			$this->totalDeals = Deal::where('added_by', $this->user->id)->whereBetween('created_at', [$this->startDate, $this->endDate])->get();
			// dd($this->totalDeals);

			$this->lostLeads = Lead::select('leads.*')->join('deal_stages', 'deal_stages.lead_id', '=', 'leads.id')->where('leads.added_by', $this->user->id)->whereBetween('leads.created_at', [$this->startDate, $this->endDate])->orderBy('leads.id', 'desc')->get();
			$html = view('dashboard.ajax.salesexecutive.general', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
		} else {
			$this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();

		    $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
		    $startDate = $this->startDate->toDateString();
		    $endDate = $this->endDate->toDateString();

		    $this->viewEventPermission = user()->permission('view_events');
	        $this->viewNoticePermission = user()->permission('view_notice');
	        $this->editTimelogPermission = user()->permission('edit_timelogs');
	        $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
	        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
	            return $value->status == '1';
	        })->pluck('widget_name')->toArray();
	        // Getting Attendance setting data


	        if (!is_null($this->viewNoticePermission) && $this->viewNoticePermission != 'none') {
	            if ($this->viewNoticePermission == 'added') {
	                $this->notices = Notice::latest()->where('added_by', $this->user->id)
	                ->select('id', 'heading', 'created_at')
	                ->limit(10)
	                ->get();
	            }
	            elseif ($this->viewNoticePermission == 'owned') {
	                $this->notices = Notice::latest()
	                ->select('id', 'heading', 'created_at')
	                ->where(['to' => 'employee', 'department_id' => null])
	                ->orWhere(['department_id' => $this->user->employeeDetails->department_id])
	                ->limit(10)
	                ->get();
	            }
	            elseif ($this->viewNoticePermission == 'both') {
	                $this->notices = Notice::latest()
	                ->select('id', 'heading', 'created_at')
	                ->where('added_by', $this->user->id)
	                ->orWhere(function ($q) {
	                    $q->where(['to' => 'employee', 'department_id' => null])
	                    ->orWhere(['department_id' => $this->user->employeeDetails->department_id]);
	                })
	                ->limit(10)
	                ->get();
	            }
	            elseif ($this->viewNoticePermission == 'all') {
	                $this->notices = Notice::latest()
	                ->select('id', 'heading', 'created_at')
	                ->limit(10)
	                ->get();
	            }
	        }
	        

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


			$this->todayLead = Lead::where('added_by', Auth::id())->whereDate('created_at', Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();
			$this->todayLeadcount= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->today_bid_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			if($this->todayLeadcount != 0)
			{
				$this->avg_bid_value= $this->today_bid_value /$this->todayLeadcount;
			} else 
			{
				$this->avg_bid_value= 0;
			}
			$this->today_min_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value');
			$this->today_max_lead_value= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('bid_value2');
			if($this->todayLeadcount != 0)
			{
				$this->avg_minlead_value= $this->today_min_lead_value /$this->todayLeadcount;
				$this->avg_maxlead_value= $this->today_max_lead_value /$this->todayLeadcount;
				$this->avg_lead_value = ($this->avg_minlead_value + $this->avg_maxlead_value)/2;
			}else 
			{
				$this->avg_minlead_value= 0;
				$this->avg_maxlead_value= 0;
				$this->avg_lead_value= 0;

			}
			$this->todayLeadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->todayLeadconvertedValue= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereDate('created_at',Carbon::today())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->Leadconverted= Lead::where('added_by',Auth::id())->where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalbidsValue= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('value');
			$this->totalleads= Lead::where('added_by',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalwondeal= DealStage::where('added_by',Auth::id())->where('won_lost','Yes')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->totalostdeal= DealStage::where('added_by',Auth::id())->where('won_lost','No')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			$this->rejectedbyPm= Deal::where('added_by',Auth::id())->where('status','Denied')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
			//dd($this->totalostdeal);

			if($this->totalleads != 0) {
				$this->avg_value= $this->totalbidsValue /$this->totalleads;
			} else  {
				$this->avg_value= 0;
			}

			if($this->totalleads != 0)
			{
				$this->percentage_of_lead_converted= ($this->Leadconverted /$this->totalleads)*100;

			}else{
				$this->percentage_of_lead_converted= 0;
			}

			if($this->Leadconverted != 0)
			{
				$this->percentage_of_deal_won= ($this->totalwondeal/$this->Leadconverted)*100;

			}else 
			{
				$this->percentage_of_deal_won= 0;
			}

			if($this->Leadconverted != 0)
			{
				$this->percentage_of_deal_lost= ($this->totalostdeal/$this->Leadconverted)*100;

			}else 
			{
				$this->percentage_of_deal_lost= 0;
			}

			if($this->totalwondeal != 0)
			{
				$this->percentage_of_deal_getting_rejected= ($this->rejectedbyPm/$this->totalwondeal)*100;

			}else 
			{
				$this->percentage_of_deal_getting_rejected= 0;
			}
			//dd($this->percentage_of_deal_lost);


			// $this->minLeadValue= Lead::where('added_by',Auth::id())->whereDate('created_at',Carbon::today())->select('bid_value')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('');
			$this->convertedLead = Lead::where([
				'added_by' => $this->user->id,
				'status_id' => 3,
			])->whereDate('created_at', Carbon::today())->get();

			$this->totalLeads = Lead::where('added_by', $this->user->id)->whereBetween('created_at', [$this->startDate, $this->endDate])->get();
			$this->totalDeals = Deal::where('added_by', $this->user->id)->whereBetween('created_at', [$this->startDate, $this->endDate])->get();
			// dd($this->totalDeals);

			$this->lostLeads = Lead::select('leads.*')->join('deal_stages', 'deal_stages.lead_id', '=', 'leads.id')->where('leads.added_by', $this->user->id)->whereBetween('leads.created_at', [$this->startDate, $this->endDate])->orderBy('leads.id', 'desc')->get();

			return view('dashboard.employee.sales_executive', $this->data);
		}
	}
}