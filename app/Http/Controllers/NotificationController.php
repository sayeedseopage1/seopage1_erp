<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use Illuminate\Http\Request;

class NotificationController extends AccountBaseController
{

    public function showNotifications()
    {
        $this->userType = 'all';

        if (in_array('client', user_roles())) {
            $this->userType = 'client';
        }

        $view = view('notifications.user_notifications', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $view]);
    }

    public function all()
    {
        $this->pageTitle = __('app.newNotifications');
        $this->userType = 'all';

        if (in_array('client', user_roles())) {
            $this->userType = 'client';
        }

        return view('notifications.all_user_notifications', $this->data);
    }

    public function markAllRead()
    {
        $this->user->unreadNotifications->markAsRead();
        return Reply::success(__('messages.notificationRead'));
    }

    public function markRead(Request $request)
    {
        $this->user->unreadNotifications->where('id', $request->id)->markAsRead();
        return Reply::dataOnly(['status' => 'success']);
    }

}
