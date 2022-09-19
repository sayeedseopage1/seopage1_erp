<?php

namespace App\Http\Controllers;

use App\DataTables\ProjectTemplateTasksDataTable;
use App\DataTables\ProjectTemplatesDataTable;
use App\Helper\Reply;
use App\Http\Requests\ProjectTemplate\StoreProject;
use App\Models\ProjectCategory;
use App\Models\ProjectTemplate;
use App\Models\TaskboardColumn;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectTemplateController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.projectTemplate';

        $this->middleware(function ($request, $next) {
            abort_403(!in_array('projects', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProjectTemplatesDataTable $dataTable)
    {
        $manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403($manageProjectTemplatePermission == 'none');

        return $dataTable->render('project-templates.index', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $this->pageTitle = __('app.menu.addProjectTemplate');
        $this->categories = ProjectCategory::all();
        $this->employees = User::allEmployees();

        if (request()->ajax()) {
            $html = view('project-templates.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-templates.ajax.create';
        return view('project-templates.create', $this->data);
    }

    /**
     * @param StoreProject $request
     * @return mixed|void
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreProject $request)
    {

        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');

        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $project = new ProjectTemplate();
        $project->project_name = $request->project_name;

        if ($request->project_summary != '') {
            $project->project_summary = $request->project_summary;
        }

        if ($request->notes != '') {
            $project->notes = $request->notes;
        }

        if ($request->category_id != '') {
            $project->category_id = $request->category_id;
        }

        if ($request->client_view_task) {
            $project->client_view_task = 'enable';
        }
        else {
            $project->client_view_task = 'disable';
        }

        if (($request->client_view_task) && ($request->client_task_notification)) {
            $project->allow_client_notification = 'enable';
        }
        else {
            $project->allow_client_notification = 'disable';
        }

        if ($request->manual_timelog) {
            $project->manual_timelog = 'enable';
        }
        else {
            $project->manual_timelog = 'disable';
        }

        $project->added_by = user()->id;

        $project->save();
        return Reply::dataOnly(['projectID' => $project->id]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->template = ProjectTemplate::findOrFail($id);
        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $tab = request('tab');

        switch ($tab) {
        case 'members':
            $this->view = 'project-templates.ajax.members';
                break;
        case 'tasks':
            $this->taskBoardStatus = TaskboardColumn::all();
                return $this->tasks();
        default:
            $this->view = 'project-templates.ajax.overview';
                break;
        }

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;

        return view('project-templates.show', $this->data);


    }

    public function tasks()
    {

        $manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($manageProjectTemplatePermission, ['all', 'added', 'owned']));

        $tab = request('tab');
        ($tab == '') ? $this->activeTab = 'overview' : $this->activeTab = $tab;
        $this->view = 'project-templates.ajax.tasks';

        $dataTable = new ProjectTemplateTasksDataTable();
        return $dataTable->render('project-templates.show', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->template = ProjectTemplate::findOrFail($id);
        $this->manageProjectTemplatePermission = user()->permission('manage_project_template');
        abort_403(!in_array($this->manageProjectTemplatePermission, ['all', 'added']));

        $this->pageTitle = __('app.update') . ' ' . __('app.project');

        $this->categories = ProjectCategory::all();

        if (request()->ajax()) {
            $html = view('project-templates.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-templates.ajax.edit';

        return view('project-templates.create', $this->data);

    }

    /**
     * @param StoreProject $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(StoreProject $request, $id)
    {
        $project = ProjectTemplate::findOrFail($id);
        $project->project_name = $request->project_name;

        if ($request->project_summary != '') {
            $project->project_summary = $request->project_summary;
        }

        if ($request->notes != '') {
            $project->notes = str_replace('<p><br></p>', '', trim($request->notes));
        }

        if ($request->category_id != '') {
            $project->category_id = $request->category_id;
        }

        if ($request->client_view_task) {
            $project->client_view_task = 'enable';
        }
        else {
            $project->client_view_task = 'disable';
        }

        if (($request->client_view_task) && ($request->client_task_notification)) {
            $project->allow_client_notification = 'enable';
        }
        else {
            $project->allow_client_notification = 'disable';
        }

        if ($request->manual_timelog) {
            $project->manual_timelog = 'enable';
        }
        else {
            $project->manual_timelog = 'disable';
        }

        $project->client_id = $request->client_id;
        $project->feedback = $request->feedback;

        $project->save();
        return Reply::successWithData(__('messages.projectUpdated'), ['redirectUrl' => route('project-template.index')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ProjectTemplate::destroy($id);
        return Reply::success(__('messages.projectDeleted'));
    }

    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        ProjectTemplate::whereIn('id', explode(',', $request->row_ids))->delete();
    }

}
