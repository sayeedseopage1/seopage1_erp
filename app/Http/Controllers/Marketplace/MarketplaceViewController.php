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

    public function projectDetailsPage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceProjectDetails';
        return view('marketplace.project-details', $this->data);
    }

    public function projectsPage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceProjects';
        return view('marketplace.projects', $this->data);
    }

    public function profilePage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceProfile';
        return view('marketplace.profile', $this->data);
    }

    public function bidInsightsPage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceBidInsights';
        return view('marketplace.bid-insights', $this->data);
    }

    public function milestonesPage(Request $request)
    {
        // abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        $this->pageTitle = 'app.menu.marketplaceMilestones';
        return view('marketplace.milestones', $this->data);
    }
}
