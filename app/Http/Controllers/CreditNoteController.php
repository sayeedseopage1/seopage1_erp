<?php

namespace App\Http\Controllers;

use App\DataTables\CreditNotesDataTable;
use App\Helper\Reply;
use App\Http\Requests\CreditNotes\creditNoteFileStore;
use App\Http\Requests\CreditNotes\StoreCreditNotes;
use App\Http\Requests\CreditNotes\UpdateCreditNote;
use App\Models\CreditNoteItem;
use App\Models\CreditNoteItemImage;
use App\Models\CreditNotes;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Project;
use App\Models\Tax;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;

class CreditNoteController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.credit-note';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('invoices', $this->user->modules));
            return $next($request);
        });
    }

    public function index(CreditNotesDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_invoices');

        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();
        }

        if (in_array('client', user_roles())) {
            $this->clients = User::client();
        }
        else {
            $this->clients = User::allClients();
        }

        return $dataTable->render('credit-notes.index', $this->data);

    }

    public function create()
    {
        abort_403(!in_array(user()->permission('add_invoices'), ['all', 'added']));

        abort_if(!request()->has('invoice'), 404);

        $this->invoiceId = $id = request('invoice');
        $this->creditNote = Invoice::with(['items', 'project', 'client'])->findOrFail($id);

        abort_if(!in_array($this->creditNote->status, ['paid', 'partial']), 404);

        $this->lastCreditNote = CreditNotes::count() + 1;
        $this->creditNoteSetting = invoice_setting();
        $this->projects = Project::allProjects();
        $this->currencies = Currency::all();
        $this->taxes = Tax::all();
        $this->products = Product::all();
        $this->zero = '';
        $this->invoiceSetting = invoice_setting();
        $this->pageTitle = __('app.add') . ' ' . __('app.menu.credit-note');

        if (strlen($this->lastCreditNote) < $this->creditNoteSetting->credit_note_digit) {
            $condition = $this->creditNoteSetting->credit_note_digit - strlen($this->lastCreditNote);

            for ($i = 0; $i < $condition; $i++) {
                $this->zero = '0' . $this->zero;
            }
        }

        /** @phpstan-ignore-next-line */
        $items = $this->creditNote->items->filter(function ($value, $key) {
            return $value->type == 'item';
        });

        /** @phpstan-ignore-next-line */
        $tax = $this->creditNote->items->filter(function ($value, $key) {
            return $value->type == 'tax';
        });

        $this->totalTax = $tax->sum('amount');
        $this->discount = $this->creditNote->discount;
        $this->discountType = $this->creditNote->discount_type;

        if ($this->discountType == 'percent') {
            $this->totalDiscount = $items->sum('amount') * $this->discount / 100;
        }

        if ($this->discountType == 'fixed') {
            $this->totalDiscount = $this->discount;
        }

        if (request()->ajax()) {
            $html = view('credit-notes.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'credit-notes.ajax.create';
        return view('credit-notes.create', $this->data);

    }

    public function store(StoreCreditNotes $request)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $hsn_sac_code = $request->hsn_sac_code;
        $quantity = $request->quantity;
        $amount = $request->amount;
        $amountArray = $request->amount;
        $tax = $request->taxes;
        $itemSummary = $request->item_summary;
        $invoice_item_image_url = $request->invoice_item_image_url;

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

        DB::beginTransaction();

        $invoice = Invoice::find($request->invoice_id);

        $clientId = null;

        if ($invoice->client_id) {
            $clientId = $invoice->client_id;
        }
        elseif (!is_null($invoice->project) && $invoice->project->client_id) {
            $clientId = $invoice->project->client_id;
        }
        $creditNote = new CreditNotes();

        $creditNote->project_id = ($invoice->project_id) ? $invoice->project_id : null;
        $creditNote->client_id = $clientId;
        $creditNote->cn_number = CreditNotes::count() + 1;
        $creditNote->invoice_id = $invoice->id;
        $creditNote->issue_date = $request->issue_date;
        $creditNote->due_date = $request->due_date;
        $creditNote->sub_total = round($request->sub_total, 2);
        $creditNote->discount = round($request->discount_value, 2);
        $creditNote->discount_type = $request->discount_type;
        $creditNote->total = round($request->total, 2);
        $creditNote->adjustment_amount = round($request->adjustment_amount, 2);
        $creditNote->currency_id = $request->currency_id;
        $creditNote->note = str_replace('<p><br></p>', '', trim($request->note));
        $creditNote->save();

        if ($invoice) {

            $invoice->credit_note = 1;

            if ($invoice->status != 'paid') {
                $amount = round($invoice->total, 2);

                if (round($request->total, 2) > round($invoice->total - $invoice->getPaidAmount(), 2)) {
                    // create payment for invoice total
                    if ($invoice->status == 'partial') {
                        $amount = round($invoice->total - $invoice->getPaidAmount(), 2);
                    }

                    $invoice->status = 'paid';
                }
                else {
                    $amount = round($request->total, 2);
                    $invoice->status = 'partial';
                    $creditNote->status = 'closed';

                    if (round($request->total, 2) == round($invoice->total - $invoice->getPaidAmount(), 2)) {
                        if ($invoice->status == 'partial') {
                            $amount = round($invoice->total - $invoice->getPaidAmount(), 2);
                        }

                        $invoice->status = 'paid';
                    }
                }
            }

            $invoice->save();
        }

        DB::commit();

        foreach ($items as $key => $item) :
            if (!is_null($item)) {
                $creditNoteItem = CreditNoteItem::create([
                    'credit_note_id' => $creditNote->id,
                    'item_name' => $item,
                    'type' => 'item',
                    'hsn_sac_code' => (isset($hsn_sac_code[$key]) && !is_null($hsn_sac_code[$key])) ? $hsn_sac_code[$key] : null,
                    'item_summary' => $itemSummary[$key],
                    'quantity' => $quantity[$key],
                    'unit_price' => round($cost_per_item[$key], 2),
                    'amount' => round($amountArray[$key], 2),
                    'taxes' => ($tax ? (array_key_exists($key, $tax) ? json_encode($tax[$key]) : null) : null)
                ]);
            }

            /* Invoice file save here */
            if(isset($creditNoteItem) && isset($invoice_item_image_url[$key])){
                CreditNoteItemImage::create(
                    [
                        'credit_note_item_id' => $creditNoteItem->id,
                        'external_link' => isset($invoice_item_image_url[$key]) ? $invoice_item_image_url[$key] : ''
                    ]
                );
            }

        endforeach;

        // Log search
        $this->logSearchEntry($creditNote->id, $creditNote->cn_number, 'creditnotes.show', 'creditNote');

        return Reply::redirect(route('creditnotes.index'), __('messages.creditNoteCreated'));
    }

    public function download($id)
    {
        $this->viewPermission = user()->permission('view_invoices');
        $this->creditNote = CreditNotes::findOrFail($id);

        abort_403(!(
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->creditNote->invoice->added_by == user()->id)
            || ($this->viewPermission == 'owned' && $this->creditNote->client_id == user()->id)
        ));

        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        if ($this->creditNote->file != null) {
            return response()->download(storage_path('app/public/credit-note-files') . '/' . $this->creditNote->file);
        }

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];

        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->creditNote = CreditNotes::findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        $this->invoiceNumber = 0;

        if (Invoice::where('id', '=', $this->creditNote->invoice_id)->exists()) {
            $this->invoiceNumber = Invoice::select('invoice_number')->where('id', $this->creditNote->invoice_id)->first();
        }

        // Download file uploaded
        if ($this->creditNote->file != null) {
            return response()->download(storage_path('app/public/credit-note-files') . '/' . $this->creditNote->file);
        }

        $this->discount = 0;

        if ($this->creditNote->discount > 0) {
            if ($this->creditNote->discount_type == 'percent') {
                $this->discount = (($this->creditNote->discount / 100) * $this->creditNote->sub_total);
            }
            else {
                $this->discount = $this->creditNote->discount;
            }
        }

        $taxList = array();

        $items = CreditNoteItem::whereNotNull('taxes')
            ->where('credit_note_id', $id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = CreditNoteItem::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    if ($this->creditNote->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->creditNote->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    } else{
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    if ($this->creditNote->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->creditNote->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                    } else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $this->creditNoteSetting = invoice_setting();
        $this->invoiceSetting = invoice_setting();

        $pdf = app('dompdf.wrapper');
        $pdf->getDomPDF()->set_option('enable_php', true);
        $pdf->loadView('credit-notes.pdf.' . $this->creditNoteSetting->template, $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = $this->creditNote->cn_number;
        // Return $pdf->stream();
        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function edit($id)
    {
        $this->creditNote = CreditNotes::with('invoice')->findOrFail($id);

        $this->editPermission = user()->permission('edit_invoices');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->creditNote->invoice->added_by == user()->id)));

        $this->projects = Project::allProjects();
        $this->currencies = Currency::all();
        $this->taxes = Tax::all();
        $this->creditNoteSetting = invoice_setting();

        return view('credit-notes.edit', $this->data);

    }

    public function update(UpdateCreditNote $request, $id)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

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

        $creditNote = CreditNotes::findOrFail($id);
        $creditNote->issue_date = $request->issue_date;
        $creditNote->sub_total = round($request->sub_total, 2);
        $creditNote->discount = round($request->discount_value, 2);
        $creditNote->discount_type = $request->discount_type;
        $creditNote->total = round($request->total, 2);
        $creditNote->currency_id = $request->currency_id;
        $creditNote->adjustment_amount = round($request->adjustment_amount, 2);
        $creditNote->note = str_replace('<p><br></p>', '', trim($request->note));
        $creditNote->save();

        return Reply::redirect(route('creditnotes.index'), __('messages.updateSuccess'));
    }

    public function show($id)
    {
        $this->viewPermission = user()->permission('view_invoices');
        $this->creditNote = CreditNotes::with('invoice')->findOrFail($id);

        abort_403(!((
            $this->viewPermission == 'all'
            || ($this->viewPermission == 'added' && $this->creditNote->invoice->added_by == user()->id)
            || ($this->viewPermission == 'owned' && $this->creditNote->client_id == user()->id))
            || ($this->viewPermission == 'both' && ($this->creditNote->client_id == user()->id || $this->creditNote->invoice->added_by == user()->id))
        ));

        $this->paidAmount = $this->creditNote->getPaidAmount();
        $this->pageTitle = $this->creditNote->cn_number;
        $this->discount = 0;

        if ($this->creditNote->discount > 0) {
            if ($this->creditNote->discount_type == 'percent') {
                $this->discount = (($this->creditNote->discount / 100) * $this->creditNote->sub_total);
            }
            else {
                $this->discount = $this->creditNote->discount;
            }
        }


        $this->invoiceExist = false;

        if (Invoice::where('id', '=', $this->creditNote->invoice_id)->exists()) {
            $this->invoiceExist = true;
        }

        $taxList = array();

        $items = CreditNoteItem::whereNotNull('taxes')
            ->where('credit_note_id', $this->creditNote->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = CreditNoteItem::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    if ($this->creditNote->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->creditNote->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    } else{
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    if ($this->creditNote->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->creditNote->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                    } else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }

            }
        }

        $this->taxes = $taxList;

        $this->settings = $this->global;
        $this->creditNoteSetting = invoice_setting();
        return view('credit-notes.show', $this->data);

    }

    public function destroy($id)
    {
        $this->deletePermission = user()->permission('delete_invoices');

        $this->creditNote = CreditNotes::with('invoice')->findOrFail($id);
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $this->creditNote->invoice->added_by == user()->id)));
        $firstCreditNote = CreditNotes::orderBy('id', 'desc')->first();

        if ($firstCreditNote->id == $id) {
            $creditNote = CreditNotes::with('payment')->find($id);

            if (Invoice::where('id', '=', $creditNote->invoice_id)->exists()) {
                Invoice::withoutEvents(function () use ($creditNote) {
                    Invoice::where('id', '=', $creditNote->invoice_id)->update(['credit_note' => 0]);
                });
            }

            $payments = $creditNote->payment()->get();

            /* Delete all payments */
            Payment::where('credit_notes_id', $id)->delete();

            foreach ($payments as $payment) {
                $payment->invoice->status = 'partial';

                if ($payment->invoice->amountPaid() == $payment->invoice->total) {
                    $payment->invoice->status = 'paid';
                }

                if ($payment->invoice->amountPaid() == 0) {
                    $payment->invoice->status = 'unpaid';
                }

                $payment->invoice->saveQuietly();
            }

            CreditNotes::destroy($id);
            return Reply::success(__('messages.creditNoteDeleted'));
        }
        else {
            return Reply::error(__('messages.creditNoteCanNotDeleted'));
        }

    }

    /**
     * @param mixed $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|mixed
     */
    public function applyToInvoice($id)
    {
        $this->pageTitle = __('app.applyToInvoice');
        $this->creditNote = CreditNotes::findOrFail($id);
        $this->nonPaidInvoices = Invoice::pending()->where('credit_note', 0)
            ->where('currency_id', $this->creditNote->currency_id)
            ->where('client_id', $this->creditNote->client_id);
        $this->nonPaidInvoices = $this->nonPaidInvoices->with('payment', 'currency')->get();

        if (request()->ajax()) {
            $html = view('credit-notes.ajax.apply_to_invoices', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'credit-notes.ajax.apply_to_invoices';
        return view('credit-notes.create', $this->data);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array|string[]
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function applyInvoiceCredit(Request $request, $id)
    {
        $totalCreditAmount = 0.00;

        foreach ($request->invoices as $invoice) {
            $totalCreditAmount += $invoice['value'];
        }

        if ($totalCreditAmount == 0) {
            return Reply::error(__('messages.pleaseEnterCreditAmount'));
        }

        $creditNote = CreditNotes::findOrFail($id);
        $creditTotalAmount = 0.00;

        if ((float)$request->remainingAmount <= 0) {
            $creditNote->status = 'closed';
        }

        foreach ($request->invoices as $invoice) {
            if ($invoice['value'] !== '0') {
                $creditTotalAmount += (float)$invoice['value'];

                $reqInvoice = Invoice::findOrFail($invoice['invoiceId']);

                $reqInvoice->status = 'paid';

                if ($reqInvoice->total > $reqInvoice->amountPaid()) {
                    $reqInvoice->status = 'partial';
                }

                $dueAmount = $reqInvoice->amountDue();
                $reqInvoice->due_amount = $dueAmount;
                $reqInvoice->save();

                $this->makePayment($id, $invoice['invoiceId'], (float)$invoice['value']);
            }
        }

        $creditNote->save();

        return Reply::redirect(route('creditnotes.show', $creditNote->id), __('messages.creditNoteAppliedSuccessfully'));
    }

    public function makePayment($creditNoteId, $invoiceId, $amount)
    {
        $creditNote = CreditNotes::find($creditNoteId);

        $payment = new Payment();
        $payment->invoice_id = $invoiceId;
        $payment->credit_notes_id = $creditNoteId;
        $payment->amount = $amount;
        $payment->gateway = 'Credit Note';
        $payment->currency_id = $creditNote->currency_id;
        $payment->customer_id = $creditNote->client_id;
        $payment->status = 'complete';
        $payment->paid_on = now();
        $payment->save();
    }

    public function creditedInvoices(Request $request, $id)
    {
        $this->pageTitle = __('app.creditedInvoices');
        $this->creditNote = CreditNotes::with('payment')->findOrFail($id);
        $this->payments = Payment::with('invoice')->where('credit_notes_id', $id)->get();

        if (request()->ajax()) {
            $html = view('credit-notes.ajax.credited_invoices', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'credit-notes.ajax.credited_invoices';
        return view('credit-notes.create', $this->data);
    }

    public function deleteCreditedInvoice(Request $request, $id)
    {
        $this->creditNote = CreditNotes::findOrFail($request->credit_id);

        // Delete from payment
        $payment = Payment::with('invoice')->find($id);

        $invoice = Invoice::find($payment->invoice->id);

        $payment->delete();

        // Change invoice status
        $invoice->status = 'partial';

        if ($invoice->amountPaid() == $invoice->total) {
            $invoice->status = 'paid';
        }

        if ($invoice->amountPaid() == 0) {
            $invoice->status = 'unpaid';
        }

        $invoice->due_amount += $payment->amount;

        $invoice->save();

        // change credit status
        if ($this->creditNote->status == 'closed') {
            $this->creditNote->status = 'open';
            $this->creditNote->save();
        }

        $this->payments = Payment::with('invoice')->where('credit_notes_id', $request->credit_id)->get();

        if ($this->payments->count() > 0) {
            $view = view('credit-notes.ajax.credited_invoices', $this->data)->render();

            return Reply::successWithData(__('messages.creditedInvoiceDeletedSuccessfully'), ['view' => $view, 'remainingAmount' => number_format((float)$this->creditNote->creditAmountRemaining(), 2, '.', '')]);
        }

        return Reply::redirect(route('creditnotes.show', [$this->creditNote->id]), __('messages.creditedInvoiceDeletedSuccessfully'));
    }

    public function fileUpload()
    {
        $this->creditNoteId = request('credit_note');
        return view('credit-notes.file_upload', $this->data);
    }

    public function storeFile(creditNoteFileStore $request)
    {
        $creditNoteId = $request->credit_note_id;
        $file = $request->file('file');

        $newName = $file->hashName(); // setting hashName name
        // Getting invoice data
        $creditNote = CreditNotes::find($creditNoteId);

        if ($creditNote != null) {

            if ($creditNote->file != null) {
                unlink(storage_path('app/public/credit-note-files') . '/' . $creditNote->file);
            }

            $file->move(storage_path('app/public/credit-note-files'), $newName);

            $creditNote->file = $newName;
            $creditNote->file_original_name = $file->getClientOriginalName(); // Getting uploading file name;

            $creditNote->save();

            return Reply::redirect(route('creditnotes.index'));
        }

        return Reply::error(__('messages.fileUploadIssue'));
    }

    public function destroyFile(Request $request)
    {
        $creditNoteId = $request->credit_note_id;

        $creditNote = CreditNotes::find($creditNoteId);

        if ($creditNote != null) {

            if ($creditNote->file != null) {
                unlink(storage_path('app/public/credit-note-files') . '/' . $creditNote->file);
            }

            $creditNote->file = null;
            $creditNote->file_original_name = null;

            $creditNote->save();
        }

        return Reply::success(__('messages.fileDeleted'));
    }

    public function convertInvoice($id)
    {
        $this->invoiceId = $id;
        $this->creditNote = Invoice::with(['items', 'project', 'client'])->findOrFail($id);
        $this->lastCreditNote = CreditNotes::count() + 1;
        $this->creditNoteSetting = invoice_setting();
        $this->projects = Project::allProjects();
        $this->currencies = Currency::all();
        $this->taxes = Tax::all();
        $this->products = Product::select('id', 'name as title', 'name as text')->get();
        $this->invoiceSetting = invoice_setting();

        $this->zero = '';

        if (strlen($this->lastCreditNote) < $this->creditNoteSetting->credit_note_digit) {
            $condition = $this->creditNoteSetting->credit_note_digit - strlen($this->lastCreditNote);

            for ($i = 0; $i < $condition; $i++) {
                $this->zero = '0' . $this->zero;
            }
        }

        /** @phpstan-ignore-next-line */
        $items = $this->creditNote->items->filter(function ($value, $key) {
            return $value->type == 'item';
        });

        /** @phpstan-ignore-next-line */
        $tax = $this->creditNote->items->filter(function ($value, $key) {
            return $value->type == 'tax';
        });

        $this->totalTax = $tax->sum('amount');
        $this->discount = $this->creditNote->discount;
        $this->discountType = $this->creditNote->discount_type;

        if ($this->discountType == 'percent') {
            $this->totalDiscount = $items->sum('amount') * $this->discount / 100;
        }

        if ($this->discountType == 'fixed') {
            $this->totalDiscount = $this->discount;
        }

        return view('credit-notes.convert_invoice', $this->data);
    }

}
