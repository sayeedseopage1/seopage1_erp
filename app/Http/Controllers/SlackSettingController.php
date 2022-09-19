<?php

namespace App\Http\Controllers;

use App\Helper\Files;
use App\Helper\Reply;
use App\Http\Controllers\AccountBaseController;
use App\Http\Requests\SlackWebhookRequest;
use App\Models\EmailNotificationSetting;
use App\Models\SlackSetting;
use App\Models\User;
use App\Notifications\TestSlack;

class SlackSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.slackSettings';
        $this->activeSettingMenu = 'notification_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_notification_setting') == 'all'));
            return $next($request);
        });
    }

    public function update(SlackWebhookRequest $request, $id)
    {
        $this->saveSlackNotificationSettings($request);

        $setting = SlackSetting::findOrFail($id);
        $setting->status = $request->slack_status ? 'active' : 'inactive';
        $setting->slack_webhook = $request->slack_webhook;

        if (isset($request->removeImage) && $request->removeImage == 'on') {
            if ($setting->slack_logo) {

                Files::deleteFile($setting->slack_logo, 'slack-logo');
            }

            $setting->slack_logo = null; // Remove image from database
        }
        elseif ($request->hasFile('slack_logo')) {

            Files::deleteFile($setting->slack_logo, 'slack-logo');
            $setting->slack_logo = Files::upload($request->slack_logo, 'slack-logo');
        }

        $setting->save();
        session()->forget('slack_setting');

        return Reply::success(__('messages.settingsUpdated'));
    }

    public function sendTestNotification()
    {
        $user = User::find($this->user->id);
        // Notify User
        $user->notify(new TestSlack());

        return Reply::success('Test notification sent.');
    }

    public function saveSlackNotificationSettings($request)
    {
        EmailNotificationSetting::where('send_slack', 'yes')->update(['send_slack' => 'no']);

        if($request->send_slack) {
            EmailNotificationSetting::whereIn('id', $request->send_slack)->update(['send_slack' => 'yes']);
        }
    }

}
