<?php

namespace App\Http\Controllers;

use App\DataTables\PaymentsDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Payments\StorePayment;
use App\Http\Requests\Payments\UpdatePayments;
use App\Models\Currency;
use App\Models\DealStage;
use App\Models\Invoice;
use App\Models\kpiSettingGenerateSale;
use App\Models\Payment;
use App\Models\Project;
use App\Models\QualifiedSale;
use App\Models\User;
use App\Models\ProjectTimeLog;
use App\Models\kpiSetting;;
use App\Models\kpiSettingLoggedHour;
use App\Models\Deal;
use App\Models\Lead;
use App\Models\CashPoint;
use App\Models\DealStageChange;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\PMAssign;
use App\Models\PMProject;
use App\Models\ProjectMilestone;
use App\Models\AuthorizationAction;
use Notification;
use App\Notifications\MilestoneReleaseNotification;
use App\Notifications\ProjectCompleteNotification;
use DateTime;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use Auth;
use App\Models\ProjectPmGoal;


class PaymentController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.payments';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('payments', $this->user->modules));
            return $next($request);
        });
    }

    public function index(PaymentsDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_payments');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned']));

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();

            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            }
            else {
                $this->clients = User::allClients();
            }
        }

        return $dataTable->render('payments.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
            return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_payments') != 'all');

        $items = explode(',', $request->row_ids);

        foreach ($items as $id) {
            $payment = Payment::find($id);

            if ($payment) {
                $payment->delete();
            }
        }
    }

    protected function changeStatus($request)
    {
        abort_403(user()->permission('edit_payments') != 'all');

        Payment::whereIn('id', explode(',', $request->row_ids))->update(['status' => $request->status]);
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_payments');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->pageTitle = __('modules.payments.addPayment');

        if (request()->has('default_client') && request('default_client') != '') {
            $this->defaultClient = request('default_client');
            $this->projects = Project::where('client_id', request('default_client'))->get();
        }
        else {
            $this->projects = Project::whereNotNull('client_id')->get();
        }

        if (request()->has('project')) {
            $this->projectId = request()->project;
        }

        $this->project = request()->has('project') ? Project::find(request()->project) : null;

        if (request()->get('invoice_id')) {
            $this->invoice = Invoice::findOrFail(request()->get('invoice_id'));
             $this->paidAmount = $this->invoice->amountPaid();
             $this->unpaidAmount = $this->invoice->amountDue();
             //dd($this->paidAmount, $this->unpaidAmount );

            if ($this->invoice->project_id) {
                $this->project = Project::find($this->invoice->project_id);
            }

        } elseif(request()->has('default_client') && request('default_client') != '') {
            $this->invoices = Invoice::with('payment')
                ->where('client_id', request('default_client'))
                ->where('send_status', 1)
                ->where(function ($q) {
                    $q->where('status', 'unpaid')
                        ->orWhere('status', 'partial');
                })->get();

        } elseif (request()->has('project')) {
            $this->invoices = Invoice::with('payment')
                ->where('project_id', request('project'))
                ->where('send_status', 1)
                ->where(function ($q) {
                    $q->where('status', 'unpaid')
                        ->orWhere('status', 'partial');
                })->get();

        }
        else {
            $this->invoices = Invoice::with('payment')->where(function ($q) {
                $q->where('status', 'unpaid')
                    ->orWhere('status', 'partial');
            })
            ->where('send_status', 1)
            ->get();
        }

        $this->currencies = Currency::all();

        if (request()->ajax()) {
            $html = view('payments.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'payments.ajax.create';
        return view('payments.create', $this->data);

    }

    public function store(StorePayment $request)
    {
        \DB::beginTransaction();
        $payment = new Payment();

        if (!is_null($request->currency_id)) {
            $payment->currency_id = 1;
        }
        else {
        // $payment->currency_id = $this->global->currency_id;
            $payment->currency_id = 1;
        }

        if ($request->project_id != '') {
            $project = Project::findOrFail($request->project_id);
            $payment->project_id = $request->project_id;
            $payment->currency_id = 1;
        }
        $invoice_id= Invoice::where('id',$request->invoice_id)->first();
        if ($invoice_id->milestone_id != null) {
            $milestone= ProjectMilestone::where('id',$invoice_id->milestone_id)->first();
            $payment->amount = $milestone->cost;
            $payment->actual_amount = $request->amount;
            $payment->original_currency_id = $request->currency_id;
        }else {
            $payment->amount = round($request->amount, 1);
        }
        if ($request->invoice_id != '') {
            $invoice = Invoice::findOrFail($request->invoice_id);

            $paidAmount = $milestone->cost;

            $payment->project_id = $invoice->project_id;
            $payment->invoice_id = $invoice->id;
            $payment->currency_id = 1;

            if ($request->amount > $invoice->amountDue()) {
                return Reply::error(__('messages.invoicePaymentExceedError'));
            }
        }



        $payment->gateway = $request->gateway;
        $payment->transaction_id = $request->transaction_id;
        $payment->paid_on = Carbon::now();

        $payment->remarks = $request->remarks;

        if ($request->hasFile('bill')) {
            $payment->bill = Files::uploadLocalOrS3($request->bill, Payment::FILE_PATH);
        }

        $payment->status = 'complete';
        $payment->save(); 
        $current_date = Carbon::now();
        $pm_goals = ProjectPmGoal::where('project_id',$payment->project_id)->get();
        $total_milestones= ProjectMilestone::where('project_id',$payment->project_id)->count();
        $complete_milestones= ProjectMilestone::join('payments','payments.project_id','project_milestones.project_id')->where('project_milestones.project_id',$payment->project_id)->where('payments.status','complete')->groupBy('project_milestones.id')->count();
        $total_milestones_value= ProjectMilestone::where('project_id',$payment->project_id)->sum('cost');
        $total_complete_milestones_value= ProjectMilestone::join('payments','payments.project_id','project_milestones.project_id')->where('project_milestones.project_id',$payment->project_id)->where('payments.status','complete')->groupBy('project_milestones.id')->sum('amount');
        $completion_percent = $total_complete_milestones_value/$total_milestones_value;
        $requierd_milestone = round($total_milestones/2,0);
        $goal_count= ProjectPmGoal::where('project_id',$payment->project_id)->where('goal_status', 0)->count();
        $goal_percentage = 100/$goal_count;
        foreach ($pm_goals as $pm_goal){
            if($pm_goal != null && $current_date < $pm_goal->goal_end_date && $completion_percent >= 0.5 && $pm_goal->goal_code == 'FPMR')
            {
                $pm_goal->goal_progress = $goal_percentage;
                $pm_goal->goal_status = 1;
                $pm_goal->description = $complete_milestones . ' milestones of '.$total_milestones. ' milestones are released';
                $pm_goal->updated_at= Carbon::now();
                $pm_goal->save();
            }elseif($pm_goal != null && $current_date < $pm_goal->goal_end_date && 2 <= $complete_milestones && $pm_goal->goal_code == 'MPMR'){

                $pm_goal->goal_progress = $goal_percentage;
                $pm_goal->goal_status = 1;
                $pm_goal->description = '2 out of '.$complete_milestones.' milestones released in this week';
                $pm_goal->updated_at= Carbon::now();
                $pm_goal->save();
            }elseif($pm_goal != null && $current_date < $pm_goal->goal_end_date && 3 <= $complete_milestones && $pm_goal->goal_code == 'MMPMR'){

                $pm_goal->goal_progress = $goal_percentage;
                $pm_goal->goal_status = 1;
                $pm_goal->description = '3 out of '.$complete_milestones.' milestones released in this week';
                $pm_goal->updated_at= Carbon::now();
                $pm_goal->save();
            }elseif($pm_goal != null && $current_date < $pm_goal->goal_end_date && 4 <= $complete_milestones && $pm_goal->goal_code == 'LM'){

                $pm_goal->goal_progress = $goal_percentage;
                $pm_goal->goal_status = 1;
                $pm_goal->description = '4 out of '.$complete_milestones.' milestones released in this week';
                $pm_goal->updated_at= Carbon::now();
                $pm_goal->save();
            }elseif($pm_goal != null && $current_date < $pm_goal->goal_end_date && $complete_milestones >= 1 && $pm_goal->goal_code == 'FMR'){

                $pm_goal->goal_progress = $goal_percentage;
                $pm_goal->goal_status = 1;
                $pm_goal->description = '1 out of '.$complete_milestones. ' milestones released in this week';
                $pm_goal->updated_at= Carbon::now();
                $pm_goal->save();
            }
        }
        $InvoiceId= Invoice::where('id',$invoice->id)->first();
        $projectId= Project::where('id',$InvoiceId->project_id)->first();
        $milestoneId= ProjectMilestone::where('id',$InvoiceId->milestone_id)->first();
        if($milestoneId->project_completion_status == 1)
        {

        $actions = PendingAction::where('code','ALP')->where('past_status',0)->where('milestone_id',$milestoneId->id)->where('authorization_for',Auth::id())->get();
        if($actions != null)
        {
        foreach ($actions as $key => $action) {

                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();

              //  $project_id =Project::where('id',$project->project_id)->first();
                $project_manager= User::where('id',$projectId->pm_id)->first();
                $client= User::where('id',$projectId->client_id)->first();
                $authorize_by= User::where('id',$action->authorized_by)->first();

                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading = $action->heading;
                $past_action->message = 'Final payment has been added to complete the project <a href="'.route('projects.show',$projectId->id).'">'.$projectId->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>!';
              //  $past_action->button = $action->button;
                $past_action->timeframe = $action->timeframe;
                $past_action->authorization_for = $action->authorization_for;
                $past_action->authorized_by = $action->authorized_by;
                $past_action->authorized_at = $action->authorized_at;
                $past_action->expired_status = $action->expired_status;
                $past_action->past_status = $action->past_status;
                $past_action->project_id = $action->project_id;
                $past_action->task_id = $action->task_id;
                $past_action->client_id = $action->client_id;
                $past_action->milestone_id = $action->client_id;
               // $past_action->deliverable_id = $action->deliverable_id;
                $past_action->save();

        }
       

    }
}

        $hourly_project_id= Project::where('id',$payment->project_id)->first();
        $hourly_deal_id = Deal::where('id',$hourly_project_id->deal_id)->first();


        //kpi distribution for hourly project start 
        if($hourly_deal_id->project_type == 'hourly')
                {
                    $kpi_setting_hourly_project= kpiSetting::where('kpi_status','1')->first();
                   // dd($kpi_setting_hourly_project);
                    $kpi_setting_hourly_project_logged_hours= kpiSettingLoggedHour::where('kpi_id',$kpi_setting_hourly_project->id)->get();
                    $kpi_setting_hourly_project_logged_hours_min= kpiSettingLoggedHour::where('kpi_id',$kpi_setting_hourly_project->id)->min('logged_hours_between');
                   // dd($kpi_setting_hourly_project_logged_hours_min);
                    $currency = Currency::where('id', $hourly_deal_id->original_currency_id)->first();
                //dd($currency);
                $hourly_rate = ($hourly_deal_id->hourly_rate) / $currency->exchange_rate;
            //  dd($hourly_rate, $kpi_setting_hourly_project_logged_hours_min);
                if($hourly_rate < $kpi_setting_hourly_project_logged_hours_min) 
                {
                    $project_budget= ($payment->amount * $kpi_setting_hourly_project->accepted_by_pm)/100;
                    
    
                    if($hourly_deal_id->lead_id != null)
                    {
                        $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                        $user_name= User::where('id',$lead->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $lead->added_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }else 
                    {
                        $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                        $user_name= User::where('id',$deal_stage->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $user_name->id;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }
                    $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
        
        
                    $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    if ($cash_points_qualified != null) {
        
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
        
                    $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    if ($cash_points_requirements_defined != null) {
        
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    if ($cash_points_proposal_made != null) {
        
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    if ($cash_points_negotiation_started != null) {
        
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                    if($deal_milestone_breakdown != null)
                    {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
        
                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $deal_milestone_breakdown->updated_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        if ($cash_points_milestone_breakdown != null) {
        
                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }else
                        {
                            $point->total_points_earn=
                                ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }
                        $point->save();
        
        
                    }
        
                    $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name= User::where('id',$deal_id->added_by)->first();
        
                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    if ($cash_points_close_deal != null) {
        
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }
                    $point->save();
                    $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                    $user_name= User::where('id',$deal_id_contact->added_by)->first();
        
                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id_contact->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->accepted_by_pm.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    if ($cash_points_contact != null) {
        
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }
                    $point->save();
                    if($hourly_deal_id->authorization_status == 1)
                    {
    
                    $team_lead= user::where('role_id',8)->first();
                    $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                    $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();

                  //  dd($cash_points_team_lead);
                    $point= new CashPoint();
                    $point->user_id= $team_lead->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                        '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                        .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                        $hourly_project_id->client_name->name. '</a> (Accpeted By PM('.$kpi_setting_hourly_project->authorized_by_leader.'% of hourly payment))';
            
                    $point->gained_as = "Individual";
                    $point->points= $earned_point;
                    $point->type = 'Authorization Bonus';
            
                    if ($cash_points_team_lead != null) {
                        $point->total_points_earn=$cash_points_team_lead->total_points_earn+ $earned_point/100;
                    } else {
                        $point->total_points_earn= $earned_point/100;
                    }
            
                    $point->save();
                    }
                  

                }elseif($hourly_rate > $kpi_setting_hourly_project->logged_hours_above)
                {
                    $project_budget= ($payment->amount * $kpi_setting_hourly_project->logged_hours_above_sales_amount)/ 100;
                    if($hourly_deal_id->lead_id != null)
                    {
                        $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                        $user_name= User::where('id',$lead->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $lead->added_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }else 
                    {
                        $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                        $user_name= User::where('id',$deal_stage->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $user_name->id;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }
                    $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
        
        
                    $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    if ($cash_points_qualified != null) {
        
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
        
                    $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    if ($cash_points_requirements_defined != null) {
        
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    if ($cash_points_proposal_made != null) {
        
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    if ($cash_points_negotiation_started != null) {
        
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                    if($deal_milestone_breakdown != null)
                    {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
        
                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $deal_milestone_breakdown->updated_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        if ($cash_points_milestone_breakdown != null) {
        
                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }else
                        {
                            $point->total_points_earn=
                                ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }
                        $point->save();
        
        
                    }
        
                    $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name= User::where('id',$deal_id->added_by)->first();
        
                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    if ($cash_points_close_deal != null) {
        
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }
                    $point->save();
                    $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                    $user_name= User::where('id',$deal_id_contact->added_by)->first();
        
                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id_contact->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    if ($cash_points_contact != null) {
        
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }
                    $point->save();
                    if($hourly_deal_id->authorization_status == 1)
                    {
    
                    $team_lead= user::where('role_id',8)->first();
                    $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                    $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');

                  //  dd($cash_points_team_lead);
                    $point= new CashPoint();
                    $point->user_id= $team_lead->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                        '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                        .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                        $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$kpi_setting_hourly_project->logged_hours_above_sales_amount.'% of hourly payment))';
            
                    $point->gained_as = "Individual";
                    $point->points= $earned_point;
                    $point->type = 'Authorization Bonus';
            
                    if ($cash_points_team_lead != null) {
                        $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                    } else {
                        $point->total_points_earn= $earned_point/100;
                    }
            
                    $point->save();
                    }
                  

                }
                else
                {
                    foreach ($kpi_setting_hourly_project_logged_hours as $logged_hours) {
                        if ($logged_hours->logged_hours_between <= $hourly_rate && $logged_hours->logged_hours_between_to >= $hourly_rate) {
                            
                            $project_budget= ($payment->amount * $logged_hours->logged_hours_sales_amount) / 100;
                            if($hourly_deal_id->lead_id != null)
                    {
                        $lead = Lead::where('id',$hourly_deal_id->lead_id)->first();
                        $user_name= User::where('id',$lead->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $lead->added_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }else 
                    {
                        $deal_stage= DealStage::where('short_code',$hourly_deal_id->deal_id)->first();
                        $user_name= User::where('id',$deal_stage->added_by)->first();
                        $cash_points= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $user_name->id;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        if ($cash_points != null) {
        
                            $point->total_points_earn= $cash_points->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }else
                        {
                            $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->the_bidder)/100;
        
                        }
                        $point->save();
                    }
                    $deal_qualified= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',1)->first();
        
        
                    $user_name= User::where('id',$deal_qualified->updated_by)->orderBy('id','desc')->first();
                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_qualified->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    if ($cash_points_qualified != null) {
        
                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->qualify)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_short_code= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',2)->first();
        
                    $user_name= User::where('id',$deal_short_code->updated_by)->orderBy('id','desc')->first();
                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_short_code->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (Moren than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    if ($cash_points_requirements_defined != null) {
        
                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->requirements_defined)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_proposal= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',3)->first();
                    $user_name= User::where('id',$deal_proposal->updated_by)->orderBy('id','desc')->first();
                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_proposal->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    if ($cash_points_proposal_made != null) {
        
                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->proposal_made)/100;
        
                    }
                    $point->save();
        
        
        
                    $deal_negotiation_started= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',4)->first();
                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first();
                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_negotiation_started->updated_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    if ($cash_points_negotiation_started != null) {
        
                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }else
                    {
                        $point->total_points_earn=  ($project_budget*$kpi_setting_hourly_project->negotiation_started)/100;
        
                    }
                    $point->save();
        
        
        
        
                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$hourly_deal_id->deal_id)->where('deal_stage_id',5)->first();
                    if($deal_milestone_breakdown != null)
                    {
                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->orderBy('id','desc')->first();
        
                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                        $point= new CashPoint();
                        $point->user_id= $deal_milestone_breakdown->updated_by;
                        $point->project_id= $hourly_project_id->id;
                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                        $point->gained_as = "Individual";
                        $point->points= ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        if ($cash_points_milestone_breakdown != null) {
        
                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }else
                        {
                            $point->total_points_earn=
                                ($project_budget*$kpi_setting_hourly_project->milestone_breakdown)/100;
        
                        }
                        $point->save();
        
        
                    }
        
                    $deal_id= Deal::where('id',$hourly_deal_id->id)->first();
                    //dd($deal_id);
                    $user_name= User::where('id',$deal_id->added_by)->first();
        
                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    if ($cash_points_close_deal != null) {
        
                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->closed_deal)/100;
        
                    }
                    $point->save();
                    $deal_id_contact= Deal::where('id',$hourly_deal_id->id)->first();
                    $user_name= User::where('id',$deal_id_contact->added_by)->first();
        
                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                    $point= new CashPoint();
                    $point->user_id= $deal_id_contact->added_by;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'.$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'. $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
                    $point->gained_as = "Individual";
                    $point->points= ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    if ($cash_points_contact != null) {
        
                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }else
                    {
                        $point->total_points_earn=
                            ($project_budget*$kpi_setting_hourly_project->contact_form)/100;
        
                    }
                    $point->save();
                    if($hourly_deal_id->authorization_status == 1)
                    {
    
                    $team_lead= user::where('role_id',8)->first();
                    $earned_point= ($project_budget*$kpi_setting_hourly_project->authorized_by_leader)/100;
                    $cash_points_team_lead= Cashpoint::where('user_id',$team_lead->id)->sum('points');

                  //  dd($cash_points_team_lead);
                    $point= new CashPoint();
                    $point->user_id= $team_lead->id;
                    $point->project_id= $hourly_project_id->id;
                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$team_lead->id).'">'.$team_lead->name .
                        '</a> authorized the deal : <a style="color:blue" href="'.route('projects.show',$hourly_project_id->id).'">'
                        .$hourly_project_id->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$hourly_project_id->client_id).'">'.
                        $hourly_project_id->client_name->name. '</a> (More than hours logged ('.$logged_hours->logged_hours_sales_amount.'% of hourly payment))';
            
                    $point->gained_as = "Individual";
                    $point->points= $earned_point;
                    $point->type = 'Authorization Bonus';
            
                    if ($cash_points_team_lead != null) {
                        $point->total_points_earn=$cash_points_team_lead+ $earned_point/100;
                    } else {
                        $point->total_points_earn= $earned_point/100;
                    }
            
                    $point->save();
                    }
                  

                            
                    }
                    }
                }
               
                
                }


        //kpi distribution for hourly project end




             //   dd("njdnaskndaskdn");


       $project_id_find = Project::where('id',$payment->project_id)->first();
        $deal_id_find = Deal::where('id',$project_id_find)->first();
        if($deal_id_find != null && $deal_id_find->project_type == 'hourly')
        {
            $deal_update = Deal::find($deal_id_find);
            $deal_update->payment_date = $payment->paid_on;
            $deal_update->save();
        }
      
		
        //authorization action start

       
        //authorization action end

        if (isset($invoice) && isset($paidAmount)) {

            if ((float)($paidAmount + $request->amount) >= (float)$invoice->total) {
                $invoice->status = 'paid';
            }
            else {
                $invoice->status = 'partial';
            }


            $invoice->save();
        }
        $project= Project::find($request->project_id);
        $invoice_id= Invoice::where('id',$request->invoice_id)->first();
        if ($invoice_id->milestone_id != null) {
            $milestone= ProjectMilestone::where('id',$invoice_id->milestone_id)->first();
            $project->milestone_paid= $project->milestone_paid+$milestone->cost;
            $project->due= $project->due - $milestone->cost;
            $project->paid_milestone_count= $project->paid_milestone_count + 1;
            $project->save();
            $pmassign= PMProject::where('project_id',$request->project_id)->first();
            $pm= PMAssign::where('pm_id',$pmassign->pm_id)->first();
            $pmassign_update= PMAssign::find($pm->id);
            $pmassign_update->release_amount= $pmassign_update->release_amount + $milestone->cost;
            $pmassign_update->monthly_release_amount= $pmassign_update->monthly_release_amount + $milestone->cost;
            $pmassign_update->release_date= Carbon::now()->format('Y-m-d');
            $pmassign_update->save();
        }
        $project_update= Project::find($project->id);
        $qc_count= ProjectMilestone::where('project_id',$project_update->id)->where('qc_status',1)->count();
        $project_completion_count= ProjectMilestone::where('project_id',$project_update->id)->where('project_completion_status',1)->count();

        if ($project->due < 1 && $qc_count > 0 && $project_completion_count > 0) {
            if($project_update->milestone_cancel_count != null)
            {
                $project_update->status = 'partially finished';
            }else 
            {
                $project_update->status = 'finished'; 
                $client= User::where('id',$project->client_id)->first();
                $pm= User::where('id',$project->pm_id)->first();
                
                    $total_minutes = ProjectTimeLog::where('project_id', $project->id)->sum('total_minutes');
                   
                    $kpi= kpiSetting::where('kpi_status','1')->first();
                    $kpi_settings = kpiSettingLoggedHour::where('kpi_id',$kpi->id)->get();
                    
                    //$total_minutes = 1500;
                    //$project->project_budget = 4000;
                    $total_invoice_amount= Invoice::where('project_id',$project->id)->sum('total');
                    // dd($project->deal->actual_amount);
                    $dealStage= DealStage::where('short_code',$project_update->deal->deal_id)->first();
        if ($dealStage != null) {
                if ($dealStage->project_type == 'fixed')
                {
                    if($project->deal->actual_amount - $total_invoice_amount < 1)
                    {
                        if ($total_minutes > 0 && $project->project_budget >= $kpi->achieve_less_than ) {
                            $total_hours = floor($total_minutes / 60);
                            //un-comment this when finished
                          if($total_hours > 0)
                          {
                             $project_hourly_rate = $project->project_budget / $total_hours;
                          
                          }else 
                          {
                            $project_hourly_rate= 0;
                          }
                            //$project_hourly_rate = $project->project_budget / $total_hours;
                        //    / $project_hourly_rate = 44;
                            
                            //--------------
                            foreach ($kpi_settings as $value) {
                                //$value->logged_hours_between_to = 200;
                                if ($value->logged_hours_between <= $project_hourly_rate && $value->logged_hours_between_to >= $project_hourly_rate) {
                                    $deal = Deal::find($project->deal_id);
                                    $project_budget= ($deal->amount * ($value->logged_hours_sales_amount - $kpi->accepted_by_pm)) / 100;
                                //   /  dd(($project_budget*$kpi->the_bidder)/100);
                                    if($deal->lead_id != null) {
                                        $lead = Lead::where('id',$deal->lead_id)->first();
                                        $user_name= User::where('id',$lead->added_by)->first(); 
                                        $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                                        $point= new CashPoint();
                                        $point->user_id= $lead->added_by;
                                        $point->project_id= $project->id;
                                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                        $point->gained_as = "Individual";
                                        $point->points= ($project_budget*$kpi->the_bidder)/100;
        
                                        if ($cash_points != null) {
                                            $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
                                        } else {
                                            $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
                                        }
        
                                        $point->save();
                                    }
        
                                    $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();
        
                                    $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                    $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_qualified->updated_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->qualify)/100;
        
                                    if ($cash_points_qualified != null) {
                                        $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
                                    } else {
                                        $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
                                    }
        
                                    $point->save();
        
                                    $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
        
                                    $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                    $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_short_code->updated_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->requirements_defined)/100;
        
                                    if ($cash_points_requirements_defined != null) {
                                        $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
                                    } else {
                                        $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
                                    }
        
                                    $point->save();
        
                                    $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                    $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                    $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_proposal->updated_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->proposal_made)/100;
        
                                    if ($cash_points_proposal_made != null) {
                                        $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
                                    } else {
                                        $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
                                    }
        
                                    $point->save();
        
                                    $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                    $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                    $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_negotiation_started->updated_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->negotiation_started)/100;
        
                                    if ($cash_points_negotiation_started != null) {
                                        $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
                                    } else {
                                        $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
                                    }
        
                                    $point->save();
        
        
                                    $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                    if ($deal_milestone_breakdown != null) {
                                        $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                        $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                        $point= new CashPoint();
                                        $point->user_id= $deal_milestone_breakdown->updated_by;
                                        $point->project_id= $project->id;
                                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                        $point->gained_as = "Individual";
                                        $point->points= ($project_budget*$kpi->milestone_breakdown)/100;
        
                                        if ($cash_points_milestone_breakdown != null) {
                                            $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
                                        } else {
                                            $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
                                        }
        
                                        $point->save();
                                    }
        
                                    $user_name= User::where('id',$deal->added_by)->first(); 
        
                                    $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal->added_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->closed_deal)/100;
        
                                    if ($cash_points_close_deal != null) {
                                   
                                        $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
        
                                    }else 
                                    {
                                        $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;
        
                                    }
                                    $point->save();
                                    $user_name= User::where('id',$deal->added_by)->first(); 
        
                                    $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal->added_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->contact_form)/100;
        
                                    if ($cash_points_contact != null) {
                                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
                                    } else {
                                        $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;
        
                                    }
                                    $point->save();
        
                                    if ($deal->authorization_status == 1) {
                                        $team_lead = User::where('role_id', 8)->first();
                                        $user_name= User::where('id',$team_lead->id)->first(); 
        
                                        $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
                                        $point= new CashPoint();
                                        $point->user_id= $team_lead->id;
                                        $point->project_id= $project->id;
                                        $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> authorizes the deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';
                                        $point->gained_as = "Individual";
                                        $point->points= ($project_budget*$kpi->authorized_by_leader)/100;
        
                                        if ($cash_points_contact != null) {
                                            $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
                                        } else {
                                            $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;
        
                                        }
                                        $point->save();
                                        
                                    }
                                }
                            }
        
                            //$project_hourly_rate = 35;
        
                            if ($project_hourly_rate >= $kpi->logged_hours_above  ) {
                                $deal = Deal::find($project->deal_id);
                                $project_budget= ($deal->amount * ($kpi->logged_hours_above_sales_amount - $kpi->accepted_by_pm)) / 100;
        
                                if($deal->lead_id != null) {
                                    $lead = Lead::where('id',$deal->lead_id)->first();
                                    $user_name= User::where('id',$lead->added_by)->first(); 
                                    $cash_points= CashPoint::where('user_id',$lead->added_by)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $lead->added_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->the_bidder)/100;
        
                                    if ($cash_points != null) {
                                        $point->total_points_earn= $cash_points->total_points_earn + ($project_budget * $kpi->the_bidder) / 100;
                                    } else {
                                        $point->total_points_earn=  ($project_budget*$kpi->the_bidder)/100;
                                    }
        
                                    $point->save();
                                }
        
                                $deal_qualified= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',1)->first();
        
                                $user_name= User::where('id',$deal_qualified->updated_by)->first(); 
                                $cash_points_qualified= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal_qualified->updated_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal qualify deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->qualify)/100;
        
                                if ($cash_points_qualified != null) {
                                    $point->total_points_earn= $cash_points_qualified->total_points_earn+ ($project_budget*$kpi->qualify)/100;
                                } else {
                                    $point->total_points_earn=  ($project_budget*$kpi->qualify)/100;
                                }
        
                                $point->save();
        
                                $deal_short_code= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',2)->first();
        
                                $user_name= User::where('id',$deal_short_code->updated_by)->first(); 
                                $cash_points_requirements_defined= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal_short_code->updated_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> made the deal requirements defined Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->requirements_defined)/100;
        
                                if ($cash_points_requirements_defined != null) {
                                    $point->total_points_earn= $cash_points_requirements_defined->total_points_earn+ ($project_budget*$kpi->requirements_defined)/100;
                                } else {
                                    $point->total_points_earn=  ($project_budget*$kpi->requirements_defined)/100;
                                }
        
                                $point->save();
        
                                $deal_proposal= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',3)->first();
                                $user_name= User::where('id',$deal_proposal->updated_by)->first(); 
                                $cash_points_proposal_made= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal_proposal->updated_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the proposal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->proposal_made)/100;
        
                                if ($cash_points_proposal_made != null) {
                                    $point->total_points_earn= $cash_points_proposal_made->total_points_earn+ ($project_budget*$kpi->proposal_made)/100;
                                } else {
                                    $point->total_points_earn=  ($project_budget*$kpi->proposal_made)/100;
                                }
        
                                $point->save();
        
                                $deal_negotiation_started= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',4)->first();                               
                                $user_name= User::where('id',$deal_negotiation_started->updated_by)->first(); 
                                $cash_points_negotiation_started= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal_negotiation_started->updated_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> started negotiation started Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->negotiation_started)/100;
        
                                if ($cash_points_negotiation_started != null) {
                                    $point->total_points_earn= $cash_points_negotiation_started->total_points_earn+ ($project_budget*$kpi->negotiation_started)/100;
                                } else {
                                    $point->total_points_earn=  ($project_budget*$kpi->negotiation_started)/100;
                                }
        
                                $point->save();
        
        
                                $deal_milestone_breakdown= DealStageChange::where('deal_id',$deal->deal_id)->where('deal_stage_id',5)->first();
                                if ($deal_milestone_breakdown != null) {
                                    $user_name= User::where('id',$deal_milestone_breakdown->updated_by)->first(); 
                                    $cash_points_milestone_breakdown= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $deal_milestone_breakdown->updated_by;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the milestone breakdown Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->milestone_breakdown)/100;
        
                                    if ($cash_points_milestone_breakdown != null) {
                                        $point->total_points_earn= $cash_points_milestone_breakdown->total_points_earn+ ($project_budget*$kpi->milestone_breakdown)/100;
                                    } else {
                                        $point->total_points_earn= ($project_budget*$kpi->milestone_breakdown)/100;
                                    }
        
                                    $point->save();
                                }
        
                                $user_name= User::where('id',$deal->added_by)->first(); 
        
                                $cash_points_close_deal= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal->added_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> closed the deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->closed_deal)/100;
        
                                if ($cash_points_close_deal != null) {
                               
                                    $point->total_points_earn= $cash_points_close_deal->total_points_earn+ ($project_budget*$kpi->closed_deal)/100;
        
                                }else 
                                {
                                    $point->total_points_earn= ($project_budget*$kpi->closed_deal)/100;
        
                                }
                                $point->save();
                                $user_name= User::where('id',$deal->added_by)->first(); 
        
                                $cash_points_contact= CashPoint::where('user_id',$user_name->id)->orderBy('id','desc')->first();
                                $point= new CashPoint();
                                $point->user_id= $deal->added_by;
                                $point->project_id= $project->id;
                                $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> submitted the contact form for the project manager Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                $point->gained_as = "Individual";
                                $point->points= ($project_budget*$kpi->contact_form)/100;
        
                                if ($cash_points_contact != null) {
                                    $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->contact_form)/100;
                                } else {
                                    $point->total_points_earn= ($project_budget*$kpi->contact_form)/100;
        
                                }
                                $point->save();
        
                                if ($deal->authorization_status == 1) {
                                    $team_lead = User::where('role_id', 8)->first();
                                    $user_name= User::where('id',$team_lead->id)->first(); 
        
                                    $cash_points_contact= CashPoint::where('user_id',$team_lead->id)->orderBy('id','desc')->first();
                                    $point= new CashPoint();
                                    $point->user_id= $team_lead->id;
                                    $point->project_id= $project->id;
                                    $point->activity= '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> authorizes the deal Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->id).'">'. $project->client_name->name. '</a>Hours logged more than '.$kpi->logged_hours_above_sales_amount. '%';
                                    $point->gained_as = "Individual";
                                    $point->points= ($project_budget*$kpi->authorized_by_leader)/100;
        
                                    if ($cash_points_contact != null) {
                                        $point->total_points_earn= $cash_points_contact->total_points_earn+ ($project_budget*$kpi->authorized_by_leader)/100;
                                    } else {
                                        $point->total_points_earn= ($project_budget*$kpi->authorized_by_leader)/100;
        
                                    }
                                    $point->save();
                                    
                                }
                            }
                        }
                        $qualified_sale_id= QualifiedSale::where('project_id',$project->id)->first();
                        if($qualified_sale_id != null)
                        {
                            $qualified_sale= QualifiedSale::find($qualified_sale_id->id);
                         $total_points= CashPoint::where('project_id',$project->id)->sum('points');
                         $qualified_sale->total_points= $total_points;
                         $qualified_sale->save();
                        }
    
                    }
                }
                




                   
                }
            }

            $project_update->completion_percent= 100;
            //$var= Project::where('id',$request->project_id)->first();
            $date1 = new DateTime($project['start_date']);
            $date2 = new DateTime($request->paid_on);
            $days  = $date2->diff($date1)->format('%a');
            $project_update->payment_release_date = $date2;
            $project_update->project_completion_days= $days;
            $project_update->save();
            $users= User::where('role_id',1)->orWhere('role_id',6)->get();
            foreach ($users as $user) {


                Notification::send($user, new ProjectCompleteNotification($project));
            }
        }
        if ($invoice_id->milestone_id != null) {
            $milestone_id= ProjectMilestone::where('id',$invoice_id->milestone_id)->first();

            //dd($project);
            $milestones= ProjectMilestone::where('project_id',$milestone_id->project_id)->get();
            //dd($milestones);
            foreach ($milestones as $key => $milest) {
                if ($milest->id == $milestone_id->id) {
                    $data= $key+1;
                //dd($data);
                // code...
                }
                // code...
            }
            $currency= Currency::where('id',$milestone_id->original_currency_id)->first();
            $pm= User::where('id',$project->pm_id)->first();
            if($milestone_id->summary != null) {
                

                
                $description= $milestone_id->summary;

            }else {
                $description = 'No Description Found';
            }

          
               
               
                 



            Notification::send($pm, new MilestoneReleaseNotification($milestone_id,$invoice));
            $users= User::where('role_id',1)->get();
            foreach ($users as $user) {


                Notification::send($user, new MilestoneReleaseNotification($milestone_id,$invoice));
            }
        }


        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('projects.show', $request->project_id).'?tab=milestones';
        }
        \DB::commit();
        return Reply::successWithData(__('messages.paymentSuccess'), ['redirectUrl' => $redirectUrl]);
    }

    public function destroy($id)
    {
        $payment = Payment::with('invoice')->findOrFail($id);
        $this->deletePermission = user()->permission('delete_payments');

        abort_403(!(
            $this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $payment->added_by == user()->id)
            || ($this->deletePermission == 'owned' && user()->id == $payment->invoice->client_id)
            || ($this->deletePermission == 'both' && (user()->id == $payment->invoice->client_id && user()->id == $payment->added_by))
        ));

        $payment->delete();

        return Reply::success(__('messages.paymentDeleted'));
    }

    public function edit($id)
    {
        $this->payment = Payment::with('invoice')->findOrFail($id);
        $this->editPermission = user()->permission('edit_payments');

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && $this->payment->added_by == user()->id)
            || ($this->editPermission == 'owned' && $this->payment->invoice->client_id == user()->id)
            || ($this->editPermission == 'both' && ($this->payment->invoice->client_id == user()->id || $this->payment->added_by == user()->id))
        ));

        $this->pageTitle = __('modules.payments.updatePayment');
        $this->projects = Project::whereNotNull('client_id')->get();
        $this->currencies = Currency::all();

        $this->invoices = Invoice::where(function ($query) {
            if (in_array('client', user_roles())) {
                $query->where('invoices.client_id', user()->id);
            }
            else {
                $query->where('invoices.project_id', $this->payment->project_id)
                    ->whereNotNull('invoices.project_id');
            }
        })
        ->pending()->get();

        if (request()->ajax()) {
            $html = view('payments.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'payments.ajax.edit';
        return view('payments.create', $this->data);
    }

    public function update(UpdatePayments $request, $id)
    {

        $payment = Payment::findOrFail($id);

        if ($request->project_id != '' && $request->project_id != '0') {
            $payment->project_id = $request->project_id;
        }

        $payment->currency_id = $request->currency_id;
        $payment->amount = round($request->amount, 2);
        $payment->gateway = $request->gateway;
        $payment->transaction_id = $request->transaction_id;

        if ($request->paid_on != '') {
            $payment->paid_on = Carbon::createFromFormat($this->global->date_format, $request->paid_on)->format('Y-m-d');
        }
        else {
            $payment->paid_on = null;
        }

        $payment->status = $request->status;
        $payment->remarks = $request->remarks;

        if ($request->bill_delete == 'yes') {
            Files::deleteFile($payment->bill, Payment::FILE_PATH);
            $payment->bill = null;
        }

        if ($request->hasFile('bill')) {
            $payment->bill = Files::uploadLocalOrS3($request->bill, Payment::FILE_PATH);
        }

        if ($request->invoice_id != '') {
            $invoice = Invoice::findOrFail($request->invoice_id);
            $payment->project_id = $invoice->project_id;
            $payment->invoice_id = $invoice->id;
            $payment->currency_id = $invoice->currency->id;

        } else {
            $payment->invoice_id = null;
        }

        $payment->save();

        // change invoice status if exists
        if ($payment->invoice) {
            if ($payment->invoice->amountDue() <= 0) {
                $payment->invoice->status = 'paid';
            }
            else if ($payment->invoice->amountDue() >= $payment->invoice->total) {
                $payment->invoice->status = 'unpaid';
            }
            else {
                $payment->invoice->status = 'partial';
            }

            $payment->invoice->save();
        }

        return Reply::redirect(route('payments.index'), __('messages.paymentSuccess'));
    }

    public function show($id)
    {
        $this->payment = Payment::with('invoice', 'project', 'currency')->find($id);
        $this->viewPermission = user()->permission('view_payments');

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->payment->added_by == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->project_id) && $this->payment->project->client_id == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->invoice_id) && $this->payment->invoice->client_id == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->order_id) && $this->payment->order->client_id == user()->id)
        ));

        $this->pageTitle = __('modules.payments.paymentDetails');

        if (request()->ajax()) {
            $html = view('payments.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'payments.ajax.show';
        return view('payments.create', $this->data);

    }

    public function download($id)
    {
        $this->invoiceSetting = invoice_setting();

        $this->payment = Payment::with('invoice', 'project', 'currency')->find($id);
        $this->viewPermission = user()->permission('view_payments');

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->payment->added_by == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->project_id) && $this->payment->project->client_id == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->invoice_id) && $this->payment->invoice->client_id == user()->id)
            || ($this->viewPermission == 'owned' && !is_null($this->payment->order_id) && $this->payment->order->client_id == user()->id)
        ));

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->payment = Payment::with('invoice', 'project', 'currency')->find($id);

        $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('payments.ajax.pdf', $this->data);
        $filename = __('app.menu.payments').' '.$this->payment->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

}
