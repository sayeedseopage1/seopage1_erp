<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Helper\Reply;
use App\Http\Requests\Settings\UpdateOrganisationSettings;
use App\Models\kpiSetting;
use App\Models\kpiSettingGenerateSales;
use App\Models\kpiSettingMilestone;
use App\Models\Setting;
use App\Traits\CurrencyExchange;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
class KpiSettingController extends AccountBaseController
{


    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Kpi Settings';
        $this->activeSettingMenu = 'kpi_settings';
        $this->middleware(function ($request, $next) {
            abort_403(user()->permission('manage_company_setting') !== 'all');
            return $next($request);
        });
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->kpi = kpiSetting::first();

        return view('kpi-settings.index', $this->data);
    }


    // phpcs:ignore
    public function update(Request $request,$id)
    {
        $kpi_setting = kpiSetting::find($id);
        $kpi_setting->the_bidder = $request->the_bidder;
        $kpi_setting->qualify = $request->qualify;
        $kpi_setting->requirements_defined = $request->requirements_defined;
        $kpi_setting->less_than = $request->less_than;
        $kpi_setting->less_than_get = $request->less_than_get;
        $kpi_setting->more_than = $request->more_than;
        $kpi_setting->more_than_get = $request->more_than_get;
        $kpi_setting->proposal_made = $request->proposal_made;
        $kpi_setting->negotiation_started = $request->negotiation_started;
        $kpi_setting->milestone_breakdown = $request->milestone_breakdown;
        $kpi_setting->closed_deal = $request->closed_deal;
        $kpi_setting->contact_form = $request->contact_form;
        $kpi_setting->authorized_by_leader = $request->authorized_by_leader;
        $kpi_setting->certain_deal = $request->certain_deal;
        $kpi_setting->certain_deal_per_month = $request->certain_deal_per_month;
        $kpi_setting->additional_milestone = $request->additional_milestone;
        $kpi_setting->additional_milestone_point = $request->additional_milestone_point;
        $kpi_setting->sales_above = $request->sales_above;
        $kpi_setting->sales_above_point = $request->sales_above_point;
        $kpi_setting->estimated_hours = $request->estimated_hours;
        $kpi_setting->logged_hours = $request->logged_hours;
        $kpi_setting->sales_executive = $request->sales_executive;
        $kpi_setting->estimated_hours2 = $request->estimated_hours2;
        $kpi_setting->logged_hours2 = $request->logged_hours2;
        $kpi_setting->sales_executive2 = $request->sales_executive2;
        $kpi_setting->estimated_hours3 = $request->estimated_hours3;
        $kpi_setting->logged_hours3 = $request->logged_hours3;
        $kpi_setting->sales_executive3 = $request->sales_executive3;
        $kpi_setting->save();



        foreach($request->sales_team_reaches as $key => $sales_team_reach) {
            $kpi_setting_milestone = new kpiSettingMilestone();
            $kpi_setting_milestone->kpi_id = $request->id;
            $kpi_setting_milestone->sales_team_reaches = $sales_team_reach;
            $kpi_setting_milestone->closed_deals_goal_month  = $request->closed_deals_goal_month[$key] ;
            $kpi_setting_milestone->save();
        }
        foreach($request->sales_from as $key => $sales_from) {
            $kpi_setting_generate_sales = new kpiSettingGenerateSales();
            $kpi_setting_generate_sales->kpi_id = $request->id;
            $kpi_setting_generate_sales->sales_from= $sales_from;
            $kpi_setting_generate_sales->sales_to  = $request->sales_to[$key] ;
            $kpi_setting_generate_sales->sales_get  = $request->sales_get[$key] ;
            $kpi_setting_generate_sales->save();
        }
        return response()->json(['status'=>200]);
    }

}
