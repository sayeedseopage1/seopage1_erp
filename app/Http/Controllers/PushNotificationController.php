<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\EmailNotificationSetting;
use App\Models\PushNotificationSetting;
use App\Models\User;
use App\Notifications\TestPush;
use Illuminate\Http\Request;

class PushNotificationController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.pushNotifications';
        $this->activeSettingMenu = 'notification_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_notification_setting') == 'all'));
            return $next($request);
        });
    }

    public function update(Request $request, $id)
    {
        $this->savePushNotificationSettings($request);

        $setting = PushNotificationSetting::findOrFail($id);
        $setting->onesignal_app_id = $request->onesignal_app_id;
        $setting->onesignal_rest_api_key = $request->onesignal_rest_api_key;
        $setting->status = ($request->has('status') ? $request->status : 'inactive');
        $setting->save();

        session()->forget('push_setting');

        return Reply::success(__('messages.settingsUpdated'));
    }

    public function sendTestNotification()
    {
        $user = User::find($this->user->id);
        // Notify User
        $user->notify(new TestPush());

        return Reply::success('Test notification sent.');
    }

    public function savePushNotificationSettings($request)
    {
        EmailNotificationSetting::where('send_push', 'yes')->update(['send_push' => 'no']);
        
        if($request->send_push) {
            EmailNotificationSetting::whereIn('id', $request->send_push)->update(['send_push' => 'yes']);
        }
    }

}
