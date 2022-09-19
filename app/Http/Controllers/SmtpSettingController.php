<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\SmtpSetting\UpdateSmtpSetting;
use App\Models\EmailNotificationSetting;
use App\Models\SmtpSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Notifications\TestEmail;

class SmtpSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.notificationSettings';
        $this->activeSettingMenu = 'notification_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_notification_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    // phpcs:ignore
    public function update(UpdateSmtpSetting $request, $id)
    {
        // save all email notification settings
        $this->saveEmailNotificationSettings($request);

        $smtp = SmtpSetting::first();

        $data = $request->all();

        if ($request->mail_encryption == 'null') {
            $data['mail_encryption'] = null;
        }

        $smtp->update($data);
        $response = $smtp->verifySmtp();
        session(['smtp_setting' => $smtp]);
        session()->forget('email_notification_setting');

        if ($smtp->mail_driver == 'mail') {
            return Reply::success(__('messages.settingsUpdated'));
        }

        if ($response['success']) {
            return Reply::success($response['message']);
        }

        // GMAIL SMTP ERROR
        $message = __('messages.smtpError') . '<br><br> ';

        if ($smtp->mail_host == 'smtp.gmail.com') {
            $secureUrl = 'https://froiden.freshdesk.com/support/solutions/articles/43000672983';
            $message .= __('messages.smtpSecureEnabled');
            $message .= '<a  class="font-13" target="_blank" href="' . $secureUrl . '">' . $secureUrl . '</a>';
            $message .= '<hr>' . $response['message'];
            return Reply::error($message);
        }

        return Reply::error($message . '<hr>' . $response['message']);
    }

    public function saveEmailNotificationSettings($request)
    {
        EmailNotificationSetting::where('send_email', 'yes')->update(['send_email' => 'no']);

        if($request->send_email) {
            EmailNotificationSetting::whereIn('id', $request->send_email)->update(['send_email' => 'yes']);
        }
    }

    public function showTestEmailModal()
    {
        return view('notification-settings.send-test-mail-modal', $this->data);
    }

    public function sendTestEmail(Request $request)
    {
        $request->validate([
            'test_email' => 'required|email:rfc',
        ]);

        $smtp = SmtpSetting::first();
        $response = $smtp->verifySmtp();

        if ($response['success']) {
            Notification::route('mail', \request()->test_email)->notify(new TestEmail());
            return Reply::success(__('messages.testMailSentSuccessfully'));
        }

        return Reply::error($response['message']);
    }

}
