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
use App\Models\ProjectMilestone;
use App\Models\Invoice;
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
use Illuminate\Database\Eloquent\Builder;

/**
 *
 */
trait PmDashboard
{

    /**
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function PmDashboard()
    {
       // dd("kdaskdnaslkdnlkasdnlkas");
        if (request('mode') == 'today' && request()->ajax()) {
            $this->today_project_deadline = Project::where([
                'pm_id' => $this->user->id,
                'deadline' => request('startDate')
            ])->get();

            $this->today_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereDate('tasks.updated_at', request('startDate'))
            ->count();

            $this->today_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereDate('tasks.updated_at', request('startDate'))
            ->count();

            $this->today_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.due_date' => request('startDate'),
                'tasks.added_by' => $this->user->id
            ])
            ->count();

            $this->today_completed_milestone = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereDate('project_milestones.updated_at',request('startDate'))
            ->count();

            $this->today_invoice_created = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereDate('invoices.created_at', request('startDate'))
            ->count();

            $this->today_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereDate('payments.paid_on', request('startDate'))
            ->sum('payments.amount');

            $this->today_qc_required_submission = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->today_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereDate('project_milestones.updated_at', request('startDate'))
            ->count();

            $startDate = Carbon::createFromFormat('Y-m-d', request('startDate'));
            $this->today_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
            ])->whereDate('updated_at', $startDate)->get();

            $this->today_canceled_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'canceled',
            ])
            ->whereDate('project_milestones.updated_at', request('startDate'))
            ->count();

            $this->completion_form_pending = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 2
            ])->whereDate('project_milestones.updated_at', request('startDate'))
            ->count();

            $this->qc_form_pending = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 2
            ])->whereDate('project_milestones.updated_at', request('startDate'))
            ->count();


            $html = view('dashboard.ajax.pmdashboard.today', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]);
        } else if (request('mode') == 'month' && request()->ajax()) {
          //  dd(request());
            $date = Carbon::createFromFormat('Y-m-d', request('startDate'));
           // dd($date);

            $this->startMonth = $date->startOfMonth()->addDays(15)->toDateString(); 
            $this->endMonth = $date->startOfMonth()->addMonth(1)->addDays(15)->toDateString(); 
            $this->release_date = $date->endofMonth()->toDateString(); 
            

           // dd($this->startMonth,$this->endMonth, $this->release_date);
           $this->no_of_projects = Project::select('projects.*')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           //dd($this->no_of_projects );
         //dd(count($this->no_of_projects));
           $this->no_of_accepted_projects= Project::select('projects.*')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
           ->where('projects.project_status','Accepted')
           
          // ->orWhere('project_status','pending')
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           $this->no_of_rejected_projects= Project::select('projects.*')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           ->where('projects.project_status','Not Accepted')
           
           
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           $this->total_project_value = Project::select('projects.*')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
          
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->sum('projects.project_budget');
           $this->accepted_project_value= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Accepted')
           
           
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->rejected_project_value= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Not Accepted')
           
            
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->total_released_amount_this_cycle = Project::select('projects.*')
          
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           // ->groupBy('project_milestones.id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_this_cycle_get = Project::select('projects.*','project_milestones.milestone_title as milestone_title', 'project_milestones.created_at as milestone_creation_date','payments.paid_on as milestone_released_date','project_milestones.cost as milestone_cost')
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           
           // ->take(2)
            ->get();
            $this->total_released_amount_previous_cycle = Project::select('projects.*')
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.id')
           //->groupBy('project_milestones.id')
            ->where('projects.pm_id', Auth::id())
            ->whereNotBetween('project_milestones.created_at', [$this->endMonth,$this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
            
            ->sum('project_milestones.cost');
            $this->total_released_amount_previous_cycle_get = Project::select('projects.*','project_milestones.id as milestone_id','project_milestones.milestone_title as milestone_title', 'project_milestones.created_at as milestone_creation_date','payments.paid_on as milestone_released_date','project_milestones.cost as milestone_cost')
          
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
            
         
        //    / ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
             ->whereNotBetween('project_milestones.created_at', [$this->endMonth,$this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           // ->take(2)
          
           ->orderBy('project_milestones.created_at','desc')
            ->get();
            $this->no_of_finished_projects_this_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
           
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->no_of_finished_projects_previous_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
           
            //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->value_of_finished_projects_this_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->value_of_finished_projects_previous_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->where('projects.status','finished')
            //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_this_cycle = Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->leftJoin('project_milestones', function ($join) {
                $join->on('projects.id', '=', 'project_milestones.project_id')
                    ->where('project_milestones.status','<>', 'complete')
                    ->where('project_milestones.project_completion_status', 0)
                    ->where('project_milestones.qc_status', 0);
            })
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status', 'in progress')
            ->whereNull('project_milestones.id')
            
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->leftJoin('project_milestones', function ($join) {
                $join->on('projects.id', '=', 'project_milestones.project_id')
                    ->where('project_milestones.status','<>', 'complete')
                    ->where('project_milestones.project_completion_status', 0)
                    ->where('project_milestones.qc_status', 0);
            })
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status', 'in progress')
            
            ->whereNull('project_milestones.id')
           // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
            ->get();
            if (count($this->no_of_projects) > 0 ) {
                $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_projects)) )*100;
                $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
            }else {
                $this->project_completion_rate_count_this_cycle= 0;
                $this->project_completion_rate_count_previous_cycle = 0;
    
            }
            if (($this->total_project_value) > 0 ) {
                $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->total_project_value) )*100;
                $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->total_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
            }else {
                $this->project_completion_rate_count_this_cycle_value= 0;
                $this->project_completion_rate_count_previous_cycle_value = 0;
    
            }
            $this->no_of_new_clients_this_cycle = Project::select('clients.*','deals.client_badge')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->join('deals', 'deals.client_id', 'projects.client_id')
            ->join('users as clients','clients.id','projects.client_id')
            ->where('projects.pm_id', Auth::id())
            ->where('deals.client_badge','new client')
            ->groupBy('clients.id')
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('clients.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->no_of_existing_clients_this_cycle = Project::select('clients.*','deals.client_badge')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->join('deals', 'deals.client_id', 'projects.client_id')
            ->join('users as clients','clients.id','projects.client_id')
            ->where('projects.pm_id', Auth::id())
            ->where('deals.client_badge','<>','new client')
            ->groupBy('clients.id')
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->total_milestone_assigned_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->total_milestone_assigned_this_cycle_value= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->sum('project_milestones.cost');
            $this->total_milestone_completed_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
            ->whereBetween('project_milestones.updated_at', [$this->startMonth, $this->endMonth])
            
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
           // ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
            
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            if (count($this->total_milestone_assigned_this_cycle) > 0 ) {
                $this->milestone_completion_rate_count_this_cycle=  ((count($this->total_milestone_completed_this_cycle))/(count($this->total_milestone_assigned_this_cycle)) )*100;
                $this->milestone_completion_rate_count_previous_cycle = ((count($this->total_milestone_completed_previous_cycle)) / ((count($this->total_milestone_assigned_this_cycle))+(count($this->total_milestone_completed_previous_cycle))- (count($this->total_milestone_completed_this_cycle))) * 100);
            }else {
                $this->milestone_completion_rate_count_this_cycle= 0;
                $this->milestone_completion_rate_count_previous_cycle = 0;
    
            }
            if ($this->total_milestone_assigned_this_cycle_value > 0 ) {
                $this->milestone_completion_rate_value_this_cycle=  (($this->total_released_amount_this_cycle)/($this->total_milestone_assigned_this_cycle_value) )*100;
                $this->milestone_completion_rate_value_previous_cycle = (($this->total_released_amount_previous_cycle) / (($this->total_milestone_assigned_this_cycle_value)+($this->total_released_amount_previous_cycle)- ($this->total_released_amount_this_cycle)) * 100);
            }else {
                $this->milestone_completion_rate_value_this_cycle= 0;
                $this->milestone_completion_rate_value_previous_cycle = 0;
    
            }
           
            //dd($this->no_of_new_clients_this_cycle);
           
           
          //  dd($this->total_released_amount_this_cycle_get,$this->total_released_amount_previous_cycle_get);
            
            $this->month_no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$this->startMonth, $this->endMonth])->count();
            
            $this->month_no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$this->startMonth, $this->endMonth])->count();
            
            $this->month_total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$this->startMonth, $this->endMonth])->sum('project_budget');
           
            $this->month_total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', $this->startMonth)
            ->where(DB::raw('DATE(updated_at)'), '<=', $this->endMonth)
            ->sum('milestone_paid');

            $this->month_total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->count();
            $this->month_total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->count();
            $this->month_total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->count();
            $this->month_total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->count();
            $this->month_total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->count();
            
            //dd($total_completed_project_on_time);
            
            if ($this->month_total_projects > 0) {
                $this->month_percentage_of_complete_project_count= $this->month_total_completed_project/$this->month_total_projects*100;
                $this->month_percentage_of_canceled_project_count= $this->month_total_canceled_project/$this->month_total_projects*100;

                $this->month_percentage_of_onhold_project_count= $this->month_total_onhold_project/$this->month_total_projects*100;
            } else {
                $this->month_percentage_of_complete_project_count = 0;
                $this->month_percentage_of_canceled_project_count = 0;

                $this->month_percentage_of_onhold_project_count= 0;
            }

            if ($this->month_total_completed_project > 0) {
                $this->month_percentage_of_completed_ontime_project_count= $this->month_total_completed_project_on_time/$this->month_total_completed_project*100;
            } else {
                $this->month_percentage_of_completed_ontime_project_count= 0;
            }

            $this->month_avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startMonth, $this->endMonth])->avg('project_completion_days');
            //dd($startMonth, $endMonth);
            $this->month_total_project = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$this->startMonth, $this->endMonth])
            ->count();

            $this->month_total_project_value = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$this->startMonth, $this->endMonth])
            ->sum('project_budget');

            $this->month_project_got_completed = Project::where('pm_id', $this->user->id)
            ->where('status', 'finished')
            ->whereBetween('start_date', [$this->startMonth, $this->endMonth])
            ->count();

            if($this->month_total_project > 0 && $this->month_project_got_completed > 0){
                $this->month_project_got_completed_percentage = ($this->month_project_got_completed / $this->month_total_project) * 100;
                $this->month_project_got_completed_percentage = round($this->month_project_got_completed_percentage, 2);
            } else {
                $this->month_project_got_completed_percentage = 0.00;
            }

            $this->month_project_got_canceled = Project::where('pm_id', $this->user->id)
            ->where('status', 'canceled')
            ->whereBetween('start_date', [$this->startMonth, $this->endMonth])
            ->count();

            if($this->month_total_project > 0 && $this->month_project_got_canceled > 0){
                $this->month_project_got_canceled_percentage = ($this->month_project_got_canceled / $this->month_total_project) * 100;
                $this->month_project_got_canceled_percentage = round($this->month_project_got_canceled_percentage, 2);
            } else {
                $this->month_project_got_canceled_percentage = 0.00;
            }

            
            $this->month_project_deadline = Project::where([
                'pm_id' => $this->user->id,
            ])->whereBetween('deadline', [$this->startMonth, $this->endMonth])->get();

            $this->month_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->endMonth])
            ->count();

            $this->month_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->endMonth])
            ->count();

            $this->month_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.due_date', [$this->startMonth, $this->endMonth])
            ->count();

            $this->month_completed_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereBetween('project_milestones.updated_at', [$this->startMonth, $this->endMonth])
            ->count('project_milestones.id');

            $this->month_invoice_created = Invoice::join('project_milestones', 'invoices.milestone_id', 'project_milestones.invoice_id')
            ->join('projects', 'invoices.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereBetween('invoices.created_at', [$this->startMonth, $this->endMonth])
            ->count();

            /*$this->month_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereBetween('payments.paid_on', [$startMonth, $endMonth])
            ->sum('payments.amount');*/

