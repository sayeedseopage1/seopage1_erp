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
use App\Models\TaskRevision;
use App\Models\TaskRevisionDispute;
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
       
       if (request('mode') == 'month' && request()->ajax()) {
          //  dd(request());
            $date = Carbon::createFromFormat('Y-m-d', request('startDate'));
           // dd($date);

            $this->startMonth = $date->startOfMonth()->addDays(15)->toDateString(); 
            $this->endMonth = $date->startOfMonth()->addMonth(1)->addDays(15)->toDateString(); 
            $this->release_date = $date->endofMonth()->toDateString(); 
            

           // dd($this->startMonth,$this->endMonth, $this->release_date);
           $this->no_of_projects = Project::select('projects.*','pm_projects.created_at as project_start_date')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           //dd($this->no_of_projects );
         //dd(count($this->no_of_projects));
           $this->no_of_accepted_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
           ->where('projects.project_status','Accepted')
           
          // ->orWhere('project_status','pending')
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           $this->no_of_rejected_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           ->where('projects.project_status','Not Accepted')
           
           
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->get();
           $this->total_project_value = Project::select('projects.*','pm_projects.created_at as project_start_date')
           ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
           ->where('projects.pm_id', Auth::id())
           
          
           ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->sum('projects.project_budget');
           $this->accepted_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Accepted')
           
           
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->rejected_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Not Accepted')
           
            
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->sum('projects.project_budget');
            $this->total_released_amount_this_cycle = Project::select('projects.*','project_milestones.status as milestone_status','payments.paid_on as milestone_completion_date')
          
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           // ->groupBy('project_milestones.project_id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_this_cycle_get = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 
            'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date',
            'project_milestones.cost as milestone_cost',
            'project_milestones.status as milestone_status'
            )
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           
           // ->take(2)
            ->get();
            $this->total_released_amount_previous_cycle = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 
            'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date',
            'project_milestones.cost as milestone_cost',
            'project_milestones.status as milestone_status'
            )
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.project_id')
           //->groupBy('project_milestones.id')
            ->where('projects.pm_id', Auth::id())
            ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
            
            ->sum('project_milestones.cost');
            $this->total_released_amount_previous_cycle_get = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 
            'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date',
            'project_milestones.cost as milestone_cost',
            'project_milestones.status as milestone_status'
            )
          
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
            
         
        //    / ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           // ->take(2)
          
           ->orderBy('project_milestones.created_at','desc')
            ->get();
            $this->no_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
           
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->get();
            $this->no_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
           
            ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->get();
            $this->value_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->sum('projects.project_budget');
            $this->value_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->where('projects.status','finished')
            //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->get();
            $this->value_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
           ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->get();
            $this->value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
           ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->sum('projects.project_budget');
            if (count($this->no_of_accepted_projects) > 0 ) {
                $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
                $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
                $this->project_completion_rate_count_this_cycle_100_in_progress=  ((count($this->no_of_100_finished_project_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
                
            }else {
                $this->project_completion_rate_count_this_cycle= 0;
                $this->project_completion_rate_count_previous_cycle = 0;
                $this->project_completion_rate_count_this_cycle_100_in_progress= 0;
                
    
    
            }
            if(count($this->no_of_100_finished_project_previous_cycle) > 0)
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = ((count($this->no_of_100_finished_project_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_100_finished_project_previous_cycle))- (count($this->no_of_100_finished_project_this_cycle))) * 100);

            }else 
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = 0;

            }
            if($this->value_of_100_finished_project_previous_cycle > 0)
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = (($this->value_of_100_finished_project_previous_cycle) / ($this->accepted_project_value+$this->value_of_100_finished_project_previous_cycle- $this->value_of_100_finished_project_this_cycle) * 100);

            }else 
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = 0;

            }
            

            if (($this->accepted_project_value) > 0 ) {
                $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->accepted_project_value) )*100;
                $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->accepted_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
                $this->project_completion_rate_count_this_cycle_value_100_in_progress=  ($this->value_of_100_finished_project_this_cycle/$this->accepted_project_value )*100;
               
            }else {
                $this->project_completion_rate_count_this_cycle_value= 0;
                $this->project_completion_rate_count_previous_cycle_value = 0;
                $this->project_completion_rate_count_this_cycle_value_100_in_progress= 0;
               
    
            }
            $this->no_of_new_clients_this_cycle = Project::select('clients.*','deals.client_badge','projects.project_budget','projects.project_name',
            'projects.status as project_status','clients.created_at as client_creation_date'
            )
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
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.project_id')
           //->groupBy('project_milestones.id')
           
           // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
            
            
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.project_id')
           //->groupBy('project_milestones.id')
           
            ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
           // ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
 
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
            $this->total_tasks_assigned_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
            ->where('tasks.added_by',Auth::id())->count();
            $this->total_tasks_assigned_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
            
           
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
            ->where('tasks.added_by',Auth::id())->get();
           
           // dd($this->total_tasks_assigned_this_cycle_get);
            $this->total_tasks_completed_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
            ->count();
            if($this->total_tasks_assigned_this_cycle > 0)
            {
                $this->tasks_completion_rate_this_cycle= ($this->total_tasks_completed_this_cycle/ $this->total_tasks_assigned_this_cycle)*100;

            }else 
            {
                $this->tasks_completion_rate_this_cycle = 0;

            }
            //$this->task_completion_rate_this_cycle= 
            $this->total_tasks_completed_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
            
           
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
            ->get();
           
            $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
          //  ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->count();
            if($this->total_tasks_assigned_this_cycle > 0)
            {
                $this->tasks_completion_rate_previous_cycle=  (($this->total_tasks_completed_previous_cycle) /
                 (($this->total_tasks_assigned_this_cycle)+
                 ($this->total_tasks_completed_previous_cycle)- 
                 ($this->total_tasks_completed_this_cycle)) * 100);
               
            }else 
            {
                $this->tasks_completion_rate_previous_cycle = 0;

            }
           // dd($this->total_tasks_assigned_previous_cycle);
            $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
           
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
           // ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->get();
            $this->average_project_completion_rate = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
                ->where('projects.pm_id', Auth::id())
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->get();
            
            $this->average_completion_days = $this->average_project_completion_rate->avg('completion_time_days');
            $this->average_project_completion_rate_previous_cycle = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
                ->where('projects.pm_id', Auth::id())
               // ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
               ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->get();
            
            $this->average_completion_days_previous_cycle = $this->average_project_completion_rate_previous_cycle->avg('completion_time_days');
            // /dd($this->average_completion_days);
            $this->cancelled_projects_this_cycle=  Project::select(
                'projects.*',
              
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->whereIn('projects.status', ['canceled','partially finished'])
                
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status','Accepted')
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->get();

                $this->cancelled_projects_previous_cycle=  Project::select(
                    'projects.*',
                  
                )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                   
                ->whereIn('projects.status', ['canceled','partially finished'])
                ->where('projects.project_status','Accepted')
                
                ->where('projects.pm_id', Auth::id())
                  
                    ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
                    
                    ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                    ->get();
            $this->no_of_new_deals_added_previous = Deal::select('deals.*')
                ->where('deals.added_by', Auth::id())
                ->whereBetween('deals.created_at', [$this->startMonth, $this->endMonth])
                ->get();
            $this->no_of_new_milestones_added_on_old_projects = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',Auth::id())
            ->where('project_milestones.added_by',Auth::id())
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->no_of_new_milestones_added_on_old_projects_id = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId','projects.status as projectStatus')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',Auth::id())
            ->where('project_milestones.added_by',Auth::id())
            ->groupBy('project_milestones.project_id')
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();
            $this->no_of_new_milestones_added_on_old_projects_value = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',Auth::id())
            ->where('project_milestones.added_by',Auth::id())
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->sum('project_milestones.cost');
            $this->no_of_delayed_projects = Project::select('projects.*', 'p_m_projects.created_at as project_creation_date')
            ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status', 'Accepted')
            ->where('projects.status', 'in progress')
            ->where('projects.delayed_status', 1)
            ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
           
            ->get();
           
           // dd($delay_date);

                $this->no_of_delayed_projects_finished = Project::select('projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date')
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
              
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status', 'Accepted')
                ->where('projects.status', 'finished')
                ->where('projects.delayed_status', 1)
                ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
               
                ->get();
              
        
              
                $this->no_of_delayed_projects_this_cycle = Project::select('projects.*', 'p_m_projects.created_at as project_creation_date')
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                    ->where('projects.pm_id', Auth::id())
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status', 'in progress')
                    ->where('projects.delayed_status', 1)
                    ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                  
                  
                    // Compare against the calculated deadline date
                    ->get();
                $this->no_of_delayed_projects_finished_this_cycle = Project::select('projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date')
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
              
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status', 'Accepted')
                ->where('projects.status', 'finished')
                ->where('projects.delayed_status', 1)
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                
                ->get();

                $this->caused_by_me_for_previous_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',0)
                    ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                    ->get();


                    $this->caused_by_me_dispute_for_previous_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',1)
                    ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                    ->get();


                    $this->caused_by_other_for_previous_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',1)
                    ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                    ->get();


                    $this->caused_by_other_dispute_for_previous_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',0)
                    ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                    ->get();

                    $this->dispute_for_previous_cycle = $this->caused_by_me_dispute_for_previous_cycle->concat($this->caused_by_other_dispute_for_previous_cycle);

          
           
            if(count($this->no_of_accepted_projects) > 0 )
            {
                $this->delayed_projects_percentage_this_cycle = (count($this->no_of_delayed_projects_this_cycle)/(count($this->no_of_accepted_projects)))*100;
                $this->delayed_projects_percentage_previous_cycle = (count($this->no_of_delayed_projects) /((count($this->no_of_accepted_projects))+(count($this->no_of_delayed_projects))))*100;
                $this->project_cancelation_rate =  (count($this->cancelled_projects_this_cycle)/count($this->no_of_accepted_projects)) * 100;
            }else 
            {
                $this->delayed_projects_percentage_this_cycle = 0;
                $this->delayed_projects_percentage_previous_cycle = 0;
                $this->project_cancelation_rate = 0;
            }
            $first_day = $this->startMonth;
                $this->days = Carbon::parse($first_day)->diffInDays(Carbon::parse($this->endMonth));
                //dd($this->days);
                
                if (count($this->total_milestone_completed_this_cycle) > 0) {
                    $this->avg_payment_release_per_day= count($this->total_milestone_completed_this_cycle) /$this->days ;
                }else 
                {
                    $this->avg_payment_release_per_day =0;

                }
                
           

          //  dd($this->data);

            $html = view('dashboard.ajax.pmdashboard.month', $this->data)->render();
           // dd($html);

            return Reply::dataOnly([
                'status' => 'success', 
                'html' => $html, 
            ]); 
        }  else {
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

            


           
            /*------------------Start Today data----------------------*/

        

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
            $this->no_of_projects = Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
          //dd(count($this->no_of_projects));
            $this->no_of_accepted_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Accepted')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
            $this->no_of_rejected_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.project_status','Not Accepted')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->get();
            $this->total_project_value = Project::select('projects.*','pm_projects.created_at as project_start_date')
            ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
           
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->sum('projects.project_budget');
            $this->accepted_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
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
        //    / ->groupBy('project_milestones.project_id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_this_cycle_get = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 
            'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date',
            'project_milestones.cost as milestone_cost',
            'project_milestones.status as milestone_status'
            )
           
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
           ->whereNotBetween('project_milestones.created_at', [$endMonth, $release_date])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
        //    / ->groupBy('project_milestones.project_id')
            ->sum('project_milestones.cost');
            $this->total_released_amount_previous_cycle_get = Project::select('projects.*',
            'project_milestones.milestone_title as milestone_title', 
            'project_milestones.created_at as milestone_creation_date',
            'payments.paid_on as milestone_released_date',
            'project_milestones.cost as milestone_cost',
            'project_milestones.status as milestone_status'
            )
           
            ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->where('projects.pm_id', Auth::id())
           // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
           ->whereNotBetween('project_milestones.created_at', [$endMonth, $release_date])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            
            ->get();
            $this->no_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->get();
            $this->no_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->get();
            $this->value_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->sum('projects.project_budget');
            $this->value_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->where('projects.pm_id', Auth::id())
            ->where('projects.status','finished')
            
            ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->get();
            $this->value_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->sum('projects.project_budget');
            $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
           ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->get();
            $this->value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
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
           ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
            ->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->sum('projects.project_budget');
            if (count($this->no_of_accepted_projects) > 0 ) {
                $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
                $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
                $this->project_completion_rate_count_this_cycle_100_in_progress=  ((count($this->no_of_100_finished_project_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
               
            }else {
                $this->project_completion_rate_count_this_cycle= 0;
                $this->project_completion_rate_count_previous_cycle = 0;
                $this->project_completion_rate_count_this_cycle_100_in_progress= 0;
               
    
    
            }
            if(count($this->no_of_100_finished_project_previous_cycle) > 0)
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = ((count($this->no_of_100_finished_project_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_100_finished_project_previous_cycle))- (count($this->no_of_100_finished_project_this_cycle))) * 100);

            }else 
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = 0;

            }
            if($this->value_of_100_finished_project_previous_cycle > 0)
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = (($this->value_of_100_finished_project_previous_cycle) / ($this->accepted_project_value+$this->value_of_100_finished_project_previous_cycle- $this->value_of_100_finished_project_this_cycle) * 100);

            }else 
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = 0;

            }
            if (($this->accepted_project_value) > 0 ) {
                $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->accepted_project_value) )*100;
                $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->accepted_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
                $this->project_completion_rate_count_this_cycle_value_100_in_progress=  ($this->value_of_100_finished_project_this_cycle/$this->accepted_project_value )*100;
               
            }else {
                $this->project_completion_rate_count_this_cycle_value= 0;
                $this->project_completion_rate_count_previous_cycle_value = 0;
                $this->project_completion_rate_count_this_cycle_value_100_in_progress= 0;
                
    
            }
        $this->no_of_new_clients_this_cycle = Project::select('clients.*','deals.client_badge','projects.project_budget','projects.project_name',
        'projects.status as project_status','clients.created_at as client_creation_date'
        )
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
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.project_id')
           //->groupBy('project_milestones.id')
          
          
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
            
            
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->get();
            $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           // ->groupBy('project_milestones.project_id')
           //->groupBy('project_milestones.id')
            
            ->whereNotBetween('project_milestones.created_at', [$endMonth, $release_date])
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            ->where('projects.pm_id', Auth::id())
            ->where('project_milestones.status', 'complete')
           
            
            
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

            $this->total_tasks_assigned_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->where('tasks.added_by',Auth::id())->count();
            
            $this->total_tasks_assigned_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
           
            ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->where('tasks.added_by',Auth::id())->get();
           
            
          
          
            $this->total_tasks_completed_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
            ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->count();
           
            if($this->total_tasks_assigned_this_cycle > 0)
            {
                $this->tasks_completion_rate_this_cycle= ($this->total_tasks_completed_this_cycle/ $this->total_tasks_assigned_this_cycle)*100;

            }else 
            {
                $this->tasks_completion_rate_this_cycle = 0;

            }
           
            $this->total_tasks_completed_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
           
            ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
            ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->get();
            //dd($this->total_tasks_completed_this_cycle_get);
           
            $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
            ->whereNotBetween('tasks.created_at', [$endMonth, $release_date])
            ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
          //  ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
            ->count();
           
            if($this->total_tasks_assigned_this_cycle > 0)
            {
                $this->tasks_completion_rate_previous_cycle=  (($this->total_tasks_completed_previous_cycle) /
                 (($this->total_tasks_assigned_this_cycle)+
                 ($this->total_tasks_completed_previous_cycle)- 
                 ($this->total_tasks_completed_this_cycle)) * 100);
               
            }else 
            {
                $this->tasks_completion_rate_previous_cycle = 0;

            }

            $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
            ->where('board_column_id',4)
            ->where('tasks.added_by',Auth::id())
           
            ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
            ->whereNotBetween('tasks.created_at', [$endMonth, $release_date])
            ->get();
            $this->average_project_completion_rate = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
                ->where('projects.pm_id', Auth::id())
                ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->get();
            
            $this->average_completion_days = $this->average_project_completion_rate->avg('completion_time_days');

            $this->average_project_completion_rate_previous_cycle = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
                ->where('projects.pm_id', Auth::id())
                ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
                ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->get();
            
            $this->average_completion_days_previous_cycle = $this->average_project_completion_rate_previous_cycle->avg('completion_time_days');
           // dd($this->average_completion_days);

            $this->cancelled_projects_this_cycle=  Project::select(
                'projects.*',
              
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
               
                ->whereIn('projects.status', ['canceled','partially finished'])
                
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status','Accepted')
                ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->get();

                $this->cancelled_projects_previous_cycle=  Project::select(
                    'projects.*',
                  
                )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
           
                ->whereIn('projects.status', ['canceled','partially finished'])
                
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status','Accepted')
                ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
                ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->get();
                $this->no_of_new_deals_added = Deal::select('deals.*')
                    ->where('deals.added_by', Auth::id())
                    ->get();
                $this->no_of_new_milestones_added_on_old_projects = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
                ->join('projects','projects.id','project_milestones.project_id')
                ->join('deals','deals.id','projects.deal_id')
                ->where('deals.project_type','fixed')
                ->where('projects.pm_id',Auth::id())
                ->where('project_milestones.added_by',Auth::id())
                
                ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
                ->get();
                $this->no_of_new_milestones_added_on_old_projects_id = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId','projects.status as projectStatus')
                ->join('projects','projects.id','project_milestones.project_id')
                ->join('deals','deals.id','projects.deal_id')
                ->where('deals.project_type','fixed')
                ->where('projects.pm_id',Auth::id())
                ->where('project_milestones.added_by',Auth::id())
                ->groupBy('project_milestones.project_id')
                ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
                ->get();
                $this->no_of_new_milestones_added_on_old_projects_value = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
                ->join('projects','projects.id','project_milestones.project_id')
                ->join('deals','deals.id','projects.deal_id')
                ->where('deals.project_type','fixed')
                ->where('projects.pm_id',Auth::id())
                ->where('project_milestones.added_by',Auth::id())
                ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
                ->sum('project_milestones.cost');
                
                
                $this->no_of_delayed_projects = Project::select('projects.*', 'p_m_projects.created_at as project_creation_date')
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.pm_id', Auth::id())
                ->where('projects.project_status', 'Accepted')
                ->where('projects.status', 'in progress')
                ->where('projects.delayed_status', 1)
                ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
                
                ->get();
              
               // dd($delay_date);
    
                    $this->no_of_delayed_projects_finished = Project::select('projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date')
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                  
                    ->where('projects.pm_id', Auth::id())
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status', 'finished')
                    ->where('projects.delayed_status', 1)
                    ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
                    ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                   
                    ->get();
                  
            
                  
                    $this->no_of_delayed_projects_this_cycle = Project::select('projects.*', 'p_m_projects.created_at as project_creation_date')
                        ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                        ->where('projects.pm_id', Auth::id())
                        ->where('projects.project_status', 'Accepted')
                        ->where('projects.status', 'in progress')
                        ->where('projects.delayed_status', 1)
                        ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                       
                      
                        // Compare against the calculated deadline date
                        ->get();
                    $this->no_of_delayed_projects_finished_this_cycle = Project::select('projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date')
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                  
                    ->where('projects.pm_id', Auth::id())
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status', 'finished')
                    ->where('projects.delayed_status', 1)
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->whereBetween('projects.updated_at', [$startMonth, $release_date])
                    
                    ->get();

                    // Number of revisions for cycle
                    $this->caused_by_me_for_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',0)
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->get();

                    $this->caused_by_me_dispute_for_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',1)
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->get();


                    $this->caused_by_other_for_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',1)
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->get();


                    $this->caused_by_other_dispute_for_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',0)
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->get();

                    $this->dispute_for_cycle = $this->caused_by_me_dispute_for_cycle->concat($this->caused_by_other_dispute_for_cycle);

                    // Number of revisions in this cycle
                    $this->caused_by_me_in_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',0)
                    ->where(function ($q1) use ($startMonth, $endMonth, $release_date) {
                        $q1->whereBetween('tasks.created_at', [$startMonth, $endMonth])
                            ->orWhere(function ($q2) use ($startMonth, $release_date) {
                                $q2->where('tasks.created_at', '<', $startMonth)
                                    ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                                    ->where('tasks.board_column_id', '=', '4');
                            });
                    })
                    ->get();


                    $this->caused_by_me_dispute_in_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',0)
                    ->where('task_revisions.client_pm_dispute',1)
                    ->where(function ($q1) use ($startMonth, $endMonth, $release_date) {
                        $q1->whereBetween('tasks.created_at', [$startMonth, $endMonth])
                            ->orWhere(function ($q2) use ($startMonth, $release_date) {
                                $q2->where('tasks.created_at', '<', $startMonth)
                                    ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                                    ->where('tasks.board_column_id', '=', '4');
                            });
                    })
                    ->get();


                    $this->caused_by_other_in_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',1)
                    ->where(function ($q1) use ($startMonth, $endMonth, $release_date) {
                        $q1->whereBetween('tasks.created_at', [$startMonth, $endMonth])
                            ->orWhere(function ($q2) use ($startMonth, $release_date) {
                                $q2->where('tasks.created_at', '<', $startMonth)
                                    ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                                    ->where('tasks.board_column_id', '=', '4');
                            });
                    })
                    ->get();

                    $this->caused_by_other_dispute_in_cycle = TaskRevision::select('task_revisions.*','tasks.heading')
                    ->join('tasks','task_revisions.task_id','=','tasks.id')
                    ->whereNotNull('task_revisions.pm_comment')
                    ->where('task_revisions.is_deniable',1)
                    ->where('task_revisions.is_accept',0)
                    ->where(function ($q1) use ($startMonth, $endMonth, $release_date) {
                        $q1->whereBetween('tasks.created_at', [$startMonth, $endMonth])
                            ->orWhere(function ($q2) use ($startMonth, $release_date) {
                                $q2->where('tasks.created_at', '<', $startMonth)
                                    ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                                    ->where('tasks.board_column_id', '=', '4');
                            });
                    })
                    ->get();


                    $this->dispute_in_cycle = $this->caused_by_me_dispute_in_cycle->concat($this->caused_by_other_dispute_in_cycle);
    
                if(count($this->no_of_accepted_projects) > 0 )
                {
                    $this->delayed_projects_percentage_this_cycle = (count($this->no_of_delayed_projects_this_cycle)/(count($this->no_of_accepted_projects)))*100;
                    $this->delayed_projects_percentage_previous_cycle = (count($this->no_of_delayed_projects) /((count($this->no_of_accepted_projects))+(count($this->no_of_delayed_projects))))*100;
                    $this->project_cancelation_rate =  (count($this->cancelled_projects_this_cycle)/count($this->no_of_accepted_projects)) * 100;
                }else 
                {
                    $this->delayed_projects_percentage_this_cycle = 0;
                    $this->delayed_projects_percentage_previous_cycle = 0;
                    $this->project_cancelation_rate = 0;
                }
               
                $current_day = Carbon::now()->format('Y-m-d');
                $this->days = Carbon::parse($current_day)->diffInDays(Carbon::parse($startMonth));
                //dd($this->days);
                
                if (count($this->total_milestone_completed_this_cycle) > 0) {
                    $this->avg_payment_release_per_day= count($this->total_milestone_completed_this_cycle) /$this->days ;
                }else 
                {
                    $this->avg_payment_release_per_day =0;

                }
                

                
                

            /*-------------------------Month data end----------------------------*/

           

            return view('dashboard.employee.pm_dashboard', $this->data);
        }
    }
}
