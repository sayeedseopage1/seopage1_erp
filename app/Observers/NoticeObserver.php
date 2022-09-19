<?php

namespace App\Observers;

use App\Events\NewNoticeEvent;
use App\Models\Notice;
use App\Models\NoticeView;
use App\Models\Notification;
use App\Models\UniversalSearch;
use App\Models\User;

class NoticeObserver
{

    public function saving(Notice $notice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $notice->last_updated_by = user()->id;
        }
    }

    public function creating(Notice $notice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $notice->added_by = user()->id;
        }
    }

    public function created(Notice $notice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $this->sendNotification($notice);
        }
    }

    public function updated(Notice $notice)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $this->sendNotification($notice, 'update');
        }
    }

    public function deleting(Notice $notice)
    {
        $universalSearches = UniversalSearch::where('searchable_id', $notice->id)->where('module_type', 'notice')->get();

        if ($universalSearches) {
            foreach ($universalSearches as $universalSearch) {
                UniversalSearch::destroy($universalSearch->id);
            }
        }

        $notifyData = ['App\Notifications\NewNotice','App\Notifications\NoticeUpdate'];

        Notification::whereIn('type', $notifyData)
            ->where('data', 'like', '{"id":'.$notice->id.',%')
            ->whereNull('read_at')
            ->delete();

    }

    public function sendNotification($notice, $action = 'create')
    {
        if ($notice->to == 'employee') {
            if (request()->team_id != '') {
                $users = User::join('employee_details', 'employee_details.user_id', '=', 'users.id')
                    ->where('employee_details.department_id', request()->team_id)
                    ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.image', 'users.mobile', 'users.country_id')
                    ->get();
            }
            else {
                $users = User::allEmployees(null, true);
            }

            foreach ($users as $userData) {
                NoticeView::updateOrCreate(array(
                    'user_id' => $userData->id,
                    'notice_id' => $notice->id
                ));
            }

            event(new NewNoticeEvent($notice, $users, $action));
        }

        if ($notice->to == 'client') {
            $users = User::allClients();

            foreach ($users as $userData) {
                NoticeView::updateOrCreate(array(
                    'user_id' => $userData->id,
                    'notice_id' => $notice->id
                ));
            }

            event(new NewNoticeEvent($notice, $users, $action));
        }

    }

}