            $this->month_payment_release = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'finished',
            ])
            ->whereBetween('payment_release_date', [$this->startMonth, $this->endMonth])
            ->sum('milestone_paid');

            $this->month_qc_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->month_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereBetween('project_milestones.updated_at', [$this->startMonth, $this->endMonth])
            ->count();

            $this->month_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
            ])->whereBetween('updated_at', [$this->startMonth, $this->endMonth])->get();
            $this->month_task_status = Task::where([
                'added_by' => $this->user->id,
               // 'board_column_id' => 'in progress',
            ])->whereIn('board_column_id',[1,2,3,6,7])->whereBetween('updated_at', [$this->startMonth, $this->endMonth])->get();

            $this->month_partially_finished_project = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'partially finished'
            ])->whereBetween('updated_at', [$this->startMonth, $this->endMonth])->get();

            $this->month_project_milestone_total = Project::join('project_milestones', 'projects.id', 'project_milestones.project_id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'invoices.status' => 'paid',
            ])->whereBetween('invoices.updated_at', [$this->startMonth, $this->endMonth])->sum('project_milestones.cost');
            
            
            $this->month_project_milestone = Project::where([
                'pm_id' => $this->user->id
            ])->whereBetween('updated_at', [$this->startMonth, $this->endMonth])->get();            

            $this->month_total_milestone_count = 0;
            $this->month_qc_pending_count = 0;
            $this->month_completion_pending_count = 0;

            foreach ($this->month_project_milestone as $value) {
                $this->month_total_milestone_count = $this->month_total_milestone_count + $value->milestones()->count();
                $this->month_qc_pending_count = $this->month_qc_pending_count + $value->milestones->where('qc_status', 2)->count();
                $this->month_completion_pending_count = $this->month_completion_pending_count + $value->milestones->where('project_completion_status', 2)->count();
            }
          //  dd($this->data);

            $html = view('dashboard.ajax.pmdashboard.month', $this->data)->render();
           // dd($html);

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]); 
        } else if (request('mode') == 'general' && request()->ajax()) {
           // dd(request('startDate'));
            $startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate'))->startOfDay() : now($this->global->timezone)->startOfMonth();
            $endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate'))->startOfDay() : now($this->global->timezone);

            $this->general_no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
            
            $this->general_no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
            
            $this->general_total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('project_budget');
           
            $this->general_total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', $startDate)
            ->where(DB::raw('DATE(updated_at)'), '<=', $endDate)
            ->sum('milestone_paid');

            $this->general_total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->general_total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->general_total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->general_total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->general_total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            
            //dd($total_completed_project_on_time);
            
            if ($this->general_total_projects > 0) {
                $this->general_percentage_of_complete_project_count= $this->general_total_completed_project/$this->general_total_projects*100;
                $this->general_percentage_of_canceled_project_count= $this->general_total_canceled_project/$this->general_total_projects*100;

                $this->general_percentage_of_onhold_project_count= $this->general_total_onhold_project/$this->general_total_projects*100;
            } else {
                $this->general_percentage_of_complete_project_count = 0;
                $this->general_percentage_of_canceled_project_count = 0;

                $this->general_percentage_of_onhold_project_count= 0;
            }

            if ($this->general_total_completed_project > 0) {
                $this->general_percentage_of_completed_ontime_project_count= $this->general_total_completed_project_on_time/$this->general_total_completed_project*100;
            } else {
                $this->general_percentage_of_completed_ontime_project_count= 0;
            }

            $this->general_avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->avg('project_completion_days');
            //dd($startMonth, $endMonth);
            $this->general_total_project = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startDate, $endDate])
            ->count();

            $this->general_total_project_value = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startDate, $endDate])
            ->sum('project_budget');

            $this->general_project_got_completed = Project::where('pm_id', $this->user->id)
            ->where('status', 'finished')
            ->whereBetween('start_date', [$startDate, $endDate])
            ->count();

            if($this->general_total_project > 0 && $this->general_project_got_completed > 0){
                $this->general_project_got_completed_percentage = ($this->general_project_got_completed / $this->general_total_project) * 100;
                $this->general_project_got_completed_percentage = round($this->general_project_got_completed_percentage, 2);
            } else {
                $this->general_project_got_completed_percentage = 0.00;
            }

            $this->general_project_got_canceled = Project::where('pm_id', $this->user->id)
            ->where('status', 'canceled')
            ->whereBetween('start_date', [$startDate, $endDate])
            ->count();

            if($this->general_total_project > 0 && $this->general_project_got_canceled > 0){
                $this->general_project_got_canceled_percentage = ($this->general_project_got_canceled / $this->general_total_project) * 100;
                $this->general_project_got_canceled_percentage = round($this->general_project_got_canceled_percentage, 2);
            } else {
                $this->general_project_got_canceled_percentage = 0.00;
            }

            
            $this->general_project_deadline = Project::where([
                'pm_id' => $this->user->id,
            ])->whereBetween('deadline', [$startDate, $endDate])->get();

            $this->general_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereBetween('tasks.updated_at', [$startDate, $endDate])
            ->count();

            $this->general_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.updated_at', [$startDate, $endDate])
            ->count();

            $this->general_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.due_date', [$startDate, $endDate])
            ->count();

            $this->general_completed_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereBetween('project_milestones.updated_at', [$startDate, $endDate])
            ->count('project_milestones.id');

            $this->general_invoice_created = Invoice::join('project_milestones', 'invoices.milestone_id', 'project_milestones.invoice_id')
            ->join('projects', 'invoices.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereBetween('invoices.created_at', [$startDate, $endDate])
            ->count();

            /*$this->general_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereBetween('payments.paid_on', [$startMonth, $endMonth])
            ->sum('payments.amount');*/

            $this->general_payment_release = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'finished',
            ])
            ->whereBetween('payment_release_date', [$startDate, $endDate])
            ->sum('milestone_paid');

            $this->general_qc_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->general_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereBetween('project_milestones.updated_at', [$startDate, $endDate])
            ->count();

            $this->general_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
            ])->whereBetween('updated_at', [$startDate, $endDate])->get();
            $this->general_task_status = Task::where([
                'added_by' => $this->user->id,
               // 'board_column_id' => 'in progress',
            ])->whereIn('board_column_id',[1,2,3,6,7])->whereBetween('updated_at', [$startDate, $endDate])->get();

            $this->general_partially_finished_project = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'partially finished'
            ])->whereBetween('updated_at', [$startDate, $endDate])->get();

            $this->general_project_milestone_total = Project::join('project_milestones', 'projects.id', 'project_milestones.project_id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'invoices.status' => 'paid',
            ])->whereBetween('invoices.updated_at', [$startDate, $endDate])->sum('project_milestones.cost');
            
            
            $this->general_project_milestone = Project::where([
                'pm_id' => $this->user->id
            ])->whereBetween('updated_at', [$startDate, $endDate])->get();            

            $this->general_total_milestone_count = 0;
            $this->general_qc_pending_count = 0;
            $this->general_completion_pending_count = 0;

            foreach ($this->general_project_milestone as $value) {
                $this->general_total_milestone_count = $this->general_total_milestone_count + $value->milestones()->count();
                $this->general_qc_pending_count = $this->general_qc_pending_count + $value->milestones->where('qc_status', 2)->count();
                $this->general_completion_pending_count = $this->general_completion_pending_count + $value->milestones->where('project_completion_status', 2)->count();
            }

            $html = view('dashboard.ajax.pmdashboard.general', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]); 
        } else {
           // dd("skdaskmlkasdm");
            // $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
            // $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
          // $date= Carbon::now()->format('Y-m-d');
          $this->startMonth = Carbon::now()->startOfMonth()->addDays(15)->toDateString(); 
          $this->endMonth = Carbon::now()->startOfMonth()->addMonth(1)->addDays(14)->toDateString(); 
         // dd($this->startMonth, $this->endMonth);
            $this->viewEventPermission = user()->permission('view_events');
            $this->viewNoticePermission = user()->permission('view_notice');
            $this->editTimelogPermission = user()->permission('edit_timelogs');
            $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
            
            $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
                return $value->status == '1';
            })->pluck('widget_name')->toArray();
            
            // Getting Attendance setting data
            $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')
            ->first();

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
            $this->currentClockIn = Attendance::where(DB::raw('DATE(clock_in_time)'), now()->format('Y-m-d'))
            ->select('id', 'clock_in_time', 'clock_out_time')
            ->where('user_id', $this->user->id)
            ->whereNull('clock_out_time')
            ->first();
            /*------------------Start Today data----------------------*/

            $this->today_project_deadline = Project::where([
                'pm_id' => $this->user->id,
                'deadline' => Carbon::today()->toDateString()
            ])->get();

            $this->today_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereDate('tasks.updated_at', Carbon::today())
            ->count();

            $this->today_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereDate('tasks.updated_at', Carbon::today())
            ->count();

            $this->today_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.due_date' => Carbon::today()->toDateString(),
                'tasks.added_by' => $this->user->id
            ])
            ->count();

            $this->today_completed_milestone = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereDate('project_milestones.updated_at',Carbon::today())
            ->count();

            $this->today_invoice_created = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereDate('invoices.created_at', Carbon::today())
            ->count();

            $this->today_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereDate('payments.paid_on', Carbon::today())
            ->sum('payments.amount');

            $this->today_qc_required_submission = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->today_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereDate('project_milestones.updated_at', Carbon::today())
            ->count();


            $this->today_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
                'updated_at' => Carbon::today()
            ])->get();

            $this->today_canceled_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'canceled',
            ])
            ->whereDate('project_milestones.updated_at',Carbon::today()->toDateString())
            ->count();

            $this->completion_form_pending = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 2
            ])->whereDate('project_milestones.updated_at', Carbon::today()->toDateString())
            ->count();

            $this->qc_form_pending = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 2
            ])->whereDate('project_milestones.updated_at', Carbon::today()->toDateString())
            ->count();

            /*----------------------End today data-------------------------*/


            /*-----------------------Month data--------------------------*/
            $today = Carbon::today()->format('d');
            if ($today > 15) {
                $startMonth = Carbon::now()->startOfMonth()->addDays(15)->toDateString(); 
                $endMonth = Carbon::now()->startOfMonth()->addMonth(1)->addDays(14)->toDateString();  
                $release_date = Carbon::now()->endOfMonth()->addMonth(1)->toDateString();
            } else {
                $startMonth = Carbon::now()->startOfMonth()->subMonths(1)->addDays(15)->toDateString(); 
                $endMonth = Carbon::now()->startOfMonth()->addDays(14)->toDateString(); 
                $release_date = Carbon::now()->endOfMonth()->toDateString(); 
            }
            //dd($startMonth, $endMonth,$release_date);
            $this->no_of_projects = Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
          //dd(count($this->no_of_projects));
            $this->no_of_accepted_projects= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Accepted')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
            $this->no_of_rejected_projects= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Not Accepted')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
            $this->total_project_value = Project::select('projects.*')
            ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->accepted_project_value= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Accepted')
            
          
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->rejected_project_value= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Not Accepted')
            
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->total_released_amount_this_cycle = Project::select('projects.*')
            
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
        //    / ->groupBy('project_milestones.id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_this_cycle_get = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date','project_milestones.cost as milestone_cost')
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            
            ->get();
            $this->total_released_amount_previous_cycle = Project::select('projects.*')
            
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
           ->whereNotBetween('project_milestones.created_at', [$endMonth,$release_date])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
        //    / ->groupBy('project_milestones.id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_previous_cycle_get = Project::select('projects.*','project_milestones.milestone_title as milestone_title', 'project_milestones.created_at as milestone_creation_date','payments.paid_on as milestone_released_date','project_milestones.cost as milestone_cost')
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
             ->whereNotBetween('project_milestones.created_at', [$endMonth,$release_date])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            
            ->get();
            $this->no_of_finished_projects_this_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->get();
            $this->no_of_finished_projects_previous_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->get();
            $this->value_of_finished_projects_this_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->value_of_finished_projects_previous_cycle= Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_this_cycle = Project::select('projects.*')
            
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->leftJoin('project_milestones', function ($join) {
                $join->on('projects.id', '=', 'project_milestones.project_id')
                    ->where('project_milestones.status','<>', 'complete')
                    ->where('project_milestones.project_completion_status', 0)
                    ->where('project_milestones.qc_status', 0);
            })
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status', 'in progress')
            
            ->whereNull('project_milestones.id')
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->get();
            $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->leftJoin('project_milestones', function ($join) {
                $join->on('projects.id', '=', 'project_milestones.project_id')
                    ->where('project_milestones.status','<>', 'complete')
                    ->where('project_milestones.project_completion_status', 0)
                    ->where('project_milestones.qc_status', 0);
            })
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status', 'in progress')
            ->whereNull('project_milestones.id')
            
           // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
            ->get();
            // $this->no_of_projects_complete_this_cycle = Project::select('projects.*')
            // ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            // ->where('projects.pm_id', Auth::id())
            // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            // ->get();
            
           // dd(count($this->no_of_finished_projects_this_cycle));
           if (count($this->no_of_projects) > 0 ) {
            $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_projects)) )*100;
            $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
        }else {
            $this->project_completion_rate_count_this_cycle= 0;
            $this->project_completion_rate_count_previous_cycle = 0;

        }
        if (($this->total_project_value) > 0 ) {
            $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->total_project_value) )*100;
            $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->total_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
        }else {
            $this->project_completion_rate_count_this_cycle_value= 0;
            $this->project_completion_rate_count_previous_cycle_value = 0;

        }
        $this->no_of_new_clients_this_cycle = Project::select('clients.*','deals.client_badge')
        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->join('deals', 'deals.client_id', 'projects.client_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->where('projects.pm_id', Auth::id())
        ->where('deals.client_badge','new client')
        ->groupBy('clients.id')
        ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
        ->whereBetween('clients.created_at', [$startMonth, $endMonth])
        ->get();
        $this->no_of_existing_clients_this_cycle = Project::select('clients.*','deals.client_badge')
        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->join('deals', 'deals.client_id', 'projects.client_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->where('projects.pm_id', Auth::id())
        ->where('deals.client_badge','<>','new client')
        ->groupBy('clients.id')
        ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
        ->get();
       // dd()
            $this->total_milestone_assigned_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->get();
            $this->total_milestone_assigned_this_cycle_value= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->sum('project_milestones.cost');
            $this->total_milestone_completed_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
            ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
            
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->get();
            $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
           // ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
            
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->get();
            if (count($this->total_milestone_assigned_this_cycle) > 0 ) {
                $this->milestone_completion_rate_count_this_cycle=  ((count($this->total_milestone_completed_this_cycle))/(count($this->total_milestone_assigned_this_cycle)) )*100;
                $this->milestone_completion_rate_count_previous_cycle = ((count($this->total_milestone_completed_previous_cycle)) / ((count($this->total_milestone_assigned_this_cycle))+(count($this->total_milestone_completed_previous_cycle))- (count($this->total_milestone_completed_this_cycle))) * 100);
            }else {
                $this->milestone_completion_rate_count_this_cycle= 0;
                $this->milestone_completion_rate_count_previous_cycle = 0;
    
            }

            if ($this->total_milestone_assigned_this_cycle_value > 0 ) {
                $this->milestone_completion_rate_value_this_cycle=  (($this->total_released_amount_this_cycle)/($this->total_milestone_assigned_this_cycle_value) )*100;
                $this->milestone_completion_rate_value_previous_cycle = (($this->total_released_amount_previous_cycle) / (($this->total_milestone_assigned_this_cycle_value)+($this->total_released_amount_previous_cycle)- ($this->total_released_amount_this_cycle)) * 100);
            }else {
                $this->milestone_completion_rate_value_this_cycle= 0;
                $this->milestone_completion_rate_value_previous_cycle = 0;
    
            }
        
        
        
            $this->month_no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$startMonth, $endMonth])->count();
            
            $this->month_no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$startMonth, $endMonth])->count();
            
            $this->month_total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startMonth, $endMonth])->sum('project_budget');
           
            $this->month_total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', $startMonth)
            ->where(DB::raw('DATE(updated_at)'), '<=', $endMonth)
            ->sum('milestone_paid');

            $this->month_total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->count();
            $this->month_total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->count();
            $this->month_total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->count();
            $this->month_total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->count();
            $this->month_total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->count();
            
            //dd($total_completed_project_on_time);
            
            if ($this->month_total_projects > 0) {
                $this->month_percentage_of_complete_project_count= $this->month_total_completed_project/$this->month_total_projects*100;
                $this->month_percentage_of_canceled_project_count= $this->month_total_canceled_project/$this->month_total_projects*100;

                $this->month_percentage_of_onhold_project_count= $this->month_total_onhold_project/$this->month_total_projects*100;
            } else {
                $this->month_percentage_of_complete_project_count = 0;
                $this->month_percentage_of_canceled_project_count = 0;

                $this->month_percentage_of_onhold_project_count= 0;
            }

            if ($this->month_total_completed_project > 0) {
                $this->month_percentage_of_completed_ontime_project_count= $this->month_total_completed_project_on_time/$this->month_total_completed_project*100;
            } else {
                $this->month_percentage_of_completed_ontime_project_count= 0;
            }

            $this->month_avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->avg('project_completion_days');
            //dd($startMonth, $endMonth);
            $this->month_total_project = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startMonth, $endMonth])
            ->count();

            $this->month_total_project_value = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startMonth, $endMonth])
            ->sum('project_budget');

            $this->month_project_got_completed = Project::where('pm_id', $this->user->id)
            ->where('status', 'finished')
            ->whereBetween('start_date', [$startMonth, $endMonth])
            ->count();

            if($this->month_total_project > 0 && $this->month_project_got_completed > 0){
                $this->month_project_got_completed_percentage = ($this->month_project_got_completed / $this->month_total_project) * 100;
                $this->month_project_got_completed_percentage = round($this->month_project_got_completed_percentage, 2);
            } else {
                $this->month_project_got_completed_percentage = 0.00;
            }

            $this->month_project_got_canceled = Project::where('pm_id', $this->user->id)
            ->where('status', 'canceled')
            ->whereBetween('start_date', [$startMonth, $endMonth])
            ->count();

            if($this->month_total_project > 0 && $this->month_project_got_canceled > 0){
                $this->month_project_got_canceled_percentage = ($this->month_project_got_canceled / $this->month_total_project) * 100;
                $this->month_project_got_canceled_percentage = round($this->month_project_got_canceled_percentage, 2);
            } else {
                $this->month_project_got_canceled_percentage = 0.00;
            }

            
            $this->month_project_deadline = Project::where([
                'pm_id' => $this->user->id,
            ])->whereBetween('deadline', [$startMonth, $endMonth])->get();

            $this->month_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereBetween('tasks.updated_at', [$startMonth, $endMonth])
            ->count();

            $this->month_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.updated_at', [$startMonth, $endMonth])
            ->count();

            $this->month_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.due_date', [$startMonth, $endMonth])
            ->count();

            $this->month_completed_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
            ->count('project_milestones.id');

            $this->month_invoice_created = Invoice::join('project_milestones', 'invoices.milestone_id', 'project_milestones.invoice_id')
            ->join('projects', 'invoices.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereBetween('invoices.created_at', [$startMonth, $endMonth])
            ->count();

            /*$this->month_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereBetween('payments.paid_on', [$startMonth, $endMonth])
            ->sum('payments.amount');*/

            $this->month_payment_release = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'finished',
            ])
            ->whereBetween('payment_release_date', [$startMonth, $endMonth])
            ->sum('milestone_paid');

            $this->month_qc_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->month_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
            ->count();

            $this->month_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
            ])->whereBetween('updated_at', [$startMonth, $endMonth])->get();

            $this->month_task_status = Task::where([
                'added_by' => $this->user->id,
               // 'board_column_id' => 'in progress',
            ])->whereIn('board_column_id',[1,2,3,6,7])->whereBetween('updated_at', [$startMonth, $endMonth])->get();

            $this->month_partially_finished_project = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'partially finished'
            ])->whereBetween('updated_at', [$startMonth, $endMonth])->get();

            $this->month_project_milestone_total = Project::join('project_milestones', 'projects.id', 'project_milestones.project_id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'invoices.status' => 'paid',
            ])->whereBetween('invoices.updated_at', [$startMonth, $endMonth])->sum('project_milestones.cost');
            
            
            /*$this->month_project_milestone = Project::join('project_milestones', 'projects.id', 'project_milestones.project_id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'invoices.status' => 'paid',
            ])->whereBetween('invoices.updated_at', [$startMonth, $endMonth])->get();    */  
            $this->month_project_milestone = Project::where([
                'pm_id' => $this->user->id
            ])->whereBetween('updated_at', [$startMonth, $endMonth])->get();            

            $this->month_total_milestone_count = 0;
            $this->month_qc_pending_count = 0;
            $this->month_completion_pending_count = 0;

            foreach ($this->month_project_milestone as $value) {
                $this->month_total_milestone_count = $this->month_total_milestone_count + $value->milestones()->count();
                $this->month_qc_pending_count = $this->month_qc_pending_count + $value->milestones->where('qc_status', 2)->count();
                $this->month_completion_pending_count = $this->month_completion_pending_count + $value->milestones->where('project_completion_status', 2)->count();
            }


            /*$this->month_total_milestone = Project::join('project_milestones', 'projects.milestone_id', 'project_milestones.id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
                'invoices.status' => 'paid'
            ])->whereBetween('invoices.updated_at', [$startMonth, $endMonth])->get();
            dd($this->month_total_milestone);
            $this->month_total_milestone_release = 0;

            foreach ($this->month_total_milestone as $value) {
                
            }*/
            /*-------------------------Month data end----------------------------*/

            /*-----------------------------General view start------------------------------------*/
            $startYears = Carbon::now()->subMonths(12);
            $endYears = Carbon::now();

            $this->general_no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$startYears, $endYears])->count();
            
            $this->general_no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$startYears, $endYears])->count();
            
            $this->general_total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startYears, $endYears])->sum('project_budget');
           
            $this->general_total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', $startYears)
            ->where(DB::raw('DATE(updated_at)'), '<=', $endYears)
            ->sum('milestone_paid');

            $this->general_total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startYears, $endYears])->count();
            $this->general_total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startYears, $endYears])->count();
            $this->general_total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startYears, $endYears])->count();
            $this->general_total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startYears, $endYears])->count();
            $this->general_total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startYears, $endYears])->count();
            
            //dd($total_completed_project_on_time);
            
            if ($this->general_total_projects > 0) {
                $this->general_percentage_of_complete_project_count= $this->general_total_completed_project/$this->general_total_projects*100;
                $this->general_percentage_of_canceled_project_count= $this->general_total_canceled_project/$this->general_total_projects*100;

                $this->general_percentage_of_onhold_project_count= $this->general_total_onhold_project/$this->general_total_projects*100;
            } else {
                $this->general_percentage_of_complete_project_count = 0;
                $this->general_percentage_of_canceled_project_count = 0;

                $this->general_percentage_of_onhold_project_count= 0;
            }

            if ($this->general_total_completed_project > 0) {
                $this->general_percentage_of_completed_ontime_project_count= $this->general_total_completed_project_on_time/$this->general_total_completed_project*100;
            } else {
                $this->general_percentage_of_completed_ontime_project_count= 0;
            }

            $this->general_avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startMonth, $endMonth])->avg('project_completion_days');
            //dd($startMonth, $endMonth);
            $this->general_total_project = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startYears, $endYears])
            ->count();

            $this->general_total_project_value = Project::where('pm_id', $this->user->id)
            ->whereBetween('start_date', [$startYears, $endYears])
            ->sum('project_budget');

            $this->general_project_got_completed = Project::where('pm_id', $this->user->id)
            ->where('status', 'finished')
            ->whereBetween('start_date', [$startYears, $endYears])
            ->count();

            if($this->general_total_project > 0 && $this->general_project_got_completed > 0){
                $this->general_project_got_completed_percentage = ($this->general_project_got_completed / $this->general_total_project) * 100;
                $this->general_project_got_completed_percentage = round($this->general_project_got_completed_percentage, 2);
            } else {
                $this->general_project_got_completed_percentage = 0.00;
            }

            $this->general_project_got_canceled = Project::where('pm_id', $this->user->id)
            ->where('status', 'canceled')
            ->whereBetween('start_date', [$startYears, $endYears])
            ->count();

            if($this->general_total_project > 0 && $this->general_project_got_canceled > 0){
                $this->general_project_got_canceled_percentage = ($this->general_project_got_canceled / $this->general_total_project) * 100;
                $this->general_project_got_canceled_percentage = round($this->general_project_got_canceled_percentage, 2);
            } else {
                $this->general_project_got_canceled_percentage = 0.00;
            }

            
            $this->general_project_deadline = Project::where([
                'pm_id' => $this->user->id,
            ])->whereBetween('deadline', [$startYears, $endYears])->get();

            $this->general_milestoe_to_be_completed = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.status' => 'completed',
            ])
            ->whereBetween('tasks.updated_at', [$startYears, $endYears])
            ->count();

            $this->general_tasks_under_review = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.board_column_id' => 6,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.updated_at', [$startYears, $endYears])
            ->count();

            $this->general_tasks_deadline = Project::select('tasks.*')
            ->join('tasks', 'projects.id', 'tasks.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'tasks.added_by' => $this->user->id
            ])
            ->whereBetween('tasks.due_date', [$startYears, $endYears])
            ->count();

            $this->general_completed_milestone = ProjectMilestone::join('projects', 'project_milestones.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.status' => 'complete',
            ])
            ->whereBetween('project_milestones.updated_at', [$startYears, $endYears])
            ->count('project_milestones.id');

            $this->general_invoice_created = Invoice::join('project_milestones', 'invoices.milestone_id', 'project_milestones.invoice_id')
            ->join('projects', 'invoices.project_id', 'projects.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.invoice_created' => 1,
            ])
            ->whereBetween('invoices.created_at', [$startYears, $endYears])
            ->count();

            /*$this->general_payment_release = Project::join('payments', 'projects.id', 'payments.project_id')
            ->where([
                'projects.pm_id' => $this->user->id,
            ])
            ->whereBetween('payments.paid_on', [$startMonth, $endMonth])
            ->sum('payments.amount');*/

            $this->general_payment_release = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'finished',
            ])
            ->whereBetween('payment_release_date', [$startYears, $endYears])
            ->sum('milestone_paid');

            $this->general_qc_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.qc_status' => 0,
                'project_milestones.status' => 'complete'
            ])
            ->groupBy('project_milestones.project_id')
            ->count();

            $this->general_completion_form_required_submission = Project::join('project_milestones', 'projects.id', 'project_milestones.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'project_milestones.project_completion_status' => 0,
            ])
            ->whereBetween('project_milestones.updated_at', [$startYears, $endYears])
            ->count();

            $this->general_project_status = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'in progress',
            ])->whereBetween('updated_at', [$startYears, $endYears])->get();
            // $this->general_task_status = Project::where([
            //     'added_by' => $this->user->id,
            //     'status' => 'in progress',
            // ])->whereBetween('updated_at', [$startYears, $endYears])->get();
            $this->general_task_status = Task::where([
                'added_by' => $this->user->id,
               // 'board_column_id' => 'in progress',
            ])->whereIn('board_column_id',[1,2,3,6,7])->whereBetween('updated_at', [$startYears, $endYears])->get();


            $this->general_partially_finished_project = Project::where([
                'pm_id' => $this->user->id,
                'status' => 'partially finished'
            ])->whereBetween('updated_at', [$startYears, $endYears])->get();

            $this->general_project_milestone_total = Project::join('project_milestones', 'projects.id', 'project_milestones.project_id')
            ->join('invoices', 'project_milestones.invoice_id', 'invoices.id')
            ->where([
                'projects.pm_id' => $this->user->id,
                'invoices.status' => 'paid',
            ])->whereBetween('invoices.updated_at', [$startYears, $endYears])->sum('project_milestones.cost');
            
            
            $this->general_project_milestone = Project::where([
                'pm_id' => $this->user->id
            ])->whereBetween('updated_at', [$startYears, $endYears])->get();            

            $this->general_total_milestone_count = 0;
            $this->general_qc_pending_count = 0;
            $this->general_completion_pending_count = 0;

            foreach ($this->general_project_milestone as $value) {
                $this->general_total_milestone_count = $this->general_total_milestone_count + $value->milestones()->count();
                $this->general_qc_pending_count = $this->general_qc_pending_count + $value->milestones->where('qc_status', 2)->count();
                $this->general_completion_pending_count = $this->general_completion_pending_count + $value->milestones->where('project_completion_status', 2)->count();
            }


            /*-----------------------------General view end------------------------------------*/
            //dd($this->today_project_status);

            //dd($this->today_tasks_under_review, Carbon::today()->subDay(16));
            /*$this->today_no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->where(DB::raw('DATE(`created_at`)'), Carbon::today())->count();
            $this->today_no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->where(DB::raw('DATE(`created_at`)'), Carbon::today())->count();
            $this->today_total_project_value= Project::where('pm_id',Auth::id())->where(DB::raw('DATE(`created_at`)'), Carbon::today())->sum('project_budget');

            $this->today_total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', Carbon::today())
            ->where(DB::raw('DATE(updated_at)'), '<=', Carbon::today())
            ->sum('milestone_paid');

            $this->today_total_projects= Project::where('pm_id',Auth::id())->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->count();
            $this->today_total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->count();
            $this->today_total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->count();
            
            $this->today_total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->count();
            
            $this->today_total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->count();

            if ($this->today_total_projects > 0) {
                $this->today_percentage_of_complete_project_count= $this->today_total_completed_project/$this->today_total_projects*100;
                $this->today_percentage_of_canceled_project_count= $this->today_total_canceled_project/$this->today_total_projects*100;

                $this->today_percentage_of_onhold_project_count= $this->today_total_onhold_project/$this->today_total_projects*100;
            } else {
                $this->today_percentage_of_complete_project_count = 0;
                $this->today_percentage_of_canceled_project_count = 0;

                $this->today_percentage_of_onhold_project_count= 0;
            }
            if ($this->today_total_completed_project > 0) {
                $this->today_percentage_of_completed_ontime_project_count= $this->today_total_completed_project_on_time/$this->today_total_completed_project*100;
            } else {
                $this->today_percentage_of_completed_ontime_project_count= 0;
            }

            $this->today_avg_project_completion_time= Project::where('pm_id',Auth::id())->where(DB::raw('DATE(`updated_at`)'), Carbon::today())->avg('project_completion_days');
            
            $this->today_pm_projects= Project::where('pm_id',Auth::id())->where(DB::raw('DATE(`created_at`)'), Carbon::today())->get();

            $this->today_tasks= Task::where('added_by',Auth::id())->orderBy('id','desc')->where(DB::raw('DATE(`created_at`)'), Carbon::today())->get();*/


            /*----------------End Today data------------------*/
            /*----------------Start Monthly data------------------*/
            /*$this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();

            $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
            $startDate = $this->startDate->toDateString();
            $endDate = $this->endDate->toDateString();
            $completedTaskColumn = TaskboardColumn::completeColumn();
            $showClockIn = AttendanceSetting::first();

            $this->attendanceSettings = $this->attendanceShift($showClockIn);

            $startTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_start_time;
            $endTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_end_time;
            $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $this->global->timezone);
            $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $this->global->timezone);

            $officeStartTime = $officeStartTime->setTimezone('UTC');
            $officeEndTime = $officeEndTime->setTimezone('UTC');

            if ($officeStartTime->gt($officeEndTime)) {
                $officeEndTime->addDay();
            }

            $this->cannotLogin = false;

            if ($showClockIn->employee_clock_in_out == 'yes') {
                if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                    $this->cannotLogin = true;
                }

                if ($this->cannotLogin == true && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                    $this->cannotLogin = false;
                }
            } else {
                $this->cannotLogin = true;
            }

            $this->viewEventPermission = user()->permission('view_events');
            $this->viewNoticePermission = user()->permission('view_notice');
            $this->editTimelogPermission = user()->permission('edit_timelogs');

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

            $this->totalProjects = Project::select('projects.id')
                ->join('project_members', 'project_members.project_id', '=', 'projects.id');
            $this->totalProjects = $this->totalProjects->where('project_members.user_id', '=', $this->user->id);

            $this->totalProjects = $this->totalProjects->groupBy('projects.id');
            $this->totalProjects = count($this->totalProjects->get());

            $this->counts = DB::table('users')
                ->select(
                    DB::raw('(select IFNULL(sum(project_time_logs.total_minutes),0) from `project_time_logs` where user_id = ' . $this->user->id . ') as totalHoursLogged '),
                    DB::raw('(select count(tasks.id) from `tasks` inner join task_users on task_users.task_id=tasks.id where tasks.board_column_id=' . $completedTaskColumn->id . ' and task_users.user_id = ' . $this->user->id . ') as totalCompletedTasks')
                )
                ->first();

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

            $checkTicketAgent = TicketAgentGroups::select('id')->where('agent_id', user()->id)->first();

            if (!is_null($checkTicketAgent)) {
                $this->totalOpenTickets = Ticket::with('agent')->whereHas('agent', function ($q) {
                    $q->where('id', user()->id);
                })->where('status', 'open')->count();
            }

            $tasks = $this->pendingTasks = Task::with('activeProject', 'boardColumn', 'labels')
                ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->where('task_users.user_id', $this->user->id)
                ->where('tasks.board_column_id', '<>', $completedTaskColumn->id)
                ->whereBetween('tasks.created_at', [$this->startDate , $this->endDate])
                ->select('tasks.*')
                ->groupBy('tasks.id')
                ->orderBy('tasks.id', 'desc')
                ->get();

            $this->inProcessTasks = $tasks->count();

            $this->dueTasks = $tasks->filter(function ($item) {
                return !is_null($item->due_date) && $item->due_date->endOfDay()->isPast();
            })->count();

            $projects = Project::with('members')
                ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
                ->leftJoin('users', 'project_members.user_id', 'users.id')
                ->selectRaw('projects.status, project_members.user_id, projects.deadline as due_date, projects.id')
                ->where('project_members.user_id', $this->user->id)
                ->where('projects.status', '<>', 'finished')
                ->where('projects.status', '<>', 'canceled')
                ->groupBy('projects.id')
                ->get();

            $projects = $projects->whereNotNull('projects.deadline');

            $this->dueProjects = $projects->filter(function ($value, $key) {
                return now()->gt($value->due_date);
            })->count();

            // Getting Current Clock-in if exist
            

            $currentDate = now(global_setting()->timezone)->format('Y-m-d');

            $this->checkTodayLeave = Leave::where('status', 'approved')
                ->select('id')
                ->where('leave_date', now(global_setting()->timezone)->toDateString())
                ->where('user_id', user()->id)
                ->where('duration', '<>', 'half day')
                ->first();

            // Check Holiday by date
            $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();
            $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
                ->where('user_id', user()->id)
                ->whereNull('end_time')
                ->first();

            $currentDay = now()->format('m-d');

            $this->upcomingBirthdays = EmployeeDetails::whereHas('user', function ($query) {
                return $query->where('status', 'active');
            })
                ->with('user')
                ->select('*', 'date_of_birth', DB::raw('MONTH(date_of_birth) months'), DB::raw('DAY(date_of_birth) as day'))
                ->whereNotNull('date_of_birth')
                ->where(function ($query) use($currentDay){
                    $query->whereRaw('DATE_FORMAT(`date_of_birth`, "%m-%d") >= "'.$currentDay.'"')->orderBy('date_of_birth');
                })
                ->limit('5')
                ->orderBy('months')
                ->orderBy('day')
                ->get()->values()->all();

            $this->leave = Leave::with('user', 'type')->where('status', 'approved')
                ->where('leave_date', today(global_setting()->timezone)->toDateString())
                ->get();

            $this->workFromHome = Attendance::with('user')
                ->select('id', 'user_id')
                ->where('work_from_type', 'home')
                ->where(DB::raw('DATE(attendances.clock_in_time)'), now()->toDateString())
                ->groupBy('user_id')
                ->get();

            $this->leadAgent = LeadAgent::where('user_id', $this->user->id)->first();
            if(!is_null($this->leadAgent)){
                $this->lead = Lead::with('leadAgent')->whereHas('leadAgent', function ($q) {
                    $q->where('user_id', $this->user->id);
                })->get();

                $this->totalLead = $this->lead->filter(function ($value) {
                    return $value->client_id == null;
                })->count();

                $this->convertedLead = $this->lead->filter(function ($value) {
                    return $value->client_id != null;
                })->count();
            }
            //sales executive data
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

            if($this->totalleads != 0)
            {
                $this->avg_value= $this->totalbidsValue /$this->totalleads;
            }else
            {
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
            //--------------- End Sales Executive  --------------------



            $now = now(global_setting()->timezone);
            $this->weekStartDate = $now->copy()->startOfWeek($showClockIn->week_start_from);
            $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
            $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6)); // Get All Dates from start to end date

            $this->employeeShifts = EmployeeShiftSchedule::where('user_id', user()->id)
                ->whereBetween(DB::raw('DATE(`date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
                ->select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as dates'), 'employee_shift_schedules.*')
                ->with('shift', 'user', 'requestChange')
                ->get();
            $this->employeeShiftDates = $this->employeeShifts->pluck('dates')->toArray();

            $currentWeekDates = [];
            $weekShifts = [];

            $weekHolidays = Holiday::whereBetween(DB::raw('DATE(`date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
                ->select(DB::raw('DATE_FORMAT(`date`, "%Y-%m-%d") as hdate'), 'occassion')
                ->get();

            $holidayDates = $weekHolidays->pluck('hdate')->toArray();

            $weekLeaves = Leave::with('type')
                ->select(DB::raw('DATE_FORMAT(`leave_date`, "%Y-%m-%d") as ldate'), 'leaves.*')
                ->where('user_id', user()->id)
                ->whereBetween(DB::raw('DATE(`leave_date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
                ->where('status', 'approved')
                ->where('duration', '<>', 'half day')
                ->get();

            $leaveDates = $weekLeaves->pluck('ldate')->toArray();

            // phpcs:ignore
            for ($i = $this->weekStartDate->copy(); $i < $this->weekEndDate->copy(); $i->addDay()){
                $date = Carbon::parse($i);
                array_push($currentWeekDates, $date);

                if (in_array($date->toDateString(), $holidayDates)) {
                    foreach ($weekHolidays as $holiday) {
                        if ($holiday->hdate == $date->toDateString()) {
                            $leave = '<i class="fa fa-star text-warning"></i> '. $holiday->occassion;
                        }
                    }

                    array_push($weekShifts, $leave);

                } elseif (in_array($date->toDateString(), $leaveDates)) {
                    foreach ($weekLeaves as $leav) {
                        if ($leav->ldate == $date->toDateString()) {
                            $leave = __('app.onLeave') . ': <span class="badge badge-success" style="background-color:' . $leav->type->color . '">' . $leav->type->type_name . '</span>';
                        }
                    }

                    array_push($weekShifts, $leave);

                } elseif (in_array($date->toDateString(), $this->employeeShiftDates)) {
                    foreach ($this->employeeShifts as $shift) {
                        if ($shift->dates == $date->toDateString()) {
                            $shiftSchedule = $shift;
                        }
                    }

                    array_push($weekShifts, $shiftSchedule);

                } else {
                    array_push($weekShifts, '--');
                }

            }


            $this->currentWeekDates = $currentWeekDates;
            $this->weekShifts = $weekShifts;
            $this->showClockIn = $showClockIn->show_clock_in_button;
            $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
            $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
            $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
                return $value->status == '1';
            })->pluck('widget_name')->toArray();

            $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs(now()->toDateString(), user()->id);
            $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak(now()->toDateString(), user()->id);

            $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
            $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);


            $this->no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
            $this->no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
            $this->total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('project_budget');
            //$this->total_released_amount= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('milestone_paid');
            //dd($this->total_released_amount);
            $this->total_released_amount= Project::where('pm_id',Auth::id())
            ->where(DB::raw('DATE(updated_at)'), '>=', $startDate)
            ->where(DB::raw('DATE(updated_at)'), '<=', $endDate)
            ->sum('milestone_paid');



            $this->total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            $this->total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
            //dd($total_completed_project_on_time);
            if ($this->total_projects > 0) {
                $this->percentage_of_complete_project_count= $this->total_completed_project/$this->total_projects*100;
                $this->percentage_of_canceled_project_count= $this->total_canceled_project/$this->total_projects*100;

                $this->percentage_of_onhold_project_count= $this->total_onhold_project/$this->total_projects*100;
            }else {
                $this->percentage_of_complete_project_count = 0;
                $this->percentage_of_canceled_project_count = 0;

                $this->percentage_of_onhold_project_count= 0;
            }
            if ($this->total_completed_project > 0) {
                $this->percentage_of_completed_ontime_project_count= $this->total_completed_project_on_time/$this->total_completed_project*100;
            }
            else {
                $this->percentage_of_completed_ontime_project_count= 0;
            }



            $this->avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->avg('project_completion_days');
            $this->pm_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();
            $this->tasks= Task::where('added_by',Auth::id())->orderBy('id','desc')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();*/

            return view('dashboard.employee.pm_dashboard', $this->data);
        }
    }
}
