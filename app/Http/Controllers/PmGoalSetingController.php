<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PmGoalSetting;
use App\Models\Project;
use Carbon\Carbon;
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
        $this->pmGoalFixed = PmGoalSetting::where('project_type', 'fixed')->get();
        $this->pmGoalHourly = PmGoalSetting::where('project_type', 'hourly')->get();
        $this->categories = Project::$categories;
        // dd($this->data);
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
        //
    }

    public function pmGoalUpdate(Request $request){

        $request->validate([
            'id' => 'required',
            'initial_value' => 'required',
            'end_value' => 'required',
        ]);

        $pmGoal = PmGoalSetting::where('id',$request->id)->first();
        $pmGoal->initial_value = $request->initial_value;
        $pmGoal->end_value = $request->end_value;
        $pmGoal->save();

        return response()->json([
            'status'=>200,
            'pmGoal'=>$pmGoal,
        ]);
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
