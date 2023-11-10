<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PmGoalSeting;
use Illuminate\Http\Request;

class PmGoalSetingController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'PM Goal Settings';
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->pm_goal = PmGoalSeting::first();
        return view('pm-goal-setting.index',$this->data);
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
        $pmGoal = PmGoalSeting::where('id',$request->id)->first();
        $pmGoal->project_budget_range_to = $request->project_budget_range_to;
        $pmGoal->project_budget_range_from = $request->project_budget_range_from;
        $pmGoal->project_budget_range_name = $request->project_budget_range_name;
        $pmGoal->project_priority_to = $request->project_priority_to;
        $pmGoal->project_priority_from = $request->project_priority_from;
        $pmGoal->project_priority_name = $request->project_priority_name;
        $pmGoal->project_high_priority_to = $request->project_high_priority_to;
        $pmGoal->project_high_priority_from = $request->project_high_priority_from;
        $pmGoal->project_high_priority_name = $request->project_high_priority_name;
        $pmGoal->project_top_most_priority_to = $request->project_top_most_priority_to;
        $pmGoal->project_top_most_priority_from = $request->project_top_most_priority_from;
        $pmGoal->project_top_most_priority_name = $request->project_top_most_priority_name;
        $pmGoal->critically_sensitive_from = $request->critically_sensitive_from_1;
        $pmGoal->critically_sensitive_to = $request->critically_sensitive_to_1;
        $pmGoal->critically_sensitive_name = $request->critically_sensitive_name_1;
        $pmGoal->save();

        return response()->json(['status'=>200]);
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
