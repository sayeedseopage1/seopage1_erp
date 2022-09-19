<?php

namespace App\Http\Controllers;

use App\DataTables\ShiftChangeRequestDataTable;
use App\Helper\Reply;
use App\Http\Requests\EmployeeShiftChange\UpdateRequest;
use App\Models\EmployeeShift;
use App\Models\EmployeeShiftChangeRequest;
use App\Models\EmployeeShiftSchedule;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeShiftChangeRequestController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.shiftRoster';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('attendance', $this->user->modules));
            return $next($request);
        });
    }

    public function index(ShiftChangeRequestDataTable $dataTable)
    {
        if (!request()->ajax()) {
            $this->employees = User::allEmployees(null, true, 'all');
            $this->employeeShifts = EmployeeShift::all();
        }
        
        return $dataTable->render('shift-change.index', $this->data);
    }

    public function edit(Request $request, $id)
    {
        $this->shift = EmployeeShiftSchedule::with('requestChange', 'requestChange.shift')->findOrFail($id);
        $this->employeeShifts = EmployeeShift::all();
        return view('shift-rosters.ajax.request-change', $this->data);
    }

    public function update(UpdateRequest $request, $id)
    {
        $requestChange = EmployeeShiftChangeRequest::firstOrNew([
            'shift_schedule_id' => $id,
            'status' => 'waiting'
        ]);

        $requestChange->employee_shift_id = $request->employee_shift_id;
        $requestChange->reason = $request->reason;
        $requestChange->save();

        return Reply::success(__('messages.requestSubmitSuccess'));
    }

    public function destroy($id)
    {
        EmployeeShiftChangeRequest::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function approveRequest($id)
    {
        $changeRequest = EmployeeShiftChangeRequest::findOrFail($id);
        $changeRequest->status = 'accepted';
        $changeRequest->save();
        return Reply::dataOnly(['status' => 'success']);
    }

    public function declineRequest($id)
    {
        $changeRequest = EmployeeShiftChangeRequest::findOrFail($id);
        $changeRequest->status = 'rejected';
        $changeRequest->save();
        return Reply::dataOnly(['status' => 'success']);
    }

    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'change-status':
            $this->changeBulkStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function changeBulkStatus($request)
    {
        $shiftRequests = EmployeeShiftChangeRequest::whereIn('id', explode(',', $request->row_ids))->get();

        foreach ($shiftRequests as $key => $changeRequest) {
            $changeRequest->status = $request->status;
            $changeRequest->save();
        }
    }

}
