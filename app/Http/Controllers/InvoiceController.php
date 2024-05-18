<?php

namespace App\Http\Controllers;

use App\DataTables\InvoicesDataTable;
use App\Events\NewInvoiceEvent;
use App\Events\PaymentReminderEvent;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Admin\Client\StoreShippingAddressRequest;
use App\Http\Requests\InvoiceFileStore;
use App\Http\Requests\Invoices\StoreInvoice;
use App\Http\Requests\Invoices\UpdateInvoice;
use App\Http\Requests\Stripe\StoreStripeDetail;
use App\Models\ClientDetails;
use App\Models\CompanyAddress;
use App\Models\Contract;
use App\Models\Country;
use App\Models\CreditNotes;
use App\Models\Currency;
use App\Models\Deal;
use App\Models\Estimate;
use App\Models\Invoice;
use App\Models\InvoiceItemImage;
use App\Models\InvoiceItems;
use App\Models\OfflinePaymentMethod;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentGatewayCredentials;
use App\Models\PMAssign;
use App\Models\Product;
use App\Models\Project;
use App\Models\ProjectActivity;
use App\Models\ProjectMilestone;
use App\Models\ProjectTimeLog;
use App\Models\Proposal;
use App\Models\Setting;
use App\Models\AuthorizationAction;
use App\Models\Tax;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Illuminate\Support\Facades\App;
use Auth;
use App\Models\Task;
use App\Models\PendingAction;
use App\Models\PendingActionPast;

