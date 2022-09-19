<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\BaseModel;
use App\Models\ContractType;
use App\Http\Requests\Admin\ContractType\StoreRequest;
use App\Http\Requests\Admin\ContractType\UpdateRequest;

class ContractTypeController extends AccountBaseController
{

    public function create()
    {
        $this->addPermission = user()->permission('manage_contract_type');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $this->categories = ContractType::all();
        return view('contracts.types.create', $this->data);

    }

    public function store(StoreRequest $request)
    {
        $this->addPermission = user()->permission('manage_contract_type');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $contract = new ContractType();
        $contract->name = $request->name;
        $contract->save();


        $categories = ContractType::all();
        $options = BaseModel::options($categories, $contract);

        return Reply::successWithData(__('messages.contractTypeAdded'), ['data' => $options]);

    }

    public function update(UpdateRequest $request, $id)
    {
        $category = ContractType::findOrFail($id);
        $category->name = strip_tags($request->name);
        $category->save();

        $categories = ContractType::all();

        $options = BaseModel::options($categories);

        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $options]);
    }

    public function destroy($id)
    {
        abort_403(user()->permission('manage_contract_type') !== 'all');

        ContractType::destroy($id);
        $categories = ContractType::all();
        $options = BaseModel::options($categories);

        return Reply::successWithData(__('messages.deleteSuccess'), ['data' => $options]);

    }

}
