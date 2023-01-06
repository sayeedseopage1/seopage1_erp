<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Lead;
use App\Models\LeadAgent;
use App\Models\LeadCategory;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\UserLeadboardSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\DealStage;
use App\Models\Deal;

class DealBoardController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Deal';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('contracts', $this->user->modules));
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
        $this->viewLeadPermission = $viewPermission = user()->permission('view_contract');
        abort_403(!in_array($viewPermission, ['all', 'added', 'both', 'owned']));


        $this->status = LeadStatus::get();

        $this->startDate = $startDate = now()->subDays(15)->format($this->global->date_format);
        $this->endDate = $endDate = now()->addDays(15)->format($this->global->date_format);



        if (request()->ajax()) {

            $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
            $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;

            $this->boardEdit = (request()->has('boardEdit') && request('boardEdit') == 'false') ? false : true;
            $this->boardDelete = (request()->has('boardDelete') && request('boardDelete') == 'false') ? false : true;

            $boardColumns = LeadStatus::with('userSetting')->withCount(['leads as leads_count' => function ($q) use ($startDate, $endDate, $request) {

                if ($startDate && $endDate) {
                    $q->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
                    });
                }



                if ($request->type != 'all' && $request->type != '') {
                    if ($request->type == 'lead') {
                        $q->whereNull('client_id');
                    }
                    else {
                        $q->whereNotNull('client_id');
                    }
                }




                if ($request->searchText != '') {
                    $q->where(function ($query) {
                        $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.client_email', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%');
                    });
                }

                $q->select(DB::raw('count(distinct leads.id)'));
            }])

            ->with(['leads' => function ($q) use ($startDate, $endDate, $request) {
                $q->with(['leadAgent', 'leadAgent.user', 'currency'])
                    ->groupBy('leads.id');

                if ($startDate && $endDate) {
                    $q->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
                    });
                }






                if ($request->searchText != '') {
                    $q->where(function ($query) {
                        $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.client_email', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%');
                    });
                }
            }])->orderBy('priority', 'asc')->get();

            $result = array();

            foreach ($boardColumns as $key => $boardColumn) {
                $result['boardColumns'][] = $boardColumn;

                $leads = Lead::select('leads.*', DB::raw("(select next_follow_up_date from lead_follow_up where lead_id = leads.id and leads.next_follow_up  = 'yes' ORDER BY next_follow_up_date desc limit 1) as next_follow_up_date"))
                    ->with('leadAgent')
                    ->where('leads.status_id', $boardColumn->id)
                    ->orderBy('column_priority', 'asc')
                    ->groupBy('leads.id');


                if ($startDate && $endDate) {
                    $leads->where(function ($task) use ($startDate, $endDate) {
                        $task->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);

                        $task->orWhereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
                    });
                }

                if ($request->followUp != 'all' && $request->followUp != '') {
                    $leads = $leads->leftJoin('lead_follow_up', 'lead_follow_up.lead_id', 'leads.id');

                    if ($request->followUp == 'yes') {
                        $leads->where('leads.next_follow_up', 'yes');
                    }
                    else {
                        $leads->where('leads.next_follow_up', 'no');
                    }
                }

                if ($request->type != 'all' && $request->type != '') {
                    if ($request->type == 'lead') {
                        $leads->whereNull('client_id');
                    }
                    else {
                        $leads->whereNotNull('client_id');
                    }
                }

                if ($request->agent != '' && $request->agent != null && $request->agent != 'all') {
                    $leads->where('leads.agent_id', '=', $request->agent);
                }

                if ($request->category_id != 'all' && $request->category_id != '') {
                    $leads->where('category_id', $request->category_id);
                }

                if ($request->source_id != 'all' && $request->source_id != '') {
                    $leads->where('source_id', $request->source_id);
                }

                if ($request->searchText != '') {
                    $leads->where(function ($query) {
                        $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.client_email', 'like', '%' . request('searchText') . '%')
                            ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%');
                    });
                }

                $leads->skip(0)->take($this->taskBoardColumnLength);
                $leads = $leads->get();

                $result['boardColumns'][$key]['leads'] = $leads;
            }

            $this->result = $result;
            $this->startDate = $startDate;
            $this->endDate = $endDate;

            $view = view('deals.board.board_data', $this->data)->render();
            return Reply::dataOnly(['view' => $view]);
        }

        return view('deals.board.index', $this->data);
    }

    public function loadMore(Request $request)
    {
        $startDate = ($request->startDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString() : null;
        $endDate = ($request->endDate != 'null') ? Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString() : null;
        $skip = $request->currentTotalTasks;
        $totalTasks = $request->totalTasks;

        $leads = Lead::select('leads.*', DB::raw("(select next_follow_up_date from lead_follow_up where lead_id = leads.id and leads.next_follow_up  = 'yes' ORDER BY next_follow_up_date desc limit 1) as next_follow_up_date"))
            ->where('leads.status_id', $request->columnId)
            ->orderBy('column_priority', 'asc')
            ->groupBy('leads.id');

        if ($startDate && $endDate) {
            $leads->where(function ($task) use ($startDate, $endDate) {
                $task->whereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);

                $task->orWhereBetween(DB::raw('DATE(leads.`created_at`)'), [$startDate, $endDate]);
            });
        }

        

        if ($request->type != 'all' && $request->type != '') {
            if ($request->type == 'lead') {
                $leads->whereNull('client_id');
            }
            else {
                $leads->whereNotNull('client_id');
            }
        }

        if ($request->agent != '' && $request->agent != null && $request->agent != 'all') {
            $leads->where('leads.agent_id', '=', $request->agent);
        }

        if ($request->category_id != 'all' && $request->category_id != '') {
            $leads->where('category_id', $request->category_id);
        }

        if ($request->source_id != 'all' && $request->source_id != '') {
            $leads->where('source_id', $request->source_id);
        }

        if ($request->searchText != '') {
            $leads->where(function ($query) {
                $query->where('leads.client_name', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.client_email', 'like', '%' . request('searchText') . '%')
                    ->orWhere('leads.company_name', 'like', '%' . request('searchText') . '%');
            });
        }

        $leads->skip($skip)->take($this->taskBoardColumnLength);
        $leads = $leads->get();
        $this->leads = $leads;

        if ($totalTasks <= ($skip + $this->taskBoardColumnLength)) {
            $loadStatus = 'hide';
        }
        else {
            $loadStatus = 'show';
        }

        $view = view('deals.board.load_more', $this->data)->render();
        return Reply::dataOnly(['view' => $view, 'load_more' => $loadStatus]);
    }

    public function updateIndex(Request $request)
    {
        $taskIds = $request->taskIds;
        $boardColumnId = $request->boardColumnId;
        $priorities = $request->prioritys;

        $board = LeadStatus::findOrFail($boardColumnId);

        if (isset($taskIds) && count($taskIds) > 0) {

            $taskIds = (array_filter($taskIds, function ($value) {
                return $value !== null;
            }));

            foreach ($taskIds as $key => $taskId) {
                if (!is_null($taskId)) {
                    $task = Lead::findOrFail($taskId);
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
        $setting = UserLeadboardSetting::firstOrNew([
            'user_id' => user()->id,
            'board_column_id' => $request->boardColumnId,
        ]);
        $setting->collapsed = (($request->type == 'minimize') ? 1 : 0);
        $setting->save();

        return Reply::dataOnly(['status' => 'success']);
    }

}
