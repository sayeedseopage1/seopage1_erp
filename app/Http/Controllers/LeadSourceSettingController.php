<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\LeadSetting\StoreLeadSource;
use App\Http\Requests\LeadSetting\UpdateLeadSource;
use App\Models\BaseModel;
use App\Models\LeadSource;

class LeadSourceSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('leads', $this->modules));
            return $next($request);
        });
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->addPermission = user()->permission('add_lead_sources');
        abort_403(!in_array($this->addPermission, ['all', 'added']));

        return view('lead-settings.create-source-modal');

    }

    /**
     * @param StoreLeadSource $request
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreLeadSource $request)
    {
        $this->addPermission = user()->permission('add_lead_sources');

        abort_403(!in_array($this->addPermission, ['all', 'added']));

        $source = new LeadSource();
        $source->type = $request->type;
        $source->save();

        $leadSource = LeadSource::get();

        $options = BaseModel::options($leadSource, $source, 'type');

        return Reply::successWithData(__('messages.leadStatusAddSuccess'), ['data' => $options]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $this->source = LeadSource::findOrFail($id);
        $this->editPermission = user()->permission('edit_lead_sources');
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->source->added_by == user()->id)));

        return view('lead-settings.edit-source-modal', $this->data);
    }

    /**
     * @param UpdateLeadSource $request
     * @param int $id
     * @return array|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateLeadSource $request, $id)
    {
        $this->editPermission = user()->permission('edit_lead_sources');
        $type = LeadSource::findOrFail($id);
        abort_403(!($this->editPermission == 'all' || ($this->editPermission == 'added' && $this->source->added_by == user()->id)));

        $type->type = $request->type;
        $type->save();

        return Reply::success(__('messages.leadSourceUpdateSuccess'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $type = LeadSource::findOrFail($id);
        $this->deletePermission = user()->permission('delete_lead_sources');
        abort_403(!($this->deletePermission == 'all' || ($this->deletePermission == 'added' && $type->added_by == user()->id)));

        LeadSource::destroy($id);
        return Reply::success(__('messages.leadSourceDeleteSuccess'));
    }

}
