<?php

namespace App\Http\Controllers\PointIncentive;

use Illuminate\Http\Request;
use App\Http\Controllers\AccountBaseController;

class PmIncentiveViewController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.factor';
    }

    public function __invoke(Request $request)
    {
        return view('pm-incentive.index', $this->data);
    }
}
