<?php

namespace App\Http\Controllers;

use App\DataTables\PmPaymentHistoryDataTable;
use App\Helper\Reply;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;
use Auth;

class PmPaymentReleaseHistory extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Pm Payment Release History';
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PmPaymentHistoryDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_payments');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

        if (!request()->ajax()) {
            if (in_array('project_manager', user_roles())) {
                $this->project_managers = User::where('role_id',4)->get();
            }
            else {
                $this->project_managers = User::where('role_id',4)->get();
            }
        }
       
       
        $startDate = Carbon::now()->startofMonth();
        $assignEndDate = Carbon::now()->endofMonth()->addDay();
        $pmId = Auth::user()->role_id == 4 ? Auth::user()->id : 209;
      
       

        // $startDate= '2023-07-01 00:00:00';
        // $assignEndDate='2023-07-31 23:59:59';
        // $pmId=209;


        //Total Assigned Amount(For this Cycle)

        $this->total_assigned_amount_for_this_cycle = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->where('projects.pm_id', $pmId)
            ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
           
            ->where('projects.project_status','Accepted')
            ->sum('cost');
    $this->total_canceled_amount_for_this_cycle = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
    ->where('projects.pm_id', $pmId)
   // ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
    ->whereBetween('project_milestones.updated_at', [$startDate, $assignEndDate])
    ->where('projects.project_status', 'Accepted')
    ->where('project_milestones.status', 'canceled')
    ->sum('cost');
       


        //View transaction history by project manager  payment release date in the particular month//

    

        //Total unrelease amount (Overall)
        $this->pm_pending_milestone_value = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
            ->where('project_milestones.created_at', '<=', $assignEndDate)
            ->where(function ($q1) use ($assignEndDate) {
                $q1->whereNull('payments.paid_on')
                    ->orWhere('payments.paid_on', '>', $assignEndDate);
            })
            ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');
     //   dd($this->pm_pending_milestone_value);
         

        //Pending Amount(upto last month)

      //  dd('dsasdsa');
        $this->pm_pending_milestone_value_upto_last_month = DB::table('projects')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        ->where('project_milestones.created_at', '<', $startDate)
        ->where(function ($q1) use ($startDate) {
            $q1->whereNull('payments.paid_on')
                ->orWhere('payments.paid_on', '>', $startDate);
        })
        ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');
          


        //Total Unreleased Amount(For this Cycle)


        $this->pm_unreleased_amount_month = DB::table('users')    // this is used for finding upto last month pending and this is selected cycle pending amount and that will be minus to whole pending amount
        ->join('projects', 'users.id', '=', 'projects.pm_id')   //cancel  milestone  is not allowed
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
        ->where(function ($q1) use ($assignEndDate) {
            $q1->whereNull('payments.paid_on')
                ->orWhere('payments.paid_on', '>', $assignEndDate);
        })
        ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');

           
        //Total Released Amount(this Cycle)

        $this->pm_released_amount_month = DB::table('users')
        ->join('projects', 'users.id', '=', 'projects.pm_id')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        //->whereNotNull('project_milestones.invoice_id')
        ->whereBetween('payments.paid_on', [$startDate, $assignEndDate])
        ->where('payments.added_by', $pmId)
        ->whereNot('project_milestones.status', 'canceled')
        ->where('projects.project_status','Accepted')
        ->sum('project_milestones.cost');
       


        //Total release amount (For this cycles projects)

        $this->pm_released_amount_this_month_create = DB::table('users')
        ->join('projects', 'users.id', '=', 'projects.pm_id')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        //->whereNotNull('project_milestones.invoice_id')
        ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
        ->whereBetween('payments.paid_on', [$startDate, $assignEndDate])
        ->where('payments.added_by', $pmId)
        ->whereNot('project_milestones.status', 'canceled')
        ->where('projects.project_status','Accepted')
        ->sum('project_milestones.cost');
    //   /  dd($this->project_managers);
       

        return $dataTable->render('pm-payment.pm_payment_history', $this->data);
    }


    public function getMonthDate(Request $request)
    {
    //   /  dd($request->startDate, $request->endDate,$request->pmID);
        $startDate = Carbon::parse($request->startDate);
        // $assignEndDate = Carbon::parse($request->endDate);
        $endDate = Carbon::parse($request->endDate);
        $assignEndDate = $endDate->addDay();
       
        $pmId = $request->pmID;
        
        if($request->startDate == null)
        {
            $startDate = Carbon::now()->startofMonth();
            $assignEndDate = Carbon::now()->endofMonth()->addDay();
            $pmId = 209;
        }
        if($request->endDate == null)
        {
            
            $assignEndDate = Carbon::now()->endofMonth()->addDay();
           
        }
        if($request->pmID == null)
        {
           
            $pmId = 209;
        }
        if(Auth::user()->role_id == 4)
        {
            $pmId= Auth::id();

        }
      // dd($startDate, $assignEndDate,$pmId );
       
       

        // $startDate= '2023-07-01 00:00:00';
        // $assignEndDate='2023-07-31 23:59:59';
        // $pmId=209;


        //Total Assigned Amount(For this Cycle)

        $this->total_assigned_amount_for_this_cycle = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->where('projects.pm_id', $pmId)
            ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
            ->where('projects.project_status','Accepted')
          
            ->sum('cost');
            $this->total_canceled_amount_for_this_cycle = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
    ->where('projects.pm_id', $pmId)
    //->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
    ->whereBetween('project_milestones.updated_at', [$startDate, $assignEndDate])
    ->where('projects.project_status', 'Accepted')
    ->where('project_milestones.status', 'canceled')
    ->sum('cost');


        //View transaction history by project manager  payment release date in the particular month//

        $this->transaction_amount_dataview = Project::select('payments.paid_on', 'projects.pm_id','p_m_projects.created_at as project_start_date','users.name as manager_name', 'projects.client_id', 'clients.name', 'projects.id', 'projects.project_name', 'projects.project_budget', 'project_milestones.id as milestone_id', 'project_milestones.milestone_title', 'project_milestones.cost', 'project_milestones.created_at')
            ->join('users',  'users.id', '=', 'projects.pm_id')
            ->join('users as clients', 'clients.id', '=', 'projects.client_id')
            ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->join('p_m_projects', 'projects.id', '=', 'p_m_projects.project_id')
            ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
            ->whereBetween('payments.paid_on', [$startDate, $assignEndDate])
            ->orderBy('payments.paid_on', 'DESC')
            ->where('projects.pm_id', $pmId)
            ->get();

        foreach ($this->transaction_amount_dataview as $project) {
            $project_id = $project->id;
            $payment_date = $project->paid_on;
            $project_budget = $project->project_budget;

            $released_amount_project = DB::table('projects')
                ->join('project_milestones', 'projects.id', '=',
                    'project_milestones.project_id'
                )
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->where('projects.id', $project_id)
                ->where('payments.paid_on', '<=', $payment_date)
                ->sum('project_milestones.cost');


            $project->unreleased_amount_project = $project_budget-$released_amount_project;
        }

        //Total unrelease amount (Overall)
        $this->pm_pending_milestone_value = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
            ->where('project_milestones.created_at', '<=', $assignEndDate)
            ->where(function ($q1) use ($assignEndDate) {
                $q1->whereNull('payments.paid_on')
                    ->orWhere('payments.paid_on', '>', $assignEndDate);
            })
            ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');


        //Pending Amount(upto last month)

      //  dd('dsasdsa');
        $this->pm_pending_milestone_value_upto_last_month = DB::table('projects')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        ->where('project_milestones.created_at', '<', $startDate)
        ->where(function ($q1) use ($startDate) {
            $q1->whereNull('payments.paid_on')
                ->orWhere('payments.paid_on', '>', $startDate);
        })
        ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');


        //Total Unreleased Amount(For this Cycle)

        $this->pm_unreleased_amount_month = DB::table('users')    // this is used for finding upto last month pending and this is selected cycle pending amount and that will be minus to whole pending amount
        ->join('projects', 'users.id', '=', 'projects.pm_id')   //cancel  milestone  is not allowed
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
        ->where(function ($q1) use ($assignEndDate) {
            $q1->whereNull('payments.paid_on')
                ->orWhere('payments.paid_on', '>', $assignEndDate);
        })
        ->whereNot('project_milestones.status', 'canceled')
            ->where('projects.pm_id', $pmId)
            ->where('projects.project_status','Accepted')
            ->sum('project_milestones.cost');


        //Total Released Amount(this Cycle)

        $this->pm_released_amount_month = DB::table('users')
        ->join('projects', 'users.id', '=', 'projects.pm_id')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        //->whereNotNull('project_milestones.invoice_id')
        ->whereBetween('payments.paid_on', [$startDate, $assignEndDate])
        ->where('payments.added_by', $pmId)
        ->where('projects.project_status','Accepted')
       
        ->sum('project_milestones.cost');


        //Total release amount (For this cycles projects)

        $this->pm_released_amount_this_month_create = DB::table('users')
        ->join('projects', 'users.id', '=', 'projects.pm_id')
        ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
        //->whereNotNull('project_milestones.invoice_id')
        ->whereBetween('project_milestones.created_at', [$startDate, $assignEndDate])
        ->whereBetween('payments.paid_on', [$startDate, $assignEndDate])
        ->where('payments.added_by', $pmId)
        ->where('projects.project_status','Accepted')
      
        ->sum('project_milestones.cost');
       // dd($this->data);
        // $data['labels'] = $this->pm_pending_milestone_value_upto_last_month->toArray();
        // $data['values'] = $this->pm_released_amount_month->toArray();
        // $totalEarning = $graphData->sum('total');
       // $data['colors'] = [$this->appTheme->header_color];
        // $data['name'] = __('modules.dashboard.totalEarnings');

       // $this->monthDate = $data;
       // dd($data);
       
      // dd($this->data,$startDate,$assignEndDate,$pmId);
       $html = view('pm-payment.month', $this->data)->render();
       // dd($html);

        return Reply::dataOnly([
            'status' => 'success',
            'html' => $html,
             
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}