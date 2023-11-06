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
use App\Models\ProjectMember;
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
trait PmDashboardAdminView
{

    /**
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function PmDashboardAdminView($pm)
    {
        dd('adasd');
        $this->pm = $pm;


       if (request('mode') == 'month' && request()->ajax() && request('pm_id')) {
            $date = Carbon::createFromFormat('Y-m-d', request('startDate'));
           // dd($date);
           $this->startMonth = $date->startOfMonth()->addDays(15)->toDateString();
           $this->endMonth = $date->startOfMonth()->addMonth(1)->addDays(15)->toDateString();
           $this->release_date = $date->endofMonth()->toDateString();
           $this->nextMonth = $date->startOfMonth()->toDateString();

           
           $startMonth= $this->startMonth;
           $endMonth = $this->endMonth;
           $release_date= $this->release_date;
           $nextMonth= $this->nextMonth;




        //    dd($this->startMonth,$this->endMonth, $this->release_date, $this->pm->id);
        $this->no_of_projects = Project::select('projects.*','pm_projects.created_at as project_start_date')
        ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)

        ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
        ->orderBy('pm_projects.created_at','desc')
        ->get();
        //dd($this->no_of_projects );
      //dd(count($this->no_of_projects));
        $this->no_of_accepted_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
        ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)

        ->where('projects.project_status','Accepted')

       // ->orWhere('project_status','pending')
        ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
        ->orderBy('pm_projects.created_at','desc')
        ->get();
        $this->no_of_rejected_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
        ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)
        ->where('projects.project_status','Not Accepted')


        ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
        ->orderBy('pm_projects.created_at','desc')
        ->get();
        $this->total_project_value = Project::select('projects.*','pm_projects.created_at as project_start_date')
        ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)


        ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
        ->sum('projects.project_budget');
        $this->accepted_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.project_status','Accepted')


         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->sum('projects.project_budget');
         $this->rejected_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.project_status','Not Accepted')


         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->sum('projects.project_budget');
         $this->total_released_amount_this_cycle = Project::select('projects.*','project_milestones.status as milestone_status','payments.paid_on as milestone_completion_date')

         ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
         ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
         ->leftJoin('payments','payments.invoice_id','invoices.id')
         ->where('projects.pm_id', $this->pm->id)
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
         ->where('projects.pm_id', $this->pm->id)

         ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
         ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
         ->orderBy('payments.paid_on','desc')

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
        
        ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

         $q3->where('projects.pm_id', $this->pm->id)
            ->whereBetween('payments.paid_on', [$startMonth, $release_date])
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth]);
                        
     })
   ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
            $q2->where('projects.pm_id', $this->pm->id)
              
                ->whereBetween('payments.paid_on', [$nextMonth, $release_date])
                ->where('project_milestones.created_at', '<', $startMonth);

            
     
 })->sum('project_milestones.cost');
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
         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

             $q3->where('projects.pm_id', $this->pm->id)
                ->whereBetween('payments.paid_on', [$startMonth, $release_date])
                ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth]);
                            
         })
       ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                $q2->where('projects.pm_id', $this->pm->id)
                  
                    ->whereBetween('payments.paid_on', [$nextMonth, $release_date])
                    ->where('project_milestones.created_at', '<', $startMonth);
   
     })
        // ->take(2)
        ->orderBy('payments.paid_on','desc')
         ->get();
         $this->no_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status','finished')

         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->orderBy('projects.updated_at','desc')
         ->get();
        
         $this->no_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status','finished')

         // ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
         // ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

             $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth]);
                            
         })
       ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                 ->where('pm_projects.created_at', '<', $startMonth);
 
     })

         ->orderBy('projects.updated_at','desc')
         ->get();

         $this->value_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status','finished')

         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->sum('projects.project_budget');
        

         $this->value_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->where('projects.pm_id', $this->pm->id)

         ->where('projects.status','finished')
         //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

             $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth]);
                            
         })
       ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                 ->where('pm_projects.created_at', '<', $startMonth);
 
     })
         ->sum('projects.project_budget');
         $this->no_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->leftJoin('project_milestones', function ($join) {
             $join->on('projects.id', '=', 'project_milestones.project_id')
                 ->where('project_milestones.status','<>', 'complete')
                 ->where('project_milestones.project_completion_status', 0)
                 ->where('project_milestones.qc_status', 0);
         })
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status', 'in progress')
         ->whereNull('project_milestones.id')

         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->orderBy('projects.updated_at','desc')
         ->get();
         $this->value_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->leftJoin('project_milestones', function ($join) {
             $join->on('projects.id', '=', 'project_milestones.project_id')
                 ->where('project_milestones.status','<>', 'complete')
                 ->where('project_milestones.project_completion_status', 0)
                 ->where('project_milestones.qc_status', 0);
         })
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status', 'in progress')
         ->whereNull('project_milestones.id')

         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->orderBy('projects.updated_at','desc')
         ->sum('projects.project_budget');

         
         $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->leftJoin('project_milestones', function ($join) {
             $join->on('projects.id', '=', 'project_milestones.project_id')
                 ->where('project_milestones.status','<>', 'complete')
                 ->where('project_milestones.project_completion_status', 0)
                 ->where('project_milestones.qc_status', 0);
         })
         ->where('projects.pm_id', $this->pm->id)
         ->where('projects.status', 'in progress')

         ->whereNull('project_milestones.id')
        // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
        ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

         $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
            ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth]);
                        
     })
   ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
            $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
             ->where('pm_projects.created_at', '<', $startMonth);

 })
         ->orderBy('projects.updated_at','desc')
         ->get();
         $this->value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->leftJoin('project_milestones', function ($join) {
                $join->on('projects.id', '=', 'project_milestones.project_id')
                    ->where('project_milestones.status','<>', 'complete')
                    ->where('project_milestones.project_completion_status', 0)
                    ->where('project_milestones.qc_status', 0);
            })
           ->where('projects.pm_id', $this->pm->id)
            ->where('projects.status', 'in progress')

            ->whereNull('project_milestones.id')
           // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
           ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

            $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
               ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth]);
                           
        })
      ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
               $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                ->where('pm_projects.created_at', '<', $startMonth);

    })
            ->sum('projects.project_budget');
            $this->no_of_100_and_finish_this_cycle = $this->no_of_100_finished_project_this_cycle->concat($this->no_of_finished_projects_this_cycle);
            $this->no_of_100_and_finish_previous_cycle = $this->no_of_100_finished_project_previous_cycle->concat($this->no_of_finished_projects_previous_cycle);
            $this->value_of_100_and_finish_this_cycle = $this->value_of_100_finished_project_this_cycle+$this->value_of_finished_projects_this_cycle;
            $this->value_of_100_and_finish_previous_cycle = $this->value_of_100_finished_project_previous_cycle+$this->value_of_finished_projects_previous_cycle;
            if (count($this->no_of_accepted_projects) > 0 ) {
                $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
                $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
                $this->project_completion_rate_count_this_cycle_100_in_progress=  ((count($this->no_of_100_and_finish_this_cycle))/(count($this->no_of_accepted_projects)) )*100;

            }else {
                $this->project_completion_rate_count_this_cycle= 0;
                $this->project_completion_rate_count_previous_cycle = 0;
                $this->project_completion_rate_count_this_cycle_100_in_progress= 0;



            }
            if(count($this->no_of_100_and_finish_this_cycle) > 0)
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = ((count($this->no_of_100_and_finish_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_100_and_finish_previous_cycle))- (count($this->no_of_100_and_finish_this_cycle))) * 100);

            }else
            {
                $this->project_completion_rate_count_previous_cycle_100_in_progress = 0;

            }
            if($this->value_of_100_and_finish_previous_cycle > 0)
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = (($this->value_of_100_and_finish_previous_cycle) / ($this->accepted_project_value+$this->value_of_100_and_finish_previous_cycle- $this->value_of_100_and_finish_this_cycle) * 100);

            }else
            {
                $this->project_completion_rate_count_previous_cycle_value_100_in_progress = 0;

            }


            if (($this->accepted_project_value) > 0 ) {
                $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->accepted_project_value) )*100;
                $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->accepted_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
                $this->project_completion_rate_count_this_cycle_value_100_in_progress=  ($this->value_of_100_and_finish_this_cycle/$this->accepted_project_value )*100;

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
           ->where('projects.pm_id', $this->pm->id)
            ->where('deals.client_badge','new client')
            ->groupBy('clients.id')
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->whereBetween('clients.created_at', [$this->startMonth, $this->endMonth])
            ->orderBy('clients.created_at','desc')
            ->get();
            $this->no_of_existing_clients_this_cycle = Project::select('clients.*','deals.client_badge')
            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
            ->join('deals', 'deals.client_id', 'projects.client_id')
            ->join('users as clients','clients.id','projects.client_id')
           ->where('projects.pm_id', $this->pm->id)
            ->where('deals.client_badge','<>','new client')
            ->groupBy('clients.id')
            ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
            ->orderBy('clients.created_at','desc')
            ->get();

            $this->total_client_monthly = $this->no_of_new_clients_this_cycle->concat($this->no_of_existing_clients_this_cycle);

            $this->total_milestone_assigned_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
           ->where('projects.pm_id', $this->pm->id)

            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->orderBy('project_milestones.created_at','desc')

            ->get();
            $this->total_milestone_assigned_this_cycle_value= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
           ->where('projects.pm_id', $this->pm->id)

            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->sum('project_milestones.cost');
            $this->total_milestone_completed_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->orderBy('payments.paid_on','desc')
           //->groupBy('project_milestones.id')

           // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
           ->where('projects.pm_id', $this->pm->id)
            ->where('project_milestones.status', 'complete')


            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->get();

            $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
           
           //->groupBy('project_milestones.id')

           ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

            $q3->whereBetween('payments.paid_on', [$startMonth, $release_date])
               ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth]);
                           
        })
      ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
               $q2->whereBetween('payments.paid_on', [$nextMonth, $release_date])
                ->where('project_milestones.created_at', '<', $startMonth);

    })
           ->where('projects.pm_id', $this->pm->id)
            ->orderBy('payments.paid_on','desc')
            ->where('project_milestones.status', 'complete')
           // ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])

            ->get();
            $this->total_milestone_completed_this_current_month= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
            'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
            )
            ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->leftJoin('payments','payments.invoice_id','invoices.id')
            ->orderBy('payments.paid_on','desc')
           //->groupBy('project_milestones.id')

           // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
            ->whereBetween('payments.paid_on', [$this->startMonth, $this->endMonth])
           ->where('projects.pm_id', $this->pm->id)
            ->where('project_milestones.status', 'complete')


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
            $this->total_tasks_assigned_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
           ->where('tasks.added_by', $this->pm->id)->count();
            $this->total_tasks_assigned_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')


            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
           ->where('tasks.added_by', $this->pm->id)
            ->orderBy('tasks.created_at','desc')
            ->get();

           // dd($this->total_tasks_assigned_this_cycle_get);
            $this->total_tasks_completed_this_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('board_column_id',4)
           ->where('tasks.added_by', $this->pm->id)
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
            $this->total_tasks_completed_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar','tasks.updated_at as task_completion_date',
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
            )
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')


            ->where('board_column_id',4)
           ->where('tasks.added_by', $this->pm->id)
            ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
            ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
            ->orderBy('tasks.updated_at','desc')
            ->get();
            //enan code
            $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
  
            ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                    $q3->where('board_column_id',4)
                      ->where('tasks.added_by', $this->pm->id)
                       ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                       ->whereBetween('tasks.created_at', [$startMonth, $endMonth]);
                                   
                })
              ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                       $q2->where('board_column_id',4)
                         ->where('tasks.added_by', $this->pm->id)
                           ->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
                           ->where('tasks.created_at', '<', $startMonth);

                       
                
            })
            ->count();
             //   sayeed code 

        //     $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
        //     ->leftJoin('task_users','task_users.task_id','tasks.id')
        //     ->where('board_column_id',4)
        //    ->where('tasks.added_by', $this->pm->id)
        //     ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
        //     ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
        //   //  ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
        //     ->count();


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
           //code sayeed
        //     $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
        //     DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
        //     )
        //     ->leftJoin('task_users','task_users.task_id','tasks.id')

        //     ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')

        //     ->where('board_column_id',4)
        //    ->where('tasks.added_by', $this->pm->id)
        //     ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
        //     ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
        //    // ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
        //    ->orderBy('tasks.updated_at','desc')
        //     ->get();

        //code enan 
        $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
        DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
        )
        ->leftJoin('task_users','task_users.task_id','tasks.id')

        ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')

        ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

            $q3->where('board_column_id',4)
              ->where('tasks.added_by', $this->pm->id)
               ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
               ->whereBetween('tasks.created_at', [$startMonth, $endMonth]);
                           
        })
      ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
               $q2->where('board_column_id',4)
                 ->where('tasks.added_by', $this->pm->id)
                   ->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
                   ->where('tasks.created_at', '<', $startMonth);

               
        
    })
       // ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
       ->orderBy('tasks.updated_at','desc')
        ->get();
            
            $this->average_project_completion_rate = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
               ->where('projects.pm_id', $this->pm->id)
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->orderBy('projects.updated_at','desc')
                ->get();

            $this->average_completion_days = $this->average_project_completion_rate->avg('completion_time_days');
            $this->average_project_completion_rate_previous_cycle = Project::select(
                'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
                DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where('projects.status', 'finished')
               ->where('projects.pm_id', $this->pm->id)
               // ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
            //    ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
            //     ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
            ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                   ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth]);
                               
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                    ->where('p_m_projects.created_at', '<', $startMonth);
    
        })
                ->orderBy('projects.updated_at','desc')
                ->get();

            $this->average_completion_days_previous_cycle = $this->average_project_completion_rate_previous_cycle->avg('completion_time_days');
            // /dd($this->average_completion_days);
            $this->cancelled_projects_this_cycle=  Project::select(
                'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',

            )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->whereIn('projects.status', ['canceled','partially finished'])

               ->where('projects.pm_id', $this->pm->id)
                ->where('projects.project_status','Accepted')
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->orderBy('projects.updated_at','desc')
                ->get();

                $this->cancelled_projects_previous_cycle=  Project::select(
                    'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',


                )
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')

                ->whereIn('projects.status', ['canceled','partially finished'])
                ->where('projects.project_status','Accepted')

               ->where('projects.pm_id', $this->pm->id)

                ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                    $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                       ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth]);
                                   
                })
              ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                       $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                        ->where('p_m_projects.created_at', '<', $startMonth);
        
            })
                    ->orderBy('projects.updated_at','desc')
                    ->get();
            $this->no_of_new_deals_added_previous = Deal::select('deals.*')
            ->where('deals.added_by', $this->pm->id)
            ->whereBetween('deals.created_at', [$this->startMonth, $this->endMonth])
            ->orderBy('deals.created_at','desc')
            ->get();
            $this->no_of_new_milestones_added_on_old_projects = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',$this->pm->id)
            ->where('project_milestones.added_by',$this->pm->id)
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->where('project_milestones.status','!=','canceled')
            ->orderBy('project_milestones.created_at','desc')
            ->get();
            $this->no_of_new_milestones_added_on_old_projects_id = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId','projects.status as projectStatus')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',$this->pm->id)
            ->where('project_milestones.added_by',$this->pm->id)
            ->groupBy('project_milestones.project_id')
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->where('project_milestones.status','!=','canceled')
            ->orderBy('project_milestones.created_at','desc')
            ->get();
            $this->no_of_new_milestones_added_on_old_projects_value = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
            ->join('projects','projects.id','project_milestones.project_id')
            ->join('deals','deals.id','projects.deal_id')
            ->where('deals.project_type','fixed')
            ->where('projects.pm_id',$this->pm->id)
            ->where('project_milestones.added_by',$this->pm->id)
            ->where('project_milestones.status','!=','canceled')
            ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
            ->sum('project_milestones.cost');
            $this->no_of_delayed_projects = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
            
            'project_members.created_at as project_accept_date')
            ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
            ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {
                $q3->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                   ->where('project_members.user_id', $this->pm->id)
                   ->where('projects.project_status', 'Accepted')
                   ->where('p_m_projects.delayed_status', 1) ;                            
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                    ->where('p_m_projects.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status','!=','in progress')
                    ->where('p_m_projects.delayed_status', 1);
    
        })
        ->groupBy('project_members.project_id')
            ->orderBy('projects.updated_at','desc')
            ->get();
           // dd($delay_date);

           $this->no_of_delayed_projects_finished = Project::select('projects.*','p_m_projects.created_at as project_creation_date','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date',
           'project_members.created_at as project_accept_date')
           ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
           ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
           
           // ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
           // ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
           ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

               $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                  ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                  ->where('projects.pm_id', Auth::id())
                  ->where('project_members.user_id', Auth::id())
                  ->where('projects.status', 'finished')
                   ->where('p_m_projects.delayed_status', 1)
                  ;
                              
           })
         ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                  $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                   ->where('p_m_projects.created_at', '<', $startMonth)
                   ->where('projects.pm_id', Auth::id())
                   ->where('project_members.user_id', Auth::id())

                   ->where('projects.status', 'finished')
                   ->where('p_m_projects.delayed_status', 1)
                   ;
   
       })
       ->groupBy('project_members.project_id')
           ->orderBy('projects.updated_at','desc')

           ->get();



                $this->no_of_delayed_projects_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
                'project_members.created_at as project_accept_date'
                )
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                    ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                   
                    ->where('p_m_projects.delayed_status', 1)
                    ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                    ->groupBy('project_members.project_id')
                    ->orderBy('projects.updated_at','desc')


                    // Compare against the calculated deadline date
                    ->get();
                $this->no_of_delayed_projects_finished_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date')
                ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')

               ->where('projects.pm_id', $this->pm->id)
                ->where('projects.project_status', 'Accepted')
                ->where('projects.status', 'finished')
                ->where('p_m_projects.delayed_status', 1)
                ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
                ->orderBy('projects.updated_at','desc')

                ->get();

                $this->caused_by_me_for_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.added_by',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id',
                    'task_revision_disputes.*'
                    )
                ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
                ->leftJoin('projects','task_revisions.project_id','=','projects.id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.final_responsible_person','PM')
                ->groupBy('task_revisions.id')
                ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                ->get();


                $this->caused_by_other_for_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.added_by',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id'
                )
                ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
                ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.final_responsible_person', '!=', 'PM')
                ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                ->groupBy('task_revisions.id')
                ->get();

                $this->dispute_for_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.final_responsible_person',
                    'task_revisions.added_by',
                    'task_revisions.revision_acknowledgement',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id',
                    'project_members.lead_developer_id as ld_id',
                    'task_revision_disputes.*'
                    )
                ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
                ->leftJoin('projects','task_revisions.project_id','=','projects.id')
                ->leftJoin('project_members','projects.id','=','project_members.project_id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.dispute_created', 1)
                ->groupBy('task_revisions.id')
                ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                ->get();



                $this->caused_by_me_in_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.added_by',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id',
                    'task_revision_disputes.*'
                    )
                ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
                ->leftJoin('projects','task_revisions.project_id','=','projects.id')
                ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.final_responsible_person','PM')
                // ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
                // ->whereNotBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
                ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                    $q3->whereBetween('tasks.created_at', [$startMonth, $release_date])
                       ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth]);
                                   
                })
              ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                       $q2->whereBetween('tasks.created_at', [$nextMonth, $release_date])
                        ->where('task_revisions.created_at', '<', $startMonth);
        
            })
                ->groupBy('task_revisions.id')
                ->get();


                $this->caused_by_other_in_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.added_by',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id'
                )
                ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
                ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
                ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.final_responsible_person', '!=', 'PM')
                ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                    $q3->whereBetween('tasks.created_at', [$startMonth, $release_date])
                       ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth]);
                                   
                })
              ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                       $q2->whereBetween('tasks.created_at', [$nextMonth, $release_date])
                        ->where('task_revisions.created_at', '<', $startMonth);
        
            })
                ->groupBy('task_revisions.id')
                ->get();


                $this->dispute_in_previous_cycle = TaskRevision::select(
                    'task_revisions.created_at as revision_date',
                    'task_revisions.revision_acknowledgement as revision_reason',
                    'task_revisions.dispute_created',
                    'task_revisions.final_responsible_person',
                    'task_revisions.added_by',
                    'task_revisions.revision_acknowledgement',
                    'projects.id as projectId',
                    'projects.project_name',
                    'projects.client_id',
                    'project_members.lead_developer_id as ld_id',
                    'task_revision_disputes.*'
                    )
                ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
                ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
                ->leftJoin('projects','task_revisions.project_id','=','projects.id')
                ->leftJoin('project_members','projects.id','=','project_members.project_id')
                ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
               ->where('projects.pm_id', $this->pm->id)
                ->where('task_revisions.dispute_created', 1)
                ->groupBy('task_revisions.id')
                ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                    $q3->whereBetween('tasks.created_at', [$startMonth, $release_date])
                       ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth]);
                                   
                })
              ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                       $q2->whereBetween('tasks.created_at', [$nextMonth, $release_date])
                        ->where('task_revisions.created_at', '<', $startMonth);
        
            })
            
                ->get();

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



       $html = view('dashboard.ajax.pmdashboard.monthly_pm_performance', $this->data)->render();
        // dd($html);

         return Reply::dataOnly([
             'status' => 'success',
             'html' => $html,
         ]);
     }
 }
 public function PmDashboardAdminPmView($pm)
{
     $this->pm = $pm;

    if (request('mode') == 'month' && request()->ajax() && request('pm_id')) {
         $date = Carbon::createFromFormat('Y-m-d', request('startDate'));
        // dd($date);

        $this->startMonth = $date->startOfMonth()->addDays(15)->toDateString();
        $this->endMonth = $date->startOfMonth()->addMonth(1)->addDays(15)->toDateString();
        $this->release_date = $date->endofMonth()->toDateString();
        $this->nextMonth = $date->startOfMonth()->toDateString();

        
        $startMonth= $this->startMonth;
        $endMonth = $this->endMonth;
        $release_date= $this->release_date;
        $nextMonth= $this->nextMonth;




     //    dd($this->startMonth,$this->endMonth, $this->release_date, $this->pm->id);
     $this->no_of_projects = Project::select('projects.*','pm_projects.created_at as project_start_date')
     ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
     ->where('projects.pm_id', $this->pm->id)

     ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
     ->orderBy('pm_projects.created_at','desc')
     ->get();
     //dd($this->no_of_projects );
   //dd(count($this->no_of_projects));
   $this->no_of_accepted_projects= Project::select('projects.*','pm_projects.created_at as project_start_date',
   'project_members.created_at as project_accept_date'
   )
   ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
   ->leftJoin('project_members','project_members.project_id','projects.id')
   ->where('projects.pm_id', $this->pm->id)
   ->where('project_members.user_id', $this->pm->id)

   ->where('projects.project_status','Accepted')

  // ->orWhere('project_status','pending')
   ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
   ->orderBy('pm_projects.created_at','desc')
   ->groupBy('project_members.project_id')
   ->get();
     $this->no_of_rejected_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
     ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
     ->where('projects.pm_id', $this->pm->id)
     ->where('projects.project_status','Not Accepted')


     ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
     ->orderBy('pm_projects.created_at','desc')
     ->get();
     $this->total_project_value = Project::select('projects.*','pm_projects.created_at as project_start_date')
     ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
     ->where('projects.pm_id', $this->pm->id)


     ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
     ->sum('projects.project_budget');
     $this->accepted_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.project_status','Accepted')


      ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
      ->sum('projects.project_budget');
      $this->rejected_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.project_status','Not Accepted')


      ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
      ->sum('projects.project_budget');
      $this->total_released_amount_this_cycle = Project::select('projects.*','project_milestones.status as milestone_status','payments.paid_on as milestone_completion_date')

      ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      ->where('projects.pm_id', $this->pm->id)
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
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
      ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
      ->orderBy('payments.paid_on','desc')

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
     
     ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

      $q3->where('projects.pm_id', $this->pm->id)
         ->whereBetween('payments.paid_on', [$startMonth, $release_date])
         ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth]);
                     
  })
->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
         $q2->where('projects.pm_id', $this->pm->id)
           
             ->whereBetween('payments.paid_on', [$nextMonth, $release_date])
             ->where('project_milestones.created_at', '<', $startMonth);

         
  
})->sum('project_milestones.cost');
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
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->where('projects.pm_id', $this->pm->id)
             ->whereBetween('payments.paid_on', [$startMonth, $release_date])
             ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth]);
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->where('projects.pm_id', $this->pm->id)
               
                 ->whereBetween('payments.paid_on', [$nextMonth, $release_date])
                 ->where('project_milestones.created_at', '<', $startMonth);

  })
     // ->take(2)
     ->orderBy('payments.paid_on','desc')
      ->get();
      $this->no_of_finished_projects_this_cycle= Project::select('projects.*',
      'pm_projects.created_at as project_start_date',
      'projects.updated_at as project_completion_date',
      'project_members.created_at as project_accept_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('project_members.user_id', $this->pm->id)
      ->where('projects.status','finished')

      ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
      ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
      ->orderBy('projects.updated_at','desc')
      ->groupBy('project_members.project_id')
      ->get();
     
      $this->no_of_finished_projects_previous_cycle= Project::select('projects.*'
      ,'pm_projects.created_at as project_start_date',
      'projects.updated_at as project_completion_date', 'project_members.created_at as project_accept_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
      
     

      // ->whereNotBetween('pm_projects.created_at', [$this->endMonth, $this->release_date])
      // ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
             ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
             ->where('projects.pm_id', $this->pm->id)
             ->where('projects.status','finished')
             ->where('project_members.user_id', $this->pm->id)
             ->where('projects.status','finished')
 
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
              ->where('pm_projects.created_at', '<', $startMonth)
              ->where('projects.pm_id', $this->pm->id)
              ->where('projects.status','finished')
              ->where('project_members.user_id', $this->pm->id)
              ->where('projects.status','finished')
  
              ;

  })
      ->groupBy('project_members.project_id')
      ->orderBy('projects.updated_at','desc')
    
      ->get();


      $this->value_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.status','finished')

      ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
      ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
      ->sum('projects.project_budget');
     

      $this->value_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
    
      //->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
             ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
             ->where('projects.pm_id', $this->pm->id)

             ->where('projects.status','finished');
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
              ->where('pm_projects.created_at', '<', $startMonth)
              ->where('projects.pm_id', $this->pm->id)

              ->where('projects.status','finished');

  })
      ->sum('projects.project_budget');
      //sayeed code start
//       $this->no_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
//       ->where('projects.pm_id', $this->pm->id)
//       ->where('projects.status', 'in progress')
//       ->whereNull('project_milestones.id')

//       ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//       ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
//       ->orderBy('projects.updated_at','desc')
//       ->get();
//       $this->value_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
//       ->where('projects.pm_id', $this->pm->id)
//       ->where('projects.status', 'in progress')
//       ->whereNull('project_milestones.id')

//       ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//       ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
//       ->orderBy('projects.updated_at','desc')
//       ->sum('projects.project_budget');

      
//       $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
    
//      // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

//       $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
//          ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//          ->where('projects.pm_id', $this->pm->id)
//          ->where('projects.status', 'in progress')
   
//          ->whereNull('project_milestones.id')
//          ;
                     
//   })
// ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
//          $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
//           ->where('pm_projects.created_at', '<', $startMonth)
//           ->where('projects.pm_id', $this->pm->id)
//           ->where('projects.status', 'in progress')
    
//           ->whereNull('project_milestones.id')
//           ;

// })
//       ->orderBy('projects.updated_at','desc')
//       ->get();
//       $this->value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//          ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//          ->leftJoin('project_milestones', function ($join) {
//              $join->on('projects.id', '=', 'project_milestones.project_id')
//                  ->where('project_milestones.status','<>', 'complete')
//                  ->where('project_milestones.project_completion_status', 0)
//                  ->where('project_milestones.qc_status', 0);
//          })
      
//         // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

//          $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
//             ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//             ->where('projects.pm_id', $this->pm->id)
//             ->where('projects.status', 'in progress')
   
//             ->whereNull('project_milestones.id')
//             ;
                        
//      })
//    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
//             $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
//              ->where('pm_projects.created_at', '<', $startMonth)
//              ->where('projects.pm_id', $this->pm->id)
//              ->where('projects.status', 'in progress')
    
//              ->whereNull('project_milestones.id')
//              ;

//  })
//          ->sum('projects.project_budget');
//          $this->no_of_100_and_finish_this_cycle = $this->no_of_100_finished_project_this_cycle->concat($this->no_of_finished_projects_this_cycle);
//          $this->no_of_100_and_finish_previous_cycle = $this->no_of_100_finished_project_previous_cycle->concat($this->no_of_finished_projects_previous_cycle);
//          $this->value_of_100_and_finish_this_cycle = $this->value_of_100_finished_project_this_cycle+$this->value_of_finished_projects_this_cycle;
//          $this->value_of_100_and_finish_previous_cycle = $this->value_of_100_finished_project_previous_cycle+$this->value_of_finished_projects_previous_cycle;
            //sayeed code end 
            //enan updated code start 
                        //---------------------------------in progress for cycle----------------------------------------//
                        $count = 0;
                        $no_of_100_finished_project_this_cycle = [];
                        $value_of_100_finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                        ->leftJoin('project_milestones', function ($join) {
                            $join->on('projects.id', '=', 'project_milestones.project_id')
                            ->where('project_milestones.status', '<>', 'complete')
                                ->where('project_milestones.project_completion_status', 0)
                                ->where('project_milestones.qc_status', 0);
                        })
                            ->where('projects.pm_id', $this->pm->id)
                            ->whereNull('project_milestones.id')
                            ->get();
                        foreach ($value_of_100_finished_project_this_cycle as $project) {
            
                            $maxEndDate = ProjectMilestone::where('project_id', $project->id)
                                ->max('end_date');
            
                            if ($maxEndDate != NULL) {
                                $project->project_completion_date = $maxEndDate;
                                $project_completion_date = Carbon::parse($project->project_completion_date);
            
                                if ($project->project_start_date >= $startMonth && $project->project_start_date <= $endMonth) {
                                    if ($project_completion_date >= $startMonth && $project_completion_date <= $release_date) {
            
                                        $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                        ->where('projects.id', $project->id)
                                            ->first();

                                       $manager_accept_date = ProjectMember::where('project_id', $project->id)
                                         ->where('user_id', $this->pm->id)
                                         ->min('created_at');
                                        $finished_project_this_cycle->manager_accept_date = $manager_accept_date;

                                        $finished_project_this_cycle->project_completion_date = $maxEndDate;
            
                                        $no_of_100_finished_project_this_cycle[] = $finished_project_this_cycle;
            
                                        $count += $project->project_budget;
                                    }
                                }
                            }
                        }
            
                        $this->value_of_100_finished_project_this_cycle = $count;
                        $this->no_of_100_finished_project_this_cycle = $no_of_100_finished_project_this_cycle;
            
                        //---------------------------------in progress for cycle----------------------------------------//
            
            
            
            
                        //---------------------------------in progress in this cycle----------------------------------------//
                             
                               $count=0;
                               $no_of_100_finished_project_previous_cycle = [];  
                              $value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date')
                                 ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                 ->leftJoin('project_milestones', function ($join) {
                                     $join->on('projects.id', '=', 'project_milestones.project_id')
                                         ->where('project_milestones.status','<>', 'complete')
                                         ->where('project_milestones.project_completion_status', 0)
                                         ->where('project_milestones.qc_status', 0);
                                 })
                                 ->where('projects.pm_id', $this->pm->id)
                                 ->whereNull('project_milestones.id')
                                 ->get();
                              foreach($value_of_100_finished_project_previous_cycle as $project){
            
                                    $maxEndDate = ProjectMilestone::where('project_id', $project->id)
                                              ->max('end_date');
                                       
                            if ($maxEndDate != NULL){
                                    $project->project_completion_date= $maxEndDate;
                                    $project_completion_date = Carbon::parse($project->project_completion_date);
                            if ($project->project_start_date < $startMonth){
                                if ($project_completion_date >= $nextMonth && $project_completion_date <= $release_date) {
            
                                        $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                            ->where('projects.id', $project->id)
                                            ->first();

                            $manager_accept_date = ProjectMember::where('project_id', $project->id)
                            ->where('user_id', $this->pm->id)
                            ->min('created_at');
                            $finished_project_this_cycle->manager_accept_date = $manager_accept_date;
                            
                                        $finished_project_this_cycle->project_completion_date = $maxEndDate;
            
                                        $no_of_100_finished_project_previous_cycle[] = $finished_project_this_cycle;
            
                                         $count+= $project->project_budget;                    
                                }
                            }
            
                            if ($project->project_start_date >= $startMonth && $project->project_start_date <= $endMonth ) {
                                if ($project_completion_date >= $startMonth && $project_completion_date <= $release_date) {
            
                                        $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                            ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                            ->where('projects.id', $project->id)
                                            ->first();


                                         $manager_accept_date = ProjectMember::where('project_id', $project->id)
                                             ->where('user_id', $this->pm->id)
                                             ->min('created_at');
                                         $finished_project_this_cycle->manager_accept_date = $manager_accept_date;


                                        $finished_project_this_cycle->project_completion_date = $maxEndDate;
            
                                        $no_of_100_finished_project_previous_cycle[] = $finished_project_this_cycle;
            
                                        $count += $project->project_budget;
                                }
                            }
                        }                        
                              }
            
                        $this->value_of_100_finished_project_previous_cycle = $count;
                        $this->no_of_100_finished_project_previous_cycle = $no_of_100_finished_project_previous_cycle;
                        
            
                        //---------------------------------in progress in this cycle----------------------------------------//
            
            
            
            
                     $this->no_of_100_and_finish_this_cycle = $this->no_of_100_finished_project_this_cycle;
                     $this->no_of_100_and_finish_previous_cycle = $this->no_of_100_finished_project_previous_cycle;
                     $this->value_of_100_and_finish_this_cycle = $this->value_of_100_finished_project_this_cycle;
                     $this->value_of_100_and_finish_previous_cycle = $this->value_of_100_finished_project_previous_cycle;
            
            //enan updated code end
if (count($this->no_of_accepted_projects) > 0 ) {
             $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
             $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
             $this->project_completion_rate_count_this_cycle_100_in_progress=  ((count($this->no_of_100_and_finish_this_cycle))/(count($this->no_of_accepted_projects)) )*100;

         }else {
             $this->project_completion_rate_count_this_cycle= 0;
             $this->project_completion_rate_count_previous_cycle = 0;
             $this->project_completion_rate_count_this_cycle_100_in_progress= 0;



         }
         if(count($this->no_of_100_and_finish_this_cycle) > 0)
         {
             $this->project_completion_rate_count_previous_cycle_100_in_progress = ((count($this->no_of_100_and_finish_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_100_and_finish_previous_cycle))- (count($this->no_of_100_and_finish_this_cycle))) * 100);

         }else
         {
             $this->project_completion_rate_count_previous_cycle_100_in_progress = 0;

         }
         if($this->value_of_100_and_finish_previous_cycle > 0)
         {
             $this->project_completion_rate_count_previous_cycle_value_100_in_progress = (($this->value_of_100_and_finish_previous_cycle) / ($this->accepted_project_value+$this->value_of_100_and_finish_previous_cycle- $this->value_of_100_and_finish_this_cycle) * 100);

         }else
         {
             $this->project_completion_rate_count_previous_cycle_value_100_in_progress = 0;

         }


         if (($this->accepted_project_value) > 0 ) {
             $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->accepted_project_value) )*100;
             $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->accepted_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
             $this->project_completion_rate_count_this_cycle_value_100_in_progress=  ($this->value_of_100_and_finish_this_cycle/$this->accepted_project_value )*100;

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
        ->where('projects.pm_id', $this->pm->id)
         ->where('deals.client_badge','new client')
         ->groupBy('clients.id')
         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->whereBetween('clients.created_at', [$this->startMonth, $this->endMonth])
         ->orderBy('clients.created_at','desc')
         ->get();
         $this->no_of_existing_clients_this_cycle = Project::select('clients.*','deals.client_badge')
         ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
         ->join('deals', 'deals.client_id', 'projects.client_id')
         ->join('users as clients','clients.id','projects.client_id')
        ->where('projects.pm_id', $this->pm->id)
         ->where('deals.client_badge','<>','new client')
         ->groupBy('clients.id')
         ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
         ->orderBy('clients.created_at','desc')
         ->get();

         $this->total_client_monthly = $this->no_of_new_clients_this_cycle->concat($this->no_of_existing_clients_this_cycle);

         $this->total_milestone_assigned_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
         'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
         )
         ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)

         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->orderBy('project_milestones.created_at','desc')

         ->get();
         $this->total_milestone_assigned_this_cycle_value= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
         'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
         )
         ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
        ->where('projects.pm_id', $this->pm->id)

         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->sum('project_milestones.cost');
         $this->total_milestone_completed_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
         'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
         )
         ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
         ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
         ->leftJoin('payments','payments.invoice_id','invoices.id')
         ->orderBy('payments.paid_on','desc')
        //->groupBy('project_milestones.id')

        // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
         ->whereBetween('payments.paid_on', [$this->startMonth, $this->release_date])
        ->where('projects.pm_id', $this->pm->id)
         ->where('project_milestones.status', 'complete')


         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->get();

         $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
         'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
         )
         ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
         ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
         ->leftJoin('payments','payments.invoice_id','invoices.id')
        
        //->groupBy('project_milestones.id')

        ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

         $q3->whereBetween('payments.paid_on', [$startMonth, $release_date])
            ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
            ->where('projects.pm_id', $this->pm->id)
        
            ->where('project_milestones.status', 'complete')
            ;
                        
     })
   ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
            $q2->whereBetween('payments.paid_on', [$nextMonth, $release_date])
             ->where('project_milestones.created_at', '<', $startMonth)
             ->where('projects.pm_id', $this->pm->id)
        
             ->where('project_milestones.status', 'complete')
             ;

 })
       
        // ->whereBetween('project_milestones.updated_at', [$startMonth, $endMonth])
        ->orderBy('payments.paid_on','desc')
         ->get();
         $this->total_milestone_completed_this_current_month= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
         'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
         )
         ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
         ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
         ->leftJoin('payments','payments.invoice_id','invoices.id')
         ->orderBy('payments.paid_on','desc')
        //->groupBy('project_milestones.id')

        // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
         ->whereBetween('payments.paid_on', [$this->startMonth, $this->endMonth])
        ->where('projects.pm_id', $this->pm->id)
         ->where('project_milestones.status', 'complete')


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
         $this->total_tasks_assigned_this_cycle= Task::select('tasks.*')
         ->leftJoin('task_users','task_users.task_id','tasks.id')
         ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
        ->where('tasks.added_by', $this->pm->id)->count();
         $this->total_tasks_assigned_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
         DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
         )
         ->leftJoin('task_users','task_users.task_id','tasks.id')
         ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')


         ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
        ->where('tasks.added_by', $this->pm->id)
         ->orderBy('tasks.created_at','desc')
         ->get();

        // dd($this->total_tasks_assigned_this_cycle_get);
         $this->total_tasks_completed_this_cycle= Task::select('tasks.*')
         ->leftJoin('task_users','task_users.task_id','tasks.id')
         ->where('board_column_id',4)
        ->where('tasks.added_by', $this->pm->id)
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
         $this->total_tasks_completed_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar','tasks.updated_at as task_completion_date',
         DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
         )
         ->leftJoin('task_users','task_users.task_id','tasks.id')
         ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')


         ->where('board_column_id',4)
        ->where('tasks.added_by', $this->pm->id)
         ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
         ->whereBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
         ->orderBy('tasks.updated_at','desc')
         ->get();
         //enan code
         $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
         ->leftJoin('task_users','task_users.task_id','tasks.id')

         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->where('board_column_id',4)
                   ->where('tasks.added_by', $this->pm->id)
                    ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
                    ->whereBetween('tasks.created_at', [$startMonth, $endMonth]);
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->where('board_column_id',4)
                      ->where('tasks.added_by', $this->pm->id)
                        ->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
                        ->where('tasks.created_at', '<', $startMonth);

                    
             
         })
         ->count();
          //   sayeed code 

     //     $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
     //     ->leftJoin('task_users','task_users.task_id','tasks.id')
     //     ->where('board_column_id',4)
     //    ->where('tasks.added_by', $this->pm->id)
     //     ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
     //     ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
     //   //  ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
     //     ->count();


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
        //code sayeed
     //     $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
     //     DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
     //     )
     //     ->leftJoin('task_users','task_users.task_id','tasks.id')

     //     ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')

     //     ->where('board_column_id',4)
     //    ->where('tasks.added_by', $this->pm->id)
     //     ->whereNotBetween('tasks.created_at', [$this->endMonth, $this->release_date])
     //     ->whereBetween('tasks.updated_at', [$this->startMonth, $this->release_date])
     //    // ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
     //    ->orderBy('tasks.updated_at','desc')
     //     ->get();

     //code enan 
     $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
     DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
     )
     ->leftJoin('task_users','task_users.task_id','tasks.id')

     ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')

     ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

         $q3->where('board_column_id',4)
           ->where('tasks.added_by', $this->pm->id)
            ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
            ->whereBetween('tasks.created_at', [$startMonth, $endMonth]);
                        
     })
   ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
            $q2->where('board_column_id',4)
              ->where('tasks.added_by', $this->pm->id)
                ->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
                ->where('tasks.created_at', '<', $startMonth);

            
     
 })
    // ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
    ->orderBy('tasks.updated_at','desc')
     ->get();
         
         $this->average_project_completion_rate = Project::select(
             'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
             DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
         )
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
             ->where('projects.status', 'finished')
            ->where('projects.pm_id', $this->pm->id)
             ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
             ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
             ->orderBy('projects.updated_at','desc')
             ->get();

         $this->average_completion_days = $this->average_project_completion_rate->avg('completion_time_days');
         $this->average_project_completion_rate_previous_cycle = Project::select(
             'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
             DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
         )
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            
            // ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
         //    ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
         //     ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
         ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

             $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                ->where('projects.status', 'finished')
                ->where('projects.pm_id', $this->pm->id)
                ;
                            
         })
       ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                 ->where('p_m_projects.created_at', '<', $startMonth)
                 ->where('projects.status', 'finished')
                 ->where('projects.pm_id', $this->pm->id)
                 ;
 
     })
             ->orderBy('projects.updated_at','desc')
             ->get();

         $this->average_completion_days_previous_cycle = $this->average_project_completion_rate_previous_cycle->avg('completion_time_days');
         // /dd($this->average_completion_days);
         $this->cancelled_projects_this_cycle=  Project::select(
             'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',

         )
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
             ->whereIn('projects.status', ['canceled','partially finished'])

            ->where('projects.pm_id', $this->pm->id)
             ->where('projects.project_status','Accepted')
             ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
             ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
             ->orderBy('projects.updated_at','desc')
             ->get();

             $this->cancelled_projects_previous_cycle=  Project::select(
                 'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',


             )
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')

            

             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->whereIn('projects.status', ['canceled','partially finished'])
                    ->where('projects.project_status','Accepted')
       
                   ->where('projects.pm_id', $this->pm->id)
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                     ->where('p_m_projects.created_at', '<', $startMonth)
                     ->whereIn('projects.status', ['canceled','partially finished'])
                     ->where('projects.project_status','Accepted')
        
                    ->where('projects.pm_id', $this->pm->id)
                     ;
     
         })
                 ->orderBy('projects.updated_at','desc')
                 ->get();
         $this->no_of_new_deals_added_previous = Deal::select('deals.*')
         ->where('deals.added_by', $this->pm->id)
         ->whereBetween('deals.created_at', [$this->startMonth, $this->endMonth])
         ->orderBy('deals.created_at','desc')
         ->get();
         $this->no_of_new_milestones_added_on_old_projects = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
         ->join('projects','projects.id','project_milestones.project_id')
         ->join('deals','deals.id','projects.deal_id')
         ->where('deals.project_type','fixed')
         ->where('projects.pm_id',$this->pm->id)
         ->where('project_milestones.added_by',$this->pm->id)
         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->where('project_milestones.status','!=','canceled')
         ->orderBy('project_milestones.created_at','desc')
         ->get();
         $this->no_of_new_milestones_added_on_old_projects_id = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId','projects.status as projectStatus')
         ->join('projects','projects.id','project_milestones.project_id')
         ->join('deals','deals.id','projects.deal_id')
         ->where('deals.project_type','fixed')
         ->where('projects.pm_id',$this->pm->id)
         ->where('project_milestones.added_by',$this->pm->id)
         ->groupBy('project_milestones.project_id')
         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->where('project_milestones.status','!=','canceled')
         ->orderBy('project_milestones.created_at','desc')
         ->get();
         $this->no_of_new_milestones_added_on_old_projects_value = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
         ->join('projects','projects.id','project_milestones.project_id')
         ->join('deals','deals.id','projects.deal_id')
         ->where('deals.project_type','fixed')
         ->where('projects.pm_id',$this->pm->id)
         ->where('project_milestones.added_by',$this->pm->id)
         ->where('project_milestones.status','!=','canceled')
         ->whereBetween('project_milestones.created_at', [$this->startMonth, $this->endMonth])
         ->sum('project_milestones.cost');
         $this->no_of_delayed_projects = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
            
            'project_members.created_at as project_accept_date')
            ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
            ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {
                $q3->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                   ->where('project_members.user_id', $this->pm->id)
                   ->where('projects.project_status', 'Accepted')
                   ->where('p_m_projects.delayed_status', 1) ;                            
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                    ->where('p_m_projects.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status','!=','in progress')
                    ->where('p_m_projects.delayed_status', 1);
    
        })
        ->groupBy('project_members.project_id')
            ->orderBy('projects.updated_at','desc')
            ->get();

        // dd($delay_date);

             $this->no_of_delayed_projects_finished = Project::select('projects.*','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date','project_members.created_at as project_accept_date')
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
             ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
           
             // ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
             // ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)

                    ->where('projects.status', 'finished')
                    ->where('p_m_projects.delayed_status', 1)
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                     ->where('p_m_projects.created_at', '<', $startMonth)
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('project_members.user_id', $this->pm->id)

                     ->where('projects.status', 'finished')
                     ->where('p_m_projects.delayed_status', 1)
                     ;
     
         })
             ->orderBy('projects.updated_at','desc')
             ->groupBy('project_members.project_id')

             ->get();



             $this->no_of_delayed_projects_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
             'project_members.created_at as project_accept_date'
             )
                 ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                 ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                 ->where('projects.pm_id', $this->pm->id)
                 ->where('project_members.user_id', $this->pm->id)
                 ->where('projects.project_status', 'Accepted')
                
                 ->where('p_m_projects.delayed_status', 1)
                 ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                 ->groupBy('project_members.project_id')
                 ->orderBy('projects.updated_at','desc')


                 // Compare against the calculated deadline date
                 ->get();
                 $this->no_of_delayed_projects_finished_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date',
                 'project_members.created_at as project_accept_date')
                 ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                 ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                 ->where('projects.pm_id', $this->pm->id)
                 ->where('project_members.user_id', $this->pm->id)
                 ->where('projects.project_status', 'Accepted')
                 ->where('projects.status', 'finished')
                 ->where('p_m_projects.delayed_status', 1)
                 ->whereBetween('p_m_projects.created_at', [$this->startMonth, $this->endMonth])
                 ->whereBetween('projects.updated_at', [$this->startMonth, $this->endMonth])
                 ->groupBy('project_members.project_id')
                 ->orderBy('projects.updated_at','desc')

                 ->get();

             $this->caused_by_me_for_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.added_by',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id',
                 'task_revision_disputes.*'
                 )
             ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
             ->leftJoin('projects','task_revisions.project_id','=','projects.id')
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                   ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                 
                   ->where('task_revisions.dispute_created', 1)
                   ->where('task_revisions.final_responsible_person', 'PM')
                   ;
                               
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                    ->where('task_revisions.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.dispute_created', 1)
                    ->where('task_revisions.final_responsible_person', 'PM')
                   
                    ;
                })
        
             ->groupBy('task_revisions.id')
            
             ->get();


             $this->caused_by_other_for_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.added_by',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id'
             )
             ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
             ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
           
           
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                   ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                 
                   ->where('task_revisions.dispute_created', 1)
                   ->where('task_revisions.final_responsible_person', '!=', 'PM')
                   ;
                               
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                    ->where('task_revisions.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.dispute_created', 1)
                    ->where('task_revisions.final_responsible_person', '!=', 'PM')
                   
                    ;
                })
    
             ->groupBy('task_revisions.id')
             ->get();

             $this->dispute_for_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.final_responsible_person',
                 'task_revisions.added_by',
                 'task_revisions.revision_acknowledgement',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id',
                 'project_members.lead_developer_id as ld_id',
                 'task_revision_disputes.*'
                 )
             ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
             ->leftJoin('projects','task_revisions.project_id','=','projects.id')
             ->leftJoin('project_members','projects.id','=','project_members.project_id')
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                   ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                 
                   ->where('task_revisions.dispute_created', 1)
                   ;
                               
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                    ->where('task_revisions.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.dispute_created', 1)
                   
                    ;
    
        })
          
             ->groupBy('task_revisions.id')
             ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
             ->get();



             $this->caused_by_me_in_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.added_by',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id',
                 'task_revision_disputes.*'
                 )
             ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
             ->leftJoin('projects','task_revisions.project_id','=','projects.id')
             ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
          
            
             // ->whereBetween('task_revisions.created_at', [$this->startMonth, $this->endMonth])
             // ->whereNotBetween('tasks.created_at', [$this->startMonth, $this->endMonth])
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.final_responsible_person','PM')
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                     ->where('task_revisions.created_at', '<', $startMonth)
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('task_revisions.final_responsible_person','PM')
                     ;
     
         })
             ->groupBy('task_revisions.id')
             ->get();


             $this->caused_by_other_in_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.added_by',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id'
             )
             ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
             ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
             ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
           
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.final_responsible_person', '!=', 'PM')
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                     ->where('task_revisions.created_at', '<', $startMonth)
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('task_revisions.final_responsible_person', '!=', 'PM')
                     ;
     
         })
             ->groupBy('task_revisions.id')
             ->get();


             $this->dispute_in_previous_cycle = TaskRevision::select(
                 'task_revisions.created_at as revision_date',
                 'task_revisions.revision_acknowledgement as revision_reason',
                 'task_revisions.dispute_created',
                 'task_revisions.final_responsible_person',
                 'task_revisions.added_by',
                 'task_revisions.revision_acknowledgement',
                 'projects.id as projectId',
                 'projects.project_name',
                 'projects.client_id',
                 'project_members.lead_developer_id as ld_id',
                 'task_revision_disputes.*'
                 )
             ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
             ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
             ->leftJoin('projects','task_revisions.project_id','=','projects.id')
             ->leftJoin('project_members','projects.id','=','project_members.project_id')
             ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
           
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                    ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('task_revisions.dispute_created', 1)
                 
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                     ->where('task_revisions.created_at', '<', $startMonth)
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('task_revisions.dispute_created', 1)
                  
                     ;
     
         })
         ->groupBy('task_revisions.id')
         
             ->get();

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

    $html = view('dashboard.ajax.pmdashboard.monthly_pm_performance_filter', $this->data)->render();

      return Reply::dataOnly([
          'status' => 'success',
          'html' => $html,
      ]);
  }  else {
     $this->pm = $pm;

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
          $nextMonth = Carbon::now()->startOfMonth()->addMonth(1)->toDateString();
         // dd($startMonth,$endMonth, $release_date,$nextMonth);
      } else {
          $startMonth = Carbon::now()->startOfMonth()->subMonths(1)->addDays(15)->toDateString();
          $endMonth = Carbon::now()->startOfMonth()->addDays(14)->toDateString();
          $release_date = Carbon::now()->endOfMonth()->toDateString();
          $nextMonth = Carbon::now()->startOfMonth()->toDateString();

       //   dd($startMonth,$endMonth, $release_date,$nextMonth);
      }
      //dd($startMonth, $endMonth,$release_date);
      $this->no_of_projects = Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->orderBy('pm_projects.created_at','desc')
      ->get();
    //dd(count($this->no_of_projects));
    $this->no_of_accepted_projects= Project::select('projects.*','pm_projects.created_at as project_start_date',
    'project_members.created_at as project_accept_date')
    ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
    ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
    ->where('projects.pm_id', $this->pm->id)
    ->where('projects.project_status','Accepted')
    ->where('project_members.user_id', $this->pm->id)

    ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
    ->groupBy('project_members.project_id')
    ->orderBy('pm_projects.created_at','desc')
    ->get();
      $this->no_of_rejected_projects= Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.project_status','Not Accepted')

      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->orderBy('pm_projects.created_at','desc')
      ->get();
      $this->total_project_value = Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->join('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->sum('projects.project_budget');
      $this->accepted_project_value= Project::select('projects.*','pm_projects.created_at as project_start_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.project_status','Accepted')


      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->sum('projects.project_budget');
      $this->rejected_project_value= Project::select('projects.*')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.project_status','Not Accepted')


      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->sum('projects.project_budget');
      $this->total_released_amount_this_cycle = Project::select('projects.*')

      ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      ->where('projects.pm_id', $this->pm->id)

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
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
      ->whereBetween('payments.paid_on', [$startMonth, $release_date])
      ->orderBy('payments.paid_on','desc')

      ->get();
      $this->total_released_amount_previous_cycle = Project::select('projects.*')

      ->leftJoin('project_milestones','project_milestones.project_id','projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      
     // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
     ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

        $q3->whereBetween('payments.paid_on', [$startMonth, $release_date])
           ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
           ->where('projects.pm_id', $this->pm->id)
           ;
                       
    })
  ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
           $q2->whereBetween('payments.paid_on', [$nextMonth, $release_date])
            ->where('project_milestones.created_at', '<', $startMonth)
            ->where('projects.pm_id', $this->pm->id)
            ;
  
  })
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
    
     // ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
  //    ->whereNotBetween('project_milestones.created_at', [$endMonth, $release_date])
  //     ->whereBetween('payments.paid_on', [$startMonth, $release_date])
  ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

      $q3->whereBetween('payments.paid_on', [$startMonth, $release_date])
         ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
         ->where('projects.pm_id', $this->pm->id)
         ;
                     
  })
->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
         $q2->whereBetween('payments.paid_on', [$nextMonth, $release_date])
          ->where('project_milestones.created_at', '<', $startMonth)
          ->where('projects.pm_id', $this->pm->id)
          ;

})
      ->orderBy('payments.paid_on','desc')

      ->get();
      $this->no_of_finished_projects_this_cycle= Project::select('projects.*',
      'pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
      'project_members.created_at as project_accept_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('project_members.user_id', $this->pm->id)
      ->where('projects.status','finished')

      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->whereBetween('projects.updated_at', [$startMonth, $release_date])
      ->groupBy('project_members.project_id')
      ->orderBy('projects.updated_at','desc')
      ->get();
      $this->no_of_finished_projects_previous_cycle= Project::select('projects.*','project_members.created_at as project_accept_date','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->leftJoin('project_members', 'project_members.project_id', 'projects.id')

      // ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
      // ->whereBetween('projects.updated_at', [$startMonth, $release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
             ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
             ->where('projects.pm_id', $this->pm->id)
             ->where('projects.status','finished')
             ->where('project_members.user_id', $this->pm->id)
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
              ->where('pm_projects.created_at', '<', $startMonth)
              ->where('projects.pm_id', $this->pm->id)
              ->where('projects.status','finished')
              ->where('project_members.user_id', $this->pm->id)
              ;

  })
      ->orderBy('projects.updated_at','desc')
      ->groupBy('project_members.project_id')
      ->get();
      $this->value_of_finished_projects_this_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)
      ->where('projects.status','finished')

      ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
      ->whereBetween('projects.updated_at', [$startMonth, $release_date])
      ->sum('projects.project_budget');
      $this->value_of_finished_projects_previous_cycle= Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
      ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
    

      // ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
      // ->whereBetween('projects.updated_at', [$startMonth, $release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
             ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
             ->where('projects.pm_id', $this->pm->id)
             ->where('projects.status','finished')
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
              ->where('pm_projects.created_at', '<', $startMonth)
              ->where('projects.pm_id', $this->pm->id)
              ->where('projects.status','finished')
              ;

  })
      ->sum('projects.project_budget');
      //sayeed code start
//       $this->no_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
//       ->where('projects.pm_id', $this->pm->id)
//       ->where('projects.status', 'in progress')
//       ->whereNull('project_milestones.id')

//       ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//       ->whereBetween('projects.updated_at', [$startMonth, $release_date])
//       ->orderBy('projects.updated_at','desc')
//       ->get();
//       $this->value_of_100_finished_project_this_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
//       ->where('projects.pm_id', $this->pm->id)
//       ->where('projects.status', 'in progress')
//       ->whereNull('project_milestones.id')

//       ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//       ->whereBetween('projects.updated_at', [$startMonth, $release_date])
//       ->orderBy('projects.updated_at','desc')
//       ->sum('projects.project_budget');
//       $this->no_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
    
//      // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//   //    ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
//   //     ->whereBetween('projects.updated_at', [$startMonth, $release_date])
//   ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

//       $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
//          ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//          ->where('projects.pm_id', $this->pm->id)
//          ->where('projects.status', 'in progress')
   
//          ->whereNull('project_milestones.id')
//          ;
                     
//   })
// ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
//          $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
//           ->where('pm_projects.created_at', '<', $startMonth)
//           ->where('projects.pm_id', $this->pm->id)
//           ->where('projects.status', 'in progress')
    
//           ->whereNull('project_milestones.id')
//           ;

// })
//       ->orderBy('projects.updated_at','desc')
//       ->get();
//       $this->value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date','projects.updated_at as project_completion_date')
//       ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
//       ->leftJoin('project_milestones', function ($join) {
//           $join->on('projects.id', '=', 'project_milestones.project_id')
//               ->where('project_milestones.status','<>', 'complete')
//               ->where('project_milestones.project_completion_status', 0)
//               ->where('project_milestones.qc_status', 0);
//       })
     
//      // ->whereBetween('pm_projects.created_at', [$this->startMonth, $this->endMonth])
//   //    ->whereNotBetween('pm_projects.created_at', [$endMonth, $release_date])
//   //     ->whereBetween('projects.updated_at', [$startMonth, $release_date])
//   ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

//       $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
//          ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
//          ->where('projects.pm_id', $this->pm->id)
//          ->where('projects.status', 'in progress')
   
//          ->whereNull('project_milestones.id')
//          ;
                     
//   })
// ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
//          $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
//           ->where('pm_projects.created_at', '<', $startMonth)
//           ->where('projects.pm_id', $this->pm->id)
//           ->where('projects.status', 'in progress')
    
//           ->whereNull('project_milestones.id')
//           ;

// })
//       ->sum('projects.project_budget');
//       $this->no_of_100_and_finish_this_cycle = $this->no_of_100_finished_project_this_cycle->concat($this->no_of_finished_projects_this_cycle);
//       $this->no_of_100_and_finish_previous_cycle = $this->no_of_100_finished_project_previous_cycle->concat($this->no_of_finished_projects_previous_cycle);
//       $this->value_of_100_and_finish_this_cycle = $this->value_of_100_finished_project_this_cycle+$this->value_of_finished_projects_this_cycle;
//       $this->value_of_100_and_finish_previous_cycle = $this->value_of_100_finished_project_previous_cycle+$this->value_of_finished_projects_previous_cycle;
        //sayeed code end 
        //enan updated code start 
                    //---------------------------------in progress for cycle----------------------------------------//
                    $count = 0;
                    $no_of_100_finished_project_this_cycle = [];
                    $value_of_100_finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                    ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                    ->leftJoin('project_milestones', function ($join) {
                        $join->on('projects.id', '=', 'project_milestones.project_id')
                        ->where('project_milestones.status', '<>', 'complete')
                            ->where('project_milestones.project_completion_status', 0)
                            ->where('project_milestones.qc_status', 0);
                    })
                        ->where('projects.pm_id', $this->pm->id)
                        ->whereNull('project_milestones.id')
                        ->get();
                    foreach ($value_of_100_finished_project_this_cycle as $project) {
        
                        $maxEndDate = ProjectMilestone::where('project_id', $project->id)
                            ->max('end_date');
        
                        if ($maxEndDate != NULL) {
                            $project->project_completion_date = $maxEndDate;
                            $project_completion_date = Carbon::parse($project->project_completion_date);
        
                            if ($project->project_start_date >= $startMonth && $project->project_start_date <= $endMonth) {
                                if ($project_completion_date >= $startMonth && $project_completion_date <= $release_date) {
        
                                    $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                    ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                    ->where('projects.id', $project->id)
                                        ->first();

                                    $manager_accept_date = ProjectMember::where('project_id', $project->id)
                                      ->where('user_id', $this->pm->id)
                                      ->min('created_at');
                                    $finished_project_this_cycle->manager_accept_date = $manager_accept_date;

                                    $finished_project_this_cycle->project_completion_date = $maxEndDate;
        
                                    $no_of_100_finished_project_this_cycle[] = $finished_project_this_cycle;
        
                                    $count += $project->project_budget;
                                }
                            }
                        }
                    }
        
                    $this->value_of_100_finished_project_this_cycle = $count;
                    $this->no_of_100_finished_project_this_cycle = $no_of_100_finished_project_this_cycle;
        
                    //---------------------------------in progress for cycle----------------------------------------//
        
        
        
        
                    //---------------------------------in progress in this cycle----------------------------------------//
                         
                           $count=0;
                           $no_of_100_finished_project_previous_cycle = [];  
                          $value_of_100_finished_project_previous_cycle = Project::select('projects.*','pm_projects.created_at as project_start_date')
                             ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                             ->leftJoin('project_milestones', function ($join) {
                                 $join->on('projects.id', '=', 'project_milestones.project_id')
                                     ->where('project_milestones.status','<>', 'complete')
                                     ->where('project_milestones.project_completion_status', 0)
                                     ->where('project_milestones.qc_status', 0);
                             })
                             ->where('projects.pm_id', $this->pm->id)
                             ->whereNull('project_milestones.id')
                             ->get();
                          foreach($value_of_100_finished_project_previous_cycle as $project){
        
                                $maxEndDate = ProjectMilestone::where('project_id', $project->id)
                                          ->max('end_date');
                                   
                        if ($maxEndDate != NULL){
                                $project->project_completion_date= $maxEndDate;
                                $project_completion_date = Carbon::parse($project->project_completion_date);
                        if ($project->project_start_date < $startMonth){
                            if ($project_completion_date >= $nextMonth && $project_completion_date <= $release_date) {
        
                                    $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                        ->where('projects.id', $project->id)
                                        ->first();
                                    $finished_project_this_cycle->project_completion_date = $maxEndDate;

                                  $manager_accept_date = ProjectMember::where('project_id', $project->id)
                                     ->where('user_id', $this->pm->id)
                                     ->min('created_at');
                                  $finished_project_this_cycle->manager_accept_date = $manager_accept_date;
        
                                    $no_of_100_finished_project_previous_cycle[] = $finished_project_this_cycle;
        
                                     $count+= $project->project_budget;                    
                            }
                        }
        
                        if ($project->project_start_date >= $startMonth && $project->project_start_date <= $endMonth ) {
                            if ($project_completion_date >= $startMonth && $project_completion_date <= $release_date) {
        
                                    $finished_project_this_cycle = Project::select('projects.*', 'pm_projects.created_at as project_start_date')
                                        ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
                                        ->where('projects.id', $project->id)
                                        ->first();

                            $manager_accept_date = ProjectMember::where('project_id', $project->id)
                            ->where('user_id', $this->pm->id)
                            ->min('created_at');
                            $finished_project_this_cycle->manager_accept_date = $manager_accept_date;

                                    $finished_project_this_cycle->project_completion_date = $maxEndDate;
        
                                    $no_of_100_finished_project_previous_cycle[] = $finished_project_this_cycle;
        
                                    $count += $project->project_budget;
                            }
                        }
                    }                        
                          }
        
                    $this->value_of_100_finished_project_previous_cycle = $count;
                    $this->no_of_100_finished_project_previous_cycle = $no_of_100_finished_project_previous_cycle;
                    
        
                    //---------------------------------in progress in this cycle----------------------------------------//
        
        
        
        
                 $this->no_of_100_and_finish_this_cycle = $this->no_of_100_finished_project_this_cycle;
                 $this->no_of_100_and_finish_previous_cycle = $this->no_of_100_finished_project_previous_cycle;
                 $this->value_of_100_and_finish_this_cycle = $this->value_of_100_finished_project_this_cycle;
                 $this->value_of_100_and_finish_previous_cycle = $this->value_of_100_finished_project_previous_cycle;
        //enan updated code end
if (count($this->no_of_accepted_projects) > 0 ) {
          $this->project_completion_rate_count_this_cycle=  ((count($this->no_of_finished_projects_this_cycle))/(count($this->no_of_accepted_projects)) )*100;
          $this->project_completion_rate_count_previous_cycle = ((count($this->no_of_finished_projects_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_finished_projects_previous_cycle))- (count($this->no_of_finished_projects_this_cycle))) * 100);
          $this->project_completion_rate_count_this_cycle_100_in_progress=  ((count($this->no_of_100_and_finish_this_cycle))/(count($this->no_of_accepted_projects)) )*100;

      }else {
          $this->project_completion_rate_count_this_cycle= 0;
          $this->project_completion_rate_count_previous_cycle = 0;
          $this->project_completion_rate_count_this_cycle_100_in_progress= 0;



      }
      if(count($this->no_of_100_and_finish_this_cycle) > 0)
      {
          $this->project_completion_rate_count_previous_cycle_100_in_progress = ((count($this->no_of_100_and_finish_previous_cycle)) / ((count($this->no_of_accepted_projects))+(count($this->no_of_100_and_finish_previous_cycle))- (count($this->no_of_100_and_finish_this_cycle))) * 100);

      }else
      {
          $this->project_completion_rate_count_previous_cycle_100_in_progress = 0;

      }
      if($this->value_of_100_and_finish_previous_cycle > 0)
      {
          $this->project_completion_rate_count_previous_cycle_value_100_in_progress = (($this->value_of_100_and_finish_previous_cycle) / ($this->accepted_project_value+$this->value_of_100_and_finish_previous_cycle- $this->value_of_100_and_finish_this_cycle) * 100);

      }else
      {
          $this->project_completion_rate_count_previous_cycle_value_100_in_progress = 0;

      }


      if (($this->accepted_project_value) > 0 ) {
          $this->project_completion_rate_count_this_cycle_value=  (($this->value_of_finished_projects_this_cycle)/($this->accepted_project_value) )*100;
          $this->project_completion_rate_count_previous_cycle_value =( ($this->value_of_finished_projects_previous_cycle) / ($this->accepted_project_value+ $this->value_of_finished_projects_previous_cycle -$this->value_of_finished_projects_this_cycle) *100);
          $this->project_completion_rate_count_this_cycle_value_100_in_progress=  ($this->value_of_100_and_finish_this_cycle/$this->accepted_project_value )*100;

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
  ->where('projects.pm_id', $this->pm->id)
  ->where('deals.client_badge','new client')
  ->groupBy('clients.id')
  ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
  ->whereBetween('clients.created_at', [$startMonth, $endMonth])
  ->orderBy('clients.created_at','desc')
  ->get();
  $this->no_of_existing_clients_this_cycle = Project::select('clients.*','deals.client_badge')
  ->leftJoin('p_m_projects as pm_projects', 'pm_projects.project_id', 'projects.id')
  ->join('deals', 'deals.client_id', 'projects.client_id')
  ->join('users as clients','clients.id','projects.client_id')
  ->where('projects.pm_id', $this->pm->id)
  ->where('deals.client_badge','<>','new client')
  ->groupBy('clients.id')
  ->whereBetween('pm_projects.created_at', [$startMonth, $endMonth])
  ->orderBy('clients.created_at','desc')
  ->get();

  $this->total_client= $this->no_of_new_clients_this_cycle->concat($this->no_of_existing_clients_this_cycle);
 // dd()
      $this->total_milestone_assigned_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
      'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
      )
      ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
      ->orderBy('project_milestones.created_at','desc')
      ->get();
      $this->total_milestone_assigned_this_cycle_value= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
      'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date'
      )
      ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
      ->where('projects.pm_id', $this->pm->id)

      ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
      ->sum('project_milestones.cost');
      $this->total_milestone_completed_this_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
      'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
      )
      ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      ->orderBy('payments.paid_on','desc')
     //->groupBy('project_milestones.id')


      ->whereBetween('payments.paid_on', [$startMonth, $release_date])
      ->where('projects.pm_id', $this->pm->id)
      ->where('project_milestones.status', 'complete')


      ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
      ->get();
      $this->total_milestone_completed_this_current_month= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
      'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
      )
      ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      ->orderBy('payments.paid_on','desc')
     //->groupBy('project_milestones.id')

     // ->whereNotBetween('project_milestones.created_at', [$this->endMonth, $this->release_date])
      ->whereBetween('payments.paid_on', [$startMonth, $endMonth])
      ->where('projects.pm_id', $this->pm->id)
      ->where('project_milestones.status', 'complete')


      ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
      ->get();
      $this->total_milestone_completed_previous_cycle= Project::select('projects.*','project_milestones.milestone_title','project_milestones.cost',
      'project_milestones.status as milestone_status','project_milestones.created_at as milestone_creation_date', 'payments.paid_on as milestone_completion_date'
      )
      ->join('project_milestones', 'project_milestones.project_id', 'projects.id')
      ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
      ->leftJoin('payments','payments.invoice_id','invoices.id')
      ->orderBy('payments.paid_on','desc')
     //->groupBy('project_milestones.id')

      // ->whereNotBetween('project_milestones.created_at', [$endMonth, $release_date])
      // ->whereBetween('payments.paid_on', [$startMonth, $release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('payments.paid_on', [$startMonth, $release_date])
             ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
             ->where('projects.pm_id', $this->pm->id)
             ->where('project_milestones.status', 'complete')
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('payments.paid_on', [$nextMonth, $release_date])
              ->where('project_milestones.created_at', '<', $startMonth)
              ->where('projects.pm_id', $this->pm->id)
              ->where('project_milestones.status', 'complete')
              ;

  })
    



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
      ->where('tasks.added_by',$this->pm->id)->count();

      $this->total_tasks_assigned_this_cycle_get= Task::select('tasks.*','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
      DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
      )
      ->leftJoin('task_users','task_users.task_id','tasks.id')

      ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')

      ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
      ->where('tasks.added_by',$this->pm->id)
      ->orderBy('tasks.created_at','desc')
      ->get();




      $this->total_tasks_completed_this_cycle= Task::select('tasks.*')
      ->leftJoin('task_users','task_users.task_id','tasks.id')
      ->where('tasks.board_column_id',4)
      ->where('tasks.added_by',$this->pm->id)
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

      $this->total_tasks_completed_this_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
      DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$this->startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$this->endMonth.'") as total_minutes')
      )
      ->leftJoin('task_users','task_users.task_id','tasks.id')

      ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
      ->where('tasks.board_column_id',4)
      ->where('tasks.added_by',$this->pm->id)

      ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
      ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
      ->orderBy('tasks.updated_at','desc')
      ->get();
      //dd($this->total_tasks_completed_this_cycle_get);

      $this->total_tasks_completed_previous_cycle= Task::select('tasks.*')
      ->leftJoin('task_users','task_users.task_id','tasks.id')
   
      // ->whereNotBetween('tasks.created_at', [$endMonth, $release_date])
      // ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('tasks.updated_at', [$startMonth, $release_date])
             ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
             ->where('tasks.board_column_id',4)
             ->where('tasks.added_by',$this->pm->id)
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
              ->where('tasks.created_at', '<', $startMonth)
              ->where('tasks.board_column_id',4)
              ->where('tasks.added_by',$this->pm->id)
              ;

  })
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

      $this->total_tasks_completed_previous_cycle_get= Task::select('tasks.*','tasks.updated_at as task_completion_date','tasks.added_by as tasks_added_by','tasks.created_at as task_creation_date','assigned_to.id as assined_to_id','assigned_to.name as assined_to_name','assigned_to.image as assined_to_avatar',
      DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE tasks.id = project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$startMonth.'" AND DATE(project_time_logs.end_time) <= "'.$endMonth.'") as total_minutes')
      )
      ->leftJoin('task_users','task_users.task_id','tasks.id')

      ->leftJoin('users as assigned_to','assigned_to.id','task_users.user_id')
     

      // ->whereBetween('tasks.updated_at', [$startMonth, $release_date])
      // ->whereNotBetween('tasks.created_at', [$endMonth, $release_date])
      ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

          $q3->whereBetween('tasks.updated_at', [$startMonth, $release_date])
             ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
             ->where('tasks.board_column_id',4)
             ->where('tasks.added_by',$this->pm->id)
             ;
                         
      })
    ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
             $q2->whereBetween('tasks.updated_at', [$nextMonth, $release_date])
              ->where('tasks.created_at', '<', $startMonth)
              ->where('tasks.board_column_id',4)
              ->where('tasks.added_by',$this->pm->id)
              ;

  })
      ->orderBy('tasks.updated_at','desc')
      ->get();
      $this->average_project_completion_rate = Project::select(
          'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
          DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
      )
          ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
          ->where('projects.status', 'finished')
          ->where('projects.pm_id', $this->pm->id)
          ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
          ->whereBetween('projects.updated_at', [$startMonth, $release_date])
          ->orderBy('projects.updated_at','desc')
          ->get();

      $this->average_completion_days = $this->average_project_completion_rate->avg('completion_time_days');

      $this->average_project_completion_rate_previous_cycle = Project::select(
          'projects.*','p_m_projects.created_at as project_start_date','projects.updated_at as project_completion_date',
          DB::raw('DATEDIFF(projects.updated_at, p_m_projects.created_at) AS completion_time_days')
      )
          ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
         
          // ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
          // ->whereBetween('projects.updated_at', [$startMonth, $release_date])
          ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

              $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                 ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                 ->where('projects.status', 'finished')
                 ->where('projects.pm_id', $this->pm->id)
                 ;
                             
          })
        ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                 $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                  ->where('p_m_projects.created_at', '<', $startMonth)
                  ->where('projects.status', 'finished')
                  ->where('projects.pm_id', $this->pm->id)
                  ;
  
      })
          ->orderBy('projects.updated_at','desc')
          ->get();

      $this->average_completion_days_previous_cycle = $this->average_project_completion_rate_previous_cycle->avg('completion_time_days');
     // dd($this->average_completion_days);

      $this->cancelled_projects_this_cycle=  Project::select(
          'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',

      )
          ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')

          ->whereIn('projects.status', ['canceled','partially finished'])

          ->where('projects.pm_id', $this->pm->id)
          ->where('projects.project_status','Accepted')
          ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
          ->whereBetween('projects.updated_at', [$startMonth, $release_date])
          ->orderBy('projects.updated_at','desc')
          ->get();

          $this->cancelled_projects_previous_cycle=  Project::select(
              'projects.*','p_m_projects.created_at as project_creation_date','projects.updated_at as project_canceled_date',

          )
          ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')

         
          // ->whereNotBetween('p_m_projects.created_at', [$endMonth, $release_date])
          // ->whereBetween('projects.updated_at', [$startMonth, $release_date])
          ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

              $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                 ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                 ->whereIn('projects.status', ['canceled','partially finished'])

                 ->where('projects.pm_id', $this->pm->id)
                 ->where('projects.project_status','Accepted')
                 ;
                             
          })
        ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                 $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                  ->where('p_m_projects.created_at', '<', $startMonth)
                  ->whereIn('projects.status', ['canceled','partially finished'])

                  ->where('projects.pm_id', $this->pm->id)
                  ->where('projects.project_status','Accepted')
                  ;
  
      })
          ->orderBy('projects.updated_at','desc')
          ->get();
          $this->no_of_new_deals_added = Deal::select('deals.*')
          ->where('deals.added_by', $this->pm->id)
          ->orderBy('deals.created_at','desc')
          ->get();
          $this->no_of_new_milestones_added_on_old_projects = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
          ->join('projects','projects.id','project_milestones.project_id')
          ->join('deals','deals.id','projects.deal_id')
          ->where('deals.project_type','fixed')
          ->where('projects.pm_id',$this->pm->id)
          ->where('project_milestones.added_by',$this->pm->id)
          ->where('project_milestones.status','!=','canceled')

          ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
          ->orderBy('project_milestones.created_at','desc')
          ->get();
          $this->no_of_new_milestones_added_on_old_projects_id = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId','projects.status as projectStatus')
          ->join('projects','projects.id','project_milestones.project_id')
          ->join('deals','deals.id','projects.deal_id')
          ->where('deals.project_type','fixed')
          ->where('projects.pm_id',$this->pm->id)
          ->where('project_milestones.added_by',$this->pm->id)
          ->groupBy('project_milestones.project_id')
          ->where('project_milestones.status','!=','canceled')
          ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
          ->orderBy('project_milestones.created_at','desc')
          ->get();
          $this->no_of_new_milestones_added_on_old_projects_value = ProjectMilestone::select('project_milestones.*','projects.project_name','projects.project_budget','projects.client_id','projects.id as projectId')
          ->join('projects','projects.id','project_milestones.project_id')
          ->join('deals','deals.id','projects.deal_id')
          ->where('deals.project_type','fixed')
          ->where('projects.pm_id',$this->pm->id)
          ->where('project_milestones.added_by',$this->pm->id)
          ->where('project_milestones.status','!=','canceled')
          ->whereBetween('project_milestones.created_at', [$startMonth, $endMonth])
          ->sum('project_milestones.cost');


    //       $this->no_of_delayed_projects = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date')
    //       ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
         
    //       ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

    //         $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
    //            ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
    //            ->where('projects.pm_id', $this->pm->id)
    //            ->where('projects.project_status', 'Accepted')
               
    //            ->where('p_m_projects.delayed_status', 1)
              
    //            ;
                           
    //     })
    //   ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
    //            $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
    //             ->where('p_m_projects.created_at', '<', $startMonth)
    //             ->where('projects.pm_id', $this->pm->id)
    //       ->where('projects.project_status', 'Accepted')
          
    //       ->where('p_m_projects.delayed_status', 1)
             
    //             ;
  
    // })
    //       ->orderBy('projects.updated_at','desc')


    //       ->get();
    $this->no_of_delayed_projects = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
            
            'project_members.created_at as project_accept_date')
            ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
            ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {
                $q3->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                   ->where('projects.pm_id', $this->pm->id)
                   ->where('project_members.user_id', $this->pm->id)
                   ->where('projects.project_status', 'Accepted')
                   ->where('p_m_projects.delayed_status', 1) ;                            
            })
          ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                   $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                    ->where('p_m_projects.created_at', '<', $startMonth)
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status','!=','in progress')
                    ->where('p_m_projects.delayed_status', 1);
    
        })
        ->groupBy('project_members.project_id')
            ->orderBy('projects.updated_at','desc')
            ->get();
          

         // dd($delay_date);

         $this->no_of_delayed_projects_finished = Project::select('projects.*','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date','project_members.created_at as project_accept_date')
             ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
             ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
           
             // ->whereNotBetween('p_m_projects.created_at', [$this->endMonth, $this->release_date])
             // ->whereBetween('projects.updated_at', [$this->startMonth, $this->release_date])
             ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                 $q3->whereBetween('projects.updated_at', [$startMonth, $release_date])
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)

                    ->where('projects.status', 'finished')
                    ->where('p_m_projects.delayed_status', 1)
                    ;
                                
             })
           ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                    $q2->whereBetween('projects.updated_at', [$nextMonth, $release_date])
                     ->where('p_m_projects.created_at', '<', $startMonth)
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('project_members.user_id', $this->pm->id)

                     ->where('projects.status', 'finished')
                     ->where('p_m_projects.delayed_status', 1)
                     ;
     
         })
             ->orderBy('projects.updated_at','desc')
             ->groupBy('project_members.project_id')

             ->get();




              $this->no_of_delayed_projects_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status', 'p_m_projects.created_at as project_creation_date',
                'project_members.created_at as project_accept_date'
                )
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                    ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                   
                    ->where('p_m_projects.delayed_status', 1)
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->groupBy('project_members.project_id')
                    ->orderBy('projects.updated_at','desc')


                    // Compare against the calculated deadline date
                    ->get();
                    $this->no_of_delayed_projects_finished_this_cycle = Project::select('projects.*','p_m_projects.delayed_status as delayed_status','p_m_projects.created_at as project_creation_date','projects.updated_at as project_completion_date',
                    'project_members.created_at as project_accept_date')
                    ->leftJoin('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                    ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                    ->where('projects.pm_id', $this->pm->id)
                    ->where('project_members.user_id', $this->pm->id)
                    ->where('projects.project_status', 'Accepted')
                    ->where('projects.status', 'finished')
                    ->where('p_m_projects.delayed_status', 1)
                    ->whereBetween('p_m_projects.created_at', [$startMonth, $endMonth])
                    ->whereBetween('projects.updated_at', [$startMonth, $endMonth])
                    ->groupBy('project_members.project_id')
                    ->orderBy('projects.updated_at','desc')

                    ->get();

              // Number of revisions for cycle
              $this->caused_by_me_for_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.added_by',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id',
                  'task_revision_disputes.*'
                  )
              ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
              ->leftJoin('projects','task_revisions.project_id','=','projects.id')
              ->where('projects.pm_id', $this->pm->id)
              ->where('task_revisions.final_responsible_person','PM')
              ->groupBy('task_revisions.id')
              ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              ->get();


              $this->caused_by_other_for_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.added_by',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id'
              )
              ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
              ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
              ->where('projects.pm_id', $this->pm->id)
              ->where('task_revisions.final_responsible_person', '!=', 'PM')
              ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              ->groupBy('task_revisions.id')
              ->get();

              $this->dispute_for_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.final_responsible_person',
                  'task_revisions.added_by',
                  'task_revisions.revision_acknowledgement',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id',
                  'project_members.lead_developer_id as ld_id',
                  'task_revision_disputes.*'
                  )
              ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
              ->leftJoin('projects','task_revisions.project_id','=','projects.id')
              ->leftJoin('project_members','projects.id','=','project_members.project_id')
              ->where('projects.pm_id', $this->pm->id)
              ->where('task_revisions.dispute_created', 1)
              ->groupBy('task_revisions.id')
              ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              ->get();

              // Number of revisions in this cycle
              $this->caused_by_me_in_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.added_by',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id',
                  'task_revision_disputes.*'
                  )
              ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
              ->leftJoin('projects','task_revisions.project_id','=','projects.id')
              ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
             
              // ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              // ->whereNotBetween('tasks.created_at', [$startMonth, $endMonth])
              ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                  $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                     ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('task_revisions.final_responsible_person','PM')
                     ;
                                 
              })
            ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                     $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                      ->where('task_revisions.created_at', '<', $startMonth)
                      ->where('projects.pm_id', $this->pm->id)
                      ->where('task_revisions.final_responsible_person','PM')
                      ;
      
          })
              ->groupBy('task_revisions.id')
              ->get();


              $this->caused_by_other_in_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.added_by',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id'
              )
              ->leftJoin('task_revision_disputes', 'task_revisions.id', '=', 'task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions', 'task_dispute_questions.dispute_id', '=', 'task_revision_disputes.id')
              ->join('projects', 'task_revisions.project_id', '=', 'projects.id')
              ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
              
              // ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              // ->whereNotBetween('tasks.created_at', [$startMonth, $endMonth])
              ->where(function ($q3) use( $startMonth, $endMonth,$release_date) {

                  $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                     ->whereBetween('tasks.created_at', [$startMonth, $endMonth])
                     ->where('projects.pm_id', $this->pm->id)
                        ->where('task_revisions.final_responsible_person', '!=', 'PM')
                     ;
                                 
              })
            ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                     $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                      ->where('task_revisions.created_at', '<', $startMonth)
                      ->where('projects.pm_id', $this->pm->id)
              ->where('task_revisions.final_responsible_person', '!=', 'PM')
                      ;
      
          })
              ->groupBy('task_revisions.id')
              ->get();


              $this->dispute_in_cycle = TaskRevision::select(
                  'task_revisions.created_at as revision_date',
                  'task_revisions.revision_acknowledgement as revision_reason',
                  'task_revisions.dispute_created',
                  'task_revisions.final_responsible_person',
                  'task_revisions.added_by',
                  'task_revisions.revision_acknowledgement',
                  'projects.id as projectId',
                  'projects.project_name',
                  'projects.client_id',
                  'project_members.lead_developer_id as ld_id',
                  'task_revision_disputes.*'
                  )
              ->leftJoin('task_revision_disputes','task_revisions.id','=','task_revision_disputes.revision_id')
              ->leftJoin('task_dispute_questions','task_dispute_questions.dispute_id','=','task_revision_disputes.id')
              ->leftJoin('projects','task_revisions.project_id','=','projects.id')
              ->leftJoin('project_members','projects.id','=','project_members.project_id')
              ->leftJoin('tasks','task_revisions.task_id','=','tasks.id')
             
              ->groupBy('task_revisions.id')
              // ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
              // ->whereNotBetween('tasks.created_at', [$startMonth, $endMonth])
              ->where(function ($q3) use( $startMonth, $endMonth,$release_date,) {

                  $q3->whereBetween('task_revisions.updated_at', [$startMonth, $release_date])
                     ->whereBetween('task_revisions.created_at', [$startMonth, $endMonth])
                     ->where('projects.pm_id', $this->pm->id)
                     ->where('task_revisions.dispute_created', 1)
                     ;
                                 
              })
            ->orWhere(function ($q2) use( $startMonth,$release_date,$nextMonth){
                     $q2->whereBetween('task_revisions.updated_at', [$nextMonth, $release_date])
                      ->where('tasks.created_at', '<', $startMonth)
                      ->where('projects.pm_id', $this->pm->id)
                      ->where('task_revisions.dispute_created', 1)
                      ;
      
          })
              ->get();


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

      return view('dashboard.pm_performance', $this->data);
  }
}
}
