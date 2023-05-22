<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IncentiveSetting;
use Illuminate\Http\Request;

class IncentiveSettingController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Incentive Settings';
        $this->activeSettingMenu = 'incentive_settings';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->incentive_setting = IncentiveSetting::first();
        return view('incentive-settings.index',$this->data);
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
        $incentive_setting = IncentiveSetting::find($id);
        $incentive_setting->every_shift_every_point_above = $request->every_shift_every_point_above;
        $incentive_setting->individual_goal_percentage = $request->individual_goal_percentage;
        $incentive_setting->point_of_value = $request->point_of_value;
        $incentive_setting->point_of_contribute = $request->point_of_contribute;
        $incentive_setting->incentive_deduction = $request->incentive_deduction;
        
        $incentive_setting->save();

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
