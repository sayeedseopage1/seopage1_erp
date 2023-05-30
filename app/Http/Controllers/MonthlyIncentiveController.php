<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserIncentive;
use Illuminate\Http\Request;

class MonthlyIncentiveController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Monthly Incentive';
        $this->activeSettingMenu = 'monthly-incentive';
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
        $this->user_incentive = UserIncentive::where([
            ['point_earned' , '>', 0],
            'status' => '0'
        ])->orderBy('id', 'desc')->get();

        return view('monthly-incentive.index', $this->data);
    }

    public function get_index_json()
    {
        $user_incentive = UserIncentive::with('user')->where([
            ['point_earned' , '>', 0],
            'status' => '0'
        ])->orderBy('id', 'desc')->get();
        //dd('ok');
        return response()->json($user_incentive);
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
