<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\LeaveType;
use Illuminate\Http\Request;

class LeaveSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.leaveSettings';
        $this->activeSettingMenu = 'leave_settings';

        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_leave_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {
        $this->leaveTypes = LeaveType::all();
        return view('leave-settings.index', $this->data);
    }

    public function store(Request $request)
    {
        $setting = global_setting();
        $setting->leaves_start_from = $request->leaveCountFrom;
        $setting->save();

        return Reply::success(__('messages.settingsUpdated'));
    }

}
