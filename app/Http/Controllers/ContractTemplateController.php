<?php

namespace App\Http\Controllers;

use App;
use App\DataTables\ContractTemplatesDataTable;
use App\Helper\Reply;
use App\Http\Requests\StoreContractTemplate;
use App\Models\Contract;
use App\Models\ContractTemplate;
use App\Models\ContractType;
use App\Models\Currency;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContractTemplateController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.contractTemplate';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(ContractTemplatesDataTable $dataTable)
    {
        abort_403(user()->permission('manage_contract_template') == 'none');

        $this->contractTypes = ContractType::all();
        $this->contractCounts = Contract::count();

        return $dataTable->render('contract-template.index', $this->data);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->contractId = request('id');
        $this->contract = null;

        if ($this->contractId != '') {
            $this->contract = ContractTemplate::findOrFail($this->contractId);
        }

        $this->clients = User::allClients();
        $this->contractTypes = ContractType::all();
        $this->currencies = Currency::all();

        if (request()->ajax()) {
            $this->pageTitle = __('app.add') . ' ' . __('app.menu.contractTemplate');
            $html = view('contract-template.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'contract-template.ajax.create';
        return view('contract-template.create', $this->data);
    }

    public function store(StoreContractTemplate $request)
    {
        $contract = new ContractTemplate();
        $contract->subject = $request->subject;
        $contract->amount = $request->amount;
        $contract->currency_id = $request->currency_id;
        $contract->contract_type_id = $request->contract_type;
        $contract->description = str_replace('<p><br></p>', '', trim($request->description));
        $contract->description = $request->contract_detail;
        $contract->added_by = user()->id;

        if ($request->contract_detail) {
            $contract->contract_detail = $request->contract_detail;
        }

        $contract->save();

        return Reply::redirect(route('contract-template.index'), __('messages.contractAdded'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->contract = ContractTemplate::findOrFail($id);
        $this->manageContractTemplatePermission = user()->permission('manage_contract_template');
        abort_403(!in_array($this->manageContractTemplatePermission, ['all', 'added']));

        $this->view = 'contract-template.ajax.overview';
        $this->pageTitle = __('app.menu.contractTemplate');

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'contract-template.ajax.overview';
        return view('contract-template.create', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $this->contract = ContractTemplate::find($id);
        $this->manageContractTemplatePermission = user()->permission('manage_contract_template');
        abort_403(!in_array($this->manageContractTemplatePermission, ['all', 'added']));

        $this->contractTypes = ContractType::all();
        $this->currencies = Currency::all();

        if (request()->ajax()) {
            $this->pageTitle = __('app.update') . ' ' . __('app.menu.contractTemplate');
            $html = view('contract-template.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'contract-template.ajax.edit';
        return view('contract-template.create', $this->data);
    }

    public function update(StoreContractTemplate $request, $id)
    {
        $contract = ContractTemplate::findOrFail($id);
        $contract->subject = $request->subject;
        $contract->amount = $request->amount;
        $contract->currency_id = $request->currency_id;
        $contract->contract_type_id = $request->contract_type;
        $contract->description = str_replace('<p><br></p>', '', trim($request->description));
        $contract->description = $request->contract_detail;

        if ($request->contract_detail) {
            $contract->contract_detail = $request->contract_detail;
        }

        $contract->save();

        return Reply::redirect(route('contract-template.index'), __('messages.contractUpdated'));
    }

    public function applyQuickAction(Request $request)
    {
        if ($request->action_type == 'delete') {
            $this->deleteRecords($request);
            return Reply::success(__('messages.deleteSuccess'));
        }

        return Reply::error(__('messages.selectAction'));
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('manage_contract_template') != 'all' && user()->permission('manage_contract_template') != 'added');

        ContractTemplate::whereIn('id', explode(',', $request->row_ids))->delete();
        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contract = ContractTemplate::findOrFail($id);

        $contract->destroy($id);
        return Reply::success(__('messages.contractDeleted'));
    }

    public function download($id)
    {
        $this->contractTemplate = ContractTemplate::findOrFail($id);
        $this->contractTemplate = ContractTemplate::with('contractType', 'currency', )->findOrFail($id);
        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('contract-template.contract-template-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->get_canvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10, array(0, 0, 0));
        $filename = 'contract-' . $this->contractTemplate->id;

        return $pdf->download($filename . '.pdf');

    }

    public function downloadView($id)
    {
        $this->contract = Contract::findOrFail($id);
        $pdf = app('dompdf.wrapper');

        $this->global = $this->settings = global_setting();

        $this->invoiceSetting = invoice_setting();

        $pdf->getDomPDF()->set_option('enable_php', true);
        App::setLocale($this->invoiceSetting->locale);
        Carbon::setLocale($this->invoiceSetting->locale);
        $pdf->loadView('contracts.contract-pdf', $this->data);

        $dom_pdf = $pdf->getDomPDF();
        $canvas = $dom_pdf->get_canvas();
        $canvas->page_text(530, 820, 'Page {PAGE_NUM} of {PAGE_COUNT}', null, 10, array(0, 0, 0));
        $filename = 'contract-' . $this->contract->id;

        return [
            'pdf' => $pdf,
            'fileName' => $filename
        ];
    }

}
