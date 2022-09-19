<?php

namespace App\Http\Controllers;

use App\DataTables\TaskReportDataTable;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskCategory;
use App\Models\TaskLabelList;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.taskReport';
    }

    public function index(TaskReportDataTable $dataTable)
    {
        abort_403(user()->permission('view_task_report') != 'all');

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();
            $this->clients = User::allClients();
            $this->employees = User::allEmployees();
            $this->taskBoardStatus = TaskboardColumn::all();
            $this->taskCategories = TaskCategory::all();
            $this->taskLabels = TaskLabelList::all();
        }

        return $dataTable->render('reports.tasks.index', $this->data);
    }

    public function taskChartData(Request $request)
    {
        $taskStatus = TaskboardColumn::all();
        $data['labels'] = $taskStatus->pluck('column_name');
        $data['colors'] = $taskStatus->pluck('label_color');
        $data['values'] = [];

        $startDate = $endDate = null;

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        }

        $projectId = $request->projectId;
        $taskBoardColumn = TaskboardColumn::completeColumn();

        foreach ($taskStatus as $label) {
            $model = Task::leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
                ->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                ->where('tasks.board_column_id', $label->id);

            if ($startDate !== null && $endDate !== null) {
                $model->where(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate, $endDate]);

                    $q->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate, $endDate]);
                });
            }

            if ($projectId != 0 && $projectId != null && $projectId != 'all') {
                $model->where('tasks.project_id', '=', $projectId);
            }

            if ($request->clientID != '' && $request->clientID != null && $request->clientID != 'all') {
                $model->where('projects.client_id', '=', $request->clientID);
            }

            if ($request->assignedTo != '' && $request->assignedTo != null && $request->assignedTo != 'all') {
                $model->where('task_users.user_id', '=', $request->assignedTo);
            }

            if ($request->assignedBY != '' && $request->assignedBY != null && $request->assignedBY != 'all') {
                $model->where('creator_user.id', '=', $request->assignedBY);
            }

            if ($request->status != '' && $request->status != null && $request->status != 'all') {
                if ($request->status == 'not finished') {
                    $model->where('tasks.board_column_id', '<>', $taskBoardColumn->id);
                }
                else {
                    $model->where('tasks.board_column_id', '=', $request->status);
                }
            }

            if ($request->label != '' && $request->label != null && $request->label != 'all') {
                $model->where('task_labels.label_id', '=', $request->label);
            }

            if ($request->category_id != '' && $request->category_id != null && $request->category_id != 'all') {
                $model->where('tasks.task_category_id', '=', $request->category_id);
            }

            if ($request->billable != '' && $request->billable != null && $request->billable != 'all') {
                $model->where('tasks.billable', '=', $request->billable);
            }

            if ($request->searchText != '') {
                $model->where(function ($query) {
                    $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                        ->orWhere('member.name', 'like', '%' . request('searchText') . '%')
                        ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
                });
            }

            $data['values'][] = $model->count();
        }

        $this->chartData = $data;
        $html = view('reports.tasks.chart', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
    }

}
