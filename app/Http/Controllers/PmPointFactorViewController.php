<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AccountBaseController;

class PmPointFactorViewController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.factor';
    }

    public function __invoke(Request $request)
    {
        return view('pm-point-factor.index', $this->data);
    }
}
