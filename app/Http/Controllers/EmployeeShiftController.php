<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\EmployeeShift\StoreEmployeeShift;
use App\Models\AttendanceSetting;
use App\Models\EmployeeShift;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmployeeShiftController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.ticketTypes';
        $this->activeSettingMenu = 'ticket_types';
    }

    public function create()
    {
        return view('employee-shifts.create', $this->data);
    }

    public function store(StoreEmployeeShift $request)
    {
        $setting = new EmployeeShift();
        $setting->shift_name = $request->shift_name;
        $setting->shift_short_code = $request->shift_short_code;
        $setting->color = $request->color;
        $setting->office_start_time = Carbon::createFromFormat($this->global->time_format, $request->office_start_time);
        $setting->office_end_time = Carbon::createFromFormat($this->global->time_format, $request->office_end_time);
        $setting->halfday_mark_time = Carbon::createFromFormat($this->global->time_format, $request->halfday_mark_time);
        $setting->late_mark_duration = $request->late_mark_duration;
        $setting->clockin_in_day = $request->clockin_in_day;
        $setting->office_open_days = json_encode($request->office_open_days);
        $setting->save();
        session()->forget('attendance_setting');
        return Reply::success(__('messages.employeeShiftAdded'));
    }

    public function edit($id)
    {
        $this->employeeShift = EmployeeShift::findOrFail($id);
        $this->openDays = json_decode($this->employeeShift->office_open_days);
        return view('employee-shifts.edit', $this->data);
    }

    public function destroy($id)
    {
        EmployeeShift::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function setDefaultShift()
    {
        AttendanceSetting::where('id', attendance_setting()->id)->update([
            'default_employee_shift' => request()->shiftID
        ]);

        session()->forget('attendance_setting');
        return Reply::success(__('messages.updateSuccess'));
    }

    public function update(StoreEmployeeShift $request, $id)
    {
        $setting = EmployeeShift::findOrFail($id);
        $setting->shift_name = $request->shift_name;
        $setting->shift_short_code = $request->shift_short_code;
        $setting->color = $request->color;
        $setting->office_start_time = Carbon::createFromFormat($this->global->time_format, $request->office_start_time);
        $setting->office_end_time = Carbon::createFromFormat($this->global->time_format, $request->office_end_time);
        $setting->halfday_mark_time = Carbon::createFromFormat($this->global->time_format, $request->halfday_mark_time);
        $setting->late_mark_duration = $request->late_mark_duration;
        $setting->clockin_in_day = $request->clockin_in_day;
        $setting->office_open_days = json_encode($request->office_open_days);
        $setting->save();
        session()->forget('attendance_setting');
        return Reply::success(__('messages.updateSuccess'));
    }

    public function index()
    {
        $this->weekMap = [
            0 => __('app.sunday'),
            1 => __('app.monday'),
            2 => __('app.tuesday'),
            3 => __('app.wednesday'),
            4 => __('app.thursday'),
            5 => __('app.friday'),
            6 => __('app.saturday'),
        ];
        $this->employeeShifts = EmployeeShift::all();
        return view('employee-shifts.index', $this->data);
    }

}
