<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IncentiveSetting;
use App\Models\kpiSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use Illuminate\Http\Request;
use function Doctrine\Common\Collections\Expr\visit;

class PolicyController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Policy';
        $this->activeSettingMenu = 'policy';
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
        $this->kpi = kpiSetting::first();
        $this->kpi_setting_generate_sale = kpiSettingGenerateSale::first();
        $this->kpi_setting_logged_hour = kpiSettingLoggedHour::first();
        $this->incentive_setting = IncentiveSetting::first();
        $this->next_month_kpi = kpiSetting::select('id', 'start_month')->where([
            'kpi_status' => '2',
            'cron_status' => '0'
        ])->get();

        return view('policy.index',$this->data);
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
    public function nextMonthPolicy()
    {
        $this->pageTitle = 'Next Month Policy';
        return view('policy.next_month_policy',$this->data);
    }

    public function show_month_policy($id)
    {
        $this->kpi = kpiSetting::with('logged_hours', 'generate_sales')->find($id);
        $this->next_month_kpi = kpiSetting::select('id', 'start_month')->where([
            'kpi_status' => '2',
            'cron_status' => '0'
        ])->get();

        $this->next_month_incentive = IncentiveSetting::where([
            'incentive_status' => '2',
            'cron_status' => '0',
            'start_month' => \Carbon\Carbon::now()->addMonth()->startOfMonth()->format('Y-m-d')
        ])->latest()->first();

        return view('policy.next_month_index',$this->data);
    }
}
