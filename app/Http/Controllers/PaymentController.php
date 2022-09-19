<?php

namespace App\Http\Controllers;

use App\DataTables\PaymentsDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Payments\StorePayment;
use App\Http\Requests\Payments\UpdatePayments;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

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

        $payment = new Payment();

        if (!is_null($request->currency_id)) {
            $payment->currency_id = $request->currency_id;
        }
        else {
            $payment->currency_id = $this->global->currency_id;
        }

        if ($request->project_id != '') {
            $project = Project::findOrFail($request->project_id);
            $payment->project_id = $request->project_id;
            $payment->currency_id = $project->currency_id;
        }

        if ($request->invoice_id != '') {
            $invoice = Invoice::findOrFail($request->invoice_id);

            $paidAmount = $invoice->amountPaid();

            $payment->project_id = $invoice->project_id;
            $payment->invoice_id = $invoice->id;
            $payment->currency_id = $invoice->currency->id;

            if ($request->amount > $invoice->amountDue()) {
                return Reply::error(__('messages.invoicePaymentExceedError'));
            }
        }

        $payment->amount = round($request->amount, 2);
        $payment->gateway = $request->gateway;
        $payment->transaction_id = $request->transaction_id;
        $payment->paid_on = Carbon::createFromFormat($this->global->date_format, $request->paid_on)->format('Y-m-d');

        $payment->remarks = $request->remarks;

        if ($request->hasFile('bill')) {
            $payment->bill = Files::uploadLocalOrS3($request->bill, Payment::FILE_PATH);
        }

        $payment->status = 'complete';
        $payment->save();

        if (isset($invoice) && isset($paidAmount)) {

            if ((float)($paidAmount + $request->amount) >= (float)$invoice->total) {
                $invoice->status = 'paid';
            }
            else {
                $invoice->status = 'partial';
            }

            $invoice->save();
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('payments.index');
        }

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
