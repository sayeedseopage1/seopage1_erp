<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\LeaveType\StoreLeaveType;
use App\Models\BaseModel;
use App\Models\LeaveType;
use Illuminate\Http\Request;

class LeaveTypeController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projectSettings';
        $this->activeSettingMenu = 'project_settings';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('leave-settings.create-leave-setting-type-modal');
    }

    /**
     * @param StoreLeaveType $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreLeaveType $request)
    {
        $leaveType = new LeaveType();
        $leaveType->type_name = $request->type_name;
        $leaveType->color = $request->color;
        $leaveType->paid = $request->paid;
        $leaveType->no_of_leaves = $request->leave_number;
        $leaveType->monthly_limit = $request->monthly_limit;
        $leaveType->save();

        $leaveTypes = LeaveType::get();

        $options = BaseModel::options($leaveTypes, $leaveType, 'type_name');

        return Reply::successWithData(__('messages.leaveTypeAdded'), ['data' => $options, 'page_reload' => $request->page_reload]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->leaveType = LeaveType::find($id);
        return view('leave-settings.edit-leave-setting-type-modal', $this->data);
    }

    public function update(StoreLeaveType $request, $id)
    {
        if ($request->leaves < 0) {
            return Reply::error('messages.leaveTypeValueError');
        }

        $leaveType = LeaveType::findOrFail($id);
        $leaveType->type_name = $request->type_name;
        $leaveType->color = $request->color;
        $leaveType->paid = $request->paid;
        $leaveType->no_of_leaves = $request->leave_number;
        $leaveType->monthly_limit = $request->monthly_limit;
        $leaveType->save();

        return Reply::success(__('messages.leaveTypeAdded'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        LeaveType::destroy($id);
        return Reply::success(__('messages.leaveTypeDeleted'));
    }

}
