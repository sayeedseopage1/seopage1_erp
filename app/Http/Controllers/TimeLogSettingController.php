<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\CommonRequest;
use App\Models\LogTimeFor;

class TimeLogSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.timeLogSettings';
        $this->activeSettingMenu = 'timelog_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_time_log_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        $this->data['logTime'] = LogTimeFor::first();
        return view('log-time-settings.index', $this->data);
    }

    /**
     * @param CommonRequest $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(CommonRequest $request)
    {
        $logTime = LogTimeFor::first();

        if ($request->has('log_time_for')) {
            $logTime->log_time_for = $request->log_time_for;
        }

        if ($request->has('auto_timer_stop')) {
            $logTime->auto_timer_stop = $request->auto_timer_stop;
        }

        if ($request->has('approval_required')) {
            $logTime->approval_required = $request->approval_required;
        }

        $logTime->save();
        session()->forget('time_log_setting');

        return Reply::success(__('messages.logTimeUpdateSuccess'));

    }

}
