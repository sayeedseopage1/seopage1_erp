<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\CommonRequest;
use App\Models\TaskboardColumn;
use App\Models\TaskSetting;

class TaskSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.taskSettings';
        $this->activeSettingMenu = 'task_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_task_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->companyData = $this->global;
        $this->taskboardColumns = TaskboardColumn::orderBy('priority', 'asc')->get();
        $this->taskSetting = TaskSetting::first();

        return view('task-settings.index', $this->data);
    }

    /**
     * @param CommonRequest $request
     * @return array
     */
    public function store(CommonRequest $request)
    {
        $company = $this->global;

        $company->before_days = $request->before_days;
        $company->after_days = $request->after_days;
        $company->on_deadline = $request->on_deadline;
        $company->default_task_status = $request->default_task_status;
        $company->taskboard_length = $request->taskboard_length;
        $company->save();
        session()->forget('global_setting');

        $taskSetting = TaskSetting::first();
        $taskSetting->task_category = ($request->task_category) ? 'yes' : 'no';
        $taskSetting->project = ($request->project) ? 'yes' : 'no';
        $taskSetting->start_date = ($request->start_date) ? 'yes' : 'no';
        $taskSetting->due_date = ($request->due_date) ? 'yes' : 'no';
        $taskSetting->assigned_to = ($request->assigned_to) ? 'yes' : 'no';
        $taskSetting->description = ($request->description) ? 'yes' : 'no';
        $taskSetting->label = ($request->label) ? 'yes' : 'no';
        $taskSetting->assigned_by = ($request->assigned_by) ? 'yes' : 'no';
        $taskSetting->status = ($request->status) ? 'yes' : 'no';
        $taskSetting->priority = ($request->priority) ? 'yes' : 'no';
        $taskSetting->make_private = ($request->make_private) ? 'yes' : 'no';
        $taskSetting->time_estimate = ($request->time_estimate) ? 'yes' : 'no';
        $taskSetting->hours_logged = ($request->hours_logged) ? 'yes' : 'no';
        $taskSetting->custom_fields = ($request->custom_fields) ? 'yes' : 'no';
        $taskSetting->copy_task_link = ($request->copy_task_link) ? 'yes' : 'no';
        $taskSetting->comments = ($request->comments) ? 'yes' : 'no';
        $taskSetting->files = ($request->files_tab) ? 'yes' : 'no';
        $taskSetting->sub_task = ($request->sub_task) ? 'yes' : 'no';
        $taskSetting->time_logs = ($request->time_logs) ? 'yes' : 'no';
        $taskSetting->notes = ($request->notes) ? 'yes' : 'no';
        $taskSetting->history = ($request->history) ? 'yes' : 'no';
        $taskSetting->save();


        return Reply::success(__('messages.settingsUpdated'));
    }

}
