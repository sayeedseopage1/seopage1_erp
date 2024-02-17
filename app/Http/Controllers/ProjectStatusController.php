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
use App\Models\Project;
use App\Models\ProjectPmGoalFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;

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
            'rating' => 'required',
            'suggestion' => 'required',
            'comment' => 'required',

        ], [
            'rating.required' => 'This field is required!',
            'suggestion.required' => 'This field is required!',
            'comment.required' => 'This field is required!',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $projectPG = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
        $projectPG->rating = $request->rating;
        $projectPG->suggestion = $request->suggestion;
        $projectPG->admin_comment = $request->comment;
        $projectPG->reason_status = 2;
        $projectPG->save();

        // dd($projectPG)

        return response()->json(['status'=>200]);
    }

    public function projectStatusExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.extend_request',$this->data);
    }
    public function storePMExtendRequest(Request $request){
        dd($request->all());
        // \DB::beginTransaction();
        $pmGoals = ProjectPmGoal::where('project_id',$request->project_id)->get();
        $goal = '';
        foreach($pmGoals as $pmGoal){
            $goal = ProjectPmGoal::where('id', $pmGoal->id)->first();
            $goal->is_client_communication = $request->is_client_communication;
            $goal->extended_day = $request->extended_day;
            $goal->extended_request_status = 1;
            $goal->save();
        }

        if ($request->hasFile('screenshot')) {
            $files = $request->file('screenshot');
            $destinationPath = storage_path('app/public/');
            $file_name = [];

            foreach ($files as $file) {
                $pmGoalFile = new ProjectPmGoalFile();
                $pmGoalFile->goal_id = $goal->id;
                $pmGoalFile->project_id = $request->project_id;
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                array_push($file_name, $filename);
                $pmGoalFile->file_name = $filename;
                $pmGoalFile->save();

                Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
            }
        }

        // dd('ok');
        
        return response()->json(['status'=>200]);
    }
    public function extendImage($id){
        $projectFile = ProjectPmGoalFile::where('project_id',$id)->get();
        return response()->json([
            'status'=>200,
            'data'=>$projectFile
        ]);
    }

    public function reviewExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.review_extend_request',$this->data);
    }
    public function acceptOrDenyExtendRequest(Request $request){
        // \DB::beginTransaction();
        // dd($request->all());
        $pmGoalFinds = ProjectPmGoal::where('project_id',$request->project_id)->get();
        $updateGoal = '';
        if($request->status==1){
            foreach($pmGoalFinds as $item){
                $updateGoal = ProjectPmGoal::where('id',$item->id)->first();
                $updateGoal->extended_goal_end_day = Carbon::parse($item->goal_end_date)->addDay($request->extended_day);
                $updateGoal->is_any_negligence = $request->is_any_negligence;
                $updateGoal->extended_request_status = 2;
                $updateGoal->save();
            }
        }else{
            foreach($pmGoalFinds as $item){
                $updateGoal = ProjectPmGoal::where('id',$item->id)->first();
                $updateGoal->is_any_negligence = $request->is_any_negligence;
                $updateGoal->extended_request_status = 3;
                $updateGoal->save();
            }
        }
        
        // dd($updateGoal->extended_goal_end_day);
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

        $pmGoalsQuery = ProjectPmGoal::select('project_pm_goals.*','projects.id as projectId','projects.project_name','projects.project_budget', 'client.id as clientId','client.name as clientName','client.image as clientImage','pm.id as pmId','pm.name as pmName','pm.image as pmImage','currencies.currency_symbol')
            ->leftJoin('projects', 'project_pm_goals.project_id', '=', 'projects.id')
            ->leftJoin('currencies', 'projects.currency_id', '=', 'currencies.id')
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
            return response()->json([
                'data'=>$pm_goals,
                'status'=>200
            ]);
    }
}
