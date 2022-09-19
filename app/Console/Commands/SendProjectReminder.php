<?php

namespace App\Console\Commands;

use App\Events\ProjectReminderEvent;
use App\Models\Project;
use App\Models\ProjectSetting;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class SendProjectReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-project-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send project reminder to the admins before specified days of the project';

    protected $global_setting;
    protected $project_setting;

    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()
    {
        try {
            $this->global_setting = Setting::first();
            $this->project_setting = ProjectSetting::first();
        } catch (\Exception $e) {
            Log::info($e);
        }

        if ($this->project_setting->send_reminder == 'yes')
        {
            $projects = Project::whereNotNull('deadline')
                ->whereDate('deadline', Carbon::now($this->global_setting->timezone)->addDays($this->project_setting->remind_time))
                ->get()->makeHidden('isProjectAdmin');

            if ($projects->count() > 0) {
                $members = [];

                foreach ($projects as $project) {
                    // Get project members
                    foreach ($project->members as $member) {
                        $members = Arr::add($members, $member->user->id, $member->user);
                    }
                }

                $members = collect(array_values($members));

                $users = [];

                if (in_array('admins', $this->project_setting->remind_to) && in_array('members', $this->project_setting->remind_to)) {
                    $admins = User::allAdmins()->makeHidden('unreadNotifications');
                    $users = $admins->merge($members);
                }
                else {
                    if (in_array('admins', $this->project_setting->remind_to)) {
                        $users = User::allAdmins()->makeHidden('unreadNotifications');
                    }

                    if (in_array('members', $this->project_setting->remind_to)) {
                        $users = collect($users)->merge($members);
                    }
                }

                if ($users->count() > 0)
                {
                    foreach ($users as $user)
                    {
                        $projectsArr = [];

                        foreach ($user->member as $projectMember) {
                            $projectsArr = Arr::add($projectsArr, $projectMember->project->id, $projectMember->project->makeHidden('isProjectAdmin'));
                        }

                        $projectsArr = collect(array_values($projectsArr));

                        if (!$user->isAdmin($user->id)) {
                            $projectsArr = $this->filterProjects($projectsArr);
                        }
                        else {
                            $projectsArr = !in_array('admins', $this->project_setting->remind_to) ? $this->filterProjects($projectsArr) : $projects;
                        }

                        event(new ProjectReminderEvent($projectsArr, $user, ['global_setting' => $this->global_setting, 'project_setting' => $this->project_setting]));

                        /* $user->notify(new ProjectReminder($projectsArr, ['global_setting' => $this->global_setting, 'project_setting' => $this->project_setting])); */
                    }
                }
            }
        }
    }

    public function filterProjects($projectsArr)
    {
        return $projectsArr->filter(function ($project) {
            return Carbon::parse($project->deadline, $this->global_setting->timezone)
                ->equalTo(Carbon::now($this->global_setting->timezone)->addDays($this->project_setting->remind_time)->startOfDay());
        });
    }

}
