<?php

namespace App\Http\Controllers\Marketplace;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AccountBaseController;

class MarketplaceViewController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.marketplace';
    }

    public function messagePage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceMessage';
        return view('marketplace.message', $this->data);
    }

    public function projectPage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceProject';
        return view('marketplace.project', $this->data);
    }
}
