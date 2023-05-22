<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GoalSetting;
use App\Models\IncentiveSetting;
use App\Models\Seopage1Team;
use App\Models\CashPoint;

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
    public function index($take_json = null)
    {
        $userID = $this->user->id;

        $user_goals = GoalSetting::where([
            'assigneeType' => 'User',
            'goalType' => 'minimum',
            'user_id' => $userID
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
        $data['every_shift_every_point_above'] = $incentive_setting->every_shift_every_point_above;

        $user_list_for_point_achieve = Seopage1Team::where('id', '!=', 1)->get();

        $user_array = [];
        foreach ($user_list_for_point_achieve as $value) {
            $user_lists = explode(',', rtrim($value->members, ','));

            foreach ($user_lists as $user_id) {
                array_push($user_array, $user_id);
            }
        }
        $user_array = array_unique($user_array);

        $cash_point = CashPoint::whereIn('user_id', $user_array)->sum('points');
        $cash_point_total = CashPoint::whereIn('user_id', $user_array)->count();
        $total_contributor = 0;

        foreach ($user_array as $key => $value) {
            $total_data = CashPoint::where('user_id', $value)->count();
            $total_contributor = $total_contributor + $total_data;
        }
        
        //$user_get = 
        $data['every_shift_team_total_acheive'] = $cash_point;
        $data['total_contributor'] = $total_contributor;

        //$data['incentive_amount_for_shift'] = ($data['every_shift_team_total_acheive'] - $data['every_shift_every_point_above']) * $incentive_setting->point_of_value;

        if (is_null($take_json)) {
            return view('incentives.index', $this->data);
        } else {
            return response()->json($data);
        }
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
