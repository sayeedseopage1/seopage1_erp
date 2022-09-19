<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Admin\Contract\RenewRequest;
use App\Models\Contract;
use App\Models\ContractRenew;
use App\Models\ContractSign;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContractRenewController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.contracts';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
            return $next($request);
        });
    }

    public function store(RenewRequest $request)
    {
        $id = $request->contract_id;
        $contract = Contract::find($id);

        $contractRenew = new ContractRenew();
        $contractRenew->amount = $request->amount;
        $contractRenew->renewed_by = $this->user->id;
        $contractRenew->contract_id = $id;
        $contractRenew->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contractRenew->end_date = Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contractRenew->save();

        if (!$request->keep_customer_signature) {
            ContractSign::where('contract_id', $contract->id)->delete();
        }

        $contract->amount = $contractRenew->amount;
        $contract->start_date = $contractRenew->start_date;
        $contract->end_date = $contractRenew->end_date;
        $contract->save();

        $this->contract = Contract::with('signature', 'client', 'client.clientDetails', 'files', 'renewHistory', 'renewHistory.renewedBy')->findOrFail($id);

        $view = view('contracts.renew.renew_history', $this->data)->render();

        return Reply::successWithData(__('messages.contractRenewSuccess'), ['view' => $view]);
    }

    public function edit($id)
    {
        $this->renew = ContractRenew::findOrFail($id);
        $this->editPermission = user()->permission('edit_contract');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->renew->added_by == user()->id)));

        return view('contracts.renew.edit', $this->data);

    }

    /**
     * @param Request $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(Request $request, $id)
    {
        $contractRenew = ContractRenew::findOrFail($id);
        $contractRenew->amount = $request->amount;
        $contractRenew->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $contractRenew->end_date = Carbon::createFromFormat($this->global->date_format, $request->end_date)->format('Y-m-d');
        $contractRenew->save();

        $this->contract = Contract::with('signature', 'client', 'client.clientDetails', 'files', 'renewHistory', 'renewHistory.renewedBy')->findOrFail($contractRenew->contract_id);

        $view = view('contracts.renew.renew_history', $this->data)->render();

        return Reply::successWithData(__('messages.contractRenewSuccess'), ['view' => $view]);
    }

    /**
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function destroy($id)
    {
        $contractRenew = $this->renew = ContractRenew::findOrFail($id);


        $this->deletePermission = user()->permission('delete_contract');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $this->renew->added_by == user()->id)));
        $findNext = ContractRenew::where('created_at', '>', $contractRenew->created_at)->first();

        if (!$findNext) {
            $findPrevious = ContractRenew::where('created_at', '<', $contractRenew->created_at)->latest()->first();
            $contract = Contract::find($contractRenew->contract_id);

            if ($findPrevious) {
                $contract->start_date = $findPrevious->start_date;
                $contract->end_date = $findPrevious->end_date;
                $contract->amount = $findPrevious->amount;
            }
            else {
                $contract->start_date = $contract->original_start_date;
                $contract->end_date = $contract->original_end_date;
                $contract->amount = $contract->original_amount;
            }

            $contract->save();

        }

        ContractRenew::destroy($id);

        $this->contract = Contract::with('renewHistory', 'renewHistory.renewedBy')->find($this->renew->contract_id);
        $view = view('contracts.renew.renew_history', $this->data)->render();

        return Reply::successWithData(__('messages.contactDeleted'), ['view' => $view]);

    }

}
