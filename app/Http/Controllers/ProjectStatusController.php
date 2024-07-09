<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use App\DataTables\ProjectStatusDataTable;
use App\Models\ProjectPmGoal;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Helper\Reply;
use App\Models\Deal;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use App\Models\PmGoalDeadlineExtHistory;
use App\Models\PmGoalExpHistory;
use App\Models\Project;
use App\Models\ProjectPmGoalFile;
use App\Notifications\PmGoalExtendRequestNotification;
use App\Notifications\PmGoalReviewExplanationNotification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
use Auth;
use Notification;

class ProjectStatusController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Project Status';

        $this->middleware(function ($request, $next) {
            abort_403(!in_array($this->user->role_id, [1, 8, 4]));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProjectStatusDataTable $datatable,Request $request)
    {

        $this->project_pm_goals = ProjectPmGoal::all();
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
        //
    }
    public function allProjectPmGoal($id)
    {
        $project_pm_goals = ProjectPmGoal::select('project_pm_goals.*','pm_goal_deadline_ext_histories.id as ext_history_id','pm_goal_deadline_ext_histories.goal_id','pm_goal_deadline_ext_histories.old_deadline','pm_goal_deadline_ext_histories.old_duration','pm_goal_deadline_ext_histories.extension_req_on','pm_goal_deadline_ext_histories.extension_req_for','pm_goal_deadline_ext_histories.extended_pm_reason','pm_goal_deadline_ext_histories.uuid','pm_goal_deadline_ext_histories.screenshot','pm_goal_deadline_ext_histories.extension_req_auth_for','pm_goal_deadline_ext_histories.new_deadline','pm_goal_deadline_ext_histories.new_duration','pm_goal_deadline_ext_histories.extended_admin_comment','pm_goal_deadline_ext_histories.extension_req_auth_on','deadline_authorization_by.id as deadline_authorization_by_id','deadline_authorization_by.name as deadline_authorization_by_name','pm_goal_deadline_ext_histories.auth_status','pm_goal_deadline_ext_histories.extended_day','pm_goal_exp_histories.id as goal_exp_history_id','pm_goal_exp_histories.expired_pm_reason as expired_reason','pm_goal_exp_histories.client_communication','pm_goal_exp_histories.client_communication_rating','pm_goal_exp_histories.negligence_pm','pm_goal_exp_histories.negligence_pm_rating','pm_goal_exp_histories.any_other_suggestion_admin','pm_goal_exp_histories.authorization_status','pm_goal_exp_histories.authorization_on','goal_exp_authorization_by.id as goal_exp_authorization_by_id','goal_exp_authorization_by.name as goal_exp_authorization_by_name')
                            ->leftJoin('pm_goal_deadline_ext_histories','project_pm_goals.id','=','pm_goal_deadline_ext_histories.goal_id')
                            ->leftJoin('pm_goal_exp_histories','project_pm_goals.id','=','pm_goal_exp_histories.goal_id')
                            ->leftJoin('users as deadline_authorization_by','pm_goal_deadline_ext_histories.authorization_by','=','deadline_authorization_by.id')
                            ->leftJoin('users as goal_exp_authorization_by','pm_goal_exp_histories.authorization_by','=','goal_exp_authorization_by.id')
                            ->where('project_pm_goals.project_id',$id)
                            ->groupBy('project_pm_goals.id')
                            ->get();

        // dd($project_pm_goals);
        foreach($project_pm_goals as $goal){
            $pm_goal = PmGoalExpHistory::where('goal_id',$goal->id)->where('authorization_status', '!=', 0)->count();
            $goal_deadline = PmGoalDeadlineExtHistory::where('goal_id',$goal->id)->where('auth_status', '!=', 0)->count();
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
                    'start' => Carbon::parse($goal->goal_end_date),
                    // 'end' => Carbon::parse($goal->goal_end_date)->format('Y-m-d'),
                ];
            }
            return $holidayArray;
        }


        return view('project-status.calendar.index', $this->data);
    }
    public function projectStatusReason(Request $request)
    {
        $validator =  $request->validate([
            'reason' => 'required',

        ], [
            'reason.required' => 'This field is required!',
        ]);
        try {
        \DB::beginTransaction();
        $ppg = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
        $ppg->reason_status = 1;
        $ppg->save();

        $goal_history = new PmGoalExpHistory();
        $goal_history->goal_id = $ppg->id;
        $goal_history->expired_pm_reason = $request->reason;
        $goal_history->save();

        $actions = PendingAction::where('code','PMGM')->where('past_status',0)->where('goal_id',$ppg->id)->get();
        if($actions != null)
        {
            foreach ($actions as $key => $action) {
                    $pm_goal= ProjectPmGoal::where('id',$action->goal_id)->first();
                    $project= Project::where('id',$pm_goal->project_id)->first();
                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();
                    $pm = User::where('id',$pm_goal->pm_id)->first();
                    $client= User::where('id',$pm_goal->client_id)->first();
                    $authorize_by= User::where('id',$action->authorized_by)->first();

                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    $past_action->message = 'Explanation submitted for missed Goal '.$pm_goal->goal_name.' ('.$pm_goal->expired_meet_description.') from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>  by PM <a href="'.route('employees.show',$pm->id).'">'.$pm->name.'</a> !';
                    $past_action->timeframe = $action->timeframe;
                    $past_action->authorization_for = $action->authorization_for;
                    $past_action->authorized_by = $action->authorized_by;
                    $past_action->authorized_at = $action->authorized_at;
                    $past_action->expired_status = $action->expired_status;
                    $past_action->past_status = $action->past_status;
                    $past_action->goal_id = $action->goal_id;
                    $past_action->project_id = $action->project_id;
                    $past_action->client_id = $action->client_id;
                    $past_action->save();
                }
            }
        /** WHEN EXPLANATION PM THEN  */
        $helper = new HelperPendingActionController();
        $helper->PmGoalReviewExplanation($ppg);
        $users  = User::where('role_id',1)->get();
        foreach($users as $user){
            Notification::send($user, new PmGoalReviewExplanationNotification($ppg));
        }
        \DB::commit();
        } catch (\Throwable $th) {
            \DB::rollback();
        }
        return response()->json(['status'=>200]);
    }
    public function projectStatusResolve(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'client_communication' => 'required',
            'client_communication_rating' => 'required',
            'negligence_pm' => 'required',
            'negligence_pm_rating' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            \DB::beginTransaction();
            $ppg = ProjectPmGoal::where('id',$request->project_pm_goal_id)->first();
            $ppg->reason_status = 2;
            $ppg->save();

            $goalHistory = PmGoalExpHistory::where('goal_id',$request->project_pm_goal_id)->first();
            $goalHistory->client_communication = $request->client_communication;
            $goalHistory->client_communication_rating = $request->client_communication_rating;
            $goalHistory->negligence_pm = $request->negligence_pm;
            $goalHistory->negligence_pm_rating = $request->negligence_pm_rating;
            $goalHistory->any_other_suggestion_admin  = $request->any_other_suggestion_admin ;
            $goalHistory->authorization_status = 1;
            $goalHistory->authorization_on = Carbon::now();
            $goalHistory->authorization_by = Auth::user()->id;
            $goalHistory->save();

            $actions = PendingAction::where('code','PMRE')->where('past_status',0)->where('goal_id',$goalHistory->goal_id)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action)
                {
                    $pm_goal= ProjectPmGoal::where('id',$action->goal_id)->first();
                    $project= Project::where('id',$pm_goal->project_id)->first();
                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();
                    $project_manager= User::where('id',$pm_goal->pm_id)->first();
                    $client= User::where('id',$pm_goal->client_id)->first();
                    $authorize_by= User::where('id',$action->authorized_by)->first();

                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    $past_action->message = 'Explanation given by PM on missing goal '. $pm_goal->goal_name .' ('. $pm_goal->expired_meet_description .') for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>  was reviewed by Admin <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> !';
                    $past_action->timeframe = $action->timeframe;
                    $past_action->authorization_for = $action->authorization_for;
                    $past_action->authorized_by = $action->authorized_by;
                    $past_action->authorized_at = $action->authorized_at;
                    $past_action->expired_status = $action->expired_status;
                    $past_action->past_status = $action->past_status;
                    $past_action->goal_id = $action->goal_id;
                    $past_action->project_id = $action->project_id;
                    $past_action->client_id = $action->client_id;
                    $past_action->save();
                }
            }

            \DB::commit();
        } catch (\Throwable $th) {
            \DB::rollback();
        }

        return response()->json(['status'=>200]);
    }

    public function projectStatusExtendRequest($id){
        $this->project_id = $id;
        return view('project-status.modal.extend_request',$this->data);
    }
    public function storePMExtendRequest(Request $request)
    {
        // dd($request->all());
        try {
            \DB::beginTransaction();
            $goal = ProjectPmGoal::where('id', $request->goal_id)->first();
            $goal->extension_status = 1;
            $goal->save();

            $ext_history = new PmGoalDeadlineExtHistory();
            $ext_history->goal_id = $goal->id;
            $ext_history->old_deadline = $goal->goal_end_date;
            $ext_history->old_duration = $goal->duration;
            $ext_history->extended_day = $request->extended_day;
            $ext_history->extension_req_on = Carbon::now();
            $ext_history->extension_req_for = Carbon::parse($goal->goal_end_date)->addDays($request->extended_day);
            $ext_history->extended_pm_reason = $request->is_client_communication;
            $ext_history->uuid = uniqid();
            $ext_history->screenshot = $request->hasFile('screenshot') ? 'yes' : 'no';
            $ext_history->save();

            if ($request->hasFile('screenshot')) {
                $files = $request->file('screenshot');
                $destinationPath = storage_path('app/public/');
                $file_name = [];

                foreach ($files as $file) {
                    $pmGoalFile = new ProjectPmGoalFile();
                    $pmGoalFile->goal_id = $goal->id;
                    $pmGoalFile->project_id = $goal->project_id;
                    $pmGoalFile->uuid = $ext_history->uuid;
                    $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                    array_push($file_name, $filename);
                    $pmGoalFile->file_name = $filename;
                    $pmGoalFile->save();

                    Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                }
            }
            $actions = PendingAction::where('code','PMGE')->where('past_status',0)->where('goal_id',$goal->id)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action)
                {
                    $pm_goal= ProjectPmGoal::where('id',$action->goal_id)->first();
                    $project= Project::where('id',$pm_goal->project_id)->first();
                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();
                    $project_manager= User::where('id',$pm_goal->pm_id)->first();
                    $client= User::where('id',$pm_goal->client_id)->first();
                    $authorize_by= User::where('id',$action->authorized_by)->first();

                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    if($pm_goal->goal_status == 1){
                        $past_action->message = 'Goal '.$pm_goal->goal_name.' ('.$pm_goal->expired_meet_description.') for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a>  from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a>  was met before the expiry time!';
                    }else{
                        $past_action->message = 'Goal '.$pm_goal->goal_name.' ('.$pm_goal->expired_meet_description.') for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> was not met before the expiry time!';
                    }
                    $past_action->timeframe = $action->timeframe;
                    $past_action->authorization_for = $action->authorization_for;
                    $past_action->authorized_by = $action->authorized_by;
                    $past_action->authorized_at = $action->authorized_at;
                    $past_action->expired_status = $action->expired_status;
                    $past_action->past_status = $action->past_status;
                    $past_action->goal_id = $action->goal_id;
                    $past_action->project_id = $action->project_id;
                    $past_action->client_id = $action->client_id;
                    $past_action->save();
                }
            }

            $helper = new HelperPendingActionController();
            $helper->PmGoalExtendRequest($goal);
            $users  = User::where('role_id',1)->get();
            foreach($users as $user){
                Notification::send($user, new PmGoalExtendRequestNotification($goal));
            }

            \DB::commit();
        } catch (\Throwable $th) {
            throw $th;
            \DB::rollback();
        }
        return response()->json(['status'=>200]);
    }
    public function extendImage(Request $request)
    {
        $goal = PmGoalDeadlineExtHistory::where('goal_id',$request->query('goal_id'))->where('uuid',$request->query('uuid'))->first();
        $data = [];
        if($goal->screenshot == 'yes'){
        $data = ProjectPmGoalFile::where('goal_id',$goal->goal_id)->where('uuid',$goal->uuid)->get();

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
    public function acceptOrDenyExtendRequest(Request $request)
    {
        // dd($request->all());
        try {
        \DB::beginTransaction();
            if ($request->status == 1) {
                if ($request->goal_extension_auth_checkbox == 'Apply this extension to all goals') {
                    $pmGoalFinds = ProjectPmGoal::where('project_id', $request->project_id)
                        ->where('goal_status', 0)
                        ->where('expired_status', 0)
                        ->get();


                    foreach ($pmGoalFinds as $item) {
                        $updateGoal = ProjectPmGoal::where('id', $item->id)->first();
                        $updateGoal->goal_end_date = Carbon::parse($updateGoal->goal_end_date)->addDays($request->extended_day);
                        $updateGoal->duration = $updateGoal->duration + $request->extended_day;
                        $updateGoal->extension_status = 0;
                        $updateGoal->save();

                        $deadline_ext_history = PmGoalDeadlineExtHistory::where('goal_id', $request->goal_id)->orderBy('id','desc')->first();
                        if($item->id == $request->goal_id && $deadline_ext_history != null){
                            $deadline_ext_history->extension_req_auth_for = $updateGoal->goal_end_date;
                            $deadline_ext_history->new_deadline = $updateGoal->goal_end_date;
                            $deadline_ext_history->new_duration = $updateGoal->duration;
                            $deadline_ext_history->admin_extended_day = $request->extended_day;
                            $deadline_ext_history->extended_admin_comment = $request->is_any_negligence;
                            $deadline_ext_history->extension_req_auth_on = Carbon::now();
                            $deadline_ext_history->authorization_by = Auth::user()->id;
                            $deadline_ext_history->auth_status = 1;
                            $deadline_ext_history->save();
                        }else{
                            $goal = ProjectPmGoal::where('id', $request->goal_id)->first();
                            $history = new PmGoalDeadlineExtHistory();
                            $history->goal_id = $item->id;
                            $history->old_deadline = $item->goal_end_date;
                            $history->old_duration = $item->duration;
                            $history->extension_req_on = Carbon::now();
                            $history->extension_req_for = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->extended_pm_reason = '<p>Deadline of this goal was automatically extended because ' . Auth::user()->name . ' selected this <strong>' . $request->goal_extension_auth_checkbox . '</strong> while accepting goal extension request on this goal <strong>' . $goal->goal_name . '</strong>.</p>';
                            $history->extended_day = $deadline_ext_history->extended_day;
                            $history->admin_extended_day = $request->extended_day;
                            $history->uuid = uniqid();
                            $history->screenshot = 'no';
                            $history->extension_req_auth_for = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->new_deadline = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->new_duration = $item->duration + $request->extended_day;
                            $history->extended_admin_comment = $request->is_any_negligence;
                            $history->extension_req_auth_on = Carbon::now();
                            $history->authorization_by = Auth::user()->id;
                            $history->auth_status = 1;
                            $history->save();
                        }
                    }
                } else {
                    $updateGoal = ProjectPmGoal::where('id', $request->goal_id)->first();
                    $updateGoal->goal_end_date = Carbon::parse($updateGoal->goal_end_date)->addDays($request->extended_day);
                    $updateGoal->duration = $updateGoal->duration + $request->extended_day;
                    $updateGoal->extension_status = 0;
                    $updateGoal->save();

                    $deadline_ext_history = PmGoalDeadlineExtHistory::where('goal_id', $request->goal_id)->orderBy('id','desc')->first();
                    $deadline_ext_history->extension_req_auth_for = $updateGoal->goal_end_date;
                    $deadline_ext_history->new_deadline = $updateGoal->goal_end_date;
                    $deadline_ext_history->new_duration = $updateGoal->duration;
                    $deadline_ext_history->admin_extended_day = $request->extended_day;
                    $deadline_ext_history->extended_admin_comment = $request->is_any_negligence;
                    $deadline_ext_history->extension_req_auth_on = Carbon::now();
                    $deadline_ext_history->authorization_by = Auth::user()->id;
                    $deadline_ext_history->auth_status = 1;
                    $deadline_ext_history->save();
                }
            } else {
                if ($request->goal_extension_auth_checkbox == 'Apply this extension to all goals') {
                    $pmGoalFinds = ProjectPmGoal::where('project_id', $request->project_id)
                        ->where('goal_status', 0)
                        ->where('expired_status', 0)
                        ->get();

                    foreach ($pmGoalFinds as $item) {
                        $updateGoal = ProjectPmGoal::where('id', $item->id)->first();
                        $updateGoal->goal_end_date = Carbon::parse($updateGoal->goal_end_date)->addDays($request->extended_day);
                        $updateGoal->duration = $updateGoal->duration + $request->extended_day;
                        $updateGoal->extension_status = 0;
                        $updateGoal->save();

                        $deadline_ext_history = PmGoalDeadlineExtHistory::where('goal_id', $request->goal_id)->orderBy('id','desc')->first();
                        if($item->id == $request->goal_id && $deadline_ext_history != null){
                            $deadline_ext_history->extension_req_auth_for = $updateGoal->goal_end_date;
                            $deadline_ext_history->new_deadline = $updateGoal->goal_end_date;
                            $deadline_ext_history->new_duration = $updateGoal->duration;
                            $deadline_ext_history->admin_extended_day = $request->extended_day;
                            $deadline_ext_history->extended_admin_comment = $request->is_any_negligence;
                            $deadline_ext_history->extension_req_auth_on = Carbon::now();
                            $deadline_ext_history->authorization_by = Auth::user()->id;
                            $deadline_ext_history->auth_status = 2;
                            $deadline_ext_history->save();
                        }else{
                            $goal = ProjectPmGoal::where('id', $request->goal_id)->first();
                            $history = new PmGoalDeadlineExtHistory();
                            $history->goal_id = $item->id;
                            $history->old_deadline = $item->goal_end_date;
                            $history->old_duration = $item->duration;
                            $history->extension_req_on = Carbon::now();
                            $history->extension_req_for = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->extended_pm_reason = '<p>Deadline of this goal was automatically extended because ' . Auth::user()->name . ' selected this <strong>' . $request->goal_extension_auth_checkbox . '</strong> while accepting goal extension request on this goal <strong>' . $goal->goal_name . '</strong>.</p>';
                            $history->extended_day = $deadline_ext_history->extended_day;
                            $history->admin_extended_day = $request->extended_day;
                            $history->uuid = uniqid();
                            $history->screenshot = 'no';
                            $history->extension_req_auth_for = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->new_deadline = Carbon::parse($item->goal_end_date)->addDays($request->extended_day);
                            $history->new_duration = $item->duration + $request->extended_day;
                            $history->extended_admin_comment = $request->is_any_negligence;
                            $history->extension_req_auth_on = Carbon::now();
                            $history->authorization_by = Auth::user()->id;
                            $history->auth_status = 1;
                            $history->save();
                        }
                    }
                }else{
                    $updateGoal = ProjectPmGoal::where('id', $request->goal_id)->first();
                    $updateGoal->extension_status = 0;
                    $updateGoal->save();

                    $deadline_ext_history = PmGoalDeadlineExtHistory::where('goal_id', $request->goal_id)->orderBy('id','desc')->first();
                    $deadline_ext_history->extension_req_auth_for = Carbon::parse($updateGoal->goal_end_date)->addDays($request->extended_day);
                    $deadline_ext_history->new_deadline = $updateGoal->goal_end_date;
                    $deadline_ext_history->new_duration = $updateGoal->duration + $request->extended_day;
                    $deadline_ext_history->extended_admin_comment = $request->is_any_negligence;
                    $deadline_ext_history->extension_req_auth_on = Carbon::now();
                    $deadline_ext_history->authorization_by = Auth::user()->id;
                    $deadline_ext_history->auth_status = 2;
                    $deadline_ext_history->save();
                }

            }
            // dd($updateGoal->id);
            $actions = PendingAction::where('code','PMER')->where('past_status',0)->where('goal_id',$request->goal_id)->get();
            // dd($actions);
            if($actions != null)
            {
                foreach ($actions as $key => $action)
                {
                    // dd($action);
                    $pm_goal= ProjectPmGoal::where('id',$action->goal_id)->first();
                    $ext_history= PmGoalDeadlineExtHistory::where('goal_id',$action->goal_id)->first();
                    $project= Project::where('id',$pm_goal->project_id)->first();
                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();

                    $pm= User::where('id',$pm_goal->pm_id)->first();
                    $client= User::where('id',$pm_goal->client_id)->first();
                    $authorize_by= User::where('id',$action->authorized_by)->first();
                    $goal_count = '';
                    if($pm_goal->duration ==3){
                        $goal_count = '1st';
                    }elseif($pm_goal->duration ==7){
                        $goal_count = '2nd';
                    }elseif($pm_goal->duration ==12){
                        $goal_count = '3rd';
                    }elseif($pm_goal->duration ==15){
                        $goal_count = '4th';
                    }elseif($pm_goal->duration ==22){
                        $goal_count = '5th';
                    }else{
                        $goal_count = '6th';
                    }

                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    if($ext_history->auth_status == 2){
                        $past_action->message = 'Goal ('. $goal_count .') (Name: '. $pm_goal->goal_name .') extension request PM <a href="'. route('employees.show', $pm->id) .'">'. $pm->name .'</a> for project (<a href="'. route('projects.show', $project->id) .'">'. $project->project_name .'</a>) from client (<a href="'. route('clients.show', $client->id) .'">'. $client->name .'</a>) was accepted by Admin <a href="'. route('employees.show', $authorize_by->id) .'">'. $authorize_by->name .'</a>!';
                    }
                    if($ext_history->auth_status == 3){
                        $past_action->message = 'Goal ('. $goal_count .') (Name: '. $pm_goal->goal_name .') extension request PM <a href="'. route('employees.show', $pm->id) .'">'. $pm->name .'</a> for project (<a href="'. route('projects.show', $project->id) .'">'. $project->project_name .'</a>) from client (<a href="'. route('clients.show', $client->id) .'">'. $client->name .'</a>) was rejected by Admin <a href="'. route('employees.show', $authorize_by->id) .'">'. $authorize_by->name .'</a>!';
                    }
                    $past_action->timeframe = $action->timeframe;
                    $past_action->authorization_for = $action->authorization_for;
                    $past_action->authorized_by = $action->authorized_by;
                    $past_action->authorized_at = $action->authorized_at;
                    $past_action->expired_status = $action->expired_status;
                    $past_action->past_status = $action->past_status;
                    $past_action->goal_id = $action->goal_id;
                    $past_action->project_id = $action->project_id;
                    $past_action->client_id = $action->client_id;
                    $past_action->save();
                }
            }
            \DB::commit();
            // dd('ok');
        } catch (\Throwable $th) {
            \DB::rollback();
            throw $th;
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

        $pmGoalsQuery = ProjectPmGoal::select('project_pm_goals.*', 'projects.id as projectId', 'projects.project_name', 'deals.actual_amount as project_budget', 'deals.hourly_rate as hourly_rate', 'deals.upsell_actual_amount as project_upsell_budget', 'client.id as clientId', 'client.name as clientName', 'client.image as clientImage', 'pm.id as pmId', 'pm.name as pmName', 'pm.image as pmImage', 'currencies.currency_symbol', DB::raw('count(if(project_pm_goals.goal_status=1, 1, null))/count(project_pm_goals.id)*100 as goal_percentage'))
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
                $goal = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('expired_meet_description',null)->first();
                $goal_count = ProjectPmGoal::where('project_id',$pmGoal->project_id)->count();
                $goal_expire = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('expired_meet_description','!=',null)->where('goal_status',0)->count();
                $goal_meet = ProjectPmGoal::where('project_id',$pmGoal->project_id)->where('goal_status',1)->count();
                $next_goal_date = $goal->goal_end_date ?? '';
                $currentDate = Carbon::now();
                $upcoming_goal_day = $currentDate->diffInDays($next_goal_date);
                $pmGoal->next_goal_date = $next_goal_date;
                $pmGoal->upcoming_goal_day = $upcoming_goal_day;
                $pmGoal->total_goal = $goal_count;
                $pmGoal->goal_expire = $goal_expire;
                $pmGoal->goal_meet = $goal_meet;
                $pmGoal->goal_description = $goal->goal_name ?? '';
                $pmGoal->goal_percentage = round($pmGoal->goal_percentage);
            }

            return response()->json([
                'data'=>$pm_goals,
                'status'=>200
            ]);
    }
    public function extensionHistory($id)
    {
        $data = PmGoalDeadlineExtHistory::select('pm_goal_deadline_ext_histories.*','project_pm_goals.goal_start_date','project_pm_goals.goal_end_date','project_pm_goals.goal_status','project_pm_goals.goal_name','authorization_by.id as authorization_by_id','authorization_by.name as authorization_by_name','authorization_by.image as authorization_by_img')
                ->leftJoin('project_pm_goals','pm_goal_deadline_ext_histories.goal_id','project_pm_goals.id')
                ->leftJoin('users as authorization_by','pm_goal_deadline_ext_histories.authorization_by','authorization_by.id')
                ->where('pm_goal_deadline_ext_histories.goal_id',$id)
                ->where('pm_goal_deadline_ext_histories.auth_status', '>', 0)
                ->get();

        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }
    public function resolvedHistory($id){
        $data = PmGoalExpHistory::select('pm_goal_exp_histories.*','project_pm_goals.goal_start_date','project_pm_goals.goal_end_date','project_pm_goals.duration','project_pm_goals.goal_status','project_pm_goals.expired_meet_description','project_pm_goals.goal_name','authorization_by.id as authorization_by_id','authorization_by.name as authorization_by_name','authorization_by.image as authorization_by_img')
                ->leftJoin('project_pm_goals','pm_goal_exp_histories.goal_id','project_pm_goals.id')
                ->leftJoin('users as authorization_by','pm_goal_exp_histories.authorization_by','authorization_by.id')
                ->where('pm_goal_exp_histories.goal_id',$id)
                ->get();

                return response()->json([
                    'data' => $data,
                    'status' => 200
                ]);
    }
    public function expireGoal($id){
        $pmGoal = ProjectPmGoal::select('project_pm_goals.id','project_pm_goals.goal_name','project_pm_goals.goal_start_date','project_pm_goals.goal_end_date','project_pm_goals.duration','project_pm_goals.expired_meet_description','project_pm_goals.project_category','deals.actual_amount as project_budget','currencies.currency_symbol','projects.id as project_id','projects.project_name','users.id as user_id','users.name as user_name','users.image as user_image', 'project_pm_goals.expired_status', 'project_pm_goals.reason_status')
        ->leftJoin('projects','project_pm_goals.project_id','projects.id')
        ->leftJoin('deals', 'projects.deal_id', '=', 'deals.id')
        ->leftJoin('currencies', 'deals.original_currency_id', '=', 'currencies.id')
        ->leftJoin('users','project_pm_goals.client_id','users.id')
        ->where('project_pm_goals.pm_id',$id)
        ->where('project_pm_goals.expired_status',1)
        ->where('project_pm_goals.reason_status',0)
        ->get();
        return response()->json([
            'data'=>$pmGoal
        ]);
    }
}