class InvoiceController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.invoices';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('invoices', $this->user->modules));
            return $next($request);
        });
    }

    public function index(InvoicesDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_invoices');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();

            if (in_array('client', user_roles())) {
                $this->clients = User::client();
            }
            else {
                $this->clients = User::allClients();
            }
        }

        return $dataTable->render('invoices.index', $this->data);
    }

    public function create()
    {
        $this->addPermission = user()->permission('add_invoices');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->pageTitle = __('modules.invoices.addInvoice');

        // this data is sent from project and client invoices
        $this->project = request('project_id') ? Project::find(request('project_id')) : null;

        if (request('client_id')) {
            $this->client = User::withoutGlobalScope('active')->findOrFail(request('client_id'));
        }

        if (request('estimate') != '') {
            $this->estimateId = request('estimate');
            $this->type = 'estimate';
            $this->estimate = Estimate::with('items', 'client', 'client.clientDetails', 'client.projects')->findOrFail($this->estimateId);
        }

        if (request('proposal') != '') {
            $this->proposalId = request('proposal');
            $this->type = 'proposal';
            $this->estimate = Proposal::with('items', 'lead', 'lead.client', 'lead.client.clientDetails')->findOrFail($this->proposalId);
            $this->client = $this->estimate->lead->client;
        }

        $this->currencies = Currency::all();
        $this->lastInvoice = Invoice::lastInvoiceNumber() + 1;
        $this->invoiceSetting = invoice_setting();
        $this->zero = '';

        if (strlen($this->lastInvoice) < $this->invoiceSetting->invoice_digit) {
            $condition = $this->invoiceSetting->invoice_digit - strlen($this->lastInvoice);

            for ($i = 0; $i < $condition; $i++) {
                $this->zero = '0' . $this->zero;
            }
        }

        $this->taxes = Tax::all();
        $this->products = Product::all();
        $this->clients = User::allClients();
        $this->companyAddresses = CompanyAddress::all();
        $this->projects = Project::allProjectsHavingClient();

        if (request('type') == 'timelog') {

            $this->startDate = Carbon::now($this->global->timezone)->subDays(7);
            $this->endDate = Carbon::now($this->global->timezone);

            if (request()->ajax()) {
                $html = view('invoices.ajax.create-timelog-invoice', $this->data)->render();
                return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
            }

            $this->view = 'invoices.ajax.create-timelog-invoice';

            return view('invoices.create', $this->data);
        }

        $invoice = new Invoice();

        if (!empty($invoice->getCustomFieldGroupsWithFields())) {
            $this->fields = $invoice->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('invoices.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'invoices.ajax.create';
        //dd($this->data);
        return view('invoices.create', $this->data);

    }

    public function store(StoreInvoice $request)
    {
       // dd($request);
      $milestone_check = ProjectMilestone::where('id',$request->milestone_id)->first();
      if($milestone_check->invoice_created == 1)
      {
        return Reply::error(__('You already created invoice for this milestone.'));
      }
      if($milestone_check->status == 'incomplete' && $request->total >= $milestone_check->actual_cost)
      {
        return Reply::error(__('You cannot insert equal amount of payment for partial payment.'));
      }
      $hourly_project_check= Project::where('id',$request->project_id)->first();

//    /dd($request->total_amount);
    if($milestone_check->cost < 1)
    {
      if($hourly_project_check->deal->project_type=='hourly' && $request->total <= 0 )

      {
        return Reply::error(__('You cannot insert zero on the amount for creating the invoice.'));
      }elseif($hourly_project_check->deal->project_type == 'hourly' && $request->total > 0 && $milestone_check->cost < 1) {

         // /dd($request);
         $currency= Currency::where('id',$request->currency_id)->first();
        
         //dd($currency->exchange_rate);
         $milestone = ProjectMilestone::find($request->milestone_id);
        
         $milestone->cost = ($request->total)/$currency->exchange_rate;
         //dd($milestone->cost);
         $milestone->actual_cost = ($request->total == '') ? '0' : $request->total;
         $milestone->currency_id = 1;
 
         $milestone->original_currency_id = $request->currency_id;
 
         $milestone->save();
 
         $project = Project::where('id',$request->project_id)->first();
 
         $project_milestone_cost= ProjectMilestone::where('project_id',$project->id)->sum('cost');

             $project_update= Project::find($project->id);
             $project_update->project_budget= $project->project_budget+$milestone->cost;
             $project_update->due= $project->due+ $milestone->cost;
             
             $project_update->save();
             $pm_id= PMAssign::where('pm_id',$project->pm_id)->first();
             $pm_assign= PMAssign::find($pm_id->id);
             $pm_assign->amount= $pm_assign->amount+ $milestone->cost;
             $pm_assign->actual_amount= $pm_assign->actual_amount+ $milestone->cost;
             $pm_assign->monthly_project_amount= $pm_assign->monthly_project_amount+ $milestone->cost;
             $pm_assign->monthly_actual_project_amount= $pm_assign->monthly_actual_project_amount+ $milestone->cost;
             $pm_assign->save();
 
             $deal_id= Deal::where('id',$project->deal_id)->first();
             $deal= Deal::find($deal_id->id);
             $deal->actual_amount= $deal->actual_amount+ $milestone->actual_cost;
             $deal->amount= $deal->amount+ $milestone->cost;
             $deal->save();
             $contract_id= Contract::where('deal_id',$deal->id)->first();
             $contract= Contract::find($contract_id->id);
             $contract->actual_amount= $contract->actual_amount+ $milestone->actual_cost;
             $contract->original_amount= $contract->original_amount+ $milestone->actual_cost;
             $contract->amount= $contract->amount+ $milestone->cost;
             $contract->save();
             $log_user = Auth::user();
             $activity = new ProjectActivity();
             $activity->activity= $milestone->milestone_title. '- New milestone added by '. $log_user->name;
 
             $activity->project_id = $project_update->id;
 
             $activity->save();
         
      }

    }
    //  / dd("true");

      $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('projects.show', $request->project_id).'?tab=milestones';
        }

        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

        if (!empty($items)) {
            foreach ($items as $itm) {
                if (is_null($itm)) {
                    return Reply::error(__('messages.itemBlank'));
                }
            }
        }
        else {
            return Reply::error(__('messages.addItem'));
        }

        foreach ($quantity as $qty) {
            if (!is_numeric($qty) && (intval($qty) < 1)) {
                return Reply::error(__('messages.quantityNumber'));
            }
        }

        foreach ($cost_per_item as $rate) {
            if (!is_numeric($rate)) {
                return Reply::error(__('messages.unitPriceNumber'));
            }
        }

        foreach ($amount as $amt) {
            if (!is_numeric($amt)) {
                return Reply::error(__('messages.amountNumber'));
            }
        }

        $invoice = new Invoice();
        $invoice->project_id = $request->project_id ?? null;
        $invoice->milestone_id = $request->milestone_id ?? null;
        $invoice->client_id = ($request->client_id) ? $request->client_id : null;
        $invoice->issue_date = Carbon::createFromFormat($this->global->date_format, $request->issue_date)->format('Y-m-d');
        $invoice->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $invoice->sub_total = round($request->sub_total, 2);
        $invoice->discount = round($request->discount_value, 2);
        $invoice->discount_type = $request->discount_type;
        $invoice->total = round($request->total, 2);
        $invoice->due_amount = round($request->total, 2);
        $invoice->currency_id = $request->currency_id;
        $invoice->recurring = 'no';
        $invoice->billing_frequency = $request->recurring_payment == 'yes' ? $request->billing_frequency : null;
        $invoice->billing_interval = $request->recurring_payment == 'yes' ? $request->billing_interval : null;
        $invoice->billing_cycle = $request->recurring_payment == 'yes' ? $request->billing_cycle : null;
        $invoice->note = str_replace('<p><br></p>', '', trim($request->note));
        $invoice->show_shipping_address = $request->show_shipping_address;
        $invoice->invoice_number = $request->invoice_number;
        $invoice->company_address_id = $request->company_address_id;
        $invoice->estimate_id = $request->estimate_id ? $request->estimate_id : null;
        $invoice->save();
       
       //need pending action 

       
        $projectId= Project::where('id',$invoice->project_id)->first();
        $milestoneId= ProjectMilestone::where('id',$invoice->milestone_id)->first();
         if($milestoneId->qc_status == 1)
         {
            $actions = PendingAction::where('code','CMI')->where('past_status',0)->where('milestone_id',$milestoneId->id)->get();
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
                    $past_action->message = 'Last invoice created for project <a href="'.route('projects.show',$projectId->id).'">'.$projectId->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> by PM <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>!';
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
    
            $helper = new HelperPendingActionController();


            $helper->ProjectCompletionSubmission($projectId,$milestoneId);

         }

        //need pending action

        if($milestone_check->status == 'incomplete')
      {
        $milestone_up= ProjectMilestone::where('id',$request->milestone_id)->first();
        $project_count= ProjectMilestone::where('project_id',$request->project_id)->count();
        $currency_id= Currency::where('id',$milestone_up->original_currency_id)->first();
        $update_milestone= ProjectMilestone::find($request->milestone_id); 
        $update_milestone->invoice_created= 1;
        $update_milestone->status = 'complete';
        $update_milestone->actual_cost= $request->total;
        $update_milestone->cost= ($request->total)/$currency_id->exchange_rate;
       
        $update_milestone->last_updated_by= Auth::id();
        //$invoice->currency_id = $request->currency_id;

        $update_milestone->invoice_id= $invoice->id;
        $update_milestone->save();

        $new_milestone= new ProjectMilestone();
        $new_milestone->milestone_title= $milestone_up->milestone_title . ' (2)';
        $new_milestone->milestone_type= $milestone_up->milestone_type; 
        $new_milestone->summary= $milestone_up->summary; 
        $new_milestone->cost= $milestone_up->cost - $update_milestone->cost;
        $new_milestone->actual_cost= $milestone_up->actual_cost - $update_milestone->actual_cost;
        $new_milestone->currency_id= $update_milestone->currency_id; 
        $new_milestone->original_currency_id= $update_milestone->original_currency_id;
        $new_milestone->invoice_created= 0; 
        $new_milestone->status= 'incomplete';
        $new_milestone->added_by = 1;
        $new_milestone->project_id = $update_milestone->project_id;
        $new_milestone->parent_id = $update_milestone->parent_id ?? $update_milestone->id;
        $new_milestone->save();

        $tasks= Task::where('milestone_id',$milestone_up->id)->where('board_column_id', '!=', 4)->get();
        foreach ($tasks as $task) {
            $task_update= Task::find($task->id);
            $task_update->milestone_id = $new_milestone->id;
            $task_update->save();
        }




      }else
      {
        $project_milestone= ProjectMilestone::find($request->milestone_id);
        $project_milestone->invoice_created= 1;
        $project_milestone->invoice_id= $invoice->id;
        $project_milestone->save();
      }


        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $invoice->updateCustomFieldData($request->get('custom_fields_data'));
        }

        if ($request->estimate_id) {
            $estimate = Estimate::findOrFail($request->estimate_id);

            if ($estimate->sign) {
                $estimate->status = 'accepted';
                $estimate->save();
            }

        }

        if ($request->proposal_id) {
            $proposal = Proposal::findOrFail($request->proposal_id);

            if ($proposal->signature) {
                $proposal->status = 'accepted';
            }

            $proposal->invoice_convert = 1;
            $proposal->save();
        }

        if ($request->has('shipping_address')) {
            if ($invoice->project_id != null && $invoice->project_id != '') {
                $client = $invoice->project->clientdetails;
            }
            elseif ($invoice->client_id != null && $invoice->client_id != '') {
                $client = $invoice->clientdetails;
            }

            if (isset($client)) {
                $client->shipping_address = $request->shipping_address;

                $client->save();
            }
        }

        // Set milestone paid if converted milestone to invoice
        if ($request->milestone_id != '') {
            $milestone = ProjectMilestone::findOrFail($request->milestone_id);
            $milestone->invoice_created = 1;
            $milestone->invoice_id = $invoice->id;
            $milestone->save();
        }

        // Set invoice id in timelog
        if ($request->has('timelog_from') && $request->timelog_from != '' && $request->has('timelog_to') && $request->timelog_to != '') {
            $timelogFrom = Carbon::createFromFormat($this->global->date_format, $request->timelog_from)->format('Y-m-d');
            $timelogTo = Carbon::createFromFormat($this->global->date_format, $request->timelog_to)->format('Y-m-d');
            $this->timelogs = ProjectTimeLog::where('project_time_logs.project_id', $request->project_id)
                ->leftJoin('tasks', 'tasks.id', '=', 'project_time_logs.task_id')
                ->where('project_time_logs.earnings', '>', 0)
                ->where('project_time_logs.approved', 1)
                ->where(
                    function ($query) {
                        $query->where('tasks.billable', 1)
                            ->orWhereNull('tasks.billable');
                    }
                )
                ->whereDate('project_time_logs.start_time', '>=', $timelogFrom)
                ->whereDate('project_time_logs.end_time', '<=', $timelogTo)
                ->update(['invoice_id' => $invoice->id]);
        }

        // Log search
        $this->logSearchEntry($invoice->id, $invoice->invoice_number, 'invoices.show', 'invoice');

        if ($invoice->send_status == 1) {
            return Reply::successWithData(__('messages.invoiceSentSuccessfully'), ['redirectUrl' => $redirectUrl]);
        }

        return Reply::successWithData(__('messages.invoiceCreated'), ['redirectUrl' => $redirectUrl]);
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
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_invoices') != 'all');

        $items = explode(',', $request->row_ids);

        foreach ($items as $id) {
            $firstInvoice = Invoice::orderBy('id', 'desc')->first();

            if ($firstInvoice->id == $id) {
                if (CreditNotes::where('invoice_id', $id)->exists()) {
                    CreditNotes::where('invoice_id', $id)->update(['invoice_id' => null]);
                }

                Invoice::destroy($id);
                return Reply::success(__('messages.invoiceDeleted'));
            }
            else {
                return Reply::error(__('messages.invoiceCanNotDeleted'));
            }
        }
    }

    public function destroy($id)
    {
        $firstInvoice = Invoice::orderBy('id', 'desc')->first();
        $invoice = Invoice::findOrFail($id);
        $this->deletePermission = user()->permission('delete_invoices');
        abort_403(!(
            $this->deletePermission == 'all'
            || ($this->deletePermission == 'added' && $invoice->added_by == user()->id)
            || ($this->deletePermission == 'owned' && $invoice->client_id == user()->id)
            || ($this->deletePermission == 'both' && ($invoice->client_id == user()->id) || $invoice->added_by == user()->id)
        ));

        if ($firstInvoice->id == $id) {
            if (CreditNotes::where('invoice_id', $id)->exists()) {
                CreditNotes::where('invoice_id', $id)->update(['invoice_id' => null]);
            }

            Invoice::destroy($id);
            return Reply::success(__('messages.invoiceDeleted'));
        }
        else {
            return Reply::error(__('messages.invoiceCanNotDeleted'));
        }
    }

    public function download($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->invoice = Invoice::with('project')->findOrFail($id)->withCustomFields();
        $this->viewPermission = user()->permission('view_invoices');

        $viewProjectInvoicePermission = user()->permission('view_project_invoices');
        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->invoice->added_by == user()->id)
            || ($this->viewPermission == 'owned' && $this->invoice->client_id == user()->id)
            || ($viewProjectInvoicePermission == 'owned' && $this->invoice->project_id && $this->invoice->project->client_id == user()->id)
        ));

        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        // Download file uploaded
        if ($this->invoice->file != null) {
            return response()->download(storage_path('app/public/invoice-files') . '/' . $this->invoice->file);
        }

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->invoice = Invoice::with('items')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $this->paidAmount = $this->invoice->getPaidAmount();
        $this->creditNote = 0;

        if ($this->invoice->credit_note) {
            $this->creditNote = CreditNotes::where('invoice_id', $id)
                ->select('cn_number')
                ->first();
        }

        $this->discount = 0;

        if ($this->invoice->discount > 0) {
            if ($this->invoice->discount_type == 'percent') {
                $this->discount = (($this->invoice->discount / 100) * $this->invoice->sub_total);
            }
            else {
                $this->discount = $this->invoice->discount;
            }
        }

        $taxList = array();

        $items = InvoiceItems::whereNotNull('taxes')->where('invoice_id', $this->invoice->id)->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = InvoiceItems::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    }
                    else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                    }
                    else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $this->payments = Payment::with(['offlineMethod'])->where('invoice_id', $this->invoice->id)->where('status', 'complete')->orderBy('paid_on', 'desc')->get();

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('invoices.pdf.' . $this->invoiceSetting->template, $this->data);
        $filename = $this->invoice->invoice_number;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function domPdfObjectForConsoleDownload($id)
    {
        $this->invoice = Invoice::with('items')->findOrFail($id);
        $this->paidAmount = $this->invoice->getPaidAmount();
        $this->creditNote = 0;

        if ($this->invoice->credit_note) {
            $this->creditNote = CreditNotes::where('invoice_id', $id)
                ->select('cn_number')
                ->first();
        }

        if ($this->invoice->discount > 0) {
            if ($this->invoice->discount_type == 'percent') {
                $this->discount = (($this->invoice->discount / 100) * $this->invoice->sub_total);

            }
            else {
                $this->discount = $this->invoice->discount;
            }
        }
        else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = InvoiceItems::whereNotNull('taxes')
            ->where('invoice_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = InvoiceItems::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        }
                        else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        }
                        else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = Setting::organisationSetting();

        $this->invoiceSetting = invoice_setting();
        $this->payments = Payment::with(['offlineMethod'])->where('invoice_id', $this->invoice->id)->where('status', 'complete')->orderBy('paid_on', 'desc')->get();

        $pdf = app('dompdf.wrapper');

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('invoices.pdf.invoice-recurring', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);

        $filename = $this->invoice->invoice_number;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function edit($id)
    {
        $this->invoice = Invoice::with('client', 'client.projects', 'items', 'items.invoiceItemImage')->findOrFail($id)->withCustomFields();
        $this->editPermission = user()->permission('edit_invoices');
        $this->invoiceSetting = invoice_setting();

        abort_403(!(
            $this->editPermission == 'all'
            || ($this->editPermission == 'added' && $this->invoice->added_by == user()->id)
            || ($this->editPermission == 'owned' && $this->invoice->client_id == user()->id)
            || ($this->editPermission == 'both' && ($this->invoice->client_id == user()->id || $this->invoice->added_by == user()->id))
        ));

        abort_403($this->invoice->status == 'paid' && $this->invoice->amountPaid() > 0);

        $this->pageTitle = $this->invoice->invoice_number;

        if (!empty($this->invoice->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->invoice->getCustomFieldGroupsWithFields()->fields;
        }

        $this->projects = Project::whereNotNull('client_id')->get();
        $this->currencies = Currency::all();


        $this->taxes = Tax::all();
        $this->products = Product::all();
        $this->clients = User::allClients();

        if ($this->invoice->project_id != '') {
            $companyName = Project::where('id', $this->invoice->project_id)->with('clientdetails')->first();
            $this->companyName = $companyName->clientdetails ? $companyName->clientdetails->company_name : '';
        }

        $this->companyAddresses = CompanyAddress::all();

        if (request()->ajax()) {
            $html = view('invoices.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'invoices.ajax.edit';
        return view('invoices.create', $this->data);

    }

    public function update(UpdateInvoice $request, $id)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

        if ($request->total == 0) {
            return Reply::error(__('messages.amountIsZero'));
        }

        foreach ($quantity as $qty) {
            if (!is_numeric($qty) && $qty < 1) {
                return Reply::error(__('messages.quantityNumber'));
            }
        }

        foreach ($cost_per_item as $rate) {
            if (!is_numeric($rate)) {
                return Reply::error(__('messages.unitPriceNumber'));
            }
        }

        foreach ($amount as $amt) {
            if (!is_numeric($amt)) {
                return Reply::error(__('messages.amountNumber'));
            }
        }

        foreach ($items as $itm) {
            if (is_null($itm)) {
                return Reply::error(__('messages.itemBlank'));
            }
        }

        $invoice = Invoice::findOrFail($id);

        $invoice->project_id = $request->project_id ?? null;
        $invoice->milestone_id = $request->milestone_id ?? null;
        $invoice->client_id = ($request->client_id) ? $request->client_id : null;
        $invoice->issue_date = Carbon::createFromFormat($this->global->date_format, $request->issue_date)->format('Y-m-d');
        $invoice->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $invoice->sub_total = round($request->sub_total, 2);
        $invoice->discount = round($request->discount_value, 2);
        $invoice->discount_type = $request->discount_type;
        $invoice->total = round($request->total, 2);
        $invoice->due_amount = round($request->total, 2);
        $invoice->currency_id = $request->currency_id;

        if ($request->has('status')) {
            $invoice->status = $request->status;
        }

        $invoice->recurring = $request->recurring_payment;
        $invoice->billing_frequency = $request->recurring_payment == 'yes' ? $request->billing_frequency : null;
        $invoice->billing_interval = $request->recurring_payment == 'yes' ? $request->billing_interval : null;
        $invoice->billing_cycle = $request->recurring_payment == 'yes' ? $request->billing_cycle : null;
        $invoice->note = str_replace('<p><br></p>', '', trim($request->note));
        $invoice->show_shipping_address = $request->show_shipping_address;
        $invoice->invoice_number = $request->invoice_number;
        $invoice->company_address_id = $request->company_address_id;
        $invoice->save();

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $invoice->updateCustomFieldData($request->get('custom_fields_data'));
        }

        if ($request->has('shipping_address')) {
            if ($invoice->project_id != null && $invoice->project_id != '') {
                $client = $invoice->project->clientdetails;
            }
            elseif ($invoice->client_id != null && $invoice->client_id != '') {
                $client = $invoice->clientdetails;
            }

            if (isset($client)) {
                $client->shipping_address = $request->shipping_address;
                $client->save();
            }
        }

        return Reply::redirect(route('invoices.index'), __('messages.invoiceUpdated'));
    }

    public function show($id)
    {
        $this->invoice = Invoice::with('project', 'items', 'items.invoiceItemImage')->findOrFail($id)->withCustomFields();

        /* Used for cancel invoice condition */
        $this->firstInvoice = Invoice::orderBy('id', 'desc')->first();

        $this->viewPermission = user()->permission('view_invoices');
        $viewProjectInvoicePermission = user()->permission('view_project_invoices');

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->invoice->added_by == user()->id)
            || ($this->viewPermission == 'owned' && $this->invoice->client_id == user()->id && $this->invoice->send_status)
            || ($this->viewPermission == 'both' && ($this->invoice->added_by == user()->id || $this->invoice->client_id == user()->id))
            || ($viewProjectInvoicePermission == 'owned' && $this->invoice->client_id == user()->id && $this->invoice->send_status)
        ));

        if (!empty($this->invoice->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->invoice->getCustomFieldGroupsWithFields()->fields;
        }

        $this->paidAmount = $this->invoice->getPaidAmount();
        $this->pageTitle = $this->invoice->invoice_number;
        $this->firstInvoice = Invoice::orderBy('id', 'desc')->first();

        $this->discount = 0;

        if ($this->invoice->discount > 0) {
            if ($this->invoice->discount_type == 'percent') {
                $this->discount = (($this->invoice->discount / 100) * $this->invoice->sub_total);
            }
            else {
                $this->discount = $this->invoice->discount;
            }
        }

        $taxList = array();

        $items = InvoiceItems::whereNotNull('taxes')
            ->where('invoice_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = InvoiceItems::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    }
                    else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                    }
                    else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }
            }
        }

        $this->taxes = $taxList;
        $this->payments = Payment::with(['offlineMethod'])->where('invoice_id', $this->invoice->id)->where('status', 'complete')->orderBy('paid_on', 'desc')->get();

        $this->settings = global_setting();
        $this->invoiceSetting = invoice_setting();
        $this->creditNote = 0;

        $this->credentials = PaymentGatewayCredentials::first();
        $this->methods = OfflinePaymentMethod::activeMethod();

        return view('invoices.show', $this->data);

    }

    public function sendInvoice($invoiceID)
    {
        $invoice = Invoice::with(['project', 'project.client'])->findOrFail($invoiceID);

        if ($invoice->project_id != null && $invoice->project_id != '') {
            $notifyUser = $invoice->project->client;
        }
        elseif ($invoice->client_id != null && $invoice->client_id != '') {
            $notifyUser = $invoice->client;
        }
        if (isset($notifyUser) && !is_null($notifyUser)) {
            event(new NewInvoiceEvent($invoice, $notifyUser));
        }

        $invoice->send_status = 1;

        if ($invoice->status == 'draft') {
            $invoice->status = 'unpaid';
        }

        $invoice->save();
        return Reply::success(__('messages.invoiceSentSuccessfully'));
    }

    public function remindForPayment($id)
    {
        $invoice = Invoice::with(['project', 'project.client'])->findOrFail($id);

        if ($invoice->project_id != null && $invoice->project_id != '') {
            $notifyUser = $invoice->project->client;
        }
        elseif ($invoice->client_id != null && $invoice->client_id != '') {
            $notifyUser = $invoice->client;
        }
        if (isset($notifyUser) && !is_null($notifyUser)) {
            event(new PaymentReminderEvent($invoice, $notifyUser));
        }

        return Reply::success('messages.reminderMailSuccess');
    }

    public function addItem(Request $request)
    {
        $this->items = Product::with('tax')->find($request->id);

        $this->invoiceSetting = invoice_setting();

        $exchangeRate = Currency::find($request->currencyId);

        if (!is_null($exchangeRate) && !is_null($exchangeRate->exchange_rate)) {
            if ($this->items->total_amount != '') {
                /** @phpstan-ignore-next-line */
                $this->items->price = floor($this->items->total_amount * $exchangeRate->exchange_rate);
            }
            else {

                $this->items->price = floatval($this->items->price) * floatval($exchangeRate->exchange_rate);
            }
        }
        else {
            if ($this->items->total_amount != '') {
                $this->items->price = $this->items->total_amount;
            }
        }

        $this->items->price = number_format((float)$this->items->price, 2, '.', '');
        $this->taxes = Tax::all();
        $view = view('invoices.ajax.add_item', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'view' => $view]);
    }

    public function appliedCredits(Request $request, $id)
    {
        $this->invoice = Invoice::with('payment', 'payment.creditNote')->findOrFail($id);
        $this->pageTitle = __('app.menu.payments');

        $this->payments = $this->invoice->payment;

        if (request()->ajax()) {
            $html = view('invoices.ajax.applied_credits', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'invoices.ajax.applied_credits';
        return view('invoices.create', $this->data);
    }

    public function deleteAppliedCredit(Request $request, $id)
    {

        $this->invoice = Invoice::with('payment', 'payment.creditNote')->findOrFail($request->invoice_id);

        $payment = Payment::with('creditNote', 'invoice')->find($id);

        $creditNote = CreditNotes::find($payment->credit_notes_id);

        $payment->delete();

        // Change credit note status
        if (isset($creditNote) && $creditNote->status == 'closed') {
            $creditNote->status = 'open';
            $creditNote->save();
        }


        $this->payments = $this->invoice->payment;

        if (request()->ajax()) {
            $view = view('invoices.ajax.applied_credits', $this->data)->render();
            return Reply::successWithData(__('messages.creditedInvoiceDeletedSuccessfully'), ['view' => $view, 'remainingAmount' => number_format((float)$this->invoice->amountDue(), 2, '.', '')]);
        }

        return Reply::redirect(route('invoices.show', [$this->invoice->id]), __('messages.creditedInvoiceDeletedSuccessfully'));
    }

    public function paymentDetail($invoiceID)
    {
        $this->invoice = Invoice::findOrFail($invoiceID);
        $this->pageTitle = __('app.menu.payments');

        if (request()->ajax()) {
            $html = view('invoices.ajax.payment-details', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'invoices.ajax.payment-details';
        return view('invoices.create', $this->data);
    }

    public function fileUpload()
    {
        $this->invoiceId = request('invoice_id');
        return view('invoices.file_upload', $this->data);
    }

    public function storeFile(InvoiceFileStore $request)
    {
        $invoiceId = $request->invoice_id;
        $file = $request->file('file');

        $newName = $file->hashName(); // Setting hashName name
        // Getting invoice data
        $invoice = Invoice::find($invoiceId);

        if ($invoice != null) {

            if ($invoice->file != null) {
                unlink(storage_path('app/public/invoice-files') . '/' . $invoice->file);
            }

            $file->move(storage_path('app/public/invoice-files'), $newName);

            $invoice->file = $newName;
            $invoice->file_original_name = $file->getClientOriginalName(); // Getting uploading file name;

            $invoice->save();

            return Reply::success('messages.fileUploadedSuccessfully');
        }

        return Reply::error(__('messages.fileUploadIssue'));
    }

    public function stripeModal(Request $request)
    {
        $this->invoiceID = $request->invoice_id;
        $this->countries = countries();
        return view('invoices.stripe.index', $this->data);
    }

    public function saveStripeDetail(StoreStripeDetail $request)
    {
        $id = $request->invoice_id;
        $this->invoice = Invoice::with(['client', 'project', 'project.client'])->findOrFail($id);
        $this->settings = $this->global;
        $this->credentials = PaymentGatewayCredentials::first();

        $client = null;

        if (!is_null($this->invoice->client_id)) {
            $client = $this->invoice->client;
        }
        else if (!is_null($this->invoice->project_id) && !is_null($this->invoice->project->client_id)) {
            $client = $this->invoice->project->client;
        }

        if (($this->credentials->test_stripe_secret || $this->credentials->live_stripe_secret) && !is_null($client)) {
            Stripe::setApiKey($this->credentials->stripe_mode == 'test' ? $this->credentials->test_stripe_secret : $this->credentials->live_stripe_secret);

            $totalAmount = $this->invoice->amountDue();

            $customer = \Stripe\Customer::create([
                'email' => $client->email,
                'name' => $request->clientName,
                'address' => [
                    'line1' => $request->clientName,
                    'city' => $request->city,
                    'state' => $request->state,
                    'country' => $request->country,
                ],
            ]);

            $intent = \Stripe\PaymentIntent::create([
                'amount' => $totalAmount * 100,
                'currency' => $this->invoice->currency->currency_code,
                'customer' => $customer->id,
                'setup_future_usage' => 'off_session',
                'payment_method_types' => ['card'],
                'description' => $this->invoice->invoice_number . ' Payment',
                'metadata' => ['integration_check' => 'accept_a_payment', 'invoice_id' => $id]
            ]);

            $this->intent = $intent;
        }

        $customerDetail = [
            'email' => $client->email,
            'name' => $request->clientName,
            'line1' => $request->clientName,
            'city' => $request->city,
            'state' => $request->state,
            'country' => $request->country,
        ];

        $this->customerDetail = $customerDetail;

        $view = view('invoices.stripe.stripe-payment', $this->data)->render();

        return Reply::dataOnly(['view' => $view, 'intent' => $this->intent]);
    }

    public function offlinePaymentModal(Request $request)
    {
        $this->invoiceID = $request->invoice_id;
        $this->methods = OfflinePaymentMethod::activeMethod();

        return view('invoices.offline.index', $this->data);
    }

    public function storeOfflinePayment(Request $request)
    {
        $returnUrl = '';
        $invoice = '';

        if (isset($request->invoiceID)) {
            $invoiceId = $request->invoiceID;
            $invoice = Invoice::findOrFail($request->invoiceID);
            $returnUrl = route('invoices.show', $invoiceId);
        }

        if (isset($request->orderID)) {
            $invoice = $this->makeInvoice($request->orderID);
            $returnUrl = route('orders.show', $request->orderID);
        }

        $clientPayment = new Payment();
        $clientPayment->currency_id = $invoice->currency_id;
        $clientPayment->invoice_id = $invoice->id;
        $clientPayment->project_id = $invoice->project_id;
        $clientPayment->amount = $invoice->total;
        $clientPayment->offline_method_id = $request->offlineMethod;
        $clientPayment->gateway = 'Offline';
        $clientPayment->status = 'complete';
        $clientPayment->paid_on = now();

        if ($request->hasFile('bill')) {
            $clientPayment->bill = $request->bill->hashName();
            $request->bill->store(Payment::FILE_PATH);
        }

        $clientPayment->save();

        $invoice->status = 'paid';
        $invoice->save();

        return Reply::redirect($returnUrl, __('messages.paymentSuccess'));
    }

    public function makeInvoice($orderId)
    {
        /* Step1 -  Set order status paid */
        $order = Order::find($orderId);
        $order->status = 'completed';
        $order->save();

        /* Step2 - Make an invoice related to recently paid order_id */
        $invoice = new Invoice();
        $invoice->order_id = $orderId;
        $invoice->client_id = $order->client_id;
        $invoice->sub_total = $order->sub_total;
        $invoice->total = $order->total;
        $invoice->currency_id = $order->currency_id;
        $invoice->status = 'paid';
        $invoice->note = str_replace('<p><br></p>', '', trim($order->note));
        $invoice->issue_date = now();
        $invoice->send_status = 1;
        $invoice->invoice_number = Invoice::lastInvoiceNumber() + 1;
        $invoice->due_amount = 0;
        $invoice->save();

        /* Step3 - Make invoice item & image entry */
        if (isset($order->items)) {
            foreach ($order->items as $item) /* @phpstan-ignore-line */ {
                // Save invoice item
                $invoiceItem = new InvoiceItems();
                $invoiceItem->invoice_id = $invoice->id;
                $invoiceItem->item_name = $item->item_name;
                $invoiceItem->item_summary = $item->item_summary;
                $invoiceItem->type = $item->type;
                $invoiceItem->quantity = $item->quantity;
                $invoiceItem->unit_price = $item->unit_price;
                $invoiceItem->amount = $item->amount;
                $invoiceItem->hsn_sac_code = $item->hsn_sac_code;
                $invoiceItem->taxes = $item->taxes;
                $invoiceItem->save();

                // Save invoice item image
                if ($item->orderItemImage) {
                    $invoiceItemImage = new InvoiceItemImage();
                    $invoiceItemImage->invoice_item_id = $invoiceItem->id;
                    $invoiceItemImage->external_link = $item->orderItemImage->external_link;
                    $invoiceItemImage->save();
                }
            }
        }

        return $invoice;
    }

    public function cancelStatus(Request $request)
    {
        $invoice = Invoice::find($request->invoiceID);
        $invoice->status = 'canceled'; // update status as canceled
        $invoice->save();

        return Reply::success(__('messages.invoiceUpdated'));
    }

    public function getClientOrCompanyName($projectID = '')
    {
        $this->projectID = $projectID;
        $this->currencies = Currency::all();

        if ($projectID == '') {
            $this->clients = User::allClients();
        }
        else {
            $this->client = Project::with('currency')->where('id', $projectID)->with('client')->first();
            $this->companyName = '';
            $this->clientId = '';

            if ($this->client) {
                $this->companyName = $this->client->client->name;
                $this->clientId = $this->client->client->id;
            }
        }

        $currency = view('invoices.currency_list', $this->data)->render();
        $list = view('invoices.client_or_company_name', $this->data)->render();

        return Reply::dataOnly(['html' => $list, 'currency' => $currency]);
    }

    public function fetchTimelogs(Request $request)
    {
        $this->taxes = Tax::all();
        $this->invoiceSetting = invoice_setting();
        $projectId = $request->projectId;
        $this->timelogs = [];

        if (!is_null($request->timelogFrom) && $request->timelogFrom != '') {
            $timelogFrom = Carbon::createFromFormat($this->global->date_format, $request->timelogFrom)->format('Y-m-d');
            $timelogTo = Carbon::createFromFormat($this->global->date_format, $request->timelogTo)->format('Y-m-d');
            $this->timelogs = ProjectTimeLog::with('task')
                ->leftJoin('tasks', 'tasks.id', '=', 'project_time_logs.task_id')
                ->groupBy('project_time_logs.task_id')
                ->where('project_time_logs.project_id', $projectId)
                ->where('project_time_logs.earnings', '>', 0)
                ->where('project_time_logs.approved', 1)
                ->where(
                    function ($query) {
                        $query->where('tasks.billable', 1)
                            ->orWhereNull('tasks.billable');
                    }
                )
                ->whereDate('project_time_logs.start_time', '>=', $timelogFrom)
                ->whereDate('project_time_logs.end_time', '<=', $timelogTo)
                ->selectRaw('project_time_logs.id, project_time_logs.task_id, sum(project_time_logs.earnings) as sum')
                ->get();
        }

        $html = view('invoices.timelog-item', $this->data)->render();

        return Reply::dataOnly(['html' => $html]);
    }

    public function checkShippingAddress()
    {
        if (request()->has('clientId')) {
            $user = User::findOrFail(request()->clientId);

            if (request()->showShipping == 'yes' && (is_null($user->clientDetails->shipping_address) || $user->clientDetails->shipping_address === '')) {
                $view = view('invoices.show_shipping_address_input')->render();
                return Reply::dataOnly(['view' => $view]);
            }
            else {
                return Reply::dataOnly(['show' => 'false']);
            }
        }
        else {
            return Reply::dataOnly(['switch' => 'off']);
        }
    }

    public function toggleShippingAddress(Invoice $invoice)
    {
        $invoice->show_shipping_address = ($invoice->show_shipping_address === 'yes') ? 'no' : 'yes';
        $invoice->save();

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function shippingAddressModal(Invoice $invoice)
    {
        $clientId = $invoice->clientdetails ? $invoice->clientdetails->user_id : $invoice->project->clientdetails->user_id;

        return view('invoices.add_shipping_address', ['clientId' => $clientId]);
    }

    public function addShippingAddress(StoreShippingAddressRequest $request, $clientId)
    {
        $clientDetail = ClientDetails::where('user_id', $clientId)->first();
        $clientDetail->shipping_address = $request->shipping_address;
        $clientDetail->save();

        return Reply::success(__('messages.shippingAddressAddedSuccessfully'));
    }

    public function showImage()
    {
        $this->imageUrl = request()->image_url;
        return view('invoices.ajax.show_image', $this->data);
    }

    public function deleteInvoiceItemImage(Request $request)
    {
        $item = InvoiceItemImage::where('invoice_item_id', $request->invoice_item_id)->first();
        Files::deleteFile($item->hashname, InvoiceItemImage::FILE_PATH . '/' . $item->id . '/');
        $item->delete();

        return Reply::success(__('messages.updatedSuccessfully'));
    }

}
