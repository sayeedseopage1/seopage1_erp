<?php

namespace App\Http\Controllers;

use App;
use App\DataTables\ProposalTemplateDataTable;
use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Requests\ProposalTemplate\StoreRequest;
use App\Models\Currency;
use App\Models\Lead;
use App\Models\Product;
use App\Models\ProposalTemplate;
use App\Models\ProposalTemplateItem;
use App\Models\ProposalTemplateItemImage;
use App\Models\Tax;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProposalTemplateController extends AccountBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'modules.proposal.proposalTemplate';

        $this->middleware(function ($request, $next) {
            abort_403(in_array('contract', $this->user->modules));
            return $next($request);
        });
    }

    public function index(ProposalTemplateDataTable $dataTable)
    {
        abort_403(user()->permission('manage_proposal_template') == 'none');

        return $dataTable->render('proposal-template.index', $this->data);
    }

    public function create()
    {
        $this->pageTitle = __('modules.proposal.createProposalTemplate');

        $this->addPermission = user()->permission('manage_proposal_template');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->taxes = Tax::all();

        $this->currencies = Currency::all();
        $this->invoiceSetting = invoice_setting();

        $this->products = Product::all();

        if (request()->ajax()) {
            $html = view('proposal-template.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'proposal-template.ajax.create';
        return view('proposals.create', $this->data);
    }

    public function store(StoreRequest $request)
    {
        $this->manageProjectTemplatePermission = user()->permission('manage_proposal_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

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

        $proposal = new ProposalTemplate();
        $proposal->name = $request->name;
        $proposal->sub_total = $request->sub_total;
        $proposal->total = $request->total;
        $proposal->currency_id = $request->currency_id;
        $proposal->discount = round($request->discount_value, 2);
        $proposal->discount_type = $request->discount_type;
        $proposal->signature_approval = ($request->require_signature) ? 1 : 0;
        $proposal->description = str_replace('<p><br></p>', '', trim($request->description));
        $proposal->added_by = user()->id;
        $proposal->save();

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('proposal-template.index');
        }

        $this->logSearchEntry($proposal->id, 'Proposal #' . $proposal->id, 'proposals.show', 'proposal');

        return Reply::redirect($redirectUrl, __('messages.proposalCreated'));
    }

    public function show($id)
    {
        $this->manageProposalTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProposalTemplatePermission, ['all', 'added']));

        $this->invoice = ProposalTemplate::with('items', 'lead', 'items.proposalTemplateItemImage')->findOrFail($id);

        $this->pageTitle = __('modules.lead.proposalTemplate') . '#' . $this->invoice->id;

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
        $items = ProposalTemplateItem::whereNotNull('taxes')
            ->where('proposal_template_id', $this->invoice->id)
            ->get();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalTemplateItem::taxbyid($tax)->first();

                if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                    /** @phpstan-ignore-next-line */
                    if ($this->invoice->calculate_tax == 'after_discount' && $this->discount > 0) {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->invoice->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                    } else{
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                    }

                }
                else {
                    /** @phpstan-ignore-next-line */
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

        return view('proposal-template.show', $this->data);
    }

    public function edit($id)
    {
        $this->manageProposalTemplatePermission = user()->permission('manage_proposal_template');
        abort_403(!in_array($this->manageProposalTemplatePermission, ['all', 'added']));

        $this->pageTitle = __('modules.proposal.updateProposalTemplate');
        $this->taxes = Tax::all();
        $this->currencies = Currency::all();
        $this->proposal = ProposalTemplate::with('items', 'lead')->findOrFail($id);
        $this->products = Product::all();
        $this->invoiceSetting = invoice_setting();

        if (request()->ajax()) {
            $html = view('proposal-template.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'proposal-template.ajax.edit';
        return view('proposal-template.create', $this->data);
    }

    public function update(StoreRequest $request, $id)
    {
        $items = $request->item_name;
        $cost_per_item = $request->cost_per_item;
        $quantity = $request->quantity;
        $amount = $request->amount;

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

        $proposalTemplate = ProposalTemplate::findOrFail($id);
        $proposalTemplate->name = $request->name;
        $proposalTemplate->sub_total = $request->sub_total;
        $proposalTemplate->total = $request->total;
        $proposalTemplate->currency_id = $request->currency_id;
        $proposalTemplate->discount = round($request->discount_value, 2);
        $proposalTemplate->discount_type = $request->discount_type;
        $proposalTemplate->signature_approval = ($request->require_signature) ? 1 : 0;
        $proposalTemplate->description = str_replace('<p><br></p>', '', trim($request->description));
        $proposalTemplate->save();

        return Reply::redirect(route('proposal-template.show', $proposalTemplate->id), __('messages.proposalUpdated'));
    }

    public function destroy($id)
    {
        ProposalTemplate::findOrFail($id)->delete();
        return Reply::success(__('messages.proposalDeleted'));
    }

    public function deleteProposalItemImage(Request $request)
    {
        $item = ProposalTemplateItemImage::where('proposal_template_item_id', $request->invoice_item_id)->first();
        Files::deleteFile($item->hashname, 'proposal-files/' . $item->id . '/');
        $item->delete();

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function download($id)
    {
        $this->proposalTemplate = ProposalTemplate::findOrFail($id);
        $this->manageProjectTemplatePermission = user()->permission('manage_proposal_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $pdfOption = $this->domPdfObjectForDownload($id);
        $pdf = $pdfOption['pdf'];
        $filename = $pdfOption['fileName'];
        return $pdf->download($filename . '.pdf');
    }

    public function domPdfObjectForDownload($id)
    {
        $this->invoiceSetting = invoice_setting();
        $this->proposalTemplate = ProposalTemplate::with('items', 'lead', 'currency')->findOrFail($id);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);

        if ($this->proposalTemplate->discount > 0) {
            if ($this->proposalTemplate->discount_type == 'percent') {
                $this->discount = (($this->proposalTemplate->discount / 100) * $this->proposalTemplate->sub_total);
            }
            else {
                $this->discount = $this->proposalTemplate->discount;
            }
        }
        else {
            $this->discount = 0;
        }

        $taxList = array();

        $items = ProposalTemplateItem::whereNotNull('taxes')
            ->where('proposal_template_id', $this->proposalTemplate->id)
            ->get();
        $this->invoiceSetting = invoice_setting();

        foreach ($items as $item) {

            foreach (json_decode($item->taxes) as $tax) {
                $this->tax = ProposalTemplateItem::taxbyid($tax)->first();

                if ($this->tax) {
                    if (!isset($taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'])) {

                        /** @phpstan-ignore-next-line */
                        if ($this->proposalTemplate->calculate_tax == 'after_discount' && $this->discount > 0) {
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = ($item->amount - ($item->amount / $this->proposalTemplate->sub_total) * $this->discount) * ($this->tax->rate_percent / 100);

                        } else{
                            $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $item->amount * ($this->tax->rate_percent / 100);
                        }

                    }
                    else {
                        $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] = $taxList[$this->tax->tax_name . ': ' . $this->tax->rate_percent . '%'] + ($item->amount * ($this->tax->rate_percent / 100));
                    }
                }
            }
        }

        $this->taxes = $taxList;

        $this->settings = global_setting();

        $pdf = app('dompdf.wrapper');

        $pdf->getDomPDF()->set_option('enable_php', true);

        $pdf->loadView('proposal-template.pdf.' . $this->invoiceSetting->template, $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->get_canvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10, array(0, 0, 0));
        $filename = __('modules.lead.proposal') . '-' . $this->proposalTemplate->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

}
