<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\DealStage;
use App\Models\ProjectCms;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountBaseController;

class PriceQuotationViewController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Price Quotations';
    }

    static function Route($uri = 'account/price-quotations-view', $name = 'price-quotations-view')
    {
        Route::controller(self::class)->prefix($uri)->name($name . '.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/get-filter-data', 'get_filter_data')->name('get-filter-data');
        });
    }

    function index()
    {
        return view('price-quotations.index', $this->data);
    }

    public function get_filter_data()
    {
        $project_cms = ProjectCms::select("id", "cms_name")->get();
        $currencies = Currency::select("id", "currency_name", "currency_symbol", "currency_code")->get();
        $deals = DealStage::whereNull("won_lost")->select("id", "client_name", 'client_badge', "client_username", "project_name", "status")->get();

        $data = [
            "data" => [
                "project_cms" => $project_cms,
                "currencies" => $currencies,
                "deals" => $deals,
            ],
            "message" => "Filter data fetched successfully",
        ];

        return Response()->json($data, 200);
    }
}
