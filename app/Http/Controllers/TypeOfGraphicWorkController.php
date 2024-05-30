<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeOfGraphicWork;
use App\Http\Controllers\Controller;

class TypeOfGraphicWorkController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.point';
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return response(TypeOfGraphicWork::all(), 200);
    }
}
