<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Route;



class PriceQuotationController extends AccountBaseController
{
  public function __construct()
  {
    parent::__construct();
    $this->pageTitle = 'Price Quotations';
  }


  function index()
  {
    return view('price-quotation.index', $this->data);
  }
}
