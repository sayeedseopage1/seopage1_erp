<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
        Route::controller(self::class)->prefix($uri)->name($name.'.')->group(function(){
            Route::get('/', 'index')->name('index');
        });
    }

    function index()
    {
        return view('price-quotations.index', $this->data);
    }
}
