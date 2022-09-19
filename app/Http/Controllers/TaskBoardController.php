<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\TaskBoard\StoreTaskBoard;
use App\Http\Requests\TaskBoard\UpdateTaskBoard;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskCategory;
use App\Models\TaskLabelList;
use App\Models\User;
use App\Models\UserTaskboardSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskBoardController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'modules.tasks.taskBoard';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('tasks', $this->user->modules));
            $this->viewTaskPermission = user()->permission('view_tasks');
            $this->viewUnassignedTasksPermission = user()->permission('view_unassigned_tasks');
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // @codingStandardsIgnoreLine
    public function index(Request $request)
    {
        $this->startDate = now()->subDays(15)->format($this->global->date_format);
        $this->endDate = now()->addDays(15)->format($this->global->date_format);
        $this->projects = Project::allProjects();
        $this->clients = User::allClients();
        $this->employees = User::allEmployees();
        $this->publicTaskboardLink = encrypt($this->companyName);
        $this->taskCategories = TaskCategory::all();
        $this->taskLabels = TaskLabelList::all();

        if (request()->ajax()) {

            $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
            $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;

            $this->boardEdit = (request()->has('boardEdit') && request('boardEdit') == 'false') ? false : true;
            $this->boardDelete = (request()->has('boardDelete') && request('boardDelete') == 'false') ? false : true;

            $boardColumns = TaskboardColumn::withCount(['tasks as tasks_count' => function ($q) use ($startDate, $endDate, $request) {
                $q->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', '=', 'projects.client_id');

                if (
                    ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles())
                    && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all'))
                    || ($request->has('project_admin') && $request->project_admin == 1)
                    ) {
                    $q->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
                        ->leftJoin('users', 'task_users.user_id', '=', 'users.id');

                } else {
                    $q->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                        ->join('users', 'task_users.user_id', '=', 'users.id');
                }

                $q->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                    ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by');

                if (!in_array('admin', user_roles())) {
                    $q->where(
                        function ($q) {
                            $q->where('tasks.is_private', 0);
                            $q->orWhere(
                                function ($q2) {
                                    $q2->where('tasks.is_private', 1);
                                    $q2->where(
                                        function ($q4) {
                                            $q4->where('task_users.user_id', user()->id);
                                            $q4->orWhere('tasks.added_by', user()->id);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }

                if ($startDate && $endDate) {
                    $q->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate, $endDate]);
                    });
                }

                $q->whereNull('projects.deleted_at');

                if ($request->projectID != 0 && $request->projectID != null && $request->projectID != 'all') {
                    $q->where('tasks.project_id', '=', $request->projectID);
                }

                if ($request->clientID != '' && $request->clientID != null && $request->clientID != 'all') {
                    $q->where('projects.client_id', '=', $request->clientID);
                }

                if ($request->assignedTo != '' && $request->assignedTo != null && $request->assignedTo != 'all') {
                    $q->where('task_users.user_id', '=', $request->assignedTo);
                }

                if ($request->assignedBY != '' && $request->assignedBY != null && $request->assignedBY != 'all') {
                    $q->where('creator_user.id', '=', $request->assignedBY);
                }

                if ($request->category_id != '' && $request->category_id != null && $request->category_id != 'all') {
                    $q->where('tasks.task_category_id', '=', $request->category_id);
                }

                if ($request->label_id != '' && $request->label_id != null && $request->label_id != 'all') {
                    $q->where('task_labels.label_id', '=', $request->label_id);
                }

                if ($request->billable != '' && $request->billable != null && $request->billable != 'all') {
                    $q->where('tasks.billable', '=', $request->billable);
                }

                if ($request->searchText != '') {
                    $q->where(function ($query) {
                        $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                            ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
                    });
                }

                if (($request->has('project_admin') && $request->project_admin != 1) || !$request->has('project_admin')) {
                    if ($this->viewTaskPermission == 'owned') {
                        $q->where(function ($q1) use ($request) {
                            $q1->where('task_users.user_id', '=', user()->id);

                            if (in_array('client', user_roles())) {
                                $q1->orWhere('projects.client_id', '=', user()->id);
                            }

                            if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                $q1->orWhereDoesntHave('users');
                            }
                        });
                    }

                    if ($this->viewTaskPermission == 'added') {
                        $q->where('tasks.added_by', '=', user()->id);
                    }

                    if ($this->viewTaskPermission == 'both') {
                        $q->where(function ($q1) use ($request) {
                            $q1->where('task_users.user_id', '=', user()->id);

                            $q1->orWhere('tasks.added_by', '=', user()->id);

                            if (in_array('client', user_roles())) {
                                $q1->orWhere('projects.client_id', '=', user()->id);
                            }

                            if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                $q1->orWhereDoesntHave('users');
                            }
                        });
                    }
                }

                $q->select(DB::raw('count(distinct tasks.id)'));
            }])
                ->with(['tasks' => function ($q) use ($startDate, $endDate, $request) {
                    $q->withCount(['subtasks', 'completedSubtasks', 'comments'])
                        ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                        ->leftJoin('users as client', 'client.id', '=', 'projects.client_id');

                    if (
                        ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all'))
                        || ($request->has('project_admin') && $request->project_admin == 1)
                        ) {
                        $q->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
                            ->leftJoin('users', 'task_users.user_id', '=', 'users.id');

                    } else {
                        $q->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                            ->join('users', 'task_users.user_id', '=', 'users.id');
                    }

                    $q->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                        ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
                        ->groupBy('tasks.id');

                    if (!in_array('admin', user_roles())) {
                        $q->where(
                            function ($q) {
                                $q->where('tasks.is_private', 0);
                                $q->orWhere(
                                    function ($q2) {
                                        $q2->where('tasks.is_private', 1);
                                        $q2->where(
                                            function ($q4) {
                                                $q4->where('task_users.user_id', user()->id);
                                                $q4->orWhere('tasks.added_by', user()->id);
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }

                    if ($startDate && $endDate) {
                        $q->where(function ($task) use ($startDate, $endDate) {
                            $task->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate, $endDate]);

                            $task->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate, $endDate]);
                        });
                    }

                    $q->whereNull('projects.deleted_at');

                    if ($request->projectID != 0 && $request->projectID != null && $request->projectID != 'all') {
                        $q->where('tasks.project_id', '=', $request->projectID);
                    }

                    if ($request->clientID != '' && $request->clientID != null && $request->clientID != 'all') {
                        $q->where('projects.client_id', '=', $request->clientID);
                    }

                    if ($request->assignedTo != '' && $request->assignedTo != null && $request->assignedTo != 'all') {
                        $q->where('task_users.user_id', '=', $request->assignedTo);
                    }

                    if ($request->assignedBY != '' && $request->assignedBY != null && $request->assignedBY != 'all') {
                        $q->where('creator_user.id', '=', $request->assignedBY);
                    }

                    if ($request->category_id != '' && $request->category_id != null && $request->category_id != 'all') {
                        $q->where('tasks.task_category_id', '=', $request->category_id);
                    }

                    if ($request->label_id != '' && $request->label_id != null && $request->label_id != 'all') {
                        $q->where('task_labels.label_id', '=', $request->label_id);
                    }

                    if ($request->billable != '' && $request->billable != null && $request->billable != 'all') {
                        $q->where('tasks.billable', '=', $request->billable);
                    }

                    if (($request->has('project_admin') && $request->project_admin != 1) || !$request->has('project_admin')) {
                        if ($this->viewTaskPermission == 'owned') {
                            $q->where(function ($q1) use ($request) {
                                $q1->where('task_users.user_id', '=', user()->id);

                                if (in_array('client', user_roles())) {
                                    $q1->orWhere('projects.client_id', '=', user()->id);
                                }

                                if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                    $q1->orWhereDoesntHave('users');
                                }
                            });
                        }

                        if ($this->viewTaskPermission == 'added') {
                            $q->where('tasks.added_by', '=', user()->id);
                        }

                        if ($this->viewTaskPermission == 'both') {
                            $q->where(function ($q1) use ($request) {
                                $q1->where('task_users.user_id', '=', user()->id);

                                $q1->orWhere('tasks.added_by', '=', user()->id);

                                if (in_array('client', user_roles())) {
                                    $q1->orWhere('projects.client_id', '=', user()->id);
                                }

                                if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                    $q1->orWhereDoesntHave('users');
                                }
                            });
                        }
                    }

                    if ($request->searchText != '') {
                        $q->where(function ($query) {
                            $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                                ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                                ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
                        });
                    }
                }])->with('userSetting')->orderBy('priority', 'asc')->get();
            $result = array();

            foreach ($boardColumns as $key => $boardColumn) {
                $result['boardColumns'][] = $boardColumn;

                $tasks = Task::with(['users', 'project', 'labels'])
                    ->withCount(['subtasks', 'completedSubtasks', 'comments'])
                    ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', '=', 'projects.client_id');



                if (($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all' || $request->assignedTo == null)) || ($request->has('project_admin') && $request->project_admin == 1)) {
                    $tasks->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
                        ->leftJoin('users', 'task_users.user_id', '=', 'users.id');
                }
                else {
                    $tasks->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                        ->join('users', 'task_users.user_id', '=', 'users.id');
                }

                $tasks->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
                    ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
                    ->select('tasks.*')
                    ->where('tasks.board_column_id', $boardColumn->id)
                    ->orderBy('column_priority', 'asc')
                    ->groupBy('tasks.id');

                if (!in_array('admin', user_roles())) {
                    $tasks->where(
                        function ($q) {
                            $q->where('tasks.is_private', 0);
                            $q->orWhere(
                                function ($q2) {
                                    $q2->where('tasks.is_private', 1);
                                    $q2->where(
                                        function ($q4) {
                                            $q4->where('task_users.user_id', user()->id);
                                            $q4->orWhere('tasks.added_by', user()->id);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }

                if ($startDate && $endDate) {
                    $tasks->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate, $endDate]);
                    });
                }

                $tasks->whereNull('projects.deleted_at');

                if ($request->projectID != 0 && $request->projectID != null && $request->projectID != 'all') {
                    $tasks->where('tasks.project_id', '=', $request->projectID);
                }

                if ($request->clientID != '' && $request->clientID != null && $request->clientID != 'all') {
                    $tasks->where('projects.client_id', '=', $request->clientID);
                }

                if ($request->assignedTo != '' && $request->assignedTo != null && $request->assignedTo != 'all') {
                    $tasks->where('task_users.user_id', '=', $request->assignedTo);
                }

                if ($request->assignedBY != '' && $request->assignedBY != null && $request->assignedBY != 'all') {
                    $tasks->where('creator_user.id', '=', $request->assignedBY);
                }

                if ($request->category_id != '' && $request->category_id != null && $request->category_id != 'all') {
                    $tasks->where('tasks.task_category_id', '=', $request->category_id);
                }

                if ($request->label_id != '' && $request->label_id != null && $request->label_id != 'all') {
                    $tasks->where('task_labels.label_id', '=', $request->label_id);
                }

                if ($request->billable != '' && $request->billable != null && $request->billable != 'all') {
                    $tasks->where('tasks.billable', '=', $request->billable);
                }

                if (($request->has('project_admin') && $request->project_admin != 1) || !$request->has('project_admin')) {
                    if ($this->viewTaskPermission == 'owned') {
                        $tasks->where(function ($q1) use ($request) {
                            $q1->where('task_users.user_id', '=', user()->id);

                            if (in_array('client', user_roles())) {
                                $q1->orWhere('projects.client_id', '=', user()->id);
                            }

                            if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                $q1->orWhereDoesntHave('users');
                            }
                        });
                    }

                    if ($this->viewTaskPermission == 'added') {
                        $tasks->where('tasks.added_by', '=', user()->id);
                    }

                    if ($this->viewTaskPermission == 'both') {
                        $tasks->where(function ($q1) use ($request) {
                            $q1->where('task_users.user_id', '=', user()->id);

                            $q1->orWhere('tasks.added_by', '=', user()->id);

                            if (in_array('client', user_roles())) {
                                $q1->orWhere('projects.client_id', '=', user()->id);
                            }

                            if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                                $q1->orWhereDoesntHave('users');
                            }
                        });
                    }
                }

                if ($request->searchText != '') {
                    $tasks->where(function ($query) {
                        $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                            ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
                    });
                }

                $tasks->skip(0)->take($this->taskBoardColumnLength);
                $tasks = $tasks->get();

                $result['boardColumns'][$key]['tasks'] = $tasks;
            }

            $this->result = $result;

            $this->startDate = $startDate;
            $this->endDate = $endDate;

            $view = view('taskboard.board_data', $this->data)->render();
            return Reply::dataOnly(['view' => $view, 'status' => 'success']);
        }

        session()->forget('pusher_settings');
        return view('taskboard.index', $this->data);
    }

    /**
     * @param StoreTaskBoard $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(StoreTaskBoard $request)
    {
        $maxPriority = TaskboardColumn::max('priority');

        $board = new TaskboardColumn();
        $board->column_name = $request->column_name;
        $board->label_color = $request->label_color;
        $board->slug = str_slug($request->column_name, '_');
        $board->priority = ($maxPriority + 1);
        $board->save();

        return Reply::success(__('messages.boardColumnSaved'));
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function loadMore(Request $request)
    {
        $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
        $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;
        $skip = $request->currentTotalTasks;
        $totalTasks = $request->totalTasks;

        $tasks = Task::with('users', 'project', 'labels')
            ->withCount(['subtasks', 'completedSubtasks', 'comments'])
            ->leftJoin('projects', 'projects.id', '=', 'tasks.project_id')
            ->leftJoin('users as client', 'client.id', '=', 'projects.client_id');

        if (
            ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all'))
            || ($request->has('project_admin') && $request->project_admin == 1)
            ) {
            $tasks->leftJoin('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->leftJoin('users', 'task_users.user_id', '=', 'users.id');

        } else {
            $tasks->join('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->join('users', 'task_users.user_id', '=', 'users.id');
        }

        $tasks->leftJoin('task_labels', 'task_labels.task_id', '=', 'tasks.id')
            ->leftJoin('users as creator_user', 'creator_user.id', '=', 'tasks.created_by')
            ->select('tasks.*')
            ->where('tasks.board_column_id', $request->columnId)
            ->orderBy('column_priority', 'asc')
            ->groupBy('tasks.id');

        if (!in_array('admin', user_roles())) {
            $tasks->where(
                function ($q) {
                    $q->where('tasks.is_private', 0);
                    $q->orWhere(
                        function ($q2) {
                            $q2->where('tasks.is_private', 1);
                            $q2->where(
                                function ($q4) {
                                    $q4->where('task_users.user_id', user()->id);
                                    $q4->orWhere('tasks.added_by', user()->id);
                                }
                            );
                        }
                    );
                }
            );
        }

        if ($startDate && $endDate) {
            $tasks->where(function ($task) use ($startDate, $endDate) {
                $task->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate, $endDate]);

                $task->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate, $endDate]);
            });
        }

        $tasks->whereNull('projects.deleted_at');

        if ($request->projectID != 0 && $request->projectID != null && $request->projectID != 'all') {
            $tasks->where('tasks.project_id', '=', $request->projectID);
        }

        if ($request->clientID != '' && $request->clientID != null && $request->clientID != 'all') {
            $tasks->where('projects.client_id', '=', $request->clientID);
        }

        if ($request->assignedTo != '' && $request->assignedTo != null && $request->assignedTo != 'all') {
            $tasks->where('task_users.user_id', '=', $request->assignedTo);
        }

        if ($request->assignedBY != '' && $request->assignedBY != null && $request->assignedBY != 'all') {
            $tasks->where('creator_user.id', '=', $request->assignedBY);
        }

        if ($request->category_id != '' && $request->category_id != null && $request->category_id != 'all') {
            $tasks->where('tasks.task_category_id', '=', $request->category_id);
        }

        if ($request->label_id != '' && $request->label_id != null && $request->label_id != 'all') {
            $tasks->where('task_labels.label_id', '=', $request->label_id);
        }

        if (($request->has('project_admin') && $request->project_admin != 1) || !$request->has('project_admin')) {
            if ($this->viewTaskPermission == 'owned') {
                $tasks->where(function ($q1) use ($request) {
                    $q1->where('task_users.user_id', '=', user()->id);

                    if (in_array('client', user_roles())) {
                        $q1->orWhere('projects.client_id', '=', user()->id);
                    }

                    if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                        $q1->orWhereDoesntHave('users');
                    }
                });
            }

            if ($this->viewTaskPermission == 'added') {
                $tasks->where('tasks.added_by', '=', user()->id);
            }

            if ($this->viewTaskPermission == 'both') {
                $tasks->where(function ($q1) use ($request) {
                    $q1->where('task_users.user_id', '=', user()->id);

                    $q1->orWhere('tasks.added_by', '=', user()->id);

                    if (in_array('client', user_roles())) {
                        $q1->orWhere('projects.client_id', '=', user()->id);
                    }

                    if ($this->viewUnassignedTasksPermission == 'all' && !in_array('client', user_roles()) && ($request->assignedTo == 'unassigned' || $request->assignedTo == 'all')) {
                        $q1->orWhereDoesntHave('users');
                    }
                });
            }
        }

        if ($request->searchText != '') {
            $tasks->where(function ($query) {
                $query->where('tasks.heading', 'like', '%' . request('searchText') . '%')
                    ->orWhere('users.name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_name', 'like', '%' . request('searchText') . '%');
            });
        }

        $tasks->skip($skip)->take($this->taskBoardColumnLength);
        $tasks = $tasks->get();
        $this->tasks = $tasks;

        if ($totalTasks <= ($skip + $this->taskBoardColumnLength)) {
            $loadStatus = 'hide';
        }
        else {
            $loadStatus = 'show';
        }

        $view = view('taskboard.load_more', $this->data)->render();
        return Reply::dataOnly(['view' => $view, 'load_more' => $loadStatus]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function updateIndex(Request $request)
    {
        $taskIds = $request->taskIds;
        $boardColumnId = $request->boardColumnId;
        $priorities = $request->prioritys;

        $board = TaskboardColumn::findOrFail($boardColumnId);

        if (isset($taskIds) && count($taskIds) > 0) {

            $taskIds = (array_filter($taskIds, function ($value) {
                return $value !== null;
            }));

            foreach ($taskIds as $key => $taskId) {
                if (!is_null($taskId)) {
                    $task = Task::findOrFail($taskId);

                    if ($board->slug == 'completed') {
                        $task->update(
                            [
                                'board_column_id' => $boardColumnId,
                                'completed_on' => now()->format('Y-m-d'),
                                'column_priority' => $priorities[$key]
                            ]
                        );
                    }
                    else {
                        $task->update(
                            [
                                'board_column_id' => $boardColumnId,
                                'column_priority' => $priorities[$key]
                            ]
                        );
                    }
                }
            }


            $this->triggerPusher('task-updated-channel', 'task-updated', ['user_id' => $this->user->id, 'task_id' => $request->draggingTaskId]);
        }

        return Reply::dataOnly(['status' => 'success']);
    }

    public function create()
    {
        abort_403(user()->permission('add_status') !== 'all');

        return view('taskboard.create', $this->data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        abort_403(user()->permission('add_status') !== 'all');

        $this->boardColumn = TaskboardColumn::findOrFail($id);
        $this->maxPriority = TaskboardColumn::max('priority');
        return view('taskboard.edit', $this->data);
    }

    /**
     * @param UpdateTaskBoard $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(UpdateTaskBoard $request, $id)
    {
        $board = TaskboardColumn::findOrFail($id);
        $oldPosition = $board->priority;
        $newPosition = $request->priority;

        if ($oldPosition < $newPosition) {

            TaskboardColumn::where('priority', '>', $oldPosition)
                ->where('priority', '<=', $newPosition)
                ->orderBy('priority', 'asc')
                ->decrement('priority');

        }
        else if ($oldPosition > $newPosition) {

            TaskboardColumn::where('priority', '<', $oldPosition)
                ->where('priority', '>=', $newPosition)
                ->orderBy('priority', 'asc')
                ->increment('priority');
        }

        $board->column_name = $request->column_name;

        if ($board->getOriginal('slug') != 'incomplete' && $board->getOriginal('slug') != 'completed') {
            $board->slug = str_slug($request->column_name, '_');
        }

        $board->label_color = $request->label_color;
        $board->priority = $request->priority;
        $board->save();

        $this->updatePrioritySequence($request, $id);

        return Reply::success(__('messages.boardColumnSaved'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::where('board_column_id', $id)->update(['board_column_id' => global_setting()->default_task_status]);

        $board = TaskboardColumn::findOrFail($id);

        $otherColumns = TaskboardColumn::where('priority', '>', $board->priority)
            ->orderBy('priority', 'asc')
            ->get();

        foreach ($otherColumns as $column) {
            $pos = TaskboardColumn::where('priority', $column->priority)->first();
            $pos->priority = ($pos->priority - 1);
            $pos->save();
        }

        UserTaskboardSetting::where('board_column_id', $id)->delete();

        TaskboardColumn::destroy($id);

        return Reply::dataOnly(['status' => 'success']);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function collapseColumn(Request $request)
    {
        $setting = UserTaskboardSetting::firstOrNew([
            'user_id' => user()->id,
            'board_column_id' => $request->boardColumnId,
        ]);
        $setting->collapsed = (($request->type == 'minimize') ? 1 : 0);
        $setting->save();

        return Reply::dataOnly(['status' => 'success']);
    }

    public function updatePrioritySequence($request, $id)
    {
        $currentSequence = TaskboardColumn::findOrFail($id);

        if ($currentSequence->priority > $request->priority) {
            /* check for Sequence numbers less then current sequence: */
            $increment_sequence_number = TaskboardColumn::where('priority', '<', $currentSequence->priority)->where('priority', '>=', $request->priority)->get();

            foreach ($increment_sequence_number as $increment_sequence_numbers) {
                $increment_sequence_numbers->priority = ((int)$increment_sequence_numbers->priority + 1);
                $increment_sequence_numbers->save();
            }
        }
        else {
            /* check for Sequence numbers greater then current sequence: */
            $decrement_sequence_number = TaskboardColumn::where('priority', '>', $currentSequence->priority)->where('priority', '<=', $request->priority)->get();

            foreach ($decrement_sequence_number  as  $decrement_sequence_numbers) {
                $decrement_sequence_numbers->priority = ((int)$decrement_sequence_numbers->priority - 1);
                $decrement_sequence_numbers->save();
            }
        }

        $currentSequence->priority = $request->priority;
        $currentSequence->save();
    }

}
