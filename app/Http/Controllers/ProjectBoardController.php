<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Project;

use App\Models\ProjectCategory;

use App\Models\ProjectStatus;
use App\Models\UserProjectBoardSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectStatusSetting;

class ProjectBoardController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Projects';
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
    public function index(Request $request)
    {
      //dd($request->all());
        // $this->viewProjectPermission = $viewPermission = user()->permission('view_project');
        // abort_403(!in_array($viewPermission, ['all', 'added', 'both', 'owned']));

        $this->categories = ProjectCategory::get();

        $this->status = ProjectStatusSetting::orderBy('priority')->get();
        // /dd($this->status);

        $this->startDate = $startDate = now()->subDays(15)->format($this->global->date_format);
        $this->endDate = $endDate = now()->addDays(15)->format($this->global->date_format);




      //  dd(request()->ajax());
        if (request()->ajax()) {


            $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
            $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;



            if (in_array('client', user_roles())) {
                $this->clients = User::client();
                //dd($this->clients);
            }
            else {
                $this->clients = User::allClients();
                $this->allEmployees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
            }


            $this->projectStatus = ProjectStatus::all();

            $boardColumns = ProjectStatus::with('userSetting')->withCount(['projects as projects_count' => function ($q) use ($startDate, $endDate, $request) {
            //dd($startDate, $endDate, $request);


                if ($startDate && $endDate) {
                    $q->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);
                    });
                }



                if ($request->type != 'all' && $request->type != '') {
                    if ($request->type == 'project') {
                        $q->whereNull('client_id');
                    }
                    else {
                        $q->whereNotNull('client_id');
                    }
                }



                if ($request->category_id != 'all' && $request->category_id != '') {
                    $q->where('category_id', $request->category_id);
                }



                if ($request->searchText != '') {
                    $q->where(function ($query) {
                        $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%')
                          ;
                    });
                }

                $q->select(DB::raw('count(distinct projects.id)'));
            }])

            ->with(['s' => function ($q) use ($startDate, $endDate, $request) {
                $q->with(['currency'])
                    ->groupBy('projects.id');

                if ($startDate && $endDate) {
                    $q->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);
                    });
                }





                if ($request->type != 'all' && $request->type != '') {
                    if ($request->type == 'project') {
                        $q->whereNull('client_id');
                    }
                    else {
                        $q->whereNotNull('client_id');
                    }
                }


                if ($request->category_id != 'all' && $request->category_id != '') {
                    $q->where('category_id', $request->category_id);
                }


                if ($request->searchText != '') {
                    $q->where(function ($query) {
                        $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%')
                            ;
                    });
                }
            }])->orderBy('priority', 'asc')->get();

            $result = array();

            foreach ($boardColumns as $key => $boardColumn) {
                $result['boardColumns'][] = $boardColumn;

                $projects = Project::select('projects.*')

                    ->where('projects.status_id', $boardColumn->id)
                    ->orderBy('column_priority', 'asc')
                    ->groupBy('projects.id');


                if ($startDate && $endDate) {
                    $projects->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);
                    });
                }



                if ($request->type != 'all' && $request->type != '') {
                    if ($request->type == 'project') {
                        $projects->whereNull('client_id');
                    }
                    else {
                        $projects->whereNotNull('client_id');
                    }
                }



                if ($request->category_id != 'all' && $request->category_id != '') {
                    $projects->where('category_id', $request->category_id);
                }



                if ($request->searchText != '') {
                    $projects->where(function ($query) {
                        $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%')
                          ;
                    });
                }

                $projects->skip(0)->take($this->taskBoardColumnLength);
                $projects = $projects->get();

                $result['boardColumns'][$key]['projects'] = $projects;
                //dd($result['boardColumns'][$key]['projects']);

            }

            $this->result = $result;
            $this->startDate = $startDate;
            $this->endDate = $endDate;
          //  dd($boardColumns);
        //  dd($this->data);
            $view = view('projects.board.board_data', $this->data)->render();

            return Reply::dataOnly(['view' => $view]);
        }
        // /dd($projects);

      //  dd($this->data);
        return view('projects.board.index', $this->data);
    }

    public function loadMore(Request $request)
    {
        $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
        $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;
        $skip = $request->currentTotalTasks;
        $totalTasks = $request->totalTasks;

        $projects = Project::select('projects.*')
            ->where('projects.status_id', $request->columnId)
            ->orderBy('column_priority', 'asc')
            ->groupBy('projects.id');

        if ($startDate && $endDate) {
            $projects->where(function ($task) use ($startDate, $endDate) {
                $task->whereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);

                $task->orWhereBetween(DB::raw('DATE(projects.`created_at`)'), [$startDate, $endDate]);
            });
        }



        if ($request->type != 'all' && $request->type != '') {
            if ($request->type == 'project') {
                $projects->whereNull('client_id');
            }
            else {
                $projects->whereNotNull('client_id');
            }
        }


        if ($request->category_id != 'all' && $request->category_id != '') {
            $projects->where('category_id', $request->category_id);
        }


        if ($request->searchText != '') {
            $projects->where(function ($query) {
                $query->where('projects.project_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('projects.project_short_code', 'like', '%' . request('searchText') . '%')
                    ;
            });
        }

        $projects->skip($skip)->take($this->taskBoardColumnLength);
        $projects = $projects->get();
        $this->projects = $projects;

        if ($totalTasks <= ($skip + $this->taskBoardColumnLength)) {
            $loadStatus = 'hide';
        }
        else {
            $loadStatus = 'show';
        }

        $view = view('projects.board.load_more', $this->data)->render();
        return Reply::dataOnly(['view' => $view, 'load_more' => $loadStatus]);
    }

    public function updateIndex(Request $request)
    {
        $taskIds = $request->taskIds;
        $boardColumnId = $request->boardColumnId;
        $priorities = $request->prioritys;

        $board = ProjectStatus::findOrFail($boardColumnId);

        if (isset($taskIds) && count($taskIds) > 0) {

            $taskIds = (array_filter($taskIds, function ($value) {
                return $value !== null;
            }));

            foreach ($taskIds as $key => $taskId) {
                if (!is_null($taskId)) {
                    $task = Project::findOrFail($taskId);
                    $task->update(
                        [
                            'status_id' => $boardColumnId,
                            'column_priority' => $priorities[$key]
                        ]
                    );
                }
            }

        }

        return Reply::dataOnly(['status' => 'success']);
    }

    public function collapseColumn(Request $request)
    {
        $setting = UserProjectBoardSetting::firstOrNew([
            'user_id' => user()->id,
            'board_column_id' => $request->boardColumnId,
        ]);
        $setting->collapsed = (($request->type == 'minimize') ? 1 : 0);
        $setting->save();

        return Reply::dataOnly(['status' => 'success']);
    }

}
