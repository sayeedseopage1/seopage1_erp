<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\PusherSetting\UpdateRequest;
use App\Models\PusherSetting;

class PusherSettingsController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.pusherSettings';
        $this->pageIcon = 'icon-settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_notification_setting') == 'all'));
            return $next($request);
        });
    }

    // phpcs:ignore
    public function update(UpdateRequest $request, $id)
    {
        $pusher = pusher_settings();
        $pusher->pusher_app_id = $request->pusher_app_id;
        $pusher->pusher_app_key = $request->pusher_app_key;
        $pusher->pusher_app_secret = $request->pusher_app_secret;
        $pusher->pusher_cluster = $request->pusher_cluster;
        $pusher->force_tls = $request->force_tls;
        $pusher->status = $request->status == 'active' ? 1 : 0;
        $pusher->taskboard = $request->taskboard ? 1 : 0;
        $pusher->messages = $request->messages ? 1 : 0;
        $pusher->save();

        session(['pusher_settings' => PusherSetting::first()]);

        return Reply::success(__('messages.updateSuccess'));
    }

}
