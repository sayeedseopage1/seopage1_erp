<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\LeadCustomForm;
use Illuminate\Http\Request;

class LeadCustomFormController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'modules.lead.leadForm';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->modules));
            return $next($request);
        });
    }

    public function index()
    {

        $manageLeadFormPermission = user()->permission('manage_lead_custom_forms');
        abort_403($manageLeadFormPermission != 'all');

        $this->leadFormFields = LeadCustomForm::get();
    
        return view('leads.lead-form.index', $this->data);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return array
     */
    public function update(Request $request, $id)
    {
        LeadCustomForm::where('id', $id)->update([
            'status' => $request->status
        ]);

        return Reply::success(__('messages.updateSuccess'));
    }

    /**
     * sort fields order
     *
     * @return \Illuminate\Http\Response
     */
    public function sortFields()
    {
        $sortedValues = request('sortedValues');

        foreach ($sortedValues as $key => $value) {
            LeadCustomForm::where('id', $value)->update(['field_order' => $key + 1]);
        }

        return Reply::dataOnly([]);
    }

}
