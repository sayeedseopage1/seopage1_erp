<?php

namespace App\Http\Controllers;

use App\DataTables\ProposalDataTable;
use App\Events\NewProposalEvent;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\Proposal\StoreRequest;
use App\Models\Currency;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Proposal;
use App\Models\ProposalItem;
use App\Models\ProposalItemImage;
use App\Models\ProposalTemplate;
use App\Models\ProposalTemplateItem;
use App\Models\ProposalTemplateItemImage;
use App\Models\Tax;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;

class ProposalController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.proposal';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->user->modules));
            return $next($request);
        });
    }

    public function index(ProposalDataTable $dataTable)
    {
        abort_403($this->sidebarUserPermissions['view_lead_proposals'] == 5);

        if (!request()->ajax()) {
            $this->leads = Lead::allLeads();
        }

        return $dataTable->render('proposals.index', $this->data);
    }

    public function create()
    {
        $this->pageTitle = __('modules.proposal.createProposal');

        $this->addPermission = user()->permission('add_lead_proposals');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->taxes = Tax::all();

        if (request('lead_id') != '') {
            $this->lead = Lead::findOrFail(request('lead_id'));

        } else {
            $this->leads = Lead::allLeads();
        }

        $this->template = ProposalTemplate::all();
        $this->products = Product::all();
        $this->currencies = Currency::all();
        $this->invoiceSetting = invoice_setting();

        $this->template = ProposalTemplate::all();
        $this->proposalTemplate = request('template') ? ProposalTemplate::findOrFail(request('template')) : null;
        $this->proposalTemplateItem = request('template') ? ProposalTemplateItem::with('proposalTemplateItemImage')->where('proposal_template_id', request('template'))->get() : null;

        if (request()->ajax()) {
            $html = view('proposals.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'proposals.ajax.create';
        return view('proposals.create', $this->data);
    }

    public function store(StoreRequest $request)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

        if (trim($items[0]) == '' || trim($items[0]) == '' || trim($cost_per_item[0]) == '') {
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

        foreach ($items as $itm) {
            if (is_null($itm)) {
                return Reply::error(__('messages.itemBlank'));
            }
        }

        $proposal = new Proposal();
        $proposal->lead_id = $request->lead_id;
        $proposal->valid_till = Carbon::createFromFormat($this->global->date_format, $request->valid_till)->format('Y-m-d');
        $proposal->sub_total = $request->sub_total;
        $proposal->total = $request->total;
        $proposal->currency_id = $request->currency_id;
        $proposal->note = str_replace('<p><br></p>', '', trim($request->note));
        $proposal->discount = round($request->discount_value, 2);
        $proposal->discount_type = $request->discount_type;
        $proposal->status = 'waiting';
        $proposal->signature_approval = ($request->require_signature) ? 1 : 0;
        $proposal->description = str_replace('<p><br></p>', '', trim($request->description));
        $proposal->save();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('proposals.index');
        }

        $this->logSearchEntry($proposal->id, 'Proposal #' . $proposal->id, 'proposals.show', 'proposal');

        return Reply::redirect($redirectUrl, __('messages.proposalCreated'));
    }

    public function show($id)
    {
        $this->viewLeadProposalsPermission = user()->permission('view_lead_proposals');

        $this->invoice = Proposal::with('items', 'lead', 'items.proposalItemImage')->findOrFail($id);
        abort_403(!($this->viewLeadProposalsPermission == 'all' || ($this->viewLeadProposalsPermission == 'added' && $this->invoice->added_by == user()->id)));

        $this->pageTitle = __('modules.lead.proposal') . '#' . $this->invoice->id;

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

        $items = ProposalItem::whereNotNull('taxes')
            ->where('proposal_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalItem::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    } else{
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                    } else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();
        $this->invoiceSetting = invoice_setting();

        return view('proposals.show', $this->data);
    }

    public function edit($id)
    {
        $this->pageTitle = __('modules.proposal.updateProposal');
        $this->taxes = Tax::all();
        $this->currencies = Currency::all();
        $this->proposal = Proposal::with('items', 'lead')->findOrFail($id);

        $this->products = Product::all();
        $this->invoiceSetting = invoice_setting();

        if (request()->ajax()) {
            $html = view('proposals.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'proposals.ajax.edit';
        return view('proposals.create', $this->data);
    }

    public function update(StoreRequest $request, $id)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $hsn_sac_code = $request->hsn_sac_code;
        $quantity = $request->quantity;
        $amount = $request->amount;
        $itemsSummary = $request->item_summary;
        $tax = $request->taxes;

        if (trim($items[0]) == '' || trim($cost_per_item[0]) == '') {
            return Reply::error(__('messages.addItem'));
        }

        foreach ($quantity as $qty) {
            if (!is_numeric($qty)) {
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

        $proposal = Proposal::findOrFail($id);
        $proposal->lead_id = $request->lead_id;
        $proposal->valid_till = Carbon::createFromFormat($this->global->date_format, $request->valid_till)->format('Y-m-d');
        $proposal->sub_total = $request->sub_total;
        $proposal->total = $request->total;
        $proposal->currency_id = $request->currency_id;
        $proposal->status = $request->status;
        $proposal->note = str_replace('<p><br></p>', '', trim($request->note));
        $proposal->discount = round($request->discount_value, 2);
        $proposal->discount_type = $request->discount_type;
        $proposal->signature_approval = ($request->require_signature) ? 1 : 0;
        $proposal->description = str_replace('<p><br></p>', '', trim($request->description));
        $proposal->save();

        return Reply::redirect(route('proposals.show', $proposal->id), __('messages.proposalUpdated'));
    }

    public function destroy($id)
    {
        $proposal = Proposal::findOrFail($id);
        $this->deleteLeadProposalsPermission = user()->permission('delete_lead_proposals');
        abort_403(!($this->deleteLeadProposalsPermission == 'all' || ($this->deleteLeadProposalsPermission == 'added' && $proposal->added_by == user()->id)));

        Proposal::destroy($id);

        return Reply::success(__('messages.proposalDeleted'));
    }

    public function sendProposal($id)
    {
        $proposal = Proposal::findOrFail($id);
        event(new NewProposalEvent($proposal, 'new'));
        return Reply::success(__('messages.proposalSendSuccess'));
    }

    public function download($id)
    {
        $this->proposal = Proposal::findOrFail($id);
        $this->viewLeadProposalsPermission = user()->permission('view_lead_proposals');
        abort_403(!($this->viewLeadProposalsPermission == 'all' || ($this->viewLeadProposalsPermission == 'added' && $this->estimate->added_by == user()->id)));

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];
        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->proposal = Proposal::with('items', 'lead', 'currency')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        if ($this->proposal->discount > 0) {
            if ($this->proposal->discount_type == 'percent') {
                $this->discount = (($this->proposal->discount / 100) * $this->proposal->sub_total);
            }
            else {
                $this->discount = $this->proposal->discount;
            }
        }
        else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = ProposalItem::whereNotNull('taxes')
            ->where('proposal_id', $this->proposal->id)
            ->get();
        $this->invoiceSetting = invoice_setting();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        if ($this->proposal->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + (($item->amount - ($item->amount / $this->proposal->sub_total) * $this->discount) * ($this->tax->rate_percent / 100));

                        } else {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                        }
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $pdf = app('dompdf.wrapper');

        $pdf->getDomPDF()->set_option('enable_php', true);

        $pdf->loadView('proposals.pdf.' . $this->invoiceSetting->template, $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->getCanvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10);
        $filename = __('modules.lead.proposal') . '-' . $this->proposal->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

    public function deleteProposalItemImage(Request $request)
    {
            $item = ProposalItemImage::where('proposal_item_id', $request->invoice_item_id)->first();
            Files::deleteFile($item->hashname, 'proposal-files/' . $item->id . '/');
            $item->delete();

            return Reply::success(__('messages.updatedSuccessfully'));
    }

}
