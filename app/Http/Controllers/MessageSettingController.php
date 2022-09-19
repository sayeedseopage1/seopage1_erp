<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\MessageSetting;
use Illuminate\Http\Request;

class MessageSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.messageSettings';
        $this->activeSettingMenu = 'message_settings';

        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_message_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {
        $this->messageSettings = message_setting();
        return view('message-settings.index', $this->data);
    }

    public function update(Request $request, $id)
    {

        $setting = MessageSetting::findOrFail($id);

        if ($request->allow_client_admin) {
            $setting->allow_client_admin = 'yes';
        }
        else {
            $setting->allow_client_admin = 'no';
        }

        if ($request->allow_client_employee) {
            $setting->allow_client_employee = 'yes';
        }
        else {
            $setting->allow_client_employee = 'no';
        }

        $setting->restrict_client = $request->restrict_client;
        $setting->save();

        session()->forget('message_setting');
        return Reply::success(__('messages.settingsUpdated'));
    }

}
