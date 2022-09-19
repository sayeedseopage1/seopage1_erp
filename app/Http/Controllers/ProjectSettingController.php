<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Project;
use App\Models\ProjectSetting;
use App\Models\ProjectStatusSetting;
use App\Http\Requests\StoreStatusSettingRequest;
use App\Http\Requests\ProjectSetting\UpdateProjectSetting;

class ProjectSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projectSettings';
        $this->activeSettingMenu = 'project_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_project_setting') == 'all'));
            return $next($request);
        });
    }

    public function index()
    {

        $tab = request('tab');

        switch ($tab) {
        case 'status':
            $this->projectStatusSetting = ProjectStatusSetting::all();
            $this->view = 'project-settings.ajax.status';
            break;
        default:
            $this->projectSetting = ProjectSetting::first();
            $this->view = 'project-settings.ajax.sendReminder';
                break;
        }

        ($tab == '') ? $this->activeTab = 'sendReminder' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('project-settings.index', $this->data);
    }

    public function create()
    {
        return view('project-settings.create-project-status-settings-modal', $this->data);
    }

    public function store(StoreStatusSettingRequest $request)
    {
        $projectStatusSetting = new ProjectStatusSetting();
        $projectStatusSetting->status_name = $request->name;
        $projectStatusSetting->color = $request->status_color;
        $projectStatusSetting->status = $request->status;
        $projectStatusSetting->default_status = '0';

        $projectStatusSetting->save();

        return Reply::success(__('messages.recordSaved'));
    }

    public function edit($id)
    {
        $this->projectStatusSetting = ProjectStatusSetting::findOrfail($id);
        return view('project-settings.edit', $this->data);
    }

    public function statusUpdate(StoreStatusSettingRequest $request, $id)
    {
        $projectStatusSetting = ProjectStatusSetting::find($id);

        $projectStatusSetting->status_name = $request->name;
        $projectStatusSetting->color = $request->status_color;
        $projectStatusSetting->status = $request->status;

        $projectStatusSetting->update();

        return Reply::success(__('messages.settingsUpdated'));
    }

    public function changeStatus($id)
    {
        $projectStatusSetting = ProjectStatusSetting::find($id);

        $projectStatusSetting->status = request()->status;

        $projectStatusSetting->update();

        return Reply::success(__('messages.leadStatusChangeSuccess'));
    }

    public function setDefault()
    {
        $defaultStatus = ProjectStatusSetting::select('id', 'default_status')->get();

        foreach($defaultStatus as $default){
            if($default->id == request()->id){
                $default->default_status = '1';
            }
            else{
                $default->default_status = '0';
            }

            $default->save();
        }

        return Reply::success(__('messages.settingsUpdated'));
    }

    public function update(UpdateProjectSetting $request, $id)
    {
        $projectSetting = ProjectSetting::find($id);

        if ($request->send_reminder) {
            $projectSetting->send_reminder = 'yes';
        }
        else {
            $projectSetting->send_reminder = 'no';
        }

        $projectSetting->remind_time = $request->remind_time;
        $projectSetting->remind_type = $request->remind_type;

        $remindTo = [];

        if ($request->remind_to == 'all' || $request->remind_to == 'members') {
            $remindTo[] = 'members';
        }

        if ($request->remind_to == 'all' || $request->remind_to == 'admins') {
            $remindTo[] = 'admins';
        }

        $projectSetting->remind_to = $remindTo;
        $projectSetting->save();

        return Reply::success(__('messages.settingsUpdated'));
    }

    public function destroy($id)
    {
        $projectStatusSetting = ProjectStatusSetting::find($id);
        $default = ProjectStatusSetting::where('default_status', 1)->first();

        Project::where('status', $projectStatusSetting->status_name)->update(['status' => $default->status_name]);

        ProjectStatusSetting::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

}
