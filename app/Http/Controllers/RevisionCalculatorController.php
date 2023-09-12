<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use DB;

class RevisionCalculatorController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Revision Calculator';
        $this->activeSettingMenu = 'revision_calculator';
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
       
        
        return view('revision-calculator.index',$this->data);
    }
    public function getData(Request $request)
    {
        //dd($request->all());
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        
        // Check if $startDate and $endDate are not null and valid dates
        if ($startDate && $endDate) {
            $project_managers = DB::table('projects')->select([
                'pm.id as project_manager_id',
                'pm.name as project_manager_name',
                DB::raw('(SELECT COUNT(projects.id) FROM projects WHERE projects.pm_id = pm.id AND DATE(projects.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as project_count'),
                DB::raw('(SELECT SUM(projects.project_budget) FROM projects WHERE projects.pm_id = pm.id AND DATE(projects.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as total_project_value'),
                DB::raw('(SELECT COUNT(tasks.id) FROM tasks WHERE tasks.project_id = projects.id AND DATE(tasks.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as total_tasks'),
            ])
            ->leftJoin('users as pm', 'pm.id', 'projects.pm_id')
            ->leftJoin('tasks', 'tasks.project_id', 'projects.id')
            ->groupBy('pm.id')
            ->where('role_id', 4)
            ->get();
        
            dd($project_managers);
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
