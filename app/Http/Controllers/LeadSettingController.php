<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\LeadAgent;
use App\Models\LeadCategory;
use App\Models\LeadSource;
use App\Models\LeadStatus;
use App\Models\User;

class LeadSettingController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.leadSource';
        $this->activeSettingMenu = 'lead_settings';
        $this->middleware(function ($request, $next) {
            abort_403(!(user()->permission('manage_lead_setting') == 'all'));
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function index()
    {
        $this->leadSources = LeadSource::all();
        $this->leadStatus = LeadStatus::all();
        $this->leadAgents = LeadAgent::with('user')->get();
        $this->leadCategories = LeadCategory::all();
        $this->employees = User::doesntHave('leadAgent')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at')
            ->where('roles.name', 'employee')
            ->get();

        $this->view = 'lead-settings.ajax.source';

        $tab = request('tab');

        switch ($tab) {
        case 'status':
            $this->view = 'lead-settings.ajax.status';
                break;
        case 'agent':
            $this->view = 'lead-settings.ajax.agent';
                break;
        case 'category':
            $this->view = 'lead-settings.ajax.category';
                break;
        default:
            $this->view = 'lead-settings.ajax.source';
                break;
        }

        ($tab == '') ? $this->activeTab = 'source' : $this->activeTab = $tab;

        if (request()->ajax()) {
            $html = view($this->view, $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle, 'activeTab' => $this->activeTab]);
        }

        return view('lead-settings.index', $this->data);

    }

}
