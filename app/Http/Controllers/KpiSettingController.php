<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Helper\Reply;
use App\Http\Requests\Settings\UpdateOrganisationSettings;
use App\Models\kpiSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
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
//        dd($request->all());
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
        $kpi_setting->for_every = $request->for_every;
        $kpi_setting->addition_sales = $request->addition_sales;
        $kpi_setting->after = $request->after;
        $kpi_setting->shift_will_get = $request->shift_will_get;
        $kpi_setting->generate_project = $request->generate_project;
        $kpi_setting->single_deal = $request->single_deal;
        $kpi_setting->bonus_point = $request->bonus_point;
        $kpi_setting->sales_above = $request->sales_above;
        $kpi_setting->sales_above_point = $request->sales_above_point;
        $kpi_setting->logged_hours_above = $request->logged_hours_above;
        $kpi_setting->logged_hours_above_sales_amount = $request->logged_hours_above_sales_amount;
        $kpi_setting->achieve_more_than = $request->achieve_more_than;
        $kpi_setting->achieve_less_than = $request->achieve_less_than;
        $kpi_setting->save();



        foreach($request->sales_from as $key => $sales_from) {
            $kpi_setting_generate_sales = new kpiSettingGenerateSale();
            $kpi_setting_generate_sales->kpi_id = $request->id;
            $kpi_setting_generate_sales->sales_from = $sales_from;
            $kpi_setting_generate_sales->sales_to  = $request->sales_to[$key] ;
            $kpi_setting_generate_sales->sales_amount  = $request->sales_amount[$key] ;
            $kpi_setting_generate_sales->save();
        }
        foreach($request->logged_hours_between as $key => $logged_hours_between) {
            $kpi_setting_logged_hour = new kpiSettingLoggedHour();
            $kpi_setting_logged_hour->kpi_id = $request->id;
            $kpi_setting_logged_hour->logged_hours_between= $logged_hours_between;
            $kpi_setting_logged_hour->logged_hours_between_to  = $request->logged_hours_between_to[$key] ;
            $kpi_setting_logged_hour->logged_hours_sales_amount  = $request->logged_hours_sales_amount[$key] ;
            $kpi_setting_logged_hour->save();
        }
        return response()->json(['status'=>200]);
    }

}
