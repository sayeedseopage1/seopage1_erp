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
use App\Models\ProjectPmGoalFile;
use Illuminate\Support\Facades\Storage;

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
    public function show($id)
    {
        $this->pageTitle = 'Goal Details';
        $this->project_pm_goals = ProjectPmGoal::where('project_id',$id)->get();
        return view('project-status.modal.goal_details',$this->data);
       

      
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
        // dd($request->all());
        // $this->viewPermission = user()->permission('view_holiday');

        // abort_403(!($this->viewPermission == 'all' || $this->viewPermission == 'added'));

        $this->pageTitle = 'app.menu.calendar';
       // dd(request('start'), request('end'));

       
            $holidayArray = array();

            // $holidays = Holiday::orderBy('date', 'ASC');
            $pm_goals= ProjectPmGoal::orderBy('date','ASC');

            // if (request()->searchText != '') {
            //     $holidays->where('holidays.occassion', 'like', '%' . request()->searchText . '%');
            // }

            //$holidays = $holidays->get();
            $pm_goals= ProjectPmGoal::get();
           // dd($pm_goals);

            foreach ($pm_goals as $key => $goal) {

                $holidayArray[] = [
                    'id' => $goal->id,
                    'title' => $goal->goal_name,
                    'start' => Carbon::parse($goal->goal_start_date)->format('Y-m-d'),
                    'end' => Carbon::parse($goal->goal_end_date)->format('Y-m-d'),
                ];
            }
        //   /  dd($holidayArray);

            return $holidayArray;
        

        return view('project-status.calendar.index', $this->data);
    }
    public function projectStatusReason(Request $request){
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
        $validator =  $request->validate([
            'rating' => 'required',
            'suggestion' => 'required',
            'comment' => 'required',

        ], [
            'rating.required' => 'This field is required!',
            'suggestion.required' => 'This field is required!',
            'comment.required' => 'This field is required!',
        ]);
        $projectPG = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
        $projectPG->rating = $request->rating;
        $projectPG->suggestion = $request->suggestion;
        $projectPG->admin_comment = $request->comment;
        $projectPG->reason_status = 2;
        $projectPG->save();

        return response()->json(['status'=>200]);
    }

    public function projectStatusExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.extend_request',$this->data);
    }
    public function storePMExtendRequest(Request $request){
        // \DB::beginTransaction();
        $validator =  $request->validate([
            'screenshot' => 'required',
            'extended_day' => 'required',
            'is_client_communication' => 'required',

        ], [
            'screenshot.required' => 'This field is required!',
            'extended_day.required' => 'This field is required!',
            'is_client_communication.required' => 'This field is required!',
        ]);
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

    public function reviewExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.review_extend_request',$this->data);
    }
    public function acceptOrDenyExtendRequest(Request $request){
        // \DB::beginTransaction();
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
}
