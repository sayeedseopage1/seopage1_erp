<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TemplateTasks\StoreTask;
use App\Models\ProjectTemplate;
use App\Models\ProjectTemplateTask;
use App\Models\ProjectTemplateTaskUser;
use App\Models\TaskCategory;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectTemplateTaskController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projectTemplateTask';

        $this->middleware(function ($request, $next) {
            abort_403(!in_array('projects', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $this->pageTitle = __('app.menu.addProjectTemplate');
        $this->template = ProjectTemplate::findOrFail($request->project_id);
        $this->categories = TaskCategory::all();

        $this->project = request('project_id') ? ProjectTemplate::with('membersMany')->findOrFail(request('project_id')) : null;

        if (!is_null($this->project)) {
            $this->employees = $this->project->membersMany;

        } else {
            $this->employees = User::allEmployees();
        }

        if (request()->ajax()) {
            $html = view('project-templates.task.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-templates.task.ajax.create';
        return view('project-templates.task.create', $this->data);

    }

    /**
     * @param StoreTask $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTask $request)
    {
        $task = new ProjectTemplateTask();
        $task->heading = $request->heading;

        if ($request->description != '') {
            $task->description = str_replace('<p><br></p>', '', trim($request->description));
        }

        $task->project_template_id = $request->template_id;
        $task->project_template_task_category_id = $request->category_id;
        $task->priority = $request->priority;
        $task->save();

        if($request->user_id){
            foreach ($request->user_id as $key => $value) {
                ProjectTemplateTaskUser::create([
                    'user_id' => $value,
                    'project_template_task_id' => $task->id
                ]);
            }
        }

        return Reply::successWithData(__('messages.templateTaskCreatedSuccessfully'), ['redirectUrl' => route('project-template.show', $request->template_id . '?tab=tasks'), 'taskID' => $task->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->task = ProjectTemplateTask::findOrFail($id);

        $manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($manageProjectTemplatePermission, ['all', 'added', 'both']));

        $this->pageTitle = __('app.task') . ' # ' . $this->task->id;

        $this->tab = 'project-templates.task.ajax.sub_tasks';

        if (request()->ajax()) {

            if (request('json') == true) {
                $html = view($this->tab, $this->data)->render();
                return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
            }

            $html = view('project-templates.task.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-templates.task.ajax.show';

        return view('project-templates.task.create', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->task = ProjectTemplateTask::findOrFail($id);
        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $this->pageTitle = __('app.update') . ' ' . __('app.project');

        $this->categories = TaskCategory::all();
        $this->template = ProjectTemplate::findOrFail($this->task->project_template_id);
        $this->employees = User::allEmployees();

        if (request()->ajax()) {
            $html = view('project-templates.task.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-templates.task.ajax.edit';

        return view('project-templates.task.create', $this->data);

    }

    /**
     * @param StoreTask $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(StoreTask $request, $id)
    {
        $task = ProjectTemplateTask::findOrFail($id);
        $task->heading = $request->heading;

        if ($request->description != '') {
            $task->description = str_replace('<p><br></p>', '', trim($request->description));
        }

        $task->project_template_task_category_id = $request->category_id;
        $task->priority = $request->priority;
        $task->save();

        ProjectTemplateTaskUser::where('project_template_task_id', $task->id)->delete();

        if($request->user_id){
            foreach ($request->user_id as $key => $value) {
                ProjectTemplateTaskUser::create(
                    [
                        'user_id' => $value,
                        'project_template_task_id' => $task->id
                    ]
                );
            }
        }

        return Reply::successWithData(__('messages.templateTaskUpdatedSuccessfully'), ['redirectUrl' => route('project-template.show', $task->project_template_id . '?tab=tasks')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ProjectTemplateTask::destroy($id);
        return Reply::success(__('messages.taskDeletedSuccessfully'));
    }

}
