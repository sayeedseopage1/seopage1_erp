<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Pusher\Pusher;
use App\Models\User;
use App\Models\UserChat;
use App\Models\TaskHistory;
use App\Models\UserActivity;
use App\Models\ProjectTimeLog;
use App\Models\ProjectActivity;
use App\Models\UniversalSearch;
use Illuminate\Support\Facades\App;
use App\Traits\UniversalSearchTrait;
use Illuminate\Support\Facades\Route;
use App\Traits\FileSystemSettingTrait;
use Notification;
use App\Notifications\PusherNotificaiton;

class AccountBaseController extends Controller
{
    use FileSystemSettingTrait, UniversalSearchTrait;

    /**
     * UserBaseController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        if (!(app()->runningInConsole() || config('app.seeding'))) {
            $this->currentRouteName = request()->route()->getName();
        }

        $this->middleware(function ($request, $next) {
            //dd(!user()->admin_approval && request()->ajax());
            abort_403(!user()->admin_approval && request()->ajax());

            if (!user()->admin_approval && Route::currentRouteName() != 'account_unverified') {
                return redirect(route('account_unverified'));
            }

            $this->setFileSystemConfigs();

            $this->languageSettings = language_setting();
            $this->adminTheme = admin_theme();
            $this->pushSetting = push_setting();
            $this->smtpSetting = smtp_setting();
            $this->pusherSettings = pusher_settings();
            $this->invoiceSetting = invoice_setting();

            App::setLocale(user()->locale);
            Carbon::setLocale(user()->locale);
            setlocale(LC_TIME, user()->locale . '_' . mb_strtoupper($this->global->locale));

            $this->user = user();
            $this->modules = $this->user->modules;
            $this->unreadNotificationCount = count($this->user->unreadNotifications);

            if ((in_array('messages', user_modules()))) {
                $this->unreadMessagesCount = UserChat::where('to', user()->id)
                    ->where('message_seen', 'no')
                    ->count();
            }

            $this->stickyNotes = $this->user->sticky;

            $this->viewTimelogPermission = user()->permission('view_timelogs');

            $this->activeTimerCount = ProjectTimeLog::whereNull('end_time')
                ->join('users', 'users.id', 'project_time_logs.user_id')
                ->select('project_time_logs.id');

            if ($this->viewTimelogPermission != 'all' && manage_active_timelogs() != 'all') {
                $this->activeTimerCount->where('project_time_logs.user_id', $this->user->id);
            }

            $this->activeTimerCount = $this->activeTimerCount->count();

        $this->selfActiveTimer = ProjectTimeLog::with('activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')
            ->first();


            $this->worksuitePlugins = worksuite_plugins();

            if (in_array('admin', user_roles())) {

                $this->appTheme = admin_theme();

                $this->checkListTotal = 7;
                $checkListCompleted = 2; // Installation and Admin Account setup

                if (!is_null(global_setting()->logo)) {
                    $checkListCompleted++;
                }

                if (!is_null(global_setting()->favicon)) {
                    $checkListCompleted++;
                }

                if (smtp_setting()->mail_from_email != 'from@email.com') {
                    $checkListCompleted++;
                }

                if (!is_null(global_setting()->last_cron_run)) {
                    $checkListCompleted++;
                }

                if (!is_null(user()->image)) {
                    $checkListCompleted++;
                }

                $this->checkListCompleted = $checkListCompleted;
            } else if (in_array('client', user_roles())) {
                $this->appTheme = client_theme();
            } else {
                $this->appTheme = employee_theme();
            }


            $this->sidebarUserPermissions = sidebar_user_perms();

            return $next($request);
        });
    }

    public function logProjectActivity($projectId, $text)
    {
        $activity = new ProjectActivity();
        $activity->project_id = $projectId;
        $activity->activity = $text;
        $activity->save();
    }

    /**
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function logUserActivity($userId, $text)
    {
        $activity = new UserActivity();
        $activity->user_id = $userId;
        $activity->activity = $text;
        $activity->save();
    }

    public function logTaskActivity($taskID, $userID, $text, $boardColumnId = null, $subTaskId = null)
    {
        $activity = new TaskHistory();
        $activity->task_id = $taskID;

        if (!is_null($subTaskId)) {
            $activity->sub_task_id = $subTaskId;
        }

        $activity->user_id = $userID;
        $activity->details = $text;

        if (!is_null($boardColumnId)) {
            $activity->board_column_id = $boardColumnId;
        }

        $activity->save();
    }

    public function triggerPusher($channel, $event, $data)
    {
        $pusherSettings = isset($this->pusherSettings) ? $this->pusherSettings : session()->get('pusher_settings');

        if ($pusherSettings->status) {
            $user = User::find($data['user_id']);

            Notification::send($user, new PusherNotificaiton($data));

            $pusher = new Pusher($pusherSettings->pusher_app_key, $pusherSettings->pusher_app_secret, $pusherSettings->pusher_app_id, array('cluster' => $pusherSettings->pusher_cluster, 'useTLS' => $pusherSettings->force_tls));
            $pusher->trigger($channel, $event, $data);
        }
    }

    public function innerSettingMenu()
    {
        $route = Route::currentRouteName();
        $data = [];

        foreach ($this->subMenuSettings as $menu) {
            if ($menu['route'] == $route) {
                $data = $menu;
                break;
            }

            if (isset($menu['children'])) {
                foreach ($menu['children'] as $subMenu) {
                    if ($route == $subMenu['route']) {
                        $data = $menu;
                        break;
                    }
                }
            }
        }

        return $data;
    }
   
}
