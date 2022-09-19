<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Tax\StoreTax;
use App\Http\Requests\Tax\UpdateTax;
use App\Models\Tax;

class TaxSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.taxSettings';
        $this->activeSettingMenu = 'tax_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_tax') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {
        $this->taxes = Tax::get();
        return view('tax-settings.index', $this->data);
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        abort_403(user()->permission('manage_tax') !== 'all');

        // via is extra parameter sent from tax-settings to know if this request comes from tax-settings or product-create-edit page
        if(request()->via && request()->via == 'tax-setting'){
            return view('tax-settings.create', $this->data);
        }

        $this->taxes = Tax::get();
        return view('tax.create', $this->data);

    }

    public function edit($id)
    {
        abort_403(user()->permission('manage_tax') !== 'all');

        $this->tax = Tax::find($id);
        return view('tax-settings.edit', $this->data);
    }

    /**
     * @param StoreTax $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTax $request)
    {
        abort_403(user()->permission('manage_tax') !== 'all');

        $tax = new Tax();
        $tax->tax_name = $request->tax_name;
        $tax->rate_percent = $request->rate_percent;
        $tax->save();

        $taxes = $this->taxDropdown();

        return Reply::successWithData(__('messages.taxAdded'), ['data' => $taxes]);

    }

    /**
     * @param UpdateTax $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateTax $request, $id)
    {
        abort_403(user()->permission('manage_tax') !== 'all');

        $tax = Tax::find($id);

        // via is extra parameter sent from tax-settings to know if this request comes from tax-settings or product-create-edit page
        if(request()->via && request()->via == 'tax-setting'){
            $tax->tax_name = $request->tax_name;
            $tax->rate_percent = $request->rate_percent;
        }
        else {
            $request->type == 'tax_name' ? ($tax->tax_name = $request->value) : ($tax->rate_percent = $request->value);
        }

        $tax->save();
        $taxes = $this->taxDropdown();
        return Reply::successWithData(__('messages.updatedSuccessfully'), ['data' => $taxes]);

    }

    public function taxDropdown()
    {
        abort_403(user()->permission('manage_tax') !== 'all');
        $taxes = Tax::get();
        $taxOptions = '<option value="">--</option>';

        foreach ($taxes as $item) {
            $selected = '';
            $taxOptions .= '<option' . $selected . ' value="' . $item->id . '">' . $item->tax_name . ' : ' . $item->rate_percent . '</option>';
        }

        return $taxOptions;
    }

    public function destroy($id)
    {
        abort_403(user()->permission('manage_tax') !== 'all');
        Tax::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

}
