<?php

namespace App\Http\Controllers;

use App\Models\NonCashPointSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NonCashPointSettingsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Non Cash Point';
        $this->activeSettingMenu = 'non_cash_point';
        $this->middleware(function ($request, $next) {
            // abort_403(user()->permission('manage_company_setting') !== 'all');
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
        $data = NonCashPointSettings::all();
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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'point' => 'required|numeric',
        ]);

        $data = new NonCashPointSettings();
        $data->title = $request->name;
        $data->achievable_point = $request->point;
        $data->description = $request->description;
        $data->added_by = $this->user->id;

        if ($data->save()) {
            return response()->json([
                'status' => 'success'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\NonCashPointSettings  $nonCashPointSettings
     * @return \Illuminate\Http\Response
     */
    public function show(NonCashPointSettings $nonCashPointSettings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\NonCashPointSettings  $nonCashPointSettings
     * @return \Illuminate\Http\Response
     */
    public function edit(NonCashPointSettings $nonCashPointSettings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\NonCashPointSettings  $nonCashPointSettings
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NonCashPointSettings $nonCashPointSettings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\NonCashPointSettings  $nonCashPointSettings
     * @return \Illuminate\Http\Response
     */
    public function destroy(NonCashPointSettings $nonCashPointSettings)
    {
        //
    }
}
