<?php

namespace App\Http\Controllers\PointIncentive;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AccountBaseController;

class PmIncentiveViewController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.incentive';
    }

    public function __invoke(Request $request)
    {
        abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4 || Auth::user()->role_id == 8));
        return view('pm-incentive.index', $this->data);
    }
}
