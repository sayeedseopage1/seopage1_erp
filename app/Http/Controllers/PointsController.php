<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PointsController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.point';
        
    }

    public function index()
    {
        //$this->pageTitle = 'app.menu.points';

        return view('points.index', $this->data);
    }
}
