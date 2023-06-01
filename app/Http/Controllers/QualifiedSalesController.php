<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use App\Models\Deal;
use App\Models\Project;
use App\Models\DealStage;
use App\Models\User;
use Auth;
use Carbon\Carbon;


class QualifiedSalesController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Qualified Sales';
        $this->activeSettingMenu = 'qualified-sales';
       
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd($request->all());
    //    / dd("nsdkasndkasnd");
    $this->projects = Project::select([
        'projects.id as id',
        'deals.updated_at as date',
        'pm.id as pm_id',
        'pm.name as pm_name',
        'projects.project_name as project_name',
        'projects.project_budget as project_budget',
        'client.id as client_id',
        'client.name as client_name',
        'contact_form.id as contact_form',
        'deals.deal_id as deal_short_code',
        'contact_form.name as contact_form_name',
        'deals.submission_status as submission_status',
        'deals.authorization_status as authorized_by_sales_lead',
        'projects.deliverable_authorization as authorized_by_top_management',
        'deals.status as status',
        'deals.requirment_define as sales_lead_requirement_define',
        'deals.price_authorization as sales_lead_price_authorization',
        'projects.requirement_defined as project_manager_requirement_define',
        'projects.deadline_meet as project_manager_deadline_define',
        'deals.project_deadline_authorization as sales_lead_deadline_define',
        'projects.admin_authorization_comment as top_management_comment',
        
        DB::raw('(SELECT SUM(points) FROM cash_points WHERE project_id = projects.id) as total_points'),


        // / DB::raw('SUM(cash_points.points) as total_cash_points'),

       
    ])

    ->join('deals', 'deals.id', 'projects.deal_id')

    ->join('users as pm', 'pm.id', '=', 'projects.pm_id')
    ->join('users as client', 'client.id', '=', 'projects.client_id')
    ->join('users as contact_form', 'contact_form.id', '=', 'deals.added_by')
    // /->join('cash_points','cash_points.project_id','projects.id')
    //->groupBy

    ->orderBy('projects.id','desc')->get()
    ;
    if($request->mode == 'json')
    {
        return response()->json($this->projects);

    }
   
    // /dd($projects);

        return view('qualified-sales.index',$this->data);
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
