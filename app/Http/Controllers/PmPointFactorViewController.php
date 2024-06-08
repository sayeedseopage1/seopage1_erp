<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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
        abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        return view('pm-point-factor.index', $this->data);
    }
}
