<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AccountBaseController;

class ProjectManagerPointController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.point';
    }

    public function index(){
        abort_403(!(Auth::user()->role_id == 1 || Auth::user()->role_id == 4));
        return view('project-manager-point.index', $this->data);
    }
}
