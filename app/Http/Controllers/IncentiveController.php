<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserIncentive;
use Auth;
use Illuminate\Http\Request;
use App\Models\GoalSetting;
use App\Models\IncentiveSetting;
use App\Models\Seopage1Team;
use App\Models\CashPoint;
use Carbon\Carbon;

class IncentiveController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Incentive';
        $this->pageIcon = 'ti-file';
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }
        return view('incentives.index', $this->data);
    }

    public function index_json(Request $request)
    {

        if (isset($request->start_date)) {
            $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        }

        if (isset($request->end_date)) {
            $end_date = Carbon::parse($request->end_date)->format('Y-m-d');
        }

        if (Auth::user()->role_id == 8 || Auth::user()->role_id == 7) {
            $userID = Auth::id();
        } else {
            $userID = $request->user_id;
        }
      //  dd($start_date,$end_date);

        $user_shift = Seopage1Team::where([
            ['id', '!=', 1],
            ['members', 'LIKE', '%' . $userID . '%']
        ])->get()->pluck('id');

        $user_shift_goal = GoalSetting::whereIn('team_id', $user_shift)
            ->where('goalType', 'Minimum',)
            ->whereBetween('startDate', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->get()->count();

        $user_goals = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'Minimum',
            'user_id' => $userID,
            'frequency' => $request->period,
            //['created_at', '>=', Carbon::now()->startOfMonth()]
        ])
            ->whereBetween('startDate', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->count();

        $user_goals = $user_shift_goal + $user_goals;
        /*$team_goal = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'Minimum',
            'frequency' => $request->period,
        ])->get();

        foreach ($team_goal as $value) {
            $members = $value->goal->members;
            $members = explode(',', rtrim($members, ','));

            if (in_array($userID, $members)) {
                $user_goals++;
            }
        }*/

        $data['minimum_user_goals_shift'] = $user_goals;

        $user_achieve_goals = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'Minimum',
            'goal_status' => '1',
            'frequency' => $request->period,
            'user_id' => $userID,
        ])
            ->whereBetween('startDate', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->count();

        $team_achieve_goal = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'Minimum',
            'goal_status' => '1',
            ['team_id', '!=', 1]
        ])
            ->whereBetween('startDate', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->get();

        foreach ($team_achieve_goal as $value) {
            $members = $value->goal->members;
            $members = explode(',', rtrim($members, ','));

            if (in_array($userID, $members)) {
                $user_achieve_goals++;
            }
        }
        $data['minimum_user_achieve_goals_shift'] = $user_achieve_goals;

        //minimum team goal you and your shift
        /*$minimum_team_goal = 0;
        $mimimum_team_achieve_goal = 0;



        $minimum_team_goals = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'minimum'

        ])->get();

        foreach ($minimum_team_goals as $value) {
            $members = $value->goal->members;
            $members = explode(',', rtrim($members, ','));

            if (in_array($userID, $members)) {
                if ($value->goal_status == 1) {
                    $mimimum_team_achieve_goal = $mimimum_team_achieve_goal + 1;
                } else {
                    $minimum_team_goal = $minimum_team_goal + 1;
                }
            }
        }
        $data['minimum_team_goal'] = $minimum_team_goal;
        $data['mimimum_team_achieve_goal'] = $mimimum_team_achieve_goal;*/

        /*$teams = Seopage1Team::where('members', 'LIKE', '%'.$this->user->id.'%')->get()->pluck('id')->toArray();
        $team_goals = GoalSetting::whereIn('team_id', array_values($teams))->get();*/

        $team_goals = GoalSetting::where('team_id', 1)
            ->whereDate('startDate', '>=', $start_date)
            ->whereDate('endDate', '<=', $end_date)
            ->get();

        $team_goals_achieve = GoalSetting::where('goal_status', 1)
            ->whereDate('startDate', '>=', $start_date)
            ->whereDate('endDate', '<=', $end_date)
            ->where('team_id', 1)->get();

        $data['minimum_team_goal'] = $team_goals->count();
        $data['mimimum_team_achieve_goal'] = $team_goals_achieve->count();

        //minimum team goal you and your shift

        $incentive_setting = IncentiveSetting::where([
            'incentive_status' => '1',
            'cron_status' => '1'
        ])->first();
        $data['non_incentive_point_above'] = $incentive_setting->every_shift_every_point_above;

        $user_list_for_point_achieve = Seopage1Team::where([
            ['id', '!=', 1],
            ['members', 'LIKE', '%' . $request->user_id . '%']
        ])->get();


        $user_array = [];
        foreach ($user_list_for_point_achieve as $value) {
            $user_lists = explode(',', rtrim($value->members, ','));
            if (in_array($request->user_id, $user_lists)) {
                foreach ($user_lists as $user_id) {
                    array_push($user_array, $user_id);
                }
            }
        }
        $user_array = array_unique($user_array);

        $cash_point = CashPoint::whereIn('user_id', $user_array)
            ->where('points', '>', 0)
            ->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->sum('points');

        $ten_days_incomplete_goal = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'Minimum',
            'frequency' => '10 Days',
            'goal_status' => 0,
            'frequency' => $request->period,
        ])
            ->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
            ->get();


        // $data['deduct_point_for_incomplete_goal'] = 0;
        // foreach ($ten_days_incomplete_goal as $value) {
        //     if(Carbon::today()->get(Carbon::parse($value->startDate)->addDays(10))) {
        //         $deduct_point = ($incentive_setting->incentive_deduction * $cash_point) / 100;
        //         $data['deduct_point_for_incomplete_goal'] = $data['deduct_point_for_incomplete_goal'] + $deduct_point;
        //         $cash_point = $cash_point - $deduct_point;
        //     }
        // }
        //if user can't complete 10 days goal end

        $data['every_shift_team_total_acheive'] = $cash_point;

        $cash_point_total = CashPoint::whereIn('user_id', $user_array)->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->count();
        $cash_point_total_of_this_user = CashPoint::where('user_id', $request->user_id)->where('points', '>', 0)->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])->sum('points');

        $data['incentive_final_amount'] = UserIncentive::where('user_id',$request->user_id)->whereBetween('month', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])->select('final_payable_incentive_amount')->first();
       
        $user_shift= User::where('id',$request->user_id)->first();
        $shift_user= User::where('shift',$user_shift->shift)->where('id','!=',$request->user_id)->first();
        $shift_user_points= Cashpoint::where('user_id',$shift_user->id)->where('points', '>', 0)->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])->sum('points');
        $data['point_achieve_by_your_shift'] = round(($cash_point_total_of_this_user+$shift_user_points),2);

        $data['minimum_goals_of_your_shift']= GoalSetting::where('team_id',$shift_user->shift)->where('goalType','Minimum')->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
        ->get();
        $data['minimum_goals_of_your_shift_achieve']= GoalSetting::where('team_id',$shift_user->shift)->where('goalType','Minimum')->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
        ->get();
        $data['minimum_team_goal_get']= GoalSetting::where('team_id',1)->where('goalType','Minimum')->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
        ->get();
        $data['minimum_team_goal_get_achieved']=  GoalSetting::where('team_id',1)->where('goalType','Minimum')->whereBetween('created_at', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])
        ->get();
        if ($cash_point > 0) {
            $total_percentage_share_incentive = (100 * ($cash_point - $cash_point_total_of_this_user)) / $cash_point;
            //dd($total_percentage_share_incentive);

            $total_percentage_share_incentive_of_this_user = 100 - $total_percentage_share_incentive;
            //dd($total_percentage_share_incentive_of_this_user);

            $data['toal_share_incentive'] = ($data['every_shift_team_total_acheive'] / 100) * $total_percentage_share_incentive;
        } else {
            $data['toal_share_incentive'] = 0;
        }

        $data['point_value'] = $incentive_setting->point_of_value;
        $data['percentage_of_share'] = $total_percentage_share_incentive_of_this_user ?? 0;
        $find_user_incentive = UserIncentive::where('month',$start_date)->where('user_id',$request->user_id)->first();
        if($find_user_incentive != null)
        {
            $data['point_achieve_by_your_shift'] = $find_user_incentive->shift_achieved_points;
            $data['percentage_of_share'] = $find_user_incentive->contribution;
        }
       

        return response()->json($data);
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
    public function DisbursedAmount(Request $request)
    {
       
        if (isset($request->start_date)) {
            $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        }

        if (isset($request->end_date)) {
            $end_date = Carbon::parse($request->end_date)->format('Y-m-d');
        }

        if (Auth::user()->role_id == 8 || Auth::user()->role_id == 7) {
            $userID = Auth::id();
        } else {
            $userID = $request->employee_id;
        }

        $incentive_amount= UserIncentive::where('user_id',$userID)->whereBetween('month', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])->first();
        if ($incentive_amount != null) {
            $data['total_disbursed_amount_during_this_period']= $incentive_amount->final_payable_incentive_amount;
            $data['month']= $incentive_amount->month;
            $data['earned_points']= $incentive_amount->user_point_after_deduction;
            $data['total_points']= $incentive_amount->shift_achieved_points;
            $data['disbursed_Amount']= $incentive_amount->final_payable_incentive_amount;
            $data['held_amount']= $incentive_amount->incentive_held_amount;


        }else {
            $data = [];
        }
       
    //    / dd($data);
        return response()->json($data);



    }


    public function HeldAmount(Request $request)
    {
       
        if (isset($request->start_date)) {
            $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        }

        if (isset($request->end_date)) {
            $end_date = Carbon::parse($request->end_date)->format('Y-m-d');
        }

        if (Auth::user()->role_id == 8 || Auth::user()->role_id == 7) {
            $userID = Auth::id();
        } else {
            $userID = $request->employee_id;
        }

        $incentive_amount= UserIncentive::where('user_id',$userID)->whereBetween('month', [Carbon::parse($request->start_date)->startOfMonth(), Carbon::parse($request->start_date)->endOfMonth()])->first();
        if ($incentive_amount != null) {
            $data['total_held_amount_during_this_period']= $incentive_amount->incentive_held_amount;
            $data['month']= $incentive_amount->month;
            $data['earned_points']= $incentive_amount->user_point_after_deduction;
            $data['total_points']= $incentive_amount->shift_achieved_points;
            $data['disbursed_Amount']= $incentive_amount->final_payable_incentive_amount;
            $data['held_amount']= $incentive_amount->incentive_held_amount;


        }else {
            $data = [];
        }
       
    //    / dd($data);
        return response()->json($data); 

    }
}