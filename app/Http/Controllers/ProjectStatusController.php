<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use App\DataTables\ProjectStatusDataTable;
use App\Models\ProjectPmGoal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Helper\Reply;
use App\Models\Deal;
use App\Models\PmGoalDeadlineExtHistory;
use App\Models\PmGoalExpHistory;
use App\Models\Project;
use App\Models\ProjectPmGoalFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
use Auth;

class ProjectStatusController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Project Status';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProjectStatusDataTable $datatable,Request $request)
    {
       
        $this->project_pm_goals = ProjectPmGoal::all();
        // if (!is_null($request->id)) {
        //     $this->projectId = $request->id;
        // }else{
        //     $this->projectId = null;
        // }
        return $datatable->render('project-status.index',$this->data);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        //
    }
    public function allProjectPmGoal($id)
    {
        $project_pm_goals = ProjectPmGoal::where('project_id',$id)->get();

        foreach($project_pm_goals as $goal){
            $pm_goal = PmGoalExpHistory::where('goal_id',$goal->id)->count();
            $goal_deadline = PmGoalDeadlineExtHistory::where('goal_id',$goal->id)->count();
            $goal->goal_expired_history = $pm_goal;
            $goal->goal_extension_history = $goal_deadline;
        }

        return response()->json([
            'data' => $project_pm_goals,
            'status' => 200
        ]);
       

      
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function projectStatusCalendar(Request $request)
    {
        $this->pageTitle = 'app.menu.calendar';
        if (request('start') && request('end')) {
            $holidayArray = array();

            $holidays = Holiday::orderBy('date', 'ASC');

            if (request()->searchText != '') {
                $holidays->where('holidays.occassion', 'like', '%' . request()->searchText . '%');
            }

            $pm_goals= ProjectPmGoal::get();

            foreach ($pm_goals as $key => $goal) { 
                $project = Project::find($goal->project_id);
                $client = User::where('id',$project->client_id)->first();
                $holidayArray[] = [
                    'id' => $goal->id,
                    'title' => $project->project_name. ' ('.$client->name.') ('.\Str::limit($goal->goal_name,25).')',
                    'start' => Carbon::parse($goal->goal_start_date)->format('Y-m-d'),
                    // 'end' => Carbon::parse($goal->goal_end_date)->format('Y-m-d'),
                ];
            }
            return $holidayArray;
        }
 

        return view('project-status.calendar.index', $this->data);
    }
    public function projectStatusReason(Request $request){
        // dd($request->all());
        $validator =  $request->validate([
            'reason' => 'required',

        ], [
            'reason.required' => 'This field is required!',
        ]);
        $ppg = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
        $ppg->reason = $request->reason;
        $ppg->reason_status = 1;
        $ppg->save();

        return response()->json(['status'=>200]);
    }
    public function projectStatusResolve(Request $request){
        // dd($request->all());


        // \DB::beginTransaction();
        $validator = Validator::make($request->all(), [
            'client_communication' => 'required',
            'client_communication_rating' => 'required',
            'negligence_pm' => 'required',
            'negligence_pm_rating' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $projectPG = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
        $projectPG->client_communication = $request->client_communication;
        $projectPG->client_communication_rating = $request->client_communication_rating;
        $projectPG->negligence_pm = $request->negligence_pm;
        $projectPG->negligence_pm_rating = $request->negligence_pm_rating;
        $projectPG->reason_status = 2;
        $projectPG->save();

        $project = Project::where('id',$projectPG->project_id)->first();
        $deal = Deal::where('id',$project->deal_id)->first();
        $goalHistory = new PmGoalExpHistory();
        $goalHistory->goal_id = $projectPG->id;
        $goalHistory->start_date = $projectPG->goal_start_date;
        $goalHistory->deadline = $projectPG->goal_end_date;
        $goalHistory->description = $projectPG->description;
        $goalHistory->duration = $projectPG->duration;
        $goalHistory->goal_status = $projectPG->goal_status;
        $goalHistory->reason = $projectPG->reason;
        $goalHistory->client_communication = $request->client_communication;
        $goalHistory->negligence_pm = $request->negligence_pm;
        $goalHistory->client_communication_rating = $request->client_communication_rating;
        $goalHistory->negligence_pm_rating = $request->negligence_pm_rating;
        $goalHistory->authorization_status = 1;
        $goalHistory->authorization_on = Carbon::now();
        $goalHistory->authorization_by = Auth::user()->id;
        $goalHistory->save();

        return response()->json(['status'=>200]);
    }

    public function projectStatusExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.extend_request',$this->data);
    }
    public function storePMExtendRequest(Request $request){
        // dd($request->all());
        // \DB::beginTransaction();

        $goal = ProjectPmGoal::where('id', $request->goal_id)->first();
        $goal->extended_reason = $request->is_client_communication;
        $goal->extended_day = $request->extended_day;
        $goal->extension_req_on = Carbon::now();
        $goal->extended_request_status = 1;
        $goal->screenshot = $request->hasFile('screenshot') ? 'yes' : 'no';
        $goal->save();

        
        if ($request->hasFile('screenshot')) {
            $files = $request->file('screenshot');
            $destinationPath = storage_path('app/public/');
            $file_name = [];

            foreach ($files as $file) {
                $pmGoalFile = new ProjectPmGoalFile();
                $pmGoalFile->goal_id = $goal->id;
                $pmGoalFile->project_id = $goal->project_id;
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                array_push($file_name, $filename);
                $pmGoalFile->file_name = $filename;
                $pmGoalFile->save();

                Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
            }
        }
        return response()->json(['status'=>200]);
    }
    public function extendImage($id){
        $goal = ProjectPmGoal::where('id',$id)->first();
        $data = [];
        if($goal->screenshot == 'yes'){
        $data = ProjectPmGoalFile::where('goal_id',$id)->get();
        }
        
        return response()->json([
            'status'=>200,
            'data'=>$data
        ]);
    }

    public function reviewExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.review_extend_request',$this->data);
    }
    public function acceptOrDenyExtendRequest(Request $request){
        // dd($request->all());
        if($request->status==1){
            $updateGoal = ProjectPmGoal::where('id',$request->goal_id)->first();
            $updateGoal->extended_goal_end_day = Carbon::parse($updateGoal->goal_end_date)->addDay($request->extended_day);
            $updateGoal->extended_admin_cmnt = $request->is_any_negligence;
            $updateGoal->extended_request_status = 2;
            $updateGoal->save();

            $deadline_ext_history = new PmGoalDeadlineExtHistory();
            $deadline_ext_history->goal_id = $updateGoal->id;
            $deadline_ext_history->start_date = $updateGoal->goal_start_date;
            $deadline_ext_history->old_deadline = $updateGoal->goal_end_date;
            $deadline_ext_history->new_deadline = $updateGoal->extended_goal_end_day;
            $deadline_ext_history->duration = $updateGoal->duration;
            $deadline_ext_history->description = $updateGoal->description;
            $deadline_ext_history->goal_status = $updateGoal->goal_status;
            $deadline_ext_history->extended_admin_cmnt = $request->is_any_negligence;
            $deadline_ext_history->extension_req_on = $updateGoal->extension_req_on;
            $deadline_ext_history->extension_req_for = $updateGoal->extended_day;
            $deadline_ext_history->extension_req_auth_on = Carbon::now(); 
            $deadline_ext_history->extension_req_auth_for = $request->extended_day; 
            $deadline_ext_history->authorization_by = Auth::user()->id; 
            $deadline_ext_history->auth_status = 1; 
            $deadline_ext_history->save();
        }else{
            $updateGoal = ProjectPmGoal::where('id',$request->goal_id)->first();
            $updateGoal->extended_admin_cmnt = $request->is_any_negligence;
            $updateGoal->extended_request_status = 3;
            $updateGoal->save();

            $deadline_ext_history = new PmGoalDeadlineExtHistory();
            $deadline_ext_history->goal_id = $updateGoal->id;
            $deadline_ext_history->start_date = $updateGoal->goal_start_date;
            $deadline_ext_history->old_deadline = $updateGoal->goal_end_date;
            $deadline_ext_history->duration = $updateGoal->duration;
            $deadline_ext_history->description = $updateGoal->extended_admin_cmnt;
            $deadline_ext_history->goal_status = $updateGoal->goal_status;
            $deadline_ext_history->extended_admin_cmnt = $request->is_any_negligence;
            $deadline_ext_history->extension_req_on = $updateGoal->extension_req_on;
            $deadline_ext_history->extension_req_for = $updateGoal->extended_day;
            $deadline_ext_history->extension_req_auth_on = Carbon::now(); 
            $deadline_ext_history->extension_req_auth_for = $request->extended_day; 
            $deadline_ext_history->authorization_by = Auth::user()->id; 
            $deadline_ext_history->auth_status = 2;
            $deadline_ext_history->save();
        }
        return response()->json(['status'=>200]);
    }
    public function calendarShow($id)
    {
        $this->project_status = $id;

        $this->pageTitle = __('Project Status');

        if (request()->ajax()) {
            $html = view('project-status.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'project-status.show';

        return view('project-status.index', $this->data);

    }
    public function allProjectStatus(Request $request){
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;
        $limit = $request->limit ??  10;

        $pmGoalsQuery = ProjectPmGoal::select('project_pm_goals.*','projects.id as projectId','projects.project_name','deals.actual_amount as project_budget', 'client.id as clientId','client.name as clientName','client.image as clientImage','pm.id as pmId','pm.name as pmName','pm.image as pmImage','currencies.currency_symbol')
            ->leftJoin('projects', 'project_pm_goals.project_id', '=', 'projects.id')
            ->leftJoin('deals', 'projects.deal_id', '=', 'deals.id')
            ->leftJoin('currencies', 'deals.original_currency_id', '=', 'currencies.id')
            ->leftJoin('users as client', 'projects.client_id', '=', 'client.id')
            ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
            ->groupBy('projects.id');

            if ($startDate !== null && $endDate !== null) {
                $pmGoalsQuery->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween(DB::raw('DATE(project_pm_goals.`created_at`)'), [$startDate, $endDate]);
                    $query->orWhereBetween(DB::raw('DATE(project_pm_goals.`updated_at`)'), [$startDate, $endDate]);
                });
            }
            if ($request->search != '') {
                $pmGoalsQuery->where(function ($query) {
                    $query->where('project_pm_goals.project_id', 'like', '%' . request('search') . '%')
                    ->orWhere('projects.project_name', 'like', '%' . request('search') . '%')
                    ->orWhere('client.name', 'like', '%' . request('search') . '%')
                    ->orWhere('pm.name', 'like', '%' . request('search') . '%');
                });
            }
            if ($request->client_id != null) {
                $pmGoalsQuery->where('project_pm_goals.client_id', $request->client_id);
            }
            if ($request->pm_id != null) {
                $pmGoalsQuery->where('project_pm_goals.pm_id', $request->pm_id);
            }
            $pm_goals = $pmGoalsQuery
            ->orderBy('project_pm_goals.id', 'desc')
            ->paginate($limit);

            foreach($pm_goals as $pmGoal){
                $goal = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('description',null)->first();
                $goal_count = ProjectPmGoal::where('project_id',$pmGoal->project_id)->count();
                $goal_expire = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('description','!=',null)->where('goal_status',0)->count();
                $goal_meet = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('goal_status',1)->count();
                $next_goal_date = $goal->goal_end_date;
                $currentDate = Carbon::now();
                $upcoming_goal_day = $currentDate->diffInDays($next_goal_date);
                $pmGoal->next_goal_date = $next_goal_date;
                $pmGoal->upcoming_goal_day = $upcoming_goal_day;
                $pmGoal->total_goal = $goal_count;
                $pmGoal->goal_expire = $goal_expire;
                $pmGoal->goal_meet = $goal_meet;
            }

            return response()->json([
                'data'=>$pm_goals,
                'status'=>200
            ]);
    }
    public function extensionHistory($id){
        $data = PmGoalDeadlineExtHistory::select('pm_goal_deadline_ext_histories.*','authorization_by.id as authorization_by_id','authorization_by.name as authorization_by_name','authorization_by.image as authorization_by_img')
                ->leftJoin('users as authorization_by','pm_goal_deadline_ext_histories.authorization_by','authorization_by.id')
                ->where('pm_goal_deadline_ext_histories.goal_id',$id)
                ->get();


                return response()->json([
                    'data' => $data,
                    'status' => 200
                ]);
    }
    public function resolvedHistory($id){
        $data = PmGoalExpHistory::select('pm_goal_exp_histories.*','authorization_by.id as authorization_by_id','authorization_by.name as authorization_by_name','authorization_by.image as authorization_by_img')
                ->leftJoin('users as authorization_by','pm_goal_exp_histories.authorization_by','authorization_by.id')
                ->where('pm_goal_exp_histories.goal_id',$id)
                ->get();

                return response()->json([
                    'data' => $data,
                    'status' => 200
                ]);
    }
}