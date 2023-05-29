<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportCentralController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Report Central';
        $this->activeSettingMenu = 'report_central';
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
    public function performancePredefinedCycle(){
        $this->pageTitle = 'Performance Predefined Cycle';
        return view('report-central.project-managers.performance-predefined-cycle',$this->data);
    }
    public function performanceRealTime(){
        $this->pageTitle = 'Performance Real Time';
        return view('report-central.project-managers.performance-real-time',$this->data);
    }
    public function revisionCalculator(){
        $this->pageTitle = 'Revision Calculator';
        return view('report-central.project-managers.revision-calculator',$this->data);
    }
    public function rewardPoint(){
        $this->pageTitle = 'Reward Point';
        return view('report-central.project-managers.reward-point',$this->data);
    }
    public function graphs(){
        $this->pageTitle = 'Graphs';
        return view('report-central.project-managers.graphs',$this->data);
    }
    public function deliverableIssues(){
        $this->pageTitle = 'Deliverable Issues';
        return view('report-central.project-managers.deliverable-issues',$this->data);
    }
    public function performance(){
        $this->pageTitle = 'Performance';
        return view('report-central.lead-developers.performance',$this->data);
    }
    public function rewardPoint2(){
        $this->pageTitle = 'Reward Point';
        return view('report-central.lead-developers.reward-point',$this->data);
    }
    public function performance2(){
        $this->pageTitle = 'Performance';
        return view('report-central.developers.performance',$this->data);
    }
    public function bandwidth(){
        $this->pageTitle = 'Bandwidth';
        return view('report-central.developers.bandwidth',$this->data);
    }
    public function revisions(){
        $this->pageTitle = 'Revisions';
        return view('report-central.developers.revisions',$this->data);
    }
    public function rewardPoint3(){
        $this->pageTitle = 'Reward Point';
        return view('report-central.developers.reward-point',$this->data);
    }
    public function graphs2(){
        $this->pageTitle = 'Graphs';
        return view('report-central.developers.graphs',$this->data);
    }
    public function timeLog(){
        $this->pageTitle = 'Time Log';
        return view('report-central.developers.time-log',$this->data);
    }
    public function index()
    {
        //
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
