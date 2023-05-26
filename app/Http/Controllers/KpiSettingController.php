<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Helper\Reply;
use App\Http\Requests\Settings\UpdateOrganisationSettings;
use App\Models\kpiSetting;
use App\Models\kpiSettingGenerateSale;
use App\Models\kpiSettingLoggedHour;
use App\Models\Setting;
use App\Models\IncentiveSetting;
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

    public function store(Request $request)
    {
        $kpi_setting = new kpiSetting();
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
        $kpi_setting->additional_sales_amount = $request->additional_sales_amount;
        $kpi_setting->client_type = $request->client_type;
        $kpi_setting->after = $request->after;
        $kpi_setting->after_reach_amount = $request->after_reach_amount;
        $kpi_setting->generate_single_deal = $request->generate_single_deal;
        $kpi_setting->bonus_point = $request->bonus_point;
        $kpi_setting->generate_sales_above = $request->generate_sales_above;
        $kpi_setting->generate_sales_above_point = $request->generate_sales_above_point;
        $kpi_setting->logged_hours_above = $request->logged_hours_above;
        $kpi_setting->logged_hours_above_sales_amount = $request->logged_hours_above_sales_amount;
        $kpi_setting->achieve_more_than = $request->achieve_more_than;
        $kpi_setting->achieve_less_than = $request->achieve_less_than;
        $kpi_setting->accepted_by_pm = $request->accepted_by_pm;
        $kpi_setting->start_month = $request->start_month;
        //dd($kpi_setting, $request->all());
        $kpi_setting->save();

        $generate_sales = kpiSettingGenerateSale::where('kpi_id',$kpi_setting->id)->get();
        if($generate_sales != null)
        {
            foreach($generate_sales as $sales)
            {
                $update_sales= kpiSettingGenerateSale::find($sales->id);
                $update_sales->delete();
            }
        }
        $hours_logged = kpiSettingLoggedHour::where('kpi_id',$kpi_setting->id)->get();
        if($hours_logged != null)
        {
            foreach($hours_logged as $logged)
            {
                $update_logged= kpiSettingLoggedHour::find($logged->id);
                $update_logged->delete();
            }
        }
        foreach($request->generate_sales_from as $key => $sales_from) {
            $kpi_setting_generate_sales = new kpiSettingGenerateSale();
            $kpi_setting_generate_sales->kpi_id = $kpi_setting->id;
            $kpi_setting_generate_sales->generate_sales_from = $sales_from;
            $kpi_setting_generate_sales->generate_sales_to  = $request->generate_sales_to[$key] ;
            $kpi_setting_generate_sales->generate_sales_amount  = $request->generate_sales_amount[$key] ;
            $kpi_setting_generate_sales->save();
        }
        foreach($request->logged_hours_between as $key => $logged_hours_between) {
            $kpi_setting_logged_hour = new kpiSettingLoggedHour();
            $kpi_setting_logged_hour->kpi_id = $kpi_setting->id;
            $kpi_setting_logged_hour->logged_hours_between= $logged_hours_between;
            $kpi_setting_logged_hour->logged_hours_between_to  = $request->logged_hours_between_to[$key] ;
            $kpi_setting_logged_hour->logged_hours_sales_amount  = $request->logged_hours_sales_amount[$key] ;
            $kpi_setting_logged_hour->save();
        }

        $incentive_setting = new IncentiveSetting();
        $incentive_setting->every_shift_every_point_above = $request->every_shift_every_point_above;
        $incentive_setting->individual_goal_percentage = $request->individual_goal_percentage;
        $incentive_setting->point_of_value = $request->point_of_value;
        $incentive_setting->point_of_contribute = $request->point_of_contribute;
        $incentive_setting->incentive_deduction = $request->incentive_deduction;
        $incentive_setting->start_month = $request->start_month;
        $incentive_setting->save();

        return response()->json(['status'=>200]);
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
        $kpi_setting->additional_sales_amount = $request->additional_sales_amount;
        $kpi_setting->client_type = $request->client_type;
        $kpi_setting->after = $request->after;
        $kpi_setting->after_reach_amount = $request->after_reach_amount;
        $kpi_setting->generate_single_deal = $request->generate_single_deal;
        $kpi_setting->bonus_point = $request->bonus_point;
        $kpi_setting->generate_sales_above = $request->generate_sales_above;
        $kpi_setting->generate_sales_above_point = $request->generate_sales_above_point;
        $kpi_setting->logged_hours_above = $request->logged_hours_above;
        $kpi_setting->logged_hours_above_sales_amount = $request->logged_hours_above_sales_amount;
        $kpi_setting->achieve_more_than = $request->achieve_more_than;
        $kpi_setting->achieve_less_than = $request->achieve_less_than;
        $kpi_setting->accepted_by_pm = $request->accepted_by_pm;
        $kpi_setting->save();

        $generate_sales = kpiSettingGenerateSale::where('kpi_id',$kpi_setting->id)->get();
        if($generate_sales != null)
        {
            foreach($generate_sales as $sales)
            {
                $update_sales= kpiSettingGenerateSale::find($sales->id);
                $update_sales->delete();
            }
        }
        $hours_logged = kpiSettingLoggedHour::where('kpi_id',$kpi_setting->id)->get();
        if($hours_logged != null)
        {
            foreach($hours_logged as $logged)
            {
                $update_logged= kpiSettingLoggedHour::find($logged->id);
                $update_logged->delete();
            }
        }
        foreach($request->generate_sales_from as $key => $sales_from) {
            $kpi_setting_generate_sales = new kpiSettingGenerateSale();
            $kpi_setting_generate_sales->kpi_id = $request->id;
            $kpi_setting_generate_sales->generate_sales_from = $sales_from;
            $kpi_setting_generate_sales->generate_sales_to  = $request->generate_sales_to[$key] ;
            $kpi_setting_generate_sales->generate_sales_amount  = $request->generate_sales_amount[$key] ;
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
