<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\AttendanceSetting\UpdateAttendanceSetting;
use App\Models\AttendanceSetting;
use App\Models\EmployeeShift;
use Carbon\Carbon;

class AttendanceSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.attendanceSettings';
        $this->activeSettingMenu = 'attendance_settings';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_attendance_setting') !== 'all');
            return $next($request);
        });
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        $this->ipAddresses = [];
        $this->attendanceSetting = AttendanceSetting::first();

        if (json_decode($this->attendanceSetting->ip_address)) {
            $this->ipAddresses = json_decode($this->attendanceSetting->ip_address, true);
        }

        $tab = request('tab');

        switch ($tab) {
        case 'shift':
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
            $this->view = 'attendance-settings.ajax.shift';
            break;
        default:
            $this->view = 'attendance-settings.ajax.attendance';
                break;
        }

        ($tab == '') ? $this->activeTab = 'attendance' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('attendance-settings.index', $this->data);
    }

    /**
     * @param UpdateAttendanceSetting $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateAttendanceSetting $request, $id)
    {
        $setting = AttendanceSetting::findOrFail($id);
        ($request->employee_clock_in_out == 'yes') ? $setting->employee_clock_in_out = 'yes' : $setting->employee_clock_in_out = 'no';
        ($request->radius_check == 'yes') ? $setting->radius_check = 'yes' : $setting->radius_check = 'no';
        ($request->ip_check == 'yes') ? $setting->ip_check = 'yes' : $setting->ip_check = 'no';
        $setting->radius = $request->radius;
        $setting->ip_address = json_encode($request->ip);
        $setting->alert_after = $request->alert_after;
        $setting->week_start_from = $request->week_start_from;
        $setting->alert_after_status = ($request->alert_after_status == 'on') ? 1 : 0;
        $setting->save_current_location = ($request->save_current_location) ? 1 : 0;
        $setting->allow_shift_change = ($request->allow_shift_change) ? 1 : 0;
        $setting->auto_clock_in = ($request->auto_clock_in) ? 'yes' : 'no';
        ($request->show_clock_in_button == 'yes') ? $setting->show_clock_in_button = 'yes' : $setting->show_clock_in_button = 'no';
        $setting->save();

        session()->forget('attendance_setting');

        return Reply::success(__('messages.settingsUpdated'));
    }

}
