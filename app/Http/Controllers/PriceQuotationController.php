<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\ProjectCms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class PriceQuotationController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Price Quotations';
    }

    static function Route($uri = 'account/price-quotations', $name = 'price-quotations')
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

        $data = [
            "data" => [
                "project_cms" => $project_cms,
                "currencies" => $currencies,
            ],
            "message" => "Filter data fetched successfully",
        ];

        return Response()->json($data, 200);
    }
}
