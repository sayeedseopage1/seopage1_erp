<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
        return view('incentives.index', $this->data);
    }

    public function index_json(Request $request)
    {
        //dd($request);
        if (isset($request->start_date)) {
            $start_date = Carbon::parse($request->start_date)->format('Y-m-d');
        }
        if (isset($request->end->date)) {
            $end_date = Carbon::parse($request->end_date)->format('Y-m-d');
        }
        if (Auth::user()->role_id == 8 || Auth::user()->role_id == 7 ) {
            $userID = Auth::id();
        }else 
        {
            $userID = $request->user_id;
        }
      

        $user_goals = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'minimum',
            'user_id' => $userID,
            ['created_at', '>=', Carbon::now()->startOfMonth()]
        ])->count();

        $team_goal = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'minimum'
        ])->get();
        
        foreach ($team_goal as $value) {
            $members = $value->goal->members;
            $members = explode(',', rtrim($members, ','));
            
            if (in_array($userID, $members)) {
                $user_goals++;
            }
        }

        $data['minimum_user_goals_shift'] = $user_goals;

        $user_achieve_goals = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'minimum',
            'goal_status' => '1',
            'user_id' => $userID
        ])->count();

        $team_achieve_goal = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'minimum',
            'goal_status' => '1'
        ])->get();
        
        foreach ($team_achieve_goal as $value) {
            $members = $value->goal->members;
            $members = explode(',', rtrim($members, ','));
            
            if (in_array($userID, $members)) {
                $user_achieve_goals++;
            }
        }
        $data['minimum_user_achieve_goals_shift'] = $user_achieve_goals;


        $minimum_team_goal = 0;
        $mimimum_team_achieve_goal = 0;

        $minimum_team_goals = GoalSetting::where([
            'assigneeType' => 'Team',
            'goalType' => 'minimum',
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
        $data['mimimum_team_achieve_goal'] = $mimimum_team_achieve_goal;


        $incentive_setting = IncentiveSetting::first();
        $data['non_incentive_point_above'] = $incentive_setting->every_shift_every_point_above;
       // dd($data['non_incentive_point_above']);

        $user_list_for_point_achieve = Seopage1Team::where('id', '!=', 1)->get();
        //dd($user_list_for_point_achieve);

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
    //    / dd($user_array);

        $cash_point = CashPoint::whereIn('user_id', $user_array)->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->sum('points');
    //    / dd($cash_point);

        //if user can't complete 10 days goal
        $ten_days_incomplete_goal = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'minimum',
            'frequency' => '10 Days',
            'goal_status' => 0
        ])
        ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
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
   // dd($data['every_shift_team_total_acheive']);

        $cash_point_total = CashPoint::whereIn('user_id', $user_array)->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->count();
        // $cash_point_total_of_this_user = CashPoint::where('user_id', $request->user_id)->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->count();
        $cash_point_total_of_this_user = CashPoint::where('user_id', $request->user_id)->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->sum('points');
        // /$data['point_achieve_by_your_shift'] = $cash_point_total;
        $data['point_achieve_by_your_shift'] = round($cash_point,2);
    // dd($data['point_achieve_by_your_shift'], $cash_point_total_of_this_user);
        if ($cash_point > 0) {
            // $total_percentage_share_incentive = (100 * ($cash_point_total - $cash_point_total_of_this_user)) / $cash_point_total ;
            $total_percentage_share_incentive = (100 * ($cash_point - $cash_point_total_of_this_user)) / $cash_point ;
           
            $total_percentage_share_incentive_of_this_user = 100 - $total_percentage_share_incentive;
           // dd($total_percentage_share_incentive,$total_percentage_share_incentive_of_this_user);

            $data['toal_share_incentive'] = ($data['every_shift_team_total_acheive'] / 100) * $total_percentage_share_incentive;
        } else {
            $data['toal_share_incentive'] = 0;
        }
       // dd($data['toal_share_incentive']);
       $data['point_value']= $incentive_setting->point_of_value;
       $data['percentage_of_share']= $total_percentage_share_incentive_of_this_user;
        
       // dd($data);
        
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


  
}
