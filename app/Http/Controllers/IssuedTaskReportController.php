<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DeveloperReportIssue;
use Illuminate\Http\Request;
use Carbon\Carbon;


class IssuedTaskReportController extends AccountBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->pageTitle = 'Tasks Reports';
        return view('tasks-report.index',$this->data);
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

    public function getTaskReport(Request $request){

        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $employeeId = $request->input('report_issuer_id', null);
        $accuntableId = $request->input('accountable_individual_id', null);
        $clientId = $request->input('client_id', null);    
        $projectId = $request->input('project_id', null);
        $issues= DeveloperReportIssue::select('developer_report_issues.id','developer_report_issues.created_at as report_date',
        'developer_report_issues.updated_at as resolved_on','report_issuer.id as report_issuer_id','report_issuer.name as report_issuer_name',
        'report_issuer.image as report_issuer_avatar','tasks.id as taskId','tasks.heading as task_heading','accountable.id as accountable_id','accountable.name as accountable_name',
        'accountable.image as accountable_avatar','projects.id as projectId','projects.project_name as project_name','client.id as clientId','client.name as client_name','client.image as client_avatar',
        'developer_report_issues.reason as report_reason','developer_report_issues.comment as report_reason_details','developer_report_issues.status',
        'developer_report_issues.previousNotedIssue'

        
        )->join('users as report_issuer','report_issuer.id','developer_report_issues.added_by')
        ->leftJoin('users as accountable','accountable.id','developer_report_issues.person')
        ->leftJoin('tasks','tasks.id','developer_report_issues.task_id')
        ->leftJoin('projects','projects.id','tasks.project_id')
        ->leftJoin('users as client','client.id','projects.client_id');
        if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
        {


            $issues = $issues->whereDate('developer_report_issues.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'));

        }else
        {
            if (!is_null($startDate)) {
                $issues = $issues->whereDate('developer_report_issues.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
            }
            if (!is_null($endDate)) {
                $issues = $issues->whereDate('developer_report_issues.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
            }

        }
        if (!is_null($projectId)) {
            $issues = $issues->where('projects.id', $projectId);
        }
        if (!is_null($employeeId)) {
            $issues = $issues->where('developer_report_issues.added_by', $employeeId);
        }
        // // if (!is_null($assignee_by)) {
        // //     $dailySubmission = $dailySubmission->where('tasks.added_by', $assignee_by);
        // // }
        if (!is_null($accuntableId)) {
            $issues = $issues->where('developer_report_issues.person', $accuntableId);
        }
        if (!is_null($clientId)) {
            $issues = $issues->where('projects.client_id', $clientId);
        }
        $issues= $issues->get();
        return response()->json([
            'report_issue'=> $issues,
            'status'=>200,
        ]);
        
    }
}
