<?php

namespace App\Http\Controllers;

use App\DataTables\InvoiceRecurringDataTable;
use App\DataTables\RecurringInvoicesDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Invoices\StoreRecurringInvoice;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\InvoiceItems;
use App\Models\InvoiceSetting;
use App\Models\Product;
use App\Models\Project;
use App\Models\RecurringInvoice;
use App\Models\RecurringInvoiceItemImage;
use App\Models\RecurringInvoiceItems;
use App\Models\Tax;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RecurringInvoiceController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.recurringInvoices';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('invoices', $this->user->modules));

            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(InvoiceRecurringDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_invoices');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        if (!request()->ajax()) {
            $this->projects = Project::all();
            $this->clients = User::allClients();
        }

        return $dataTable->render('recurring-invoices.index', $this->data);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_invoices');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->pageTitle = __('app.add') . ' ' . __('app.invoiceRecurring');
        $this->projects = Project::all();
        $this->currencies = Currency::all();
        $this->lastInvoice = Invoice::lastInvoiceNumber() + 1;
        $this->invoiceSetting = InvoiceSetting::first();
        $this->zero = '';

        if (strlen($this->lastInvoice) < $this->invoiceSetting->invoice_digit) {
            $condition = $this->invoiceSetting->invoice_digit - strlen($this->lastInvoice);

            for ($i = 0; $i < $condition; $i++) {
                $this->zero = '0' . $this->zero;
            }
        }

        $this->taxes = Tax::all();
        $this->products = Product::select('id', 'name as title', 'name as text')->get();
        $this->clients = User::allClients();

        if (request()->ajax()) {
            $html = view('recurring-invoices.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'recurring-invoices.ajax.create';
        return view('recurring-invoices.create', $this->data);


    }

    /**
     * @param StoreRecurringInvoice $request
     * @return array
     */
    public function store(StoreRecurringInvoice $request)
    {
        $items = $request->input('item_name');
        $cost_per_item = $request->input('cost_per_item');
        $quantity = $request->input('quantity');
        $amount = $request->input('amount');

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

            if ((int)$amt <= 0) {
                return Reply::error(__('messages.amountIsZero'));
            }
        }

        foreach ($items as $itm) {
            if (is_null($itm)) {
                return Reply::error(__('messages.itemBlank'));
            }
        }

        $invoice = new RecurringInvoice();
        $invoice->project_id = $request->project_id ?? null;
        $invoice->client_id = $request->has('client_id') ? $request->client_id : null;
        $invoice->issue_date = Carbon::createFromFormat($this->global->date_format, $request->issue_date)->format('Y-m-d');
        $invoice->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $invoice->sub_total = $request->sub_total;
        $invoice->total = $request->total;
        $invoice->discount = round($request->discount_value, 2);
        $invoice->discount_type = $request->discount_type;
        $invoice->total = round($request->total, 2);
        $invoice->currency_id = $request->currency_id;
        $invoice->note = str_replace('<p><br></p>', '', trim($request->note));

        $invoice->rotation = $request->rotation;
        $invoice->billing_cycle = $request->billing_cycle > 0 ? $request->billing_cycle : null;
        $invoice->unlimited_recurring = $request->billing_cycle < 0 ? 1 : 0;
        $invoice->created_by = $this->user->id;

        if ($request->rotation == 'weekly' || $request->rotation == 'bi-weekly') {
            $invoice->day_of_week = $request->day_of_week;
        }
        elseif ($request->rotation == 'monthly' || $request->rotation == 'quarterly' || $request->rotation == 'half-yearly' || $request->rotation == 'annually') {
            $invoice->day_of_month = $request->day_of_month;
        }

        if ($request->project_id > 0) {
            $invoice->project_id = $request->project_id;
        }

        $invoice->client_can_stop = ($request->client_can_stop) ? 1 : 0;

        $invoice->status = 'active';
        $invoice->save();

        return Reply::redirect(route('recurring-invoices.index'), __('messages.recurringInvoiceCreated'));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->invoice = RecurringInvoice::with('recurrings', 'items.recurringInvoiceItemImage')->findOrFail($id);

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

        $items = RecurringInvoiceItems::whereNotNull('taxes')
            ->where('invoice_recurring_id', $this->invoice->id)
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

        $this->settings = $this->global;
        $this->invoiceSetting = InvoiceSetting::first();

        $tab = request('tab');

        switch ($tab) {
        case 'invoices':
                return $this->invoices($id);
        default:
            $this->view = 'recurring-invoices.ajax.overview';
                break;
        }


        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;

        return view('recurring-invoices.show', $this->data);
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|void
     */
    public function edit($id)
    {

        $this->invoice = RecurringInvoice::with('items.recurringInvoiceItemImage')->findOrFail($id);
        $this->editPermission = user()->permission('edit_invoices');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->invoice->added_by == user()->id)));

        $this->projects = Project::all();
        $this->currencies = Currency::all();
        abort_403($this->invoice->status == 'paid');

        $this->taxes = Tax::all();
        $this->products = Product::select('id', 'name as title', 'name as text')->get();
        $this->clients = User::allClients();

        if ($this->invoice->project_id != '') {
            $companyName = Project::where('id', $this->invoice->project_id)->with('clientdetails')->first();
            $this->companyName = $companyName->clientdetails ? $companyName->clientdetails->company_name : '';
            $this->clientId = $companyName->clientdetails ? $companyName->clientdetails->user_id : '';
        }

        return view('recurring-invoices.edit', $this->data);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    // public function update(StoreRecurringInvoice $request, $id)
    public function update(Request $request, $id)
    {
        $items = $request->input('item_name');
        $itemsSummary = $request->input('item_summary');
        $cost_per_item = $request->input('cost_per_item');
        $hsn_sac_code = $request->input('hsn_sac_code');
        $quantity = $request->input('quantity');
        $amount = $request->input('amount');
        $tax = $request->input('taxes');
        $invoice_item_image = $request->invoice_item_image;
        $invoice_item_image_url = $request->invoice_item_image_url;
        $item_ids = $request->item_ids;

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

        foreach ($items as $itm) {
            if (is_null($itm)) {
                return Reply::error(__('messages.itemBlank'));
            }
        }

        $invoice = RecurringInvoice::findOrFail($id);
        $invoice->project_id = $request->project_id ?? null;
        $invoice->client_id = $request->client_id;
        $invoice->issue_date = Carbon::createFromFormat($this->global->date_format, $request->issue_date)->format('Y-m-d');
        $invoice->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $invoice->sub_total = $request->sub_total;
        $invoice->total = $request->total;
        $invoice->discount = round($request->discount_value, 2);
        $invoice->discount_type = $request->discount_type;
        $invoice->total = round($request->total, 2);
        $invoice->currency_id = $request->currency_id;
        $invoice->note = str_replace('<p><br></p>', '', trim($request->note));

        $invoice->rotation = $request->rotation;
        $invoice->billing_cycle = $request->billing_cycle > 0 ? $request->billing_cycle : null;
        $invoice->unlimited_recurring = $request->billing_cycle < 0 ? 1 : 0;
        $invoice->created_by = $this->user->id;

        if ($request->rotation == 'weekly' || $request->rotation == 'bi-weekly') {
            $invoice->day_of_week = $request->day_of_week;
        }
        elseif ($request->rotation == 'monthly' || $request->rotation == 'quarterly' || $request->rotation == 'half-yearly' || $request->rotation == 'annually') {
            $invoice->day_of_month = $request->day_of_month;
        }

        if ($request->project_id > 0) {
            $invoice->project_id = $request->project_id;
        }

        $invoice->client_can_stop = ($request->client_can_stop) ? 1 : 0;

        if (request()->has('status')) {
            $invoice->status = $request->status;
        }

        $invoice->save();

        if (!empty($request->item_name) && is_array($request->item_name)) {
            // Step1 - Delete all invoice items which are not avaialable
            if (!empty($item_ids)) {
                RecurringInvoiceItems::whereNotIn('id', $item_ids)->delete();
            }

            // Step2&3 - Find old invoices items, update it and check if images are newer or older
            foreach ($items as $key => $item) {
                $invoice_item_id = isset($item_ids[$key]) ? $item_ids[$key] : 0;

                $invoiceItem = RecurringInvoiceItems::find($invoice_item_id);

                if ($invoiceItem === null) {
                    $invoiceItem = new RecurringInvoiceItems();
                }

                $invoiceItem->invoice_recurring_id = $invoice->id;
                $invoiceItem->item_name = $item;
                $invoiceItem->item_summary = $itemsSummary[$key];
                $invoiceItem->type = 'item';
                $invoiceItem->hsn_sac_code = (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null;
                $invoiceItem->quantity = $quantity[$key];
                $invoiceItem->unit_price = round($cost_per_item[$key], 2);
                $invoiceItem->amount = round($amount[$key], 2);
                $invoiceItem->taxes = ($tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null);
                $invoiceItem->save();

                /* Invoice file save here */
                if ((isset($invoice_item_image[$key]) && $request->hasFile('invoice_item_image.' . $key)) || isset($invoice_item_image_url[$key])) {
                    /* Delete previous uploaded file if it not a product (because product images cannot be deleted) */
                    if (!isset($invoice_item_image_url[$key]) && $invoiceItem && $invoiceItem->recurringInvoiceItemImage) {
                        Files::deleteFile($invoiceItem->recurringInvoiceItemImage->hashname, RecurringInvoiceItemImage::FILE_PATH . '/' . $invoiceItem->id . '/');
                    }

                    $filename = '';

                    if (isset($invoice_item_image[$key])) {
                        $filename = Files::uploadLocalOrS3($invoice_item_image[$key], RecurringInvoiceItemImage::FILE_PATH . '/' . $invoiceItem->id . '/');
                    }

                    RecurringInvoiceItemImage::updateOrCreate(
                        [
                            'invoice_recurring_item_id' => $invoiceItem->id,
                        ],
                        [
                            'filename' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getClientOriginalName() : '',
                            'hashname' => !isset($invoice_item_image_url[$key]) ? $filename : '',
                            'size' => !isset($invoice_item_image_url[$key]) ? $invoice_item_image[$key]->getSize() : '',
                            'external_link' => $invoice_item_image_url[$key] ?? ''
                        ]
                    );
                }
            }
        }

        return Reply::redirect(route('recurring-invoices.index'), __('messages.recurringInvoiceCreated'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->deletePermission = user()->permission('delete_invoices');

        $recurringInvoice = RecurringInvoice::findOrFail($id);
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $recurringInvoice->added_by == user()->id)));

        RecurringInvoice::destroy($id);

        return Reply::success(__('messages.invoiceDeleted'));
    }

    /**
     * @param Request $request
     * @return array
     */
    public function changeStatus(Request $request)
    {
        $invoiceId = $request->invoiceId;
        $status = $request->status;
        $invoice = RecurringInvoice::find($invoiceId);

        if ($invoice) {
            $invoice->status = $status;
            $invoice->save();
        }

        return Reply::success(__('messages.updateSuccess'));
    }

    /**
     * @param RecurringInvoicesDataTable $dataTable
     * @param int $id
     * @return mixed
     */
    public function recurringInvoices(RecurringInvoicesDataTable $dataTable, $id)
    {
        $this->invoice = RecurringInvoice::findOrFail($id);
        $this->projects = Project::all();
        $this->clients = User::allClients();
        return $dataTable->render('recurring-invoices.recurring-invoices', $this->data);
    }

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
            RecurringInvoice::destroy($id);
        }
    }

    public function invoices($recurringID)
    {
        $dataTable = new RecurringInvoicesDataTable;
        $viewPermission = user()->permission('view_invoices');
        abort_403(!in_array($viewPermission, ['all', 'added']));

        $this->recurringID = $recurringID;
        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'recurring-invoices.ajax.invoices';

        return $dataTable->render('recurring-invoices.show', $this->data);
    }

}
