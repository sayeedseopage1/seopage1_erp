<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\GoogleCalenderSetting\StoreGoogleCalender;
use App\Models\GoogleCalendarModule;
use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;

class GoogleCalendarSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = __('app.menu.googleCalendarSetting');
        $this->activeSettingMenu = 'google_calendar_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_google_calendar_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {
        $this->setting = Setting::first();
        $this->module = GoogleCalendarModule::first();

        return view('google-calendar-settings.index', $this->data);
    }

    public function store(StoreGoogleCalender $request)
    {
        // Save google calendar credentals
        $google_calendar_setting = Setting::first();
        $google_calendar_setting->google_calendar_status    = isset($request->status) ? $request->status : 'inactive';
        $google_calendar_setting->google_client_id          = $request->google_client_id;
        $google_calendar_setting->google_client_secret      = $request->google_client_secret;
        $google_calendar_setting->save();

        // Save google calendar notification settings
        $module = GoogleCalendarModule::first();
        $module->lead_status = isset($request->lead_status) ? $request->lead_status : 0;
        $module->leave_status = isset($request->leave_status) ? $request->leave_status : 0;
        $module->invoice_status = isset($request->invoice_status) ? $request->invoice_status : 0;
        $module->contract_status = isset($request->contract_status) ? $request->contract_status : 0;
        $module->task_status = isset($request->task_status) ? $request->task_status : 0;
        $module->event_status = isset($request->event_status) ? $request->event_status : 0;
        $module->holiday_status = isset($request->holiday_status) ? $request->holiday_status : 0;
        $module->save();

        session()->forget('global_setting');

        if ($request->cache) {
            Artisan::call('optimize');
            Artisan::call('route:clear');
        }
        else {
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');
            Artisan::call('cache:clear');
        }

        return Reply::success(__('messages.updatedSuccessfully'));
    }

}
